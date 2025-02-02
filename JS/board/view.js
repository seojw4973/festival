const sendView = function(e){
    const indexNum = e.getAttribute('id');
    
    const packet = {
     cmd : 'view',
     indexNum: indexNum
    };

    const jsonStr = JSON.stringify(packet);     // js객체 -> json문자열
    sendMessage(jsonStr);
}


const showcontent = function(message){
    const msgObj = JSON.parse(message);
    const boarditem = document.getElementById(`${msgObj.indexNum}`); 
    const boardlist = document.querySelectorAll('.clicked');
    
    boardlist.forEach((e) => {e.remove()});
    const content = document.createElement('td');
    content.setAttribute('class', 'clicked');
    content.textContent = msgObj.result;
    content.style.padding = "10px"
    content.style.borderTop = "1px solid black"
    content.style.borderBottom = "1px solid black"
    content.style.height = "50px"
    content.style.lineHeight = "50px"
    content.style.textAlign = 'center';
    content.setAttribute('colSpan', '6');

    boarditem.insertAdjacentElement('afterend', content);

}