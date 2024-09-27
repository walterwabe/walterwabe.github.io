function previousPage(position) {
  const width = window.innerWidth;
  const singlePage = width < 450;
  var actualPage = document.getElementById(`page-${position}`);
  var prevPage = document.getElementById(`page-${position - 1}`);
  if (prevPage) {
    var zActual = getComputedStyle(actualPage).zIndex;
    var zPrev = getComputedStyle(prevPage).zIndex;
    let leftElement = actualPage.querySelector(".left-img");
    let rightElement = prevPage.querySelector(".right-img");
    if (!singlePage) {
      leftElement.classList.toggle("rotate-prev");
    }
    rightElement.classList.toggle("rotate-next");
    setTimeout(function () {
      actualPage.style.zIndex = zPrev;
      prevPage.style.zIndex = zActual;
    }, 50);
  }
}

function nextPage(position) {
  const width = window.innerWidth;
  const singlePage = width < 450;
  var actualPage = document.getElementById(`page-${position}`);
  var nextPage = document.getElementById(`page-${position + 1}`);
  if (nextPage) {
    var zActual = getComputedStyle(actualPage).zIndex;
    var zNext = getComputedStyle(nextPage).zIndex;
    let rightElement = actualPage.querySelector(".right-img");
    let leftElement = nextPage.querySelector(".left-img");
    rightElement.classList.toggle("rotate-next");
    if (!singlePage) {
      leftElement.classList.toggle("rotate-prev");
    }
    setTimeout(function () {
      nextPage.style.zIndex = zActual;
    }, 150);
    setTimeout(function () {
      actualPage.style.zIndex = zNext;
    }, 400);
  }
}

function generatePages() {
  const width = window.innerWidth;
  const singlePage = width < 450;

  const totalSheets = singlePage ? 28 : 14;
  const totalImages = 28;
  var loadedImages = 0;
  const imageBasePath = "images/"; // Base path for your images
  const container = document.getElementById("book");
  container.style.opacity = 0;
  container.innerHTML = "";

  for (let i = singlePage ? 1 : 0; i <= totalSheets; i++) {
    const zIndex = totalSheets - i + 1;

    // Create the page container div
    const pageDiv = document.createElement("div");
    pageDiv.id = `page-${i}`;
    pageDiv.className = "page";
    pageDiv.style.zIndex = zIndex;

    if (!singlePage) {
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
        leftImg.addEventListener("load", function () {
          loadedImages++;
          if (loadedImages === totalImages) {
            container.style.opacity = 0.9;
          }
        });
      }

      // Right image
      const rightImg = document.createElement("img");
      rightImg.className = "default-position right-img page-img";
      rightImg.src = `${imageBasePath}${2 * i + 1}.jpg`;
      rightImg.addEventListener("load", function () {
        loadedImages++;
        if (loadedImages === totalImages) {
          container.style.opacity = 0.9;
        }
      });

      pageDiv.appendChild(leftImg);
      if (i != totalSheets) {
        pageDiv.appendChild(rightImg);
      }
    } else {
      // Single page
      const img = document.createElement("img");
      img.className = "default-position right-img page-img";
      img.style.width = "100%";
      img.src = `${imageBasePath}${i}.jpg`;
      pageDiv.appendChild(img);
    }

    if (!singlePage) {
      // Left and right image layers
      const imgLayerLeft = document.createElement("div");
      imgLayerLeft.className = "img-layer-left page-layer";

      const imgLayerRight = document.createElement("div");
      imgLayerRight.className = "img-layer-right page-layer";

      if (i != 0) {
        pageDiv.appendChild(imgLayerLeft);
      }
      if (i != totalSheets) {
        pageDiv.appendChild(imgLayerRight);
      }
    }

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

    if (i != 0) {
      pageDiv.appendChild(prevBtn);
    }
    pageDiv.appendChild(nextBtn);

    // Append page div to the container
    container.appendChild(pageDiv);
  }
}

generatePages();

window.addEventListener("resize", function () {
  generatePages();
});
