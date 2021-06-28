const { Vector: Vec } = require('p5');
const AxisAngle = require('../axis-angle.js');
const { lerp } = require('../util.js');
const OrientationController = require('./orientation-controller.js');

class LerpOrientationController extends OrientationController {

    /**
     * @param {Quat} quat 
     */
    constructor(quat) {
        
        super(quat);

        this.ctrlOri = quat;
        this.nowOri = quat.copy();
        this.lastOri = quat.copy();
    }

    integrate(dt) {
        this.rotationalVel.add(Vec.mult(this.rotationalAcc, dt));
        
        const rot = AxisAngle.axisAngle(this.ori.rotateVec(new Vec(0, 1, 0)), this.rotationalVel.x * dt);

        const pitch = AxisAngle.axisAngle(rot.rotateVec(new Vec(1, 0, 0)), this.rotationalVel.y * dt);        
        rot.append(pitch);

        const roll = AxisAngle.axisAngle(rot.rotateVec(new Vec(0, 0, 1)), this.rotationalVel.z * dt);
        rot.append(roll);

        this.lastOri = this.nowOri.copy();
        this.nowOri.append(rot);
    }

    update(alpha) {
        this.ctrlOri.set(
            lerp(this.lastOri.a, this.nowOri.a, alpha),
            lerp(this.lastOri.b, this.nowOri.b, alpha),
            lerp(this.lastOri.c, this.nowOri.c, alpha),
            lerp(this.lastOri.d, this.nowOri.d, alpha),
        );
    }

    set(yaw, pitch, roll) {

        this.rotationalVel.add(Vec.mult(this.rotationalAcc, dt));
        
        const rot = AxisAngle.yaw(yaw);

        const dPitch = AxisAngle.axisAngle(rot.rotateVec(new Vec(1, 0, 0)), pitch);        
        rot.append(dPitch);

        const dRoll = AxisAngle.axisAngle(rot.rotateVec(new Vec(0, 0, 1)), roll);
        rot.append(dRoll);

        this.nowOri.set(rot.a, rot.b, rot.c, rot.d);
        this.lastOri = this.nowOri.copy();
        // also ctrlOri too?
    }
}

module.exports = LerpOrientationController;