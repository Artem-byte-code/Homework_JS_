function createChessboard() {
  const chessboard = document.getElementById("chessboard"); // указываем на класс контейнера доски в HTML
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // буквы для столбцов

  // Очищаем доску на всякий случай, вставляя в неё пустое значение
  chessboard.innerHTML = '';
  
  // задаём переменные отвечающие за нижнюю и верхнюю строку находя их по классу в HTML
  const topLabels = document.querySelector(".top-labels");
  const bottomLabels = document.querySelector(".bottom-labels");
  
  // Очищаем и заполняем подписи столбцов
  topLabels.innerHTML = '';
  bottomLabels.innerHTML = '';

  // цикл в котором для каждой буквы создаётся span
  letters.forEach(letter => {
    const span = document.createElement('span'); 
    span.textContent = letter;   // задаём текст span = letter (буква)
    topLabels.appendChild(span.cloneNode(true)); // закрепляем за верхней строкой дочерний элемент span
    bottomLabels.appendChild(span.cloneNode(true)); // закрепляем за нижней строкой дочерний элемент span
  });

  // Генерация клеток
  for (let row = 8; row >= 1; row--) {
    for (let col = 0; col < 8; col++) {
      const cell = document.createElement("div");
      cell.className = (row + col) % 2 === 0 ? "white" : "black";
      
      // Добавляем цифру слева для первой клетки в строке
      if (col === 0) {
        const numberSpan = document.createElement('span');
        numberSpan.className = 'row-number';
        numberSpan.textContent = row;
        cell.appendChild(numberSpan);
      }
      
      chessboard.appendChild(cell);
    }
  }
}

window.onload = createChessboard;