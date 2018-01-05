/**
 * @file 粒子集合，随机粒子 RandomParticles 和模型粒子 modelParticles 的父类，每个场景可包含多个particles
 * @author 陈蔓青
 */
const textureImg = require('../../textures/sprites/disc.png');
const THREE = require('three');

const basicMaterial = new THREE.ShaderMaterial({ // 粒子材质
    uniforms: {
        color: {
            value: new THREE.Color(0xffffff)
        },
        texture: {
            value: new THREE.TextureLoader().load(`dist/${textureImg}`)
        }
    },
    // 定义的顶点着色器，和片元着色器，它们负责具体的粒子状态的运算
    vertexShader: document.getElementById('vertexshader').textContent,
    fragmentShader: document.getElementById('fragmentshader').textContent,
    alphaTest: 0.9
});
/**
 * 粒子集合
 * @start-def: Particles: {Class}
 **/
export default class Particles {
    constructor() {
        /*
        *   verticesInfo: {Object}
        *     格式如下：
        *
        *     [ -1, -1, -1  // x,y,z
        *
        *       -1, 0, 1
        *
        *       ...
        *
        *     ]
        *
        *     .positions: {Array} // xyz 位置数组（二位矩阵）
        *     .colors: {Array} // HSL 颜色数组（二位矩阵），格式同 positions
        *     .sizes: {Array} // 大小数组，例如 size[1,2,3,4,2,1,2,3];
        *
        */
        this.vertexInfo = {
            positions: [],
            colors: [],
            sizes: []
        }
        this.PARTICLE_SIZE = 14;
        this.particles = '';

    }


    /**
     * 添加粒子集合
     * @def: .setParticles: (vertices, material) => null
     *   verticesInfo: {Object} // 顶点相关信息，通常为 #@createRandomVertex 或者 #@createModelVertex 返回的信息
     *   material: {PointsMaterial} // 顶点材质，如果不传默认数值 {color: 0x888888, size: 2}
     **/
    setParticles(material = basicMaterial) {
        const verticesLen = this.vertexInfo.sizes.length;
        const geometry = new THREE.BufferGeometry(); // 使用缓存几何模型

        geometry.addAttribute('position', new THREE.BufferAttribute(this.vertexInfo.positions, 3));
        geometry.addAttribute('customColor', new THREE.BufferAttribute(this.vertexInfo.colors, 3));
        geometry.addAttribute('size', new THREE.BufferAttribute(this.vertexInfo.sizes, 1));

        // 添加粒子
        this.particles = new THREE.Points(geometry, material);
    }

    setVertexInfo(vertexInfo) {
        this.vertexInfo = vertexInfo;
    }

    // 获取粒子集合 THREE.Points 对象
    getParticles(material = basicMaterial) {
        this.setParticles(material);
        return this.particles;
    }

    // 获取粒子信息
    getVertexInfo() {
        return this.vertexInfo;
    }

    /**
     * 改变粒子的大小形状，默认使用 cpu 更新机制
     * @def: .changePoints: (type, arr) => res
     *   type: {String} // 需要更改的模型信息，'position' || 'color' || 'size'
     *   arr: {Array} // 更新后的数组
     *   res: {Object} // 返回信息，包含新数组和旧数组
     *     .newArray: {Array} // 更新后的数组
     *     .oldArray: {Array} // 更新前的数组
     **/
    changePoints(type, arr) {
        const geometry = this.particles.geometry;
        const attributes = geometry.attributes;

        const res = {
            newArray: arr,
            oldArray: []
        };
        // particles.material.uniforms.color.value = new THREE.Color(0x00ff00);

        if (type === 'position') { // 位置
            res.oldArray = attributes.position.array;
            attributes.position.array = arr;
            attributes.position.needsUpdate = true;
        } else if (type === 'color') { // 颜色

            res.oldArray = attributes.customColor.array;
            attributes.customColor.array = arr;
            attributes.customColor.needsUpdate = true;

        } else if (type === 'size') { // 大小
            res.oldArray = attributes.size.array;
            attributes.size.array = arr;
            attributes.size.needsUpdate = true;
        }
        return res;
    }

    /**
     * 改变粒子集合信息，暂时只支持缓存几何体
     * @def: .changeParticles: (type, val) => null
     *   type: {String} // 需要改变的粒子集合的信息
     *      scale:  // 缩放，默认 [0,0,0]
     *      rotate:  // 旋转，默认 [1,1,1]
     *      translate: // 位移，默认 [0,0,0]
     *   val: {Array} // 相关参数的数值 [x,y,z]
     */
    translate({x,y,z}) {
        this.particles.position.x = (x == undefined)?this.particles.position.x : x;
        this.particles.position.y = (y == undefined)?this.particles.position.y : y;
        this.particles.position.z = (z == undefined)?this.particles.position.z : z;
    }
    scale({x,y,z}) {
        this.particles.scale.x = x || this.particles.scale.x;
        this.particles.scale.y = y || this.particles.scale.y;
        this.particles.scale.z = z || this.particles.scale.z;
    }

    rotate({x,y,z}) {
        this.particles.rotation.x = (x == undefined)?this.particles.rotation.x : x;
        this.particles.rotation.y = (y == undefined)?this.particles.rotation.y : y;
        this.particles.rotation.z = (z == undefined)?this.particles.rotation.z : z;

    }

}
