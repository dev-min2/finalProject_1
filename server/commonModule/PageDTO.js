class PageDTO {
    constructor(total, curPage, showContentCnt) {
        this.curPage = curPage;
        this.showContentCnt = showContentCnt;
        this.total = total;

        this.lastPage = Math.ceil((total / showContentCnt));
        this.endPage = Math.ceil((curPage / 10.0)) * 10;
        this.startPage = this.endPage - 9;
        this.endPage = this.endPage > this.lastPage ? this.lastPage : this.endPage;
        this.prev = this.curPage > 1;
		this.next = this.curPage < this.lastPage;	
    }
}

module.exports = PageDTO