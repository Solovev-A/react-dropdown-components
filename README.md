# React dropdown components

Компоненты, представляют собой контролы с выпадающим списком в стиле Bootstrap 4: multiselect и autocomplete.

[Демо](https://solovev-a.github.io/react-dropdown-components/)

## Установка

```bash
npm install --save solovev-a/react-dropdown-components
```

Предполагается, что целевой проект использует некоторые зависимости:
```bash
npm install --save react react-dom styled-components
```

Решение [известной проблемы](https://github.com/facebook/react/issues/13991) с использованием хуков в библиотеках компонентов:
```bash
cd node_modules/react-dropdown-components
npm link ../react
```
