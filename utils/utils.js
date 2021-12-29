export function scanCode() {   //扫码
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
export function removeTag(text) {    //去除标签
	var reg = /<[^<>]+>/g
	text = text.replace(reg, '')
	text = text.replace(/&nbsp;/ig, '')
	text = text.replace(/&ldquo;/ig, '')
	text = text.replace(/&rdquo;/ig, '')
	return text
}
