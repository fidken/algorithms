using System;

class Program {
  public static void Main (string[] args) {
    var peremen = 0;
    // int[] numbers = new int[5]; //объявление массива из 5 элементов
    int[] numbers = { 1, 2, 3, 4, 5 }; //инициализация массива
    int length = numbers.Length; // длина массива
    Array.Sort(numbers); // сортировка массива
    Array.Reverse(numbers); //обращение элементов массива
    int[] newNumbers = new int[5];
    Array.Copy(numbers, newNumbers, numbers.Length); //копирует элементы из одного массива в другой.
    int index = Array.IndexOf(numbers, 3); //находит индекс первого вхождения элемента в массиве
    Array.Resize(ref numbers, 10); // изменяет размер до 10
     Array.Clear(numbers, 0, numbers.Length); // очищает весь массив
     bool exists = Array.Exists(numbers, element => element == 3); //Проверяет, существует ли элемент в массиве, соответствующий условию.
    int foundNumber = Array.Find(numbers, element => element > 3); //Находит первый элемент, соответствующий условию.
     int[] foundNumbers = Array.FindAll(numbers, element => element > 3); //Находит все элементы, соответствующие условию.
    Array.ForEach(numbers, Console.WriteLine); // Применяет действие к каждому элементу массива.
    int[,] multiDimensionalArray = new int[2, 3]; // двумерный массив
    foreach (int number in numbers)
    {
        Console.WriteLine(number);
    }
    //Это основные методы и свойства работы с массивами в C#. Для более сложных задач можно рассмотреть использование коллекций из пространства имен System.Collections.Generic, таких как List<T>, которые предоставляют более гибкие возможности для работы с динамическими наборами данных.

    void InsertionSort(int[] array)
    {
        for (int i = 1; i < array.Length; i++)
        {
            int key = array[i];
            int j = i - 1;
            
            while (j >= 0 && array[j] > key)
            {  
                Console.WriteLine("Target: " + string.Join(", ", array[j+1]));
                Console.WriteLine("Array in process: " + string.Join(", ", array));
                array[j + 1] = array[j];
                Console.WriteLine("Array in process: " + string.Join(", ", array));
                j--;
            }
            array[j + 1] = key;
          Console.WriteLine("Array in process: " + string.Join(", ", array));
        }
    }
    

    int[] randomArray = { 5, 2, 9, 1, 5, 6 };
    int[] sortedArray = { 1, 2, 3, 4, 5 };
    int[] reverseSortedArray = { 5, 4, 3, 2, 1 };
    int[] arrayWithDuplicates = { 3, 1, 4, 4, 2, 2 };

    InsertionSort(randomArray);
    Console.WriteLine("Array: " + string.Join(", ", randomArray));



















    string? name = Console.ReadLine();
    Console.WriteLine ("Матод сортировки вставками");
    Console.Write ($"1234556 {peremen}");
    
  }
}