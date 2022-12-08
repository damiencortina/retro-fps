import * as BABYLON from "babylonjs";
import {Room} from './Room'
import wallTexture from "./textures/texture.png"
import floorTexture from "./textures/texture.png"

export class World {
    static pixelRatio = 16 // Textures are 16x16 pixels squares
    light
    room
    constructor(scene) {
        this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, World.pixelRatio, 0), scene);
        this.room = new Room(
            'room',
            new BABYLON.Vector3(0,0,0),
            new BABYLON.Vector3(12*World.pixelRatio,4*World.pixelRatio,24*World.pixelRatio),
            floorTexture,
            wallTexture,
            scene);
    }
}

