import * as common from './common.js';

window.onload = function(){init()};

function init(){

    class matrixWaterfall{
        constructor(container, amount, scale, position, maxDelay){
            this.container = container;
            this.amount = amount;
            this.scale = scale;
            this.left = position.left;
            this.right = position.right;
            this.horizenalBaseIine = (position.left? 'left':'right');
            this.top = position.top;
            this.maxDelay  = Boolean(maxDelay) ? maxDelay : 8;
        }

        createWaterfall(){
            const waterfall = document.createElement('div');
            waterfall.classList.add('matrix-waterfall');
            waterfall.style[`${this.horizenalBaseIine}`] = (this.horizenalBaseIine === 'left' ? this.left : this.right);
            waterfall.style.top = this.top;
            waterfall.style.scale = this.scale;
            this.container.append(waterfall);

            for(let i=1; i<=this.amount; i++){
                const waterfallContent = this.createTextContent();
                const waterfallText = document.createElement('span');
                waterfallText.classList.add('matrix-text');
                waterfallText.textContent = waterfallContent;
                waterfall.append(waterfallText);
                createTextMask(waterfallText, this.maxDelay);
            }


            function createTextMask(maskContainer, maxDelay){
                // make animation start more seperately
                const animationDelay =  common.getRandom(maxDelay*100)/100;
                const textMask = document.createElement('div');
                textMask.classList.add('matrix-text-mask');
                textMask.style['animation-delay'] = `${animationDelay}s`;
                maskContainer.append(textMask);
            }

        }


        createWaterfallBackground(){
            const waterfall = document.createElement('div');
            waterfall.classList.add('matrix-waterfall-background');
            waterfall.style[`${this.horizenalBaseIine}`] = (this.horizenalBaseIine === 'left' ? this.left : this.right);
            waterfall.style.top = this.top;
            this.container.append(waterfall);

            for(let i=1; i<=this.amount; i++){
                const waterfallContent = this.createTextContent();
                const waterfallText = document.createElement('span');
                waterfallText.classList.add('matrix-text');
                waterfallText.style['fontSize'] = '0.5em';
                waterfallText.textContent = waterfallContent;
                waterfall.append(waterfallText);
                createTextMask(waterfallText, this.maxDelay);
            }


            function createTextMask(maskContainer, maxDelay){
                // make animation start more seperately
                const animationDelay =  common.getRandom(maxDelay*100)/100;
                const textMask = document.createElement('div');
                textMask.classList.add('matrix-text-mask');
                textMask.style['animation-delay'] = `${animationDelay}s`;
                textMask.style['animation-duration'] = '8s';
                maskContainer.append(textMask);
            }

        }


        createTextContent(){
            // total amount of text in one waterfall component
            const textAmount = 76;
            let textArray = [];
            for(let i = 1; i<=textAmount; i++){
                const randomNumber = common.getRandom(10)-1;
                textArray.push(randomNumber.toString());
            }
            let waterfallContent = textArray.join('');
            return waterfallContent;
        }
    }

    const matrix = document.querySelector('.matrix');
    const waterfallLeftFront = new matrixWaterfall(matrix, 50, 1, {left:0, top:0}, 30);
    // const waterfallRightFront = new matrixWaterfall(matrix, 20, 1, {right:0, top:0}, 20);
    const waterfallBack = new matrixWaterfall(matrix, 50, 0.2, {left:0, top:'-10%'}, 10);
    // const waterfallBackLayer2 = new matrixWaterfall(matrix, 100, 0.1, {left:0, top:'-30%'}, 50);
    waterfallLeftFront.createWaterfall();
    // waterfallRightFront.createWaterfall();
    waterfallBack.createWaterfallBackground();
    // waterfallBackLayer2.createWaterfallBackground();

}