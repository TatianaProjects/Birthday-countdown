function birthdayCountDown () {

    const heading = document.querySelector("h1");
    heading.textContent = "Birthday Countdown";
    heading.classList.remove("red");

    const day = parseInt(document.querySelector("#day").value);
    const month = parseInt(document.querySelector("#month").value);

  if (isNaN(day) || isNaN(month)) {
      document.querySelector(".days").textContent = "";
      document.querySelector(".hours").textContent = "";
      document.querySelector(".minutes").textContent = "";
      document.querySelector(".seconds").textContent = "";
      return;
  }

   if (day < 1 || day > 31 || month < 1 || month > 12) {
    alert("Введите корректные значения: день (1–31), месяц (1–12).");
    clearInterval(timerId); // ⬅️ остановит счётчик
    return;
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let birthdayDate = new Date(now.getFullYear(), month - 1, day);

    // если день рождения уже прошёл — считаем до следующего года
    if (birthdayDate < today) {
        birthdayDate.setFullYear(birthdayDate.getFullYear() + 1);
    }
    // конец дня рождения (23:59:59)
    const birthdayEnd = new Date(birthdayDate);
    birthdayEnd.setHours(23, 59, 59, 999);

    // если СЕГОДНЯ день рождения — включаем режим праздника 🎉
    if (now >= birthdayDate && now <= birthdayEnd) {
        document.querySelector(".days").textContent = 0;
        document.querySelector(".hours").textContent = 0;
        document.querySelector(".minutes").textContent = 0;
        document.querySelector(".seconds").textContent = 0;
        happyBirthday();
        return;
    }
  // иначе считаем оставшееся время
    const diff = birthdayDate - now;

    console.log (birthdayDate)

    const msInSecond = 1000;
    const msInMinute = 60*1000;
    const msInHour = 60*60*1000;
    const msInDay = 24*60*60*1000;

    const displayDay = Math.floor (diff/msInDay);
    document.querySelector (".days").textContent = displayDay;

    const displayHour = Math.floor ((diff % msInDay)/ msInHour);
    document.querySelector (".hours").textContent = displayHour;

    const displayMinute = Math.floor ((diff % msInHour)/ msInMinute);
    document.querySelector (".minutes").textContent = displayMinute;

    const displaySecond = Math.floor ((diff % msInMinute)/ msInSecond);
    document.querySelector (".seconds").textContent = displaySecond;

    
}
// Запускаем таймер только после нажатия кнопки
document.querySelector("#startCountdown").addEventListener("click", function() {
    clearInterval(timerId);
    timerId = setInterval(birthdayCountDown, 1000);
});


let timerId = setInterval (birthdayCountDown, 1000);

function happyBirthday () {
    const heading = document.querySelector ("h1");
    heading.textContent = "Happy Birthday!!!";
    heading.classList.add ("red");
    showFireworks();
}

const button = document.querySelector ("#playButton");
const audio = document.querySelector("#myAudio");


button.addEventListener("click", () => {

  audio.paused ? audio.play() : audio.pause();

  button.classList.toggle("pause");

  });


function showFireworks() {
  const container = document.getElementById("fireworks-container");
  for (let i = 0; i < 30; i++) {
    const firework = document.createElement("div");
    firework.classList.add("firework");

    // случайная позиция
    firework.style.left = Math.random() * window.innerWidth + "px";
    firework.style.top = Math.random() * window.innerHeight + "px";

    // случайный цвет
    const colors = ["#ff0000", "#00ff00", "#ffff00", "#00ffff", "#ff00ff", "#ff8800"];
    firework.style.background = colors[Math.floor(Math.random() * colors.length)];

    container.appendChild(firework);

    // удаляем через секунду, чтобы не засорять DOM
    setTimeout(() => firework.remove(), 1000);
  }
}