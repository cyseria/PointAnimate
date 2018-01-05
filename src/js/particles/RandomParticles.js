/**
 * @file 随机粒子集合
 * @author 陈蔓青
 */

var THREE = require('three');
import Particles from './Particles';

/**
 * 随机粒子集合，随机生成坐标信息，大小则根据 sizes
 * @start-def: RandomParticles: {Class} conf => verticesInfo
 *   需要随机的粒子数量
 *   conf.randomNum: {Number}
 *   conf.MINPOS: {Number}  // 最小坐标
 *   conf.MAXPOS: {Number}  // 最大坐标
 *   conf.color: {String || Float32Array} // 颜色信息
 *   conf.size: {Number || Float32Array} // 大小信息
 *   verticesInfo: {Object} // 返回顶点的存储信息，参照 #@createModelVertex 中的返回
 **/

export default class RandomParticles extends Particles {
    constructor({randomNum = 1000, MINPOS = -100, MAXPOS = 100, color = '', size = 4 }) {
        super();
        let positions, colors, sizes;
        let vertexsColor, vertexsSize; // 单个顶点信息
        positions = new Float32Array(randomNum * 3); // 存储位置信息

        // 是否需要遍历设置粒子颜色
        const isSetColor = this.isSetColor(color);
        if (isSetColor) { // 需要遍历设置颜色
            colors = new Float32Array(randomNum * 3);
            vertexsColor = new THREE.Color(color);
        } else {
            colors = color;
        }

         // 是否需要遍历设置粒子大小
        const isSetSize = this.isSetSize(size);

        if (isSetColor) { // 需要遍历设置大小
            sizes = new Float32Array(randomNum);
            vertexsSize = size;
        } else {
            sizes = size;
        }

        const vertex = new THREE.Vector3();
        for (let i = 0, l = randomNum; i < l; i++) {
            // 设置顶点位置信息
            vertex.x = this.getRandomNum(MINPOS, MAXPOS);
            vertex.y = this.getRandomNum(MINPOS, MAXPOS);
            vertex.z = this.getRandomNum(MINPOS, MAXPOS);
            vertex.toArray(positions, i * 3);

            // 设置顶点颜色信息
            if (isSetColor) {
                vertexsColor.toArray(colors, i * 3);
            }
            if (isSetSize) {
                sizes[i] = vertexsSize;
            }
        }

        this.vertexInfo = {
            positions,
            colors,
            sizes
        }
    }

    isSetColor(color) {
        if (Object.prototype.toString.call(color) === '[object Float32Array]') {
            return false;
        }
        return true;
    }

    isSetSize(size) {
        if (Object.prototype.toString.call(size) === '[object Array]') {
            return false;
        }
        return true;
    }

    // 获取 min-max 之间的随机数
    getRandomNum(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}