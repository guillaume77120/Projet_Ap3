
let express = require('express')
let session = require('express-session')
var request = require('request');
var fs = require('fs');
var cookieParser = require('cookie-parser');
let app = express()
let bodyParser = require('body-parser')
let alert = require('alert')
const multer = require('multer');



let chaîneLongue = "Voici une très longue chaîne ";

//moteur de template
app.set('view engine', 'ejs')


//midleware


app.use('/fonts',express.static('fonts'))
app.use('/js',express.static('js'))
app.use('/css',express.static('css'))
app.use('/img',express.static('img'))
app.use('/assets',express.static('public'))
/*app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())*/


app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(bodyParser.json({limit: '10mb', extended: true}))

app.use(session({
  secret: 'xdfvcgbcfgv',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(require('./middlewares/flash'))

//Route

// test de l'API remove.bg
/*
request.post({
  url: 'https://api.remove.bg/v1.0/removebg',
  formData: {
    image_file: fs.createReadStream('img/tech.png'),
    size: 'auto',
  },
  headers: {
    'X-Api-Key': 'AYsDE1RixKuiQdF1z6wH7mya'
  },
  encoding: null
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  fs.writeFileSync("no-bg.png", body);
});*/




app.get('/', (request, response) => {
    console.log("Bienvenue " + request.session.prenom + ". Vous êtes maintenant connecté !")
    let messages = 'test'

        response.render('pages/index', {messages: messages, prenom:request.session.prenom})


})

app.get('/nc', function(req, res){
  var file = __dirname + '/nc.zip';
  res.download(file); // Set disposition and send it.
});


app.get('/conn', function(req, res){
  var file = __dirname + '/conn.zip';
  res.download(file); // Set disposition and send it.
});

app.post('/', (request, response) => {
    if(request.body.message === undefined || request.body.message === ''){
        request.flash('error', "vous n'avez pas posté de message magueule")
        response.redirect('/')
    }
    else {
    let Message = require('./models/message')
        Message.create(request.body.message, function() {
        request.flash('success', "Merci")
        response.redirect('/')
        })
    }


})

app.post('/inscription_form', (request, response) => {

    let Login = require('./models/login')
    var elementsForm = Array(request.body)
    var arrKeysForm = Object.keys(elementsForm[0])//on recupère les noms de clé de l'objet
    var champVide = 0;
    for(var i = 0; i < arrKeysForm.length; i++)
    {
        if(elementsForm[0][arrKeysForm[i]] == '')
          champVide = 1;
    }

    if(champVide){
        request.flash('error', "Vous n'avez pas remplis un champ ")
         response.redirect('/inscription_form')
    }
    else{
        if(request.body.Email !== undefined && request.body.Password !== undefined && request.body.Nom == undefined){

            Login.connexion(request.body, function(result) {
                if(result == undefined){
                    request.flash('error', "Mauvais identifiants")
                    response.redirect('/inscription_form')
                }
                else
                {
                    request.session.prenom = result.Prenom

                    request.session.idUser = result.id
                    request.flash('success', "Bienvenue " + request.session.prenom + ". Vous êtes maintenant connecté !")
                    response.redirect('/')
                }
            })
        }
        else{
            Login.create(request.body, function() {
            request.flash('success', "Inscription effectuée")
            response.redirect('/inscription_form')
            })
        }
    }

})

app.get('/message/:id', (request, response) => {

    let Message = require('./models/message')

    Message.find(request.params.id, function (message){
        response.render('message/show', {message:message, prenom:request.session.prenom})
    })

})

///ici c'est pour appeler la page inscription
app.get('/inscription_form', (request, response) => {

response.render('pages/index', {tabs: 'inscription_form', prenom:request.session.prenom})
console.log("inscription_form")

})



//get concernant la modification de l'utilisateur
app.get('/profile', (request, response) => {

    let Login = require('./models/login')

    Login.search(request.session.idUser, function(result) {
        if(result == undefined){
            request.flash('error', "Pas d'informations")
            response.redirect('/')
        }
        else
        {
            response.render('pages/index', {tabs: 'profile', result:result,prenom:request.session.prenom})
        }
    })

})

//get concernant la modification de l'utilisateur
app.get('/commande', (request, response) => {

    let Login = require('./models/login')

    Login.search(request.session.idUser, function(result) {
        if(result == undefined){
            request.flash('error', "Pas d'informations")
            response.redirect('/')
        }
        else
        {
            response.render('pages/index', {tabs: 'commande', result:result,prenom:request.session.prenom})
        }
    })

})

//post concernant la modification de l'utilisateur
app.post('/profile', (request, response) => {
    let Login = require('./models/login')

    Login.search(request.session.idUser, function(result) {
        if(result == undefined){
            request.flash('error', "Pas d'informations")
            response.redirect('/')
        }
        else
        {
            Login.modifyUser(request.session.idUser,request.body, function(result2){
                response.render('pages/index', {tabs: 'profile', result:request.body,prenom:request.session.prenom})
            })

        }
    })


})


//get concernant la page contact
app.get('/contact', (request, response) => {

    response.render('pages/index', {tabs: 'contact', prenom:request.session.prenom})
console.log("contact")


})




//get concernant le shop
app.get('/shop', (request, response) => {

    let Shop = require('./models/shop')
console.log("shop")
    Shop.listProduits(function(result) {
        if(result == undefined){
            request.flash('error', "Pas d'informations")
            response.redirect('/')
            console.log("pas de resultat!")
        }
        else
        {
            console.log("resultats produits:"+result)
            response.render('pages/index', {tabs: 'shop', result:result,prenom:request.session.prenom})

        }
    })

})
//get concernant l' administration
app.get('/administration', (request, response) => {

    let Shop = require('./models/shop')
console.log("administration")
    Shop.listProduits(function(result) {
        if(result == undefined){
            request.flash('error', "Pas d'informations")
            response.redirect('/')
            console.log("pas de resultat!")
        }
        else
        {
            Shop.listFonds(function(resultFonds) {

                response.render('pages/index', {tabs: 'administration', result:result, resultFonds:resultFonds,prenom:request.session.prenom})

            })
        }
    })

})



//get viewproduct
app.get('/viewproduit', (request, response) => {

    let Shop = require('./models/shop')
console.log("viewproduit")
    Shop.list1Produit(request.query.idProd,function(result) {
        if(result == undefined){
            request.flash('error', "Pas d'informations")
            response.redirect('/')
            console.log("pas de resultat!")
        }
        else
        {
          response.render('pages/index', {tabs: 'viewproduit', result:result,prenom:request.session.prenom})
        
        }
    })

})

//get concernant le panier
app.get('/panier', (request, response) => {

    let Shop = require('./models/shop')
console.log("panier")
    Shop.listProduits(function(result) {
        if(result == undefined){
            request.flash('error', "Pas d'informations")
            response.redirect('/')
            console.log("pas de resultat!")
        }
        else
        {
            Shop.listFonds(function(resultFonds) {

                response.render('pages/index', {tabs: 'panier', result:result, resultFonds:resultFonds,prenom:request.session.prenom})

            })
        }
    })

})
//renomme la photo stockée

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/images');
  },
  filename: function(req, file, cb) {
    cb(null,  Date.now() + file.originalname);
  }
});
//fin du renommage
var upload = multer({ storage: storage });

//post concernant l'ajout de produit



app.post('/administration',upload.single('images[]'), (request, response) => {
console.log(request.body)


    let Shop = require('./models/shop')

    if(request.body.table !== undefined){

        Shop.deleteAll(request.body.table, function(result){
                console.log(request.body.table+' tout supprimé !')

            })
response.redirect('administration')
    }
    else if(request.body.libelFond !== undefined){

        Shop.getLastId(function(result){

            var idImg = result[0].max_id
            idImg++
            console.log('id fond :'+idImg)
            var imgName = 'fonds_photos/fond-'+idImg+'.jpg'

           console.log('integ dun fond '+request.body.libelFond)

           fs.rename('uploads/images/'+request.file.filename, 'img/'+imgName, (err) => { //on bouge l'image au bon endroit
             if (err) throw err
                console.log('Rename complete!');
           });

           Shop.createFond(request.body,imgName, function(result){
               console.log('fond créé !')
               response.redirect('administration')

           })
       })
   }
   else {
        Shop.getLastId(function(result){

            var idImg = result[0].max_id
            idImg++
            console.log('id img :'+idImg)
            var imgName = 'produits/product-'+idImg+'.jpg'
    /*
            let removebg = require('./modulePerso/removeFromFileWithNewBackground')
                removebg('uploads/images/'+request.file.filename,'img/'+imgName, function(result){
                console.log('image détourée !')
                })
    */
            fs.rename('uploads/images/'+request.file.filename, 'img/'+imgName, (err) => { //on bouge l'image au bon endroit
              if (err) throw err
                 console.log('Rename complete!');
            });



            Shop.createProduit(request.body,imgName, function(result){
                console.log('produit créé !')
                response.redirect('administration')

        })

    })
    
}





})

app.get('/deco', (request, response) => {
console.log(request.session)
request.session.prenom = undefined
console.log(request.session)
response.redirect('/inscription_form')
})

app.listen(8080)