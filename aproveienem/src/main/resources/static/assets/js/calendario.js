console.log("JS CERTO EXECUTANDO");
const diasDaSemana = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado"
];

const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    todayBtn = document.querySelector(".today-btn"),
    gotoBtn = document.querySelector(".goto-btn"),
    dateInput = document.querySelector(".date-input"),
    eventDay = document.querySelector(".event-day"),
    eventDate = document.querySelector(".event-date"),
    eventsContainer = document.querySelector(".events"),
    addEventBtn = document.querySelector(".add-event"),
    addEventWrapper = document.querySelector(".add-event-wrapper"),
    addEventCloseBtn = document.querySelector(".close"),
    addEventTitle = document.querySelector(".event-name"),
    addEventFrom = document.querySelector(".event-time-from"),
    addEventTo = document.querySelector(".event-time-to"),
    addEventSubmit = document.querySelector(".add-event-btn");

const body = document.querySelector("body");
const darkLight = document.querySelector("#darkLight");
const sidebar = document.querySelector(".sidebar");
const submenuItems = document.querySelectorAll(".submenu_item");
const sidebarOpen = document.querySelector("#sidebarOpen");
const sidebarClose = document.querySelector(".collapse_sidebar");
const sidebarExpand = document.querySelector(".expand_sidebar");

sidebarOpen.addEventListener("click", () =>
    sidebar.classList.toggle("close")
);

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const eventsArr = [];

/* =========================
   CARREGAR EVENTOS DO BANCO
========================= */

async function carregarEventos() {

  try {

    const resposta = await fetch("http://localhost:8080/evento");

    const dados = await resposta.json();

    eventsArr.length = 0;

    dados.forEach((evento) => {

      eventsArr.push({
        id: evento.id,
        day: Number(evento.dia),
        month: Number(evento.mes),
        year: Number(evento.ano),
        events: [
          {
            id: evento.id,
            title: evento.titulo,
            time: evento.horario
          }
        ]
      });

    });

    initCalendar();

  } catch (erro) {

    console.log("Erro ao carregar eventos", erro);

  }

}

carregarEventos();

/* =========================
   INICIAR CALENDÁRIO
========================= */

function initCalendar() {

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);

  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let x = day; x > 0; x--) {

    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;

  }

  for (let i = 1; i <= lastDate; i++) {

    let event = false;

    eventsArr.forEach((eventObj) => {

      if (
          eventObj.day === i &&
          eventObj.month === month + 1 &&
          eventObj.year === year
      ) {
        event = true;
      }

    });

    if (
        i === new Date().getDate() &&
        year === new Date().getFullYear() &&
        month === new Date().getMonth()
    ) {

      activeDay = i;

      getActiveDay(i);
      updateEvents(i);

      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }

    } else {

      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day">${i}</div>`;
      }

    }

  }

  for (let j = 1; j <= nextDays; j++) {

    days += `<div class="day next-date">${j}</div>`;

  }

  daysContainer.innerHTML = days;

  addListner();

}

/* =========================
   MUDAR MÊS
========================= */

function prevMonth() {

  month--;

  if (month < 0) {

    month = 11;
    year--;

  }

  initCalendar();

}

function nextMonth() {

  month++;

  if (month > 11) {

    month = 0;
    year++;

  }

  initCalendar();

}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

/* =========================
   CLICK NOS DIAS
========================= */

function addListner() {

  const days = document.querySelectorAll(".day");

  days.forEach((day) => {

    day.addEventListener("click", (e) => {

      activeDay = Number(e.target.innerHTML);

      getActiveDay(activeDay);

      updateEvents(activeDay);

      days.forEach((day) => {

        day.classList.remove("active");

      });

      e.target.classList.add("active");

    });

  });

}

/* =========================
   BOTÃO HOJE
========================= */

todayBtn.addEventListener("click", () => {

  today = new Date();

  month = today.getMonth();
  year = today.getFullYear();

  initCalendar();

});

/* =========================
   IR PARA DATA
========================= */

dateInput.addEventListener("input", (e) => {

  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");

  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }

});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {

  const dateArr = dateInput.value.split("/");

  if (dateArr.length === 2) {

    if (
        dateArr[0] > 0 &&
        dateArr[0] < 13 &&
        dateArr[1].length === 4
    ) {

      month = dateArr[0] - 1;
      year = dateArr[1];

      initCalendar();

      return;

    }

  }

  alert("Data inválida");

}

/* =========================
   MOSTRAR DIA
========================= */

function getActiveDay(dateNumber) {

  const day = new Date(year, month, dateNumber);

  const dayName = diasDaSemana[day.getDay()];

  eventDay.innerHTML = dayName;

  eventDate.innerHTML =
      dateNumber + " " + months[month] + " " + year;

}

/* =========================
   MOSTRAR EVENTOS
========================= */
function updateEvents(date) {

  let events = "";

  eventsArr.forEach((event) => {

    if (
        date === event.day &&
        month + 1 === event.month &&
        year === event.year
    ) {

      event.events.forEach((event) => {

        events += `
        <div class="event">

          <div class="title">
            <i class="fas fa-circle"></i>
            <h3 class="event-title">${event.title}</h3>
          </div>

          <div class="event-time">
            <span>${event.time}</span>
          </div>

          <div class="event-buttons">

            <button class="edit-btn">
              Editar
            </button>

          </div>

        </div>
        `;

      });

    }

  });

  if (events === "") {

    events = `
      <div class="no-event">
        <h3>Nenhum Evento</h3>
      </div>
    `;

  }

  eventsContainer.innerHTML = events;

}

/* =========================
   ABRIR MODAL
========================= */

addEventBtn.addEventListener("click", () => {

  addEventWrapper.classList.toggle("active");

});

addEventCloseBtn.addEventListener("click", () => {

  addEventWrapper.classList.remove("active");

});

/* =========================
   LIMITAR TÍTULO
========================= */

addEventTitle.addEventListener("input", () => {

  addEventTitle.value =
      addEventTitle.value.slice(0, 60);

});

/* =========================
   FORMATAR HORÁRIO
========================= */

addEventFrom.addEventListener("input", () => {

  addEventFrom.value =
      addEventFrom.value.replace(/[^0-9:]/g, "");

  if (addEventFrom.value.length === 2) {

    addEventFrom.value += ":";

  }

});

addEventTo.addEventListener("input", () => {

  addEventTo.value =
      addEventTo.value.replace(/[^0-9:]/g, "");

  if (addEventTo.value.length === 2) {

    addEventTo.value += ":";

  }

});

/* =========================
   ADICIONAR EVENTO
========================= */

/* =========================
   ADICIONAR EVENTO
========================= */

addEventSubmit.addEventListener("click", async () => {

  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;

  if (
      eventTitle === "" ||
      eventTimeFrom === "" ||
      eventTimeTo === ""
  ) {

    alert("Preencha todos os campos");
    return;

  }

  const regexHora = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;

  if (
      !regexHora.test(eventTimeFrom) ||
      !regexHora.test(eventTimeTo)
  ) {

    alert("Digite a hora no formato 08:30");
    return;

  }

  const timeFrom = convertTime(eventTimeFrom);
  const timeTo = convertTime(eventTimeTo);

  try {

    const resposta = await fetch("http://localhost:8080/evento", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        titulo: eventTitle,

        horario: timeFrom + " - " + timeTo,

        dia: activeDay,

        mes: month + 1,

        ano: year

      })

    });

    const dados = await resposta.json();

    console.log("SALVO NO BANCO:", dados);

    if (!resposta.ok) {

      alert("Erro ao salvar");
      return;

    }

    alert("Evento salvo com sucesso!");

    addEventWrapper.classList.remove("active");

    addEventTitle.value = "";
    addEventFrom.value = "";
    addEventTo.value = "";

    carregarEventos();

  } catch (erro) {

    console.log("ERRO:", erro);

    alert("Erro no servidor");

  }

});

/* =========================
   DELETAR EVENTO
========================= */

eventsContainer.addEventListener("click", async (e) => {

  const eventoDiv = e.target.closest(".event");

  if (!eventoDiv) return;

  const titulo =
      eventoDiv.querySelector(".event-title").innerText;

  const eventoEncontrado = eventsArr.find((evento) =>

      evento.day === activeDay &&
      evento.month === month + 1 &&
      evento.year === year &&
      evento.events.some(ev => ev.title === titulo)

  );

  if (!eventoEncontrado) return;

  const eventoInterno =
      eventoEncontrado.events.find(ev => ev.title === titulo);

  /* =========================
     EDITAR EVENTO
  ========================= */

  if (e.target.classList.contains("edit-btn")) {

    const novoTitulo =
        prompt("Digite o novo título:", eventoInterno.title);

    if (!novoTitulo) return;

    const horarioAtual =
        eventoInterno.time.split(" - ");

    const novoHorarioInicio =
        prompt(
            "Digite novo horário inicial:",
            horarioAtual[0]
        );

    if (!novoHorarioInicio) return;

    const novoHorarioFim =
        prompt(
            "Digite novo horário final:",
            horarioAtual[1]
        );

    if (!novoHorarioFim) return;

    try {

      const resposta = await fetch(
          `http://localhost:8080/evento/${eventoInterno.id}`,
          {

            method: "PUT",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify({

              titulo: novoTitulo,

              horario:
                  novoHorarioInicio + " - " + novoHorarioFim,
              dia: activeDay,

              mes: month + 1,

              ano: year

            })

          }
      );

      if (!resposta.ok) {

        alert("Erro ao atualizar");
        return;

      }

      alert("Evento atualizado!");

      carregarEventos();

    } catch (erro) {

      console.log(erro);

    }

    return;

  }

  /* =========================
     DELETAR EVENTO
  ========================= */

  if (confirm("Deseja deletar esse evento?")) {

    try {

      await fetch(
          `http://localhost:8080/evento/${eventoInterno.id}`,
          {
            method: "DELETE"
          }
      );

      carregarEventos();

    } catch (erro) {

      console.log(erro);

    }

  }

});
/* =========================
   CONVERTER HORA
========================= */

function convertTime(time) {

  let timeArr = time.split(":");

  let timeHour = timeArr[0];
  let timeMin = timeArr[1];

  let timeFormat = timeHour >= 12 ? "PM" : "AM";

  timeHour = timeHour % 12 || 12;

  time = timeHour + ":" + timeMin + " " + timeFormat;

  return time;

}

/* =========================
   SIDEBAR
========================= */

sidebarClose.addEventListener("click", () => {

  sidebar.classList.add("close", "hoverable");

});

sidebarExpand.addEventListener("click", () => {

  sidebar.classList.remove("close", "hoverable");

});

sidebar.addEventListener("mouseenter", () => {

  if (sidebar.classList.contains("hoverable")) {

    sidebar.classList.remove("close");

  }

});

sidebar.addEventListener("mouseleave", () => {

  if (sidebar.classList.contains("hoverable")) {

    sidebar.classList.add("close");

  }

});

darkLight.addEventListener("click", () => {

  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {

    darkLight.classList.replace("bx-sun", "bx-moon");

  } else {

    darkLight.classList.replace("bx-moon", "bx-sun");

  }

});

submenuItems.forEach((item, index) => {

  item.addEventListener("click", () => {

    item.classList.toggle("show_submenu");

    submenuItems.forEach((item2, index2) => {

      if (index !== index2) {

        item2.classList.remove("show_submenu");

      }

    });

  });

});

if (window.innerWidth < 768) {

  sidebar.classList.add("close");

} else {

  sidebar.classList.remove("close");

}