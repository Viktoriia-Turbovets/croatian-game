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

// Дані для категорій
const categories = {
  greetings: [
    {hr:"Dobar dan", ua:"Добрий день"},
    {hr:"Hvala", ua:"Дякую"},
    {hr:"Molim", ua:"Будь ласка"},
    {hr:"Da", ua:"Так"},
    {hr:"Ne", ua:"Ні"}
  ],
  food: [
    {hr:"Voda", ua:"Вода"},
    {hr:"Kruh", ua:"Хліб"},
    {hr:"Sir", ua:"Сир"},
    {hr:"Mlijeko", ua:"Молоко"}
  ]
};

// Функції зміни категорії, напрямку та рівня
function changeCategory(){ currentCategory = document.getElementById('category').value; usedWords=[]; updateProgress(); document.getElementById('word-card').textContent=''; document.getElementById('options').innerHTML=''; }
function changeDirection(){ translationDirection = document.getElementById('translation-direction').value; document.getElementById('word-card').textContent=''; document.getElementById('options').innerHTML=''; }
function changeLevel(){ level=parseInt(document.getElementById('level').value); document.getElementById('word-card').textContent=''; document.getElementById('options').innerHTML=''; }

// Вибір наступного слова
function nextWord(){
  clearInterval(timer);
  timeLeft=15; updateTimer();

  const wordsArray=categories[currentCategory];
  if(usedWords.length===wordsArray.length){ endGame(); return; }

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

// Створення варіантів відповіді
function createOptions() {
  const optionsContainer = document.getElementById('options');
  let optionsCount = level === 1 ? 2 : level === 2 ? 3 : 4;

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

// Вибір відповіді
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

// Таймер
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

// Прогрес
function updateProgress() {
  const total = categories[currentCategory].length;
  const progressPercent = (usedWords.length / total) * 100;
  document.getElementById('progress-bar').style.width = progressPercent + "%";
}

// Кінець гри
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

// Нова гра
function startNewGame() {
  score = 0;
  combo = 0;
  usedWords = [];
  document.getElementById('score').textContent = `Рахунок: ${score}`;
  document.getElementById('combo').textContent = `Серія правильних відповідей: ${combo}`;
  document.getElementById('final-result').textContent = '';
  nextWord();
}

// Анімація слова
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