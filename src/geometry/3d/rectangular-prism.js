const { Vector: Vec } = require('p5');
const Geometry = require('../geometry.js');

class RectangularPrism extends Geometry {

    constructor(width, height, depth, x, y, z, orientation) {

        super();

        this.width = width;
        this.height = height;
        this.depth = depth;
        
        this._position = new Vec(x, y, z)

        this._orientation = orientation;

        const w2 = this.width / 2;
        const h2 = this.height / 2;
        const d2 = this.depth / 2;

        this.locals = [
            new Vec(-w2, -h2, -d2), // face 1 // face 3 // face 5
            new Vec(w2, -h2, -d2), // face 1 // face 3 // face 6
            new Vec(w2, -h2, d2), // face 1 // face 4 // face 6
            new Vec(-w2, -h2, d2), // face 1 // face 4 // face 5
            new Vec(-w2, h2, -d2), // face 2 // face 3 // face 5
            new Vec(w2, h2, -d2), // face 2 // face 3 // face 6
            new Vec(w2, h2, d2), // face 2 // face 4 // face 6
            new Vec(-w2, h2, d2), // face 2 // face 4 // face 5
        ];

        this._faces = [
            this.face1,
            this.face2,
            this.face3,
            this.face4,
            this.face5,
            this.face6
        ];

        this._fill = super.fill;
        this._stroke = super.stroke;
        this._strokeWeight = super.strokeWeight;
    }

    get face1() {
        return [
            this.locals[0],
            this.locals[1],
            this.locals[2],
            this.locals[3]
        ];
    }

    get face2() {
        return [
            this.locals[4],
            this.locals[5],
            this.locals[6],
            this.locals[7]
        ];
    }

    get face3() {
        return [
            this.locals[1],
            this.locals[0],
            this.locals[4],
            this.locals[5]
        ];
    }

    get face4() {
        return [
            this.locals[3],
            this.locals[2],
            this.locals[6],
            this.locals[7]
        ];
    }

    get face5() {
        return [
            this.locals[3],
            this.locals[0],
            this.locals[4],
            this.locals[7]
        ];
    }

    get face6() {
        return [
            this.locals[2],
            this.locals[1],
            this.locals[5],
            this.locals[6]
        ];
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
        return this._faces.map(face => {

            return face.map(vector => {
                const a = this.orientation.rotateVec(vector);
                return Vec.add(a, this.position);
            });
        });
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

module.exports = RectangularPrism;