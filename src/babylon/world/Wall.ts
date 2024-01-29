import * as BABYLON from "babylonjs"
import {World} from "./World"

export class Wall{
    id:string
    width:number
    height:number
    position:BABYLON.Vector3
    constructor(
        id:string,
        scene:BABYLON.Scene,
        width:number,
        height: number, 
        textureFile: string,
        position: BABYLON.Vector3,
        angle: number,
        door:any = null
    ) {
        this.id = id
        this.width = width
        this.height = height
        this.position = position
        if(door) {
            this.createWallWithDoor(id, scene, width, height, textureFile, position, angle, door)
        } else {
            this.createWall(id, scene, width, height, textureFile, position, angle)
        }    
    }

    createWall(
        id:string,
        scene:BABYLON.Scene,
        width:number,
        height: number, 
        textureFile: string,
        position: BABYLON.Vector3,
        angle: number,) {
        this.createPlane(id, scene, width, height, textureFile, position, angle)
    }

    createWallWithDoor(
        id:string,
        scene:BABYLON.Scene,
        width:number,
        height: number, 
        textureFile: string,
        position: BABYLON.Vector3,
        angle: number,
        door:any
    ){
        let doorWidth = door.width
        let doorHeight = door.height
        let doorPosition = door.position
        if(doorWidth > width || doorHeight > height){
            console.log('Door bigger than wall '+id+', call an architect')
        }else {
            let leftPlaneWidth = doorPosition.x - doorWidth / 2
            if (leftPlaneWidth > 0) {
                this.createPlane(
                    id + '_left_plane',
                    scene,
                    leftPlaneWidth,
                    height,
                    textureFile,
                    new BABYLON.Vector3(
                        position.x - width/2 + doorPosition.x - doorWidth / 2 - leftPlaneWidth / 2,
                        position.y,
                        position.z
                    ),
                    angle
                )
            }
            let rightPlaneWidth = width - doorWidth - leftPlaneWidth
            if (rightPlaneWidth > 0) {
                this.createPlane(
                    id + '_right_plane',
                    scene,
                    rightPlaneWidth,
                    height,
                    textureFile,
                    new BABYLON.Vector3(
                        position.x - width/2 + doorPosition.x + doorWidth / 2 + rightPlaneWidth / 2,
                        position.y,
                        position.z
                    ),
                    angle
                )
            }
            let bottomPlaneHeight = doorPosition.y - doorHeight / 2
            if (bottomPlaneHeight > 0) {
                this.createPlane(
                    id + '_bottom_plane',
                    scene,
                    doorWidth,
                    bottomPlaneHeight,
                    textureFile,
                    new BABYLON.Vector3(
                        position.x - width/2 + doorPosition.x,
                        position.y - height/2 + doorPosition.y - doorHeight / 2 - bottomPlaneHeight / 2,
                        position.z
                    ),
                    angle
                )
            }
            let topPlaneHeight = height - doorHeight - bottomPlaneHeight
            if (topPlaneHeight > 0) {
                this.createPlane(
                    id + '_top_plane',
                    scene,
                    doorWidth,
                    topPlaneHeight,
                    textureFile,
                    new BABYLON.Vector3(
                        position.x - width/2 + doorPosition.x,
                        position.y - height/2 + doorPosition.y + doorHeight / 2 + topPlaneHeight / 2,
                        position.z
                    ),
                    angle
                )
            }
        }
    }

    createPlane(
        id:string,
        scene:BABYLON.Scene,
        width:number,
        height: number, 
        textureFile: string,
        position: BABYLON.Vector3,
        angle: number,
    ){
        let texture = new BABYLON.Texture(textureFile, scene, undefined, undefined, BABYLON.Texture.NEAREST_SAMPLINGMODE)
        texture.uScale = width/World.pixelRatio
        texture.vScale = height/World.pixelRatio
        let wallMaterial = new BABYLON.StandardMaterial(id+"_material", scene)
        wallMaterial.diffuseTexture = texture;
        let plane = BABYLON.MeshBuilder.CreatePlane(id,{
            width: width,
            height: height
        } ,scene)
        plane.position = position
        plane.rotation.y = angle
        plane.material = wallMaterial
    }
}