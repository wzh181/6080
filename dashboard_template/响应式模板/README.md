# 响应式设计模板

基于 `dashboard_template` 风格的完整响应式模板。

## 文件结构

```
响应式模板/
├── App.jsx           # 主应用组件（包含Header、Footer、路由）
├── App.css           # 全局样式和响应式设计
├── Dashboard.jsx     # Dashboard页面组件
├── Dashboard.css     # Dashboard样式
├── Game1.jsx         # 游戏1示例组件
├── Game2.jsx         # 游戏2示例组件
├── Game3.jsx         # 游戏3示例组件
├── Game.css          # 游戏页面通用样式
└── README.md         # 说明文档
```

## 响应式设计特点

### 1. 断点设置
- **桌面端**：> 1400px（默认样式）
- **平板端**：≤ 1400px
- **移动端**：≤ 800px
- **小屏移动端**：≤ 480px

### 2. Header响应式
- **桌面端**：80px高，显示完整文字
- **平板端**：70px高，字体稍小
- **移动端**：60px高，显示缩写文字（H | G1 | G2 | G3）
- **小屏移动端**：50px高，更小的字体和间距

### 3. 文字显示策略
使用双文字模式：
```jsx
<span className="nav-long">Home</span>
<span className="nav-short">H</span>
```
通过CSS媒体查询控制显示/隐藏。

### 4. 布局适配
- 使用 `flexbox` 实现响应式布局
- 使用 `calc()` 计算内容区域高度
- 使用 `padding` 和 `gap` 调整间距

## 使用方法

1. 复制模板文件到你的项目
2. 根据需求修改组件内容
3. 调整CSS中的颜色、字体大小等样式
4. 根据需要添加更多断点

## 关键代码模式

### JSX模式 - 双文字显示
```jsx
<Link to="/">
  <span className="nav-long">Home</span>
  <span className="nav-short">H</span>
</Link>
```

### CSS模式 - 媒体查询
```css
/* 默认显示完整文字 */
.nav-long {
  display: inline;
}
.nav-short {
  display: none;
}

/* 移动端显示缩写 */
@media (max-width: 800px) {
  .nav-long {
    display: none;
  }
  .nav-short {
    display: inline;
  }
}
```

### 响应式高度计算
```css
.main-content {
  margin-top: 80px;  /* Header高度 */
  margin-bottom: 50px; /* Footer高度 */
  min-height: calc(100vh - 130px);
}

@media (max-width: 800px) {
  .main-content {
    margin-top: 60px;  /* 移动端Header高度 */
    margin-bottom: 40px; /* 移动端Footer高度 */
    min-height: calc(100vh - 100px);
  }
}
```

## 注意事项

1. **固定定位元素**：Header和Footer使用 `position: fixed`，需要给main-content添加相应的margin
2. **z-index层级**：Header通常设置为1000，Footer设置为999
3. **字体大小**：移动端字体应该适当缩小，但保持可读性
4. **触摸友好**：移动端按钮应该足够大（至少44x44px）
5. **间距调整**：移动端应该减少padding和gap，节省空间

