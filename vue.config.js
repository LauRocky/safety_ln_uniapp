module.exports = {
	devServer:{
		port:'12003',
		disableHostCheck:true,
		proxy:{
			'/api':{
				target:'http://192.168.133.18:10002/safety-server/api/',
				changeOrigin:true,
				secure:false,
				pathRewrite:{
					'^/api': ''
				}
			}
		}
	}
}