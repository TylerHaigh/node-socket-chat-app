const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach( () => {
        users = new Users();
        users.users = [
            {
                id: '1',
                name: 'Tyler',
                room: 'Node Course'
            },
            {
                id: '2',
                name: 'John',
                room: 'React Course'
            },
            {
                id: '3',
                name: 'Jane',
                room: 'Node Course'
            }
        ];
    });

    it('should add new User', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Tyler',
            room: 'Home'
        };

        users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });


    it('Should return names for node course', () => {
        var usersList = users.getUserList('Node Course');
        expect(usersList).toEqual(['Tyler', 'Jane']);
    });

    it('Should return names for react course', () => {
        var usersList = users.getUserList('React Course');
        expect(usersList).toEqual(['John']);
    });




    it('Should get a user', () => {
        var user = users.getUser('1');
        expect(user).toEqual(users.users[0]);
    });

    it('Should not get a user', () => {
        var usersList = users.getUser('-1');
        expect(usersList).toBe(undefined);
    });




    it('Should remove a user', () => {
        var u = users.users[0];
        var user = users.removeUser('1');
        expect(user).toBe(u);
        expect(users.users.length).toBe(2);
    });

    it('Should not remove a user', () => {
        var user = users.removeUser('-1');
        expect(user).toBe(undefined);
        expect(users.users.length).toBe(3);
    });


});