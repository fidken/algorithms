function heapify(arr, length, i) {
    let largest = i; // Инициализируем наибольший элемент как корень
    let left = 2 * i + 1; // Левый потомок
    let right = 2 * i + 2; // Правый потомок

    console.log(`\nHeapify: i=${i}, left=${left}, right=${right}, largest=${largest}`);
    console.log("Текущий массив:", arr);

    // Если левый потомок больше корня
    if (left < length && arr[left] > arr[largest]) {
        console.log(`Левый потомок arr[${left}] (${arr[left]}) больше arr[${largest}] (${arr[largest]})`);
        largest = left;
    }

    // Если правый потомок больше, чем самый большой элемент на данный момент
    if (right < length && arr[right] > arr[largest]) {
        console.log(`Правый потомок arr[${right}] (${arr[right]}) больше arr[${largest}] (${arr[largest]})`);
        largest = right;
    }

    // Если наибольший элемент не корень
    if (largest !== i) {
        console.log(`Меняем местами arr[${i}] (${arr[i]}) и arr[${largest}] (${arr[largest]})`);
        [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Меняем местами
        console.log("Массив после обмена:", arr);

        // Рекурсивно преобразуем в кучу затронутое поддерево
        heapify(arr, length, largest);
    }
}

function heapSort(arr) {
    const length = arr.length;

    console.log("Начинаем сортировку. Исходный массив:", arr);

    // Построение кучи (перегруппировка массива)
    for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
        console.log(`\nСтроим кучу. Индекс узла: ${i}`);
        heapify(arr, length, i);
    }

    console.log("Массив после построения кучи:", arr);

    // Извлечение элементов из кучи один за другим
    for (let i = length - 1; i >= 0; i--) {
        console.log(`\nПеремещаем корень arr[0] (${arr[0]}) в конец arr[${i}] (${arr[i]})`);
        [arr[0], arr[i]] = [arr[i], arr[0]];
        console.log("Массив после перемещения корня:", arr);

        // Вызываем heapify на уменьшенной куче
        heapify(arr, i, 0);
    }

    console.log("Массив после сортировки:", arr);
    return arr;
}

// Пример использования
const array = [12, 11, 13, 5, 6, 7];
console.log("Изначальный массив:", array);
const sortedArray = heapSort(array);
console.log("Отсортированный массив:", sortedArray);

