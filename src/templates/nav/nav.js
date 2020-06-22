import './lang_switch/lang-switch'

let flag = false;
const mNav = (() => {
    const b = document.getElementById('nav_button');
    const m_nav = document.querySelector('.m_nav');
    const nav = document.querySelector('.nav');
    const ios = iOS();

    m_nav.addEventListener('animationend', () => {
        if (!flag) {
            nav.classList.add('shadow')
        }
    });



    return {
        open() {
            document.querySelector('html').classList.add('lock');
            document.querySelector('body').classList.add('lock');

            b.classList.remove('nav__menu', !ios && 'nav__menu--animated');
            b.classList.add('nav__close', !ios && 'nav__close--animated');

            m_nav.classList.remove('d-none', 'm_nav--closed');
            m_nav.classList.add('m_nav--active');
            flag = true;

            if (window.innerHeight > 680 ) {
                nav.classList.remove('shadow')
            }

        },
        close() {
            document.querySelector('html').classList.remove('lock');
            document.querySelector('body').classList.remove('lock');

            b.classList.add('nav__menu', !ios && 'nav__menu--animated');
            b.classList.remove('nav__close', !ios && 'nav__close--animated');

            m_nav.classList.remove('m_nav--active');
            m_nav.classList.add('m_nav--closed');
            // setTimeout(() => m_nav.classList.add('d-none'), 500);
            flag = false;
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

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mNav.close()
    }
});

function iOS() {

    var iDevices = [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ];

    if (navigator.platform) {
        while (iDevices.length) {
            if (navigator.platform === iDevices.pop()){ return true; }
        }
    }

    return false;
}
