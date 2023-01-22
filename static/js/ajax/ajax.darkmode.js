const ligthOrDarkBtn = document.querySelector('#ligth-or-dark-mode');
ligthOrDarkBtn.addEventListener('click', handleChangeMode);

function handleChangeMode() {
    document.querySelector('main').classList.toggle('dark-mode');

    // 서버에 mode 변수에 'dark' 할당
    // 쿠키에 user 확인하고     다크 모드 저장
}
