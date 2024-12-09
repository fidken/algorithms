// Функция для слияния двух отсортированных массивов
function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Сравниваем элементы из обоих массивов, добавляя наименьший в результат
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Добавляем оставшиеся элементы из левого массива
    while (leftIndex < left.length) {
        result.push(left[leftIndex]);
        leftIndex++;
    }

    // Добавляем оставшиеся элементы из правого массива
    while (rightIndex < right.length) {
        result.push(right[rightIndex]);
        rightIndex++;
    }

    return result;
}

// Функция сортировки слиянием
function mergeSort(array) {
    // Базовый случай: массив из одного элемента уже отсортирован
    if (array.length <= 1) {
        return array;
    }

    // Разделяем массив на две половины
    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    // Рекурсивно сортируем обе половины и сливаем их
    return merge(mergeSort(left), mergeSort(right));
}

// Пример использования
const sequence = [38, 27, 43, 3, 9, 82, 10];
console.log("Исходная последовательность:", sequence);
const sortedSequence = mergeSort(sequence);
console.log("Отсортированная последовательность:", sortedSequence);
