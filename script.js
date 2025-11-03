const quests = [
  { id: 1, title: "20 Pompes" },
  { id: 2, title: "30 Squats" },
  { id: 3, title: "5 min de gainage" },
  { id: 4, title: "15 min de course" },
  { id: 5, title: "Étirements complets" },
];

const questsContainer = document.getElementById("quests");
const completedCount = document.getElementById("completed");
const totalCount = document.getElementById("total");
const resetBtn = document.getElementById("reset");

let progress = JSON.parse(localStorage.getItem("solo_quests")) || {};

function renderQuests() {
  questsContainer.innerHTML = "";
  quests.forEach((q) => {
    const quest = document.createElement("div");
    quest.classList.add("quest");
    if (progress[q.id]) quest.classList.add("completed");

    quest.innerHTML = `
      <span>${q.title}</span>
      <button>${progress[q.id] ? "☑️" : "⬜"}</button>
    `;

    quest
      .querySelector("button")
      .addEventListener("click", () => toggleQuest(q.id));
    questsContainer.appendChild(quest);
  });

  updateStats();
}

function toggleQuest(id) {
  progress[id] = !progress[id];
  localStorage.setItem("solo_quests", JSON.stringify(progress));
  renderQuests();
}

function updateStats() {
  const completed = Object.values(progress).filter(Boolean).length;
  completedCount.textContent = completed;
  totalCount.textContent = quests.length;
}

resetBtn.addEventListener("click", () => {
  progress = {};
  localStorage.setItem("solo_quests", JSON.stringify(progress));
  renderQuests();
});

renderQuests();
