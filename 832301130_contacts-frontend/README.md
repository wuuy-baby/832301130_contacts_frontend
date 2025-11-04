# 联系人管理系统前端

## 项目简介
这是一个基于HTML、CSS和JavaScript的联系人管理系统前端页面，提供了联系人的添加、编辑、删除和搜索等功能。

## 技术栈
- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5

## 项目结构
```
00000000_concacts_frontend/
  ├── src/
  │   ├── contacts.html    # 主页面
  │   ├── app.js           # JavaScript逻辑
  │   └── styles.css       # 样式文件
  ├── README.md            # 项目说明
  └── codestyle.md         # 代码规范
```

## 功能特性
1. **添加联系人**：填写表单添加新联系人
2. **编辑联系人**：修改现有联系人信息
3. **删除联系人**：删除不需要的联系人，带确认提示
4. **搜索联系人**：根据姓名、电话、邮箱或地址搜索
5. **响应式设计**：适配各种屏幕尺寸

## 快速开始

### 前置条件
- 后端服务需运行在 http://localhost:5000
- 确保后端API可用

### 使用方法
1. 直接在浏览器中打开 `src/contacts.html`
2. 或者使用任何Web服务器托管前端文件

```bash
# 可以使用Python的简易服务器
cd 00000000_concacts_frontend
python -m http.server 8000
```

然后在浏览器中访问 http://localhost:8000/src/contacts.html

## API交互
前端通过以下API与后端交互：
- `GET /api/contacts` - 获取所有联系人
- `GET /api/contacts/<id>` - 获取单个联系人详情
- `POST /api/contacts` - 添加新联系人
- `PUT /api/contacts/<id>` - 更新联系人信息
- `DELETE /api/contacts/<id>` - 删除联系人

## 注意事项
- 确保后端服务正常运行
- 前端默认连接到 http://localhost:5000，如果后端地址不同，请修改 `app.js` 中的 `API_BASE_URL`