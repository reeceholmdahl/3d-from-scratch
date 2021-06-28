const AxisAngle = require('./axis-angle.js');
const Quat = require('./math/quaternion.js');

const p5 = require('p5'),
    Vec = p5.Vector,
    utils = require('./util'),
    UQuat = require('./math/unit-quaternion');

class Camera {

    constructor(position = new Vec(0, 0, 0), fov = utils.radians(70)) {
        this.position = position;
        this.perspective = UQuat.identity;

        this.unitFocalLength = 0;

        this._fov = 0;
        this.fov = fov;

        this.pitch = 0;
        this.yaw = 0;
    }

    get fov() {
        return this._fov;
    }

    set fov(rads) {
        // or just rads % ...
        // rads = Math.abs(rads) % Math.PI;
        this.unitFocalLength = 1 / (2 * Math.tan(rads / 2));
        this._fov = rads;
    }

    /**
     * 
     * @param {Vec} vec 3d global space vec
     * @returns {Vec} 3d relative camera space vec
     */
    globalToRelative(vec) {
        const a = vec.copy();
        a.sub(this.position);
        return this.perspective.rotateVec(a);
    }

    /**
     * 
     * @param {Vec} vec 3d vec camera space vec
     * @returns {Vec} 2d vec unit screen space vec
     */
    toUnitScreenSpace(vec) {
        const b = new Vec(0, 0, vec.z);
        
        b.x = ((this.unitFocalLength * vec.x) / vec.z);
        b.y = ((this.unitFocalLength * vec.y) / vec.z);

        return b;
    }

    set(yaw, pitch) {

        this.perspective = AxisAngle.yaw(yaw);

        const localPitch = Vec.mult(this.perspective.rotateVec(new Vec(1, 0, 0)), new Vec(1, 0, -1));
        const pitchChange = AxisAngle.axisAngle(localPitch, pitch);
        this.perspective = Quat.multiply(this.perspective, pitchChange);

        this.yaw = yaw;
        this.pitch = pitch;
    }

    move(yaw, pitch) {
        this.set(yaw + this.yaw, pitch + this.pitch);
    }
}

module.exports = Camera;