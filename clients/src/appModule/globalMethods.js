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
            confirmButtonText : "확인",
            confirmButtonColor : "#fab3cc"
        });
    },
    showInfoAlert(title, text) {
        Swal.fire({
            title : title,
            text : text,
            icon: 'info',
            confirmButtonText : "확인",
            confirmButtonColor : "#fab3cc",
        })
    },
    showSuccessAlert(title,text) {
        Swal.fire({
            title : title,
            text : text,
            icon: 'success',
            confirmButtonText : "확인",
            confirmButtonColor : "#fab3cc"
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
            confirmButtonText : "확인",
            confirmButtonColor : "#fab3cc"
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
    },
    dateTimeFormat(val) {
        const date = val == '' ? new Date() : new Date(val);
        return date.getFullYear() + '.' +
            ('0' + (date.getMonth() +1)).slice(-2) + '.' +
            ('0' + date.getDate()).slice(-2) + ' ' +
            ('0' + date.getHours()).slice(-2) + ':' +
            ('0' + date.getMinutes()).slice(-2) + ":" +
            ('0' + date.getSeconds()).slice(-2);
    },
    convertAttachFileNameList(attachList) {
        if(attachList == null || attachList.length <= 0) {
            return null;
        }
        
        let fileNameList = [];        
        for(let i = 0; i < attachList.length; ++i) {
            let startRealFileNameIdx = 0;   
            let underlineCount = 0; // 5개.
            for(let j = 0; j < attachList[i].length; ++j) {
                if(attachList[i][j] === '_') {
                    ++underlineCount;
                }
    
                ++startRealFileNameIdx;
                if(underlineCount >= 5) 
                    break;
            }
    
            fileNameList.push(attachList[i].substr(startRealFileNameIdx, attachList[i].length));
        }

        return fileNameList;
    },
    convertAttachFileName(attachFile) {
        if(attachFile == null || attachFile.length <= 0) {
            return null;
        }

        let startRealFileNameIdx = 0;   
        let underlineCount = 0; // 5개.
        for(let i = 0; i < attachFile.length; ++i) {
            if(attachFile[i] === '_') {
                ++underlineCount;
            }

            ++startRealFileNameIdx;
            if(underlineCount >= 5)
                break;
        }

        return attachFile.substr(startRealFileNameIdx, attachFile.length);
    },
    groupBy: function(data, key){
        return data.reduce(function (carry, el){
            var group = el[key];
            if(carry[group] === undefined){
                carry[group] = []
            }
            carry[group].push(el)
            return carry
        },{})
    },
    printPriceComma(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    getSubCodeName(subCode) {
        return this.$store.state.subCode.find(ele => {
            return ele.sub_code == subCode
        }).sub_code_name;
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
        Vue.config.globalProperties.$dateTimeFormat = methods.dateTimeFormat;
        Vue.config.globalProperties.$convertAttachFileNameList = methods.convertAttachFileNameList;
        Vue.config.globalProperties.$convertAttachFileName = methods.convertAttachFileName;
        Vue.config.globalProperties.$groupBy = methods.groupBy;
        Vue.config.globalProperties.$printPriceComma = methods.printPriceComma;
        Vue.config.globalProperties.$getSubCodeName = methods.getSubCodeName;
    }
}