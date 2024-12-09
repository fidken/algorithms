def hash_function1(key, table_size):
    return hash(key) % table_size

def hash_function2(key, table_size):
    return 1 + (hash(key) % (table_size - 1))

class HashTable:
    def __init__(self, size):
        self.size = size
        self.table = [None] * size  # Инициализация пустой таблицы

    def insert(self, key):
        index = hash_function1(key, self.size)  # Первый хеш
        step = hash_function2(key, self.size)   # Второй хеш для разрешения коллизий

        # Если ячейка пустая, вставляем слово, если занята, двигаемся по таблице
        while self.table[index] is not None:
            index = (index + step) % self.size  # При коллизии используем шаг
        if self.table[index] is None:
            self.table[index] = []
        self.table[index].append(key)

    def display(self):
        result = []
        for idx, slot in enumerate(self.table):
            if slot is not None:
                # Создаем строку вида: Хеш: <хеш> -> Слова: <список слов>
                hash_value = hash(slot[0])  # Берем хеш первого слова для вывода
                result.append(f"Хеш: {hash_value} -> Слова: {', '.join(slot)}")
        return result

def main():
    # Чтение файла input.txt
    with open("input.txt", "r", encoding="utf-8") as f:
        data = f.read().splitlines()  # Чтение строк из файла

    # Инициализация хеш-таблицы
    table_size = 101  # Размер таблицы, может быть простым числом
    hash_table = HashTable(table_size)

    # Вставка всех строк в хеш-таблицу
    for line in data:
        hash_table.insert(line.strip())  # Вставляем строку в таблицу

    # Запись результата в output.txt
    with open("output.txt", "w", encoding="utf-8") as f:
        for item in hash_table.display():
            f.write(item + "\n")  # Пишем все элементы из таблицы

    # Для отображения на экране (по желанию):
    for item in hash_table.display():
        print(item)

if __name__ == "__main__":
    main()
