//페이지가 로드될 때 실행될 함수

window.onload = function(){
    //서버로부터 사용자 정보를 가져와서 테이브에 출력하는 함수 호출

    //세션 스토리지에서 로그인한 사용자 ID를 가져옴
    const memberId = sessionStorage.getItem("memberId");

    if(memberId === null){
        // 사용자 ID가 없으면 로그인 페이지로 이동
        alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요");
        window.location.href = "../../HTML/user/login.html";
 // 로그인 페이지로 이동
    }else{
        // 사용자 ID가 존재하면 해당 사용자의 정보를 가져와서 출력
        getMyInfo(memberId);

    }
    
    //비밀번호 변경 링크에 이벤트 리스너 등록
    document.getElementById("changePass").addEventListener("click", changePass);
    document.getElementById("myOrder").addEventListener("click", reqOrderList);
};

//서버로부터 사용자 정보를 가져와서 테이블에 출력하는 함수
const getMyInfo = function(memberId){
    const packet = {
        cmd: 'MyInfo',
        memberId: memberId
    };

    const jsonStr = JSON.stringify(packet);     // js객체 -> json문자열
    sendMessage(jsonStr);

}


const renderMyInfo = function(userInfo){
    //json 문자열을 객체로 파싱
    const userInfoObj =JSON.parse(userInfo);
    //테이블 셀에 사용자 정보를 출력
    console.log(userInfo.email);
    document.getElementById("emailCell").textContent=userInfoObj.email;
    document.getElementById("nameCell").textContent=userInfoObj.name;
    document.getElementById("addressCell").textContent=userInfoObj.address;
    document.getElementById("phoneCell").textContent=userInfoObj.phone;
};



 // 비밀번호 변경 처리를 구현합니다.
function changePass(event) {

    alert("비밀번호 변경 기능을 구현하세요!");
}

const sendMyList = function (){
    const memberId = sessionStorage.getItem('memberId');

    const packet = {
        cmd: 'mylist',
        memberId: memberId
    };
    console.log(packet);
    const jsonStr = JSON.stringify(packet);
    sendMessage(jsonStr);
}

document.addEventListener('DOMContentLoaded', ()=>{
    const myListButton = document.querySelector('#mylist');

    myListButton.addEventListener('click', ()=>{
        sendMyList();
    });
})

const requestMyBoard = function (message) {
    const myListTable = document.getElementById('myListBoard');
    const msgObj = JSON.parse(message);
    const row = document.querySelector('.mylistrow');
    myListTable.style.marginBottom = "20px"

    if(row !== null){
        
        row.forEach(element => {
            element.remove();
        });
    }
    
    
    for (let i = 0; i < msgObj.result.length; i++){
        const row = document.createElement('tr');
        row.setAttribute("class", "mylistrow")
        row.setAttribute("memberId", msgObj.result[i].memberID)

        const cell1 = document.createElement('td');
        cell1.textContent = msgObj.result[i].indexNum;
        cell1.style.textAlign = "center";
        row.appendChild(cell1);

        const cell2 = document.createElement('td');
        cell2.textContent = msgObj.result[i].subject;
        cell2.style.textAlign = "center";
        row.appendChild(cell2);

        const cell3 = document.createElement('td');
        cell3.textContent = msgObj.result[i].name;
        cell3.style.textAlign = "center";
        row.appendChild(cell3);

        const cell4 = document.createElement('td');
        cell4.textContent = msgObj.result[i].date;
        cell4.style.textAlign = "center";
        row.appendChild(cell4);

        const cell5 = document.createElement('td');
        cell5.textContent = msgObj.result[i].views;
        cell5.style.textAlign = "center";
        row.appendChild(cell5);
        
        const cell6 = document.createElement('td');
        cell6.textContent = msgObj.result[i].category;
        cell6.style.textAlign = "center";
        row.appendChild(cell6);

        myListTable.appendChild(row);
    // document.getElementById("categoryCell").textContent = msgObj.result[i].category;
    // document.getElementById("indexNumCell").textContent = msgObj.result[i].indexNum;
    // document.getElementById("subjectCell").textContent = msgObj.result[i].subject;
    // document.getElementById("nameCell").textContent = msgObj.result[i].name;
    // document.getElementById("dateCell").textContent = msgObj.result[i].date;
    // document.getElementById("viewsCell").textContent = msgObj.result[i].views;
    }

};

const reqOrderList = function () {
    const packet = {
        cmd: 'getOrderList',
        memberId: sessionStorage.getItem('memberId')
    }

    socket.send(JSON.stringify(packet));
}

const resOrderList = function (message) {
    const msgObj = JSON.parse(message);
    const myOrderList = document.getElementById('myOrderList');
    const orderItem = document.querySelector('.orderItem');

    if(orderItem !== null){
        
        orderItem.array.forEach(element => {
            element.remove();
        });
    }
    

    for(let i=0; i<msgObj.length; i++){
        let orderList = `<tr class='orderItem'>
        <td>${i}</td>
        <td>${msgObj[i].name}</td>
        <td>${msgObj[i].price}</td>
        <td>${msgObj[i].count}</td>
        </tr>`;

        myOrderList.insertAdjacentHTML('beforeend', orderList);
    }
}