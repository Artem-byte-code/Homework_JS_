let mover = {
    /**
     * Получает и отдает направление от пользователя.
     * @returns {int} Возвращаем направление, введенное пользователем.
     */
    getDirection() {
        const availableDirections = [1, 2, 3, 4, 6, 7, 8, 9];

        while (true) {
            let direction = parseInt(prompt('Введите одно из чисел 1, 2, 3, 4, 6, 7, 8, 9 кроме 5, куда вы хотите переместиться. "Отмена" для выхода.'));
            if (isNaN(direction)) {
                return null;
            }
            if (!availableDirections.includes(direction)) {
                alert('Для перемещения необходимо ввести одно из чисел 1, 2, 3, 4, 6, 7, 8 или 9');
                continue;
            }
            return direction;
        }
    },

    /**
     * Отдает следующую точку в которой будет находиться пользователь после движения.
     * @param {int} direction Направление движения игрока.
     * @returns {{x: int, y: int}} Следующая позиция игрока (может быть текущей, если шаг в стену).
     */
    getNextPosition(direction) {
        const nextPosition = {
            x: player.x,
            y: player.y,
        };

        // Обновляем позицию в зависимости от направления
        switch (direction) {
            case 1: // ↖
                nextPosition.y++;
                nextPosition.x--;
                break;
            case 2: // ↑
                nextPosition.y++;
                break;
            case 3: // ↗
                nextPosition.y++;
                nextPosition.x++;
                break;
            case 4: // ←
                nextPosition.x--;
                break;
            case 6: // →
                nextPosition.x++;
                break;
            case 7: // ↙
                nextPosition.y--;
                nextPosition.x--;
                break;
            case 8: // ↓
                nextPosition.y--;
                break;
            case 9: // ↘
                nextPosition.y--;
                nextPosition.x++;
                break;
        }

        // Проверяем, не выходит ли nextPosition за границы поля
        if (
            nextPosition.x < 0 || 
            nextPosition.y < 0 || 
            nextPosition.x >= config.colsCount || 
            nextPosition.y >= config.rowsCount
        ) {
            // Если выходит, возвращаем текущую позицию (игрок не двигается)
            return { x: player.x, y: player.y };
        }

        return nextPosition;
    },
};