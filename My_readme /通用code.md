命令,中文指引,什么时候用？
git status,查看当前状态,最重要命令！ 随时都可以用。它会告诉你哪些文件被改了、还没存、或者分支落后了。
git log,查看历史提交记录,想看自己以前交过什么版本，或者看队友写了什么。按 q 退出。
git remote -v,查看远程仓库地址,关键！ 检查你现在的代码是推送到 GitHub 还是学校的 GitLab。
命令,中文指引,什么时候用？
git status,查看当前状态,最重要命令！ 随时都可以用。它会告诉你哪些文件被改了、还没存、或者分支落后了。
git log,查看历史提交记录,想看自己以前交过什么版本，或者看队友写了什么。按 q 退出。
git remote -v,查看远程仓库地址,关键！ 检查你现在的代码是推送到 GitHub 还是学校的 GitLab。
命令,中文指引,什么时候用？
git clone <链接>,克隆（下载）仓库,做作业第一步。把学校的作业仓库下载到本地。
git pull,拉取（下载）最新更新,如果你在另一台电脑提交了代码，或者老师更新了作业要求，回到这台电脑先 pull。
命令,中文指引,什么时候用？
git commit ... --no-verify,强制提交（跳过检查）,"当遇到 ""lint error"" 或 ""commit rejected"" 等代码检查太严格导致无法提交时使用。"
git remote add origin <链接>,添加远程地址,仓库是新建的，还没告诉 Git 远程服务器在哪时用。
git remote set-url origin <链接>,修改远程地址,比如你想从 GitHub 换到 GitLab，或者链接填错了要修改时。
NPM 命令,Yarn 命令 (推荐你用这个),作用
npm install,yarn install (或只输 yarn),安装依赖
npm start,yarn start,启动项目
npm test,yarn test,运行测试
npm install <包名>,yarn add <包名>,安装新的库 (比如 yarn add bootstrap)