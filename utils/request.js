// 
// const baseUrl = 'http://192.168.133.18:12002/safety-server/api'
var BASE_URL = 'http://192.168.133.18:12002/safety-server/api'
// #ifdef H5
BASE_URL = '/web'; //H5下将地址修改为/dpc
// #endif
// 
export function request(url, type, date, tips) {
	// console.log(url, type, date)
	// 默认为开启错误提示
	if (tips == undefined) {
		tips = {
			showError: true, //开启错误提示
		}
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url, //由基础路径和接口地址
			method: type || "GET", //请求的方式必须大写
			data: date || {}, //参数
			header: {
				'content-type': 'application/json; charset=utf-8',
				'token': uni.getStorageSync('token')
			},
			// 成功使用resolve
			success: (res) => {
				console.log(res)
				if (res.data && res.data.code == 0) {
					resolve(res.data)
				} else {
					/**
					 * 请求失败，是否要提示出来;
					 * showError: true,开启错误提示
					 *  showError: false,关闭错误提示
					 * */
					if (tips.showError) {
						showError(res);
					}
					resolve(res)
				}
			},
			//失败调用reject，
			fail: (err) => {
				// 失败做处理
				console.log(err)
				if (tips.showError) {
					showError(res);
				}
				reject(err)
			}
		});
	})
}

// 错误处理
const showError = (error) => {
	// console.log(error)
	if (error.data.msg == 'token失效_01') {
		uni.removeStorage('token');
		uni.showToast({
			title: '请重新登录',
			icon: 'none',
			duration: 2000
		});
		setTimeout(() => {
			uni.reLaunch({
				url: ''
			})
		}, 2000)
	} else {
		uni.showToast({
			title: error.data.msg,
			icon: 'none',
			duration: 1000
		});

	}
}
