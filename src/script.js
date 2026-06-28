// Local Storage

let appointments = [];

// Modal functions

function openModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

function handleOutsideClick(event) {
  const modal = document.getElementById("modal");

  if (event.target === modal) {
    closeModal();
  }
}

// Render Appointment

function renderAppointment(appointment) {
  const table = document.getElementById("appointmentsTable");

  let statusClass = "";
  let statusText = "";

  if (appointment.status === "confirmado") {
    statusClass = "bg-green-500/20 text-green-400";
    statusText = "Confirmado";
  } else if (appointment.status === "pendente") {
    statusClass = "bg-yellow-500/20 text-yellow-400";
    statusText = "Pendente";
  } else {
    statusClass = "bg-red-500/20 text-red-400";
    statusText = "Cancelado";
  }

  const newRow = document.createElement("tr");
  newRow.classList.add("border-b", "border-zinc-700");

  newRow.innerHTML = `
<td class="py-3">${appointment.client}</td>
<td class="py-3">${appointment.service}</td>
<td class="py-3">${appointment.date}</td>
<td>
<span class="${statusClass} px-3 py-1 rounded-lg text-sm">${statusText}</span>
</td>
<td><button onclick="deleteAppointment(${appointment.id})">🗑️</button></td>
`;

  table.appendChild(newRow);
}

// Add appointment

function addAppointment(event) {
  event.preventDefault();

  const client = document.getElementById("client").value;
  const service = document.getElementById("service").value;
  const rawDate = document.getElementById("date").value;
  const status = document.getElementById("status").value;
  const [year, month, day] = rawDate.split("-");
  const date = `${day}/${month}/${year}`;

  const appointment = {
    id: Date.now(),
    client,
    service,
    date,
    status,
  };

  appointments.push(appointment);
  localStorage.setItem("appointments", JSON.stringify(appointments));
  renderAppointment(appointment);
}

// Clear form

document.getElementById("client").value = "";
document.getElementById("service").value = "";
document.getElementById("date").value = "";
document.getElementById("status").value = "confirmado";

closeModal();

// Load appointments

function renderAllAppointments() {
  const table = document.getElementById("appointmentsTable");

  table.innerHTML = "";

  appointments.forEach((appointment) => {
    renderAppointment(appointment);
  });
}

window.onload = function () {
  const savedAppointments = localStorage.getItem("appointments");

  if (savedAppointments) {
    appointments = JSON.parse(savedAppointments);

    appointments.forEach((appointment) => {
      renderAppointment(appointment);
    });
  }
};

// Delete appointment

function deleteAppointment(id) {
  const confirmDelete = confirm("Deseja excluir este agendamento?");
  if (!confirmDelete) return;

  appointments = appointments.filter((appointment) => appointment.id !== id);
  localStorage.setItem("appointments", JSON.stringify(appointments));
  console.log(appointments);
  renderAllAppointments();
}
