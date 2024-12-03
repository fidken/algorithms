// Функция для парсинга линейно-скобочной записи в бинарное дерево
function parseTree(str) {
    let index = 0;

    function parse() {
        if (index >= str.length) return null;

        // Читаем значение узла
        let value = '';
        while (index < str.length && !['(', ',', ')'].includes(str[index])) {
            value += str[index];
            index++;
        }

        const node = value.trim() ? { value: parseInt(value), left: null, right: null } : null;

        // Если узел не пустой, обрабатываем его потомков
        if (node && index < str.length && str[index] === '(') {
            index++; // Пропускаем '('
            node.left = parse(); // Левое поддерево
            if (index < str.length && str[index] === ',') {
                index++; // Пропускаем ','
                node.right = parse(); // Правое поддерево
            }
            if (index < str.length && str[index] === ')') {
                index++; // Пропускаем ')'
            }
        }

        return node;
    }

    return parse();
}

// Прямой обход (Pre-order) Корень → Левое поддерево → Правое поддерево
    //      8 
    //    /   \
    //   3     10
    //  / \      \
    // 1   6      14
    //    / \     /
    //   4   7   13
function preOrder(node, result = []) {
    if (!node) return result;
    result.push(node.value);
    preOrder(node.left, result);
    preOrder(node.right, result);
    return result;
}

// Центральный обход (In-order) Левое поддерево → Корень → Правое поддерево
function inOrder(node, result = []) {
    if (!node) return result;
    inOrder(node.left, result);
    result.push(node.value);
    inOrder(node.right, result);
    return result;
}

// Концевой обход (Post-order) Левое поддерево → Правое поддерево → Корень
function postOrder(node, result = []) {
    if (!node) return result;
    postOrder(node.left, result);
    postOrder(node.right, result);
    result.push(node.value);
    return result;
}

// Пример использования
const treeString = "8(3(1,6(4,7)),10(,14(13,)))";
const tree = parseTree(treeString);

console.log("Дерево:", tree);
console.log("Прямой обход:", preOrder(tree));
console.log("Центральный обход:", inOrder(tree));
console.log("Концевой обход:", postOrder(tree));
