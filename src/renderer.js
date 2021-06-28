const { Vector: Vec } = require('p5');
const Camera = require('./camera.js');
const Geometry = require('./geometry/geometry.js');

// Arbitrary, test
const NEAR_PLANE_DISTANCE = 0.1;
const FAR_PLANE_DISTANCE = 1000;

const geometryToDraw = [];

let background = '#000';

class Renderer {

    /**
     * @param {import('p5').p5InstanceExtensions} context 
     * @param {Camera} camera
     * @param {Array<Vector>} faces 
     */
    static drawFrame(context, camera) {
        
        context.clear().background(Renderer.background);

        const geometry = geometryToDraw.sort((a, b) => {
            return camera.globalToRelative(b.position).z - camera.globalToRelative(a.position).z;
        });
        
        geometry.forEach(g => {

            context.fill(g.fill).stroke(g.stroke).strokeWeight(g.strokeWeight);

            const faces = g.faces.sort((a, b) => {
                const normalFromCamera = camera.globalToRelative(g.position).normalize();

                let aZ = 0;
                a.forEach(vertex => {
                    // aZ += camera.globalToRelative(this.orientation.rotateVec(vert).add(this.position)).z;
                    const z = Vec.dot(camera.globalToRelative(vertex), normalFromCamera);
                    if (z > aZ) aZ = z;
                });

                let bZ = 0;
                b.forEach(vertex => {
                    // bZ += camera.globalToRelative(this.orientation.rotateVec(vert).add(this.position)).z;
                    const z = Vec.dot(camera.globalToRelative(vertex), normalFromCamera);
                    if (z > bZ) bZ = z;
                });

                return bZ - aZ;
            });

            faces.forEach(face => {
                
                let onScreen = true;
                const screenVertices = [];
                
                face.forEach(vector => {

                    vector = camera.globalToRelative(vector);
                    
                    if (vector.z < NEAR_PLANE_DISTANCE || vector.z > FAR_PLANE_DISTANCE) onScreen = false;

                    const projected = camera.toUnitScreenSpace(vector);
                    
                    projected.mult(context.windowWidth, context.windowWidth, 1);
                    projected.add(context.windowWidth / 2, context.windowHeight / 2);
                    
                    screenVertices.push(projected); 
                });

                if (onScreen) {
                    context.beginShape();
                    screenVertices.forEach(projected => context.vertex(projected.x, projected.y));
                    context.endShape(context.CLOSE);
                }
            });
        });

        geometryToDraw.length = 0;
    }

    /**
     * @param  {...Geometry} geometry 
     */
    static addToFrame(...geometry) {
        geometryToDraw.push(...geometry);
    }

    static get background() {
        return background;
    }

    static set background(x) {
        background = x;
    }
}

module.exports = Renderer;