import { AllowNull, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript"

@Table({ tableName: 'roles' })
export class Roles extends Model<Roles>{

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
        unique:true,
    })
    name:string;

    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    description:string
}