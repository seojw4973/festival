

const sendLogIn = function () {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  const packet = {
    cmd: 'login',
    email: email,
    password: password
  };
  const jsonStr = JSON.stringify(packet);     // js객체 -> json문자열
  sendMessage(jsonStr);
}

// 서버로부터 응답처리
const loginSuccess = function (message) {
  // json문자열 -> js 객체로 변환
  const msgObj = JSON.parse(message);

  switch (msgObj.cmd) {
    case 'login':
      if (msgObj.result === 'ok') {
        sessionStorage.setItem('memberId', msgObj.memberId);
        sessionStorage.setItem('email', msgObj.email);
        sessionStorage.setItem('name', msgObj.name);
        alert(`${msgObj.name}님 환영합니다.`);
        location.href = '/HTML/'
      }else{
        alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        return;
      }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.querySelector('#loginBtn');
  const signupBtn = document.querySelector('#signupBtn');

  loginBtn.addEventListener('click', () => {
    sendLogIn();
  });
  signupBtn.addEventListener('click', () => {
    location.href = '/HTML/user/signup.html'
  });

});