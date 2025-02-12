const showToast = (title: any) => {
    uni.showToast({
        icon: 'none',
        title,
    });
};

export { showToast };