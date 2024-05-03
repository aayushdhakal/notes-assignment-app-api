import { Column, DataType, Model, Table, Unique } from "sequelize-typescript";

@Table({ tableName: 'User' })
export class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        defaultValue:DataType.UUIDV1,
        allowNull:false
    })
    id:string;

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    name:string;

    @Column({
        type:DataType.STRING,
        unique:true,
        allowNull:false
    })
    username:string;

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    password:string;

    @Column({
        type:DataType.STRING,
        unique:true,
        allowNull:false
    })
    email: string;

    @Column({
        type:DataType.STRING,
        allowNull:true
    })
    phoneNumber:string;
}