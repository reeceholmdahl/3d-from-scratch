const { Vector: Vec } = require('p5');
const Geometry = require('../geometry/geometry.js');
const Quat = require('../math/quaternion.js');
const LerpOrientationController = require('./lerp-orientation-controller.js');
const LerpPositionController = require('./lerp-position-controller.js');
const OrientationController = require('./orientation-controller.js');
const PositionController = require('./position-controller.js');

class PhysicsController {

    /**
     * @param {Vec} pos 
     * @param {Quat} ori 
     * @param {boolean} lerp
     */
    constructor(pos, ori, lerp = true) {
        this.pos = pos;
        this.ori = ori;
        
        this._lerp = null
        this.posCtrl = null;
        this.oriCtrl = null;

        this.lerp = lerp;
    }

    /**
     * @param {Geometry} geometry 
     * @returns {PhysicsController}
     */
    static fromGeometry(geometry, lerp = true) {
        return new PhysicsController(geometry.position, geometry.orientation, lerp);
    }

    get lerp() {
        return this._lerp;
    }

    /**
     * @param {boolean} enabled
     */
    set lerp(enabled) {
        this._lerp = enabled;
        if (enabled) {
            this.posCtrl = new LerpPositionController(this.pos);
            this.oriCtrl = new LerpOrientationController(this.ori);
        } else {
            this.posCtrl = new PositionController(this.pos);
            this.oriCtrl = new OrientationController(this.ori);
        }
    }

    get vel() {
        return this.posCtrl.vel;
    }

    get acc() {
        return this.posCtrl.acc;
    }

    get rotationalVel() {
        return this.oriCtrl.rotationalVel;
    }

    get rotationalAcc() {
        return this.oriCtrl.rotationalAcc;
    }

    integrate(dt) {
        this.posCtrl.integrate(dt);
        this.oriCtrl.integrate(dt);
    }

    update(alpha) {
        if (this.lerp) {
            this.posCtrl.update(alpha);
            this.oriCtrl.update(alpha);
        }
    }
}

module.exports = PhysicsController;