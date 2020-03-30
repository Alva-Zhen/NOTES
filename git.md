```
git init;//初始化git
git add <file>; //把文件添加到仓库
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
git rm <file>;//从仓库中删除文件

<!-- 分支 -->
git checkout -b <分支名>;//创建并切换到branch分支
git branch <分支名>;//创建分支
git checkout <branch>;//切换分支
git branch;//查看分支
git branch -d <branch>;//删除分支
git branch -D <branch>;//强制删除分支
<!-- 新版git对分支的操作 -->
git switch -c <branch>;//创建并切换分支
git switch <branch>;//切换分支

<!-- 合并分支 -->
git merge <branch>;//合并<branch>分支到当前分支上，默认以Fast forward模式合并分支
git merge --no-ff -m "<说明>" <branch>;//禁用Fast forward模式合并分支，以普通模式合并分支

<!-- 储藏工作区 -->
git stash;//“储藏”工作区
git stash list;//查看储藏的工作区列表
git stash apply;//恢复储藏起来的工作区
git stash drop;//删除储藏的储藏室
git stash pop;//恢复储藏的工作区的同时删除储藏室
git cherry-pick <id>;//将某一次提交复制到当前分支

<!-- 本地与远程库 -->
//origin其实是远程仓库的名字，也可以是别的
git remote;//查看远程库的信息
git remote -v;//查看远程库的详细信息
git remote add origin <远程仓库地址>;//关联远程仓库
git remote rm origin;//删除远程仓库
git checkout -b <branch> origin/<branch>;//在本地创建和远程分支对应的分支
git branch --set-upstream-to=origin/<branch> <branch>;//设置本地分支与远程仓库分支的连接
git pull;//推送本地内容到远程仓库
git push -u origin master;//第一次推送master分支的所有内容
git push origin <分支名>;//向远程仓库推送最新版修改  -u参数负责把远程仓库和本地仓库关联起了，并向远程仓库推送所有内容
git clone <远程仓库地址>;//将远程仓库clone到本地
git clone -b <branch> <远程仓库地址>;//clone分支到本地

<!-- 标签 -->
git tag <name>;//在当前分支打标签。默认标签是打在最新提交的commit上
git tag;//查看标签
git tag <name> <commit ID>;//给<commit ID>打标签
git show <tagName>;//查看标签的详细信息
git tag -a <tagName> -m "<说明>" <commit ID>;//-a指定标签名 -m说明
git tag -d <tagName>;//删除本地标签
git push origin <tagName>;//将标签名推送到远程仓库
git push origin --tags;//推送全部标签名
git push origin :refs/tags/<tagName>;//删除远程仓库标签名，要先删除本地的标签

<!-- 其他 -->
git log --graph ;//查看分支合并图
//git log --graph --pretty=oneline --abbrev-commit;//查看分支的合并情况
git rebase;//把分叉的提交历史“整理”成一条直线
```