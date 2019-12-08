let showNotice = () => {
    console.log('not implemented!!');
};

export function setShowNotice(ref) {
    showNotice = ref;
}

export function showGlobalNotice({
    variant,
    message,
}) {
    showNotice({
        variant,
        message,
    })
}