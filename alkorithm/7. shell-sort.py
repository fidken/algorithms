#сортировка шелла
import random

# Задайте диапазон
min_value = 1  # минимальное значение
max_value = 100  # максимальное значение
len = 6 # длина массива
d = len//2 # расстояние

# Это генератор списков (list comprehension) в Python
#1. random.randint(min_value, max_value) — это выражение, которое генерирует случайное целое число в заданном диапазоне от min_value до max_value.
#2. for _ in range(8) — это цикл, который выполняется 8 раз. Переменная _ используется как "плейсхолдер" для индекса, который не нужен, поэтому принято использовать _, чтобы показать, что значение не будет использоваться.
#https://pythonist.ru/generatory-spiskov-v-python-dlya-nachinayushhih/
random_numbers = [random.randint(min_value, max_value) for _ in range(len)]

print(random_numbers)

while d > 0:
  for i in range(d, len):
    j = i
    delta = j - d
    #print(j, d, delta, random_numbers[delta], random_numbers[j])
    #print("  !", delta, random_numbers[delta] > random_numbers[j])
    while delta >= 0 and random_numbers[delta] > random_numbers[j]:
      random_numbers[delta], random_numbers[j] = random_numbers[j], random_numbers[delta]
      j = delta
      delta = j - d
      #print(j, d, delta, random_numbers[delta], random_numbers[j])  
  d //= 2
  print(random_numbers)


  #4 4 0 83 75
  #  ! 0 True
  #0 4 -4 83 75
  #5 4 1 94 81
  #  ! 1 True
  #1 4 -3 94 81
  #6 4 2 85 75
  #  ! 2 True
  #2 4 -2 85 75
  #7 4 3 83 28
  #  ! 3 True
  #3 4 -1 83 28