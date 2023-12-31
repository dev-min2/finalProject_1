// 판매자
import SellerTemplate from '../views/SellerTemplate.vue'
import SellerTestUploadView from '../views/sellerview/SellerTestUploadView.vue'
import SellCharts from '../views/sellerview/SellCharts.vue'
import ProductResearchBar from '../views/sellerview/ProductResearchBar.vue'
import sellerMain from '../views/sellerview/sellerMain.vue'
import SellerProductList from '../views/sellerview/SellerProductList.vue'

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
        },
        {
          path: '/sellerProductList',
          name: 'sellerProductList',
          component : SellerProductList
        }
    ]
}