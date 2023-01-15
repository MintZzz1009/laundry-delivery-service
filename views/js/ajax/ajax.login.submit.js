const submitLogInBtn = $('#submit-login-form');
submitLogInBtn.on('click', submit_log_in);

function submit_log_in() {
    console.log('로그인 시도!');
    let input_id = $('#login__input-id').val();
    console.log(input_id);
    let input_pw = $('#login__input-pw').val();
    console.log(input_pw);
    $.ajax({
        type: 'POST',
        url: '/api/login',
        data: {
            input_id,
            input_pw,
        },
        async: false,
        success: function (response) {
            let result = response['msg'];
            console.log(result);
            console.log(response['input_id'], response['input_pw']);
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
                window.location.reload();
            }
        },
    });
}
