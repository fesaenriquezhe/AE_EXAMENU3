const router = require("express").Router();

module.exports = (wagner) => {
    const fanpageCtrl = wagner.invoke((Fanpage) => require("../controllers/fanpage.controller")(Fanpage));

    router.post("/",(req,res) => {
        fanpageCtrl.createFanpage(req,res);
    })

    router.get("/search/:keyword",(req,res) => {
        fanpageCtrl.getFanpageBySearch(req,res);
    })

    router.get("/calif/global/:id",(req,res) => {
        fanpageCtrl.getGlobalCalif(req,res);
    })

    router.put("/keyword/:id",(req,res) => {
        fanpageCtrl.addKeyword(req,res);
    })

    return router;
}