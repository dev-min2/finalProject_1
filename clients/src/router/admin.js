// 관리자
import AdminTemplate from '../views/AdminTemplate.vue'
import adminMain from '../views/adminView/adminMain.vue'
import ProductResearchBar from '../views/adminView/ProductResearchBar.vue'
import AdminMemberList from '../views/adminView/AdminMemberList.vue'
import AdminCoupon from '../views/adminView/AdminCoupon.vue'
import AdminCreateCoupon from '../views/adminView/AdminCreateCoupon.vue'

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

    ]
}