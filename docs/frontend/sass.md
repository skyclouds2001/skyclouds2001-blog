---
title: Sass
lang: zh-CN
---

## 1.变量

以美元符号 $ 开头

```scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

## 2.嵌套

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
  }

  li { display: inline-block; }

  a {
    display: block;
  }
}
```

## 3.模块

```scss
@use 'base';  // from _base.scss

.inverse {
  background-color: base.$primary-color;
  color: white;
}
```

## 4.混合

```scss
@mixin theme($theme: DarkGray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, .25);
  color: #fff;
}

.info {
  @include theme;
}
.alert {
  @include theme($theme: DarkRed);
}
.success {
  @include theme($theme: DarkGreen);
}
```

## 5.扩展

```scss
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

.message {
  @extend %message-shared;
}
```

## 6.函数

```text
math.div(300px, 960px)
```
