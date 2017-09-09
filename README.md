# Simon-Games

## Introduce
1. 内容

* 仿照Fcc教程做的Simon Game 小游戏
* 实现了开关功能
* 实现了普通模式与strict模式两种游戏模式
* 连续20次正确则获胜，重新开始新游戏

2. 使用技术
* Jquery+手写css

3. 存在问题
* 使用原生的audio.play()会出现异步混乱，表现为音画不同步
* 第一条的原因：不能将audio文件放在js中加载，每次重新加载很慢的
