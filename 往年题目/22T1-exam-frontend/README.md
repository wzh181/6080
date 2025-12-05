# 22T1 Exam Frontend

纯前端静态页面实现，使用 React + Vite。

## 项目结构

```
22T1-exam-frontend/
├── src/
│   ├── components/       # 可复用组件
│   │   ├── Sidebar.jsx
│   │   ├── Sidebar.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── pages/            # 页面组件
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── Operations.jsx
│   │   ├── Operations.css
│   │   ├── Memory.jsx
│   │   ├── Memory.css
│   │   ├── Space.jsx
│   │   └── Space.css
│   ├── utils/            # 工具函数
│   │   ├── api.js        # API调用
│   │   └── storage.js    # localStorage工具
│   ├── App.jsx           # 主应用
│   ├── App.css
│   ├── main.jsx          # 入口文件
│   └── index.css
├── package.json
├── vite.config.js
└── index.html
```

## 安装和运行

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 功能说明

### Sidebar（右侧边栏）
- 固定在右侧，100px宽
- 包含logo和4个链接：Home, Operations, Memory, Space
- 响应式设计：
  - < 1400px: 宽度60px，文字缩写
  - < 800px: 宽度30px，logo消失

### Footer（底部栏）
- 固定在底部，50px高
- 宽度是viewport减去sidebar宽度
- 背景色#999

### Home (`/home`)
- 显示"Please choose an option from the sidebar."
- 显示"Games left to win: X (reset)"
- X从API获取初始值，存储在localStorage
- 每次游戏胜利X减1
- 到0时显示"Congratulations!"并重置
- Reset按钮重置X

### Operations (`/operations`)
- 操作符填空游戏
- 5个等距区域：数字1、4个操作按钮(+, -, x, ÷)、数字2、=、输出数字
- 使用提供的数字数组
- 用户选择操作符，正确显示win，错误显示incorrect
- 5组数字后可以循环

### Memory (`/memory`)
- 闪烁记忆游戏
- 上半部分4个按钮A, B, C, D
- 下半部分一个instruction box (20x20px)
- 游戏开始时，X=1，显示X个随机字符
- 用户需要按顺序点击按钮
- X递增，直到X=5时获胜
- 错误时重新开始

### Space (`/space`)
- 太空入侵者游戏
- 500x500px游戏窗口
- 底部左侧10x10px红色方块（shooter）
- 顶部2行，每行10个20x20px黑色方块
- 左右箭头移动shooter，空格键射击
- 所有黑色方块消失时获胜

## 注意事项

- **纯前端静态实现**：所有数据存储在localStorage
- **API调用**：Home会从API获取初始分数
- **响应式设计**：Sidebar和Footer在不同屏幕尺寸下自动调整

## 代码风格

- 使用函数组件和React Hooks
- 使用CSS模块化（每个组件有自己的CSS文件）
- 遵循React最佳实践
- 纯前端实现，无后端依赖

