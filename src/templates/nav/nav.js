import './lang_switch/lang-switch'

let flag = false;
const mNav = (() => {
    const b = document.getElementById('nav_button');
    const m_nav = document.querySelector('.m_nav');
    const nav = document.querySelector('.nav');



    return {
        open() {
            document.querySelector('html').style.overflow = 'hidden';

            b.classList.remove('nav__menu');
            b.classList.add('nav__close');

            m_nav.classList.remove('d-none', 'm_nav--closed');
            m_nav.classList.add('m_nav--active');
            flag = true;

            nav.classList.remove('shadow')

        },
        close() {
            document.querySelector('html').style.overflow = '';

            b.classList.add('nav__menu');
            b.classList.remove('nav__close');

            m_nav.classList.remove('m_nav--active');
            m_nav.classList.add('m_nav--closed');
            // setTimeout(() => m_nav.classList.add('d-none'), 500);
            flag = false;

            setTimeout(() => nav.classList.add('shadow'), 200);
        }
    }
})();

document.getElementById('nav_button').addEventListener('click', (e) => {
    if (flag) {
        mNav.close()
    } else {
        mNav.open()
    }
});

document.querySelectorAll('.m_nav__link')
    .forEach(e => e.addEventListener('click', () => mNav.close()));


let prevScrollPos = window.pageYOffset;
window.onscroll = function() {
    const currentScrollPos = window.pageYOffset;
    const nav = document.querySelector('.nav');

    if (currentScrollPos <= 80 || flag) {
        nav.style.transitionDelay = '0s';
        nav.style.top = "0";
        return;
    }

    if (prevScrollPos > currentScrollPos) {
        nav.style.transitionDelay = '0s';
        nav.style.top = "0";
    } else {
        nav.style.transitionDelay = '.5s';
        nav.style.top = "-85px";
    }
    prevScrollPos = currentScrollPos;
};

window.addEventListener('resize', () => mNav.close());
