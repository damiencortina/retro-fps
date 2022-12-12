import * as BABYLON from 'babylonjs';
import {Game} from './Game'
import {World} from "./world/World";

export class Player{

    constructor(game) {
        this.game = game;                                                                      // Game
        this.spawnPoint = new BABYLON.Vector3(0, 0, -1);                             // Spawn point
        this.directionnalControls = ['z','s','q','d'];                                         // Directional controls keys
        this.axisMovement = [false,false,false,false];                                         // Movement axis [forward, backward, left, right] (true if moving)
        this.angularSensibility = 1;                                                           // Mouse sensibility
        this.size = 3;                                                                         // Player size
        this.controlEnabled = false;                                                           // Pointer locked
        this.speed = 3;                                                                        // Player speed
        this.hitbox = BABYLON.MeshBuilder.CreateBox("hitBoxPlayer", {size: World.pixelRatio}, this.game.scene);  // Player's hit box
        this.hitbox.position.y = 2*World.pixelRatio
        this.camera = this.initCamera();                                                       // Camera
        this.game.scene.activeCamera = this.camera;
    }

    /*
    * Init the camera
    *
    * Init player's camera (babylon object)
    * Called once in constructor
    */
    initCamera() {
        let camera = new BABYLON.FreeCamera("camera",this.spawnPoint , this.game.scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.applyGravity = false;
        camera.ellipsoid = new BABYLON.Vector3(this.size /3, this.size , this.size /3);
        camera.checkCollisions = true;
        camera.parent = this.hitbox;
        camera.maxZ = 32*24;
        this.initEventListeners();
        return camera;
    }

    /*
    * Init event listeners
    *
    * Init event listeners needed to control the player
    * Called once in constructor
    */
    initEventListeners() {
        let canvas = this.game.scene.getEngine().getRenderingCanvas();
        canvas.addEventListener("click", function () {
            canvas.requestPointerLock();
        }, false);

        document.addEventListener("pointerlockchange", () => {
            this.controlEnabled = document.pointerLockElement === canvas;
        }, false);

        window.addEventListener("mousemove", (evt) => {
            if (this.controlEnabled === true) {
                this.hitbox.rotation.y += evt.movementX * 0.001 * this.angularSensibility;
                let nextRotationX = this.hitbox.rotation.x + (evt.movementY * 0.001 * this.angularSensibility);
                if (nextRotationX < Game.degToRad(90) && nextRotationX > Game.degToRad(-75)) {
                    this.hitbox.rotation.x += evt.movementY * 0.001 * this.angularSensibility;
                }
            }
        }, false);

        window.addEventListener("keyup", (evt) => {
            if (this.directionnalControls.includes(evt.key)) {
                this.updateAxisMovement(evt.key, false);
            }
        }, false);

        window.addEventListener("keydown", (evt) => {
            if (this.directionnalControls.includes(evt.key)) {
                this.updateAxisMovement(evt.key, true);
            }
        }, false);
    }

    /*
    * Axis movement update
    *
    * Update this.axisMovement to reflect players currently followed direction
    * Called on keydown event (set to true) and keyup event (set to false)
    */
    updateAxisMovement(key, status) {
        switch (key) {
            case this.directionnalControls[0]:
                this.axisMovement[0] = status; // FORWARD
                break;
            case this.directionnalControls[1]:
                this.axisMovement[1] = status; // BACKWARD
                break;
            case this.directionnalControls[2]:
                this.axisMovement[2] = status; // LEFT
                break;
            case this.directionnalControls[3]:
                this.axisMovement[3] = status; // RIGHT
                break;
        }
    }

    /*
    * Move check
    *
    * Move the player using this.axisMovement
    * Called on each frame
    */
    checkMove(ratioFps) {
        let relativeSpeed = this.speed / ratioFps;
        if (this.axisMovement) {
            let rotationPoint = this.hitbox.rotation.y;
            if (this.axisMovement[0]) // move FORWARD
            {
                let forward = new BABYLON.Vector3(
                    Math.sin(rotationPoint) * relativeSpeed,
                    0,
                    Math.cos(rotationPoint) * relativeSpeed
                );
                this.hitbox.moveWithCollisions(forward);
            }
            if (this.axisMovement[1]) // move BACKWARD
            {
                let backward = new BABYLON.Vector3(
                    -Math.sin(rotationPoint) * relativeSpeed,
                    0,
                    -Math.cos(rotationPoint) * relativeSpeed
                );
                this.hitbox.moveWithCollisions(backward);
            }
            if (this.axisMovement[2]) // move LEFT
            {
                let left = new BABYLON.Vector3(
                    Math.sin(rotationPoint + Game.degToRad(-90)) * relativeSpeed,
                    0,
                    Math.cos(rotationPoint + Game.degToRad(-90)) * relativeSpeed
                );
                this.hitbox.moveWithCollisions(left);
            }
            if (this.axisMovement[3]) // move RIGHT
            {
                let right = new BABYLON.Vector3(
                    -Math.sin(rotationPoint + Game.degToRad(-90)) * relativeSpeed,
                    0,
                    -Math.cos(rotationPoint + Game.degToRad(-90)) * relativeSpeed
                );
                this.hitbox.moveWithCollisions(right);
            }
            this.hitbox.moveWithCollisions(new BABYLON.Vector3(0, 0, 0));
        }
    }

}