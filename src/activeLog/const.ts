/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-04-03 09:55:24
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-03 10:47:02
 * @FilePath: /minibbs/src/activeLog/const.ts
 * @Description: 操作日志
 */

/**
 * @description 操作枚举
 */
export enum OperationTypeId {
    PostArticle, // 发帖
    Comment, // 评论
    QueryArticle, // 搜贴
    MessageBoardComment, // 留言板留言
    Game, // 游戏（此后需要加给游戏加 分区比如）
}

export enum GameType {
    Boast, // 吹牛
    RockPaperScissors, // 石头剪刀布
    Dice, // 骰子
}
