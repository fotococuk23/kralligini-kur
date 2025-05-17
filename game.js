let wood = 100;
let stone = 100;
let gold = 0;

let woodLevel = 0;
let stoneLevel = 0;
let soldiers = 0;

function updateResources() {
  document.getElementById('wood').textContent = wood;
  document.getElementById('stone').textContent = stone;
  document.getElementById('gold').textContent = gold;
  animateResource("wood");
  animateResource("stone");
  animateResource("gold");
  updateSoldiers();
  updateBuildingUI();
}

function produceResources() {
  wood += woodLevel * 5;
  stone += stoneLevel * 5;
  gold += 1;
  updateResources();
}

function upgradeBuilding(type) {
  if (type === 'wood' && wood >= 100) {
    wood -= 100;
    woodLevel++;
  } else if (type === 'stone' && stone >= 100) {
    stone -= 100;
    stoneLevel++;
  } else {
    alert("Yeterli kaynak yok!");
    return;
  }
  updateResources();
  updateBuildingUI();
}

function updateBuildingUI() {
  document.getElementById('woodLevel').textContent = woodLevel;
  document.getElementById('stoneLevel').textContent = stoneLevel;
}

function trainSoldier() {
  if (wood >= 30 && gold >= 20) {
    wood -= 30;
    gold -= 20;
    soldiers++;
    updateSoldiers();
    updateResources();
  } else {
    alert("Yeterli kaynak yok!");
  }
}

function updateSoldiers() {
  document.getElementById('soldiers').textContent = soldiers;
}

function attackBarbarian() {
  const barbarianPower = Math.floor(Math.random() * 10) + 1;
  const battleLog = document.getElementById('battleLog');

  if (soldiers >= barbarianPower) {
    const loot = Math.floor(Math.random() * 50) + 10;
    gold += loot;
    soldiers -= barbarianPower;
    battleLog.textContent = `Zafer! ${barbarianPower} barbarı yendin. ${loot} altın kazandın!`;
  } else {
    const loss = Math.min(soldiers, Math.floor(Math.random() * 3) + 1);
    soldiers -= loss;
    battleLog.textContent = `Kaybettin! ${loss} askerin öldü.`;
  }

  updateSoldiers();
  updateResources();
}

setInterval(produceResources, 1000);
updateResources();

function saveGame() {
  const data = {
    wood,
    stone,
    gold,
    woodLevel,
    stoneLevel,
    soldiers
  };
  localStorage.setItem('krallikData', JSON.stringify(data));
  alert("Oyun kaydedildi!");
}

function loadGame() {
  const saved = localStorage.getItem('krallikData');
  if (saved) {
    const data = JSON.parse(saved);
    wood = data.wood;
    stone = data.stone;
    gold = data.gold;
    woodLevel = data.woodLevel;
    stoneLevel = data.stoneLevel;
    soldiers = data.soldiers;
    updateResources();
    alert("Oyun yüklendi!");
  } else {
    alert("Kayıt bulunamadı!");
  }
}

function resetGame() {
  if (confirm("Oyunu sıfırlamak istediğine emin misin?")) {
    localStorage.removeItem('krallikData');
    wood = 100;
    stone = 100;
    gold = 0;
    woodLevel = 0;
    stoneLevel = 0;
    soldiers = 0;
    updateResources();
    alert("Oyun sıfırlandı.");
  }
}
function animateResource(id) {
  const el = document.getElementById(id);
  el.classList.add("pulse");
  setTimeout(() => el.classList.remove("pulse"), 400);
}

function attackBarbarian() {
  const barbarianPower = Math.floor(Math.random() * 10) + 1;
  const battleLog = document.getElementById('battleLog');

  document.querySelector(".battle").classList.add("hit");
  setTimeout(() => {
    document.querySelector(".battle").classList.remove("hit");
  }, 300);

  if (soldiers >= barbarianPower) {
    const loot = Math.floor(Math.random() * 50) + 10;
    gold += loot;
    soldiers -= barbarianPower;
    battleLog.textContent = `Zafer! ${barbarianPower} barbarı yendin. ${loot} altın kazandın!`;
  } else {
    const loss = Math.min(soldiers, Math.floor(Math.random() * 3) + 1);
    soldiers -= loss;
    battleLog.textContent = `Kaybettin! ${loss} askerin öldü.`;
  }

  updateSoldiers();
  updateResources();
}
