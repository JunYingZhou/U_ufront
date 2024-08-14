const needLogin = [
    "/pages/index/index",
    "/pages/my/index",
];

let list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];

list.forEach(item => {
    console.log("路由拦截器已启动")
    uni.addInterceptor(item, {
        invoke(e) {
            console.log("拦截器拦截到路由跳转请求: " + e.url)
            // 获取用户的token
            const token = uni.getStorageSync('token');
            // 获取当前页面路径（即url去掉"?"和"?"后的参数）
            const url = e.url.split('?')[0];
            console.log("是否需要登录: " + needLogin.includes(url) && !token)
            if (needLogin.includes(url) && !token) {
                uni.showToast({
                    title: '请先登录',
                    icon: 'none'
                });
                uni.navigateTo({
                    url: "/pages/login/index"
                });
                // Prevent navigation to the restricted page
                return false;
            }
            return true;
        },
        fail(err) {
            console.log(err);
        },
    });
});
