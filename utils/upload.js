import {
	BASE_URL
} from './request.js';

function chooseImg(count, success) {
	console.log(count)
	uni.chooseImage({
		sizeType: ['compressed'],
		sourceType: ['camera', 'album'],
		count: count,
		success: res => {
			// console.log(res)
			console.log(res.tempFilePaths)
			uploadFiles(res.tempFilePaths, success)
		}
	})
}

async function uploadFiles(paths, success) {
	uni.showLoading({
		title: '正在上传'
	})
	for (let path of paths) {
		try {
			const uploadData = await uploadFile(path)
			success(uploadData)
		} catch (err) {
			console.log(err)
			uni.showToast({
				title: err || '上传失败',
				icon: 'error',
				mask: true
			})
			break;
		}
	}
	uni.hideLoading()
}

function uploadFile(path) {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: BASE_URL + '/upload/image',
			filePath: path,
			name: 'pic',
			header: { //（根据自身接口要求选择）
				'accept': '*/*',
				"Content-Type": "application/x-www-form-urlencoded",
				"token": uni.getStorageSync('token')
			},
			formData: { //上传文件的额外参数（根据自身接口要求选择）
				type: 1
			},
			success: res => {
				console.log('上传文件', res)
				const imgRes = JSON.parse(res.data)
				if (imgRes.code == 200) {
					resolve(imgRes.data)
				} else {
					reject('上传失败');
				}
			},
			fail: () => {
				reject('网络错误');
			}
		});
	})
}

module.exports = {
	uploadImg: chooseImg,
}
