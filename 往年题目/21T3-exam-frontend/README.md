# 21T3 Exam Frontend

纯前端静态页面实现，使用 React + Vite。

## 项目结构

```
21T3-exam-frontend/
├── src/
│   ├── components/       # 可复用组件
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   ├── pages/            # 页面组件
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.css
│   │   ├── Math.jsx
│   │   ├── Math.css
│   │   ├── Connect4.jsx
│   │   ├── Connect4.css
│   │   ├── Memory.jsx
│   │   └── Memory.css
│   ├── utils/            # 工具函数
│   │   ├── api.js        # API调用（可选）
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

### Navbar（底部导航栏）
- 固定在底部，100px高
- 包含5个链接：Logo, Dashboard, Math, Connect 4, Memorisation
- 响应式设计：
  - < 1400px: 高度80px，文字缩写
  - < 800px: 宽度60px，垂直布局

### Dashboard (`/dashboard`)
- 2x2网格布局
- 左上：剩余游戏数（默认5，可从API获取）
- 右上：获胜游戏数
- 左下：状态文本（"Keep going" 或 "Great job"）
- 右下：重置按钮

### Math (`/game/math`)
- 随机运算符游戏
- 5个容器：数字1、运算符、数字2、等号、输入框
- 支持 +, -, *, /, % 运算符
- 答案正确时显示"Congratulations"并重置

### Connect 4 (`/game/connect`)
- 10x10棋盘
- 两个玩家轮流下棋（蓝色和红色）
- 点击列插入硬币
- 4个同色连成一线获胜
- 获胜后3秒动画（黑白闪烁）
- 显示获胜信息和移动次数

### Memory (`/game/memory`)
- 4x4网格记忆游戏
- 5个阶段，每个阶段需要记忆更多单元格
- 单元格闪烁提示
- 按顺序点击正确单元格
- 完成第5阶段获胜

## 注意事项

- **纯前端静态实现**：所有数据存储在localStorage
- **API调用**：Dashboard会尝试从API获取剩余游戏数，失败则使用默认值5
- **响应式设计**：Navbar在不同屏幕尺寸下自动调整

## 代码风格

- 使用函数组件和React Hooks
- 使用CSS模块化（每个组件有自己的CSS文件）
- 遵循React最佳实践
- 纯前端实现，无后端依赖

