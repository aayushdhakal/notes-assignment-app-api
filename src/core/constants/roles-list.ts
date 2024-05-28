

// const roles = ['superuser','admin','moderator','contributor','user','guest']

// const roles = {
//     SUPERUSER:'superuser',
//     ADMIN:'admin',
//     MODERATOR:'moderator',
//     CONTRIBUTOR:'contributor',
//     USER:'user',
//     GUEST:'guest'
// }
export type RoleList = 'superuser' | 'admin' | 'moderator' | 'contributor' | 'user' | 'guest' | 'banned';
export const getMaximumRolesPrivilege = ( role:RoleList ):Array<string> =>{
    const roles: {[key:string]:string} = {
        SUPERUSER:'superuser',
        ADMIN:'admin',
        MODERATOR:'moderator',
        CONTRIBUTOR:'contributor',
        USER:'user',
        GUEST:'guest'
    }

    const rolesPriviledges:Array<string> = [];

    for ( const val in roles){
        rolesPriviledges.push(roles[val]);
        if(roles[val] == role){
            break;
        }
    }
    return rolesPriviledges;
}