import THREE from 'three';
import TrackballControls from 'three-trackballcontrols';
import Stats from 'stats.js';
import TWEEN from '@tweenjs/tween.js';
import {
    PonitScene,
    animate
} from './js/PointScene';

import Particles from './js/particles/Particles';
import RandomParticles from './js/particles/RandomParticles';
import ModelParticles from './js/particles/ModelParticles';

const pointScene = new PonitScene({ // 初始化场景
    container: document.getElementById('container'),
    dev: true,
    renderType: 'gpu'
});

/* 初始化生成随机点 */
const randomParticles = new RandomParticles({
    randomNum: 100,
    MINPOS: -150,
    MAXPOS: 150,
    color: 'rgb(186, 252, 255)',
    size: 4
}); // 生成随机点
const bg = randomParticles.getParticles();
bg.name = 'backGroundParticles';
pointScene.addParticles(bg);

animate();

var coords = {
    x: {a:1},
    y: {b:1}
};

var tween = new TWEEN.Tween(coords)
    .to({x:{a:2}, y:{b:2}}, 1000)
    .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
    .onUpdate(obj => { // Called after tween.js updates 'coords'.
        console.log(obj)
        // Move 'box' to the position described by 'coords' with a CSS translation.
        // box.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)');
    })
    .start(); // Start the tween immediately.