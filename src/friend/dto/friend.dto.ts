/*
* @Author: liuhongbo 916196375@qq.com
* @Date: 2023-02-12 19:11:28
* @LastEditors: liuhongbo 916196375@qq.com
* @LastEditTime: 2023-02-12 20:15:09
* @FilePath: \minibbs\src\friend\dto\friend.dto.ts
* @Description: friend dto
*/

import { IsNumber } from "class-validator";
import { User } from "src/user/entities/user.entity";
import { Friend } from "../entities/friend.entity";
export class GetFriendDto {
    @IsNumber()
    uid: number
    @IsNumber()
    pageSize?: number
    @IsNumber()
    pageNum?: number
}

type PickGetFriendsFieldsInGetFriendReturnDto = 'friendUid' | 'nickName' | 'addTime'
export interface GetFriendReturnDto extends Pick<Friend, PickGetFriendsFieldsInGetFriendReturnDto>, Pick<User, 'username'> { }
