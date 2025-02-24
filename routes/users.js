import express from "express";
import { v4 as uuidv4 } from "uuid";
import { validateData } from "../public/Script/validation.js";

import { getAllUsers, getUser, createNewUser } from "../controllers/users_controller.js";

const router = express.Router();

//Route for getting all users
router.get('/', async (req, res) => {
    const users = await getAllUsers();
    res.send(users);
});

//Route for getting user by ID /:id
router.get("/", async (req, res)=>{
    const user = await getUser(id);
    res.send(user);
})

//Route for creating a user  POST
router.post("/", async (req, res) => {
    const request = {...req.body, id: uuidv4()}
    const { isValid, user } = validateData(request);
    if (isValid) {
        const ping = await createNewUser(user);
        const newUser = await getUser(user.id);
        res.send(newUser);
    } else {
        throw new Error("User Failed validation");
    }

});

export default router;