import * as BABYLON from "babylonjs";
import {Room} from './Room'
import wallTexture from "./textures/texture.png"
import floorTexture from "./textures/texture.png"
import ceilingTexture from "./textures/texture.png"

export class World {
    static pixelRatio = 16 // Textures are 16x16 pixels squares
    light
    rooms = []
    constructor(scene) {
        this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, World.pixelRatio, 0), scene);
        let room1Doors = [
            {
                width: 4*World.pixelRatio,
                height: 4*World.pixelRatio,
                position: new BABYLON.Vector3(
                    6*World.pixelRatio,
                    2*World.pixelRatio,
                    0)
            }
        ]
        let room2Doors = [
            {
                width: 4*World.pixelRatio,
                height: 4*World.pixelRatio,
                position: new BABYLON.Vector3(
                    2*World.pixelRatio,
                    2*World.pixelRatio,
                    0)
            },
            null,
            {
                width: 4*World.pixelRatio,
                height: 4*World.pixelRatio,
                position: new BABYLON.Vector3(
                    2*World.pixelRatio,
                    2*World.pixelRatio,
                    0)
            }
        ]
        let room3Doors = [
            null,
            null,
            {
                width: 4*World.pixelRatio,
                height: 4*World.pixelRatio,
                position: new BABYLON.Vector3(
                    6*World.pixelRatio,
                    2*World.pixelRatio,
                    0)
            }
        ]
        this.rooms.push(
            new Room(
                'room1',
                new BABYLON.Vector3(0,0,0),
                new BABYLON.Vector3(12*World.pixelRatio,8*World.pixelRatio,24*World.pixelRatio),
                floorTexture,
                ceilingTexture,
                wallTexture,
                room1Doors,
                scene),
            new Room(
                'room2',
                new BABYLON.Vector3(0,0,13*World.pixelRatio),
                new BABYLON.Vector3(4*World.pixelRatio,4*World.pixelRatio,2*World.pixelRatio),
                floorTexture,
                ceilingTexture,
                wallTexture,
                room2Doors,
                scene),
            new Room(
                'room3',
                new BABYLON.Vector3(0,0,20*World.pixelRatio),
                new BABYLON.Vector3(12*World.pixelRatio,8*World.pixelRatio,12*World.pixelRatio),
                floorTexture,
                ceilingTexture,
                wallTexture,
                room3Doors,
                scene)
        );
    }
}

