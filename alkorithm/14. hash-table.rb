# Чтение текста из файла
def read_file(file_name)
    begin
      File.read(file_name)
    rescue Errno::ENOENT
      puts "Файл не найден!"
      exit
    end
  end
  
  # Создание хеш-таблицы с цепочками (списками)
  def create_hash_table(text)
    hash_table = Hash.new { |hash, key| hash[key] = [] }  # Создаем хеш-таблицу с цепочками
  
    # Разбиение текста на слова и добавление их в хеш-таблицу
    text.each_line do |line|
      line.strip.split.each do |word|
        key = word.hash # Хешируем слово
        hash_table[key] << word # Добавляем слово в список для этого хеш-ключа
      end
    end
  
    hash_table
  end
  
  # Запись хеш-таблицы в файл
  def write_hash_table_to_file(hash_table, output_file)
    File.open(output_file, 'w') do |file|
      hash_table.each do |key, values|
        file.puts "Хеш: #{key} -> Слова: #{values.join(', ')}"
      end
    end
  end
  
  # Основная программа
  def main
    input_file = 'input.txt'  # Исходный файл
    output_file = 'output.txt' # Результирующий файл
  
    text = read_file(input_file)  # Читаем текст из файла
    hash_table = create_hash_table(text)  # Создаем хеш-таблицу
    write_hash_table_to_file(hash_table, output_file)  # Записываем в файл
  
    puts "Хеш-таблица успешно записана в #{output_file}"
  end
  
  # Запуск программы
  main
  