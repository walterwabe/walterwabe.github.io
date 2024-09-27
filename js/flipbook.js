function previousPage(position) {
  var actualPage = document.getElementById(`page-${position}`);
  var prevPage = document.getElementById(`page-${position - 1}`);
  if (prevPage) {
    var zActual = getComputedStyle(actualPage).zIndex;
    var zPrev = getComputedStyle(prevPage).zIndex;
    let leftElement = actualPage.querySelector(".left-img");
    let rightElement = prevPage.querySelector(".right-img");
    leftElement.classList.toggle("rotate-prev");
    rightElement.classList.toggle("rotate-next");
    setTimeout(function () {
      actualPage.style.zIndex = zPrev;
      prevPage.style.zIndex = zActual;
    }, 50);
  }
}

function nextPage(position) {
  var actualPage = document.getElementById(`page-${position}`);
  var nextPage = document.getElementById(`page-${position + 1}`);
  if (nextPage) {
    var zActual = getComputedStyle(actualPage).zIndex;
    var zNext = getComputedStyle(nextPage).zIndex;
    let rightElement = actualPage.querySelector(".right-img");
    let leftElement = nextPage.querySelector(".left-img");
    rightElement.classList.toggle("rotate-next");
    leftElement.classList.toggle("rotate-prev");
    setTimeout(function () {
      nextPage.style.zIndex = zActual;
    }, 150);
    setTimeout(function () {
      actualPage.style.zIndex = zNext;
    }, 400);
  }
}

function generatePages() {
  const totalSheets = 14;
  const imageBasePath = "images/"; // Base path for your images
  const container = document.getElementById("book");

  for (let i = 0; i <= totalSheets; i++) {
    const zIndex = totalSheets - i + 1;

    // Create the page container div
    const pageDiv = document.createElement("div");
    pageDiv.id = `page-${i}`;
    pageDiv.className = "page";
    pageDiv.style.zIndex = zIndex;

    // Left image
    var leftImg;
    if (i == 0) {
      leftImg = document.createElement("div");
      leftImg.className = "default-position left-img left-cover";
      leftImg.style.opacity = 0;
    } else {
      leftImg = document.createElement("img");
      leftImg.className = "default-position rotate-prev left-img page-img";
      leftImg.src = `${imageBasePath}${2 * i}.jpg`;
    }

    // Right image
    const rightImg = document.createElement("img");
    rightImg.className = "default-position right-img page-img";
    rightImg.src = `${imageBasePath}${2 * i + 1}.jpg`;

    // Left and right image layers
    const imgLayerLeft = document.createElement("div");
    imgLayerLeft.className = "img-layer-left page-layer";

    const imgLayerRight = document.createElement("div");
    imgLayerRight.className = "img-layer-right page-layer";

    // Previous button
    const prevBtn = document.createElement("div");
    prevBtn.className = "btn btn-prev";
    prevBtn.style.zIndex = zIndex;
    prevBtn.onclick = () => previousPage(i);
    prevBtn.innerHTML = "&larr;";

    // Next button
    const nextBtn = document.createElement("div");
    nextBtn.className = "btn btn-next";
    nextBtn.style.zIndex = zIndex;
    nextBtn.onclick = () => nextPage(i);
    nextBtn.innerHTML = "&rarr;";

    // Append elements to page div
    pageDiv.appendChild(leftImg);
    if (i != totalSheets) {
      pageDiv.appendChild(rightImg);
    }
    if (i != 0) {
      pageDiv.appendChild(imgLayerLeft);
    }
    if (i != totalSheets) {
      pageDiv.appendChild(imgLayerRight);
    }
    if (i != 0) {
      pageDiv.appendChild(prevBtn);
    }
    pageDiv.appendChild(nextBtn);

    // Append page div to the container
    container.appendChild(pageDiv);
  }
}

generatePages();

particlesJS("book", {
  particles: {
    number: { value: 400, density: { enable: true, value_area: 3000 } },
    color: { value: "#fc0000" },
    shape: { type: "circle", stroke: { width: 0, color: "#000000" }, polygon: { nb_sides: 3 }, image: { src: "img/github.svg", width: 100, height: 100 } },
    opacity: { value: 0.5, random: true, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
    size: { value: 2, random: true, anim: { enable: true, speed: 5, size_min: 0, sync: false } },
    line_linked: { enable: false, distance: 500, color: "#ffffff", opacity: 0.4, width: 2 },
    move: { enable: true, speed: 7.8914764163227265, direction: "top", random: true, straight: false, out_mode: "out", bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } },
  },
  interactivity: {
    detect_on: "canvas",
    events: { onhover: { enable: false, mode: "bubble" }, onclick: { enable: false, mode: "repulse" }, resize: true },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 0.5 } },
      bubble: { distance: 400, size: 4, duration: 0.3, opacity: 1, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
});
requestAnimationFrame(update);
