import UserTemplate from '../views/UserTemplate.vue'
import MainBody from '../views/userview/MainPage.vue'
import LoginComp from '../views/userview/LoginComp.vue'
import CreateAccountComp from '../views/userview/CreateAccountComp.vue'
import TestUploadView from '../views/userview/TestUploadView.vue'
import TestView from '../views/userview/TestView.vue'
import TestCartView from '../views/userview/TestCartView.vue'

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
    ]
};