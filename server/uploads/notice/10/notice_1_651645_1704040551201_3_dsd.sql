USE petgoods;
CREATE TABLE cart
(
cart_no INTEGER PRIMARY KEY AUTO_INCREMENT,
product_sel_cnt INTEGER NOT NULL ,
user_no INTEGER NOT NULL ,
product_no INTEGER NOT NULL
);

CREATE TABLE category
(
category_no INTEGER PRIMARY KEY AUTO_INCREMENT,
category_name VARCHAR(100) NOT NULL ,
category_pno INTEGER NULL
);

CREATE TABLE coupon
(
coupon_no INTEGER PRIMARY KEY AUTO_INCREMENT,
coupon_name VARCHAR(200) NOT NULL ,
discount_pct INTEGER NOT NULL ,
expire_date INTEGER NOT NULL
);

CREATE TABLE free_board
(
free_board_no INTEGER PRIMARY KEY AUTO_INCREMENT ,
user_no INTEGER NOT NULL ,
title VARCHAR(200) NOT NULL ,
content VARCHAR(8000) NOT NULL ,
view_cnt INTEGER DEFAULT 0 NOT NULL ,
created_date DATE DEFAULT (current_date) NOT NULL
);

CREATE TABLE free_reply
(
free_reply_no INTEGER PRIMARY KEY AUTO_INCREMENT ,
free_board_no INTEGER NOT NULL ,
user_no INTEGER NOT NULL ,
comment VARCHAR(2000) NOT NULL ,
free_reply_pno INTEGER NULL ,
reply_date DATE DEFAULT (current_date) NOT NULL ,
delete_date DATE NULL
);

CREATE TABLE main_code_tbl
(
main_code CHAR(4) PRIMARY KEY,
main_code_name VARCHAR(50) NOT NULL ,
note VARCHAR(500) NULL
);

CREATE TABLE sub_code_tbl
(
sub_code CHAR(4) PRIMARY KEY ,
main_code CHAR(4) NOT NULL ,
sub_code_name VARCHAR(200) NOT NULL ,
note VARCHAR(500) NULL
);

CREATE TABLE my_coupon
(
my_coupon_no INTEGER PRIMARY KEY AUTO_INCREMENT ,
receive_date DATE NOT NULL ,
coupon_state CHAR(4) NOT NULL ,
user_no INTEGER NOT NULL ,
coupon_no INTEGER NOT NULL
);

CREATE TABLE notice
(
notice_board_no INTEGER PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(100) NOT NULL ,
content VARCHAR(4000) NOT NULL ,
view_cnt INTEGER DEFAULT 0 NOT NULL ,
created_date DATE DEFAULT (current_date) NOT NULL ,
user_no INTEGER NOT NULL ,
importance_level CHAR(4) NOT NULL ,
notice_start_date DATE DEFAULT (current_date) NULL ,
notice_end_date DATE NULL
);

CREATE TABLE notice_reply
(
notice_reply_no INTEGER PRIMARY KEY AUTO_INCREMENT ,
notice_board_no INTEGER NOT NULL ,
comment VARCHAR(1000) NOT NULL ,
notice_reply_pno INTEGER NULL ,
reply_date DATE DEFAULT (current_date) NULL ,
delete_date DATE NULL
);

CREATE TABLE payment
(
payment_no INTEGER PRIMARY KEY AUTO_INCREMENT ,
user_no INTEGER NOT NULL ,
payment_sub_unique_no INTEGER NOT NULL ,
payment_amount INTEGER NOT NULL ,
payment_date DATE NOT NULL ,
payment_discount_amount INTEGER DEFAULT 0 NOT NULL ,
real_payment_amount INTEGER NOT NULL ,
my_coupon_no INTEGER NULL ,
order_state CHAR(4) NOT NULL ,
address VARCHAR(150) NOT NULL ,
total_product INTEGER NOT NULL ,
total_delivery_fee INTEGER NOT NULL
);

CREATE TABLE payment_product
(
payment_product_no INTEGER PRIMARY KEY AUTO_INCREMENT ,
payment_no INTEGER NOT NULL ,
product_no INTEGER NOT NULL ,
buy_cnt INTEGER NOT NULL ,
payment_amount INTEGER NOT NULL ,
payment_discount_amount INTEGER DEFAULT 0 NOT NULL ,
real_payment_amount INTEGER NOT NULL ,
delivery_state CHAR(4) NOT NULL ,
delivery_number VARCHAR(30) NULL ,
delivery_fee INTEGER DEFAULT 0 NOT NULL
);

CREATE TABLE pet
(
pet_no INTEGER PRIMARY KEY AUTO_INCREMENT ,
user_no INTEGER NOT NULL ,
pet_name VARCHAR(100) NOT NULL ,
pet_type CHAR(4) NOT NULL ,
pet_birth DATE NOT NULL ,
pet_gender CHAR(4) NOT NULL
);

CREATE TABLE product
(
product_no INTEGER PRIMARY KEY AUTO_INCREMENT ,
pet_type CHAR(4) NOT NULL ,
product_name VARCHAR(150) NOT NULL ,
product_price INTEGER NOT NULL ,
product_detail_desc VARCHAR(300) NOT NULL ,
product_image VARCHAR(200) NOT NULL ,
product_registdate DATE DEFAULT (current_date) NOT NULL ,
product_stock INTEGER NOT NULL ,
category_no INTEGER NOT NULL ,
product_desc VARCHAR(300) NOT NULL ,
product_public_state CHAR(4) NULL
);

CREATE TABLE qna_board
(
qna_board_no INTEGER PRIMARY KEY AUTO_INCREMENT ,
user_no INTEGER NOT NULL ,
product_no INTEGER NULL ,
title VARCHAR(200) NOT NULL ,
content VARCHAR(4000) NOT NULL ,
created_date DATE NOT NULL ,
board_public CHAR(4) NOT NULL ,
qna_category CHAR(4) NOT NULL ,
qna_admin_reply VARCHAR(3000) NULL ,
qna_state VARCHAR(50) NOT NULL
);

CREATE TABLE review
(
review_no INTEGER PRIMARY KEY AUTO_INCREMENT ,
content VARCHAR(3000) NOT NULL ,
star_cnt INTEGER NOT NULL ,
review_date DATE DEFAULT (current_date) NOT NULL ,
review_like_cnt INTEGER DEFAULT 0 NOT NULL ,
product_no INTEGER NOT NULL ,
user_no INTEGER NOT NULL
);

CREATE TABLE review_like
(
review_like_no INTEGER PRIMARY KEY AUTO_INCREMENT ,
review_no INTEGER NOT NULL ,
user_no INTEGER NOT NULL
);

CREATE TABLE sns_login
(
sns_no INTEGER PRIMARY KEY AUTO_INCREMENT ,
user_no INTEGER NOT NULL ,
sns_type CHAR(4) NOT NULL ,
access_token VARCHAR(500) NOT NULL ,
refresh_token VARCHAR(500) NOT NULL
);

CREATE TABLE user
(
user_no INTEGER PRIMARY KEY AUTO_INCREMENT ,
user_id VARCHAR(200) NOT NULL UNIQUE ,
user_pw VARCHAR(512) NOT NULL ,
user_name VARCHAR(50) NOT NULL ,
user_birth DATE NOT NULL ,
user_email VARCHAR(100) NOT NULL ,
user_phone VARCHAR(50) NOT NULL ,
user_addr VARCHAR(100) NOT NULL ,
user_permission CHAR(4) NOT NULL ,
user_joindate DATE DEFAULT (current_date) NOT NULL ,
user_leavedate DATE NULL ,
company_name VARCHAR(150) NULL ,
business_number VARCHAR(150) NULL ,
ceo_name VARCHAR(150) NULL
);

CREATE TABLE wishlist
(
wishlist_no INTEGER PRIMARY KEY AUTO_INCREMENT ,
user_no INTEGER NOT NULL ,
product_no INTEGER NOT NULL
);

-- 외래키 설정
ALTER TABLE cart
ADD (CONSTRAINT R_30 FOREIGN KEY (user_no) REFERENCES user (user_no));

ALTER TABLE cart
ADD (CONSTRAINT R_31 FOREIGN KEY (product_no) REFERENCES product (product_no));

ALTER TABLE free_board
ADD (CONSTRAINT R_26 FOREIGN KEY (user_no) REFERENCES user (user_no));

ALTER TABLE free_reply
ADD (CONSTRAINT R_27 FOREIGN KEY (free_board_no) REFERENCES free_board (free_board_no));

ALTER TABLE free_reply
ADD (CONSTRAINT R_28 FOREIGN KEY (user_no) REFERENCES user (user_no));

ALTER TABLE my_coupon
ADD (CONSTRAINT R_3 FOREIGN KEY (user_no) REFERENCES user (user_no));

ALTER TABLE my_coupon
ADD (CONSTRAINT R_4 FOREIGN KEY (coupon_no) REFERENCES coupon (coupon_no));

ALTER TABLE notice
ADD (CONSTRAINT R_25 FOREIGN KEY (user_no) REFERENCES user (user_no));

ALTER TABLE notice_reply
ADD (CONSTRAINT R_33 FOREIGN KEY (notice_board_no) REFERENCES notice (notice_board_no));

ALTER TABLE payment
ADD (CONSTRAINT R_7 FOREIGN KEY (user_no) REFERENCES user (user_no));

ALTER TABLE payment
ADD (CONSTRAINT R_35 FOREIGN KEY (my_coupon_no) REFERENCES my_coupon (my_coupon_no));

ALTER TABLE payment_product
ADD (CONSTRAINT R_8 FOREIGN KEY (payment_no) REFERENCES payment (payment_no));

ALTER TABLE payment_product
ADD (CONSTRAINT R_9 FOREIGN KEY (product_no) REFERENCES product (product_no));

ALTER TABLE pet
ADD (CONSTRAINT R_18 FOREIGN KEY (user_no) REFERENCES user (user_no));

ALTER TABLE product
ADD (CONSTRAINT R_6 FOREIGN KEY (category_no) REFERENCES category (category_no));

ALTER TABLE qna_board
ADD (CONSTRAINT R_24 FOREIGN KEY (product_no) REFERENCES product (product_no));

ALTER TABLE qna_board
ADD (CONSTRAINT R_23 FOREIGN KEY (user_no) REFERENCES user (user_no));

ALTER TABLE review
ADD (CONSTRAINT R_12 FOREIGN KEY (product_no) REFERENCES product (product_no));

ALTER TABLE review
ADD (CONSTRAINT R_13 FOREIGN KEY (user_no) REFERENCES user (user_no));

ALTER TABLE review_like
ADD (CONSTRAINT R_14 FOREIGN KEY (review_no) REFERENCES review (review_no));

ALTER TABLE review_like
ADD (CONSTRAINT R_15 FOREIGN KEY (user_no) REFERENCES user (user_no));

ALTER TABLE sns_login
ADD (CONSTRAINT R_34 FOREIGN KEY (user_no) REFERENCES user (user_no));

ALTER TABLE sub_code_tbl
ADD (CONSTRAINT R_37 FOREIGN KEY (main_code) REFERENCES main_code_tbl (main_code));

ALTER TABLE wishlist
ADD (CONSTRAINT R_16 FOREIGN KEY (user_no) REFERENCES user (user_no));

ALTER TABLE wishlist
ADD (CONSTRAINT R_29 FOREIGN KEY (product_no) REFERENCES product (product_no));

-- 데이터 삽입(꼭 순서대로 insert)
INSERT INTO CATEGORY set category_name = '사료', category_pno = NULL;
INSERT INTO CATEGORY set category_name = '간식', category_pno = NULL;
INSERT INTO CATEGORY set category_name = '건강관리', category_pno = NULL;
INSERT INTO CATEGORY set category_name = '미용/목욕', category_pno = NULL;

INSERT INTO CATEGORY set category_name = '건식사료', category_pno = 1;
INSERT INTO CATEGORY set category_name = '습식사료', category_pno = 1;

INSERT INTO CATEGORY set category_name = '수제간식', category_pno = 2;
INSERT INTO CATEGORY set category_name = '캔/파우치', category_pno = 2;
INSERT INTO CATEGORY set category_name = '통살', category_pno = 2;

INSERT INTO CATEGORY set category_name = '종합영양제', category_pno = 3;
INSERT INTO CATEGORY set category_name = '피부/모질', category_pno = 3;
INSERT INTO CATEGORY set category_name = '뼈/관절', category_pno = 3;

INSERT INTO CATEGORY set category_name = '샴푸/린스', category_pno = 4;
INSERT INTO CATEGORY set category_name = '브러쉬', category_pno = 4;
INSERT INTO CATEGORY set category_name = '발톱/발관리', category_pno = 4;

-- 데이터코드
INSERT INTO MAIN_CODE_TBL SET MAIN_CODE = '0A', MAIN_CODE_NAME='SNS로그인구분코드';
INSERT INTO MAIN_CODE_TBL SET MAIN_CODE = '0B', MAIN_CODE_NAME='쿠폰상태코드';
INSERT INTO MAIN_CODE_TBL SET MAIN_CODE = '0C', MAIN_CODE_NAME='배송상태코드';
INSERT INTO MAIN_CODE_TBL SET MAIN_CODE = '0D', MAIN_CODE_NAME='반려동물구분코드';
INSERT INTO MAIN_CODE_TBL SET MAIN_CODE = '0E', MAIN_CODE_NAME='반려동물성별구분코드';
INSERT INTO MAIN_CODE_TBL SET MAIN_CODE = '0F', MAIN_CODE_NAME='회원권한구분코드';
INSERT INTO MAIN_CODE_TBL SET MAIN_CODE = '0G', MAIN_CODE_NAME='문의사항상태코드';
INSERT INTO MAIN_CODE_TBL SET MAIN_CODE = '0H', MAIN_CODE_NAME='게시판공개범위상태코드';
INSERT INTO MAIN_CODE_TBL SET MAIN_CODE = '0I', MAIN_CODE_NAME='상풍공개범위코드';
INSERT INTO MAIN_CODE_TBL SET MAIN_CODE = '0J', MAIN_CODE_NAME='공지사항중요도범위코드';
INSERT INTO MAIN_CODE_TBL SET MAIN_CODE = '0K', MAIN_CODE_NAME='문의사항답변상태코드';

INSERT INTO SUB_CODE_TBL SET SUB_CODE ='A1', MAIN_CODE = '0A', SUB_CODE_NAME = '카카오';

INSERT INTO SUB_CODE_TBL SET SUB_CODE ='B1', MAIN_CODE = '0B', SUB_CODE_NAME = '사용가능';
INSERT INTO SUB_CODE_TBL SET SUB_CODE ='B2', MAIN_CODE = '0B', SUB_CODE_NAME = '사용완료';
INSERT INTO SUB_CODE_TBL SET SUB_CODE ='B3', MAIN_CODE = '0B', SUB_CODE_NAME = '기간만료';

INSERT INTO SUB_CODE_TBL SET SUB_CODE ='C1', MAIN_CODE = '0C', SUB_CODE_NAME = '주문완료';
INSERT INTO SUB_CODE_TBL SET SUB_CODE ='C2', MAIN_CODE = '0C', SUB_CODE_NAME = '배송준비중';
INSERT INTO SUB_CODE_TBL SET SUB_CODE ='C3', MAIN_CODE = '0C', SUB_CODE_NAME = '배송중';
INSERT INTO SUB_CODE_TBL SET SUB_CODE ='C4', MAIN_CODE = '0C', SUB_CODE_NAME = '배송완료';

INSERT INTO SUB_CODE_TBL SET SUB_CODE ='D1', MAIN_CODE = '0D', SUB_CODE_NAME = '강아지';
INSERT INTO SUB_CODE_TBL SET SUB_CODE ='D2', MAIN_CODE = '0D', SUB_CODE_NAME = '고양이';

INSERT INTO SUB_CODE_TBL SET SUB_CODE ='E1', MAIN_CODE = '0E', SUB_CODE_NAME = '수컷';
INSERT INTO SUB_CODE_TBL SET SUB_CODE ='E2', MAIN_CODE = '0E', SUB_CODE_NAME = '암컷';

INSERT INTO SUB_CODE_TBL SET SUB_CODE ='F1', MAIN_CODE = '0F', SUB_CODE_NAME = '일반회원';
INSERT INTO SUB_CODE_TBL SET SUB_CODE ='F2', MAIN_CODE = '0F', SUB_CODE_NAME = '판매자';
INSERT INTO SUB_CODE_TBL SET SUB_CODE ='F3', MAIN_CODE = '0F', SUB_CODE_NAME = '관리자';

INSERT INTO SUB_CODE_TBL SET SUB_CODE ='G1', MAIN_CODE = '0G', SUB_CODE_NAME = '상품문의';
INSERT INTO SUB_CODE_TBL SET SUB_CODE ='G2', MAIN_CODE = '0G', SUB_CODE_NAME = '배송문의';
INSERT INTO SUB_CODE_TBL SET SUB_CODE ='G3', MAIN_CODE = '0G', SUB_CODE_NAME = '교환/환불문의';
INSERT INTO SUB_CODE_TBL SET SUB_CODE ='G4', MAIN_CODE = '0G', SUB_CODE_NAME = '기타문의';

INSERT INTO SUB_CODE_TBL SET SUB_CODE ='H1', MAIN_CODE = '0H', SUB_CODE_NAME = '공개글';
INSERT INTO SUB_CODE_TBL SET SUB_CODE ='H2', MAIN_CODE = '0H', SUB_CODE_NAME = '비공개글';

INSERT INTO SUB_CODE_TBL SET SUB_CODE ='I1', MAIN_CODE = '0I', SUB_CODE_NAME = '공개';
INSERT INTO SUB_CODE_TBL SET SUB_CODE ='I2', MAIN_CODE = '0I', SUB_CODE_NAME = '비공개';

INSERT INTO SUB_CODE_TBL SET SUB_CODE ='J1', MAIN_CODE = '0J', SUB_CODE_NAME = '상';
INSERT INTO SUB_CODE_TBL SET SUB_CODE ='J2', MAIN_CODE = '0J', SUB_CODE_NAME = '하';

INSERT INTO SUB_CODE_TBL SET SUB_CODE ='K1', MAIN_CODE = '0K', SUB_CODE_NAME = '답변대기중';
INSERT INTO SUB_CODE_TBL SET SUB_CODE ='K2', MAIN_CODE = '0K', SUB_CODE_NAME = '답변완료';

CREATE TABLE email_auth (
	email varchar(100) PRIMARY KEY,
	authcode INTEGER NOT NULL,
    auth_expire_date timestamp NOT NULL
);

select *
	from email_auth;
    
delete from email_auth where email = 'c11286@naver.com';

select sysdate()
	from dual;

CREATE
EVENT DATE_TEST_UP
 ON SCHEDULE EVERY 1 DAY STARTS '2016-04-28 20:40:00' ENABLE
DO
 BEGIN
   UPDATE DATE_TEST SET TOKEN=9 WHERE stDate < DATE_SUB(DATE_FORMAT(NOW(), '%Y-%m-%d'), INTERVAL 6 DAY);   
 END;
/

SHOW VARIABLES LIKE 'event%';