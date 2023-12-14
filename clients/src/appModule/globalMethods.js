import { useLoading } from "vue3-loading-overlay/dist/index";
import "vue3-loading-overlay/dist/vue3-loading-overlay.css"

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
    }
}


export default {
    install(Vue) {
        Vue.config.globalProperties.$showLoading = methods.showLoadingOverlay;
        Vue.config.globalProperties.$hideLoading = methods.hideLoadingOverlay;
    }
}