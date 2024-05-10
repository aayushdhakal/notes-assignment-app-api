import { Column, DataType, HasMany, Model, Table, Unique } from "sequelize-typescript";
import { Note } from "./notes.model";
import { GroupTable } from "./group.model";

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

    // This is the relation specification on the side of the User
    // if it is CASCADE then the context follows. like if it is onDelete:'CASCADE' it will delete the following notes on another table LIKEWISE same for the CASCADE
    // if it is RESTRICT it will prevents the deletion or update
    // if it is SET NULL it will set null when deletion 
    // Just like other are NO ACTION
    @HasMany(()=>Note,{ onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    notes:Note[];

    @HasMany(()=>GroupTable,{ onDelete: 'SET NULL', onUpdate: 'SET NULL' })
    group:GroupTable[];
}

