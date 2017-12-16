
// export class User {
//     constructor(id, name, room) {
//         this.id = id;
//         this.name = name;
//         this.room = room;
//     }
// }


class Users {
    constructor () {
        this.users = [];
    }

    addUser(id, name, room) {
        //var u = new User(id, name, room);
        var u = {id, name, room};
        this.users.push(u);
        return u;
    }

    removeUser(id) {
        var u = this.getUser(id);
        if (u)
            this.users = this.users.filter( (user) => user.id !== id);
        return u;
    }

    getUser(id) {
        var u = this.users.find( (user) => user.id === id);
        return u;
    }

    getUserList(room) {
        var users = this.users.filter( (user) => user.room === room) ;
        var namesArray = users.map( (user) => user.name);
        return namesArray;
    }
}

module.exports = {Users};