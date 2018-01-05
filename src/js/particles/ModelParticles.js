/**
 * @file 模型粒子集合
 * @author 陈蔓青
 */
var THREE = require('three');
import Particles from './Particles';
import _ from '../../lib/until';

/**
 * 模型粒子集合
 * @start-def: ModelParticles: {Class}
 **/
export default class ModelParticles extends Particles {
    constructor() {
        super();
    }

    /**
     * 上传模型
     * @def: .loadPoints: (path, material) => modelVertexInfo
     *   path: {string} // 要加载的模型的 json 路径信息
     *   offset: {Object}
     *     RotationX: {Number} // 绕 X 轴旋转角度，2*PI 为一圈，eg: Math.PI /2
     *     RotationY: {Number} // 绕 Y 轴旋转角度，2*PI 为一圈，eg: Math.PI /2
     *     RotationZ: {Number} // 绕 Z 轴旋转角度，2*PI 为一圈，eg: Math.PI /2
     *     Translation: {Array} // 位移 [x,y,z]
     *     Scale: {Array} // 缩放大小 [x,y,z]
     *   vertices: {Promise} // 顶点集合 vertices
     **/

    loadPoints(path, offset) {
        return new Promise((resolve, reject) => {
            const loader = new THREE.JSONLoader();

            loader.load(path, geometry => {
                // 顶点信息, [{x:10, y:10, z:10}, ...]
                const vertices = geometry.vertices;

                const verticesLen = vertices.length;
                const positions = new Float32Array(verticesLen * 3); // 存储位置信息
                const colors = new Float32Array(verticesLen * 3);
                const sizes = new Float32Array(verticesLen);

                let vertex;
                let color = new THREE.Color(0x00bcbc);

                let offsetMatrix4;

                if (offset) {
                    offsetMatrix4 = _.getMatrix4(offset);
                }

                // 读取顶点信息
                for (let i = 0, l = verticesLen; i < l; i++) {
                    vertex = !offset ? vertices[i] : vertices[i].applyMatrix4(offsetMatrix4);
                    // add(offestVector).
                    vertex.toArray(positions, i * 3);
                    // color.setHSL(0.01 + 0.1 * (i / l), 1.0, 0.5); // 颜色
                    color.toArray(colors, i * 3);
                    sizes[i] = this.PARTICLE_SIZE * 0.2; // 大小
                }
                this.vertexInfo.positions = positions;
                this.vertexInfo.colors = colors;
                this.vertexInfo.sizes = sizes;

                resolve(vertices);
            });
        })
    }

    
}