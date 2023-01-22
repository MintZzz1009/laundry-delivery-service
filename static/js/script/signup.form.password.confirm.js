$(document).ready(function () {
    console.log('form.password.confirm.js 실행');
});

const inputPassword = $('#inputPassword');
inputPassword.on('focusout', pwLengthConfirm);

export function pwLengthConfirm() {
    console.log('비밀번호 글자수 확인 작업 시작');

    const inputPassword = $('#inputPassword');
    $('#inputPassword').removeClass('is-invalid is-valid');
    $('#pw-length-feedback').remove();

    console.log('1번째 칸 비밀번호: ', inputPassword.val());
    console.log('비밀번호 글자 수: ', inputPassword.val().length);

    if (
        inputPassword.val().includes(' ') == true ||
        inputPassword.val().includes(',') === true
    ) {
        $('#inputPassword').addClass('is-invalid');
        $('#inputPassword').after(
            `<div id="pw-length-feedback" class="invalid-feedback" style="text-align: right">비밀번호에 "공백"이나 ","가 포함되어서는 안됩니다 😭</div>`
        );
        console.log('비밀번호에 공백 및 쉼표 포함되어 실패');
    } else if (inputPassword.val().length >= 4) {
        $('#inputPassword').addClass('is-valid');
        $('#inputPassword').after(
            `<div id="pw-length-feedback" class="valid-feedback" style="text-align: right">사용가능한 비밀번호입니다 😝</div>`
        );
        console.log('비밀번호 글자수 조건만족');
    } else {
        $('#inputPassword').addClass('is-invalid');
        $('#inputPassword').after(
            `<div id="pw-length-feedback" class="invalid-feedback" style="text-align: right">비밀번호의 글자수를 확인해주세요 😭</div>`
        );
        console.log('비밀번호 글자수 조건불만족');
    }
}

const inputPasswordConfirm = $('#inputPasswordConfirm');
inputPasswordConfirm.on('focusout', pwConfirm);

export function pwConfirm() {
    console.log('비밀번호 확인 작업 시작');
    const inputPasswordConfirm = $('#inputPasswordConfirm');
    const inputPassword = $('#inputPassword');
    $('#inputPasswordConfirm').removeClass('is-invalid is-valid');
    $('#pw-feedback').remove();
    console.log('비밀번호: ', inputPassword.val());
    console.log('비밀번호 확인: ', inputPasswordConfirm.val());

    if (inputPassword.val() === inputPasswordConfirm.val()) {
        $('#inputPasswordConfirm').addClass('is-valid');
        $('#inputPasswordConfirm').after(
            `<div id="pw-feedback" class="valid-feedback" style="text-align: right">비밀번호가 일치합니다 😝</div>`
        );
        console.log('비밀번호 일치');
    } else {
        $('#inputPasswordConfirm').addClass('is-invalid');
        $('#inputPasswordConfirm').after(
            `<div id="pw-feedback" class="invalid-feedback" style="text-align: right">비밀번호가 다릅니다 😭</div>`
        );
        console.log('비밀번호 불일치');
    }
}
