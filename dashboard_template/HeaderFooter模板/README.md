# Header & Footer 模板

独立的Header和Footer组件模板，可直接复制使用。

## 文件

```
HeaderFooter模板/
├── Header.jsx        # Header组件
├── Header.css       # Header样式（响应式）
├── Footer.jsx       # Footer组件
├── Footer.css       # Footer样式（响应式）
├── 使用示例.jsx      # 使用示例
├── 使用示例.css      # 使用示例样式
└── README.md        # 说明文档
```

## 快速使用

### 1. 复制文件
- `Header.jsx` + `Header.css` → 你的项目
- `Footer.jsx` + `Footer.css` → 你的项目

### 2. 在App.js中使用
```jsx
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {/* 你的页面内容 */}
      </main>
      <Footer />
    </div>
  );
}
```

### 3. 添加样式
```css
.main-content {
  margin-top: 80px;  /* Header高度 */
  margin-bottom: 50px; /* Footer高度 */
  min-height: calc(100vh - 130px);
}
```

## 响应式特性

- **桌面端**：Header 80px高，显示完整文字
- **移动端（≤800px）**：Header 60px高，显示缩写（H | G1 | G2 | G3）

## 自定义

### 修改导航链接
在 `Header.jsx` 中修改 `navLinks` 数组：
```jsx
const navLinks = [
  { path: '/', label: 'Home', short: 'H' },
  { path: '/your-path', label: 'Your Label', short: 'YL' },
];
```

### 修改样式
在 `Header.css` 和 `Footer.css` 中修改颜色、高度等。

就这么简单！


