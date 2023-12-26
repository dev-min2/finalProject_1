import UserTemplate from '../views/UserTemplate.vue'
import MainBody from '../views/userview/MainPage.vue'
import LoginComp from '../views/userview/LoginComp.vue'
import CreateAccountComp from '../views/userview/CreateAccountComp.vue'
import TestUploadView from '../views/userview/TestUploadView.vue'
import TestView from '../views/userview/TestView.vue'
import TestCartView from '../views/userview/TestCartView.vue'
import MyPageSide from '../components/common/MyPageSidebar.vue'
import MyInfo from '../views/userview/mypage/MyInfo.vue'
import OrderDetail from '../views/userview/mypage/OrderDetail.vue'
import ForgotAccountComp from '../views/userview/ForgotAccountComp'

export default {
    path : '/',
    name : 'tmpMain',
    component : UserTemplate,
    children : [ // 자식에다가 컴포넌트 추가하면 됩니다.
        {
            path: '/main',
            name: 'main',
            component: MainBody
        },
        {
          path: '/login',
          name: 'login',
          component: LoginComp
        },
        {
          path: '/join/:sellerJoin',
          name: 'join',
          component: CreateAccountComp
        },
        {
          path: '/upload',
          name: 'upload',
          component : TestUploadView
        },
        {
          path: '/uploadView',
          name: 'uploadView',
          component : TestView
        },
        {
          path: "/cart",
          name: "cart",
          component: TestCartView,
        }, 
        {
          path: "/mypageside",
          name: "mypageside",
          component: MyPageSide,
          children : [
            {
              path: "myinfo",
              name: "myinfo",
              component: MyInfo
            }
          ]
        },
        {
          path: "/myinfo",
          name: "myinfo",
          component: MyInfo
        },
        {
          path: "/orderdetail",
          name: "orderdetail",
          component: OrderDetail
        }, 
        {
          path: "/forgot-account/:forgot",
          name: "forgotAccount",
          component : ForgotAccountComp
        }
    ]
};