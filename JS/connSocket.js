
const SERVER_IP = '192.168.0.45';

const SERVER_PORT = 9000;
const server_address = `ws://${SERVER_IP}:${SERVER_PORT}`;  // ws://127.0.0.1:9000

const socket = new WebSocket(server_address);

socket.onopen = function (e) {
    const log_msg = '[open] 연결이 설정되었습니다.';

    // displayMessage('#messages', log_msg);
}

socket.onclose = function (e) {
    let log_msg = '';
    if (e.wasClean)
        log_msg = `[close] 연결이 정상적으로 종료되었습니다. 코드=${e.code}, 원인=${e.reason}`;
    else
        log_msg = `[close] 연결이 비정상적으로 종료되었습니다.. 코드=${e.code}, 원인=${e.reason}`;
}

socket.onerror = function (error) {
    const log_msg = `[error] ${error.message}`;

    displayMessage('#messages', log_msg);
}

socket.onmessage = function (e) {
    const msgObj = JSON.parse(e.data);

    switch(msgObj.cmd){
        case 'login':
            loginSuccess(e.data);
            break;
        case 'allchat':
            recievePacketMessage('#messages', e.data);
            break;
        case 'checkemail':
            checkEmailReq(e.data);
            break;
        case 'signup':
            signupSuccess(e.data);
            break;
        case 'boardlist':
            // requestboard(e.data);
            pageboard(e.data)
            break;
        case 'view':
            showcontent(e.data);
            console.log(e.data)
            break;
        case 'popularlist':
            requestboard(e.data);
            break;
        case 'MyInfo':
            renderMyInfo(e.data);
            break;
        case 'mylist':
            console.log(e.data);
            requestMyBoard(e.data);    
            break;  
        case 'buyCartItem':
            orderSuccess(e.data);
            break;
        
    }

    switch(msgObj[0].cmd){
        case 'getAllCart':
            resAllCart(e.data);
            break;
        case 'getOrderList':
            resOrderList(e.data);
            break;
    }
}

const sendMessage = function(message){
    while(true){
        if(socket.readyState === WebSocket.OPEN){
            socket.send(message);    // 서버로 전송
            return;
        }
    }
}