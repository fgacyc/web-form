export const handleScroll = (num = 1) => {
    const currentSection = document.querySelector('section');
    const nextSection = currentSection.nextElementSibling;

    if (!nextSection) {
        return;
    }

    const sectionHeight = (nextSection.offsetHeight / num);

    window.scrollTo({
        top: window.pageYOffset + sectionHeight,
        behavior: 'smooth',
    });
};

export const handleTouchEnd = (classname) => {
    const swiperContainer = document.querySelector(classname);
    const swiperSlides = swiperContainer.getElementsByClassName('swiper-slide');
    const lastSlideIndex = swiperSlides.length - 1;
    const activeSlideIndex = swiperContainer.swiper.activeIndex;

    if (activeSlideIndex === lastSlideIndex) {
        handleScroll();
    }
};

export const handleScrollUp = (num = 1) => {
    const currentSection = document.querySelector('section');
    const prevSection = currentSection.previousElementSibling;
alert(prevSection);
    if (!prevSection) {
        return;
    }

    const sectionHeight = prevSection.offsetHeight / num;

    window.scrollTo({
        top: window.pageYOffset - sectionHeight,
        behavior: 'smooth',
    });
};