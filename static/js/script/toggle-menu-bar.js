window.addEventListener('DOMContentLoaded', () => {
    console.log('toggle-menu-bar.js 실행');

    // 헤더 메뉴버튼 클릭시 - 토글 기능
    const toggleMenuBtn = document.querySelector('#btn-menu');
    toggleMenuBtn.addEventListener('click', toggleOn);

    function toggleOn() {
        const toggleBox = document.querySelector('#toggle-menu-bar');
        toggleBox.classList.toggle('toggled-off');
        toggleBox.classList.toggle('toggled-on');
    }

    // 회원가입 버튼 클릭시
    const signUpBtn = document.querySelector('#signup-btn');
    signUpBtn.addEventListener('click', handleSignUp);

    function handleSignUp() {
        window.location.href = '/api/signup/user';
    }

    // 로그인 버튼 클릭시
    const logInBtn = document.querySelector('#login-btn');
    logInBtn.addEventListener('click', handleLogIn);

    function handleLogIn() {
        window.location.href = '/api/login';
    }

    // 마이페이지 버튼 클릭시

    // 로그아웃 버튼 클릭시
});
