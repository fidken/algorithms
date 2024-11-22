function heapify(arr, length, i) {
    let largest = i; // Инициализируем наибольший элемент как корень
    let left = 2 * i + 1; // Левый потомок
    let right = 2 * i + 2; // Правый потомок

    // Если левый потомок больше корня
    if (left < length && arr[left] > arr[largest]) {
        largest = left;
    }

    // Если правый потомок больше, чем самый большой элемент на данный момент
    if (right < length && arr[right] > arr[largest]) {
        largest = right;
    }

    // Если наибольший элемент не корень
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Меняем местами

        // Рекурсивно преобразуем в кучу затронутое поддерево
        heapify(arr, length, largest);
    }
}

function heapSort(arr) {
    const length = arr.length;

    // Построение кучи (перегруппировка массива)
    for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
        heapify(arr, length, i);
    }

    // Извлечение элементов из кучи один за другим
    for (let i = length - 1; i >= 0; i--) {
        // Перемещаем текущий корень в конец
        [arr[0], arr[i]] = [arr[i], arr[0]];

        // Вызываем heapify на уменьшенной куче
        heapify(arr, i, 0);
    }

    return arr;
}

// Пример использования
const array = [12, 11, 13, 5, 6, 7];
console.log("Изначальный массив:", array);
const sortedArray = heapSort(array);
console.log("Отсортированный массив:", sortedArray);
