export function getData(url){
    return new Promise((resolve, reject)=>{
        fetch(url, {
            method: 'GET',
            credentials: "same-origin",
            headers: {
                "content-type": "application/json"
            },
        })
        .then((response)=>{
           return response.json();
        })
        .then((data)=>{
            resolve(data);
        })
        .catch((err)=>{
            console.log(err);
            reject(err);
        })
    })
}

export function getRandom(maxNum){
    return  Math.floor(Math.random()*maxNum)+1;
}

export function createPaginationBar(container){
    const htmlContent = `    
    <div class="pagination-bar">
        <div class="pagination-btn-wrapper">
            
            <a href="/YCDev" title="home page">
                <div class="pagination-btn" id="homeBtn" page="home page">Home</div>
            </a>
            <a href="/YCDev/about_me" title="about me">
                <div class="pagination-btn" id="aboutMeBtn" page="about me">About me</div>
            </a>
            <a href="/YCDev/meme" title="meme">
                <div class="pagination-btn" id="memeBtn" page="meme">Meme</div>
            </a>
            <a href="/YCDev/meme" title="linkdin">
                <div class="pagination-btn" id="linkdinBtn" page="linkdin">Linkdin</div>
            </a>
            <a href="/YCDev/meme" title="github">
                <div class="pagination-btn" id="githubBtn" page="github">Github</div>
            </a>
        </div>
    </div>`;
    container.insertAdjacentHTML('afterbegin', htmlContent);
}

export function highlightPageBtnNow(container, pageName){
    const pageBtns = container.querySelectorAll('.pagination-btn');
    for(let pageBtn of pageBtns){
        if(pageBtn.getAttribute('page') == pageName){
            pageBtn.classList.add('page-active');
        }
    }
}