 export var BASE_URL = 'https://esq.zhongqian.info:1443/api'  //测试环境 
/* export var BASE_URL = 'https://esq.cgdg.com/api'//正式环境 */
// export var BASE_URL = 'http://192.168.11.129:12002/safety-server/api'  //测试环境
// #ifdef H5
BASE_URL = '/web'; //H5下将地址修改为/web 
// #endif
import {
	is_iOS
} from './utils.js';
export function request(url, type, date, tips) {
	// 默认为开启错误提示
	/* if (tips) {
		tips = {
			showError: true, //开启错误提示
		}
	} */
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
				if (res.data && res.data.code == 0) {
					resolve(res.data)
				} else {
					/**
					 * 请求失败，是否要提示出来;
					 * showError: true,开启错误提示
					 *  showError: false,关闭错误提示
					 * */
					showError(res);
					resolve(res)
				}
			},
			//失败调用reject，
			fail: (err) => {
				// 失败做处理
				reject(err)
			}
		});
	})
}

// 错误处理
const showError = (res) => {
	if (res.data.code == 111 || res.data.code == 100 || res.data.code == 401) {
		uni.clearStorage();
		uni.showToast({
			title: 'Token超期',
			icon: 'none',
			duration: 2000
		});
		setTimeout(() => {
			uni.reLaunch({
				url: '/pages/login/index'
			})
		}, 2000)
	}
}
