const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];

// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

// show images 
const showImages = (images) => {
  // console.log(images.length);
  if(images.length > 0){
    imagesArea.style.display = "block";
    gallery.innerHTML = "";
    // show gallery title
    galleryHeader.style.display = "flex";
    images.forEach((image) => {
         let div = document.createElement("div");
         div.className = "col-lg-2 col-md-2 col-xs-2 img-item mb-2";
         div.innerHTML = ` <img class="img-fluid img-thumbnail" onmouseout = stopPreview() onmouseover=ShowPreviewImage("${image.webformatURL}") onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
         gallery.appendChild(div);
    });
  }
  else{
    document.querySelector("#images-card-container").innerHTML = `
    <h1 class="text-center">Sorry we didn't find any item</h1>
    `
  }
  

}












const getImages = (query) => {
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => {
      showImages(data.hits);
      console.log(data);
    })
    .catch(err => console.log(err))
}


// live oreview  funtion 











let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.toggle('added');
 
  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
    selectedImagePreview();
  } else {
    let newSlider = sliders.filter( image => image !== img)
    sliders = newSlider;
    selectedImagePreview ();
  }
  console.log(sliders);
}

/* image showing on the preview */
const selectedImagePreview = () => {
  const selectedImageContainer = document.getElementById("selected-image-preview");
  selectedImageContainer.innerHTML = ""
  if(sliders.length < 1){
    selectedImageContainer.style.display = "none"
  }
  else{
    selectedImageContainer.style.display = "flex"
    sliders.forEach((image) => {
         const div = document.createElement("div");
         div.className = "selected-image-box";
         div.innerHTML = `
    <img style="width:100%" src="${image}"/>
    `;
         selectedImageContainer.appendChild(div);
    });
  }
}







var timer
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }
  // crate slider previous & next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;
  const duration = parseInt(document.getElementById("duration").value)*1000 || 1000;

 if(duration<1000){
  alert("please input ")
 }else{
    sliderContainer.appendChild(prevNext);
    document.querySelector(".main").style.display = "block";
    // hide image aria
    imagesArea.style.display = "none";
    sliders.forEach((slide) => {
         let item = document.createElement("div");
         item.className = "slider-item";
         item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
         sliderContainer.appendChild(item);
    });
    changeSlide(0);
    timer = setInterval(function () {
         slideIndex++;
         changeSlide(slideIndex);
    }, duration || 1000);
 }
}







// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;
})

document.querySelector('#search').addEventListener("keydown", (e) => {
  console.log(e.key);
  if(e.key === "Enter"){
    searchBtn.click()
  }
})

sliderBtn.addEventListener('click', function () {
  createSlider()
})



// image preview funtion
document.querySelector("#learge-preview").style.display = "none"
const  ShowPreviewImage = (image)=>{
  document.querySelector("#learge-preview-img").src = image
  document.querySelector("#learge-preview").style.display = "block"
}
const stopPreview = () => {
  document.querySelector("#learge-preview").style.display = "none"
}