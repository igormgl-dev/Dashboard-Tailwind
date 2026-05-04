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
