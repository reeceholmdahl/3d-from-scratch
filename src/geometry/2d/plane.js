const { Vector: Vec, Vector } = require('p5');
const Camera = require('../../camera');
const Geometry = require('../geometry.js');

class Plane extends Geometry {

    constructor(width, height, x, y, z, orientation) {
        
        super();

        this.width = width;
        this.height = height;

        this._position = new Vec(x, y, z);
        this._orientation = orientation;

        const w2 = this.width / 2;
        const h2 = this.height / 2;

        this.locals = [
            new Vec(-w2, -h2, 0),
            new Vec(w2, -h2, 0),
            new Vec(w2, h2, 0),
            new Vec(-w2, h2, 0)
        ];

        this._fill = super.fill;
        this._stroke = super.stroke;
        this._strokeWeight = super.strokeWeight;
    }

    get position() {
        return this._position;
    }

    set position(x) {
        this._position = x;
    }

    get orientation() {
        return this._orientation;
    }

    set orientation(x) {
        this._orientation = x;
    }

    get faces() {
        return [
            this.locals.map(vertex => {
                vertex = this.orientation.rotateVec(vertex);
                return Vec.add(vertex, this.position);
            })
        ];
    }

    get fill() {
        return this._fill;
    }

    set fill(x) {
        this._fill = x;
    }

    get stroke() {
        return this._stroke;
    }

    set stroke(x) {
        this._stroke = x;
    }

    get strokeWeight() {
        return this._strokeWeight;
    }

    set strokeWeight(x) {
        this._strokeWeight = x;
    }
}

module.exports = Plane;