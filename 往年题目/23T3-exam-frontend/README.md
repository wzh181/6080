# 23T3 Exam Frontend

纯前端静态页面实现，使用 React + Vite。

## 项目结构

```
23T3-exam-frontend/
├── src/
│   ├── components/       # 可复用组件
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── pages/            # 页面组件
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.css
│   │   ├── Blanko.jsx
│   │   ├── Blanko.css
│   │   ├── Slido.jsx
│   │   ├── Slido.css
│   │   ├── Tetro.jsx
│   │   └── Tetro.css
│   ├── data/             # 数据文件
│   │   ├── blanko.js
│   │   └── shrek/        # Shrek图片目录（需要8张图片）
│   ├── assets/           # 静态资源
│   │   └── logo.png      # Logo图片
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

### Header（顶部导航栏）
- 固定在顶部，80px高
- 包含logo和4个链接：Home, Blanko, Slido, Tetro
- 响应式设计：
  - > 800px: 显示完整文字
  - <= 800px: 显示缩写（H | B | S | T）

### Footer（底部栏）
- 固定在文档底部，50px高
- 背景色#999999

### Dashboard (`/`)
- 显示"Please choose an option from the navbar."
- 显示"Games won: X (reset)"
- X从API获取初始值，存储在localStorage
- 每次游戏胜利X增加1
- Reset按钮重置X

### Blanko (`/blanko`)
- 12个正方形容器，等距排列
- 随机显示7个字符串中的一个
- 3个随机非空格字符被替换为输入框
- 所有输入正确时显示"Correct!"并开始新游戏
- Reset按钮重新开始游戏

### Slido (`/slido`)
- 3x3滑动拼图游戏
- 8张Shrek图片，1个空白格
- 点击相邻单元格或使用方向键移动
- 所有图片按顺序排列时获胜
- Solve按钮自动解决
- Reset按钮重新开始

### Tetro (`/tetro`)
- 10x12网格简化版俄罗斯方块
- 3种方块类型：2x2、2x1、1x1
- 点击棋盘开始游戏
- 方块每秒下降1格
- 左右箭头键移动方块
- 5行变绿时获胜
- 前8行有方块时失败

## 注意事项

- **纯前端静态实现**：所有数据存储在localStorage
- **API调用**：Dashboard会从API获取初始分数
- **图片资源**：需要准备logo.png和8张Shrek图片
- **响应式设计**：Header在不同屏幕尺寸下自动调整

## 代码风格

- 使用函数组件和React Hooks
- 使用CSS模块化（每个组件有自己的CSS文件）
- 遵循React最佳实践
- 纯前端实现，无后端依赖

