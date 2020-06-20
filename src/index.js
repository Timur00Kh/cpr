import './bootstrap.scss'
import './index.scss'

import './templates/nav/nav'
import './templates/form/form'


import WOW from 'wow.js'
let wow = new WOW(
    {
        boxClass:     'wow',      // animated element css class (default is wow)
        animateClass: 'animate__animated', // animation css class (default is animated)
        offset:       100,          // distance to the element when triggering the animation (default is 0)
        mobile:       true,       // trigger animations on mobile devices (default is true)
        live:         true,       // act on asynchronously loaded content (default is true)
        callback:     function(box) {
            // the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null,    // optional scroll container selector, otherwise use window,
        resetAnimation: true,     // reset animation on end (default is true)
    }
);
wow.init();

import SmoothScroll from 'smooth-scroll';
let scroll = new SmoothScroll('a[href*="#"]');
document.getElementById('to_form').addEventListener('click', () => {
        scroll.animateScroll(document.getElementById('form'));
});



/*Костыль для gh_pages*/
if (window.location.href.indexOf('timur00kh.github.io/cpr') > -1 ) {
        document.querySelectorAll('img').forEach(img => {
                img.src = '/cpr' + img.getAttribute('src');
        })
}