/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-11 00:04:44
 * @LastEditors: liuhongbo liuhongbo@dip-ai.com
 * @LastEditTime: 2023-02-14 17:30:49
 * @FilePath: /minibbs/src/user/const.ts
 * @Description: user const
 */
/**
 * @description 角色枚举
 * @param user 用户
 * @param blockManager 板块管理
 * @param ZoneManager 分区管理
 * @param SiteOwner 站点管理
 */
export enum RoleEnum {
    'user',
    'blockManager',
    'ZoneManager',
    'SiteOwner'
}

/**
 * @description 性别枚举
 */
export enum GenderEnum {
    'male',
    'female',
    'unknown',
}

/**
 * @description 会员身份
 * @param 0 allPower 至高无上，属于站长
 * @param 1 ordinaryVip 普通会员
 * @param 2 smallVip  小会员
 * @param 3 BipVip  大会员
 */
export enum IentityEnum {
    'allPower',
    'ordinaryVip',
    'smallVip',
    'BipVip',
}
