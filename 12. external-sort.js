const fs = require('fs');
const path = require('path');

// Функция для сортировки одного блока данных
function sortBlock(data) {
    return data.sort((a, b) => a - b); // Для числовых данных
}

// Разделение данных на блоки
async function splitIntoSortedBlocks(inputFile, blockSize, tempDir) {
    const input = fs.createReadStream(inputFile, { encoding: 'utf-8' });
    let buffer = '';
    let blockCount = 0;

    // Создаём директорию для временных файлов
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    for await (const chunk of input) {
        buffer += chunk;
        const lines = buffer.split('\n');
        while (lines.length > blockSize) {
            const block = lines.splice(0, blockSize);
            const sortedBlock = sortBlock(block.map(Number));
            fs.writeFileSync(path.join(tempDir, `block${blockCount}.txt`), sortedBlock.join('\n'));
            blockCount++;
        }
        buffer = lines.join('\n');
    }

    if (buffer.trim()) {
        const sortedBlock = sortBlock(buffer.split('\n').map(Number));
        fs.writeFileSync(path.join(tempDir, `block${blockCount}.txt`), sortedBlock.join('\n'));
        blockCount++;
    }

    return blockCount;
}

// Слияние блоков
function mergeSortedBlocks(tempDir, blockCount, outputFile) {
    const streams = Array.from({ length: blockCount }, (_, i) =>
        fs.createReadStream(path.join(tempDir, `block${i}.txt`), { encoding: 'utf-8', highWaterMark: 1024 })
    );

    const output = fs.createWriteStream(outputFile, { encoding: 'utf-8' });
    const buffers = Array(blockCount).fill('');

    function getNextValue(i) {
        if (buffers[i].includes('\n')) {
            const [value, ...rest] = buffers[i].split('\n');
            buffers[i] = rest.join('\n');
            return Number(value);
        }
        return null;
    }

    let minHeap = [];

    streams.forEach((stream, i) => {
        stream.on('data', (chunk) => {
            buffers[i] += chunk;
            const value = getNextValue(i);
            if (value !== null) minHeap.push({ value, index: i });
        });
    });

    streams.forEach((stream, i) => {
        stream.on('end', () => {
            if (buffers[i]) {
                const value = getNextValue(i);
                if (value !== null) minHeap.push({ value, index: i });
            }
        });
    });

    streams.forEach((stream) => stream.on('close', checkCompletion));
    let completedStreams = 0;

    function checkCompletion() {
        completedStreams++;
        if (completedStreams === blockCount) {
            minHeap.sort((a, b) => a.value - b.value);
            while (minHeap.length > 0) {
                const { value, index } = minHeap.shift();
                output.write(value + '\n');
                const nextValue = getNextValue(index);
                if (nextValue !== null) {
                    minHeap.push({ value: nextValue, index });
                    minHeap.sort((a, b) => a.value - b.value);
                }
            }
            output.close();
        }
    }
}

// Основная функция
async function externalSort(inputFile, outputFile, blockSize = 100) {
    const tempDir = './temp_blocks';
    if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });

    const blockCount = await splitIntoSortedBlocks(inputFile, blockSize, tempDir);
    mergeSortedBlocks(tempDir, blockCount, outputFile);

    console.log(`Сортировка завершена. Отсортированный файл: ${outputFile}`);
}

// Пример использования
(async () => {
    await externalSort('input.txt', 'output.txt', 100);
})();
