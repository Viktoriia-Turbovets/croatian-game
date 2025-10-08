// Змінні гри
let currentWord = {};
let score = 0;
let combo = 0;
let level = 1;
let timer;
let timeLeft = 15;
let highscore = 0;
let currentCategory = 'greetings';
let usedWords = [];
let translationDirection = 'hr-to-ua';


const soundCorrect = document.getElementById('sound-correct');
const soundWrong = document.getElementById('sound-wrong');

// ====== Функція озвучки ======
// ====== Вимикаємо озвучку на мобільних ======
const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

if(isMobile){
  // Заглушити аудіо
  soundCorrect.muted = true;
  soundWrong.muted = true;

  // Переписати speakWord, щоб на мобільних не відтворювався звук
  speakWord = function(word){
    // нічого не робимо на мобільних
  };
} else {
  // На десктопі залишаємо озвучку працювати як раніше
  speakWord = function(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'hr-HR'; // хорватська
    speechSynthesis.speak(utterance);
  };
}

function speakWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'hr-HR'; // хорватська
  speechSynthesis.speak(utterance);
}


// Дані для категорій
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
    {hr: "Laku noć", ua: "На добраніч"},
    {hr: "Dobro jutro", ua: "Доброго ранку"},
    {hr: "Kako si?", ua: "Як ти?"},
    {hr: "Što radiš?", ua: "Що робиш?"},
    {hr: "Vidimo se", ua: "Побачимося"},
    {hr: "Ugodan dan", ua: "Гарного дня"},
    {hr: "Sve najbolje", ua: "Усього найкращого"},
    {hr: "Sretno", ua: "Успіху"},
    {hr: "Dobrodošli", ua: "Ласкаво просимо"},
    {hr: "Čestitam", ua: "Вітаю"},
    {hr: "Kako ste?", ua: "Як ви?"},
    {hr: "Drago mi je", ua: "Радий зустрічі"},
    {hr: "Lijepo vas je vidjeti", ua: "Приємно вас бачити"},
    {hr: "Pozdrav", ua: "Вітання"},
    {hr: "Dobar večer", ua: "Добрий вечір"}
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
    {hr: "Jaje", ua: "Яйце"},
    {hr: "Meso", ua: "М’ясо"},
    {hr: "Riba na žaru", ua: "Риба на грилі"},
    {hr: "Palačinke", ua: "Млинці"},
    {hr: "Keksi", ua: "Печиво"},
    {hr: "Mlijčni proizvodi", ua: "Молочні продукти"},
    {hr: "Salata", ua: "Салат"},
    {hr: "Juha od povrća", ua: "Овочевий суп"},
    {hr: "Pizza", ua: "Піца"},
    {hr: "Hamburger", ua: "Гамбургер"},
    {hr: "Kobasica", ua: "Ковбаса"}
  ],

  travel: [
    {hr: "Gdje je WC?", ua: "Де туалет?"},
    {hr: "Koliko to košta?", ua: "Скільки це коштує?"},
    {hr: "Mogu li pomoći?", ua: "Можу я допомогти?"},
    {hr: "Sretan put", ua: "Щасливої дороги"},
    {hr: "Gdje mogu naći restoran?", ua: "Де я можу знайти ресторан?"},
    {hr: "Koliko traje putovanje?", ua: "Скільки триває подорож?"},
    {hr: "Kako se zoveš?", ua: "Як тебе звати?"},
    {hr: "Ja sam umoran", ua: "Я втомився"},
    {hr: "Moram ići", ua: "Мені треба йти"},
    {hr: "Veselim se sutra", ua: "Радий завтрашньому дню"},
    {hr: "Možeš li ponoviti?", ua: "Можеш повторити?"},
    {hr: "Autobusna stanica", ua: "Автобусна зупинка"},
    {hr: "Vlak", ua: "Поїзд"},
    {hr: "Zračna luka", ua: "Аеропорт"},
    {hr: "Karta", ua: "Квиток"},
    {hr: "Hotel", ua: "Готель"},
    {hr: "Recepcija", ua: "Ресепшн"},
    {hr: "Taksi", ua: "Таксі"},
    {hr: "Plaža", ua: "Пляж"},
    {hr: "Autocesta", ua: "Автострада"},
    {hr: "Pješačka zona", ua: "Пішохідна зона"},
    {hr: "Muzej", ua: "Музей"},
    {hr: "Trgovina", ua: "Магазин"},
    {hr: "Suvenir", ua: "Сувенір"},
    {hr: "Vodič", ua: "Екскурсовод"}
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
    {hr: "Proljeće", ua: "Весна"},
    {hr: "Grmljavina", ua: "Грім"},
    {hr: "Magla", ua: "Туман"},
    {hr: "Oluja", ua: "Буря"},
    {hr: "Snježna oluja", ua: "Снігова буря"},
    {hr: "Topli front", ua: "Теплий фронт"},
    {hr: "Hladni front", ua: "Холодний фронт"},
    {hr: "Temperatura", ua: "Температура"},
    {hr: "Vlažnost", ua: "Вологість"},
    {hr: "Oborine", ua: "Опади"},
    {hr: "Sjena", ua: "Тінь"},
    {hr: "Jutro", ua: "Ранок"},
    {hr: "Večer", ua: "Вечір"},
    {hr: "Mraz", ua: "Іній"},
    {hr: "Puhati", ua: "Дути"}
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
    {hr: "Obitelj", ua: "Сім’я"},
    {hr: "Teta", ua: "Тітка"},
    {hr: "Ujak", ua: "Дядько"},
    {hr: "Kum", ua: "Хрещений"},
    {hr: "Kuma", ua: "Хрещена"},
    {hr: "Muž", ua: "Чоловік"},
    {hr: "Žena", ua: "Дружина"},
    {hr: "Jednogodišnje dijete", ua: "Однорічна дитина"},
    {hr: "Djeca", ua: "Діти"},
    {hr: "Sin", ua: "Син"},
    {hr: "Kći", ua: "Дочка"},
    {hr: "Roditelji", ua: "Батьки"},
    {hr: "Braća", ua: "Брати"},
    {hr: "Sestre", ua: "Сестри"},
    {hr: "Obiteljska kuća", ua: "Сімейний дім"},
    {hr: "Rođenje", ua: "Народження"},
    {hr: "Obiteljska veza", ua: "Сімейний зв’язок"}
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
    {hr: "Pjevač", ua: "Співак"},
    {hr: "Novinar", ua: "Журналіст"},
    {hr: "Pilot", ua: "Пілот"},
    {hr: "Vozač", ua: "Водій"},
    {hr: "Frizer", ua: "Перукар"},
    {hr: "Zubar", ua: "Стоматолог"},
    {hr: "Glazbenik", ua: "Музикант"},
    {hr: "Sportski trener", ua: "Тренер"},
    {hr: "Programer", ua: "Програміст"},
    {hr: "Fotograf", ua: "Фотограф"},
    {hr: "Arhitekt", ua: "Архітектор"},
    {hr: "Plesač", ua: "Танець"},
    {hr: "Konobar", ua: "Офіціант"},
    {hr: "Prodavač", ua: "Продавець"},
    {hr: "Ljekarnik", ua: "Фармацевт"},
    {hr: "Poljoprivrednik", ua: "Фермер"},
    {hr: "Mesar", ua: "М’ясник"}
  ],

  animals: [
    {hr: "Pas", ua: "Собака"},
    {hr: "Mačka", ua: "Кішка"},
    {hr: "Ptica", ua: "Птах"},
    {hr: "Konj", ua: "Кінь"},
    {hr: "Riba", ua: "Риба"},
    {hr: "Slon", ua: "Слон"},
    {hr: "Zec", ua: "Кролик"},
    {hr: "Krava", ua: "Корова"},
    {hr: "Ovca", ua: "Вівця"},
    {hr: "Koza", ua: "Коза"},
    {hr: "Svinja", ua: "Свиня"},
    {hr: "Medvjed", ua: "Ведмідь"},
    {hr: "Vuk", ua: "Вовк"},
    {hr: "Lisica", ua: "Лисиця"},
    {hr: "Zlatna ribica", ua: "Золота рибка"},
    {hr: "Pčela", ua: "Бджола"},
    {hr: "Mrav", ua: "Мураха"},
    {hr: "Zmija", ua: "Змія"},
    {hr: "Žaba", ua: "Жаба"},
    {hr: "Guska", ua: "Гуска"},
    {hr: "Patka", ua: "Качка"},
    {hr: "Sova", ua: "Сова"},
    {hr: "Golub", ua: "Голуб"},
    {hr: "Kornjača", ua: "Черепаха"}
  ],

  clothes: [
    {hr: "Košulja", ua: "Сорочка"},
    {hr: "Hlače", ua: "Штани"},
    {hr: "Haljina", ua: "Сукня"},
    {hr: "Kaput", ua: "Пальто"},
    {hr: "Čarape", ua: "Шкарпетки"},
    {hr: "Cipele", ua: "Взуття"},
    {hr: "Kapa", ua: "Кепка"},
    {hr: "Rukavice", ua: "Рукавички"},
    {hr: "Majica", ua: "Футболка"},
    {hr: "Jakna", ua: "Куртка"},
    {hr: "Papuče", ua: "Тапочки"},
    {hr: "Suknja", ua: "Спідниця"},
    {hr: "Prsluk", ua: "Жилет"},
    {hr: "Kravata", ua: "Краватка"},
    {hr: "Šal", ua: "Шарф"},
    {hr: "Bikini", ua: "Бікіні"},
    {hr: "Donje rublje", ua: "Білизна"},
    {hr: "Pajama", ua: "Піжама"},
    {hr: "Čizme", ua: "Чоботи"},
    {hr: "Džemper", ua: "Светр"},
    {hr: "Rokavi", ua: "Рукави"},
    {hr: "Kapa s ušima", ua: "Шапка з вушками"},
    {hr: "Sportska odjeća", ua: "Спортивний одяг"},
    {hr: "Jpanke", ua: "В’єтнамки"}
  ],

  colors: [
    {hr: "Crvena", ua: "Червоний"},
    {hr: "Plava", ua: "Синій"},
    {hr: "Zelena", ua: "Зелений"},
    {hr: "Žuta", ua: "Жовтий"},
    {hr: "Crna", ua: "Чорний"},
    {hr: "Bijela", ua: "Білий"},
    {hr: "Smeđa", ua: "Коричневий"},
    {hr: "Narančasta", ua: "Помаранчевий"},
    {hr: "Ružičasta", ua: "Рожевий"},
    {hr: "Ljubičasta", ua: "Фіолетовий"},
    {hr: "Siva", ua: "Сірий"},
    {hr: "Tirkizna", ua: "Бірюзовий"},
    {hr: "Zlatna", ua: "Золотий"},
    {hr: "Srebrna", ua: "Срібний"},
    {hr: "Maslinasta", ua: "Оливковий"},
    {hr: "Bež", ua: "Бежевий"},
    {hr: "Krem", ua: "Кремовий"},
    {hr: "Bordo", ua: "Бордо"},
    {hr: "Tamnoplava", ua: "Темно-синій"},
    {hr: "Svijetlozelena", ua: "Світло-зелений"},
    {hr: "Oranž", ua: "Яскраво-помаранчевий"},
    {hr: "Ljuska", ua: "Шкаралупа"},
    {hr: "Kobalt", ua: "Кобальт"},
    {hr: "Cijan", ua: "Ціан"},
    {hr: "Boja", ua: "Колір"}
  ],

  school: [
    {hr: "Knjiga", ua: "Книга"},
    {hr: "Olovka", ua: "Олівець"},
    {hr: "Bilježnica", ua: "Зошит"},
    {hr: "Učitelj", ua: "Вчитель"},
    {hr: "Učenik", ua: "Учень"},
    {hr: "Škola", ua: "Школа"},
    {hr: "Stolica", ua: "Стілець"},
    {hr: "Ploča", ua: "Дошка"},
    {hr: "Ruksak", ua: "Рюкзак"},
    {hr: "Kreda", ua: "Крейда"},
    {hr: "Školska torba", ua: "Шкільна сумка"},
    {hr: "Geometrijski pribor", ua: "Геометричний набір"},
    {hr: "Bilježnica u crte", ua: "Зошит у лінійку"},
    {hr: "Bilježnica u kvadratić", ua: "Зошит у клітинку"},
    {hr: "Olovka s gumicom", ua: "Олівець з гумкою"},
    {hr: "Flomaster", ua: "Фломастер"},
    {hr: "Boje", ua: "Фарби"},
    {hr: "Školski pribor", ua: "Шкільне приладдя"},
    {hr: "Radni stol", ua: "Письмовий стіл"},
    {hr: "Knjigovodstvo", ua: "Бухгалтерія"},
    {hr: "Dnevnik", ua: "Щоденник"},
    {hr: "Papir", ua: "Папір"},
    {hr: "Knjiga zadataka", ua: "Збірник завдань"},
    {hr: "Matematika", ua: "Математика"},
    {hr: "Likovna kultura", ua: "Образотворче мистецтво"},
    {hr: "Glazbeni instrument", ua: "Музичний інструмент"}
  ],

 verbs: [
    {subject: "Ja", options: ["sam", "si", "je", "smo", "ste"], correct: "sam"},
    {subject: "Ti", options: ["sam", "si", "je", "smo", "ste"], correct: "si"},
    {subject: "On/ona/ono", options: ["sam", "si", "je", "smo", "ste"], correct: "je"},
    {subject: "Oni/one", options: ["sam", "si", "je", "smo", "su"], correct: "su"},
    {subject: "Mi", options: ["sam", "si", "je", "smo", "ste"], correct: "smo"}
  ]
};

// ====== Зміна категорії, напрямку та рівня ======
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


// ====== Наступне слово ======
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

  if (currentCategory === 'verbs') {
    // урок "biti" – показуємо тільки subject, варіанти – options
    const optionsContainer = document.getElementById('options');
    document.getElementById('word-card').textContent = currentWord.subject;

    speakWord(currentWord.subject); // озвучка для "verbs"

    currentWord.options.forEach(option => {
      const btn = document.createElement('button');
      btn.textContent = option;
      btn.classList.add('option-btn');
      btn.onclick = () => selectAnswer(btn, currentWord.correct);
      optionsContainer.appendChild(btn);
      setTimeout(() => btn.classList.add('show'), Math.random() * 200);
    });
  } else {
    createOptions();

    const questionWord = translationDirection === 'hr-to-ua' ? currentWord.hr : currentWord.ua;
    speakWord(questionWord); // озвучка для всіх інших категорій
  }

  startTimer();
}

// ====== Створення варіантів відповіді для звичайних категорій ======
function createOptions() {
  const optionsContainer = document.getElementById('options');

  const optionsCount = 3; // завжди 3 варіанти
  const wordsArray = categories[currentCategory]; // тільки поточна категорія
  const answersSet = new Set();

  // правильна відповідь
  const correctAnswer = translationDirection === 'hr-to-ua' ? currentWord.ua : currentWord.hr;
  const questionWord = translationDirection === 'hr-to-ua' ? currentWord.hr : currentWord.ua;
  document.getElementById('word-card').textContent = questionWord;
  answersSet.add(correctAnswer);

  // додаємо інші варіанти з тієї ж категорії
  while (answersSet.size < optionsCount) {
    const randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
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
      const correctAnswer = currentCategory === 'verbs' ? currentWord.correct : (translationDirection === 'hr-to-ua' ? currentWord.ua : currentWord.hr);
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