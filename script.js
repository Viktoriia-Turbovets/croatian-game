const categories = {
  greetings: [
    {hr: "Dobar dan", ua: "Добрий день"},
    {hr: "Hvala", ua: "Дякую"},
    {hr: "Molim", ua: "Будь ласка"},
    {hr: "Da", ua: "Так"},
    {hr: "Ne", ua: "Ні"},
    {hr: "Oprostite", ua: "Вибачте"},
    {hr: "Izvolite", ua: "Ось, будь ласка"},
    {hr: "Zdravo", ua: "Привіт"},
    {hr: "Doviđenja", ua: "До побачення"},
    {hr: "Lijepo", ua: "Гарно"},
    {hr: "Kako si?", ua: "Як ти?"},
    {hr: "Dobro jutro", ua: "Доброго ранку"},
    {hr: "Laku noć", ua: "На добраніч"},
    {hr: "Što radiš?", ua: "Що робиш?"},
    {hr: "Razumijem", ua: "Розумію"}
  ],
  food: [
    {hr: "Voda", ua: "Вода"},
    {hr: "Kruh", ua: "Хліб"},
    {hr: "Sir", ua: "Сир"},
    {hr: "Mlijeko", ua: "Молоко"},
    {hr: "Juha", ua: "Суп"},
    {hr: "Riba", ua: "Риба"},
    {hr: "Piletina", ua: "Курка"},
    {hr: "Voće", ua: "Фрукти"},
    {hr: "Povrće", ua: "Овочі"},
    {hr: "Kava", ua: "Кава"},
    {hr: "Čaj", ua: "Чай"},
    {hr: "Sok", ua: "Сік"},
    {hr: "Sladoled", ua: "Морозиво"},
    {hr: "Torta", ua: "Торт"},
    {hr: "Jaje", ua: "Яйце"}
  ],
  travel: [
    {hr: "Gdje je WC?", ua: "Де туалет?"},
    {hr: "Koliko to košta?", ua: "Скільки це коштує?"},
    {hr: "Mogu li pomoći?", ua: "Можу я допомогти?"},
    {hr: "Sretan put", ua: "Щасливої дороги"},
    {hr: "Gdje mogu naći restoran?", ua: "Де я можу знайти ресторан?"},
    {hr: "Koliko traje putovanje?", ua: "Скільки триває подорож?"},
    {hr: "Koje je tvoje ime?", ua: "Як тебе звати?"},
    {hr: "Ja sam umoran", ua: "Я втомився"},
    {hr: "Moram ići", ua: "Мені треба йти"},
    {hr: "Veselim se sutra", ua: "Радий завтрашньому дню"},
    {hr: "Možeš li ponoviti?", ua: "Можеш повторити?"},
    {hr: "Autobusna stanica", ua: "Автобусна зупинка"},
    {hr: "Vlak", ua: "Поїзд"},
    {hr: "Zračna luka", ua: "Аеропорт"},
    {hr: "Karta", ua: "Квиток"}
  ],
  weather: [
    {hr: "Sunce", ua: "Сонце"},
    {hr: "Kiša", ua: "Дощ"},
    {hr: "Snijeg", ua: "Сніг"},
    {hr: "Vjetar", ua: "Вітер"},
    {hr: "Oblaci", ua: "Хмари"},
    {hr: "Hladno", ua: "Холодно"},
    {hr: "Toplo", ua: "Тепло"},
    {hr: "Jesen", ua: "Осінь"},
    {hr: "Zima", ua: "Зима"},
    {hr: "Ljeto", ua: "Літо"},
    {hr: "Proljeće", ua: "Весна"}
  ],
  family: [
    {hr: "Otac", ua: "Батько"},
    {hr: "Majka", ua: "Мати"},
    {hr: "Brat", ua: "Брат"},
    {hr: "Sestra", ua: "Сестра"},
    {hr: "Dijete", ua: "Дитина"},
    {hr: "Baka", ua: "Бабуся"},
    {hr: "Djed", ua: "Дідусь"},
    {hr: "Rođak", ua: "Родич"},
    {hr: "Obitelj", ua: "Сім’я"}
  ],
  professions: [
    {hr: "Liječnik", ua: "Лікар"},
    {hr: "Učitelj", ua: "Вчитель"},
    {hr: "Inženjer", ua: "Інженер"},
    {hr: "Policajac", ua: "Поліцейський"},
    {hr: "Vatrogasac", ua: "Пожежник"},
    {hr: "Kuhar", ua: "Кухар"},
    {hr: "Student", ua: "Студент"},
    {hr: "Umjetnik", ua: "Митець"},
    {hr: "Pjevač", ua: "Співак"}
  ],
  animals: [
    {hr: "Pas", ua: "Собака"},
    {hr: "Mačka", ua: "Кішка"},
    {hr: "Ptica", ua: "Птах"},
    {hr: "Konj", ua: "Кінь"},
    {hr: "Riba", ua: "Риба"},
    {hr: "Slon", ua: "Слон"},
    {hr: "Zec", ua: "Кролик"},
    {hr: "Krava", ua: "Корова"}
  ],
  clothes: [
    {hr: "Košulja", ua: "Сорочка"},
    {hr: "Hlače", ua: "Штани"},
    {hr: "Haljina", ua: "Сукня"},
    {hr: "Kaput", ua: "Пальто"},
    {hr: "Čarape", ua: "Шкарпетки"},
    {hr: "Cipele", ua: "Взуття"},
    {hr: "Kapa", ua: "Кепка"},
    {hr: "Rukavice", ua: "Рукавички"}
  ],
  colors: [
    {hr: "Crvena", ua: "Червоний"},
    {hr: "Plava", ua: "Синій"},
    {hr: "Zelena", ua: "Зелений"},
    {hr: "Žuta", ua: "Жовтий"},
    {hr: "Crna", ua: "Чорний"},
    {hr: "Bijela", ua: "Білий"},
    {hr: "Smeđa", ua: "Коричневий"},
    {hr: "Narančasta", ua: "Помаранчевий"}
  ],
  school: [
    {hr: "Knjiga", ua: "Книга"},
    {hr: "Olovka", ua: "Олівець"},
    {hr: "Bilježnica", ua: "Зошит"},
    {hr: "Učitelj", ua: "Вчитель"},
    {hr: "Učenik", ua: "Учень"},
    {hr: "Škola", ua: "Школа"},
    {hr: "Stolica", ua: "Стілець"},
    {hr: "Ploča", ua: "Дошка"}
  ]
};

// ====== Змінні гри ======
let currentWord = {};
let score = 0;
let combo = 0;
let level = 1; // 1 - простий, 2 - середній, 3 - складний
let timer;
let timeLeft = 15;
let highscore = 0;
let currentCategory = 'greetings';
let usedWords = [];
let translationDirection = 'hr-to-ua';

const soundCorrect = document.getElementById('sound-correct');
const soundWrong = document.getElementById('sound-wrong');

// ====== Функції зміни категорії, напрямку та рівня ======
function changeCategory() {
  currentCategory = document.getElementById('category').value;
  usedWords = [];
  updateProgress();
  document.getElementById('word-card').textContent = 'Натисніть "Нова гра"';
  document.getElementById('options').innerHTML = '';
}

function changeDirection() {
  translationDirection = document.getElementById('translation-direction').value;
  document.getElementById('word-card').textContent = 'Натисніть "Нова гра"';
  document.getElementById('options').innerHTML = '';
}

function changeLevel() {
  level = parseInt(document.getElementById('level').value);
  document.getElementById('word-card').textContent = 'Натисніть "Нова гра"';
  document.getElementById('options').innerHTML = '';
}

// ====== Функція вибору наступного слова ======
function nextWord() {
  clearInterval(timer);
  timeLeft = 15;
  updateTimer();

  const wordsArray = categories[currentCategory];
  if (usedWords.length === wordsArray.length) {
    endGame();
    return;
  }

  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * wordsArray.length);
  } while (usedWords.includes(randomIndex));

  currentWord = wordsArray[randomIndex];
  usedWords.push(randomIndex);
  updateProgress();

  document.getElementById('feedback').textContent = '';
  document.getElementById('options').innerHTML = '';

  let questionWord = translationDirection === 'hr-to-ua' ? currentWord.hr : currentWord.ua;
  showWordWithAnimation(questionWord);

  createOptions();
  startTimer();
}


// ====== Функція створення варіантів відповіді ======
function createOptions() {
  const optionsContainer = document.getElementById('options');

  // Встановлюємо кількість варіантів відповідно до рівня
  let optionsCount = 4; // складний
  if (level === 1) optionsCount = 2; // простий
  else if (level === 2) optionsCount = 3; // середній

  
  const allWords = [].concat(...Object.values(categories));
  const answersSet = new Set();
  let correctAnswer = translationDirection === 'hr-to-ua' ? currentWord.ua : currentWord.hr;
  let questionWord = translationDirection === 'hr-to-ua' ? currentWord.hr : currentWord.ua;
  document.getElementById('word-card').textContent = questionWord;
  answersSet.add(correctAnswer);

  while (answersSet.size < optionsCount) {
    const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
    const answer = translationDirection === 'hr-to-ua' ? randomWord.ua : randomWord.hr;
    answersSet.add(answer);
  }

  const shuffled = Array.from(answersSet).sort(() => Math.random() - 0.5);
  shuffled.forEach((answer, index) => {
    const btn = document.createElement('button');
    btn.textContent = answer;
    btn.classList.add('option-btn');
    btn.onclick = () => selectAnswer(btn, correctAnswer);
    optionsContainer.appendChild(btn);
    setTimeout(() => btn.classList.add('show'), index * 100);
  });
}

// ====== Вибір відповіді ======
function selectAnswer(btn, correctAnswer) {
  document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);

  if (btn.textContent === correctAnswer) {
    btn.classList.add('correct');
    document.getElementById('feedback').textContent = "Правильно!";
    document.getElementById('feedback').style.color = "green";
    score++;
    combo++;
    soundCorrect.play();
  } else {
    btn.classList.add('wrong');
    document.getElementById('feedback').textContent = `Неправильно. Правильна відповідь: ${correctAnswer}`;
    document.getElementById('feedback').style.color = "red";
    combo = 0;
    soundWrong.play();
  }

  document.getElementById('score').textContent = `Рахунок: ${score}`;
  document.getElementById('combo').textContent = `Серія правильних відповідей: ${combo}`;

  setTimeout(() => nextWord(), 1000);
}

// ====== Таймер ======
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timer);
      combo = 0;
      document.getElementById('combo').textContent = `Серія правильних відповідей: ${combo}`;
      const correctAnswer = translationDirection === 'hr-to-ua' ? currentWord.ua : currentWord.hr;
      document.getElementById('feedback').textContent = `Час вийшов! Правильна відповідь: ${correctAnswer}`;
      document.getElementById('feedback').style.color = "red";
      document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
      soundWrong.play();
      setTimeout(() => nextWord(), 1000);
    }
  }, 1000);
}

function updateTimer() {
  const width = (timeLeft / 15) * 100;
  document.getElementById('timer-bar').style.width = width + "%";
}

// ====== Прогрес ======
function updateProgress() {
  const total = categories[currentCategory].length;
  const progressPercent = (usedWords.length / total) * 100;
  document.getElementById('progress-bar').style.width = progressPercent + "%";
}

// ====== Кінець гри ======
function endGame() {
  clearInterval(timer);
  if (score > highscore) highscore = score;
  document.getElementById('highscore').textContent = highscore;

  document.getElementById('final-result').textContent = `Гра завершена! Ваш рахунок: ${score}. Найдовша серія правильних відповідей: ${combo}`;
  document.getElementById('word-card').textContent = '';
  document.getElementById('options').innerHTML = '';
  document.getElementById('feedback').textContent = '';
  document.getElementById('timer-bar').style.width = "100%";
  document.getElementById('progress-bar').style.width = "100%";
}

// ====== Нова гра ======
function startNewGame() {
  score = 0;
  combo = 0;
  usedWords = [];
  document.getElementById('score').textContent = `Рахунок: ${score}`;
  document.getElementById('combo').textContent = `Серія правильних відповідей: ${combo}`;
  document.getElementById('final-result').textContent = '';
  nextWord();
}

// ====== Анімація слова ======
function showWordWithAnimation(word) {
  const wordCard = document.getElementById('word-card');
  wordCard.style.opacity = 0;
  wordCard.style.transform = 'translateY(-20px)';
  
  setTimeout(() => {
    wordCard.textContent = word;
    wordCard.style.opacity = 1;
    wordCard.style.transform = 'translateY(0)';
  }, 300);
}