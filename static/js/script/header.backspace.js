window.addEventListener('DOMContentLoaded', (event) => {
    console.log('backspace.js 파일 연결');
});

// '<' 클릭시, 세탁물 상태조회(개인)
const goToBackBtn = document.querySelector('#btn-back');
if (goToBackBtn) {
    goToBackBtn.addEventListener('click', backToHistory);
}

function backToHistory() {
    window.history.back();
}

// '🏠' 클릭시, 메인
const goToHomeBtn = document.querySelector('#btn-home');
if (goToHomeBtn) {
    goToHomeBtn.addEventListener('click', goToHome);
}

function goToHome() {
    if (hasToken) {
        window.location.href = `/api/main`;
    }
}

function hasToken() {
    const isAccessToken = document.cookie.includes('accessToken');
    console.log(isAccessToken);
    if (!isAccessToken) {
        alert('사용자 인증 토큰을 찾을 수 없습니다. 로그인 후 이용해주세요');
        return (location.href = '/api/login');
    }
    console.log('쿠키확인: ', document.cookie);
    return true;
}
