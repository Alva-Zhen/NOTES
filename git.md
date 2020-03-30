```
//显示当前目录
pwd
```
```
git init;//初始化git
git add  //把文件添加到仓库
git commit -m "<提交说明>";//提交
git status;//查看当前仓库的状态
git log;//查看提交的历史记录

//回退版本
git reset --hard HEAD^;
git reset --hard HEAD~1;//回退到上一版本
git reset --hard <commit ID>;

git reflog;//记录执行过得命令
git diff HEAD -- <file>;//查看文件工作区和版本库里面最新版本的区别
git checkout -- <file>;//丢弃工作区的修改，让这个文件回到最近一次git commit或git add时的状态
```