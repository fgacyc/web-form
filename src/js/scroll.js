export const handleScroll = () => {
    const currentSection = document.querySelector('section');
    const nextSection = currentSection.nextElementSibling;

    if (!nextSection) {
        return;
    }

    const sectionHeight = nextSection.offsetHeight;

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