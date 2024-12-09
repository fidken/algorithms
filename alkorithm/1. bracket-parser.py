bracket = "()[({}())]"

# bracket = input()

def mark(bracket):
    list = []
    if len(bracket) == 1:
        return 'Ошибка'
    for i in range(len(bracket)-1):
        if (bracket[i] == "(" and bracket[i+1] == ")") or (bracket[i] == "[" and bracket[i+1] == "]") or (bracket[i] == "{" and bracket[i+1] == "}"):
            list.append(i)
            list.append(i+1)

    s = ''
    for i in range(len(bracket)):
        if i not in list:
            s += bracket[i]
    return s


while (bracket != mark(bracket)) and (mark(bracket) != 'Ошибка'):
    bracket = mark(bracket)

if len(bracket) == 0:
    print("Строка существует")
else:
    print("Строка не существует")
