/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-04-03 17:59:13
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-03 17:59:36
 * @FilePath: /minibbs/src/operationCoin/const.ts
 * @Description: 用户金币变更
 */
/**
 * @description 金币操作枚举
 * @param Login 登录
 * @param PostArtical 发帖
 * @param DeleteArtical 删帖
 * @param ReplyArtical 发评论
 * @param DeleteReply 删评论
 * @param RelyComment 回复评论
 * @param DeleteComment 删除评论
 * @param DownloadDetachmentFile 下载附件
 * @param BuyBadge 购买勋章
 * @param Tranfer 转账
 * @param EventRewards 活动奖励
 * @param SystemOperation 系统操作
 * @param SystemOperation 游戏操作
 */
export enum CoinOperationType {
    Login,
    PostArtical,
    DeleteArtical,
    ReplyArtical,
    DeleteReply,
    RelyComment,
    DeleteComment,
    DownloadDetachmentFile,
    BuyBadge,
    Tranfer,
    EventRewards,
    SystemOperation,
    Game
}