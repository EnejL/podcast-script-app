const toTop = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if(document.body.scrollTop > 300) {
        toTop.classList.add('to-top-visible');
    } else {
        toTop.classList.remove('to-top-visible');
    }
});
