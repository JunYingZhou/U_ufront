/*
 * @Author: zjy 3497577844@qq.com
 * @Date: 2024-08-15 02:07:10
 * @LastEditors: zjy 3497577844@qq.com
 * @LastEditTime: 2024-11-16 20:46:10
 * @FilePath: \uni-preset-vue\src\utils\http.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 全局请求封装
// const base_url = 'http://47.115.50.181:8080'
const base_url = 'http://localhost:8000'
// 请求超出时间
const timeout = 5000

// 需要修改token，和根据实际修改请求头
export default (params: any) => {
	console.log(params);
	let url = params.url;
	let method = params.method || "get";
	let data = params.data || {};
	let header = {
		// 'Blade-Auth': uni.getStorageSync('token') || '',
		'Content-Type': 'application/json;charset=UTF-8',
		Authorization: `Bearer ${uni.getStorageSync('token')}`,
		// 'X-Authorization': 'Bearer ' + uni.getStorageSync('token'),
		// 'Authorization': 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
		// 'Tenant-Id': uni.getStorageSync('tenantId') || 'xxx', // avue配置相关
		...params.header
	}
	if (method == "post") {
		header = {
			'Content-Type': 'application/json'
		};
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: base_url + url,
			method: method,
			header: header,
			data: data,
			timeout,
			success(response) {
				console.log('httpRes ------------> ',response);
				const res: any = response
				// 根据返回的状态码做出对应的操作
				//获取成功
				if (res.statusCode == 200) {
					if(res.data.code == 200 || res.data.code == 0) {
						console.log('成功', res.data.code);
						resolve(res.data);
					}
					else {
						console.log('失败该跳转了', res.data.code);
						// 将res.data.code转成数字
						const code = Number(res.data.code);
						console.log(code === 401 ? '是401' : '不是401');
						uni.clearStorageSync()
						switch (code) {
							case 401:
								uni.showModal({
									title: "提示",
									content: "请登录",
									showCancel: false,
									success() {
										// setTimeout(() => {
										uni.reLaunch({
											url: "/pages/login/index",
										})
										// }, 1000);
									},
								});
								// 无感刷新token
								break;
							case 404:
								uni.showModal({
									title: res.data.msg,
									duration: 2000,
								})
								break;
							case 400:
								uni.showModal({
									title: res.data.msg,
									duration: 2000,
								})
								break;
							default:
								uni.showModal({
									title: res.data.msg,
									duration: 2000,
								})
								break;
						}
					}
				}
				// } else {
				// 	console.log('失败', res.statusCode);
				// 	uni.clearStorageSync()
				// 	switch (res.statusCode) {
				// 		case 401:
				// 			uni.showModal({
				// 				title: "提示",
				// 				content: "请登录",
				// 				showCancel: false,
				// 				success() {
				// 					setTimeout(() => {
				// 						uni.navigateTo({
				// 							url: "/pages/login/index",
				// 						})
				// 					}, 1000);
				// 				},
				// 			});
				// 			break;
				// 		case 404:
				// 			uni.showToast({
				// 				title: '请求地址不存在...',
				// 				duration: 2000,
				// 			})
				// 			break;
				// 		default:
				// 			uni.showToast({
				// 				title: '请重试...',
				// 				duration: 2000,
				// 			})
				// 			break;
				// 	}
				// }
			},
			fail(err) {
				if (err.errMsg.indexOf('request:fail') !== -1) {
					uni.showToast({
						title: '网络异常',
						icon: "error",
						duration: 2000
					})
				} else {
					uni.showToast({
						title: '未知异常',
						duration: 2000
					})
				}
				reject(err);

			},
			complete() {
				// 不管成功还是失败都会执行
				uni.hideLoading();
				uni.hideToast();
			}
		});
	}).catch(() => { });
};


function refreshToken() {
	// 无感刷新token
	
}