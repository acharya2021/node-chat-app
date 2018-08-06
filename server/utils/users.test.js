var expect = require("expect");
var {Users} = require("./users");

describe("Users", () => {

    var users;
    // gets called before every single test case
    // lets us initialize some data
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: "1",
            name: "Golden Retriever",
            room: "Pups of Today"
        }, {
            id: "2",
            name: "Tesla",
            room: "HorsePower"
        }, {
            id: "3",
            name: "Dalmatian",
            room: "Pups of Today"
        }, {
            id: "4",
            name: "Cat",
            room: "Catzilla"
        }
        ]
    });

    it("should add a new user to the array", () => {
        var users = new Users();
        var user = {
            id: "12",
            name: "Abhi",
            room: "Room1"
        };

        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it("should return names for Pups of Today", () => {
        var userList = users.getUserList("Pups of Today");
        expect(userList).toEqual(["Golden Retriever", "Dalmatian"]);
    });

    it("should return names for HorsePower", () => {
        var userList = users.getUserList("HorsePower");
        expect(userList).toEqual(["Tesla"]);
    });

    it("should remove a user", () => {
        var userId = "1";
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(3);

        //
        // var removedUser = users.removeUser("4");
        // expect(removedUser).toMatchObject({
        //     id: "4",
        //     name: "Cat",
        //     room: "Catzilla"
        // });
        //
        // expect(users.users.length).toBe(3);

    });

    it("should not remove user", () => {
        // assert the array has not changed
        var userId = '99';
        var user = users.removeUser(userId);

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(4);


        // var removedUser = users.removeUser("89");
        // expect(removedUser).toBe(undefined);
        // expect(users.users.length).toBe(4);
    });

    it("should find user", () => {
        var userId = '2';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
        // var oneUser = users.getUser("4");
        // expect(oneUser[0].id).toBe("4");
    });

    it("should not find a user", () => {
        var userId = '99';
        var user = users.getUser(userId);

        expect(user).toBeFalsy();
        // var noUser = users.getUser("90");
        // expect(noUser).toEqual([]);
    });
});