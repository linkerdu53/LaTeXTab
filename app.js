/**
 * Programme Principale Coté serveur node Js
 * NOM: LATEXTAB
 * Auteur: QUENTIN WASCHEUL, MATHIS CADIO, BASTIEN JOGUET, PIERRE-EMMENUEL MUSSARD
 * Tutelle: ARNAUD BANNIER
 * 
 */
// @ts-nocheck

const { emit } = require('process');

// les imports
const
    
    app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    request = require('request'),
    fs = require('file-system'),
    os = require('os');

    ;

// Les globales

const qwdebug = process.env.QWDEBUG || false;
let runMode = '';
if (qwdebug==true){runMode='Debug Mode'}else{runMode='Standard Mode'}
console.log('App LatexTab : '+runMode);

console.log('Local Temp Folder : \"'+os.tmpdir()+'\"');
console.log('Start localhost at : '+'http://localhost:8080/');



// les handlers

io.sockets.on('connection', function (socket) {
    console.log('web client connection')
    socket.on('ecouteserv', ecouteserv);
});



// Le routage
app.get('/', function (req, res) {
    if(qwdebug)console.log('---->  Send L\'INDEX   ---->');
    res.sendfile(__dirname + '/pst_latex.html');
    
});
app.get('/node', function (req, res) {
    if(qwdebug)console.log('---->  Send L\'INDEX   ---->');
    res.sendfile(__dirname + '/clientNode.html');
    
});
app.get('/img/*', function (req, res) {
    if(qwdebug)console.log('---->  Send _IMG_   ---->');
    res.sendfile(__dirname + '' + req.url);
});
app.get('/js/*', function (req, res) {
    if(qwdebug)console.log('---->  Send _JS_   ---->');
    res.sendfile(__dirname + '' + req.url);
});
app.get('/css/*', function (req, res) {
    if(qwdebug)console.log('---->  Send _CSS_   ---->');
    res.sendfile(__dirname + '' + req.url);
});
app.get('/node_modules/*', function (req, res) {
    if(qwdebug)console.log('---->  Node_Modules   ---->');
    res.sendfile(__dirname + '' + req.url);
});
app.get('/police/*', function (req, res) {
    if(qwdebug)console.log('---->  Send _POLICE_   ---->');
    res.sendfile(__dirname + '' + req.url);
});
app.get('/favicon/*', function (req, res) {
    if(qwdebug)console.log('---->  Send _FAVICON_   ---->');
    res.sendfile(__dirname + '' + req.url);
});


function ecouteserv(dataserv){
    console.log(dataserv);
    io.sockets.emit('retourserv', { dataserv: dataserv});
}


server.listen(8080);