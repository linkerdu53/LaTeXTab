var AdmZip = require('adm-zip');
var zip = new AdmZip();
    // liste des fichier à zip
    zip.addLocalFile("LatexTab-win.exe");
    zip.addLocalFile("LatexTab-linux");
    zip.addLocalFile("LatexTab-macos");


    // prend tout du buffer
    var willSendthis = zip.toBuffer();
    // et ecris sur le disque
    zip.writeZip("LatexTab-WML.zip");