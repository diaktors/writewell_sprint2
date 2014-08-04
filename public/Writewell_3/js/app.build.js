//This is for r.js to minify and combine everything
//Defaults: https://github.com/jrburke/r.js/blob/master/build/example.build.js
({
    appDir: '../',
    baseUrl: 'js',
    dir: '../web_optimized', //output directory

    //appDir: '',
    //baseUrl: '/js',
    //dir: 'sell-n.web_optimized',//output directory

    //modules: [{ name: 'main'}], //easy version: optimize all js

    mainConfigFile: 'main.js',
    //keepBuildDir: true,
    optimize: 'uglify2',
    //skipDirOptimize: false,
    generateSourceMaps: false, //true for production debugging
    //normalizdeDirDefines: 'skip',//we default to optimizing everything, so skip this
    //uglify2: {}, //use default optimization.  Should use source mapping to know where the error is ocurring!!!
    uglify2: {
        //Example of a specialized config. If you are fine
        //with the default options, no need to specify
        //any of these properties.
        output: {
            beautify: false
        },
        compress: {
            sequences: true,
            properties: true,
            dead_code:true,
            drop_debugger: true,
            unsafe: true,
            conditionals: true,
            comparisons: true,
            evaluate: true,
            booleans: true,
            loops: true,
            unused: true,
            hoist_funs: true,
            hoist_vars: true,
            if_return: true,
            join_vars: true,
            cascade: true,
            negate_iife: true,
            pure_getters: true,
            //pure_funcs: true,
            drop_console: true,
            global_defs: {
                DEBUG: false
            }
        },
        warnings: true,
        mangle: {
            sort: true,
            toplevel: true,
            eval: false
        },
    },
    optimizeCss: 'standard', //make css as optimized as possible
    //cssImportIgnore: null,//don't skip any css files for optimization
    ////cssIn: 'css/main.css',
    ////cssPrefix:'', //usually not needed
    //inlineText: true,
    useStrict: false, //usually false
    //namespace: 'truck-n',//sets up truck-n.define() vs just define()
    skipModuleInsertion: false, //false includes 'define()' in all files
    optimizeAllPluginResources: true, //default is false
    findNestedDependencies: true, //default is false
    removeCombined: true, //default is false
    ////modules: [{ name: 'require-jquery' }, { name: 'main', ecxlude: ['jquery'] }],
    ////name: 'main',//main module??
    ////out:'../optimized/optimized-main.js',//the output file name
    fileExclusionRegExp: /^(\.DS_Store|web_optimized.*|optimize.sh|\.git.*|node_modules.*|server.js)/,
    preserveLicenseComments: false,
    //logLevel: 0,//0 is default and TRACE
    waitSeconds: 100 //0 disables waiting interval, default is 7
})