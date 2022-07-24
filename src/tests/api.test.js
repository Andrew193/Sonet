import HttpHelper from "../helpers/httpHelper";

test("Test auth", (done) => {
    const callback = () => done();
    const callback1 = (error) => done(error);

    const testData = { email: "master@gmail.com", password: "qeQWE123!@#" };
    HttpHelper.USERS.authUser(testData, callback, callback1);

    //+
})

test("Test create user", (done) => {
    const callback = () => done();

    const callback1 = () => done({ "error": true });

    const testData = { email: "master@gmail.com", password: "qweQWE123!@#" };
    HttpHelper.USERS.createUser(testData, callback, callback1);
//+
})

//Do not open
test("Test create comment", (done) => {
    const callback = () => done();
    const callback1 = (error) => done(error);

    HttpHelper.POSTS.createComment("Test comment's text", 5, 1, "Default", 0, callback, callback1)
    //+
})

test("Test get all comments", (done) => {
    const callback = (error) => done(error)
    HttpHelper.POSTS.getAllComments(5, callback).then(response => done())
    //+
})

test("Test get one post", (done) => {
    const callback = (error) => done(error)
    HttpHelper.POSTS.getOnePost(1, callback).then(() => done())
    //+
})

test("Test get followingArray", (done) => {
    const callback = () => done()
    HttpHelper.FOLLOW.followingArray(callback, null, 1)
    //+
})


test("Test get followersArray", (done) => {
    const callback = () => done()
    HttpHelper.FOLLOW.followersArray(callback, null, 1)
    //+
})

test("Test get one obj", (done) => {
    HttpHelper.USERS.getOneObj(1).then(() => done()).catch((error) => done(error))
    //+
})

test("Test get p count", (done) => {
    const callback = () => done()
    HttpHelper.POSTS.getPCount(1, callback)
    //+
})

test("Test get posts", (done) => {
    HttpHelper.POSTS.getPosts(1).then(() => done()).catch((error) => done(error))
    //+
})

test("Test get one user", (done) => {
    HttpHelper.USERS.getOneUser(1).then(() => done()).catch((error) => done(error))
    //+
})

