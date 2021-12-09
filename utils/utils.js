import { request } from "./request.js"
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
// 封装查字典方法
export function getDictList(dictType) {
  return new Promise(resolve => {
    request('/dict/list','GET',{type: dictType}).then(({
      data
    }) => {
      resolve(data.dict)
    }) 
  }) 

}
