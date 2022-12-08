import * as BABYLON from "babylonjs";
import {World} from "./World"

export class Wall{
    id
    width
    height
    position
    constructor(id, scene, width, height, texture, position, angle, door = null) {
        this.id = id
        this.width = width
        this.height = height
        this.position = position
        if(door) {
            this.createWallWithDoor(id, scene, width, height, texture, position, angle, door)
        } else {
            this.createWall(id, scene, width, height, texture, position, angle)
        }    }

    createWall(id, scene, width, height, texture, position, angle) {
        this.createPlane(id, scene, width, height, texture, position, angle)
    }

    createWallWithDoor(id, scene, width, height, texture, position, angle, door){
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
                    texture,
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
                    texture,
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
                    texture,
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
                    texture,
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

    createPlane(id, scene, width, height, texture, position, angle){
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