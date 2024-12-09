def find_numbers(x):
    results = set()
    # Перебираем возможные значения K, L, M
    for K in range(0, 20):  # Ограничиваемся разумным числом степеней
        for L in range(0, 20):
            for M in range(0, 20):
                value = (3**K) * (5**L) * (7**M)
                if value > x:  # Если число превышает x, можно пропустить
                    break
                results.add(value)
    
    # Отфильтровываем числа, которые больше x, и сортируем результат
    results = sorted([num for num in results if num <= x])
    return results

# Пример вызова функции
x = int(input("Введите число x: "))
result = find_numbers(x)
print("Числа, удовлетворяющие условию:", result)
