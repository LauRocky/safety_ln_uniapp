
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/index","pages/home/index","pages/dangerList/index","pages/projectProgress/index","pages/projectProgress/detail","pages/video/index","pages/my/index"],"tabBar":{"color":"#A9A9A9","selectedColor":"#00B490","borderStyle":"#F8F8F8","blurEffect":"dark","backgroundColor":"#f8f8f8","list":[{"pagePath":"pages/home/index","text":"首页","iconPath":"static/tabBar/home.png","selectedIconPath":"static/tabBar/home1.png","visible":true},{"pagePath":"pages/dangerList/index","text":"隐患","iconPath":"static/tabBar/dangerous.png","selectedIconPath":"static/tabBar/dangerous1.png","visible":true},{"pagePath":"pages/projectProgress/index","text":"项目进度","iconPath":"static/tabBar/progress.png","selectedIconPath":"static/tabBar/progress1.png","visible":true},{"pagePath":"pages/video/index","text":"视频","iconPath":"static/tabBar/video.png","selectedIconPath":"static/tabBar/video1.png","visible":true},{"pagePath":"pages/my/index","text":"我的","iconPath":"static/tabBar/my.png","selectedIconPath":"static/tabBar/my1.png","visible":true}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"safety_ln_app","compilerVersion":"3.2.16","entryPagePath":"pages/login/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/index","meta":{"isQuit":true},"window":{"navigationBarBackgroundColor":"#11B38C","navigationBarTitleText":"登录","navigationStyle":"custom","titleNView":false,"bounce":"none"}},{"path":"/pages/home/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarBackgroundColor":"#11B38C","navigationBarTitleText":"","titleNView":{"buttons":[{"float":"right","text":"","fontSize":"40upx","fontSrc":"/static/font/iconfont.ttf"},{"float":"left","text":"首页","fontSize":"30upx"}]}}},{"path":"/pages/dangerList/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarBackgroundColor":"#11B38C","navigationBarTitleText":"","titleNView":{"buttons":[{"float":"right","text":"","fontSize":"40upx","fontSrc":"/static/font/iconfont.ttf"},{"float":"left","text":"隐患列表","fontSize":"30upx","width":"70"}]}}},{"path":"/pages/projectProgress/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarBackgroundColor":"#11B38C","navigationBarTitleText":"","navigationStyle":"custom","titleNView":false,"bounce":"none"}},{"path":"/pages/projectProgress/detail","meta":{},"window":{"navigationBarBackgroundColor":"#11B38C","navigationBarTitleText":"","navigationStyle":"custom","titleNView":false,"bounce":"none"}},{"path":"/pages/video/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarBackgroundColor":"#11B38C","navigationBarTitleText":"","navigationStyle":"custom","titleNView":false,"bounce":"none"}},{"path":"/pages/my/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarBackgroundColor":"#11B38C","navigationBarTitleText":"","titleNView":{"buttons":[{"float":"right","text":"","fontSize":"40upx","fontSrc":"/static/font/iconfont.ttf"},{"float":"left","text":"我的","fontSize":"30upx"}]}}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
