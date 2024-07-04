const profilePhoto = document.querySelector('.profile-photo');
    // const profilePhoto = document.getElementsByClassname('.profile-photo')[0];
    
    
profilePhoto.addEventListener('click', () => {
        //callback 함수에 인자 필요 없어서 (event) X
        // if(document.body.className == 'dark-mode'){
        //     document.body.className = '';
        // } else {
        //     document.body.className = 'dark-mode';
        // }
    
        document.body.classList.toggle('dark-mode');
        //toggle: 있으면 없게, 없으면 있게, 위와 같은 뜻
});

//이렇게 새로운 요소를 넣으면 이벤트리스너를 그 밑으로 옮겨줘야 함
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

        const fortuneSectionTitle = document.createElement('h2');
        fortuneSectionTitle.textContent = "오늘의 운세";

        const fortuneE = document.createElement('h3');
        fortuneE.style.margin = 0;
        fortuneE.textContent = fortune;

        const fortuneTextE = document.createElement('p');
        fortuneTextE.textContent = fortuneText;

        const fortuneSection = document.createElement('section');
        fortuneSection.append(fortuneSectionTitle);
        fortuneSection.append(fortuneE);
        fortuneSection.append(fortuneTextE);

        const contactSection = document.querySelector('.contact');
        contactSection.before(fortuneSection);

        const sections = document.querySelectorAll('.right section');
        let currentIndex = 0;
        
        const showAfterSection = ()=> {
            const iconContainer = document.querySelector(".icon-container");
            sections.forEach((section)=>{section.style.display = 'none';})
            currentIndex = (currentIndex + 1) % (sections.length);
            sections[currentIndex].style.display = 'flex';
        }

        const showBeforeSection = ()=> {
            sections.forEach((section)=>{section.style.display = 'none';})
            currentIndex = (currentIndex - 1 + sections.length) % (sections.length);
            sections[currentIndex].style.display = 'flex';
        }
            
        let intervalID = setInterval(showAfterSection, 3000);
             
        const resetInverval = () => {
            clearInterval(intervalID);
            intervalID = setInterval(showAfterSection, 3000);
        };
            
        sections.forEach((section, index)=>{
            section.addEventListener('click', (event)=>{
                const sectionWidth = section.offsetWidth;    
                const clickx = event.clientX - section.getBoundingClientRect().left;    
                if (clickx < (sectionWidth / 3)){
                    showBeforeSection();
                    resetInverval();
                    iconContainer.innerHTML = '<i class="fa-solid fa-backward-fast"></i>';

                } else if (clickx > (sectionWidth * 2 / 3)) {
                    showAfterSection();
                    resetInverval();
                    iconContainer.innerHTML = '<i class="fa-solid fa-forward-fast"></i>';

                }else {
                    if(intervalID){
                        clearInterval(intervalID);
                        intervalID = null;
                        iconContainer.innerHTML = '<i class="fa-solid fa-pause"></i>';

                    } else {
                        intervalID = setInterval(showAfterSection, 3000);
                        iconContainer.innerHTML = '<i class="fa-solid fa-play"></i>';

                    }
                }
            });
            section.addEventListener('mousemove', function(event) {
                const sectionWidth = section.offsetWidth;
                const clickX = event.clientX - section.getBoundingClientRect().left;
      
                // 아이콘 표시 위치 설정
                iconContainer.style.top = `${event.clientY - 20}px`;
                iconContainer.style.left = `${event.clientX - 20}px`;
      
                // 마우스 위치에 따라 클래스명 변경
                if (clickX < sectionWidth / 3) {
                    iconContainer.innerHTML = '<i class="fa-solid fa-backward-fast"></i>';
                } else if (clickX > sectionWidth * 2 / 3) {
                    iconContainer.innerHTML = '<i class="fa-solid fa-forward-fast"></i>';
                } else {
                    if (intervalID) {
                        iconContainer.innerHTML = '<i class="fa-solid fa-pause"></i>';
                    }else{
                        iconContainer.innerHTML = '<i class="fa-solid fa-play"></i>'
                    }
                    // 삼항연산자
                    //iconContainer.innerHTML = intervalID ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
                    section.addEventListener('mouseleave', function() {
                        // 마우스가 섹션을 떠날 때 아이콘 숨김
                        iconContainer.innerHTML = '';
                    });
                }
            });
        });
})
    

    

    
