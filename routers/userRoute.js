const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');

router.post('/login' , userCtrl.login)
router.get('/refresh_token' , userCtrl.refreshToken)
router.get('/logout' , userCtrl.logout)
router.get('/info', auth, userCtrl.getUser)
router.post('/register' , userCtrl.register)
router.get('/history', auth, userCtrl.history)
router.patch('/addCart',auth , userCtrl.addCart);


module.exports  = router