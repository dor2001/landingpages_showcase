document.addEventListener("DOMContentLoaded", function() {
  const operationButtons = document.querySelectorAll('.operations button');

  operationButtons.forEach(button => {
    button.addEventListener('click', function() {
      selectOperation(button.textContent);
    });
  });
});

function selectOperation(operation) {
  selectedOperation = operation;
  const operationButtons = document.querySelectorAll('.operations button');
  
  operationButtons.forEach(button => {
    button.classList.remove('selected');
  });

  // Add 'selected' class to the clicked button
  event.target.classList.add('selected');
}

function calculate() {
  const num1 = parseFloat(document.getElementById('num1').value);
  const num2 = parseFloat(document.getElementById('num2').value);
  let result;

  switch(selectedOperation) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      if (num2 !== 0) {
        result = num1 / num2;
      } else {
        result = 'אי אפשר לחלק ב0';
      }
      break;
    default:
      result = 'פעולה לא חוקית';
  }

  document.getElementById('result').innerHTML = 'תוצאה: ' + result;
}
