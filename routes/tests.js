import express from "express";
const router = express.Router();

const users = {"users": [
    {
        "name": "joe",
        "color": "blue",
        "shape": "square",
        "id": "1"
    },
    {
        "name": "becky",
        "color": "orange",
        "shape": "triangle",
        "id": "2"
    },
    {
        "name": "alex",
        "color": "pink",
        "shape": "star",
        "id": "3"
    },
    {
        "name": "sam",
        "color": "green",
        "shape": "circle",
        "id": "4"
    },
]}

//Route for getting all users
router.get("/", (req, res) => {
    res.json(users);
});
//Route for getting a user by their ID
router.get("/:id", (req, res) =>{
    for (const testUser of users.users) {
        if (testUser.id == req.params.id) {
            res.send(testUser);
            return
        }
    }
});

export default router;