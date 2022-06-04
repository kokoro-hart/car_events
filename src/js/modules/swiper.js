import Swiper from 'swiper/bundle';


const slideLength = document.querySelectorAll('.p-mv .swiper-slide').length;
const total = ('00' + slideLength).slice(-2);

const fractionNum = document.querySelector('#js-number');
const fractionTotal = document.querySelector('#js-total');
fractionTotal.textContent = total;

/**
 * スライドのカウントアップ
 * @param {number} 現在のスライドの番号
 */
const updateFraction = (index) => {
  let current = ('00' + (index + 1)).slice(-2);
  fractionNum.classList.add('is-anm-started');
  setTimeout(() => {
    fractionNum.textContent = current;
  }, 400);
}

/**
 * アニメーション開始
 * @param {number} 現在のスライドの番号
 * @param {HTMLElement} elements 対象のDOM要素
 */
const startAnimation = (index, elements) => {
  let activeSlide = document.querySelectorAll(`${elements}`)[index];
  activeSlide.classList.remove('is-anm-finished');
  activeSlide.classList.add('is-anm-started');
}

/**
 * アニメーション終了
 * @param {HTMLElement} element 対象のDOM要素
 */
const finishAnimation = (element) => {
  let activeSlide = document.querySelector(`${element}`);
  if (activeSlide) {
    activeSlide.classList.remove('is-anm-started');
    activeSlide.classList.add('is-anm-finished');
  }
}

const mvSwiper = new Swiper('.p-mv .swiper', {
  loop: true,
  loopAdditionalSlides: 1,
  speed: 1500,
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
    waitForTransition: false,
  },
  followFinger: false,
  observeParents: true,
  on: {
    slideChange: (swiper) => {
      updateFraction(swiper.realIndex);
      finishAnimation('.js-slider-content.is-anm-started');
    },
    slideChangeTransitionStart: (swiper) => {
      startAnimation(swiper.realIndex, '.js-slider-content');
    },
    slideChangeTransitionEnd: () => {
      fractionNum.classList.remove('is-anm-started');
    },
  }
});

const lineupSwiper = new Swiper('.p-home-lineup .swiper', {
  loop: true,
  slidesPerView: 2,
  spaceBetween: 24, 
  speed: 1000,
  centeredSlides: true, 
  followFinger: false,
  slideToClickedSlide: true,
  autoplay: { 
    delay: 4000, 
    disableOnInteraction: false,
    waitForTransition: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  effect: "coverflow",
  coverflowEffect: {
    stretch: -24, 
    rotate: 0,
    depth: 150, 
    scale: 0.85,
    slideShadows: false, 
  },
  breakpoints: {
    768: {
      slidesPerView: 2.5,
    },
    1024: {
      slidesPerView: 3.5,
      spaceBetween: 24,
    },
  },
  on: {
    slideChange: () => {
      finishAnimation('.js-slider-title.is-anm-started');
    },
    slideChangeTransitionStart: (swiper) => {
      startAnimation(swiper.realIndex, '.js-slider-title');
    },
  }
});