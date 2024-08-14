export function checkAuth() {
    // 获取用户的登录状态或权限信息
    const userInfo = uni.getStorageSync('userInfo');
    return userInfo && userInfo.isLoggedIn;
}
