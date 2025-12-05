# 25T1 Exam Frontend

纯前端静态页面实现，使用 React + Vite。

## 项目结构

```
25T1-exam-frontend/
├── src/
│   ├── components/       # 可复用组件
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── Stats.jsx
│   │   └── Stats.css
│   ├── pages/            # 页面组件
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.css
│   │   ├── NumberMemory.jsx
│   │   ├── NumberMemory.css
│   │   ├── TreasureHunt.jsx
│   │   ├── TreasureHunt.css
│   │   ├── FlappyBird.jsx
│   │   └── FlappyBird.css
│   ├── utils/            # 工具函数
│   │   ├── api.js        # API调用
│   │   └── storage.js    # localStorage工具和统计
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

### Navbar（顶部导航栏）
- 固定在顶部，60px高
- 包含logo和4个链接：Dashboard, Number Memory, Treasure Hunt, Flappy Bird
- 响应式设计：
  - < 1400px: 高度50px，文字缩写
  - < 800px: 高度40px，文字缩写

### Dashboard (`/dashboard`)
- 显示"Games you need to win:"
- 显示剩余游戏数（红色，4em）
- Reset按钮重置计数器
- 从API获取初始值

### Number Memory (`/game/numbermemory`)
- 数字记忆游戏
- 显示随机数字3秒，然后输入
- 正确时数字位数+1，错误时游戏结束
- 得分4或以上获胜
- 显示平均分和最佳分数

### Treasure Hunt (`/game/treasurehunt`)
- 寻宝游戏
- 设置时间限制和目标金币数
- 点击圆圈揭示颜色（黄色或棕色）
- 在时间限制内找到所有黄色金币获胜
- 显示倒计时和剩余金币数

### Flappy Bird (`/game/flappybird`)
- 简化版Flappy Bird
- 点击或按空格键跳跃
- 通过障碍物得分
- 得分3或以上获胜
- 碰撞或触底游戏结束

### Stats（统计面板）
- 仅在桌面视口显示（>1200px）
- 显示各游戏的平均分、最佳分数、获胜次数、游戏次数
- 显示剩余游戏数和总回合获胜数

## 注意事项

- **纯前端静态实现**：所有数据存储在localStorage
- **API调用**：Dashboard会从API获取初始分数
- **响应式设计**：Navbar在不同屏幕尺寸下自动调整
- **统计功能**：自动记录游戏数据并计算统计信息

## 代码风格

- 使用函数组件和React Hooks
- 使用CSS模块化（每个组件有自己的CSS文件）
- 遵循React最佳实践
- 纯前端实现，无后端依赖

