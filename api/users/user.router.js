const { 
    createUser, 
    getUsers, 
    getUserById, 
    getUserByUserId, 
    updateUser, 
    deleteUser,
    login,
    updatePws
} = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createUser);
router.get("/", checkToken, getUsers);
router.get("/userid/:userId", checkToken, getUserByUserId);
router.get("/:id", checkToken, getUserById);
router.patch("/", checkToken, updateUser);
router.delete("/", checkToken, deleteUser);
router.post("/login", login);
router.post("/updatePws", checkToken, updatePws);

module.exports = router;
