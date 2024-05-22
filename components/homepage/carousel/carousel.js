 function renderCarousel() {
   

    let carouselWrapper = document.createElement("div");
    let parent = document.getElementById("wrapper");
    parent.appendChild(carouselWrapper);
    carouselWrapper.id = "carousel_wrapper";
    carouselWrapper.innerHTML = `
    <img name="slide" class="carousel_img">
    `;
    carouselWrapper.id = "carousel_wrapper";

    let infoTextWrapper = document.createElement("div");
    carouselWrapper.appendChild(infoTextWrapper);
    infoTextWrapper.className = "infoTextBox";
    infoTextWrapper.innerHTML = `
    <p class="infoText"> Luxe Bites is your go-to destination for discovering delicious dishes from across the globe </br> bringing you a diverse range of culinary delights right to your screen </p>
    <div id="line"></div>
    <p class="infoText"> Please select one of the countries to the left to begin your culinary journey</p>
    `
}

let index = 0;

function carousel() {
    // timer
    let time = 4000;
    //image array
    let images = [];
    //image list
    images[0] = `../../../media/country_images/England.jpg`;
    images[1] = `../../../media/country_images/india.jpg`;
    images[2] = `../../../media/country_images/italy.jpg`;
    images[3] = `../../../media/country_images/nigeria.jpg`;
    images[4] = `../../../media/country_images/spain.jpg`;
    
    document.slide.src = images[index];
    
    if (index < images.length - 1) {
        index++;
    } else {
        index = 0;
    }
    let timeout = setTimeout("carousel()", time);
    timeout;
}