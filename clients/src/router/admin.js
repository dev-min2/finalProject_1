// 관리자
import AdminTemplate from '../views/AdminTemplate.vue'
import adminMain from '../views/adminview/adminMain.vue'
import ProductResearchBar from '../views/adminview/ProductResearchBar.vue'
import AdminMemberList from '../views/adminview/AdminMemberList.vue'
import AdminCoupon from '../views/adminview/AdminCoupon.vue'
import AdminReviewList from '../views/adminview/AdminReviewList.vue'
import AdminProductList from '../views/adminview/AdminProductList.vue'

export default {
    path : '/admin',
    name : 'admin',
    component : AdminTemplate,
    redirect : '/adminMain',
    children : [
        {
          path: '/adminMain',
          name: 'adminMain',
          component : adminMain
        },
        {
            path: '/productResearchBar',
            name: 'productResearchBar',
            component : ProductResearchBar
          },
          {
            path: '/adminMemberList',
            name: 'adminMemberList',
            component : AdminMemberList
          },
          {
            path: '/adminCoupon',
            name: 'adminCoupon',
            component : AdminCoupon
          },
          {
            path: '/adminReviewList',
            name: 'adminReviewList',
            component : AdminReviewList
          },
          {
            path: '/adminProductList',
            name: 'adminProductList',
            component : AdminProductList
          },

    ]
}