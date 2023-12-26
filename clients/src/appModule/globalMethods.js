import { useLoading } from "vue3-loading-overlay/dist/index";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css"
import cryptoJs from 'crypto-js';

let loader = null;

const methods = {
    showLoadingOverlay() {
        if(loader == null) {
            loader = useLoading();
        }

        loader.show({
        // Optional parameters
        container: null,
        canCancel: false,
        color: '#000000',
        loader: 'dots',
        width: 64,
        height: 64,
        backgroundColor: '#ffffff',
        opacity: 0.7,
        });
    },
    hideLoadingOverlay() {
        if(loader == null) {
            return;
        }
        loader.hide();
    },
    encryptAES256(stringData) {
        const cipher = cryptoJs.AES.encrypt(stringData, cryptoJs.enc.Utf8.parse(process.env.VUE_APP_AES_SECRET_KEY), {
            iv: cryptoJs.enc.Utf8.parse(process.env.VUE_APP_AES_IV),
            padding: cryptoJs.pad.Pkcs7,
            mode: cryptoJs.mode.CBC,
        });

        return cipher.toString();
    },
    decryptAES256(stringData) {
        const decipher = cryptoJs.AES.decrypt(stringData, cryptoJs.enc.Utf8.parse(process.env.VUE_APP_AES_SECRET_KEY), {
            iv: cryptoJs.enc.Utf8.parse(process.env.VUE_APP_AES_IV),
            padding: cryptoJs.pad.Pkcs7,
            mode: cryptoJs.mode.CBC,
        })
    
        return decipher.toString(cryptoJs.enc.Utf8);
    }
}


export default {
    install(Vue) {
        Vue.config.globalProperties.$showLoading = methods.showLoadingOverlay;
        Vue.config.globalProperties.$hideLoading = methods.hideLoadingOverlay;
        Vue.config.globalProperties.$encryptAES256 = methods.encryptAES256;
        Vue.config.globalProperties.$decryptAES256 = methods.decryptAES256;
    }
}