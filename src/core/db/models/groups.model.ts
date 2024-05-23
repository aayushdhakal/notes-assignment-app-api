import { BelongsTo, Column, DataType, ForeignKey, Table , Model,HasMany } from "sequelize-typescript";
import { User } from "./users.model";
import { RolesUserGroup } from "./rolesUserGroup.model";


@Table({tableName:'groups'})
export class Groups extends Model<Groups>{
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        defaultValue:DataType.UUIDV1,
        allowNull:false
    })
    id:string;

    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique:true
    })
    name:string;

    // this is to say that this group has a creator with this 
    @ForeignKey(()=>User)
    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique:false
    })
    creator_id:string;

    @Column({
        type:DataType.BOOLEAN,
        allowNull:false,
        defaultValue:true
    })
    is_active:boolean;

    @Column({
        type:DataType.BOOLEAN,
        allowNull:false,
        defaultValue:true
    })
    is_public:boolean;

    @Column({
        type:DataType.STRING,
        allowNull:true,
    })
    description:string;

    @Column({
        type:DataType.STRING,
        allowNull:true,
    })
    group_code:string;

    // ----------------------- Associations ------------------------

    @HasMany(()=>RolesUserGroup,{ onDelete: 'SET NULL', onUpdate: 'SET NULL' })
    rolesUserGroup:RolesUserGroup[];

    @BelongsTo(()=>User)
    creator:User;


}

