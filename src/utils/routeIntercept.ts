const NEED_LOGIN_PAGES = [
    "/pages/index/index",
    "/pages/my/index",
    "/pages/charging/index",
];

const INTERCEPT_METHODS = ["switchTab", "navigateTo", "redirectTo", "reLaunch", "onLaunch"];

INTERCEPT_METHODS.forEach(method => {
    console.log(`路由拦截器已启动: ${method}`);

    uni.addInterceptor(method, {
        invoke(e) {
            const token = uni.getStorageSync('token');
            const url = e.url.split('?')[0];

            console.log(`拦截到路由跳转请求: ${url}`, `token:----->`, token);

            // 如果目标页面是登录页面，直接允许跳转
            if (url === "/pages/login/index") {
                console.log('目标是登录页面，允许跳转');
                return true;
            }

            if (!token) {
                console.log('需要登录，跳转到登录页面');

                uni.showToast({
                    title: '请先登录',
                    icon: 'none'
                });

                uni.redirectTo({
                    url: "/pages/login/index"
                });

                // 阻止跳转
                return false;
            } else {
                console.log('不需要登录，允许跳转');
                console.log('要跳转的页面是：', url);
                return true;
            }
        },
        fail(err) {
            console.error('拦截器失败:', err);
        }
    });
});


// const NEED_LOGIN_PAGES = [
//     "/pages/index/index",
//     "/pages/my/index",
//     "/pages/charging/index",
// ];

// const INTERCEPT_METHODS = ["switchTab", "navigateTo", "redirectTo", "reLaunch", "onLaunch"];

// function isLoginRequired(url: string, token: string): boolean {
//     // return NEED_LOGIN_PAGES.includes(url) && token !== '';
//     return token;
// }

// function handleRouteInterception(method: string) {
//     console.log(`路由拦截器已启动: ${method}`);

//     uni.addInterceptor(method, {
//         invoke(event) {
//             const token = uni.getStorageSync('token');
//             const url = event.url.split('?')[0];

//             console.log(`拦截到路由跳转请求: ${url}`, `token:----->`, token);

//             if (isLoginRequired(url, token)) {
//                 console.log('需要登录，跳转到登录页面');

//                 uni.showToast({
//                     title: '请先登录',
//                     icon: 'none'
//                 });

//                 uni.navigateTo({
//                     url: "/pages/login/index"
//                 });

//                 // 阻止跳转
//                 return false;
//             } else {
//                 console.log('不需要登录，允许跳转');
//                 return true;
//             }
//         },
//         fail(error) {
//             console.error('拦截器失败:', error);
//         }
//     });
// }

// INTERCEPT_METHODS.forEach(handleRouteInterception);