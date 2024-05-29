"use strict";
exports.__esModule = true;
exports.getMaximumRolesPrivilege = void 0;
exports.getMaximumRolesPrivilege = function (role) {
    var roles = {
        SUPERUSER: 'superuser',
        ADMIN: 'admin',
        MODERATOR: 'moderator',
        CONTRIBUTOR: 'contributor',
        USER: 'user',
        GUEST: 'guest',
        REQUEST: 'request',
        INVITATION: 'invitation',
        BANNED: 'banned'
    };
    var rolesPriviledges = [];
    for (var val in roles) {
        rolesPriviledges.push(roles[val]);
        if (roles[val] == role) {
            break;
        }
    }
    return rolesPriviledges;
};
