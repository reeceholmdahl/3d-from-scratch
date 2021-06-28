const Vec = require('p5').Vector;

class Quat {
    constructor(a, b, c, d) {
        this.r = a;
        this.v = new Vec(b, c, d);
    }

    static fromRealVector(r, v) {
        return new Quat(r, v.x, v.y, v.z)
    }

    get a() {
        return this.r;
    }

    set a(a) {
        this.r = a;
    }

    get b() {
        return this.v.x;
    }

    set b(b) {
        this.v.x = b;
    }

    get c() {
        return this.v.y;
    }

    set c(c) {
        this.v.y = c;
    }

    get d() {
        return this.v.z;
    }

    set d(d) {
        this.v.z = d;
    }

    get inverse() {
        return Quat.invert(this);
    }

    get normalized() {
        return Quat.normalize(this);
    }

    get magSq() {
        return Quat.magSq(this);
    }

    get mag() {
        return Quat.mag(this);
    }

    invert() {
        this.v.mult(-1);

        return this;
    }

    normalize() {
        const n = this.normalized;

        this.r = n.r;
        this.v = n.v;

        return this;
    }

    rotateVec(vec) {
        return Quat.rotateVec(this, vec);
    }

    /**
     * @param {number} a 
     * @param {number} b 
     * @param {number} c 
     * @param {number} d 
     */
    set(a, b, c, d) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;

        return this;
    }

    append(q) {
        const p = Quat.multiply(this, q);
        return this.set(p.a, p.b, p.c, p.d);
    }

    prepend(q) {
        const p = Quat.multiply(q, this);
        return this.set(p.a, p.b, p.c, p.d);
    }

    copy() {
        return new Quat(this.a, this.b, this.c, this.d);
    }

    print() {
        Quat.print(this);
    }

    static magSq(q) {
        return q.a * q.a + q.b * q.b + q.c * q.c + q.d * q.d;
    }

    static mag(q) {
        return Math.sqrt(Quat.magSq(q));
    }

    static invert(q) {
        return new Quat(q.r, -q.v.x, -q.v.y, -q.v.z);
    }

    static multiply(lhs, rhs) {
        const real = lhs.r * rhs.r - Vec.dot(lhs.v, rhs.v);
        const vector = Vec.mult(rhs.v, lhs.r);
        vector.add(Vec.mult(lhs.v, rhs.r));
        vector.add(Vec.cross(lhs.v, rhs.v));

        return Quat.fromRealVector(real, vector);
    }

    static normalize(q) {
        let invMag = q.mag;

        if (invMag === 0) return q;
        invMag = 1 / invMag;

        return new Quat(q.a * invMag, q.b * invMag, q.c * invMag, q.d * invMag);
    }

    static rotateVec(q, vec) {
        const p = Quat.fromRealVector(0, vec);

        const product = Quat.multiply(Quat.multiply(q, p), q.inverse);

        return product.v;
    }

    static print(q)
    {
        console.log(`real: ${q.r}\na: ${q.v.x}\nb: ${q.v.y}\nc: ${q.v.z}`);
    }

    static get identity() {
        return new Quat(1, 0, 0, 0);
    }
}

module.exports = Quat;