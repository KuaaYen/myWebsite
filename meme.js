import * as common from './common.js';

window.onload = function(){init()};

function init(){
    const slider = document.querySelector('.slider');
    const sliderContainer = document.querySelector('.slider-container');
    const sliderBtnPrev = document.querySelector('.go-to-prev');
    const sliderBtnNext = document.querySelector('.go-to-next');
    var currentImgIndex = 0;

    // simulate fetch img data (I haven't done meme function yet LOL)
    const imgDatas = [{'imgSrc':'../public/images/toothless_dance_big.gif', 'imgAlt': 'toothless_dance', 'imgText':'Friday night!'},
                    {'imgSrc':'../public/images/why_cat.gif', 'imgAlt': 'why_cat', 'imgText': 'New bug WHYYYY !!!'},
                    {'imgSrc':'../public/images/nyan_cat.gif', 'imgAlt': 'nyan_cat', 'imgText':''},
                    {'imgSrc':'../public/images/scream_cat_big.gif', 'imgAlt': 'scream_cat_big', 'imgText':''}];

    createSliderContent();
    createSliderPages();    
    hightlightCurrentPage();

    // create paginationBar and highlight current page button
    common.createPaginationBar(document.querySelector('body'));
    const paginationBar = document.querySelector('.pagination-bar');
    common.highlightPageBtnNow(paginationBar, 'meme');

    sliderBtnPrev.addEventListener('click', function(event){
        currentImgIndex = (currentImgIndex <=1 ? 0 : currentImgIndex-1);
        doSlide();
    })

    
    sliderBtnNext.addEventListener('click', function(event){
        const sliderImgBlock = document.querySelectorAll('.img-block');
        currentImgIndex = (currentImgIndex == sliderImgBlock.length-1 ? currentImgIndex : currentImgIndex+1);
        doSlide();
    })

    
    function createSliderContent(){
        sliderContainer.style.width = `${imgDatas.length*100}%`;
        let htmlArray = [];
        let imgTextHTML = '';

        // append imgs and imgText into slider
        for(let imgData of imgDatas){

            // only create imgText when there is text to show
            if(Boolean(imgData.imgText)){
                imgTextHTML = `<div class="slider-img-text">${imgData.imgText}</div>`;
            } else {
                imgTextHTML = '';
            }
            htmlArray.push(`
                <div class="img-block">
                    <img src="${imgData.imgSrc}" alt="${imgData.imgAlt}">
                   ${imgTextHTML}
                </div>                
            `)
        }
        const sliderContentHTML = htmlArray.join('');
        sliderContainer.insertAdjacentHTML('beforeend', sliderContentHTML);
    }



    function createSliderPages(){
        const pagesWrapper = document.createElement('div');
        pagesWrapper.classList.add('slider-pages-wrapper');
        slider.append(pagesWrapper);
        // append a dot for every img
        for(let imgData of imgDatas){
            const pageDot = document.createElement('div');
            pageDot.classList.add('slider-pages-dot');
            pagesWrapper.append(pageDot);
        } 
    }

    function hightlightCurrentPage(){      
        let pageDots = slider.querySelectorAll('.slider-pages-dot');
        pageDots.forEach(function(pageDot, index, array){
            if(index === currentImgIndex){
                pageDot.classList.add('slider-pages-dot-highlighted');
            } else {
                pageDot.classList.remove('slider-pages-dot-highlighted');
            }
        })
    }


    function doSlide(){
        const sliderImgBlock = document.querySelectorAll('.img-block');
        const imgBlockWidth = sliderImgBlock[0].offsetWidth;
        sliderContainer.style.transform = `translateX(-${currentImgIndex * imgBlockWidth}px)`;
        hightlightCurrentPage();
    }

}