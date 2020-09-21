
window.onload = () => {
    console.log("Loader removed");
    disableScroll();
    document.getElementById('loaded').remove()
    // const mainEl = document.querySelector('.scroll-wrapper');
    // const scroller = nativeSmoothScroll({
    //     element: mainEl
    // });
}

const nextPage = () => {
    console.log("first page closed");
    /*Récupération du bon élément*/
    const elm = document.getElementById('loader');
    setTimeout(() => {
        elm.remove();
        enableScroll();
    }, 200);
}

function disableScroll() {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

        // if any scroll is attempted, set this to the previous value
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}

function enableScroll() {
    window.onscroll = function() {};
}
