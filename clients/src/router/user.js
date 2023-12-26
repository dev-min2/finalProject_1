import UserTemplate from '../views/UserTemplate.vue'
import MainPage from '../views/userview/MainPage.vue'
import LoginComp from '../views/userview/LoginComp.vue'
import CreateAccountComp from '../views/userview/CreateAccountComp.vue'
import TestUploadView from '../views/userview/TestUploadView.vue'
import TestView from '../views/userview/TestView.vue'
import TestCartView from '../views/userview/TestCartView.vue'
import ForgotAccountComp from '../views/userview/ForgotAccountComp'
<<<<<<< HEAD
import SearchPage from '../views/userview/SearchPage.vue'
=======
import NoticeList from '../views/userview/NoticeList.vue'
>>>>>>> develop

export default {
    path : '/',
    name : 'tmpMain',
    component : UserTemplate,
    redirect : '/main',
    children : [ // 자식에다가 컴포넌트 추가하면 됩니다.
        {
            path: '/main',
            name: 'main',
            component: MainPage
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
          path: "/forgot-account/:forgot",
          name: "forgotAccount",
          component : ForgotAccountComp
        },
        {
<<<<<<< HEAD
          path : '/search/:keyword',
          name : 'searchPage',
          component : SearchPage
=======
          path: "/notice",
          name: "notice",
          component: NoticeList
>>>>>>> develop
        }
    ]
};