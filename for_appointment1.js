let currentDate1 = new Date();
let selectedDate1 = null;
let selectedTime1 = null;

document.addEventListener("DOMContentLoaded", () => {
  updateCalendar1();
  setupTimeHandlers1();
  setupModalHandlers1();
});

function updateCalendar1() {
  document.getElementById("monthYear").textContent = `${getMonthName1(
    currentDate1.getMonth()
  )} ${currentDate1.getFullYear()}`;
  generateCalendar1(currentDate1);
}

function changeMonth1(offset) {
  currentDate1.setMonth(currentDate1.getMonth() + offset);
  updateCalendar1();
}

function generateCalendar1(date) {
  const calendar = document.getElementById("calendar");
  if (!calendar) return;

  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDay = firstDay.getDay();
  const monthLength = lastDay.getDate();

  let html = `
    <table class="second-appointment">
      <tr>
        <th>SUN</th><th>MON</th><th>TUE</th>
        <th>WED</th><th>THU</th><th>FRI</th><th>SAT</th>
      </tr><tr>
  `;

  for (let i = 0; i < startingDay; i++) {
    html += `<td class="non-current-month"></td>`;
  }

  for (let day = 1; day <= monthLength; day++) {
    const cellDate = new Date(year, month, day);
    const dayOfWeek = cellDate.getDay();
    const isAvailable = [1, 3, 5, 6].includes(dayOfWeek);
    const className = isAvailable ? "available" : "unavailable";
    const onClick = isAvailable ? `onclick="selectDate1(${day}, this)"` : "";

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
}

function selectDate1(day, element) {
  document
    .querySelectorAll("#calendar td.selected-date")
    .forEach((el) => el.classList.remove("selected-date"));
  element.classList.add("selected-date");
  selectedDate1 = new Date(
    currentDate1.getFullYear(),
    currentDate1.getMonth(),
    day
  );
  selectedTime1 = null;
  document.querySelector(".confirm-btn").disabled = true;
}

function setupTimeHandlers1() {
  document.querySelectorAll(".timer-text-main").forEach((timeElement) => {
    timeElement.addEventListener("click", () => {
      if (!selectedDate1) {
        alert("Please select a date first.");
        return;
      }

      const timeText = timeElement.textContent.trim();
      const normalizedTime = normalizeTime1(timeText);

      if (isTimeAvailable1(selectedDate1, normalizedTime)) {
        selectedTime1 = normalizedTime;
        showAvailabilityModal1("success");
        document.querySelector(".confirm-btn").disabled = false;
      } else {
        showAvailabilityModal1("booked");
      }
    });
  });
}

function normalizeTime1(timeStr) {
  let [time, modifier] = timeStr.split(/(?=[APMapm])/);
  modifier = modifier.trim().toUpperCase();
  let [hours, minutes] = time.split(":");
  hours = hours.padStart(2, "0");
  return `${hours}:${minutes} ${modifier}`;
}

function isTimeAvailable1(date, time) {
  const appointments = JSON.parse(localStorage.getItem("appointments1")) || [];
  return !appointments.some(
    (appt) =>
      appt.date === date.toISOString().split("T")[0] && appt.time === time
  );
}

function showAvailabilityModal1(type) {
  const successModal = document.querySelector(
    ".doctors-availabity-card-success"
  );
  const bookedModal = document.querySelector(".doctors-availabity-card-booked");

  successModal.style.display = type === "success" ? "flex" : "none";
  bookedModal.style.display = type === "booked" ? "flex" : "none";

  if (type === "success") {
    document.querySelector(
      ".use-javascript-to-attach-time"
    ).textContent = `${selectedDate1.toDateString()} at ${selectedTime1}`;
  }
}

function setupModalHandlers1() {
  document.querySelectorAll(".ok-button-2").forEach((button) => {
    button.addEventListener("click", () => {
      document
        .querySelectorAll(".doctors-availabity-card-success-2")

        .forEach((modal) => {
          console.log(`did it work>`);
          modal.style.display = "none";
        });
    });
  });

  document.querySelectorAll(".ok-button").forEach((button) => {
    button.addEventListener("click", () => {
      document
        .querySelectorAll(".doctors-availabity-card-success")
        .forEach((modal) => {
          modal.style.display = "none";
        });

      document
        .querySelectorAll(".doctors-availabity-card-booked")
        .forEach((modals) => {
          modals.style.display = "none";
        });

      document
        .querySelectorAll(".doctors-availabity-card-booked-2")
        .forEach((modals) => {
          modals.style.display = "none";
        });
    });
  });

  document.querySelector(".confirm-btn").addEventListener("click", () => {
    if (!selectedDate1 || !selectedTime1) return;

    const appointments =
      JSON.parse(localStorage.getItem("appointments1")) || [];
    appointments.push({
      id: Date.now(),
      date: selectedDate1.toISOString().split("T")[0],
      time: selectedTime1,
      status: "confirmed",
    });

    localStorage.setItem("appointments1", JSON.stringify(appointments));
    document.querySelector(".success-overlay").style.display = "flex";

    selectedDate1 = null;
    selectedTime1 = null;
    document
      .querySelectorAll("#calendar td.selected-date")
      .forEach((el) => el.classList.remove("selected-date"));
    document.querySelector(".confirm-btn").disabled = true;
  });
}

function getMonthName1(monthIndex) {
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
