import { useLoading } from "vue3-loading-overlay/dist/index";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css"
import cryptoJs from 'crypto-js';
import Swal from 'sweetalert2'

let loader = null;

const methods = {
    showBasicAlert(title, text) {
        Swal.fire({
            title : title,
            text : text,
            confirmButtonText : "확인"
        });
    },
    showInfoAlert(title, text) {
        Swal.fire({
            title : title,
            text : text,
            icon: 'info',
            confirmButtonText : "확인"
        })
    },
    showSuccessAlert(title,text) {
        Swal.fire({
            title : title,
            text : text,
            icon: 'success',
            confirmButtonText : "확인"
        })
    },
    showFailAlert(title, text) {
        Swal.fire({
            title : title,
            text : text,
            icon: 'error',
            confirmButtonText : "확인"
        })
    },
    showWarningAlert(title, text) {
        Swal.fire({
            title : title,
            text : text,
            icon: 'warning',
            confirmButtonText : "확인"
        })
    },
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
    },
    dateFormat(val){
        let date = val == '' ? new Date() : new Date(val);
        let year = date.getFullYear();
        let month = ('0' + (date.getMonth() + 1)).slice(-2);
        let day = ('0' + date.getDate()).slice(-2);

        return `${year}-${month}-${day}`;
    }
}


export default {
    install(Vue) {
        Vue.config.globalProperties.$showLoading = methods.showLoadingOverlay;
        Vue.config.globalProperties.$hideLoading = methods.hideLoadingOverlay;
        Vue.config.globalProperties.$encryptAES256 = methods.encryptAES256;
        Vue.config.globalProperties.$decryptAES256 = methods.decryptAES256;
        Vue.config.globalProperties.$showBasicAlert = methods.showBasicAlert;
        Vue.config.globalProperties.$showSuccessAlert = methods.showSuccessAlert;
        Vue.config.globalProperties.$showFailAlert = methods.showFailAlert;
        Vue.config.globalProperties.$showWarningAlert = methods.showWarningAlert;
        Vue.config.globalProperties.$showInfoAlert = methods.showInfoAlert;
        Vue.config.globalProperties.$dateFormat = methods.dateFormat;
    }
}