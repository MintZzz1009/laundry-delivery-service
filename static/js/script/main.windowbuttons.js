window.addEventListener('DOMContentLoaded', () => {
    console.log('main-buttons.js 실행');
});

// windows navigator
// 1. 세탁 신청 버튼 클릭시
const userApplyBtn = document.querySelector('#apply-btn');
userApplyBtn.addEventListener('click', function () {
    verifyTokenAndMovePage('/api/apply');
});
// 2. 신청 조회 버튼 클릭시
const orderListBtn = document.querySelector('#laundry-list-btn');
orderListBtn.addEventListener('click', function () {
    verifyTokenAndMovePage('/api/orders');
});
// 3. 리뷰 작성 버튼 클릭시
const postReviewBtn = document.querySelector('#post-review-btn');
postReviewBtn.addEventListener('click', function () {
    verifyTokenAndMovePage('/api/user/review');
});
// 4. 리뷰 조회 버튼 클릭시
const getReviewsBtn = document.querySelector('#get-reviews-btn');
getReviewsBtn.addEventListener('click', function () {
    verifyTokenAndMovePage('/api/storeId/reviewId');
});

function verifyTokenAndMovePage(URL) {
    console.log(URL);
    $.ajax({
        type: 'GET',
        url: '/api/users/me',
        data: {},
        success: function (response) {
            console.log(response.result, response.message);
            alert('토큰이 정상적으로 검증되었습니다.');
            location.href = URL;
        },
        error: function (response) {
            // console.log(response.errorMessage);
            alert('로그인 페이지로 이동합니다.');
            location.href = '/api/login';
        },
    });
}
