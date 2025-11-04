# 前端代码规范

## 规范来源
本代码规范主要基于以下官方标准：
- [HTML5 规范](https://html.spec.whatwg.org/)
- [CSS 规范](https://www.w3.org/Style/CSS/)
- [JavaScript 语言规范](https://tc39.es/ecma262/)
- [Bootstrap 最佳实践](https://getbootstrap.com/docs/5.3/getting-started/introduction/)

## HTML 规范

### 文档结构
- 使用语义化标签（header, nav, main, section, article, footer等）
- 每个HTML文件必须包含DOCTYPE声明、html、head和body标签
- 为html元素设置lang属性

### 命名规范
- 类名使用小写字母，单词之间用连字符（kebab-case）
- ID使用小写字母，单词之间用连字符
- 文件名使用小写字母，单词之间用连字符

### 属性规范
- 使用双引号包围属性值
- 自闭合标签（如img）不需要闭合斜杠
- 布尔属性（如required）直接写属性名

## CSS 规范

### 命名规范
- 类名使用BEM（Block Element Modifier）命名法
- 变量使用--variable-name格式
- 颜色值使用十六进制或RGB/RGBA

### 格式化
- 每条规则独占一行
- 大括号与选择器在同一行，之间有一个空格
- 冒号后有一个空格，分号后有一个换行
- 缩进使用4个空格

### 选择器
- 优先使用类选择器，避免使用ID选择器
- 避免使用标签选择器作为主选择器
- 避免使用通用选择器（*）

## JavaScript 规范

### 命名规范
- 变量和函数名：使用驼峰命名法（camelCase）
- 常量：使用全大写字母，单词之间用下划线（SNAKE_CASE）
- 类名：使用大驼峰命名法（PascalCase）

### 格式化
- 使用4个空格缩进
- 大括号使用Egyptian style（与语句在同一行）
- 每行代码不超过80个字符
- 语句结尾必须使用分号

### 变量声明
- 使用const声明常量，let声明变量，避免使用var
- 每个变量声明独占一行
- 避免声明未使用的变量

### 函数
- 使用函数声明或箭头函数
- 函数体简短，职责单一
- 为函数添加注释说明功能、参数和返回值

## Bootstrap 特定规范
- 优先使用内置类，避免覆盖核心样式
- 自定义样式放在单独的CSS文件中
- 组件使用遵循官方文档推荐的结构

## 示例

### HTML 示例
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>示例页面</title>
</head>
<body>
    <header class="page-header">
        <h1>示例标题</h1>
    </header>
    <main>
        <section class="content-section">
            <p class="content-text">示例内容</p>
        </section>
    </main>
</body>
</html>
```

### CSS 示例
```css
.card {
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
}

.card:hover {
    transform: translateY(-2px);
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
}
```

### JavaScript 示例
```javascript
// 常量声明
const API_BASE_URL = 'http://localhost:5000/api';

// 函数定义
function loadContacts() {
    fetch(`${API_BASE_URL}/contacts`)
        .then(response => response.json())
        .then(data => {
            contacts = data;
            renderContactsTable(data);
        })
        .catch(error => {
            console.error('加载失败:', error);
        });
}

// 事件监听
document.addEventListener('DOMContentLoaded', function() {
    loadContacts();
});
```