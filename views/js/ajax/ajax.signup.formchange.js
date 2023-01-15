window.addEventListener('DOMContentLoaded', () => {
    console.log('sign-up.js 실행');

    const signUpCheckBox = document.querySelector('#flexSwitchCheckDefault');
    signUpCheckBox.addEventListener('click', handleChangeForm);

    function handleChangeForm() {
        if (signUpCheckBox.checked === true) {
            document.querySelector('#sign-up-for-who').value = "'사장님' ";
            // 사장님 폼 불러오는 api랑 연결
        } else {
            document.querySelector('#sign-up-for-who').value = "'손님' ";
            // 손님 폼 불러오는 api랑 연결
        }
    }
});
