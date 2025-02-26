document.querySelectorAll('input[type="radio"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    if (this.checked) {
      try {
        const tempUser = JSON.parse(localStorage.getItem("tempUser"));
        if (!tempUser) throw new Error("User data not found");

        if (!tempUser.email || !tempUser.firstName) {
          throw new Error("Incomplete user data");
        }

        const user = {
          firstName: tempUser.firstName,
          lastName: tempUser.lastName,
          email: tempUser.email,
          password: tempUser.password,
          role: this.value,
        };

        localStorage.setItem(user.email, JSON.stringify(user));
        localStorage.removeItem("tempUser");

        window.location.href = `${this.value}.html`;
      } catch (error) {
        console.error("Error:", error);
        alert("Error: " + error.message);
      }
    }
  });
});
