import Swiper from 'swiper/bundle';

const myDelay = 6000;

const slideLength = document.querySelectorAll('.p-mv .swiper-slide').length;
const total = ('00' + slideLength).slice(-2);

const fractionNum = document.querySelector('#js-number');
const fractionTotal = document.querySelector('#js-total');
fractionTotal.textContent = total;

const updateFraction = (index) => {
  let current = ('00' + (index + 1)).slice(-2);
  fractionNum.classList.add('is-anm-started');
  setTimeout(() => {
    fractionNum.textContent = current;
  }, 400);
}

const startAnimation = (index) => {
  let activeSlide = document.querySelectorAll('.js-slider-content')[index];
  activeSlide.classList.remove('is-anm-finished');
  activeSlide.classList.add('is-anm-started');
}

const finishAnimation = () => {
  let activeSlide = document.querySelector('.js-slider-content.is-anm-started');
  if (activeSlide) {
    activeSlide.classList.remove('is-anm-started');
    activeSlide.classList.add('is-anm-finished');
  }
}

const mySwiper = new Swiper('.p-mv .swiper', {
  loop: true,
  loopAdditionalSlides: 1,
  speed: 1500,
  autoplay: {
    delay: myDelay,
    disableOnInteraction: false,
    waitForTransition: false,
  },
  followFinger: false,
  observeParents: true,
  on: {
    slideChange: (swiper) => {
      updateFraction(swiper.realIndex);
      finishAnimation();
    },
    slideChangeTransitionStart: (swiper) => {
      startAnimation(swiper.realIndex);
    },
    slideChangeTransitionEnd: () => {
      fractionNum.classList.remove('is-anm-started');
    },
  }
});
