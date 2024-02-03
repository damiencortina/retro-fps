import * as BABYLON from 'babylonjs'
import {World} from './world/World'
import {Player} from './Player'

export class Game{
    canvas
    engine
    scene
    fps
    world
    player
    constructor(){
        this.canvas = document.getElementById('renderCanvas') as HTMLCanvasElement
        this.engine = this.initEngine()
        this.scene = this.initScene()
        this.fps = 0
        this.world = new World(this.scene)
        this.player = new Player(this)
    }

    initScene(){
        let scene = new BABYLON.Scene(this.engine)
        scene.gravity = new BABYLON.Vector3(0, -9.81, 0)
        scene.collisionsEnabled = true
        this.engine.runRenderLoop(()=>this.renderLoop())
        return scene
    }

    initEngine(){
        let engine = new BABYLON.Engine(this.canvas, true, {preserveDrawingBuffer: true, stencil: true})
        window.addEventListener('resize', ()=>{
            engine.resize()
        })
        return engine
    }

    renderLoop(){
        this.fps = Math.round(1000/this.engine.getDeltaTime())
        this.player.checkMove((this.fps)/60,)
        this.scene.render()
    }

    static degToRad(deg: number){
        return (Math.PI*deg)/180
    }

    static radToDeg(rad: number)
    {
        return (rad*180)/Math.PI
    }
}