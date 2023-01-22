window.addEventListener('DOMContentLoaded', () => {
    console.log('sign-up.js 실행');

    const signUpCheckBox = document.querySelector('#flexSwitchCheckDefault');
    signUpCheckBox.addEventListener('click', handleChangeForm);

    function handleChangeForm() {
        const storeChecked = signUpCheckBox.checked;
        console.log(storeChecked);
        if (storeChecked) {
            window.location.href = '/api/signup/store';
        } else {
            window.location.href = '/api/signup/user';
        }
    }
});
