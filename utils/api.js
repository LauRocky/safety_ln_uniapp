import {
	request
} from "./request.js"

// 封装查字典方法
export function getDictList(dictType) {
	return new request('/dict/list', 'GET', {
		type: dictType
	})
}
