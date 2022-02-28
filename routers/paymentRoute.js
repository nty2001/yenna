const router = require("express").Router();
const paymentCtrl = require("../controllers/paymentCtrl");
const auth = require("../middleware/auth");
router
  .route("/payment")
  .get(auth,paymentCtrl. getpayments)
  .post(auth,paymentCtrl.createpayment);

module.exports = router;
