window.addEventListener('DOMContentLoaded', () => {
    console.log('ajax.login.submit.js 실행');
});

const submitLoginBtn = $('#submit-login-form');
submitLoginBtn.on('click', handleLoginTypeCheck);

function handleLoginTypeCheck() {
    console.log('로그인 타입 체크!');
    const loginTypeChecked = $('input[name=login-type]:checked').val();
    console.log(`loginTypeChecked = ${loginTypeChecked}`);
    // loginTypeChecked = { 손님: 0, 사장님: 1 }
    if (loginTypeChecked === 'store') {
        handleStoreLogin();
        return;
    }
    handleUserLogin();
}

function handleStoreLogin() {
    console.log('사장님으로 로그인 시도!');
    const store_name = $('#login__input-id').val();
    const password = $('#login__input-pw').val();
    console.log(`store_name: ${store_name}, password: ${password}`);
    $.ajax({
        type: 'POST',
        url: '/api/login/store',
        data: {
            store_name,
            password,
        },
        success: function (response) {
            let result = response['msg'];
            alert(result);
            console.log(response['store_name'], response['password']);
            if (result === 'fail') {
                alert('아이디를 찾을 수 없습니다');
                console.log('아이디 확인 실패');
            } else if (result === 'wrong_pw') {
                alert('비밀번호가 틀립니다');
                console.log('비밀번호 확인 실패');
            } else {
                // 로그인
                console.log('로그인 성공!');
                alert('로그인 성공!');
                history.back();
            }
        },
    });
}

function handleUserLogin() {
    console.log('손님으로 로그인 시도!');
    const nickname = $('#login__input-id').val();
    const password = $('#login__input-pw').val();
    console.log(`nickname: ${nickname}, password: ${password}`);
    $.ajax({
        type: 'POST',
        url: '/api/login/user',
        data: {
            nickname,
            password,
        },
        success: function (response) {
            let result = response['msg'];
            alert(result);
            console.log(response['nickname'], response['password']);
            if (result === 'fail') {
                alert('일치하는 회원정보를 찾을 수 없습니다');
                console.log('회원정보 확인 실패');
            } else if (result === 'wrong_pw') {
                alert('비밀번호가 틀립니다');
                console.log('비밀번호 확인 실패');
            } else {
                // 로그인
                console.log('로그인 성공!');
                alert('로그인 성공!');
                history.back();
            }
        },
    });
}
