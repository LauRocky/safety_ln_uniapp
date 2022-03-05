export function scanCode() { //扫码
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
export function removeTag(text) { //去除标签
	var reg = /<[^<>]+>/g
	text = text.replace(reg, '')
	text = text.replace(/&nbsp;/ig, '')
	text = text.replace(/&ldquo;/ig, '')
	text = text.replace(/&rdquo;/ig, '')
	return text
}
export function is_iOS() {
	if (uni.getSystemInfoSync().platform == 'ios') {
		return true
	}
	return false
}

//个推如何修改绑定别名
export function igexinTool() {
	
	var isAndorid, PushManager, context, Instance, GeTuiSdk;
	if (plus.os.name == 'Android') {
		isAndorid = true;
	} else {
		isAndorid = false;
	}

	if (isAndorid) {
		PushManager = plus.android.importClass("com.igexin.sdk.PushManager");
		context = plus.android.runtimeMainActivity().getContext();
		Instance = PushManager.getInstance();
	} else {
		GeTuiSdk = plus.ios.importClass("GeTuiSdk");
	}

	this.bindAlias = function(alias, cid) {
		if (isAndorid) {
			Instance.bindAlias(context, alias, cid);
		} else {
			GeTuiSdk.bindAliasandSequenceNum(alias, cid);
		}
	}

	this.unbindAlias = function(alias,cid) {
		if (isAndorid) {
			Instance.unBindAlias(context, alias, cid, false); //true所有设备解绑，false解锁自已的
		} else {
			GeTuiSdk.unbindAliasandSequenceNumandIsSelf(alias, cid, false);
		}
	}

	this.getVersion = function() {
		if (isAndorid) {
			return Instance.getVersion(context);
		} else {
			return GeTuiSdk.version;
		}
	}

	//开启推送  
	this.turnOnPush = function() {
		if (isAndorid) {
			Instance.turnOnPush(context);
		} else {
			GeTuiSdk.setPushModeForOff(false);
		}
	}

	//关闭推送  
	this.turnOffPush = function() {
		if (isAndorid) {
			Instance.turnOffPush(context);
		} else {
			GeTuiSdk.setPushModeForOff(true);
		}
	}

}
