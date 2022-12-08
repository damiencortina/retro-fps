import * as BABYLON from "babylonjs";
import {World} from "./World"

export class Wall{
    id
    width
    height
    position
    constructor(id, scene, width, height, texture, position, angle) {
        this.id = id
        this.width = width
        this.height = height
        this.position = position
        this.createWall(id, scene, width, height, texture, position, angle)
    }

    createWall(id, scene, width, height, texture, position, angle){
        let plane = BABYLON.MeshBuilder.CreatePlane(id,{
            width: width,
            height: height
        } ,scene)
        plane.position = position
        plane.rotation.y = angle
        let wallMaterial = new BABYLON.StandardMaterial(id+"_material", scene);
        wallMaterial.diffuseTexture = new BABYLON.Texture(texture, scene, undefined, undefined, BABYLON.Texture.NEAREST_SAMPLINGMODE);
        wallMaterial.diffuseTexture.uScale = width/World.pixelRatio;
        wallMaterial.diffuseTexture.vScale = height/World.pixelRatio;
        plane.material = wallMaterial
    }
}