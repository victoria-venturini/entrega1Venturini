import express from 'express';

const router = express.Router()

router.get("/", (req,res) => {
    res.render('index', {})
})
// router.get("/realTimeProducts", (req, res) => {
//     res.render('realTimeProducts', {});
// });

export default router 