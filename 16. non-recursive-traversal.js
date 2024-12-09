// Файл: non_recursive_traversal.js

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Парсинг линейно-скобочной записи для построения дерева
function parseTree(input) {
    let index = 0;

    function parseNode() {
        if (index >= input.length || input[index] === ',') {
            return null;
        }

        let value = '';
        while (index < input.length && /\d/.test(input[index])) {
            value += input[index++];
        }

        const node = new TreeNode(parseInt(value, 10));

        if (index < input.length && input[index] === '(') {
            index++; // Пропускаем '('
            node.left = parseNode();
            index++; // Пропускаем ','
            node.right = parseNode();
            index++; // Пропускаем ')'
        }

        return node;
    }

    return parseNode();
}

// Нерекурсивный прямой обход дерева
function preorderTraversal(root) {
    if (!root) return '';

    const stack = [root];
    const result = [];

    while (stack.length > 0) {
        const node = stack.pop();
        result.push(node.value);

        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }

    return result.join(' ');
}

// Пример использования
const input = '8(3(1,6(4,7)),10(,14(13,)))';
const root = parseTree(input);

console.log('Прямой обход:', preorderTraversal(root));
