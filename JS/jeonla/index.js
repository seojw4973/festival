document.addEventListener("DOMContentLoaded", function(){
    const slides = document.querySelectorAll('.jeonla-festival-slide');
    const pager = document.querySelector('.jeonla-pager')
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    let=currentSlide = 0;

    //페이지 인디케이터 추가
    slides.forEach((slide,index) =>{
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if(index === 0){
            dot.classList.add('active');
        }

        dot.addEventListener('click',()=>{
            showSlide(index);
        });
        pager.appendChild(dot);
    });

    

    

    //초기 슬라이드 표시

    showSlide(currentSlide);

    //슬라이드 넘기기 함수

    function showSlide(slideIndex){

        //모든 슬라이드 숨기기
        slides.forEach(slide=>{
            slide.classList.remove('active');
            
        });

        //현재 슬라이드 표시
        slides[slideIndex].classList.add('active');


        //페이지 인디케이터 갱신
        const dots = document.querySelectorAll('.jeonla-pager span');
        dots.forEach((dot, index) =>{
            if(index === slideIndex) {
                dot.classList.add('active');
            }else{
                dot.classList.remove('active');
            }
        });

        currentSlide = slideIndex;
    }

    //이전버튼 클릭시 
    prevButton.addEventListener('click',()=>{
        currentSlide = (currentSlide -1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });

    //다음 버튼 클릭시
    nextButton.addEventListener('click',()=>{
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });

    //자동 슬라이드 설정
    setInterval(() =>{
        currentSlide = (currentSlide +1)% slides.length;
        showSlide(currentSlide);
    }, 3000); //3초마다 슬라이드 변경
});


 // 유달산 상세 페이지로 이동하는 함수
function redirectToDetailPage(location) {
    // 유달산 상세 페이지의 URL 설정
    const detailPageURL = `../../HTML/jeonla/detailFestival1.html?location=${location}`;
    
    // 새로운 페이지로 이동
    window.location.href = detailPageURL;
}

// 모달 창을 닫는 함수 정의
function closeModal() {
    var youtubeModal = document.getElementById("youtubeModal");
    youtubeModal.style.display = "none";
}

window.addEventListener('click', function(event) {
    if (event.target === youtubeModal) {
    closeModal();
    }
});


// 모달 닫기 버튼에 이벤트 리스너 추가
var closeBtn = document.getElementsByClassName("youtubeClose")[0];
closeBtn.addEventListener("click", closeModal);