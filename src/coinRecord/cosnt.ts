/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-14 17:22:50
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-02-14 17:31:27
 * @FilePath: /minibbs/src/coin/cosnt.ts
 * @Description: coin const
 */

/**
 * @description 金币变更操作枚举
 * @param login 登录
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
 */
export enum OperationType {
    'login',
    'PostArtical',
    'DeleteArtical',
    'ReplyArtical',
    'DeleteReply',
    'RelyComment',
    'DeleteComment',
    'DownloadDetachmentFile',
    'BuyBadge',
    'Tranfer',
    'EventRewards',
    'SystemOperation',
}