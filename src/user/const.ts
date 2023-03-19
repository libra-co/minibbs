/*
 * @Author: liuhongbo liuhongbo@dip-ai.com
 * @Date: 2023-02-11 00:04:44
 * @LastEditors: liuhongbo 916196375@qq.com
 * @LastEditTime: 2023-03-19 13:28:11
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
export enum IdentityEnum {
    'allPower',
    'ordinaryVip',
    'smallVip',
    'BipVip',
}


// 星座枚举
export enum ConstellationEnToCn {
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagittarius',
    'Capricornus',
    'Aquarius',
    'Pisces',
}

// 预留账户UID（特殊账户uid）
export enum ReservedAccount {
    'stystem'
}


