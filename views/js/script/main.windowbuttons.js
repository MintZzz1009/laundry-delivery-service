window.addEventListener('DOMContentLoaded', () => {
    console.log('main-buttons.js 실행');

    // windows navigator
    // 1. 세탁 신청 버튼 클릭시
    // 2. 신청 조회 버튼 클릭시
    // 3. 리뷰 작성 버튼 클릭시
    // 4. 리뷰 조회 버튼 클릭시
    const getReviewsBtn = document.querySelector('#get-reviews-btn');
    getReviewsBtn.addEventListener('click', goToGetReviews);

    function goToGetReviews() {
        window.location.href = '/api/storeId/reviewId';
        //window.location.href = '/api/:storeId/:reviewId';
    }
});
