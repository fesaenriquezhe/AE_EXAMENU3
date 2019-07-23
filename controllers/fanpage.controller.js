//Instancia del modelo de Usuarios vacia
let _fanpage;

const createFanpage = (req, res) => {
    const fanpage = req.body;
    _fanpage.create(fanpage)
    .then((data) =>{
        res.status(200);
        res.json({
            msg:"Fanpage creado correctamente",
            data:data
        });
    }) 
    .catch((err)=>{
        res.status(400);
        res.json({
            msg:"Error",
            data:err
        });
    })
}

const getFanpageBySearch = (req,res) => {
    var keyword = req.params.keyword;
    var finalData=[];
    _fanpage.find()
    .then((data) => {
        if(data.length == 0){
            res.status(204),
            res.json({
                msg:"No se encontraron fanpages con esta busqueda"
            }) 
        }
        else{
            data.forEach(fPage => {
                if(fPage.keywords.includes(keyword)){
                    finalData.push(fPage);
                }
            });
            res.status(200),
            res.json({
                data:finalData
            })
        }
    })
    .catch((err) => {
        res.status(400);
        res.json({
            msg:"Error",
            data:err
        })
    })
}

const getGlobalCalif = (req,res) => {
    var finalData = 0;
    const id = req.params.id;
    _fanpage.find({"_id":id})
    .then((data) => {
        data[0]["calif"].forEach(calif => {
            finalData += calif;
        });
        res.status(200),
        res.json({
            globalCalif:finalData/data[0]["calif"].length
        })
    })
    .catch((err) => {
        res.status(400);
        res.json({
            data:err
        })
    })
}



const addKeyword = async (req,res) => {
    const id = req.params.id;
    const keyword = req.body;
    var finalData;

    _fanpage.find({"_id":id})
    .then( async (data) =>  {
        finalData = await pushArrayKeywords(keyword,data);
        res.status(200);
        res.json({
            data:finalData
        })
    })
    .catch((err) => {
        res.status(400);
        res.json({
            data:err
        })
    })
}


const pushArrayKeywords = async (ArrayKeywords,fanpage) => {
    ArrayKeywords.forEach(keyw => {
        fanpage[0]["keywords"].push(keyw);
    });

    var dataFinal;
    await fanpage[0].save()
    .then((data) => {
        dataFinal= data;
      return data;
    })
    .catch((err) => {
       console.log(err);
    })

    return dataFinal;
}



//Se inicializa la variable 
module.exports = (Fanpage) =>{
    _fanpage = Fanpage;
    return ({
        createFanpage,
        getFanpageBySearch,
        getGlobalCalif,
        addKeyword
    });
}