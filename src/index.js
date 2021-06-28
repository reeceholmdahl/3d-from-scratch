const Plane = require('./geometry/2d/plane.js');
const RectPrism = require('./geometry/3d/rectangular-prism.js');
const Quat = require('./math/quaternion.js');
const Renderer = require('./renderer.js');
const PosCtrl = require('./physics/position-controller.js');
const LerpPosCtrl = require('./physics/lerp-position-controller.js');
const OriCtrl = require('./physics/orientation-controller.js');
const LerpOriCtrl = require('./physics/lerp-orientation-controller.js');
const { radians, degrees } = require('./util.js');
const PhysCtrl = require('./physics/physics-controller.js');

const p5 = require('p5'),
    Vec = p5.Vector,
    Camera = require('./camera'),
    AxisAngle = require('./axis-angle');

/**
 * @param {p5.p5InstanceExtensions} s 
 */
const sketch = (s) => {

    let canvas;
    const camera = new Camera(new Vec(0, 0, 0), radians(80));

    s.setup = () => {
        canvas = s.createCanvas(s.windowWidth, s.windowHeight);
    }

    s.windowResized = () => {
        console.log('window resized');

        s.resizeCanvas(s.windowWidth, s.windowHeight);
    }

    const physics = {
        lastUpdate: performance.now(),
        accumulator: 0,
        alpha: 0,
        dt: 1/15,
        maxFrameTime: 0.25,
        periodic: (update) => {
            const now = performance.now();
            let frameSeconds = (now - physics.lastUpdate) / 1000;
            if (frameSeconds > physics.maxFrameTime) frameSeconds = physics.maxFrameTime;
            physics.lastUpdate = now;
            physics.accumulator += frameSeconds;

            physics.alpha = (physics.accumulator % physics.dt) / physics.dt;

            while (physics.accumulator >= physics.dt) {
                update(physics.dt);

                physics.accumulator -= physics.dt;
            }

            // physics.alpha = physics.accumulator / physics.dt;
        }
    }

    let angle = 0;

    const plane = new Plane(1, 2, 0, 0, 5, Quat.identity);
    
    const rect = new RectPrism(1.5, 1, 0.75, 0, 0, 4, Quat.identity);
    rect.fill = '#2288ff';
    rect.stroke = '#ff0';
    rect.strokeWeight = 1;

    const cameraPhys = new LerpPosCtrl(camera.position);
    const rectPhys = PhysCtrl.fromGeometry(rect);

    rectPhys.vel.set(0, 0, 0);
    rectPhys.acc.set(0, 0, 0);
    rectPhys.rotationalVel.set(radians(30), radians(60), radians(15));
    rectPhys.rotationalAcc.set(-radians(10), 0, 0);

    s.draw = () => {

        const speed = 10;
        
        let forward = 0;
        let lateral = 0;
        let vertical = 0;

        if (s.keyIsDown(87)) {
            // W
            forward = speed;
        } else if (s.keyIsDown(83)) {
            // S
            forward = -speed;
        } else {

        }

        if (s.keyIsDown(65)) {
            // A
            lateral = -speed;
        } else if (s.keyIsDown(68)) {
            // D
            lateral = speed;
        } else {

        }

        if (s.keyIsDown(81)) {
            // Q
            vertical = -speed;
        } else if (s.keyIsDown(69)) {
            // E
            vertical = speed;
        } else {

        }

        const forwardVector = AxisAngle.yaw(camera.yaw).rotateVec(new Vec(0, 0, forward));
        const lateralVector = AxisAngle.yaw(camera.yaw).rotateVec(new Vec(lateral, 0, 0));
        const verticalVector = new Vec(0, vertical, 0);

        forwardVector.mult(-1, -1, 1);
        lateralVector.mult(1, 1, -1);

        cameraPhys.vel = Vec.add(Vec.add(forwardVector, lateralVector), verticalVector)

        physics.periodic(dt => {

            rectPhys.integrate(dt);

            cameraPhys.integrate(dt);
        });

        rectPhys.update(physics.alpha);

        cameraPhys.update(physics.alpha);

        Renderer.addToFrame(rect, plane);
        Renderer.drawFrame(s, camera);

        /**
         * IDEAS:
         * Orientation Controller (+ lerp variant)
         * Physics Controller (merger of position ctrl and orientation ctrl + lerp variant) aka Point Mass
         * RigidBody Physics Controller (+ lerp variant)
         * 
         * this system of controllers and geometries will help keep the rendering and physics sim separate and easy to manage
         */
    }

    s.mousePressed = () => {
        s.requestPointerLock();
    }

    let yaw = 0;
    let pitch = 0;

    s.mouseMoved = () => {

        const dx = s.movedX / s.windowWidth;
        const dy = s.movedY / s.windowHeight;

        const wh = s.windowHeight / s.windowWidth;
        
        yaw = -dx * radians(90);
        pitch = dy * wh * radians(90);
        
        camera.move(yaw, pitch);
    }
}

const instance = new p5(sketch);