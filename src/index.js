const day = document.querySelector("#day");

const month = document.querySelector("#month");

const year = document.querySelector("#year");

document.querySelectorAll("input").forEach((el) => {
  el.oninput = () => {
    removeMsg(el);
  };
});

document.forms[0].onsubmit = (e) => {
  e.preventDefault();
  day.value = day.value.trim();
  month.value = month.value.trim();
  year.value = year.value.trim();
  if (day.value.length < 1) {
    return errorMsg(day);
  }
  if (!(/\d{1,2}/.test(day.value) && day.value <= 31)) {
    return errorMsg(day);
  }
  if (month.value.length < 1) {
    return errorMsg(month);
  }
  if (!(/\d{1,2}/.test(month.value) && month.value <= 12)) {
    return errorMsg(month);
  }
  if (year.value.length < 1) {
    return errorMsg(year);
  }
  if (
    !(
      /\d{4}/.test(year.value) && year.value <= Number(new Date().getFullYear())
    )
  ) {
    return errorMsg(year);
  }
  if (
    year.value >= new Date().getFullYear() &&
    month.value >= new Date().getMonth() + 1 &&
    day.value > new Date().getDate()
  ) {
    alert(`Date of birth needs to be eariler than the age at date`);
  } else {
    calculateAge(new Date(`${year.value}-${month.value}-${day.value}`));
    empetyValues();
  }
};

function calculateAge(birthDate) {
  const today = new Date();
  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth() + 1;
  const birthDay = birthDate.getDate();
  let ageYear = today.getFullYear() - birthYear;
  let ageMonth = today.getMonth() + 1 - birthMonth;
  let ageDay = today.getDate() - birthDay;
  if (ageMonth < 0 || (ageMonth === 0 && ageDay < 0)) {
    ageYear--;
    ageMonth += 12;
  }
  document.querySelector("#month-value").textContent =
    ageMonth < 10 ? `0${ageMonth}` : ageMonth;
  document.querySelector("#year-value").textContent =
    ageYear < 10 ? `0${ageYear}` : ageYear;
  document.querySelector("#day-value").textContent =
    ageDay < 10 ? `0${ageDay}` : ageDay;
}
function empetyValues() {
  year.value = "";
  month.value = "";
  day.value = "";
}
function errorMsg(input) {
  let msg = document.createElement("h4");
  if (input.value == "") {
    msg.textContent = "this field is required";
  } else if (input.id === "month") {
    msg.textContent = "must be a vaild month";
  } else if (input.id === "day") {
    msg.textContent = "must be a vaild day";
  } else {
    msg.textContent = "must be a vaild year";
  }
  if (input.parentNode.lastElementChild.nodeName !== "H4") {
    input.parentNode.append(msg);
  }
  input.classList.add("border-danger");
  input.parentNode.firstElementChild.style.color = "rgba(220,53,69)";
}

function removeMsg(input) {
  if (input.parentNode.lastElementChild.nodeName == "H4") {
    input.parentNode.lastElementChild.remove();
  }
  input.classList.remove("border-danger");
  input.parentNode.firstElementChild.style.color = "hsl(0, 1%, 44%)";
}

ScrollReveal().reveal(`#age-app`, {
  duration: 2000,
});
