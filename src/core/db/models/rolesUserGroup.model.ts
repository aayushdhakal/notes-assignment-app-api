import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model,Table, Unique  } from "sequelize-typescript";
import { User } from "./users.model";
import { Groups } from "./groups.model";
import { Roles } from "./roles.model";


@Table({ tableName: 'roles_user_groups' })
export class RolesUserGroup extends Model<RolesUserGroup>{
    @Column({
        type:DataType.STRING,
        allowNull:false,
        primaryKey:true,
        defaultValue:DataType.UUIDV1,
    })
    id:string;
    
    @Unique('groupId-userId')
    @ForeignKey(()=>User)
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    user_id:string;

    @Unique('groupId-userId')
    @ForeignKey(()=>Groups)
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    group_id:string

    @ForeignKey(()=>Roles)
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    roles_id:string;

    // ----------Association----------------

    @BelongsTo(()=>Groups)
    group:Groups;

    @BelongsTo(()=>User)
    user:User;

    @BelongsTo(()=>Roles)
    role:Roles;
}