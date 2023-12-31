const productDAO = require("../DAO/product/ProductDAO");
const categoryDAO = require("../DAO/product/CategoryDAO");
const pageDTO = require("../commonModule/PageDTO");

class ProductService {
    constructor() {

    }
    // 상품리스트 가져오기
    async getMainpageProductList() {
        let result = await productDAO.selectMainpageFirstProductQuery();
        return result;
        // let result2 = await productDAO.selectMainpageSecondProductQuery();
        // return result2;
        // let result3 = await productDAO.selectMainpageLastProductQuery();
        // return result3;

    }
    //검색한 상품리스트
    async getSearchProductList(search, ptype, pageno) {
        let result = await productDAO.selectSearchProductQuery(search, ptype, pageno);
        console.log(search, ptype, pageno);
        return result;
    }
    //카테고리 정보
    async getCategoryData() {
        let result = await categoryDAO.selectCategoryDataQuery();
        console.log(result);
        return result;
    }
    // 카테고리 검색한 리스트
    async getCategorySearch(cno, ptype, pageno) {
        let result = await categoryDAO.selectCategorySearchQuery(cno, ptype, pageno);
        console.log(cno, ptype, pageno);
        return result;
    }
    //검색한 상품 결과 개수
    async getSearchResultCnt(pageno) {
        let result = await productDAO.selectSearchProductQuery(pageno);
        let countResult = await productDAO.selectSearchResultProductQuery();

        let pageDTO = new pageDTO(countResult[0].cnt, Number(pageno), 10);
        console.log(pageDTO);
        let resResult = {
            selectResult: result,
            pageDTO: pageDTO
        }
        return resResult;
    }
    // 카테고리 상품 개수
    async getCategoryProductCnt(pageno) {
        let result = await categoryDAO.selectCategorySearchQuery(pageno);
        let countResult = await categoryDAO.selectCategoryProductCntQuery();

        let pageDTO = new pageDTO(countResult[0].cnt, Number(pageno), 10);
        console.log(pageDTO);
        let resResult = {
            selectResult: result,
            pageDTO: pageDTO
        }
        return resResult;
    }
}

module.exports = ProductService;