function calculateExpression(input) {
    // Проверка на валидность скобок
    function areParenthesesBalanced(expr) {
        const stack = [];
        for (const char of expr) {
            if (char === '(') stack.push(char);
            if (char === ')') {
                if (stack.length === 0) return false;
                stack.pop();
            }
        }
        return stack.length === 0;
    }

    // Проверка выражения на корректность
    function isValidExpression(expr) {
        if (!areParenthesesBalanced(expr)) {
            throw new Error("Скобки расставлены некорректно.");
        }
        if (/\/0/.test(expr)) {
            throw new Error("Деление на ноль недопустимо.");
        }
        if (!/^[0-9+\-*/().= ]+$/.test(expr)) {
            throw new Error("Некорректные символы в выражении.");
        }
    }

    // Преобразование в обратную польскую нотацию (ОПН)
    function toRPN(expr) {
        const output = [];
        const operators = [];
        const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };
        const isOperator = (c) => "+-*/".includes(c);

        for (let i = 0; i < expr.length; i++) {
            const char = expr[i];

            if (/\d/.test(char)) {
                let num = char;
                while (i + 1 < expr.length && /\d/.test(expr[i + 1])) {
                    num += expr[++i];
                }
                output.push(num);
            } else if (char === '(') {
                operators.push(char);
            } else if (char === ')') {
                while (operators.length && operators[operators.length - 1] !== '(') {
                    output.push(operators.pop());
                }
                operators.pop();
            } else if (isOperator(char)) {
                while (
                    operators.length &&
                    precedence[char] <= precedence[operators[operators.length - 1]]
                ) {
                    output.push(operators.pop());
                }
                operators.push(char);
            }
        }

        while (operators.length) {
            output.push(operators.pop());
        }

        return output;
    }

    // Вычисление результата ОПН
    function evaluateRPN(rpn) {
        const stack = [];
        for (const token of rpn) {
            if (/\d/.test(token)) {
                stack.push(Number(token));
            } else {
                const b = stack.pop();
                const a = stack.pop();
                switch (token) {
                    case '+': stack.push(a + b); break;
                    case '-': stack.push(a - b); break;
                    case '*': stack.push(a * b); break;
                    case '/': stack.push(a / b); break;
                }
            }
        }
        return stack[0];
    }

    // Основная логика
    try {
        input = input.replace(/\s+/g, ''); // Удаление пробелов
        if (!input.endsWith('=')) {
            throw new Error("Выражение должно заканчиваться знаком '='.");
        }

        const cleanInput = input.slice(0, -1); // Убираем '='
        isValidExpression(cleanInput);

        const rpn = toRPN(cleanInput);
        return evaluateRPN(rpn);
    } catch (error) {
        return `Ошибка: ${error.message}`;
    }
}

// Пример использования
const input = "2+7*(3/9)-5=";
console.log(calculateExpression(input));
