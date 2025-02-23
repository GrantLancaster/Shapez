import express from "express";
import usersRoute from "./routes/users.js";
import testsRoute from "./routes/tests.js";
import { validateData } from "./public/Script/validation.js";

// ------- FUNCTIONS -------------
function normalizePort(value) {
    const port = parseInt(value,10);

    if (isNaN(port)) {
        return value;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
// -------------------------------
//dotenv.config();
const app = express();

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
    if (res.err) {
        res.status(500);
        res.send("Sorry, the server ran into an error.");
    }
    res.render("index");
});

// --- Use Route Files -----
app.use("/users", usersRoute);

const PORT = normalizePort(process.env.PORT || "3000");
app.listen(PORT, ()=>{
    console.log(`Server is Running on ${PORT}.`)
});
