# Вопросы

#### array.includes
Захотелось использовать `array.includes` под целевую платформу node.js 6.

Для этого пришлось поставить модуль `@types/node` для того,
чтобы TypeScript узнал про типы ноды и внести изменения в
tsconfig.json: 
```
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "types": ["node"],
    "lib": ["es6","es5","dom","es2016.array.include"]
  }
}
```
Вопрос1: Так как про импорт типов сторонних библиотек на лекциях ещё
информации не было, то верно ли я всё понял и сделал?

Вопрос2: Заменяет или дополняет директива `compilerOptions.lib` в `tsconfig.json`
значения по умолчанию? Насколько я понял, то заменяет.  
Цитата из доки:
```
Note: If --lib is not specified a default library is injected.
The default library injected is:
 
► For --target ES5: dom,es5,scripthost
► For --target ES6: dom,es6,dom.iterable,scripthost
```
