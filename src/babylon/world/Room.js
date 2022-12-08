import * as BABYLON from 'babylonjs'
import {Wall} from "./Wall"
import {World} from "./World"

export class Room{
    id
    position
    size
    ground
    frontWall
    backWall
    rightWall
    leftWall
    constructor(id, position, size, floorTexture, wallTexture, doors, scene) {
        this.id = id
        this.position = position
        this.size = size
        this.createFloor(id, position, size, floorTexture, scene)
        this.createWalls(id, position, size, wallTexture, doors, scene)
    }

    createFloor(id, position, size, floorTexture, scene){
        let floorMaterial = new BABYLON.StandardMaterial(id+"_floor_material", scene);
        floorMaterial.diffuseTexture = new BABYLON.Texture(floorTexture, scene, undefined, undefined, BABYLON.Texture.NEAREST_SAMPLINGMODE);
        floorMaterial.diffuseTexture.uScale = size.x/World.pixelRatio;
        floorMaterial.diffuseTexture.vScale = size.z/World.pixelRatio;
        let ground = BABYLON.MeshBuilder.CreateGround(id+"_ground", {
            width: size.x,
            height: size.z
        }, scene);
        ground.position = new BABYLON.Vector3(position.x, position.y-size.y/2, position.z)
        ground.material = floorMaterial
        this.ground = ground
    }

    createWalls(id, position, size, wallTexture, doors, scene){
        this.frontWall =
            new Wall(
                id+'_front_wall',
                scene,
                size.x,
                size.y,
                wallTexture,
                new BABYLON.Vector3(
                    0,
                    0,
                    position.z+size.z/2),
                0,
                doors[0])
        this.backWall =
            new Wall(
                id+'_back_wall',
                scene,
                size.x,
                size.y,
                wallTexture,
                new BABYLON.Vector3(
                    0,
                    0,
                    position.z-size.z/2),
                Math.PI,
                doors[1])
        this.rightWall =
            new Wall(
                id+'_right_wall',
                scene,
                size.z,
                size.y,
                wallTexture,
                new BABYLON.Vector3(
                    position.x+size.x/2,
                    0,
                    0),
                Math.PI/2,
                doors[2])
        this.leftWall =
            new Wall(
                id+'_left_wall',
                scene,
                size.z,
                size.y,
                wallTexture,
                new BABYLON.Vector3(
                    position.x-size.x/2,
                    0,
                    0),
                3/2*Math.PI,
                doors[3])
    }
}