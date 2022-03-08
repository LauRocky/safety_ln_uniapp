import {
	request
} from "./request.js"

// 封装查字典方法
export function getDictList(dictType) {
	return request('/dict/list', 'GET', {
		type: dictType
	})
}
// 监控预警
export function monitoring() {
	return request('/notification/cameraAlarmList', 'GET', {})
}
// 待办
export function alerts() {
	return request('/todo/page', 'GET', {
		status: "0",
		page: "",
		limit: "",
	})
}
export function monitorMessage() {
	request('/app/notify/count', 'POST', {}, false)
		.then(res => {
			if (res.code == 0) {
				if (res.data.problemUnread || res.data.fileNoticeUnread) {
					uni.showTabBarRedDot({
						index: 4
					});
				} else {
					uni.hideTabBarRedDot({
						index: 4
					});
				}
			}
		})
		.catch(err => {
			console.log(err);
		});
}
export function _handIds(id) {
	request(`/msg/read`, `POST`, {
		ids: [id]
	}, false)
}
