
import {
	request
} from "./request.js"

// 封装查字典方法
export function getDictList(dictType) {
	return new request('/dict/list', 'GET', {
		type: dictType
	})
}
// 监控预警
export function  monitoring() {
		return new request('/notification/cameraAlarmList', 'GET', {
	})
}
// 待办
export function  alerts() {
		return new request('/upcoming/page', 'POST', {
			readStatus: "",
			page: "",
			limit: "",
	})
}
 