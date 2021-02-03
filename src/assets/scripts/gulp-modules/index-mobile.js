const sliderContainer = document.querySelector('[data-mobile-slider]');
const swiperHomePrevBtn = document.querySelector('[data-mobile-slider-btn--prev]');
const swiperHomePrevBtnText = swiperHomePrevBtn.querySelector('span');
const swiperHomeNextBtn = document.querySelector('[data-mobile-slider-btn--next]');
const swiperHomeNextBtnText = swiperHomeNextBtn.querySelector('span');
const slides = [...document.querySelectorAll('[data-swiper-slide]')];
const cntSlCounter = document.querySelector('[data-cnt]');
/*  */
const title = '[data-gsap-mob-title]';
const text = '[data-gsap-mob-text]';
const link = '[data-gsap-mob-link]';
const awards = '[data-gsap-mobate-award]';
/*  */
const mainTitle = '[data-gsap-mob-main-title]';
const mainSubtitle = '[data-gsap-mob-main-subtitle]';



const slidesTitles = slides.map(el => el.dataset.title);

$(window).resize(() => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
})
document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)


const swiperHome = new Swiper(sliderContainer, {
  pagination: '.swiper-pagination',
  direction: 'horizontal',
  slidesPerView: 1,
  spaceBetween: 0,
  allowTouchMove: false,
  speed: 600,
  navigation: {
    prevEl: swiperHomePrevBtn,
    nextEl: swiperHomeNextBtn,
  },
  on: {
    transitionStart(swiper, progress) {
      const cnt = swiper.activeIndex;
      const prev = cnt - 1;
      const next = cnt + 1;
      const total = slides.length - 1;
      gsap.set([swiperHomePrevBtn, swiperHomeNextBtn], {autoAlpha: 1})
      
      gsap.fromTo([swiperHomePrevBtnText, swiperHomeNextBtnText, cntSlCounter], 1, {autoAlpha: 1}, {autoAlpha: 0});
      swiperHomePrevBtnText.innerHTML = slidesTitles[prev];
      swiperHomeNextBtnText.innerHTML = slidesTitles[next];
      cntSlCounter.innerHTML = `0${cnt+1}`;
      gsap.fromTo([swiperHomePrevBtnText, swiperHomeNextBtnText, cntSlCounter], 1, {autoAlpha: 0}, {autoAlpha: 1});
      
      if (cnt === 0) gsap.set(swiperHomePrevBtn, {autoAlpha: 0});
      if (cnt === total) gsap.set(swiperHomeNextBtn,  {autoAlpha: 0});
    },
    init(swiper, progress) {
      gsap.fromTo(swiperHomePrevBtn, 1, {autoAlpha: 1}, {autoAlpha: 0});

    },

  }
});













const sliderScaleTransform = () => {
    const obj = { paused: true }
    const tl = gsap.timeline(obj);
    tl.fromTo('.swiper-slide', 0.2, { scale: 1 }, { scale: 0.9})
    tl.fromTo('.swiper-slide', 0.4, { scale: 0.9 }, { scale: 1})
    return tl;
};
const sliderTransitionTransformContentIn = (inx) => {
    const titleCnt = [...$(title)][inx];
    const textCnt = [...$(text)][inx];
    const linkCnt = [...$(link)][inx];
    const awardsCnt = [...$(awards)][inx];

    const obj = { paused: true }
    const tl = gsap.timeline(obj);


    tl.fromTo([titleCnt, textCnt, linkCnt], 1, { autoAlpha: 0, x: -200 }, { autoAlpha: 1, x: 0, stagger: 0.1 })
    tl.fromTo([mainTitle, mainSubtitle], 1, { autoAlpha: 0, y: -100 }, { autoAlpha: 1, y: -50, stagger: 0.1 }, '<')
    tl.fromTo(awardsCnt, 1, { autoAlpha: 0 }, { autoAlpha: 1 }, '<')


    return tl;
};


['click'].forEach(event => {
  swiperHomePrevBtn.addEventListener(event, ()=> {
    sliderScaleTransform().play();
  });
});

['click'].forEach(event => {
  swiperHomeNextBtn.addEventListener(event, ()=> {
    sliderScaleTransform().play();
  });
});