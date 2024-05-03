import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import { User } from '../../core/db/models/users.model';
import { UserCreateDto } from './dto/users.dto';

@Injectable()
export class UsersService {
    constructor(
        @Inject(USER_REPOSITORY) private readonly userRepository:typeof User
    ){}

    async create(user:UserCreateDto):Promise<User>{
        return await this.userRepository.create<User>(user);
    }

    async findOneByEmail(email:string):Promise<User>{
        return  await this.userRepository.findOne<User>({where:{email}});
    }
    
    async findOneByUsername(username:string):Promise<User>{
        return await this.userRepository.findOne<User>({where:{username}});
    }

    async getUserById(id:string):Promise<User>{
        return await this.userRepository.findOne<User>({where:{id}});
    }

    async findOneById(id:string):Promise<User>{
        return await this.userRepository.findOne<User>({where:{id}});
    }

    async deleteUser(id):Promise<Number>{
        const count =await this.userRepository.destroy({where:{
            id
        }});
        return count;
    }

    async updateOne(id,updateInfo){
        this.userRepository.update(updateInfo,{where:{id}});
    }

}
