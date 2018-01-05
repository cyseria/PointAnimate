module.exports = {
    projectKey: 'PointAnimate-0.0.1',
    projectName: 'PointAnimate',
    version: '0.0.1',
    // 解析的根目录
    root: __dirname,
    // 生成的目标文件目录
    dist: __dirname + '/dist/jsdef',
    // root下忽略检测目录, 带.前缀的文件和文件夹默认忽略
    // array of regex
    excludes: [/^\/node_modules/],
    // doc文件过滤相关
    doc: {
        includes: [/^\/doc\//],
        resolves: [/\.md$/],
        excludes: []
    },
    // source文件过滤相关
    src: {
        includes: [/^\/src\//],
        resolves: [/\.js$/],
        excludes: [/__test/]
    }
};