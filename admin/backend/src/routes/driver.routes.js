const driverController = require("../controllers/driver.controller");
const { driver_sift, user_sift } = require("../middlewares");

const Router = require("express").Router();

Router.post(
  "/create",
  [
    user_sift.checkDuplicateUserName,
    user_sift.checkDuplicatePhoneNo,
    user_sift.checkRolesExisted,
    driver_sift.checkDuplicateUserId,
    driver_sift.checkDuplicateDlno,
    driver_sift.checkDuplicateTruckNo,
  ],
  driverController.create
);

Router.get("/", driverController.fetch);

Router.get("/:id", driverController.get);

Router.post("/approve", driverController.approve);

Router.post("/update_status", driverController.update);

Router.delete("/:id", driverController.delete);

module.exports = Router;
