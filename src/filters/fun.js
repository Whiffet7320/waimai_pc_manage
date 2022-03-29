export const isEmpty = (params) => {
    if (params == undefined || params == null || params == false || params == 0) {
        return true;
    }
    if (params.constructor == String) {
        if (params == '' || params.length == 0 || params.trim() == '') {
            return true;
        } else {
            return false;
        }
    }
    if (params.constructor == Array) {
        if (params.length == 0 || params == []) {
            return true;
        } else {
            return false;
        }
    }
    if (params.constructor == Object) {
        if (Object.keys(params).length == 0 || JSON.stringify(params) == "{}") {
            return true;
        } else {
            return false;
        }
    }
    return false;
};

export const isMobile = (str) => {
    const reg = /^(1[3456789]\d{9})$/
    return reg.test(str)
}