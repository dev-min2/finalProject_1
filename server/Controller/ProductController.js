const express = require('express');
const productRouter = express.Router();
const ProductService = require('../Service/ProductService');

//판매자 기간지정 상품조회

productRouter.get('/seller-main/:userNo/:period/:minPrice/:maxPrice', async (req, res) => {
   //let userNo = req.params.userNo;
   let period = req.params.period;
   let minPrice = req.params.minPrice;
   let maxPrice = req.params.maxPrice;
   console.log(minPrice);
   console.log(typeof minPrice);

   const userNo = 1;
   //req.session.userNo;
   try {
      const productService = new ProductService();
      //1일조회
      if (period == "0", minPrice, maxPrice) {
         result = await productService.selectQueryByPeriod(userNo, period, minPrice, maxPrice);
      }
      //1주조회
      else if (period == "1", minPrice, maxPrice) {
         result = await productService.selectQueryByPeriod(userNo, period, minPrice, maxPrice);
      }
      //1달조회
      else if (period == "2", minPrice, maxPrice) {
         result = await productService.selectQueryByPeriod(userNo, period, minPrice, maxPrice);
      }
      //3달조회
      else if (period == "3", minPrice, maxPrice) {
         result = await productService.selectQueryByPeriod(userNo, period, minPrice, maxPrice);
      }
      //6달조회
      else if (period == "4", minPrice, maxPrice) {
         result = await productService.selectQueryByPeriod(userNo, period, minPrice, maxPrice);
      }
      res.send(result);
   } catch (e) {
      console.log(e);
   }
})

//판매자-내 상품 전체 조회
productRouter.get('/SellerProductList/:userNo', async (req, res) => {
   // let userNo = req.params.userNo;
   const userNo = 1;
   try {
      const productService = new ProductService();
      result = await productService.getMyProductList(userNo);
      console.log(result);
      res.send(result);

   } catch (e) {
      console.log(e)
   }
})

//판매자 필터검색 - 카테고리 분류 조회
productRouter.get('/SellerProductList/:userNo/:categoryNo/:publicStateNo', async (req, res) => {
   //let userNo = req.params.userNo;
   const userNo = 1;
   let categoryNo = req.params.categoryNo;
   let publicStateNo = req.params.publicStateNo;
   
   //req.session.userNo;
   try {
      const productService = new ProductService();
      //건식사료 조회
      
      switch (categoryNo) {
         case "0": //건식사료
            result = await productService.getMyProductListFilter(userNo,categoryNo ,publicStateNo);
            break;
         case "1"://습식사료
            result = await productService.getMyProductListFilter(userNo,categoryNo ,publicStateNo);
            break;
         case "2"://수제간식
            result = await productService.getMyProductListFilter(userNo,categoryNo ,publicStateNo);
            break;
         case "3"://캔,파우치
            result = await productService.getMyProductListFilter(userNo,categoryNo ,publicStateNo);
            break;
         case "4"://통살
            result = await productService.getMyProductListFilter(userNo,categoryNo ,publicStateNo);
            break;
         case "5"://종합영양제
            result = await productService.getMyProductListFilter(userNo,categoryNo ,publicStateNo);
            break;
         case "6"://피부 모질
            result = await productService.getMyProductListFilter(userNo,categoryNo ,publicStateNo);
            break;
         case "7"://뼈.관절
            result = await productService.getMyProductListFilter(userNo,categoryNo ,publicStateNo);
            break;
         case "8"://샴푸.린스
            result = await productService.getMyProductListFilter(userNo,categoryNo ,publicStateNo);
            break;
         case "9"://브러쉬
            result = await productService.getMyProductListFilter(userNo,categoryNo ,publicStateNo);
            break;
         case "10"://발톱.발관리
            result = await productService.getMyProductListFilter(userNo,categoryNo ,publicStateNo);
            break;
      }
      res.send(result);
   } catch (e) {
      console.log(e);
   }
})


//판매자-상품 등록
const multipart = require('connect-multiparty')
productRouter.post('/uploadProduct',multipart(), async (req, res) => {
   let data = req.body;
   let file2 = req.files.productImage.originalFilename;
   console.log(data);
   console.log(file);
   console.log(file2);
   try {
      const productService = new ProductService();
      //result = await productService.uploadProduct(data);
      res.send(result);
   } catch (e) {
      console.log(e)
   }
})

//판매자 - 리뷰 조회
productRouter.get('/SellerReviewList/:userNo', async (req, res) => {
   // let userNo = req.params.userNo;
   const userNo = 1;
   try {
      const productService = new ProductService();
      result = await productService.getSellerReview(userNo);
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
productRouter.get('/SellerDelivery/:userNo', async (req, res) => {
   // let userNo = req.params.userNo;
   const userNo = 1;
   try {
      const productService = new ProductService();
      result = await productService.sellerDelivery(userNo);
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
productRouter.get('/search/newproduct', async (req, res)=>{
    try{
        const productService = new ProductService();
        let ptype = req.query.type;
        let pageno = req.query.pageno;
        const result = await productService.getNewProductList(ptype, pageno);
        res.send(result);
    } catch (e){
        console.log(e);
    }
});
//베스트
productRouter.get('/search/bestproduct', async (req, res)=>{
    try{
        const productService = new ProductService();
        let ptype = req.query.type;
        let pageno = req.query.pageno;
        const result = await productService.getBestProductList(ptype, pageno);
        res.send(result);
    } catch (e){
        console.log(e);
    }
});
//추천
productRouter.get('/search/recproduct', async (req, res)=>{
    try{
        const productService = new ProductService();
        let ptype = req.query.type;
        let pageno = req.query.pageno;
        const result = await productService.getRecProductList(ptype, pageno);
        res.send(result);
    } catch (e){
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
module.exports = productRouter;