// starting point
let index = 0;
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

    let carouselWrapper = document.createElement("div");
    let parent = document.getElementById("wrapper");
    parent.appendChild(carouselWrapper);
    carouselWrapper.id = "carousel_wrapper";
    carouselWrapper.innerHTML = `
    <img name="slide" class="carousel_img">
    `;
    carouselWrapper.id = "carousel_wrapper";

function carousel() {

    document.slide.src = images[index];

    if (index < images.length - 1) {
        index++;
        
    } else {
        index = 0;
    }

    setTimeout("carousel()", time);
}
