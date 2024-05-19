const { uuidv1 } =require('uuid');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        //Add seed data insertion logic here
        await queryInterface.bulkInsert('roles', [
            {
                id:uuidv1(),
                name:'admin',
                description:'This is to symbolize the role of the group as the admin'
            }, {
                id:uuidv1(),
                name:'moderator',
                description:'This is to symbolize the role of the group as the moderator'
            }, {
                id:uuidv1(),
                name:'viewer',
                description:'This is to symbolize the role of the group as the viewer'
            }, {
                id:uuidv1(),
                name:'guest',
                description:'This is to symbolize the role of the group as the viewer'
            }
        ])
    }
}