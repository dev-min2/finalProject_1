// 판매자
import SellerTemplate from '../views/SellerTemplate.vue'
import SellerTestUploadView from '../components/sellerview/SellerTestUploadView.vue'
import SellCharts from '../components/sellerview/SellCharts.vue'
import ProductResearchBar from '../components/sellerview/ProductResearchBar.vue'
import sellerMain from '../views/sellerview/sellerMain.vue'

export default {
    path : '/seller',
    name : 'seller',
    component : SellerTemplate,
    redirect : '/sellerMain',
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
        },
        {
          path: '/productResearchBar',
          name: 'productResearchBar',
          component : ProductResearchBar
        },
        {
          path: '/sellerMain',
          name: 'sellerMain',
          component : sellerMain
        }
    ]
}