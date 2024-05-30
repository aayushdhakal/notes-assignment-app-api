import { ROLE_SUPERUSER, ROLE_ADMIN, ROLE_MODERATOR, ROLE_USER, ROLE_GUEST , ROLE_REQUEST, ROLE_CONTRIBUTOR, ROLE_INVITATION } from 'src/core/constants';

// const roles = ['superuser','admin','moderator','contributor','user','guest']

// const roles = {
//     SUPERUSER:'superuser',
//     ADMIN:'admin',
//     MODERATOR:'moderator',
//     CONTRIBUTOR:'contributor',
//     USER:'user',
//     GUEST:'guest'
// }

export type RoleList = 'superuser' | 'admin' | 'moderator' | 'contributor' | 'user' | 'guest' | 'invitation' |'banned';

const roles: {[key:string]:string} = {
    SUPERUSER:'superuser',
    ADMIN:'admin',
    MODERATOR:'moderator',
    CONTRIBUTOR:'contributor',
    USER:'user',
    GUEST:'guest',
    REQUEST:'request',
    INVITATION:'invitation',
    BANNED:'banned'
}

// this function will give us the list of array above the role permission if the permission is provided as ROLE_USER then it give output ['superuser','admin','moderator','contributor','user'] as an array

export const getMaximumRolesPrivilege = ( role:RoleList ):Array<string> =>{

    const rolesPriviledges:Array<string> = [];

    for ( const val in roles){
        rolesPriviledges.push(roles[val]);
        if(roles[val] == role){
            break;
        }
    }
    
    return rolesPriviledges;
}

export const getMinimumRolesList = ( role:RoleList ):Array<string> =>{

    const entries = Object.entries(roles);
    const reversedEntries = entries.reverse();
    const reversedObject = Object.fromEntries(reversedEntries);

    const rolesPriviledges:Array<string> = [];

    for ( const val in reversedObject){
        rolesPriviledges.push(reversedObject[val]);
        if(reversedObject[val] == role){
            break;
        }
    }
    
    return rolesPriviledges;
}