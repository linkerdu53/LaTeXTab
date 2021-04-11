var AdmZip = require('adm-zip');
var zip = new AdmZip();
    // liste des fichier à zip
    zip.addLocalFile("LatexTab.exe");
    zip.addLocalFile("./node/cmd/StartLatexTab.cmd");

    // prend tout du buffer
    var willSendthis = zip.toBuffer();
    // et ecris sur le disque
    zip.writeZip("LatexTab-win.zip");