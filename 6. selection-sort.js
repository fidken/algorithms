function selectionSort(arr) {
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        // Предполагаем, что текущий элемент минимален
        let minIndex = i;

        // Находим индекс минимального элемента в оставшейся части массива
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // Меняем местами текущий элемент и минимальный элемент
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }

    return arr;
}

// Пример использования
let array = [64, 25, 12, 22, 11];
console.log("Исходный массив:", array);

let sortedArray = selectionSort(array);
console.log("Отсортированный массив:", sortedArray);
