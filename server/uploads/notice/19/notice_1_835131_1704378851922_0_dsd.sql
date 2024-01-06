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
use petgoods;

select b.sub_code, b.sub_code_name
	from main_code_tbl AS A
    JOIN sub_code_tbl AS B ON A.main_code = B.main_code
    WHERE A.main_code_name = '회원권한구분코드';
    
SELECT *
            FROM main_code_tbl AS A
            JOIN sub_code_tbl AS B ON A.main_code = B.main_code;
		
select * from product order by product_registdate limit 0,5;
    
SELECT '4ea5c508a6566e76240543f8feb06fd457777be39549c4016436afda65d2330e' = '4ea5c508a6566e76240543f8feb06fd457777be39549c4016436afda65d2330e' AS TEST
	FROM DUAL;
UPDATE user SET user_pw = 1234 WHERE user_id = 'asdasd' AND user_email = 'c11286@naver.com';

select A.user_id, DATE_FORMAT(A.user_joindate, '%Y-%m-%d') as user_joindate
	from user AS A
    LEFT JOIN sns_login AS B ON A.user_no = B.user_no
    WHERE B.user_no IS NULL AND A.user_name = '전민교' AND A.user_email = 'c11286@naver.com';
    
    
delete from sns_login where user_no = 13;    
delete from user where user_id = '3240498042';

delete from user user where user_id = '3240498042';

delete from user where user_id = '3240498042';
SELECT user_id,DATE_FORMAT(user_joindate, '%Y-%m-%d') as user_joindate
                FROM user;

delete from email_auth where email = 'c11286@naver.com';

select *
	from notice;
    
select *
	from sub_code_tbl;

select * from main_code_tbl;
UPDATE USER SET user_permission = 'F3' WHERE user_no = 1;

DELIMITER //
CREATE EVENT your_event_name
ON SCHEDULE EVERY 1 MINUTE
STARTS CURRENT_TIMESTAMP
DO
BEGIN
  DELETE FROM email_auth WHERE sysdate() >= auth_expire_date;
END //
DELIMITER ;

SHOW VARIABLES LIKE 'event%';

use petgoods;
ALTER TABLE product ADD COLUMN user_no INTEGER NOT NULL;
ALTER TABLE product
ADD (CONSTRAINT R_50 FOREIGN KEY (user_no) REFERENCES user (user_no));

use petgoods;
select * from category;

with recursive cte (category_no, category_name, category_pno) as (
  select     category_no,
              category_name,
             category_pno
  from       category
  where      category_pno IS NULL
  union all
  select     d.dept_no,
             d.name,
             d.parent_id
  from       depts d
  inner join cte
          on d.parent_no = cte.dept_no
)
select * from cte;

WITH RECURSIVE CategoryHierarchy AS (
  SELECT category_no, category_name, category_pno
  FROM category
  WHERE category_pno is not null  -- 시작점의 category_no

  UNION ALL

  SELECT c.category_no, c.category_name, c.category_pno
  FROM category c
  JOIN CategoryHierarchy ch ON c.category_pno = ch.category_no
)
SELECT * FROM CategoryHierarchy;

use petgoods;

select *
	from notice;
    WHERE importance_level = 'J1' AND current_date() not Between notice_start_date AND notice_end_date;
    
                SELECT *
                    FROM notice
                    WHERE importance_level = 'J2' OR (importance_level = 'J1' AND current_date() Not Between notice_start_date AND notice_end_date)
                    ORDER BY created_date DESC
                    LIMIT 0, 8;
    
delete from notice where notice_board_no = 6;

				SELECT *
                    FROM notice
                    WHERE title like ? AND importance_level = 'J2' OR NOT IN (importance_level = 'J1' AND current_date() Not Between notice_start_date AND notice_end_date)
                    ORDER BY created_date DESC
                    LIMIT ?, ?;

select *
	from user;
    


SELECT *
	FROM notice_reply;
    
 SELECT *
                FROM notice
                WHERE notice_board_no =9;
    
SELECT *
	FROM product;
    
SELECT A.product_no,A.pet_type, A.product_name,A.product_price,A.product_registdate, A.product_image, A.product_public_state, C.category_name AS Parent_category_name, B.category_name AS child_category_name
	FROM product AS A
    JOIN category AS B ON A.category_no = B.category_no
    JOIN category AS C ON C.category_no = B.category_pno;
    


SELECT *
	FROM USER;
    
INSERT INTO  product(product_no,pet_type,product_name,product_price,product_detail_desc,product_image,product_stock,category_no,product_desc,product_public_state,user_no)
 VALUE(1,'d1','사료2',5000,'ㅇㅇㅅㅇ','ㅁㄴㅇㅁㄴㅇ','45',6,'설명','i1',3);
    
    
SELECT A.notice_reply_no as parent_reply_no,A.comment as parent_comment, A.reply_date as parent_reply_date, A.user_no AS parent_user_no, C.user_name AS parent_user_name, 
	B.notice_reply_no as child_reply_no, B.comment as child_comment, B.notice_reply_pno, B.reply_date as child_reply_date, B.user_no AS child_user_no, (SELECT user_name FROM user WHERE user_no = child_user_no) AS child_name
	FROM notice_reply AS A
    LEFT JOIN notice_reply AS B ON A.notice_reply_no = B.notice_reply_pno
    JOIN user AS C ON A.user_no = C.user_no
    WHERE A.notice_board_no = 9 AND A.notice_reply_pno IS NULL
    ORDER BY A.reply_date asc, child_reply_date asc;
    
SELECT A.notice_reply_no as parent_reply_no,A.comment as parent_comment, A.reply_date as parent_reply_date, A.user_no AS parent_user_no, C.user_name AS parent_user_name, 
	B.notice_reply_no as child_reply_no, B.comment as child_comment, B.notice_reply_pno, B.reply_date as child_reply_date, B.user_no AS child_user_no, (SELECT user_name FROM user WHERE user_no = child_user_no) AS child_name
	FROM notice_reply AS A
    LEFT JOIN notice_reply AS B ON A.notice_reply_no = B.notice_reply_pno
    JOIN user AS C ON A.user_no = C.user_no
    WHERE A.notice_board_no = 9 AND A.notice_reply_pno IS NULL
    ORDER BY A.reply_date asc, child_reply_date asc;
    
select count(*) from notice_Reply where notice_board_no = 9;

select *
	from
set sql_safe_updates=0;
UPDATE notice_reply SET comment="답글 테스트임당" WHERE notice_reply_pno IS NOT NULL;

    
INSERT INTO notice_reply SET notice_board_no = 9, comment="니가뭔데ㅋㅋㅋㅋㅋㅋ..", reply_date = current_time(), notice_Reply_pno = 9, user_no = 2; 

SELECT A.*
	FROM notice AS A
    LEFT JOIN notice_reply AS B ON A.notice_board_no = B.notice_board_no
    WHERE A.notice_board_no = 5;
    
select *
	from notice_reply;
select *
	from free_reply;
    
SELECT notice_board_no, count(*) AS reply_cnt
	FROM notice_reply
    WHERE notice_board_no = 5;
    
SELECT *
	FROM product;
    
delete from user where user_no = 987654321;

select *
from sub_code_tbl;
    

insert into product set product_no = 2, pet_type = 'd1', product_name = '사료3', product_price=6000, product_detail_desc = 'ㅋㅋ', product_image = 'asdf', product_registdate = current_date(), product_stock = 45, category_no = 6, product_desc = '설명', product_public_state = 'i1';


select p.product_name, p.product_price from
    (
		select p.product_no, count(*) as cnt, TRUNCATE(avg(r.star_cnt),0) as avg_cnt 
        from product p 
        left join review r on p.product_no = r.product_no
		where p.pet_type= 'd1'
		group by p.product_no
		order by cnt desc
	) p
	left join review r on p.product_no = r.product_no
	order by p.product_registdate limit 0,4;

select *
	from user;
    
    
    use petgoods;
SELECT *
	FROM product;
    
delete from user where user_no = 987654321;

    
    
    
    
    

SELECT p.product_no, p.product_name, p.product_price, p.product_stock, p.category_no, a.avg_cnt
	FROM
		(
        SELECT p.product_no, TRUNCATE(avg(r.star_cnt),0) as avg_cnt 
			FROM product AS p
			LEFT JOIN review AS r on p.product_no = r.product_no
			Group by p.product_no
		) as a
        JOIN product as p on a.product_no = p.product_no
        WHERE p.pet_type = 'd1';
    
    
select *
	from product;
    
    

    
delete from notice;


select *
	from notice;
set sql_safe_updates=0;

ALTER TABLE notice MODIFY content VARCHAR(8000);
ALTER TABLE review MODIFY content VARCHAR(8000);

select *
	from notice;

    
ALTER TABLE payment ADD COLUMN receiver_name VARCHAR(50) NOT NULL;
ALTER TABLE payment ADD COLUMN receiver_phone VARCHAR(50) NOT NULL;
ALTER TABLE payment ADD COLUMN receiver_addr VARCHAR(150) NOT NULL;
ALTER TABLE payment ADD COLUMN delivery_request VARCHAR(150) NOT NULL;
ALTER TABLE payment DROP COLUMN address;

ALTER TABLE notice MODIFY created_date datetime;

use petgoods;
SELECT *
	FROM sub_code_tbl;


SELECT A.payment_no,C.user_name,C.user_addr,D.product_name,A.buy_cnt,B.payment_date,A.delivery_state
	FROM payment_product A JOIN payment B ON A.payment_no = B.payment_no
	JOIN USER C ON B.user_no = C.user_no
	Join product D ON D.product_no = A.product_no
	where D.user_no = ?