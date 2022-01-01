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

  /*Tìm ra thời gian theo ngày, giờ, phút giây còn lại thông qua cách chia lấy dư(%) và làm tròn số(Math.floor) trong Javascript*/
  var d = Math.floor(thoigianConLai / ngay);
  var h = Math.floor((thoigianConLai % ngay) / gio);
  var m = Math.floor((thoigianConLai % gio) / phut);
  var s = Math.floor((thoigianConLai % phut) / giay);

  /*Hiển thị kết quả ra các thẻ Div với ID tương ứng*/
  document.getElementById("days").innerText = d;
  document.getElementById("hours").innerText = h;
  document.getElementById("mins").innerText = m;
  document.getElementById("secs").innerText = s;
}

/*Thiết Lập hàm sẽ tự động chạy lại sau 1s*/
setInterval(newYear, 1000);

function StartFireworks() {

  const day = document.querySelector("#days");
  const hour = document.querySelector("#hours");
  const min = document.querySelector("#mins");
  const sec = document.querySelector("#secs");

  if (day.innerHTML == 30 && hour.innerHTML == 3 && min.innerHTML == 35 && sec.innerHTML == 20) {
    animate()
  }
}

setInterval(StartFireworks, 500)