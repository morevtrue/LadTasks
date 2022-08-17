
var formElement = document.forms['formElement'];

formElement.addEventListener('focusin', (event) => {
	event.target.classList.add('focused');
});

formElement.addEventListener('focusout', (event) => {
	event.target.classList.remove('focused');
});






//   formElement.addEventListener("focus", () => formElement.classList.add('focused'), true);
//   formElement.addEventListener("blur", () => form.classList.remove('focused'), true);
