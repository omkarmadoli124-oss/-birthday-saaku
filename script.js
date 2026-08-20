const CONFIG = {
  herName: 'Saaku',
  fromName: 'Omkar',
  personalMessage: '[ADD PERSONAL MESSAGE HERE]',
  images: [
    'WhatsApp Image 2026-08-20 at 11.57.46 AM (5).jpg',
    'WhatsApp Image 2026-08-20 at 11.57.46 AM (1).jpeg',
    'WhatsApp Image 2026-08-20 at 11.57.47 AM.jpeg'
  ],
  memories: [
    { image: 'WhatsApp Image 2026-08-20 at 11.57.46 AM (5).jpg', text: '[ADD YOUR MEMORY HERE]' },
    { image: 'WhatsApp Image 2026-08-20 at 11.57.46 AM (1).jpeg', text: '[ADD YOUR MEMORY HERE]' },
    { image: 'WhatsApp Image 2026-08-20 at 11.57.47 AM.jpeg', text: '[ADD YOUR MEMORY HERE]' }
  ]
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const imagePath = (filename) => `assets/images/${filename}`;

function applyContent() {
  document.querySelectorAll('[data-her-name]').forEach((element) => { element.textContent = CONFIG.herName; });
  document.querySelectorAll('[data-from-name]').forEach((element) => { element.textContent = CONFIG.fromName; });
  document.querySelectorAll('[data-personal-message]').forEach((element) => { element.textContent = CONFIG.personalMessage; });

  document.querySelectorAll('[data-image]').forEach((element) => {
    const filename = CONFIG.images[Number(element.dataset.image) % CONFIG.images.length];
    element.dataset.filename = filename;
    setImageOrFallback(element, filename);
  });

  const memoryList = document.querySelector('#memoryList');
  CONFIG.memories.forEach((memory, index) => {
    const item = document.createElement('figure');
    item.className = 'memory-item';
    item.innerHTML = `<div class="image-frame" data-memory-image="${index}"></div><figcaption><span>0${index + 1}</span><b>${memory.text}</b></figcaption>`;
    memoryList.appendChild(item);
    setImageOrFallback(item.querySelector('[data-memory-image]'), memory.image);
  });
}

function setImageOrFallback(element, filename) {
  const image = new Image();
  image.onload = () => {
    element.style.backgroundImage = `url("${imagePath(filename)}")`;
    element.classList.remove('fallback-image');
  };
  image.onerror = () => element.classList.add('fallback-image');
  image.src = imagePath(filename);
}

function revealIntro() {
  const intro = document.querySelector('.intro');
  const story = document.querySelector('.story');
  const enterButton = document.querySelector('#enterButton');
  const audio = document.querySelector('#birthdayAudio');
  const musicPlayer = document.querySelector('#musicPlayer');

  const enterTimeline = gsap.timeline({ paused: true, onComplete: () => {
    story.setAttribute('aria-hidden', 'false');
    document.body.classList.add('story-started');
    ScrollTrigger.refresh();
  }});
  enterTimeline.to(intro, { duration: 1.2, opacity: 0, scale: 1.06, ease: 'power3.inOut' }).set(intro, { display: 'none' }).set(story, { visibility: 'visible' }, '<').fromTo(story, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' }, '<');

  enterButton.addEventListener('click', () => {
    enterButton.disabled = true;
    audio.play().then(() => {
      musicPlayer.hidden = false;
      musicPlayer.classList.remove('is-paused');
    }).catch(() => { musicPlayer.hidden = false; musicPlayer.classList.add('is-paused'); });
    enterTimeline.play();
  });
}

function setupMusic() {
  const audio = document.querySelector('#birthdayAudio');
  const player = document.querySelector('#musicPlayer');
  const toggle = document.querySelector('#musicToggle');
  const progress = document.querySelector('#musicProgress');
  toggle.addEventListener('click', () => {
    if (audio.paused) { audio.play(); player.classList.remove('is-paused'); toggle.setAttribute('aria-label', 'Pause music'); }
    else { audio.pause(); player.classList.add('is-paused'); toggle.setAttribute('aria-label', 'Play music'); }
  });
  audio.addEventListener('timeupdate', () => { if (audio.duration) progress.style.width = `${(audio.currentTime / audio.duration) * 100}%`; });
  audio.addEventListener('error', () => { document.querySelector('.music-label').textContent = 'Add your song'; player.classList.add('is-paused'); });
}

function setupAnimations() {
  gsap.registerPlugin(ScrollTrigger);
  if (prefersReducedMotion) return;

  gsap.from('.intro-kicker, .intro-prelude, .intro-title span, .intro-title em, .intro-name, .intro-subtitle, .enter-button, .intro-footnote', { opacity: 0, y: 20, duration: 1, stagger: .12, ease: 'power3.out', delay: .3 });
  gsap.to('.intro-orbit', { rotation: 12, duration: 18, ease: 'none', repeat: -1, yoyo: true });

  gsap.to('.hero-image', { yPercent: 14, scale: 1, rotation: -1, ease: 'none', scrollTrigger: { trigger: '.hero-photo', start: 'top top', end: 'bottom top', scrub: 1 } });
  gsap.to('.hero-image .image-wash', { scaleY: 0, ease: 'power2.out', scrollTrigger: { trigger: '.hero-photo', start: 'top 30%', end: 'center center', scrub: 1 } });
  gsap.from('.hero-copy h2, .hero-follow', { opacity: 0, y: 60, stagger: .15, ease: 'power3.out', scrollTrigger: { trigger: '.hero-copy', start: 'top 70%', end: 'top 35%', scrub: 1 } });

  gsap.from('.reel-intro', { opacity: 0, y: 70, scrollTrigger: { trigger: '.photo-reel', start: 'top 65%', end: 'top 30%', scrub: 1 } });
  gsap.to('.reel-card-a', { y: -100, rotation: 3, scrollTrigger: { trigger: '.reel-track', start: 'top bottom', end: 'bottom top', scrub: 1 } });
  gsap.to('.reel-card-b', { y: 120, rotation: -4, scrollTrigger: { trigger: '.reel-track', start: 'top bottom', end: 'bottom top', scrub: 1 } });
  gsap.to('.reel-card-c', { y: -190, rotation: 5, scrollTrigger: { trigger: '.reel-track', start: 'top bottom', end: 'bottom top', scrub: 1 } });

  gsap.from('.things-title', { opacity: 0, x: -100, scrollTrigger: { trigger: '.little-things', start: 'top 65%', end: 'top 22%', scrub: 1 } });
  gsap.from('.things-list p', { opacity: 0, x: 50, stagger: .18, scrollTrigger: { trigger: '.things-list', start: 'top 80%', end: 'top 35%', scrub: 1 } });
  gsap.from('.collage-heading', { opacity: 0, y: 70, scrollTrigger: { trigger: '.collage', start: 'top 65%', end: 'top 30%', scrub: 1 } });
  gsap.to('.stack-back', { y: -50, rotation: 18, scrollTrigger: { trigger: '.photo-stack', start: 'top bottom', end: 'bottom top', scrub: 1 } });
  gsap.to('.stack-mid', { y: 45, rotation: -12, scrollTrigger: { trigger: '.photo-stack', start: 'top bottom', end: 'bottom top', scrub: 1 } });
  gsap.to('.stack-front', { y: -25, rotation: 0, scale: 1.04, scrollTrigger: { trigger: '.photo-stack', start: 'top bottom', end: 'bottom top', scrub: 1 } });

  gsap.from('.memories-head', { opacity: 0, y: 70, scrollTrigger: { trigger: '.memories', start: 'top 65%', end: 'top 30%', scrub: 1 } });
  document.querySelectorAll('.memory-item').forEach((item, index) => gsap.from(item, { opacity: 0, y: 80 + index * 15, scrollTrigger: { trigger: item, start: 'top 90%', end: 'top 60%', scrub: 1 } }));
  document.querySelectorAll('.message-line').forEach((line, index) => gsap.from(line, { opacity: 0, y: 55, scrollTrigger: { trigger: line, start: 'top 85%', end: 'top 52%', scrub: 1 } }));
  gsap.from('.surprise-content', { opacity: 0, y: 50, scrollTrigger: { trigger: '.surprise', start: 'top 70%', end: 'top 35%', scrub: 1 } });
  gsap.to('.finale-image', { scale: 1, ease: 'none', scrollTrigger: { trigger: '.finale', start: 'top bottom', end: 'center center', scrub: 1 } });
  gsap.from('.finale-content > *', { opacity: 0, y: 45, stagger: .18, scrollTrigger: { trigger: '.finale', start: 'top 60%', end: 'top 22%', scrub: 1 } });
}

function setupSurprise() {
  const surprise = document.querySelector('.surprise');
  document.querySelector('#openButton').addEventListener('click', () => {
    surprise.classList.toggle('is-open');
    document.querySelector('#openButton span').textContent = surprise.classList.contains('is-open') ? 'Close it' : 'Open it';
  });
}

function setupPointer() {
  const glow = document.querySelector('.cursor-glow');
  window.addEventListener('pointermove', (event) => { glow.style.left = `${event.clientX}px`; glow.style.top = `${event.clientY}px`; }, { passive: true });
}

applyContent();
revealIntro();
setupMusic();
setupSurprise();
setupPointer();
setupAnimations();
