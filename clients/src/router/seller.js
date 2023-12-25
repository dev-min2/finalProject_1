// 판매자
import SellerTemplate from '../views/SellerTemplate.vue'
import SellerTestUploadView from '../components/sellerview/SellerTestUploadView.vue'
import SellCharts from '../components/sellerview/SellCharts.vue'

export default {
    path : '/seller',
    name : 'seller',
    component : SellerTemplate,
    children : [
        {
          path: '/upload',
          name: 'upload',
          component : SellerTestUploadView
        },
        {
          path: '/charts',
          name: 'charts',
          component : SellCharts
        }
    ]
}