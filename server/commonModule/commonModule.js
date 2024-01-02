const cryptoJs = require('crypto-js');
const sha256 = require('crypto-js/sha256');

function encryptAES256(stringData) {
    const cipher = cryptoJs.AES.encrypt(stringData, cryptoJs.enc.Utf8.parse(process.env.VUE_APP_AES_SECRET_KEY), {
        iv: cryptoJs.enc.Utf8.parse(process.env.VUE_APP_AES_IV),
        padding: cryptoJs.pad.Pkcs7,
        mode: cryptoJs.mode.CBC,
    });

    return cipher.toString();
};

function decryptAES256(stringData) {
    const decipher = cryptoJs.AES.decrypt(stringData, cryptoJs.enc.Utf8.parse(process.env.VUE_APP_AES_SECRET_KEY), {
        iv: cryptoJs.enc.Utf8.parse(process.env.VUE_APP_AES_IV),
        padding: cryptoJs.pad.Pkcs7,
        mode: cryptoJs.mode.CBC,
    })

    return decipher.toString(cryptoJs.enc.Utf8);
}

//string만 들어가야함. 정수는 항상 같은 해시값을 내뱉는 문제가있었음.
function encryptSHA256(stringData) {
    if(typeof stringData === "number") {
        stringData = String(stringData);
    }
    return sha256(stringData).toString();
};

function groupBy(data,key) {
    return data.reduce(function (carry, el) {
        var group = el[key];

        if (carry[group] === undefined) {
            carry[group] = []
        }

        carry[group].push(el)
        return carry
    }, {})
}

module.exports = {
    encryptAES256,
    decryptAES256,
    encryptSHA256,
    groupBy,
};