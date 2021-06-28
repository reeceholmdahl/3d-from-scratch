const { Vector: Vec } = require('p5');
const AxisAngle = require('../axis-angle.js');
const Quat = require('../math/quaternion.js');

class OrientationController {

    /**
     * @param {Quat} quat 
     */
    constructor(quat) {
        this.ori = quat;
        this.rotationalVel = new Vec(0, 0, 0);
        this.rotationalAcc = new Vec(0, 0, 0);
    }

    integrate(dt) {
        this.rotationalVel.add(Vec.mult(this.rotationalAcc, dt));
        
        const rot = AxisAngle.axisAngle(this.ori.rotateVec(new Vec(0, 1, 0)), this.rotationalVel.x * dt);

        const pitch = AxisAngle.axisAngle(rot.rotateVec(new Vec(1, 0, 0)), this.rotationalVel.y * dt);        
        rot.append(pitch);

        const roll = AxisAngle.axisAngle(rot.rotateVec(new Vec(0, 0, 1)), this.rotationalVel.z * dt);
        rot.append(roll);

        this.ori.append(rot);
    }

    set(yaw, pitch, roll) {

        this.rotationalVel.add(Vec.mult(this.rotationalAcc, dt));
        
        const rot = AxisAngle.yaw(yaw);

        const dPitch = AxisAngle.axisAngle(rot.rotateVec(new Vec(1, 0, 0)), pitch);        
        rot.append(dPitch);

        const dRoll = AxisAngle.axisAngle(rot.rotateVec(new Vec(0, 0, 1)), roll);
        rot.append(dRoll);

        this.ori.set(rot.a, rot.b, rot.c, rot.d);
    }
}

module.exports = OrientationController;