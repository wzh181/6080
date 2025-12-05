# 20T3 Exam Frontend

纯前端静态页面实现，使用 React + Vite。

## 项目结构

```
20T3-exam-frontend/
├── public/
│   ├── logo.png          # Header logo（需要添加）
│   └── shrek/            # Slido游戏图片（需要添加1.png到8.png）
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
│   ├── utils/            # 工具函数
│   │   ├── api.js        # 静态配置（无API调用）
│   │   └── storage.js    # localStorage工具
│   ├── data/             # 静态数据
│   │   └── blanko.js     # Blanko游戏字符串
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

### Dashboard (`/`)
- 显示游戏获胜次数
- 从localStorage读取数据
- 首次加载或重置时使用初始值（硬编码为5）

### Blanko (`/blanko`)
- 单词填空游戏
- 随机显示字符串，3个位置需要填写
- 全部填写正确后获胜
- 支持键盘导航（方向键切换输入框）

### Slido (`/slido`)
- 滑动拼图游戏
- 3x3网格，8张Shrek图片
- 使用鼠标点击或方向键移动
- 全部排列正确后获胜
- Solve按钮可自动解决
- Reset按钮重置游戏

### Tetro (`/tetro`)
- 简化版俄罗斯方块
- 10x12网格
- 三种方块类型：2x2、2x1、1x1
- 填满5行获胜，前8行有方块则失败
- 点击游戏板开始，使用左右方向键移动

## 注意事项

- **纯前端静态实现**：无后端API调用，所有数据存储在localStorage
- **资源文件**：
  - `public/logo.png` - Header的logo图片
  - `public/shrek/1.png` 到 `8.png` - Slido游戏的8张Shrek图片
- **响应式设计**：Header导航在800px以下显示缩写（H | B | S | T）

## 代码风格

- 使用函数组件和React Hooks
- 使用CSS模块化（每个组件有自己的CSS文件）
- 遵循React最佳实践
- 纯前端实现，无后端依赖

