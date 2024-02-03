import * as BABYLON from 'babylonjs'
import {Wall} from "./Wall"
import {World} from "./World"

type Size = {x:number, y:number, z:number}

export class Room{
    id
    position
    size
    ground: BABYLON.GroundMesh
    ceiling: BABYLON.Mesh
    frontWall: Wall
    backWall: Wall
    rightWall: Wall
    leftWall: Wall
    constructor(
        id: string,
        position: BABYLON.Vector3,
        size: Size,
        floorTextureFile: string,
        ceilingTextureFile: string,
        wallTextureFile: string,
        doors: any[],
        scene: BABYLON.Scene
    ) {
        this.id = id
        position.y += size.y/2
        this.position = position
        this.size = size
        this.createFloor(id, position, size, floorTextureFile, scene)
        this.createCeiling(id, position, size, ceilingTextureFile, scene)
        this.createWalls(id, position, size, wallTextureFile, doors, scene)
    }

    createFloor(
        id: string,
        position: BABYLON.Vector3, 
        size: Size,
        floorTextureFile: string,
        scene:BABYLON.Scene,
    ){
        let floorTexture = new BABYLON.Texture(floorTextureFile, scene, undefined, undefined, BABYLON.Texture.NEAREST_SAMPLINGMODE)
        floorTexture.uScale = size.x/World.pixelRatio
        floorTexture.vScale = size.z/World.pixelRatio
        let floorMaterial = new BABYLON.StandardMaterial(id+"_floor_material", scene)
        floorMaterial.diffuseTexture = floorTexture
        let ground = BABYLON.MeshBuilder.CreateGround(id+"_ground", {
            width: size.x,
            height: size.z
        }, scene)
        ground.position = new BABYLON.Vector3(position.x, position.y-size.y/2, position.z)
        ground.material = floorMaterial
        this.ground = ground
    }

    createCeiling(
        id: string,
        position: BABYLON.Vector3,
        size: Size,
        ceilingTextureFile: string,
        scene: BABYLON.Scene
    ){
        let ceilingMaterial = new BABYLON.StandardMaterial(id+"_ceiling_material", scene)
        let ceilingTexture = new BABYLON.Texture(ceilingTextureFile, scene, undefined, undefined, BABYLON.Texture.NEAREST_SAMPLINGMODE)
        ceilingTexture.uScale = size.x/World.pixelRatio
        ceilingTexture.vScale = size.z/World.pixelRatio
        ceilingMaterial.diffuseTexture = ceilingTexture
        let ceiling = BABYLON.MeshBuilder.CreatePlane(id+"_ceiling", {
            width: size.x,
            height: size.z,
        }, scene)
        ceiling.position = new BABYLON.Vector3(position.x, position.y+size.y/2, position.z)
        ceiling.material = ceilingMaterial
        ceiling.rotation =  new BABYLON.Vector3( -Math.PI/2,0, 0)
        this.ceiling = ceiling
    }

    createWalls(
        id:string,
        position:BABYLON.Vector3,
        size:Size,
        wallTextureFile: string,
        doors: any[],
        scene:BABYLON.Scene
    ){
        this.frontWall =
            new Wall(
                id+'_front_wall',
                scene,
                size.x,
                size.y,
                wallTextureFile,
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
                wallTextureFile,
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
                wallTextureFile,
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
                wallTextureFile,
                new BABYLON.Vector3(
                    position.x-size.x/2,
                    position.y,
                    position.z),
                3/2*Math.PI,
                doors[3])
    }
}