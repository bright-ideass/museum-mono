export const formatName = (name) => {
    let newStr;
    if (name.length === 2) {
        newStr = name.substr(0, 1) + '*';
    } else if (name.length > 2) {
        let char = '';
        for (let i = 0, len = name.length - 2; i < len; i++) {
            char += '*';
        }
        newStr = name.substr(0, 1) + char + name.substr(-1, 1);
    } else {
        newStr = name;
    }

    return newStr;
}

export const generateRandomString = (length) => {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

export const generateUniqueRandomStrings = (length, count) => {
    var result = [];
    while (result.length < count) {
        var randomString = generateRandomString(length);
        if (result.indexOf(randomString) === -1) {
            result.push(randomString);
        }
    }
    return result;
}
