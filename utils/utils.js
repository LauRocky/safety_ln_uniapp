export function scanCode() {
	return new Promise((resolve, reject) => {
		uni.scanCode({
			success: function(res) {
				resolve(res)
				console.log('条码类型：' + res.scanType);
				console.log('条码内容：' + res.result);
			},
			fail: function(err) {
				reject(err)
			},
		});
	})
}
