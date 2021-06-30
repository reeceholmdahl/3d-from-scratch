const { Vector: Vec } = require('p5');
const RectPrism = require('./geometry/3d/rectangular-prism.js');

const Testing = {};

/**
 * @param {Vec} testPoint 
 * @param {RectPrism} rectPrism 
 */
Testing.isPointInsideRectPrism = function(testPoint, rectPrism) {
    const normals = this.getNormals(rectPrism);

    const onX = this.projectOnVector(testPoint, normals.xNormal);
    const onY = this.projectOnVector(testPoint, normals.yNormal);
    const onZ = this.projectOnVector(testPoint, normals.zNormal);
}

/**
 * @param {RectPrism} rectPrism 
 */
Testing.getNormals = function(rectPrism) {
    return {
        xNormal: rectPrism.orientation.rotateVec(new Vec(1, 0, 0)),
        yNormal: rectPrism.orientation.rotateVec(new Vec(0, 1, 0)),
        zNormal: rectPrism.orientation.rotateVec(new Vec(0, 0, 1))
    };
}

/**
 * @param {Vec} projectee To project
 * @param {Vec} projector Projected upon
 */
Testing.projectOnVector = function(projectee, projector) {
    return Vec.normalize(projector).mult(
        Vec.dot(projectee, projector) / projector.mag()
    );
}