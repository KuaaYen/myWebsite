
import * as common from './common.js';

window.onload = function(){init()};

async function init(){
    const titleBackground = document.querySelector('.title-background');
    const titleTopBlock = document.querySelector('.title');
    const hintText = document.querySelector('.cool-stuf-hint');
    const navigator = document.querySelector('.navigator');
    const navigateBtnContainer = document.querySelector('.navigate-btn-container');
    const allSections = document.querySelectorAll('.section-block-light');
    const btnPrevSection = document.querySelector('.navigator-prev-section');
    const btnNextSection = document.querySelector('.navigator-next-section');
    const hideBtn = document.querySelector('.navigator-hide-btn');
    const hideArrow = document.getElementById('navigator-hide-arrow');

    // create paginationBar and highlight current page button
    common.createPaginationBar(document.querySelector('body'));
    const paginationBar = document.querySelector('.pagination-bar');
    common.highlightPageBtnNow(paginationBar, 'about me');

    // get skill data from back-end and create blocks
    const skillData = await common.getData('/YCDev/about_me/getInfo');
    createSkillBlock(skillData);
    
    function createSkillBlock(importData){       
        const categories = Object.keys(importData);

        for(let skillCategory of categories){
            createBlockByCategory(skillCategory, importData);
        }

        function createBlockByCategory(category, importData){           
            const sectionBlock = document.querySelector(`[name=${category}]`);
            const descSection = sectionBlock.querySelector('.skill-desc-section');
            const skillInfos = Object.values(importData[`${category}`]);


            skillInfos.forEach((skillInfo, index, array)=>{
                const skillname = Object.keys(skillInfo)[0];
                const skillDesc = Object.values(skillInfo)[0];
                const nameBlock = document.createElement('div');
                const descBlock = document.createElement('div');
                nameBlock.classList.add('skill-name');
                nameBlock.textContent = skillname;
                descBlock.classList.add('skill-desc');
                descBlock.classList.add('desc-scrollbar');
                descBlock.innerHTML = skillDesc;
                // descBlock.textContent = skillDesc;

                // start transition one by one after wrapper's transition-delay
                nameBlock.style['transition-delay'] = `${index*0.1+0.7}s`;
                descBlock.style['transition-delay'] = `${index*0.1+1}s`;
                descSection.append(nameBlock);
                descSection.append(descBlock);
            })
        }
    }

    // set options for observer
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // when observed item's visable percentage is over 50% trigger event
    };

    var currentSection = allSections[0];

    createNavigateBtn();

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const navBtn = document.querySelector(`[destination="${entry.target.id}"]`);
            currentSection = entry.target;
            const skillWrapper = currentSection.querySelector('.skill-wrapper');
            if (entry.isIntersecting) {
                navBtn.classList.add('active-btn');
                if(skillWrapper){
                    skillWrapper.classList.add('skill-active');
                }
            } else {
                navBtn.classList.remove('active-btn');
                if(skillWrapper){
                    skillWrapper.classList.remove('skill-active');
                }
            }
        });
    }, options);

    allSections.forEach(section => {
        observer.observe(section);
    });


    hideBtn.addEventListener('click', function(evnet){
        navigator.classList.toggle('nav-hide');
        hideBtn.classList.toggle('nav-hide');    
        hideArrow.classList.toggle('nav-hide');
    })


    titleTopBlock.addEventListener('click', function(event){
        this.classList.toggle('shrink');
        hintText.style.display = (hintText.style.display == 'none' ? 'block' : 'none');
    });

    btnPrevSection.addEventListener('click', function(event){
        allSections.forEach(function(section, index, array){
            if(currentSection == section){
                const gotoIndex = (index<1 ? 0: index-1);
                const destination = array[gotoIndex];
                scrollToSection(destination);
            }
        })
    });

    

    
    btnNextSection.addEventListener('click', function(event){
        allSections.forEach(function(section, index, array){
            if(currentSection == section){
                const gotoIndex = (index>=array.length ? array.length: index+1);
                const destination = array[gotoIndex];
                scrollToSection(destination);
            }
        })      
    });


    function createNavigateBtn(){
        for(let section of allSections){
            const navigateBtn = document.createElement('div');
            navigateBtn.setAttribute('destination', section.getAttribute('id'));
            navigateBtn.setAttribute('name', section.getAttribute('name'));
            navigateBtn.classList.add('navigate-btn');
            navigateBtn.textContent = navigateBtn.getAttribute('name');
            navigateBtn.addEventListener('click', function(event){
                const destination = document.getElementById(`${event.target.getAttribute('destination')}`) ;
                scrollToSection(destination);
            })

            navigateBtnContainer.append(navigateBtn);
        }
    }

    function scrollToSection(destination){
        const offsetTop = destination.offsetTop;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
        });
        
    }


    class dynamicCircle {
        constructor(container, circleNumber, delay){
            this.container = container;
            this.circleNumber = circleNumber;
            this.delay = delay;
        }

        createCircle(){
            for(let i=1; i<=this.circleNumber; i++){
                let circle = document.createElement('div');
                circle.classList.add('circle');
                this.container.append(circle);
            }
            this.circles = this.container.querySelectorAll('.circle');
        }

        // make circle in background change their css style
        // caution: must use arrow function to get the correct "this", or "this" will be window, because using setInterval will affect function working scope
        changeCircleAppearance = () => {
            this.circles = this.container.querySelectorAll('.circle');
            for(let circle of this.circles){
                let randomWidth = common.getRandom(100);
                let randomHeight = 100-randomWidth;
                circle.style.width = `${randomWidth}%`;
                circle.style.height = `${randomHeight}%`;
                circle.style.top = `${common.getRandom(130)-30}%`;
                circle.style.left = `${common.getRandom(130)-30}%`;
                circle.style.transform = `rotate(${common.getRandom(360)}deg)`;
                circle.style['background-color'] = `rgb(${common.getRandom(105)+150}, ${common.getRandom(105)+150}, ${common.getRandom(105)+150})`;
            }
        }

        startAnimation(){
            this.createCircle();
            // change style every 2.5 second
            this.change = setInterval(this.changeCircleAppearance, this.delay);
        }
    }

    const dCircleBatch1 = new dynamicCircle(titleBackground, 5, 2500);
    const dCircleBatch2= new dynamicCircle(titleBackground, 15, 1800);
    // const dCircleBatch3= new dynamicCircle(titleBackground, 15, 1000);
    dCircleBatch1.startAnimation();
    dCircleBatch2.startAnimation();
    // dCircleBatch3.startAnimation();
}