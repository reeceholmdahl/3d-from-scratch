const { Vector: Vec } = require('p5');
const RectPrism = require('./geometry/3d/rectangular-prism.js');

const Testing = {};

/**
 * @param {Vec} testPoint 
 * @param {RectPrism} rectPrism 
 */
Testing.isPointInsideRectPrism = function(testPoint, rectPrism) {
    const normals = this.getNormals(rectPrism);

    testPoint = Vec.sub(testPoint, rectPrism.position);

    const onX = this.projectOnVector(testPoint, normals.xNormal);
    const onY = this.projectOnVector(testPoint, normals.yNormal);
    const onZ = this.projectOnVector(testPoint, normals.zNormal);

    window.onX = () => onX;
    window.onY = () => onY;
    window.onZ = () => onZ;

    const testX = onX.mag();
    const testY = onY.mag();
    const testZ = onZ.mag();
    // const testY = onY.mag() - rectPrism.position.y;
    // const testZ = onZ.mag() - rectPrism.position.z;

    window.testX = () => testX;
    window.testY = () => testY;
    window.testZ = () => testZ;

    if (testX >= -rectPrism.width / 2 && testX <= rectPrism.width / 2) {
        
        if (testY >= -rectPrism.height / 2 && testY <= rectPrism.height / 2) {

            if (testZ >= -rectPrism.depth / 2 && testZ <= rectPrism.depth / 2) {

                return true;
            }
        }
    }

    return false;
}

/**
 * @param {RectPrism} rectPrism 
 */
Testing.getNormals = function(rectPrism) {

    const normals = {
        xNormal: rectPrism.orientation.rotateVec(new Vec(1, 0, 0)),
        yNormal: rectPrism.orientation.rotateVec(new Vec(0, 1, 0)),
        zNormal: rectPrism.orientation.rotateVec(new Vec(0, 0, 1))
    };

    window.getNormals = () => normals;

    return normals;
}

/**
 * @param {Vec} projectee To project
 * @param {Vec} projector Projected upon
 */
Testing.projectOnVector = function(projectee, projector) {
    return Vec.mult(projector,
        Vec.dot(projectee, projector) / projector.magSq()
    );
}

Testing.test = function() {
    console.log(
        this.projectOnVector(
            new Vec(3, 6, 2),
            new Vec(1, 2, 4)
        )
    );
}

module.exports = Testing;