// script.js
let currentDate = new Date();

document.addEventListener("DOMContentLoaded", () => {
  updateCalendar();
});

function updateCalendar() {
  document.getElementById("monthYear").textContent = `${getMonthName(
    currentDate.getMonth()
  )} ${currentDate.getFullYear()}`;
  generateCalendar(currentDate);
}

function changeMonth(offset) {
  currentDate.setMonth(currentDate.getMonth() + offset);
  updateCalendar();
}
function generateCalendar(date) {
  console.log("Generating calendar for:", date);
  const calendar = document.getElementById("calendar");
  if (!calendar) {
    console.error("Calendar element not found!");
    return;
  }

  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDay = firstDay.getDay(); // Day of the week for the 1st day of the month
  const monthLength = lastDay.getDate(); // Total number of days in the month

  let html = `
        <table class="second-appointment">
            <tr>
                <th>SUN</th><th>MON</th><th>TUE</th>
                <th>WED</th><th>THU</th><th>FRI</th><th>SAT</th>
            </tr><tr>`;

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDay; i++) {
    html += `<td class="non-current-month"></td>`;
  }

  for (let day = 1; day <= monthLength; day++) {
    const cellDate = new Date(year, month, day);
    const isToday = new Date().toDateString() === cellDate.toDateString();
    const dayOfWeek = cellDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const isAvailable = [1, 3, 5, 6].includes(dayOfWeek); // 1 = Monday, 3 = Wednesday, 5 = Friday, 6 = Saturday
    const className = isAvailable
      ? `available ${isToday ? "today" : ""}`
      : `unavailable`;
    const onClick = isAvailable ? `onclick="selectDate(${day})"` : "";
    html += `<td class="${className}" ${onClick}>${day}</td>`;
    if ((day + startingDay) % 7 === 0 && day !== monthLength) {
      html += "</tr><tr>";
    }
  }

  const remainingCells = 7 - ((monthLength + startingDay) % 7);
  if (remainingCells < 7) {
    for (let i = 0; i < remainingCells; i++) {
      html += `<td class="non-current-month"></td>`;
    }
  }

  html += "</tr></table>";
  calendar.innerHTML = html;

  // Ensure the calendar is visible
  calendar.style.display = "block";
}
function getMonthName(monthIndex) {
  const months = [
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
    "December",
  ];
  return months[monthIndex];
}

function selectDate(day) {
  const selectedDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    day
  );
  window.selectedDate = selectedDate;
  document.getElementById("timeModal").style.display = "block";
}

function bookAppointment() {
  const time = document.getElementById("timeSelect").value;
  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  appointments.push({
    id: Date.now(),
    date: window.selectedDate.toISOString().split("T")[0],
    time,
    status: "pending",
  });
  localStorage.setItem("appointments", JSON.stringify(appointments));
  alert("Appointment requested!");
  document.getElementById("timeModal").style.display = "none";
}
const confirmBtn = document.querySelector(".confirm-btn");
const successSection = document.querySelector(".success-overlay");

confirmBtn.addEventListener("click", function () {
  successSection.style.display = "flex";
});

/* calendar2 */

// script.js

let currentDate2 = new Date(); // Track the date for the second calendar

// Function to update the second calendar
function updateCalendar2() {
  document.querySelector(".monthYear-2").textContent = `${getMonthName(
    currentDate2.getMonth()
  )} ${currentDate2.getFullYear()}`;
  generateCalendar2(currentDate2);
}

// Function to change the month for the second calendar
function changeMonth2(offset) {
  currentDate2.setMonth(currentDate2.getMonth() + offset);
  updateCalendar2();
}

// Function to generate the second calendar
function generateCalendar2(date) {
  console.log("Generating second calendar for:", date);

  const calendar2 = document.querySelector(".calendar-2");
  if (!calendar2) {
    console.error("Second calendar element not found!");
    return;
  }

  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDay = firstDay.getDay(); // Day of the week for the 1st day of the month
  const monthLength = lastDay.getDate(); // Total number of days in the month

  let html = `
        <table class="second-appointment-2">
            <tr>
                <th>SUN</th><th>MON</th><th>TUE</th>
                <th>WED</th><th>THU</th><th>FRI</th><th>SAT</th>
            </tr><tr>`;

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDay; i++) {
    html += `<td class="non-current-month-2"></td>`;
  }

  for (let day = 1; day <= monthLength; day++) {
    const cellDate = new Date(year, month, day);
    const isToday = new Date().toDateString() === cellDate.toDateString();
    const dayOfWeek = cellDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const isAvailable = [1, 3, 5, 6].includes(dayOfWeek); // 1 = Monday, 3 = Wednesday, 5 = Friday, 6 = Saturday
    const className = isAvailable
      ? `available-2 ${isToday ? "today-2" : ""}`
      : `unavailable-2`;
    const onClick = isAvailable ? `onclick="selectDate2(${day})"` : "";
    html += `<td class="${className}" ${onClick}>${day}</td>`;
    if ((day + startingDay) % 7 === 0 && day !== monthLength) {
      html += "</tr><tr>";
    }
  }

  const remainingCells = 7 - ((monthLength + startingDay) % 7);
  if (remainingCells < 7) {
    for (let i = 0; i < remainingCells; i++) {
      html += `<td class="non-current-month-2"></td>`;
    }
  }

  html += "</tr></table>";
  calendar2.innerHTML = html;

  // Ensure the calendar table is displayed
  calendar2.style.display = "block";
}

// Function to get the name of the month
function getMonthName(monthIndex) {
  const months = [
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
    "December",
  ];
  return months[monthIndex];
}

// Function to handle date selection for the second calendar
function selectDate2(day) {
  const selectedDate = new Date(
    currentDate2.getFullYear(),
    currentDate2.getMonth(),
    day
  );
  window.selectedDate2 = selectedDate;
  document.querySelector(".timeModal-2").style.display = "block";
}

// Function to hide the time modal for the second calendar
function hideTimeModal2() {
  document.querySelector(".timeModal-2").style.display = "none";
}

// Function to book an appointment for the second calendar
function bookAppointment2() {
  const time = document.querySelector(".timeSelect-2").value;
  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  appointments.push({
    id: Date.now(),
    date: window.selectedDate2.toISOString().split("T")[0],
    time,
    status: "pending",
  });
  localStorage.setItem("appointments", JSON.stringify(appointments));
  alert("Appointment requested!");
  hideTimeModal2();
}

// Initialize the second calendar on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCalendar2();
});
let staticCurrentDate = new Date();

function updateStaticCalendar() {
  document.getElementById(
    "staticMonthYear"
  ).textContent = `${getStaticMonthName(
    staticCurrentDate.getMonth()
  )} ${staticCurrentDate.getFullYear()}`;
  generateStaticCalendar(staticCurrentDate);
}

function changeStaticMonth(offset) {
  staticCurrentDate.setMonth(staticCurrentDate.getMonth() + offset);
  updateStaticCalendar();
}

function generateStaticCalendar(date) {
  const calendar = document.getElementById("staticCalendar");
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDay = firstDay.getDay();
  const monthLength = lastDay.getDate();

  let html = `<table>
    <tr>
      <th>Sun</th><th>Mon</th><th>Tue</th>
      <th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
    </tr><tr>`;

  // Empty cells for days before the first day
  for (let i = 0; i < startingDay; i++) {
    html += `<td class="non-current-month"></td>`;
  }

  // Calendar days
  for (let day = 1; day <= monthLength; day++) {
    if ((day + startingDay - 1) % 7 === 0 && day !== 1) {
      html += "</tr><tr>";
    }
    html += `<td>${day}</td>`;
  }

  // Remaining empty cells
  const remainingCells = 7 - ((monthLength + startingDay) % 7);
  if (remainingCells < 7) {
    for (let i = 0; i < remainingCells; i++) {
      html += `<td class="non-current-month"></td>`;
    }
  }

  html += "</tr></table>";
  calendar.innerHTML = html;
}

function getStaticMonthName(monthIndex) {
  return [
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
    "December",
  ][monthIndex];
}

// Initialize
document.addEventListener("DOMContentLoaded", updateStaticCalendar);
