/**
 * @file 3D 例子场景类
 * @author 陈蔓青
 */

var THREE = require('three');
var TrackballControls = require('three-trackballcontrols');
var Stats = require('stats.js');
var TWEEN = require('@tweenjs/tween.js');

/* 调试模式开启的工具 */
let controls; // 相机控制器
let stats; // 检测状态的

let container;
let scene;
let camera;
let renderer;

let particles; // 粒子集合

const PARTICLE_SIZE = 20;

let dev = false;
/**
 * 粒子场景
 * @start-def: PonitScene: {Class}
 **/
class PonitScene {

    /**
     * @def: .constructor: conf => null
     *   dev: {boolean} // 是否为调试模式，包含 TrackballControls，stats，AxisHelper。很蛋疼的这里 stats 在代码里写死了 fixed 定位，如果要改就去 node_modules 把 stats.min.js 的相关样式给去了 🤷‍
     *   container: {DOM}  // 容器，如果没有就新建一个 append 到 body
     *   renderType: {String} // 渲染方式，'gpu' 或者 'cpu'
     **/
    constructor(conf) {
        container = conf.container;
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
        camera.position.z = 220;
        camera.position.y = 0;

        renderer = new THREE.WebGLRenderer({
            antialias: true, //反锯齿
            precision: "highp", //精度范围
            alpha: true, //是否可以设置背景色透明
            premultipliedAlpha: true, //默认true ,canvas与canvas的背景或者整个页面的背景是否融合.
            stencil: false, //是否支持模板缓冲
            preserveDrawingBuffer: true, //是否保存绘图缓冲
        });

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        dev = conf.dev;
        if (dev) {
            this.openDevTool()
            const axes = new THREE.AxesHelper(1000);
            scene.add(axes);
        };

    }

    /* 调试模式，打开帧数记录和控制器 */
    openDevTool() {
        //  控制器
        controls = new TrackballControls(camera);
        controls.rotateSpeed = 1.0;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
        controls.noZoom = false;
        controls.noPan = false;
        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;
        controls.keys = [65, 83, 68];
        controls.addEventListener('change', function () {
            render();
        });

        //  记录帧率
        // 很蛋疼的这里 stats 在代码里写死了 fixed 定位
        // 如果要改就去 node_modules 把 stats.min.js 的相关样式给去了 🤷‍
        const statsWrap = document.querySelector('.stats-wrap');
        stats = new Stats();
        statsWrap.appendChild(stats.dom);
    }


    addParticles(particles) {
        scene.add(particles);
    }
    removeParticles(object3D) {
        scene.remove(object3D)
    }

    // TODO
    // 根据屏幕计算偏移量，以及缩放信息
    // 默认模型居中显示
    // （如果直接缩小粒子会显得十分密集）
    //

}

function render() {
    // particles.rotation.y += 0.001;
    // window.animator.update();
    setCamera();
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    render();
    TWEEN.update();
    if (dev) {
        stats.update();
        controls.update();
    }

}



//TODO 事件绑定，需要统一于优化
const config = {
    SCREEN_WIDTH: window.innerWidth,
    SCREEN_HEIGHT: window.innerHeight,
    SCREEN_HALFX: window.innerWidth / 2,
    SCREEN_HALFY: window.innerHeight / 2,
    cameraSpeed: .4,
    cameraMaxX: 25,
    cameraMaxY: 130,
    mouseX: 0,
    mouseY: 0,
}
const handleEvent = () => {
    // (process.env.NODE_ENV === 'pro') && cameraMove();
    resize();
}
const cameraMove = () => {
    document.addEventListener('mousemove', e => {
        config.mouseX = e.clientX - config.SCREEN_HALFX;
        config.mouseY = e.clientY - config.SCREEN_HALFY;
    });
}

let curScreenW = window.innerWidth;
let curScreenH = window.innerHeight;

const resize = () => {
    // 窗口大小更改
    window.onresize = function () {
        // 设置透视摄像机的长宽比
        camera.aspect = window.innerWidth / window.innerHeight;
        // 摄像机的 position 和 target 是自动更新的，而 fov、aspect、near、far 的修改则需要重新计算投影矩阵（projection matrix）
        camera.updateProjectionMatrix();
        // 设置渲染器输出的 canvas 的大小
        renderer.setSize(window.innerWidth, window.innerHeight);
        dev && controls.handleResize();
    };
}

const setCamera = () => {
    const increX = camera.position.x + (config.mouseX / config.SCREEN_HALFX) * config.cameraSpeed;
    const increY = camera.position.y + (-config.mouseY / config.SCREEN_HALFY) * config.cameraSpeed;

    if (Math.abs(increX) < config.cameraMaxX) {
        camera.position.x = increX;
    }
    if ((increY > config.cameraMaxY - 20) && increY < config.cameraMaxY) {
        camera.position.y = increY;
    }
}

handleEvent();

export {
    PonitScene,
    animate
};