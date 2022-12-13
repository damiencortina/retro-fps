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
    constructor(id, position, size, floorTexture, ceilingTexture, wallTexture, doors, scene) {
        this.id = id
        position.y += size.y/2
        this.position = position
        this.size = size
        this.createFloor(id, position, size, floorTexture, scene)
        this.createCeiling(id, position, size, ceilingTexture, scene)
        this.createWalls(id, position, size, wallTexture, doors, scene)
    }

    createFloor(id, position, size, floorTexture, scene){
        let floorMaterial = new BABYLON.StandardMaterial(id+"_floor_material", scene)
        floorMaterial.diffuseTexture = new BABYLON.Texture(floorTexture, scene, undefined, undefined, BABYLON.Texture.NEAREST_SAMPLINGMODE)
        floorMaterial.diffuseTexture.uScale = size.x/World.pixelRatio
        floorMaterial.diffuseTexture.vScale = size.z/World.pixelRatio
        let ground = BABYLON.MeshBuilder.CreateGround(id+"_ground", {
            width: size.x,
            height: size.z
        }, scene)
        ground.position = new BABYLON.Vector3(position.x, position.y-size.y/2, position.z)
        ground.material = floorMaterial
        this.ground = ground
    }

    createCeiling(id, position, size, ceilingTexture, scene){
        let ceilingMaterial = new BABYLON.StandardMaterial(id+"_ceiling_material", scene)
        ceilingMaterial.diffuseTexture = new BABYLON.Texture(ceilingTexture, scene, undefined, undefined, BABYLON.Texture.NEAREST_SAMPLINGMODE)
        ceilingMaterial.diffuseTexture.uScale = size.x/World.pixelRatio
        ceilingMaterial.diffuseTexture.vScale = size.z/World.pixelRatio
        let ceiling = BABYLON.MeshBuilder.CreatePlane(id+"_ceiling", {
            width: size.x,
            height: size.z,
        }, scene)
        ceiling.position = new BABYLON.Vector3(position.x, position.y+size.y/2, position.z)
        ceiling.material = ceilingMaterial
        ceiling.rotation =  new BABYLON.Vector3( -Math.PI/2,0, 0)
        this.ground = ceiling
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
                    position.x,
                    position.y,
                    position.z+size.z/2),
                0,
                doors[0])
        this.rightWall =
            new Wall(
                id+'_right_wall',
                scene,
                size.z,
                size.y,
                wallTexture,
                new BABYLON.Vector3(
                    position.x+size.x/2,
                    position.y,
                    position.z),
                Math.PI/2,
                doors[1])
        this.backWall =
            new Wall(
                id+'_back_wall',
                scene,
                size.x,
                size.y,
                wallTexture,
                new BABYLON.Vector3(
                    position.x,
                    position.y,
                    position.z-size.z/2),
                Math.PI,
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
                    position.y,
                    position.z),
                3/2*Math.PI,
                doors[3])
    }
}