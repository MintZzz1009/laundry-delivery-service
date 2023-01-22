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
// 3. 리뷰 작성 버튼 클릭시
// 4. 리뷰 조회 버튼 클릭시
const getReviewsBtn = document.querySelector('#get-reviews-btn');
getReviewsBtn.addEventListener('click', function () {
    verifyTokenAndMovePage('/api/storeId/reviewId');
});

// function hasToken() {
//     const isAccessToken = document.cookie.includes('accessToken');
//     console.log(isAccessToken);
//     if (!isAccessToken) {
//         alert('사용자 인증 토큰을 찾을 수 없습니다. 로그인 후 이용해주세요');
//         return (location.href = '/api/login');
//     }
//     console.log('쿠키확인: ', document.cookie);
//     return true;
// }

// 페이지 이동
// window.location.href = 'URL 경로';

// 라우터에서 varify 토큰
// -> access 만료시 refresh 참조하여 재생성
// -> refresh 만료시 로그인창 이동

// -> access 유효할시 페이지 이동 허가

function verifyTokenAndMovePage(URL) {
    $.ajax({
        type: 'GET',
        url: '/api/users/me',
        data: {},
        success: function (response) {
            if (response.result === 'success') {
                location.href = URL;
            }
        },
    });
}
