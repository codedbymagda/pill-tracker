const form = document.getElementById("pill-form");
const pillList = document.getElementById("pill-list");

let pills = JSON.parse(localStorage.getItem("pills")) || [];

function renderPills() {
  pillList.innerHTML = "";
  pills.forEach((pill, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${pill.name}</strong> - ${pill.dosage} at ${pill.time}
      <button onclick="markTaken(${index})">${pill.taken ? 'Taken' : 'Mark as Taken'}</button>
    `;
    if (pill.taken) li.classList.add("taken");
    pillList.appendChild(li);
  });
}

function savePills() {
  localStorage.setItem("pills", JSON.stringify(pills));
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("pill-name").value;
  const dosage = document.getElementById("dosage").value;
  const time = document.getElementById("time").value;

  pills.push({ name, dosage, time, taken: false });
  savePills();
  renderPills();

  form.reset();
});

function markTaken(index) {
  pills[index].taken = !pills[index].taken;
  savePills();
  renderPills();
}

renderPills();
