function add(a,b) {return Number(a)+Number(b)};

function subtract(a,b) {return Math.abs(Number(a) - Number(b))};

function multiply(a,b) {return Number(a)*Number(b)};

function divide(a,b) {return parseFloat(Number.parseFloat(a/b).toFixed(2))};

function operate(operator, n1, n2) {
  switch (operator) {
    case 'add':
      display.textContent = add(n1,n2);
      break;
    case 'subtract':
      display.textContent = subtract(n1,n2);
      break;
    case 'multiply':
      display.textContent = multiply(n1,n2);
      break;
    case 'divide':
      display.textContent = divide(n1,n2);
      break;
    default:
      alert("Not a correct operator");
  } 
}

let display = document.querySelector('.display');
let saved = document.querySelector('.saved');
let n1, n2, operator;

function show(btn) {
  if (display.textContent === '0') return display.textContent = btn.textContent;
  return display.textContent += btn.textContent;
}

function save(num, text, o) {
  n1 = num;
  operator = o;
  display.textContent = '0';
  saved.textContent = n1 + " " + text;
}

onclick = event => {
  if (event.target.className === 'number') show(event.target);
  if (event.target.className === 'operator') {
    if (!n1) {
      save(display.textContent, event.target.textContent, event.target.id);
      n2 = '';
      return;
    };
    if (n1 && !n2) {
      n2 = display.textContent;
      operate(operator, n1, n2); 
      n2 = display.textContent;
      save(n2, event.target.textContent, event.target.id)
      n1 = '';
      return;
    }

  };
  if (event.target.id === 'equal') {
    n2 = display.textContent;
    saved.textContent += " " + n2;
    operate(operator, n1, n2); 
  }
}

onkeydown = event => {
  let num = Number(event.key)
  if (!isNaN(num)) show(document.getElementById(num));
  if (event.key === '.') show(document.getElementById("."))
}

// Handle clear btn
let clear = document.getElementById('clear');
clear.addEventListener('click', () => {
  display.textContent = '0';
  saved.textContent = '0';
  n1='', n2='', operator='';
});
