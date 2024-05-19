import { AllowNull, Column, DataType, Model,Table } from "sequelize-typescript";


@Table({ tableName: 'roles_user_groups' })
export class RolesUserGroup extends Model<RolesUserGroup>{
    @Column({
        type:DataType.STRING,
        allowNull:false,
        primaryKey:true,
        defaultValue:DataType.UUIDV1,
    })
    id:string;

    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    user_id:string;

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    group_id:string

    @Column({
        type:DataType.ARRAY(DataType.STRING),
        allowNull:false,
    })
    roles_id:string[];
}