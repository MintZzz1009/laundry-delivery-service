window.addEventListener('DOMContentLoaded', (event) => {
    console.log('backspace.js 파일 연결');

    // '<' 클릭시, 세탁물 상태조회(개인)
    const goToBackBtn = document.querySelector('#btn-back');
    goToBackBtn.addEventListener('click', backToHistory);

    function backToHistory() {
        window.history.back();
    }

    // '🏠' 클릭시, 메인
    const goToHomeBtn = document.querySelector('#btn-home');
    goToHomeBtn.addEventListener('click', goToHome);

    function goToHome() {
        window.location.href = `/`;
    }
});
