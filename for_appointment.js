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
