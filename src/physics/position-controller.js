const { Vector } = require('p5');

class PositionController {

    /**
     * @param {Vec} pos 
     */
    constructor(pos) {
        this.pos = pos;
        this.vel = new Vector(0, 0, 0);
        this.acc = new Vector(0, 0, 0);
    }

    integrate(dt) {
        this.vel.add(Vector.mult(this.acc, dt));
        this.pos.add(Vector.mult(this.vel, dt));
    }

    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    set(x, y, z) {
        this.pos.set(x, y, z);
    }
}

module.exports = PositionController;