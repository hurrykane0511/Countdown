"use strict";

//Lấy năm mới
function getNewYear() {
  let today = new Date();
  if (today.getMonth() < 1) {
    return today.getFullYear();
  } else {
    return today.getFullYear() + 1;
  }
}

const lunarNewYearDate = new Date(getNewYear(), 1, 1, 0, 0, 0, 0);
document.querySelector('.year').innerHTML = getNewYear();
newYear()
function newYear() {
  const lunarDate = new Date();

  /*Lấy thời gian ngày hiện tại (mily giây) */
  var ngayHienTai = lunarDate.getTime();
  var tetAmLich = lunarNewYearDate.getTime();

  /*Tính thời gian còn lại (mily giây) */
  let thoigianConLai = tetAmLich - ngayHienTai;

  /*Chuyển đơn vị thời gian tương ứng sang mili giây*/
  var giay = 1000;
  var phut = giay * 60;
  var gio = phut * 60;
  var ngay = gio * 24;

  var d = Math.floor(thoigianConLai / ngay);
  var h = Math.floor((thoigianConLai % ngay) / gio);
  var m = Math.floor((thoigianConLai % gio) / phut);
  var s = Math.floor((thoigianConLai % phut) / giay);

  /*Hiển thị kết quả ra các thẻ Div với ID tương ứng*/
  document.getElementById("days").innerText = formatting(d);
  document.getElementById("hours").innerText = formatting(h);
  document.getElementById("mins").innerText = formatting(m);
  document.getElementById("secs").innerText = formatting(s);
}

/*Thiết Lập hàm sẽ tự động chạy lại sau 1s*/
setInterval(newYear, 1000);
let t = setInterval(StartFireworks, 500)

function formatting(target) {
  return target < 10 ? '0' + target : target;
}

function StartFireworks() {

  const day = document.querySelector("#days");
  const hour = document.querySelector("#hours");
  const min = document.querySelector("#mins");
  const sec = document.querySelector("#secs");

  if (day.innerHTML == 30 && hour.innerHTML == 0 && min.innerHTML == 22 && sec.innerHTML == 10) {
    animate()
    let music = new Audio("./audio/HappyNewYear-ABBA-1595921.mp3")
    music.play()
    document.querySelector('.year').classList.add('active');
    clearInterval(t);
    setTimeout(() => {
      cancelAnimationFrame(req)
      music.pause();
      document.querySelector('.year').classList.remove('active');
      reset();
      t = setInterval(StartFireworks, 500)
    }, 60000 * 5)
  }
}

