export const isClickInside = (clickEvt, node) => {
    let currentTarget = clickEvt.target
    do {
        if (currentTarget == node) {
            return true
        }
        currentTarget = currentTarget.parentNode;
    }while(currentTarget);
    return false
}

export const goTop = () => {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
}