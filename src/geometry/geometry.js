const { Vector, Color } = require('p5');
const Quat = require('../math/quaternion.js');

class Geometry {
    
    /**
     * @returns {Vector}
     */
    get position() {}
    set position(x) {}
    
    /**
     * @returns {Quat}
     */
    get orientation() {}
    set orientation(x) {}

    /**
     * @returns {Array<Vector>}
     * @readonly
     */
    get faces() {}

    /**
     * @returns {Color}
     * @readonly
     */
    get fill() {
        return '#00f';
    }

    /**
     * @returns {Color}
     * @readonly
     */
    get stroke() {
        return '#0f0';
    }

    /**
     * @returns {number}
     * @readonly
     */
    get strokeWeight() {
        return 1;
    }
}

module.exports = Geometry;