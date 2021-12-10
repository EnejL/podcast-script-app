const toTop = document.querySelector('.scroll-to-top');

window.onload = function () {
    window.addEventListener('scroll', () => {
        if(document.body.scrollTop > 150) {
            console.log('scrolled it!');
            toTop.classList.add('to-top-visible');
        } else {
            toTop.classList.remove('to-top-visible');
        }
    });
}
