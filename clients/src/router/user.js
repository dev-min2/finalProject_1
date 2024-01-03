import UserTemplate from '../views/UserTemplate.vue'
import MainBody from '../views/userview/MainPage.vue'
import LoginComp from '../views/userview/LoginComp.vue'
import CreateAccountComp from '../views/userview/CreateAccountComp.vue'
import TestUploadView from '../views/userview/TestUploadView.vue'
import CartView from '../views/userview/CartView.vue'
import TestProductDetailView from '../views/userview/TestProductDetail.vue'
//마이페이지
import MyPageSide from '../components/common/MypageSidebar.vue'
import MyInfo from '../views/userview/mypage/MyInfo.vue'
import OrderDetail from '../views/userview/mypage/OrderDetail.vue'
import MyPetInfo from '../views/userview/mypage/MyPetInfo.vue'
import MyPetForm from '../views/userview/mypage/MyPetForm.vue'
import ChangeMyInfo from '../views/userview/mypage/ChangeMyInfo.vue'
import ChangePassword from '../views/userview/mypage/ChangePassword.vue'
import MyReview from '../views/userview/mypage/MyReviewList.vue'

import ForgotAccountComp from '../views/userview/ForgotAccountComp'
import SearchPage from '../views/userview/SearchPage.vue'
import NoticeList from '../views/userview/noticeboard/NoticeList.vue'
import CreateNotice from '../views/userview/noticeboard/CreateNotice.vue'
import NoticeContent from '../views/userview/noticeboard/NoticeContent.vue'

export default {
  path: '/',
  name: 'tmpMain',
  component: UserTemplate,
  redirect: '/main',
  children: [ // 자식에다가 컴포넌트 추가하면 됩니다.
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
      component: TestUploadView
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
    {
      path: "/productdetail",
      name: "productdetail",
      component: TestProductDetailView,
    },
    {
      path: "/mypageside",
      name: "mypageside",
      component: MyPageSide,
      children: [{
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
          path: "/mypetinfo",
          name: "mypetinfo",
          component: MyPetInfo
        },
        {
          path: "/mypetform",
          name: "mypetform",
          component: MyPetForm
        },
        {
          path: "/changeInfo",
          name: "changeInfo",
          component: ChangeMyInfo
        },
        {
          path : "/myreview",
          name : "myreview",
          component : MyReview
        }
      ]
    },
    {
      path: "/forgot-account/:forgot",
      name: "forgotAccount",
      component: ForgotAccountComp
    },
    {
      path: '/search',
      name: 'searchPage',
      component: SearchPage
    },
    {
      path: "/notice",
      name: "notice",
      component: NoticeList
    },
    {
      path: "/notice/write",
      name: "noticeWrite",
      component: CreateNotice
    },
    {
      path: "/notice/:no",
      name: "noticeInfo",
      component: NoticeContent
    },
    {
      path: "/user-pass",
      name: "userPass",
      component : ChangePassword
    }
  ]
};