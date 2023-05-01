//global variables
let monthEl = document.querySelector(".c-main");
let dataCel = document.querySelectorAll(".c-cal__cel");
let dateObj = new Date();
let month = dateObj.getUTCMonth() + 1;
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();
let monthText = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let indexMonth = month;
let todayBtn = document.querySelector(".c-today__btn");
let addBtn = document.querySelector(".js-event__add");
let saveBtn = document.querySelector(".js-event__save");
let closeBtn = document.querySelector(".js-event__close");
let winCreator = document.querySelector(".js-event__creator");
let inputDate = this.dataset;
today = year + "-" + month + "-" + day;

// ------ set default events -------
function defaultEvents(dataDay,dataName,dataNotes,classTag){
  let date = document.querySelector('*[data-day="'+dataDay+'"]');
  date.setAttribute("data-name", dataName);
  date.setAttribute("data-notes", dataNotes);
  date.classList.add("event");
  date.classList.add("event--" + classTag);
}

defaultEvents(today, 'YEAH!','Today is your day','important');
defaultEvents('2022-12-25', 'MERRY CHRISTMAS','A lot of gift!!!!','festivity');
defaultEvents('2022-05-04', "LUCA'S BIRTHDAY",'Another gifts...?','birthday');
defaultEvents('2022-03-03', "MY LADY'S BIRTHDAY",'A lot of money to spent!!!!','birthday');

// ------ functions control -------

//button of the current day
todayBtn.addEventListener("click", function() {
  if (month < indexMonth) {
    let step = indexMonth % month;
    movePrev(step, true);
  } else if (month > indexMonth) {
    var step = month - indexMonth;
    moveNext(step, true);
  }
});

//higlight the cel of current day
dataCel.forEach(function(el) {
  if (el.dataset.day === today) {
    el.classList.add("isToday");
    fillEventSidebar(el);
  }
});

//window event creator
addBtn.addEventListener("click", function() {
  winCreator.classList.add("isVisible");
  document.body.classList.add("overlay");
  dataCel.forEach(function(el) {
    if (el.classList.contains("isSelected")) {
      today = el.dataset.day;
      document.querySelector('input[type="date"]').value = today;
    } else {
      document.querySelector('input[type="date"]').value = today;
    }
  });
});

closeBtn.addEventListener("click", function() {
  winCreator.classList.remove("isVisible");
  document.body.classList.remove("overlay");
});

saveBtn.addEventListener("click", function() {
  let inputName = document.querySelector("input[name=name]").value;
  let inputDate = document.querySelector("input[name=date]").value;
  let inputNotes = document.querySelector("textarea[name=notes]").value;
  let inputTag = document.querySelector("select[name=tags]")
    .options[document.querySelector("select[name=tags]").selectedIndex]
    .text;

  dataCel.forEach(function(el) {
    if (el.dataset.day === inputDate) {
      if (inputName != null) {
        el.setAttribute("data-name", inputName);
      }
      if (inputNotes != null) {
        el.setAttribute("data-notes", inputNotes);
      }
    }
})
})