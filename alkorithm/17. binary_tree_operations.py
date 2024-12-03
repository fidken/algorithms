from typing import Any  # Импорт модуля для аннотации типов

# Класс для представления узла бинарного дерева
class Node:
    def __init__(self, value):
        self.value = value  # Значение узла
        self.left = None  # Левый потомок
        self.right = None  # Правый потомок

# Класс для работы с бинарным деревом поиска (BST)
class BST:
    def __init__(self):
        self.root = None  # Корень дерева

    # Вспомогательный метод для вставки в дерево
    def __insert(self, current, value) -> None:
        if value < current.value:  # Если значение меньше текущего узла
            if not current.left:  # Если у текущего узла нет левого потомка
                current.left = Node(value)  # Создаем левый потомок
            else:
                self.__insert(current.left, value)  # Рекурсивно вставляем в левое поддерево
        elif value > current.value:  # Если значение больше текущего узла
            if not current.right:  # Если у текущего узла нет правого потомка
                current.right = Node(value)  # Создаем правый потомок
            else:
                self.__insert(current.right, value)  # Рекурсивно вставляем в правое поддерево
        else:
            raise Exception(f"{value} already exists!!")  # Если значение уже существует, выбрасываем исключение

    # Публичный метод для вставки в дерево
    def insert(self, value) -> None:
        if not self.root:  # Если дерево пустое
            self.root = Node(value)  # Устанавливаем значение в корень
        else:
            self.__insert(self.root, value)  # Вызываем вспомогательный метод

    # Вспомогательный метод для поиска узла в дереве
    def __search(self, value, parent, current) -> tuple | tuple[None, None] | Any | None:
        if value == current.value:  # Если нашли нужное значение
            return (parent, current)  # Возвращаем родителя и текущий узел
        elif value < current.value:  # Если значение меньше текущего
            if not current.left:  # Если нет левого потомка
                return (None, None)  # Узел не найден
            return self.__search(value, current, current.left)  # Рекурсивно ищем в левом поддереве
        elif value > current.value:  # Если значение больше текущего
            if not current.right:  # Если нет правого потомка
                return (None, None)  # Узел не найден
            return self.__search(value, current, current.right)  # Рекурсивно ищем в правом поддереве

    # Публичный метод для поиска узла в дереве
    def search(self, value) -> tuple[None, None] | tuple | Any | None:
        if not self.root:  # Если дерево пустое
            return (None, None)  # Узел не найден
        return self.__search(value, parent=self.root, current=self.root)  # Вызываем вспомогательный метод

    # Вспомогательный метод для поиска узла с минимальным значением
    def __minValueNode(self, node) -> Any:
        current = node  # Начинаем с текущего узла
        while current.left:  # Пока есть левый потомок
            current = current.left  # Переходим к нему
        return current  # Возвращаем узел с минимальным значением

    # Вспомогательный метод для удаления узла из дерева
    def __remove(self, root, value) -> Any | None:
        if not root:  # Если узел не найден
            return None

        if value < root.value:  # Если значение меньше текущего
            root.left = self.__remove(root.left, value)  # Рекурсивно удаляем из левого поддерева
        elif value > root.value:  # Если значение больше текущего
            root.right = self.__remove(root.right, value)  # Рекурсивно удаляем из правого поддерева
        else:  # Если нашли нужный узел
            if not root.left:  # Если нет левого потомка
                temp = root.right  # Правый потомок заменяет текущий узел
                root = None
                return temp
            elif not root.right:  # Если нет правого потомка
                temp = root.left  # Левый потомок заменяет текущий узел
                root = None
                return temp

            successor = self.__minValueNode(root.right)  # Находим узел-наследник
            root.value = successor.value  # Переносим значение наследника в текущий узел
            root.right = self.__remove(root.right, successor.value)  # Удаляем наследника
        return root  # Возвращаем обновленный узел

    # Публичный метод для удаления узла
    def remove(self, value) -> None:
        self.__remove(self.root, value)  # Вызываем вспомогательный метод

    # Метод для нерекурсивного обхода дерева
    def traverseNonRecursive(self) -> None:
        from queue import LifoQueue  # Импорт стека
        stack = LifoQueue()  # Инициализируем стек
        stack.put(self.root)  # Кладем корень дерева в стек
        while not stack.empty():  # Пока стек не пуст
            current = stack.get()  # Извлекаем текущий узел
            while current:  # Пока узел не None
                print(current.value, end=' -- ')  # Выводим значение узла
                if current.left:  # Если есть левый потомок
                    stack.put(current.left)  # Кладем его в стек
                current = current.right  # Переходим к правому потомку

# Основная часть программы
if __name__ == "__main__":
    bst = BST()  # Создаем объект бинарного дерева поиска
    while True:
        print(''' Введите номер команды, которую вы хотите выполнить:
    1) вставьте вершины по значениям
    2) выполните поиск в вершинах по значениям
    3) удалите вершины по значениям
    4) выполните переход (используя нерекурсивный метод)
    0) Завершите''')
        command = input()  # Читаем команду от пользователя
        match command:  # Обрабатываем команды
            case '1':
                bst.insert(int(input('Пожалуйста, введите значения, которые вы хотите вставить: ')))  # Вставка значения
            case '2':
                parent, current = bst.search(int(input('Пожалуйста, введите значения вершины, которую вы ищете: ')));
                print(f'Parent value is {parent.value}, searched value is {current.value}')  # Вывод результата поиска
            case '3':
                bst.remove(int(input('Пожалуйста, введите значение вершины, которую вы ищете: ')))  # Удаление узла
            case '4':
                bst.traverseNonRecursive()  # Нерекурсивный обход дерева
            case '0':
                break  # Завершение программы
            case _:
                continue  # Игнорируем некорректные команды
    bst.traverseNonRecursive()  # Вызываем обход дерева перед завершением программы
