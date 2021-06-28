const Quat = require('./quaternion.js');

class UQuat extends Quat {
    
    constructor(a, b, c, d) {
        super(a, b, c, d);

        this.normalize();
    }

    static fromRealVector(r, v) {
        return new UQuat(r, v.x, v.y, v.z);
    }

    get a() {
        return this.r;
    }

    set a(a) {
        this.r = a;
        this.normalize();
    }

    get b() {
        return this.v.x;
    }

    set b(b) {
        this.v.x = b;
        this.normalize();
    }

    get c() {
        return this.v.y;
    }

    set c(c) {
        this.v.y = c;
        this.normalize();
    }

    get d() {
        return this.v.z;
    }

    set d(d) {
        this.v.z = d;
        this.normalize();
    }
}

module.exports = UQuat;