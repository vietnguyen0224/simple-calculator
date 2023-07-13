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

onclick = event => {
  if (event.target.className === 'number') {
    if (event.target.id === '.') document.getElementById('.').disabled = true;
    show(event.target);
  }

  if (event.target.className === 'operator') {
    document.getElementById('.').disabled = false;
    if (!n1) {
      save(display.textContent, event.target.textContent, event.target.id);
      return;
    };
    if (n1 && !n2) {
      n2 = display.textContent;
      saved.textContent += " " + n2;
      operate(operator, n1, n2); 
      if (display.textContent === 'ERROR!!! Divisor can\'t be ZERO!!!') {
        return;
      }
      save(display.textContent, event.target.textContent, event.target.id);
      n2 = null;
      return;
    }
  }

  if (event.target.id === '=') {
    event.target.disabled = true;
    document.querySelectorAll('.number').forEach(num => num.disabled = true);
    document.querySelectorAll('.operator').forEach(o => o.disabled = true);
    n2 = display.textContent;
    saved.textContent += " " + n2;
    operate(operator, n1, n2); 
  }
}

onkeydown = event => {
  if (!isNaN(Number(event.key))) show(document.getElementById(event.key));
  if (event.key === '.') {
    document.getElementById('.').disabled = true;
    show(document.getElementById(event.key));
  }
  if (event.key === '+' || event.key === '-' || event.key === '*') {
    document.getElementById('.').disabled = false;
    if (!n1) {
      save(display.textContent, event.key, event.key);
      return;
    };
    if (n1 && !n2) {
      n2 = display.textContent;
      saved.textContent += " " + n2;
      operate(operator, n1, n2); 
      if (display.textContent === 'ERROR!!! Divisor can\'t be ZERO!!!') {
        return;
      }
      save(display.textContent, event.key, event.key);
      n2 = null;
      return;
    }
  }
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
}
