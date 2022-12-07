import * as BABYLON from "babylonjs";

export class World {
    light
    room
    constructor(scene) {
        this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 16, 0), scene);
        this.room = new BABYLON.MeshBuilder.CreateBox('room',{'width':16*16, 'height': 16*4, 'depth': 16*16, 'sideOrientation':BABYLON.Mesh.BACKSIDE}, scene);
    }
}

