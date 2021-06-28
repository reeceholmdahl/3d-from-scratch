const { Vector } = require('p5');
const { lerp } = require('../util.js');
const PositionController = require('./position-controller.js');

class LerpPositionController extends PositionController {

    /**
     * @param {Vec} pos 
     */
    constructor(pos) {

        super(pos);

        this.ctrlPos = pos;
        this.nowPos = pos.copy();
        this.lastPos = pos.copy();
        // this.vel = new Vector(0, 0, 0);
        // this.acc = new Vector(0, 0, 0);
    }

    integrate(dt) {
        this.lastPos.set(this.nowPos);
        this.vel.add(Vector.mult(this.acc, dt));
        this.nowPos.add(Vector.mult(this.vel, dt));
    }

    update(alpha) {
        this.ctrlPos.set(
            lerp(this.lastPos.x, this.nowPos.x, alpha),
            lerp(this.lastPos.y, this.nowPos.y, alpha),
            lerp(this.lastPos.z, this.nowPos.z, alpha),
        );
    }

    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    set(x, y, z) {
        this.nowPos.set(x, y, z);
        this.lastPos.set(x, y, z);
        // ctrlPos too?
    }
}

module.exports = LerpPositionController;