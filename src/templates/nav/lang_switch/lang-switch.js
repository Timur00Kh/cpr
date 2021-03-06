
let flag = false;

const switcher = document.querySelector('.lang-switch__label');
const list = document.querySelector('.lang-switch__list');
const label = document.querySelector('.lang-switch__label');

function open() {
    label.classList.add('lang-switch__label--active');

    list.classList.remove('animate__fadeOutUp', 'd-none');
    list.classList.add('animate__animated', 'animate__fadeInDown');
    flag = true;

}

function close() {
    label.classList.remove('lang-switch__label--active');

    list.classList.remove('animate__fadeInDown');
    list.classList.add('animate__animated', 'animate__fadeOutUp');
    flag = false;
}

switcher.addEventListener('click', () => {
    if (flag) {
        close();
    } else {
        open();
    }
});

list.addEventListener('animationend', () => {
    if (!flag) {
        list.classList.add('d-none')
    }
});

window.addEventListener('click', (e) => {
    if (!e.target.closest('.lang-switch')) {
        close();
    }
});

window.addEventListener('scroll', () => close());

