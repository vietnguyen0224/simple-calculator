function add(a,b) {return parseFloat((Number(a)+Number(b)).toFixed(2))};

function subtract(a,b) {return parseFloat((Number(a) - Number(b)).toFixed(2))};

function multiply(a,b) {return parseFloat((Number(a)*Number(b)).toFixed(2))};

function divide(a,b) {
  if (Number(b) === 0) {
    return 'ERROR!!! Divisor can\'t be ZERO!!!';
  }
  return parseFloat(Number.parseFloat(a/b).toFixed(2))
};

function operate(operator, n1, n2) {
  switch (operator) {
    case '+':
      display.textContent = add(n1,n2);
      break;
    case '-':
      display.textContent = subtract(n1,n2);
      break;
    case '*':
      display.textContent = multiply(n1,n2);
      break;
    case '/':
      display.textContent = divide(n1,n2);
      break;
    default:
      alert("Not a correct operator");
      clear();
  } 
}

let display = document.querySelector('.display');
let saved = document.querySelector('.saved');
let n1 = null, n2 = null, operator = null;

function show(btn) {
  if (display.textContent === '0') return display.textContent = btn.textContent;
  if (display.textContent.includes('.') && btn.textContent === '.') return display.textContent;
  return display.textContent += btn.textContent;
}

function save(num, text, o) {
  n1 = num;
  operator = o;
  display.textContent = '0';
  saved.textContent = n1 + " " + text;
}

// Handle chain operators
function chain(text, o) {
  if (!n1) {
    save(display.textContent, text, o);
    return;
  };
  if (n1 && !n2) {
    n2 = display.textContent;
    saved.textContent += " " + n2;
    operate(operator, n1, n2); 
    if (display.textContent === 'ERROR!!! Divisor can\'t be ZERO!!!') {
      return;
    }
    save(display.textContent, text, o);
    n2 = null;
    return;
  }
}

// Handle equal operator
function result() {
  document.querySelectorAll('.number').forEach(num => num.disabled = true);
  document.querySelectorAll('.operator').forEach(o => o.disabled = true);
  document.getElementById('delete').disabled = true;
  n2 = display.textContent;
  saved.textContent += " " + n2;
  operate(operator, n1, n2);
}

onclick = event => {
  if (event.target.className === 'number') {
    if (event.target.id === '.') document.getElementById('.').disabled = true;
    show(event.target);
  }

  if (event.target.className === 'operator') {
    document.getElementById('.').disabled = false;
    chain(event.target.textContent, event.target.id)
  }

  if (event.target.id === '=') {
    event.target.disabled = true;
    result();
  }
  if (event.target.id === 'delete') {
    del();
  }
}

onkeydown = event => {
  if (!isNaN(Number(event.key))) show(document.getElementById(event.key));
  if (event.key === '.') {
    document.getElementById('.').disabled = true;
    show(document.getElementById(event.key));
  }
  if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
    document.getElementById('.').disabled = false;
    chain(event.key, event.key);
  }
  if (event.key === '=') {
    document.getElementById('=').disabled = true;
    result();
  }
  if (event.key === 'Backspace' || event.key === 'Delete') {
    del();
  }
}

// Handle delete btn
function del() {
  display.textContent = display.textContent.slice(0,-1);
  if (!display.textContent.includes('.')) document.getElementById('.').disabled = false;
  if (display.textContent === '') display.textContent = '0';
}

// Handle clear btn
document.getElementById('clear').addEventListener('click', clear);
function clear() {
  display.textContent = '0';
  saved.textContent = '0';
  n1=null, n2=null, operator=null;
  document.getElementById('=').disabled = false;
  document.querySelectorAll('.number').forEach(num => num.disabled = false);
  document.querySelectorAll('.operator').forEach(o => o.disabled = false);
  document.getElementById('delete').disabled = false;
}
