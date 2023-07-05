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

export function handlerSectionScroll(num){
    const sections = document.querySelectorAll('section');
    const targetSection = sections[num];

    targetSection.scrollIntoView({
        behavior: 'smooth',
    })
}

export const handleTouchEnd = (classname) => {
    const swiperContainer = document.querySelector(classname);
    const swiperSlides = swiperContainer.getElementsByClassName('swiper-slide');
    const lastSlideIndex = swiperSlides.length - 1;
    const activeSlideIndex = swiperContainer.swiper.activeIndex;

    if (activeSlideIndex === lastSlideIndex) {
        handleScroll();
    }
};

export const handleScrollUp = () => {
    const currentSection = document.querySelector('section');

    window.scrollTo({
        top: window.innerHeight,
    });
};