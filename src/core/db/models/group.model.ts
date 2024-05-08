import { Model } from "sequelize";
import { AllowNull, Column, DataType, PrimaryKey, Table } from "sequelize-typescript";



@Table({tableName:'group'})
export class GroupTable extends Model<GroupTable>{

    @Column({
        type:DataType.STRING,
        primaryKey:true,
        allowNull:false,
        defaultValue:DataType.UUIDV1
    })
    id:string;

    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique:true
    })
    name:string;

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
        allowNull:false,
    })
    group_code:string;
}