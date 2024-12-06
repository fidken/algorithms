import matplotlib.pyplot as plt
import networkx as nx

def draw_tree(root):
    """Отрисовка бинарного дерева с использованием NetworkX и Matplotlib."""
    def add_edges(graph, node, pos, x=0, y=0, layer=1):
        """Рекурсивное добавление узлов и рёбер в граф."""
        if node:
            graph.add_node(node.value, pos=(x, y))
            if node.left:
                graph.add_edge(node.value, node.left.value)
                add_edges(graph, node.left, pos, x - 1 / layer, y - 1, layer * 1.5)
            if node.right:
                graph.add_edge(node.value, node.right.value)
                add_edges(graph, node.right, pos, x + 1 / layer, y - 1, layer * 1.5)
    
    G = nx.DiGraph()
    add_edges(G, root, {})
    
    pos = nx.get_node_attributes(G, 'pos')
    labels = {node: str(node) for node in G.nodes()}
    
    plt.figure(figsize=(10, 6))
    nx.draw(G, pos, with_labels=True, labels=labels, node_size=3000, node_color="lightblue", font_size=10, font_weight="bold")
    plt.show()


class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def parse_tree(input_str):
    """Функция для парсинга строки в дерево."""
    def helper(data, i):
        value = ""
        while i < len(data) and (data[i].isdigit() or data[i] == '-'):
            value += data[i]
            i += 1
        if not value:
            return None, i
        node = Node(int(value))
        if i < len(data) and data[i] == '(':
            node.left, i = helper(data, i + 1)
            if i < len(data) and data[i] == ',':
                node.right, i = helper(data, i + 1)
        if i < len(data) and data[i] == ')':
            i += 1
        return node, i
    
    root, _ = helper(input_str, 0)
    return root


def add_node(root, value):
    """Добавление узла в БДП."""
    if not root:
        return Node(value)
    if value < root.value:
        root.left = add_node(root.left, value)
    elif value > root.value:
        root.right = add_node(root.right, value)
    return root


def find_node(root, value):
    """Поиск узла в БДП."""
    if not root:
        return None
    if value == root.value:
        return root
    elif value < root.value:
        return find_node(root.left, value)
    else:
        return find_node(root.right, value)


def delete_node(root, value):
    """Удаление узла из БДП."""
    if not root:
        return root
    if value < root.value:
        root.left = delete_node(root.left, value)
    elif value > root.value:
        root.right = delete_node(root.right, value)
    else:
        if not root.left:
            return root.right
        elif not root.right:
            return root.left
        min_larger_node = root.right
        while min_larger_node.left:
            min_larger_node = min_larger_node.left
        root.value = min_larger_node.value
        root.right = delete_node(root.right, root.value)
    return root


def tree_to_string(root):
    """Преобразование дерева в линейно-скобочную запись."""
    if not root:
        return ""
    left = tree_to_string(root.left)
    right = tree_to_string(root.right)
    return f"{root.value}({left},{right})" if left or right else str(root.value)


def main():
    print("Введите бинарное дерево в линейно-скобочной записи:")
    input_tree = input().strip()
    tree = parse_tree(input_tree)
    
    while True:
        print("\nМеню:")
        print("1. Поиск узла")
        print("2. Добавление узла")
        print("3. Удаление узла")
        print("4. Показать дерево")
        print("5. Выход")
        print("6. Показать дерево (графически)")
        
        choice = input("Ваш выбор: ").strip()
        if choice == '1':
            value = int(input("Введите значение для поиска: "))
            result = find_node(tree, value)
            print("Найдено" if result else "Не найдено")
        elif choice == '2':
            value = int(input("Введите значение для добавления: "))
            tree = add_node(tree, value)
        elif choice == '3':
            value = int(input("Введите значение для удаления: "))
            tree = delete_node(tree, value)
        elif choice == '4':
            print("Текущее дерево:", tree_to_string(tree))
        elif choice == '5':
            print("Завершение программы. Итоговое дерево:")
            print(tree_to_string(tree))
            break
        elif choice == '6':
            if tree:
                draw_tree(tree)
            else:
                print("Дерево пустое!")
        else:
            print("Неверный выбор. Попробуйте снова.")


if __name__ == "__main__":
    main()
