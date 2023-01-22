import {
    pwLengthConfirm,
    pwConfirm,
} from '/js/script/signup.form.password.confirm.js';

window.addEventListener('DOMContentLoaded', () => {
    console.log('ajax.signup.submit.js 실행');
});

if (document.querySelector('#submit-user')) {
    const submitUserBtn = document.querySelector('#submit-user');
    submitUserBtn.addEventListener('click', handleSubmitUserForm);
} else {
    const submitStoreBtn = document.querySelector('#submit-store');
    submitStoreBtn.addEventListener('click', handleSubmitStoreForm);
}

function handleSubmitUserForm() {
    pwLengthConfirm();
    pwConfirm();
    console.log($('#inputPasswordConfirm').hasClass('is-valid'));
    if (!$('#inputPasswordConfirm').hasClass('is-valid')) {
        return alert('비밀번호가 올바른지 확인해주세요');
    }

    const userNickname = document.querySelector('#userNickname').value;
    const inputPassword = document.querySelector('#inputPassword').value;
    const userEmail = document.querySelector('#userEmail').value;
    const userPhone = document.querySelector('#userPhone').value;

    $.ajax({
        type: 'POST',
        url: '/api/signup/user',
        data: {
            userNickname,
            inputPassword,
            userEmail,
            userPhone,
        },
        async: false,

        success: function (response) {
            alert(response['msg']);
        },
    });
}

function handleSubmitStoreForm() {
    pwLengthConfirm();
    pwConfirm();
    console.log($('#inputPasswordConfirm').hasClass('is-valid'));
    if (!$('#inputPasswordConfirm').hasClass('is-valid')) {
        return alert('비밀번호가 올바른지 확인해주세요');
    }

    const storeName = document.querySelector('#storeName').value;
    const inputPassword = document.querySelector('#inputPassword').value;
    const storeEmail = document.querySelector('#storeEmail').value;
    const storePhone = document.querySelector('#storePhone').value;
    const storeAddress = document.querySelector('#storeAddress').value;

    $.ajax({
        type: 'POST',
        url: '/api/signup/store',
        data: {
            storeName,
            inputPassword,
            storeEmail,
            storePhone,
            storeAddress,
        },
        async: false,

        success: function (response) {
            alert(response['msg']);
        },
    });
}
