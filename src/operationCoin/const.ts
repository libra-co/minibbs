/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-04-03 17:59:13
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-04-18 10:16:59
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
 * @param ReplyComment 回复评论
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
    ReplyComment,
    DeleteComment,
    DownloadDetachmentFile,
    BuyBadge,
    Tranfer,
    EventRewards,
    SystemOperation,
    Game
}

/**
 * @description 系统默认的金币奖励，后续填到数据库中
 */
export const initReward = {
    [CoinOperationType.PostArtical]: {
        coin: 100,
        ex: 100,
    },
    [CoinOperationType.DeleteArtical]: {
        coin: -200,
        ex: -200,
    },
    [CoinOperationType.ReplyArtical]: {
        coin: 30,
        ex: 10,
    },
    [CoinOperationType.DeleteReply]: {
        coin: -60,
        ex: -20,
    },
    [CoinOperationType.ReplyComment]: {
        coin: 30,
        ex: 10,
    },
    [CoinOperationType.DeleteComment]: {
        coin: -60,
        ex: -20,
    },
    [CoinOperationType.DownloadDetachmentFile]: {
        coin: -50,
        ex: 0,
    },
}