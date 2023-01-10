window.addEventListener('DOMContentLoaded', () => {
    console.log('main.js 실행');
});

const toggleMenuBtn = document.querySelector('#btn-menu');
toggleMenuBtn.addEventListener('click', toggleOn);

function toggleOn() {
    const toggleBox = document.querySelector('#toggle-box');
    toggleBox.classList.toggle('toggled-off');
    toggleBox.classList.toggle('toggled-on');
}
