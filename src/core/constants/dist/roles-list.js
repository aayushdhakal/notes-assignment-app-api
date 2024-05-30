"use strict";
exports.__esModule = true;
exports.getMinimumRolesList = exports.getMaximumRolesPrivilege = void 0;
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
// this function will give us the list of array above the role permission if the permission is provided as ROLE_USER then it give output ['superuser','admin','moderator','contributor','user'] as an array
exports.getMaximumRolesPrivilege = function (role) {
    var rolesPriviledges = [];
    for (var val in roles) {
        rolesPriviledges.push(roles[val]);
        if (roles[val] == role) {
            break;
        }
    }
    return rolesPriviledges;
};
exports.getMinimumRolesList = function (role) {
    var entries = Object.entries(roles);
    var reversedEntries = entries.reverse();
    var reversedObject = Object.fromEntries(reversedEntries);
    var rolesPriviledges = [];
    for (var val in reversedObject) {
        rolesPriviledges.push(reversedObject[val]);
        if (reversedObject[val] == role) {
            break;
        }
    }
    return rolesPriviledges;
};
