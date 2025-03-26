// Calendar 2 Implementation
let currentDate2 = new Date();
let selectedDate2 = null;
let selectedTime2 = null;

const confirmBtn3 = document.querySelector(".confirm-btn-2");
const tryingStuff = document.querySelector(".success-overlay-2");

confirmBtn3.addEventListener("click", function () {
  tryingStuff.style.display = "flex";
  console.log(`btn clicked`);
});

document.addEventListener("DOMContentLoaded", () => {
  updateCalendar2();
  setupTimeHandlers2();
  setupModalHandlers2();
});

function updateCalendar2() {
  document.querySelector(".monthYear-2").textContent = `${getMonthName2(
    currentDate2.getMonth()
  )} ${currentDate2.getFullYear()}`;
  generateCalendar2(currentDate2);
}

function changeMonth2(offset) {
  currentDate2.setMonth(currentDate2.getMonth() + offset);
  updateCalendar2();
}

function generateCalendar2(date) {
  const calendar2 = document.querySelector(".calendar-2");
  if (!calendar2) return;

  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDay = firstDay.getDay();
  const monthLength = lastDay.getDate();

  let html = `
    <table class="second-appointment-2">
      <tr>
        <th>SUN</th><th>MON</th><th>TUE</th>
        <th>WED</th><th>THU</th><th>FRI</th><th>SAT</th>
      </tr><tr>
  `;

  for (let i = 0; i < startingDay; i++) {
    html += `<td class="non-current-month-2"></td>`;
  }

  for (let day = 1; day <= monthLength; day++) {
    const cellDate = new Date(year, month, day);
    const dayOfWeek = cellDate.getDay();
    const isAvailable = [1, 3, 5, 6].includes(dayOfWeek);
    const className = isAvailable ? "available-2" : "unavailable-2";
    const onClick = isAvailable ? `onclick="selectDate2(${day}, this)"` : "";

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
}

function selectDate2(day, element) {
  document.querySelectorAll(".calendar-2 td.selected-date").forEach((el) => {
    el.classList.remove("selected-date");
  });

  element.classList.add("selected-date");
  selectedDate2 = new Date(
    currentDate2.getFullYear(),
    currentDate2.getMonth(),
    day
  );
  selectedTime2 = null;
  // Target confirm button specifically for calendar 2
  document.querySelector(".confirm-btn-2").disabled = true;
}

function setupTimeHandlers2() {
  // Use unique class for calendar 2 time slots
  document.querySelectorAll(".timer-text-main-2").forEach((timeElement) => {
    timeElement.addEventListener("click", () => {
      if (!selectedDate2) {
        alert("Please select a date first.");
        return;
      }

      const timeText = timeElement.textContent.trim();
      const normalizedTime = normalizeTime2(timeText);

      if (isTimeAvailable2(selectedDate2, normalizedTime)) {
        selectedTime2 = normalizedTime;
        showAvailabilityModal2("success");
        document.querySelector(".confirm-btn-2").disabled = false;
      } else {
        showAvailabilityModal2("booked");
      }
    });
  });
}

function normalizeTime2(timeStr) {
  let [time, modifier] = timeStr.split(/(?=[APMapm])/);
  modifier = modifier.trim().toUpperCase();
  let [hours, minutes] = time.split(":");
  hours = hours.padStart(2, "0");
  return `${hours}:${minutes} ${modifier}`;
}

function isTimeAvailable2(date, time) {
  const appointments = JSON.parse(localStorage.getItem("appointments2")) || [];
  return !appointments.some(
    (appt) =>
      appt.date === date.toISOString().split("T")[0] && appt.time === time
  );
}

function showAvailabilityModal2(type) {
  // Use unique modal classes for calendar 2
  const successModal = document.querySelector(
    ".doctors-availabity-card-success-2"
  );
  const bookedModal = document.querySelector(
    ".doctors-availabity-card-booked-2"
  );

  successModal.style.display = type === "success" ? "flex" : "none";
  bookedModal.style.display = type === "booked" ? "flex" : "none";

  if (type === "success") {
    document.querySelector(
      ".use-javascript-to-attach-time-2" // Unique class for time display
    );
  }
}

function setupModalHandlers2() {
  // Target modals and buttons specific to calendar 2
  document.querySelectorAll(".ok-button-2").forEach((button) => {
    button.addEventListener("click", () => {
      document
        .querySelectorAll(".doctors-availabity-card-2")
        .forEach((modal) => {
          modal.style.display = "none";
        });
    });
  });

  document.querySelector(".confirm-btn-2").addEventListener("click", () => {
    if (!selectedDate2 || !selectedTime2) return;

    const appointments =
      JSON.parse(localStorage.getItem("appointments2")) || [];
    appointments.push({
      id: Date.now(),
      date: selectedDate2.toISOString().split("T")[0],
      time: selectedTime2,
      status: "confirmed",
    });

    localStorage.setItem("appointments2", JSON.stringify(appointments));
    document.querySelector(".success-overlay-2").style.display = "flex";

    selectedDate2 = null;
    selectedTime2 = null;
    document.querySelectorAll(".calendar-2 td.selected-date").forEach((el) => {
      el.classList.remove("selected-date");
    });
    document.querySelector(".confirm-btn-2").disabled = true;
  });
}

function getMonthName2(monthIndex) {
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
