// Получение формы при ивенте отправки
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Сброс ошибок которые могли быть до этого
    resetErrors();
    
    // Валидация полей
    const nameValid = validateName();
    const phoneValid = validatePhone();
    const emailValid = validateEmail();
    const messageValid = validateMessage();
    
    // Валидация всех полей перед отправкой 
    if (nameValid && phoneValid && emailValid && messageValid) {
      alert('Форма успешно отправлена!');
      // Здесь можно добавить отправку формы на сервер
      // this.submit();
    }
  });
  // Валидация имени
  function validateName() {
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    const nameValue = nameInput.value.trim();
    
    if (!nameValue) {
      showError(nameInput, nameError, 'Поле обязательно для заполнения');
      return false;
    }
    
    if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(nameValue)) {
      showError(nameInput, nameError, 'Имя может содержать только буквы');
      return false;
    }
    
    return true;
  }
  // Валидация номера телефона
  function validatePhone() {
    const phoneInput = document.getElementById('phone');
    const phoneError = document.getElementById('phoneError');
    const phoneValue = phoneInput.value.trim();
    
    if (!phoneValue) {
      showError(phoneInput, phoneError, 'Поле обязательно для заполнения');
      return false;
    }
    
    if (!/^\+7\(\d{3}\)\d{3}-\d{4}$/.test(phoneValue)) {
      showError(phoneInput, phoneError, 'Телефон должен быть в формате +7(000)000-0000');
      return false;
    }
    
    return true;
  }
  // Валидация эл. почты
  function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailValue = emailInput.value.trim();
    
    if (!emailValue) {
      showError(emailInput, emailError, 'Поле обязательно для заполнения');
      return false;
    }
    
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(emailValue)) {
      showError(emailInput, emailError, 'Введите корректный email (например: mymail@mail.ru)');
      return false;
    }
    
    return true;
  }
  // Валидация сообщения
  function validateMessage() {
    const messageInput = document.getElementById('message');
    const messageError = document.getElementById('messageError');
    const messageValue = messageInput.value.trim();
    
    if (!messageValue) {
      showError(messageInput, messageError, 'Поле обязательно для заполнения');
      return false;
    }
    
    return true;
  }
  // Функция отображение ошибок
  function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
  // Функция сброса предыдущих ошибок
  function resetErrors() {
    const errorInputs = document.querySelectorAll('.error');
    errorInputs.forEach(input => input.classList.remove('error'));
    
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => {
      message.textContent = '';
      message.style.display = 'none';
    });
  }
