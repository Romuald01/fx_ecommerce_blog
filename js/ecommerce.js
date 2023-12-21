// open and close hamburger function
function openNav() {
  document.getElementById("myNav").style.width = "100%";
  // code that stop the overflow in y-axis when it is scrolled.
  document.body.classList.add("no-scroll");
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

let slider = document.querySelector("#slider");
let slides = document.querySelectorAll("#slider img");
let currentSlide = 0;
let dots;
let autoSlide;
let autoSlidePlay = true;

addControls();
addCaptionArea();
slideTo(currentSlide);
resetAutoSlide();

function resetAutoSlide() {
  if (autoSlidePlay) {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
      slideTo(increaseSlide(1));
    }, 5000);
  }
}

function startPause() {
  let btn = document.getElementById("slider_startPause");
  if (autoSlidePlay) {
    autoSlidePlay = false;
    btn.className = "far fa-play-circle";
    clearInterval(autoSlide);
  } else {
    autoSlidePlay = true;
    btn.className = "far fa-pause-circle";
    resetAutoSlide();
  }
}

function addControls() {
  //arrow Left
  let arrowLeft = document.createElement("div");
  arrowLeft.id = "slider_arrow_left";
  arrowLeft.innerHTML = "<img src='images/slider_arrow.svg''>";
  arrowLeft.title = "slide " + (increaseSlide(-1) + 1);
  arrowLeft.addEventListener("click", () => {
    slideTo(increaseSlide(-1));
    resetAutoSlide();
  });
  slider.append(arrowLeft);
  //arrow Right
  let arrowRight = document.createElement("div");
  arrowRight.id = "slider_arrow_right";
  arrowRight.innerHTML = '<i class="fas fa-angle-right"></i>';
  arrowRight.title = "slide " + (increaseSlide(1) + 1);
  arrowRight.addEventListener("click", () => {
    slideTo(increaseSlide(1));
    resetAutoSlide();
  });
  slider.append(arrowRight);
  //pause Button
  let startPauseBtn = document.createElement("i");
  startPauseBtn.id = "slider_startPause";
  startPauseBtn.className = "far fa-pause-circle";
  startPauseBtn.addEventListener("click", () => {
    startPause();
  });
  slider.append(startPauseBtn);
  //indicator dots
  let indicators = document.createElement("div");
  indicators.id = "slider_indicators";
  for (i = 0; i < slides.length; i++) {
    let nr = i;
    let dot = document.createElement("i");
    dot.className = "far fa-circle";
    dot.addEventListener("click", () => {
      slideTo(nr);
      resetAutoSlide();
    });
    indicators.append(dot);
  }
  slider.append(indicators);
  dots = indicators.children;
}

function increaseSlide(nr) {
  if (nr > 0 && currentSlide + nr >= slides.length) return 0;
  else if (nr < 0 && currentSlide + nr < 0) return slides.length - 1;
  else return currentSlide + nr;
}

function slideTo(nr) {
  let from = currentSlide * -100 + "%";
  let to = nr * -100 + "%";
  slides[0].animate(
    { marginLeft: [from, to] },
    { duration: 500, easing: "ease-in-out", iterations: 1, fill: "both" }
  );
  highlightIndicator(nr);
  currentSlide = nr;
  addCaptions();
}

function highlightIndicator(nr) {
  dots[currentSlide].className = "far fa-circle";
  dots[nr].className = "far fa-dot-circle";
}

function addCaptionArea() {
  let caption = document.createElement("a");
  caption.id = "slider_caption";
  let captionTitle = document.createElement("h1");
  let captionDesc = document.createElement("p");
  caption.append(captionTitle);
  caption.append(captionDesc);
  slider.append(caption);
}

function addCaptions() {
  let link = document.getElementById("slider_caption");
  link.href = slides[currentSlide].dataset.url;
  link.title = slides[currentSlide].dataset.title + ": read more";
  let title = document.querySelector("#slider_caption h1");
  title.innerHTML = slides[currentSlide].dataset.title;
  let descr = document.querySelector("#slider_caption p");
  descr.innerHTML = slides[currentSlide].alt;
}
