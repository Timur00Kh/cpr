const fs = require('fs');
const path = require('path');

module.exports = (() => {
    const list = fs.readdirSync('l18n');

    if (list.length === 0) {
        throw new Error('В папке "l18n" не найденно ни одного языка')
    }

    const data = list
        .map(file => {
            let s;
            try {
                s = fs.readFileSync(path.join(__dirname, 'l18n', file), {encoding: "UTF-8"});
            } catch (e) {
                console.error(`Ошибка считывания файла "${file}"`);
                console.error(e);
                return null;
            }

            try {
                return JSON.parse(s)
            } catch (e) {
                console.error(`Ошибка парсинга json в файле "${file}"`);
                console.error(e);
                return null;
            }
        })
        .filter(e => e);

    return {
        languages: data.map(e => e.lang),
        data
    }
})();