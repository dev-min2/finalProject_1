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

import MyReview from '../views/userview/mypage/MyReviewList.vue'
import CgPasswordAndAccountLeave from '../views/userview/mypage/CgPasswordAndAccountLeave.vue'
import WishList from '../views/userview/mypage/WishList.vue'

import ForgotAccountComp from '../views/userview/ForgotAccountComp'
import SearchPage from '../views/userview/SearchPage.vue'
import NoticeList from '../views/userview/noticeboard/NoticeList.vue'
import CreateNotice from '../views/userview/noticeboard/CreateNotice.vue'
import NoticeContent from '../views/userview/noticeboard/NoticeContent.vue'
import CreateReview from '../views/userview/noticeboard/CreateReview.vue'
import ReviewInfo from '../views/userview/noticeboard/ReviewContent.vue'

//결제
import PaymentForm from '../views/userview/payment/PaymentForm.vue'
import PaymentComplete from '../views/userview/payment/PaymentComplete.vue'
import PaymentDetailPage from '../views/userview/mypage/PaymentDetailPage.vue'

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
          path: "/myreview",
          name: "myreview",
          component: MyReview
        },
        {
          path: "/paymentDetail",
          name: "paymentDetail",
          component : PaymentDetailPage
        },
        {
          path: "/wishList",
          name: "wishList",
          component : WishList
        }
      ]
    },
    {
      path: "/paymentform",
      name: "paymentform",
      component: PaymentForm
    },
    {
      path: "/paymentcomplete",
      name: "paymentcomplete",
      component: PaymentComplete
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
      component: CgPasswordAndAccountLeave
    },
    {
      path: "/myreview/write",
      name: "myreviewWrite",
      component: CreateReview
    },
    {
      path: "/myreview/info",
      name: "myreviewinfo",
      component: ReviewInfo
    },
    {
      path: "/leave",
      name: "leave",
      component: CgPasswordAndAccountLeave
    }
  ]
};