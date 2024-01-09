const express = require('express');
const productRouter = express.Router();
const ProductService = require('../Service/ProductService');


////////////////////////////////////////////////
//////관리자////////////////////////////////////
///////////////////////////////////////////////

//관리자 기간지정 상품조회
productRouter.get('/seller-main/:period/:minPrice/:maxPrice/:pageNo', async (req, res) => {
   //let userNo = req.params.userNo;
   let period = req.params.period;
   let minPrice = req.params.minPrice;
   let maxPrice = req.params.maxPrice;
   let pageNo = req.params.pageNo;
   
   try {
      const productService = new ProductService();
      //1일조회
      if (period == "0", minPrice, maxPrice) {
         result = await productService.selectQueryByPeriodAdmin(period, minPrice, maxPrice,pageNo);
      }
      //1주조회
      else if (period == "1", minPrice, maxPrice) {
         result = await productService.selectQueryByPeriodAdmin(period, minPrice, maxPrice,pageNo);
      }
      //1달조회
      else if (period == "2", minPrice, maxPrice) {
         result = await productService.selectQueryByPeriodAdmin(period, minPrice, maxPrice,pageNo);
      }
      //3달조회
      else if (period == "3", minPrice, maxPrice) {
         result = await productService.selectQueryByPeriodAdmin(period, minPrice, maxPrice,pageNo);
      }
      //6달조회
      else if (period == "4", minPrice, maxPrice) {
         result = await productService.selectQueryByPeriodAdmin(period, minPrice, maxPrice,pageNo);
      }
      res.send(result);
   } catch (e) {
      console.log(e);
   }
   
})

//관리자-회원 조회
productRouter.get('/AdminMemberList/:permission/:leave/:pageNo', async (req, res) => {
   const permission = req.params.permission;
   const leave = req.params.leave;
   const pageNo = req.params.pageNo;
   console.log('permission',permission)
   console.log('leave',leave)
   console.log('pageno',pageNo)
   try {
      const productService = new ProductService();
      result = await productService.getAdminMemberList(permission, leave,pageNo);
      console.log(result);
      res.send(result);

   } catch (e) {
      console.log(e)
   }
})
//쿠폰 정보 조회
productRouter.get('/AdminCouponInfoList/:pageNo', async (req, res) => {
   const pageNo = req.params.pageNo;
   try {
      const productService = new ProductService();
      result = await productService.getAdminCouponList(pageNo);
      res.send(result);

   } catch (e) {
      console.log(e)
   }
})
//쿠폰 정보 생성
productRouter.post('/adminCreateCoupon', async (req, res) => {
   let data = req.body.param;
   try {
      const productService = new ProductService();
      result = await productService.createAdminCouponInfo(data);
      res.send(result);
   } catch (e) {
      console.log(e)
   }
})

//쿠폰 지급
productRouter.post('/giveAdminCoupon', async (req, res) => {
   let data = req.body.param;
   try {
      const productService = new ProductService();
      result = await productService.giveAdminCoupon(data);
      res.send(result);
   } catch (e) {
      console.log(e)
   }
})

//판매자 기간지정 상품조회

productRouter.get('/seller-main/:userNo/:period/:minPrice/:maxPrice/:pageNo', async (req, res) => {
   //let userNo = req.params.userNo;
   let period = req.params.period;
   let minPrice = req.params.minPrice;
   let maxPrice = req.params.maxPrice;
   let pageNo = req.params.pageNo;
   console.log(minPrice);
   console.log(typeof minPrice);

   const userNo = 1;
   //req.session.userNo;
   try {
      const productService = new ProductService();
      //1일조회
      if (period == "0", minPrice, maxPrice) {
         result = await productService.selectQueryByPeriod(userNo, period, minPrice, maxPrice,pageNo);
      }
      //1주조회
      else if (period == "1", minPrice, maxPrice) {
         result = await productService.selectQueryByPeriod(userNo, period, minPrice, maxPrice,pageNo);
      }
      //1달조회
      else if (period == "2", minPrice, maxPrice) {
         result = await productService.selectQueryByPeriod(userNo, period, minPrice, maxPrice,pageNo);
      }
      //3달조회
      else if (period == "3", minPrice, maxPrice) {
         result = await productService.selectQueryByPeriod(userNo, period, minPrice, maxPrice,pageNo);
      }
      //6달조회
      else if (period == "4", minPrice, maxPrice) {
         result = await productService.selectQueryByPeriod(userNo, period, minPrice, maxPrice,pageNo);
      }
      res.send(result);
   } catch (e) {
      console.log(e);
   }
})

//판매자-내 상품 전체 조회
productRouter.get('/SellerProductList', async (req, res) => {
   // let userNo = req.params.userNo;
   const userNo = 1;
   let state = req.query.state
   const pageNo = req.query.pg;
   const showCnt = req.query.showCnt;

   
   try {
      const productService = new ProductService();
      result = await productService.getMyProductList(userNo, state, pageNo,showCnt);
      res.send(result);

   } catch (e) {
      console.log(e)
   }
})

//판매자 필터검색 - 카테고리 분류 조회
productRouter.post('/SellerProductList', async (req, res) => {
   //let userNo = req.params.userNo;
   // const userNo = req.body.userNo
   const userNo = 1;
   let categoryArray = req.body.categoryArray;
   let publicStateNo = req.body.publicStateNo;


   console.log('categoryNo', categoryArray)
   console.log(publicStateNo)
   //req.session.userNo;
   try {
      const productService = new ProductService();
      result = await productService.getMyProductListFilter(userNo, publicStateNo, categoryArray);
      res.send(result);
   } catch (e) {
      console.log(e);
   }
})


//판매자-상품 등록
const multipart = require('connect-multiparty')
productRouter.post('/uploadProduct', multipart(), async (req, res) => {
   let data = req.body;
   const fileImage = req.files.productImage;
   try {
      const productService = new ProductService();
      result = await productService.uploadProduct(data, fileImage);
      res.send(result);
   } catch (e) {
      console.log(e)
   }
})

//판매자-상품 삭제
productRouter.put('/sellerDeleteProduct', async (req, res) => {
   let productArray = req.body.param;
   try {
      const productService = new ProductService();
      result = await productService.deleteProduct(productArray);
      console.log(result);
      res.send(result);
   } catch (e) {
      console.log(e)
   }
})

//판매자-상품 숨김
productRouter.put('/sellerHideProduct', async (req, res) => {
   let productArray = req.body.param;
   try {
      const productService = new ProductService();
      result = await productService.hidingProduct(productArray);
      res.send(result);
   } catch (e) {
      console.log(e)
   }
})

//판매자 - 리뷰 조회
productRouter.get('/SellerReviewList', async (req, res) => {
   // let userNo = req.params.userNo;
   const userNo = 1;
   const pageNo = req.query.pg;
   const showCnt = req.query.showCnt;
   try {
      const productService = new ProductService();
      result = await productService.getSellerReview(userNo,pageNo,showCnt);
      console.log(result);
      res.send(result);

   } catch (e) {
      console.log(e)
   }
})

//판매자-리뷰 삭제
productRouter.get('/SellerReviewList/:reviewNo', async (req, res) => {
   let reviewNo = req.params.reviewNo;
   try {
      const productService = new ProductService();
      result = await productService.removeSellerReview(reviewNo);

      res.send(result);

   } catch (e) {
      console.log(e)
   }
})

//판매자 - 리뷰 검색
productRouter.get('/SellerReviewList/:userNo/:search', async (req, res) => {
   let search = req.params.search;
   try {
      const productService = new ProductService();
      result = await productService.searchSellerReview(search);

      res.send(result);

   } catch (e) {
      console.log(e)
   }
})

//판매자 - 배송 조회
productRouter.get('/SellerDelivery', async (req, res) => {
   // let userNo = req.params.userNo;
   //0req.session.userNo;
   const userNo = 1;
   const pageNo = req.query.pg;
   const showCnt = req.query.showCnt;
   try {
      const productService = new ProductService();
      result = await productService.sellerDelivery(userNo,pageNo, showCnt);
      res.send(result);

   } catch (e) {
      console.log(e)
   }
})

//판매자 - 배송 조회-회원이름으로 검색
productRouter.get('/sellerDeliverySearchUserName/:search', async (req, res) => {
   // let userNo = req.params.userNo;
   // const userNo = 1;
   const search = req.params.search;
   try {
      const productService = new ProductService();
      result = await productService.sellerDeliverySearchUserName(search);
      res.send(result)

   } catch (e) {
      console.log(e)
   }

})

//판매자-배송관리-주소 업데이트
productRouter.put('/sellerDeliveryUpdate', async (req, res) => {
   // let addr = req.params.addr;
   // let paymentNo = req.params.paymentNo;
   let {
      paymentNo,
      addr,
      deliveryNumber,
      paymentProductNo
   } = req.body.param;

   try {
      const productService = new ProductService();
      result = await productService.sellerDeliveryUpdate(deliveryNumber, paymentProductNo);
      res.send(result)
   } catch (e) {
      console.log(e)
   }
})

//판매자-배송관리-C1->C2로 변경
productRouter.put('/DeliveryStateChangeC2', async (req, res) => {
   let {
      paymentNo,
      addr,
      paymentProductNo
   } = req.body.param;
   try {
      const productService = new ProductService();
      result = await productService.DeliveryStateChangeC2(paymentProductNo);
      res.send(result)
   } catch (e) {
      console.log(e)
   }
   console.log(paymentProductNo)
                console.log('asdasdasd',result)
})



//결제폼-회원정보,쿠폰,장바구니 같이 불러오기
productRouter.get('/paymentform', async (req, res) => {
    let userNo = req.query.userNo;
    let cartList = req.query.cno;
    try {
        const productService = new ProductService();
        let result = await productService.getUserPaymentInfo(userNo, cartList);
        res.send(result);
    } catch (e) {
        console.log(e);
    }
})

//결제 완료 처리
productRouter.post('/payment', async (req, res) => {
    let data = req.body.param;

    console.log(data);
    try {
        const productService = new ProductService();
        let result = await productService.completePayment(data.paymentObj, data.paymentData, data.userNo, data.cartNo, data.couponNo);
        res.send(result);
    } catch (e) {
        console.log(e);
    }
})

//주문 전체 취소
productRouter.put('/paymentdetail/cancel/:paymentNo', async (req, res) => {
    let data = req.params.paymentNo;
    console.log('prdController주문전체취소!', data);
    try {
        const productService = new ProductService();
        let result = await productService.cancelAllPayment(data);
        res.send(result);
    } catch (e) {
        console.log(e);
    }
})


//주문 전체 내역 불러오기
productRouter.get('/orderdetail/:userNo', async (req, res) => {
    let userNo = req.params.userNo;
    try {
        const productService = new ProductService();
        let result = await productService.getPaymentList(userNo);
        res.send(result);
    } catch (e) {
        console.log(e);
    }
})


//주문 전체내역 불러오기 2
productRouter.get('/paymentdetail/all/:userNo', async (req, res) => {
    let userNo = req.params.userNo;
    try {
        const productService = new ProductService();
        let result = await productService.getPaymentList(userNo);
        res.send(result);
    } catch (e) {
        console.log(e);
    }
})

//주문 상세 내역 불러오기
productRouter.get('/paymentdetail/:paymentNo', async (req, res) => {
    let paymentNo = req.params.paymentNo;
    try {
        const productService = new ProductService();
        let result = await productService.getPaymentDetail(paymentNo);
        res.send(result);
    } catch (e) {
        console.log(e);
    }

})



productRouter.get('/main', async (req, res) => {
   try {
      const productService = new ProductService();
      let ptype = req.query.type;
      let result = await productService.getMainpageProductList(ptype);
      res.send(result);
   } catch (e) {
      console.log(e);
   }
});

productRouter.get('/search', async (req, res) => {
   try {
      // /search?q='검색한거'
      const productService = new ProductService();
      let data = req.query.q;
      let ptype = req.query.type;
      let pageno = req.query.pageno;
      const result = await productService.getSearchResultCnt(data, ptype, pageno);
      res.send(result);
   } catch (e) {
      console.log(e);
   }
});

//서비스 객체 생성 - 함수안에 category dao 갖구와서 보냄
productRouter.get('/category', async (req, res) => {
   try {
      const productService = new ProductService();
      let result = await productService.getCategoryData();
      res.send(result);
   } catch (e) {
      console.log(e);
   }
});

// 카테고리 -> 검색으로 넘어가는 라우터(카테고리 번호를 받아와야함)
productRouter.get('/search/category', async (req, res) => {
   try {
      const productService = new ProductService();
      let data = req.query.cno;
      let ptype = req.query.type;
      let pageno = req.query.pageno;
      const result = await productService.getCategoryProductCnt(data, ptype, pageno);
      res.send(result);
   } catch (e) {
      console.log(e);
   }
});

//신상품
productRouter.get('/search/newproduct', async (req, res) => {
   try {
      const productService = new ProductService();
      let ptype = req.query.type;
      let pageno = req.query.pageno;
      const result = await productService.getNewProductList(ptype, pageno);
      res.send(result);
   } catch (e) {
      console.log(e);
   }
});
//베스트
productRouter.get('/search/bestproduct', async (req, res) => {
   try {
      const productService = new ProductService();
      let ptype = req.query.type;
      let pageno = req.query.pageno;
      const result = await productService.getBestProductList(ptype, pageno);
      res.send(result);
   } catch (e) {
      console.log(e);
   }
});
//추천
productRouter.get('/search/recproduct', async (req, res) => {
   try {
      const productService = new ProductService();
      let ptype = req.query.type;
      let pageno = req.query.pageno;
      const result = await productService.getRecProductList(ptype, pageno);
      res.send(result);
   } catch (e) {
      console.log(e);
   }
});
//하랑
productRouter.get('/productDetail', async (req, res) => {
   let productNo = req.query.pno;
   try {
      const productService = new ProductService();
      let result = await productService.showProdDetail(productNo);
      res.send(result);
   } catch (err) {
      console.log(err);
   }
});
//장바구니 추가
productRouter.post('/productDetail', async (req, res) => {
    let productNo = req.body.pno;
    let productSelCnt = req.body.cnt;
    let userNo = req.body.userNo
    try {
        const productService = new ProductService();
        result = await productService.addCart(productNo, productSelCnt, userNo);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
});
productRouter.get('/productDetail/:userNo/:productNo', async (req, res) => {
    let userNo = req.params.userNo;
    let productNo = req.params.productNo;
    try {
        const productService = new ProductService();
        let result = await productService.showCartInfo(userNo, productNo);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
});
productRouter.post('/wish', async (req, res) => {
    let productNo = req.body.pno;
    let userNo = req.body.uno
    try {
        const productService = new ProductService();
        result = await productService.addWish(productNo, userNo);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
});
productRouter.get('/wish/:userNo', async (req, res) => {
    let userNo = req.params.userNo
    try {
        const productService = new ProductService();
        let result = await productService.wishInfo(userNo);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
});
productRouter.delete('/wish/:userNo/:productNo', async (req, res) => {
    let userNo = req.params.userNo;
    let productNo = req.params.productNo;
    try {
        const productService = new ProductService();
        let result = await productService.delWish(userNo, productNo);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
});


productRouter.get('/productdetails/review/:productNo/:pageNo', async (req, res) => {
    try {
        let productNo = req.params.productNo;
        let userNo = req.session.userNo;
        let pageNo = req.params.pageNo;
        const productService = new ProductService();
        const result = await productService.showReviewListCnt(productNo, userNo, pageNo);
        res.send(result);
    } catch (e) {
        console.log(e);
    }
});

productRouter.put('/productdetails/review/:reviewNo/:productNo', async (req, res) => {
    try {
        let reviewNo = req.params.reviewNo;
        let productNo = req.params.productNo;
        let userNo = req.session.userNo;
        const productService = new ProductService();
        const result = await productService.addReviewLikeCnt(reviewNo, userNo, productNo);
        res.send(result);
    } catch (e) {
        console.log(e);
    }
});



module.exports = productRouter;