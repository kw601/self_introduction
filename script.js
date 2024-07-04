const profilePhoto = document.querySelector(".profile-photo")

profilePhoto.addEventListener("click", () => {
    // if(document.body.className == 'dark-mode'){
    //     document.body.className = ''
    // }else{
    //     document.body.className = 'dark-mode'
    // }
    document.body.classList.toggle("dark-mode");
});


fetch("https://m.search.naver.com/p/csearch/content/apirender.nhn?where=nexearch&pkid=387&u2=20010601&q=%EC%83%9D%EB%85%84%EC%9B%94%EC%9D%BC+%EC%9A%B4%EC%84%B8&u1=f&u3=solar&u4=5&_=1720073662874")
    .then(response => response.json()) // 응답을 JSON으로 파싱
    .then(data => {
        const htmlString = data.flick[0]; // 첫 번째 항목 선택
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const fortune = doc.querySelector('dd b').textContent;
        const fortuneText = doc.querySelector('dd p').textContent;
        console.log(fortune); // 추출한 텍스트 출력
        console.log(fortuneText); // 추출한 텍스트 출력

        const fortuneE = document.createElement("h3");
        fortuneE.style.margin = 0;
        fortuneE.textContent = fortune;

        const fortuneTextE = document.createElement("p");
        fortuneTextE.textContent = fortuneText;

        const fortuneSectionTitle = document.createElement('h2');
        fortuneSectionTitle.textContent = "오늘의 운세"

        const fortuneSection = document.createElement("section")
        
        fortuneSection.append(fortuneSectionTitle);
        fortuneSection.append(fortuneE);
        fortuneSection.append(fortuneTextE);

        const contactS = document.querySelector(".contact");
        contactS.before(fortuneSection)
    })
    .finally(() => {
        
        const sections = document.querySelectorAll(".right section");

        let currentIndex = 0;

        const showAfterSection = ()=>{
            sections.forEach((section)=>{section.style.display = 'none'})
            if(currentIndex == sections.length - 1){
                currentIndex = 0;
            }else{
                currentIndex++;
            }
            sections[currentIndex].style.display = 'flex'
        }

        const showBeforeSection = ()=>{
            sections.forEach((section)=>{section.style.display = 'none'})
            if(currentIndex == 0){
                currentIndex = sections.length - 1;
            }else{
                currentIndex-- ;
            }
            sections[currentIndex].style.display = 'flex'
        }

        let intervalId = setInterval(showAfterSection, 3000);

        const resetInterval = () => {
            clearInterval(intervalId)
            intervalId = setInterval( showAfterSection, 3000);
        }

        sections.forEach((section,index)=>{
            const iconContainer = document.querySelector(".icon-container");

            section.addEventListener("click", (event) =>{
                const sectionWidth = section.offsetWidth;

                const clickX = event.clientX - section.getBoundingClientRect().left;

                if( clickX < sectionWidth / 3 ){
                    showBeforeSection();
                    resetInterval();
                    iconContainer.innerHTML = '<i class="fa-solid fa-backward-fast"></i>';
                } else if (clickX > sectionWidth * 2 / 3) {
                    showAfterSection();
                    resetInterval();
                    iconContainer.innerHTML = '<i class="fa-solid fa-forward-fast"></i>';
                } else{
                    if(intervalId){
                        clearInterval(intervalId)
                        intervalId = null
                        iconContainer.innerHTML = '<i class="fa-solid fa-pause"></i>';
                    }else{
                        intervalId = setInterval(showAfterSection, 3000)
                        iconContainer.innerHTML = '<i class="fa-solid fa-play"></i>';
                    } 
                }
            })
            section.addEventListener('mousemove',(event)=>{
                const sectionWidth = section.offsetWidth;

                const clickX = event.clientX - section.getBoundingClientRect().left;
                
                iconContainer.style.top = `${event.clientY - 20}px`;
                iconContainer.style.left = `${event.clientX - 20}px`;
                // 마우스 위치에 따라 클래스명 변경
            if (clickX < sectionWidth / 3) {
                iconContainer.innerHTML = '<i class="fa-solid fa-backward-fast"></i>';
            } else if (clickX > sectionWidth * 2 / 3) {
                iconContainer.innerHTML = '<i class="fa-solid fa-forward-fast"></i>';
            } else {
                if (intervalId) {
                    iconContainer.innerHTML = '<i class="fa-solid fa-pause"></i>';
                }else{
                    iconContainer.innerHTML = '<i class="fa-solid fa-play"></i>';
                }
            // 삼항연산자
            //iconContainer.innerHTML = intervalId ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
            }
            })
            section.addEventListener('mouseleave', ()=>{
                iconContainer.innerHTML = ''
            })
    });
})

