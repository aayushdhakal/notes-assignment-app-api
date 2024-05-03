import { USER_REPOSITORY } from "src/core/constants";
import { User } from "src/core/db/models/users.model";


export const usersProviders = [{
    provide:USER_REPOSITORY,
    useValue:User
}]