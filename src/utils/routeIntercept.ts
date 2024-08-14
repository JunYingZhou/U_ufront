const needLogin = [
    "/pages/index/index",
    "/pages/my/index",
    "/pages/charging/index",
];

let list = [ "switchTab","navigateTo", "redirectTo", "reLaunch","onLaunch"];

list.forEach(item => {
    console.log("路由拦截器已启动")
    uni.addInterceptor(item, {
        invoke(e) {

            // 获取用户的token
            const token = uni.getStorageSync('token');
            const url = e.url.split('?')[0];
            console.log("拦截器拦截到路由跳转请求qwdeas: " + url)
            console.log("是否需要登录==============: " + needLogin.includes(url) && !token)
            if (needLogin.includes(url) && !token) {
                console.log("需要登录，不允许跳转")
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
            console.log("不需要登录，允许跳转")
            return true;
        },
        fail(err) {
            console.log(err);
        },
    });
});
