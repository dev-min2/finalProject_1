import UserTemplate from '../views/UserTemplate.vue'
import MainBody from '../views/userview/MainPage.vue'
import LoginComp from '../views/userview/LoginComp.vue'
import CreateAccountComp from '../views/userview/CreateAccountComp.vue'
import TestUploadView from '../views/userview/TestUploadView.vue'
import TestView from '../views/userview/TestView.vue'

export default {
    path : '/',
    name : 'tmpMain',
    components : UserTemplate,
    children : [
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
          }
    ]
};