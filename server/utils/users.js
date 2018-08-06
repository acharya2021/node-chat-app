class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        // return user that was removed
        var user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }

    getUser(id) {
        // get a user by id
        return this.users.filter((user) => user.id === id)[0]

        // var oneUser = this.users.filter((user) => {
        //     return user.id === id;
        // });
        // return oneUser;
    }

    getUserList(room) {
        var users = this.users.filter((user) => {
            return user.room === room;
        });

        var namesArray = users.map((user) => {
            return user.name;
        });

        return namesArray;
    }
}

module.exports = {Users};


// class Person {
//     constructor(name, age) {
//         // console.log(name, age);
//         this.name = name;
//         this.age = age;
//     }
//
//     getUserDescription() {
//         return `${this.name} is ${this.age} years old.`;
//     }
// }
//
// var me = new Person("Abhi", 25);
//
// console.log(me.name);
// console.log(me.age);
// console.log(me.getUserDescription());