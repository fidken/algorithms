function quickSort(arr) {
    // Базовый случай: массив длиной 0 или 1 уже отсортирован
    if (arr.length <= 1) {
        return arr;
    }

    // Выбор опорного элемента (pivot)
    const pivot = arr[Math.floor(arr.length / 2)];
    const less = [];
    const equal = [];
    const greater = [];

    // Разделение массива на три части
    for (const num of arr) {
        if (num < pivot) {
            less.push(num);
        } else if (num === pivot) {
            equal.push(num);
        } else {
            greater.push(num);
        }
    }

    // Рекурсивная сортировка и объединение результатов
    return [...quickSort(less), ...equal, ...quickSort(greater)];
}

// Пример использования
const array = [34, 7, 23, 32, 5, 62];
const sortedArray = quickSort(array);
console.log(array)
console.log(sortedArray); // [5, 7, 23, 32, 34, 62]
