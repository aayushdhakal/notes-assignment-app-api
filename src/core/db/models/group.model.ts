import { BelongsTo, Column, DataType, ForeignKey, Table , Model } from "sequelize-typescript";
import { User } from "./users.model";



@Table({tableName:'GroupTable'})
export class GroupTable extends Model<GroupTable>{
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
    is_creator:string;

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

    // @BelongsTo(()=>User)
    // creator:User;
}

