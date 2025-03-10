let currentDate3 = new Date();

document.addEventListener("DOMContentLoaded", () => {
  updateCalendar3();
});

function updateCalendar3() {
  document.getElementById("staticMonthYear").textContent = `${getMonthName3(
    currentDate3.getMonth()
  )} ${currentDate3.getFullYear()}`;
  generateCalendar3(currentDate3);
}

function changeMonth3(offset) {
  currentDate3.setMonth(currentDate3.getMonth() + offset);
  updateCalendar3();
}

function generateCalendar3(date) {
  const calendar = document.getElementById("staticCalendar");
  if (!calendar) return;

  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDay = firstDay.getDay();
  const monthLength = lastDay.getDate();

  let html = `<table>
    <tr>
      <th>SUN</th><th>MON</th><th>TUE</th>
      <th>WED</th><th>THU</th><th>FRI</th><th>SAT</th>
    </tr><tr>
  `;

  for (let i = 0; i < startingDay; i++) {
    html += `<td class="non-current-month"></td>`;
  }

  for (let day = 1; day <= monthLength; day++) {
    html += `<td>${day}</td>`;

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
}

function getMonthName3(monthIndex) {
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
