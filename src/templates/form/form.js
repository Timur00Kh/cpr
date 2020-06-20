import IMask from 'imask';

IMask(document.getElementById('phone'), {
    mask: '+{7} (000) 000-00-00'
});

const modal = (() => {
    const m = document.querySelector('.cpr-modal');
    const mb = document.querySelector('.cpr-modal__body');
    const mbd = document.querySelector('.cpr-modal__backdrop');
    const icon = document.querySelector('.cpr-modal__icon');


    return {
        show() {
            document.querySelector('html').style.overflow = 'hidden';

            mbd.classList.remove('animate__fadeOut');
            mbd.classList.add('animate__fadeIn');
            mb.classList.remove('animate__zoomOut');
            mb.classList.add('animate__zoomIn');

            m.classList.add('cpr-modal--active');
            setTimeout(() => icon.classList.add('cpr-modal__icon--active'), 100);
        },
        close() {
            document.querySelector('html').style.overflow = '';

            mbd.classList.remove('animate__fadeIn');
            mbd.classList.add('animate__fadeOut');
            mb.classList.remove('animate__zoomIn');
            mb.classList.add('animate__zoomOut');

            setTimeout(() => m.classList.remove('cpr-modal--active'), 800);
            icon.classList.remove('cpr-modal__icon--active');
        },
    }
})();

document.querySelector('.cpr-modal__close').addEventListener('click', () => modal.close());
document.querySelector('.cpr-modal__backdrop').addEventListener('click', (e) => {
    if(e.target && e.target.classList.contains('cpr-modal__backdrop')) {
        modal.close()
    }
});
document.querySelector('#form__button').addEventListener('click', () => {
    /*TODO: validation*/
    modal.show()
});
