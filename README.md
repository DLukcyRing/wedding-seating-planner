# 婚礼座位安排网站

一个美观且功能完善的婚礼座位安排工具，支持宾客管理、餐桌布局、Excel导入等功能。

## 功能特点

- 🎀 优雅的粉色主题界面
- 👥 宾客管理（添加、删除、搜索）
- 🪑 餐桌管理（添加、删除、设置）
- 📁 Excel 文件导入宾客名单
- 🖱️ 拖拽安排座位
- 📥 导出座位安排
- 📱 响应式设计

## 部署到 Vercel

### 方法一：使用 Vercel Dashboard（推荐）

1. **将代码推送到 GitHub/GitLab/Bitbucket**

   首先初始化 Git 仓库并推送代码：

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <你的仓库地址>
   git push -u origin main
   ```

2. **登录 Vercel**

   访问 [vercel.com](https://vercel.com) 并使用 GitHub/GitLab/Bitbucket 账号登录。

3. **导入项目**

   - 点击 "New Project"
   - 选择你的仓库
   - 点击 "Import"

4. **配置项目**

   - **Project Name**: 输入项目名称（例如：wedding-seating-planner）
   - **Framework Preset**: 选择 "Other"
   - **Root Directory**: 保持默认
   - **Build Command**: 留空
   - **Output Directory**: 输入 `public`
   - **Install Command**: 留空

5. **部署**

   点击 "Deploy" 按钮，等待部署完成。

### 方法二：使用 Vercel CLI

1. **安装 Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel**

   ```bash
   vercel login
   ```

3. **部署项目**

   在项目根目录下运行：

   ```bash
   vercel
   ```

   按照提示回答问题：
   - Set up and deploy? → `Yes`
   - Which scope? → 选择你的账号
   - Link to existing project? → `No`
   - What's your project's name? → 输入项目名称
   - In which directory is your code located? → `./`
   - Want to modify these settings? → `No`

4. **生产环境部署**

   ```bash
   vercel --prod
   ```

## Excel 导入格式

Excel 文件格式要求：

| 宾客姓名 | 宾客类型（可选） |
|---------|-----------------|
| 张三     | 家人            |
| 李四     | 朋友            |
| 王五     | 同事            |

- 第一列：宾客姓名（必填）
- 第二列：宾客类型（可选，如：家人、朋友、同事等）
- 支持格式：`.xlsx`, `.xls`, `.csv`

## 本地开发

1. 安装依赖：

   ```bash
   npm install
   ```

2. 启动开发服务器：

   ```bash
   npm run dev
   ```

3. 访问 `http://localhost:8080`

## 项目结构

```
YSordertest/
├── public/
│   └── index.html          # 主页面
├── database.js             # 数据库配置
├── server.js               # Express 服务器
├── vercel.json             # Vercel 配置
├── package.json            # 项目配置
└── README.md               # 说明文档
```

## 技术栈

- 前端：HTML5, CSS3, JavaScript
- 后端：Node.js, Express
- Excel 解析：SheetJS (xlsx)
- 部署：Vercel

## 许可证

MIT
