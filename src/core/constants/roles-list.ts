

// const roles = ['superuser','admin','moderator','contributor','user','guest']

// const roles = {
//     SUPERUSER:'superuser',
//     ADMIN:'admin',
//     MODERATOR:'moderator',
//     CONTRIBUTOR:'contributor',
//     USER:'user',
//     GUEST:'guest'
// }
type Role = 'superuser' | 'admin' | 'moderator' | 'contributor' | 'user' | 'guest' ;
export const getMaximumRolesPrivilege = ( role:Role ):Array<string> =>{
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