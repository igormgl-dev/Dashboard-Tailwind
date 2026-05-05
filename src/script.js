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

// Appointment functions

function addAppointment(event) {
  event.preventDefault();

  //   Valores
  const client = document.getElementById("client").value;
  const service = document.getElementById("service").value;
  const rawDate = document.getElementById("date").value;
  const status = document.getElementById("status").value;
  const [year, month, day] = rawDate.split("-");
  const date = `${day}/${month}/${year}`;

  let statusClass = "";
  let statusText = "";

  if (status === "confirmado") {
    statusClass = "bg-green-500/20 text-green-400";
    statusText = "Confirmado";
  } else if (status === "pendente") {
    statusClass = "bg-yellow-500/20 text-yellow-400";
    statusText = "Pendente";
  } else if (status === "cancelado") {
    statusClass = "bg-red-500/20 text-red-400";
    statusText = "Cancelado";
  }

  //   Tabela
  const table = document.getElementById("appointmentsTable");

  //   Linha
  const newRow = document.createElement("tr");
  newRow.classList.add("border-b", "border-zinc-700");

  //   Conteúdo da Linha
  newRow.innerHTML = `
<td class="py-3">${client}</td>
<td class="py-3">${service}</td>
<td class="py-3">${date}</td>
<td>
<span class="${statusClass} px-3 py-1 rounded-lg text-sm">${statusText}</span>
</td>
`;

  // Adicionar linha à tabela
  table.appendChild(newRow);

  //   Limpar formulário
  document.getElementById("client").value = "";
  document.getElementById("service").value = "";
  document.getElementById("date").value = "";

  // Fechar modal
  closeModal();
}
