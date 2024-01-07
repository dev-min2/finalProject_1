// 관리자
import AdminTemplate from '../views/AdminTemplate.vue'
import adminMain from '../views/adminview/adminMain.vue'
import ProductResearchBar from '../views/adminview/ProductResearchBar.vue'
import AdminMemberList from '../views/adminview/AdminMemberList.vue'
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
    ]
}