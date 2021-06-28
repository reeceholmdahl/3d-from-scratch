module.exports = {
    radians(degrees) {
        return degrees * Math.PI / 180;
    },
    
    degrees(radians) {
        return radians * 180 / Math.PI;
    },

    lerp(min, max, t) {
        return min * (1 - t) + max * t;
    },

    normalize(x, min, max) {
        return (x - min) / (max - min);
    }
}
