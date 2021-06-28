const Vec = require('p5').Vector,
    Quat = require('./math/quaternion'),
    UQuat = require('./math/unit-quaternion');

function axisAngle(axis, rads) {
    const a2 = rads / 2;

    if (rads === 0) return Quat.identity;

    return Quat.fromRealVector(Math.cos(a2), Vec.mult(Vec.normalize(axis), Math.sin(a2)));
}

function pitch(rads) {
    return axisAngle(new Vec(1, 0, 0), rads);
}

function yaw(rads) {
    return axisAngle(new Vec(0, 1, 0), rads);
}

function roll(rads) {
    return axisAngle(new Vec(0, 0, 1), rads);
}

module.exports.axisAngle = axisAngle;
module.exports.pitch = pitch;
module.exports.yaw = yaw;
module.exports.roll = roll;