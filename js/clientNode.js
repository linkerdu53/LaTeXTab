/**
 * Programme Principale Coté serveur node Js
 * NOM: LATEXTAB
 * Auteur: QUENTIN WASCHEUL, MATHIS CADIO, BASTIEN JOGUET, PIERRE-EMMENUEL MUSSARD
 * Tutelle: ARNAUD BANNIER
 * 
 */


console.log('début prog');


//////////////////////// init variables globale /////////////////////////////




/*------------------------- SOCKET  -------------------------*/

// Connexion à socket.io
var socket = io.connect('http://localhost:8080');

/**
 * Recupere les données emisse par le serveur 
 * socket de nom 'responseCMD'
 * appel insereMessageFromFlash et lui envoie messageCMD (le contenu du message a afficher dans l'invite de commande)
 */
socket.on('responseCMD', function (data) {
  console.log(data);
  insereMessageFromFlash(data.messageCMD)
})






socket.on('etatAcquisition', function (data) {
  console.log('-------------- ' + data + '-----------');
  


})


/**
 * Lorsqu'on envoie le formulaire, on transmet le message et on l'affiche sur la page
 * via la socket emmetteur de nom 'inputCMD'
 */
$('#saisieFlottant').submit(function () {
  var message = $('#inputCMD').val();
  pressSaisiCommand(message);
  $('#inputCMD').val('').focus(); // Vide la zone de Chat et remet le focus dessus
  return false; // Permet de bloquer l'envoi "classique" du formulaire
});


/*------------------------- FUNCTION  -------------------------*/

/** fonction pressSaisiCommand
 * Permet une fois appelé de faire comme une saisie au CMD
 * input : message
 */
function pressSaisiCommand(message) {

  socket.emit('inputCMD', message); // Transmet le message aux autres
  //insereMessageFromPc(message);  // Affiche le message aussi sur notre page
}
