# cpr

## Скачать архивом:
https://github.com/Timur00Kh/cpr/releases

## Смотреть демо:
https://timur00kh.github.io/cpr/

# Локализация

В папке `l18n` лежать все текущие локализации. При добавлении новго файла, после билда в папке `dist` появится соответствующий html файл на этом языке.

```json
{
  "main_index": true,
  "lang": {},
  "meta": {},
  "data": {}
}
```

+ `main_index` - локализация со значение `true` будет дополнительно собрана как точка входа (/dist/index.html). Если таких файлов несколько берется первая по алфавиту.
+ `lang` - параметры языка.
+ `meta` - данные html метатегов.
+ `data` - данные локализации.

# Build

```bash
npm run build
```
