let token = null; // JWT токен
let transactions = [];

const balanceEl = document.getElementById('balance');
const incomeSummary = document.getElementById('incomeSummary');
const expenseSummary = document.getElementById('expenseSummary');
const transactionsList = document.getElementById('transactionsList');
const transactionForm = document.getElementById('transactionForm');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const categoryInput = document.getElementById('category');
const filterType = document.getElementById('filterType');
const filterCategory = document.getElementById('filterCategory');
const searchInput = document.getElementById('searchInput');
const clearAllBtn = document.getElementById('clearAllBtn');
const exportBtn = document.getElementById('exportBtn');
const importFile = document.getElementById('importFile');
const themeToggle = document.getElementById('themeToggle');
const main = document.querySelector('main');

const categoryColors = {
  salary:'#27ae60',
  food:'#e67e22',
  entertainment:'#8e44ad',
  shopping:'#2980b9',
  other:'#7f8c8d'
};

let darkMode = false;

// ----- АУТЕНТИФІКАЦІЯ -----

async function register(name,email,password){
  const res = await fetch('http://localhost:5000/api/auth/register',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({name,email,password})
  });
  return res.json();
}

async function login(email,password){
  const res = await fetch('http://localhost:5000/api/auth/login',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({email,password})
  });
  const data = await res.json();
  if(data.token){
    token = data.token;
    fetchTransactions();
  } else {
    alert(data.error);
  }
}

// ----- ЗАПИТИ ДО БЕКЕНДУ -----

async function fetchTransactions(){
  if(!token) return;
  const res = await fetch('http://localhost:5000/api/transactions',{
    headers:{'Authorization':'Bearer '+token}
  });
  transactions = await res.json();
  updateUI();
}

async function addTransaction(description,amount,type,category){
  const res = await fetch('http://localhost:5000/api/transactions',{
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
    body: JSON.stringify({description,amount,type,category})
  });
  const newTransaction = await res.json();
  transactions.unshift(newTransaction);
  updateUI();
}

async function deleteTransaction(id){
  await fetch(`http://localhost:5000/api/transactions/${id}`,{
    method:'DELETE',
    headers:{'Authorization':'Bearer '+token}
  });
  transactions = transactions.filter(t=>t.id!==id);
  updateUI();
}

async function editTransaction(id,description,amount,type,category){
  const res = await fetch(`http://localhost:5000/api/transactions/${id}`,{
    method:'PUT',
    headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
    body: JSON.stringify({description,amount,type,category})
  });
  const updated = await res.json();
  transactions = transactions.map(t=>t.id===id?updated:t);
  updateUI();
}

// ----- ФОРМА -----

transactionForm.addEventListener('submit', async e=>{
  e.preventDefault();
  const description=descriptionInput.value.trim();
  const amount=parseFloat(amountInput.value);
  const type=typeInput.value;
  const category=categoryInput.value;
  if(description && !isNaN(amount)){
    await addTransaction(description,amount,type,category);
    descriptionInput.value=''; amountInput.value='';
  }
});

// ----- ОНОВЛЕННЯ UI -----

function animateBalance(newBalance){
  const current = parseFloat(balanceEl.textContent.replace('₴','')) || 0;
  const diff = newBalance - current;
  const duration = 500;
  const stepTime = 20;
  let elapsed = 0;
  const timer = setInterval(()=>{
    elapsed += stepTime;
    const progress = Math.min(elapsed/duration,1);
    const value = current + diff*progress;
    balanceEl.textContent = `₴${value.toFixed(2)}`;
    if(progress===1) clearInterval(timer);
  }, stepTime);
}

function updateUI(){
  transactionsList.innerHTML='';
  const filtered = transactions.filter(t=>{
    return (filterType.value==='all'||t.type===filterType.value) &&
           (filterCategory.value==='all'||t.category===filterCategory.value) &&
           (t.description.toLowerCase().includes(searchInput.value.toLowerCase()));
  });

  filtered.forEach(t=>{
    const li=document.createElement('li');
    li.className='show';
    li.style.backgroundColor=t.type==='income'?categoryColors[t.category]:'#c0392b';
    li.innerHTML=`${t.description} - ₴${t.amount.toFixed(2)} <span class="delete-btn">×</span>`;
    const delBtn = li.querySelector('.delete-btn');
    delBtn.addEventListener('click',()=> deleteTransaction(t.id));
    transactionsList.appendChild(li);
  });

  const income = transactions.filter(t=>t.type==='income').reduce((a,b)=>a+b.amount,0);
  const expense = transactions.filter(t=>t.type==='expense').reduce((a,b)=>a+b.amount,0);
  animateBalance(income-expense);
  incomeSummary.textContent=`Дохід: ₴${income.toFixed(2)}`;
  expenseSummary.textContent=`Витрати: ₴${expense.toFixed(2)}`;

  updateCharts();
}

// ----- ФІЛЬТРИ -----

[filterType, filterCategory, searchInput].forEach(el=>{
  el.addEventListener('input',updateUI);
});

// ----- ОЧИСТИТИ ВСЕ -----

clearAllBtn.addEventListener('click',async ()=>{
  for(const t of transactions){ await deleteTransaction(t.id); }
  transactions=[];
  updateUI();
});

// ----- ТЕМА -----

themeToggle.addEventListener('click',()=>{
  darkMode = !darkMode;
  document.body.style.backgroundColor = darkMode?'#1e1e1e':'#f5f6fa';
  document.body.style.color = darkMode?'#eee':'#333';
  main.style.backgroundColor = darkMode?'#2c2c2c':'#fff';
  themeToggle.textContent = darkMode?'Тема: Темна':'Тема: Світла';
});

// ----- ГРАФІКИ -----

const financeChart = new Chart(document.getElementById('financeChart'),{
  type:'bar',
  data:{labels:['Дохід','Витрати'],datasets:[{label:'Фінанси',data:[0,0],backgroundColor:['#2ecc71','#e74c3c']}]},
  options:{responsive:true,plugins:{legend:{display:false}}}
});

const pieChart = new Chart(document.getElementById('pieChart'),{
  type:'pie',
  data:{labels:Object.keys(categoryColors),datasets:[{data:[0,0,0,0,0],backgroundColor:Object.values(categoryColors)}]},
  options:{responsive:true,plugins:{legend:{display:false}}}
});

function updateCharts(){
  const incomeSum = transactions.filter(t=>t.type==='income').reduce((a,b)=>a+b.amount,0);
  const expenseSum = transactions.filter(t=>t.type==='expense').reduce((a,b)=>a+b.amount,0);
  financeChart.data.datasets[0].data=[incomeSum,expenseSum];
  financeChart.update();

  const catSums = Object.keys(categoryColors).map(cat=>transactions.filter(t=>t.category===cat).reduce((a,b)=>a+b.amount,0));
  pieChart.data.datasets[0].data=catSums;
  pieChart.update();
}

// ----- ІНІЦІАЛІЗАЦІЯ -----

// Якщо користувач вже авторизований (наприклад, з localStorage)
// token = localStorage.getItem('token');
// if(token) fetchTransactions();

// Для тесту можна викликати login() вручну або додати форму логіну