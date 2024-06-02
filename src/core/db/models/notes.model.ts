import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "./users.model";


@Table({ tableName: 'notes' })
export class Note extends Model<Note> {
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        defaultValue:DataType.UUIDV1,
        allowNull:false
    })
    id:string;

    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    name:string;

    @Column({
        type: DataType.STRING,
        allowNull:true
    })
    description:string;

    @Column({
        type: DataType.STRING,
        allowNull:false,
        defaultValue:DataType.UUIDV1,
        unique:true
    })
    note_code:string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull:false,
        defaultValue:true
    })
    is_active:boolean;

    @Column({
        type: DataType.ENUM,
        values:['public','private'],
        allowNull:false
    })
    view_type:string;

    
    @ForeignKey(()=>User)
    @Column({
        type: DataType.STRING,
        allowNull:false,
    })
    user_id:string;

    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    group_id:string


    // ----------------------- Associations ------------------------

    @BelongsTo(()=>User)
    user:User;
}

// Note.belongsTo(User);


// Post.belongsTo(User); 
// This adds a foreign key column 'UserId' in the 'Posts' table

// Alternatively, if you want to explicitly specify the foreign key column name:
// Post.belongsTo(User, { foreignKey: 'userId' });