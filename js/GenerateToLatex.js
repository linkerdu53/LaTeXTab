function GenerateToLatex() {
    console.log("geneLatex")
    tabuColors = {};
    let tabuColorsDic = {};
    packages = {};
    let useCustomColors = false;
    let actualMainColor = mainColor();
    let actualColor = actualMainColor;
    useTabu = shouldUseTabu(); // Must we use "tabu" package ?
    if(useTabu){
        // we avoid \arrayrulecolor
        actualMainColor = actualColor = "#000000";
        message("Usage of <tt>tabu</tt> is <a href=\"https://github.com/tabu-issues-for-future-maintainer/tabu\">not recommanded</a> by the LaTeX3 Project Team.","warning");
    }
    if(!useTabu && (hasBorderType("hdashline") || hasBorderType("dottedline"))){
        packages["arydshln"] = true;
    }
    var table = element,
        fit = $id("opt-fit-table").value,
        scale = fit.indexOf("sc") >= 0,
        shrink = fit.indexOf("sh") >= 0,
        firstPart = "",
        float = _id("opt-latex-float").checked,
        str = "",
        useLongtable = _id("opt-latex-split").checked,
        rotateTable = _id("opt-latex-landscape").checked;
    console.log(table);
    shrink = shrink;
    var caption = caption(),
        booktabs = table.hasAttribute("data-booktabs"),
        rg = matrix(),
        border,
        useTabu = useTabu, // Must we use "tabu" package ?
        asteriskMultirow = false;
    if(useLongtable){
        asteriskMultirow = true;
    }
    noColor = blacklistPackages["colortbl"];
    var colHeaders = headers(rg),
    borderNewLine = $id("opt-latex-border").checked,
    header = colHeaders.join(""),
    startingDshCommand = "",
    startingColor = actualMainColor;
    if(header.charAt(0) == "@"){
        header = header.replace(/^@\{(\\array[^\{]+\{[^\}]+\})\}/, function(full, command){
            startingDshCommand = command;
            command.replace(/\{(?:[\s,]*([\d.]+)[\s,]*([\d.]+)[\s,]*([\d.]+)[\s,]*|([^\}]+))\}/, function(full, r, g, b, name){
                if(name){
                    startingColor = name;
                }
                else {
                    startingColor = "rgb("+(+r*255)+","+(+g*255)+","+(+b*255)+")";
                }
            })
            return "";
        })
    }
    actualColor = startingColor;
    var booktabColor = false;
    if(useBooktab() && useBackgroundColor(rg)){
        booktabColor = "\\setlength{\\extrarowheight}{0pt}\n";
        booktabColor += "\\addtolength{\\extrarowheight}{\\aboverulesep}\n";
        booktabColor += "\\addtolength{\\extrarowheight}{\\belowrulesep}\n";
        booktabColor += "\\setlength{\\aboverulesep}{0pt}\n";
        booktabColor += "\\setlength{\\belowrulesep}{0pt}\n";
    }
    if(useLongtable){
        if(rotateTable){
            packages["pdflscape"] = true;
            firstPart += "\\begin{landscape}\n";
        }
        if(booktabColor){
            if(!rotateTable){
                firstPart += "{\n";
            }
            rotateTable += booktabColor
        }
        if(!areSameColors(startingColor, "black")){
            firstPart += "\\arrayrulecolor" + getColor(startingColor) + "\n";
        }
        if (caption.label && !caption.caption) {
            firstPart += "\\refstepcounter{table}\n";
            firstPart += "\\label{" + caption.label + "}\n";
        }
        str += "\\begin{" + (useTabu ? "longtabu" : "longtable") + "}{" + header + "}";
        if (caption.caption) {
            if(caption.numbered){
                str += "\n\\caption*{"+ caption.caption;
            }
            else{
                str += "\n\\caption{"+ caption.caption;
            }
            if(caption.label){
                str += "\\label{"+caption.label+"}";
            }
            str += "}\\\\";
        }
        if(scale){
            message("'scale' option can't be used with longtable or longtabu.");
        }
    }
    else{
        if(!float && rotateTable){
            packages["adjustbox"] = true;
            var adjustargs = ["angle=90","nofloat=table"];
            if(caption.caption){
                adjustargs.push("caption={"+caption.caption+"}");
            }
            if(caption.label){
                adjustargs.push("label={"+caption.label+"}");
            }
            firstPart = "\\begin{adjustbox}{"+adjustargs.join(",")+"}\n";
            if(_id("table-opt-center").checked){
                firstPart += "\\centering\n"
            }
            if(booktabColor){
                firstPart += booktabColor;
            }
        }
        else{ 
            if(float){
                firstPart = "\\begin{"+ (rotateTable ? "sidewaystable" : "table") +"}\n";
            }
            else{
                firstPart = "\\noindent\\begin{minipage}{\\linewidth}\n";
            }
            if(_id("table-opt-center").checked){
                firstPart += "\\centering\n"
            }
            if(booktabColor){
                firstPart += booktabColor;
            }
            if (caption.caption) {
                if(caption.numbered){
                    packages["caption"] = true;
                    firstPart += "\\captionsetup{labelformat=empty}\n";
                }
                if(float){
                    firstPart += "\\caption{" + caption.caption + "}\n";
                }
                else{
                    packages["caption"] = true;
                    firstPart += "\\captionof{table}{" + caption.caption + "}";
                }
            }
            if (caption.label) {
                if(!caption.caption){
                    firstPart += "\\refstepcounter{table}\n";
                }
                firstPart += "\\label{" + caption.label + "}\n";
            }
        }
        if(!areSameColors(startingColor, "black")){
            firstPart += "\\arrayrulecolor" + getColor(startingColor) + "\n";
        }
    }
    if(scale && !useLongtable){
        packages["graphicx"] = true;
        str += "\\resizebox{\\linewidth}{!}{%\n";
    }
    if(useTabu){
        packages["tabu"] = true;
    }
    if(!useLongtable){
        str += "\\begin{"+(useTabu ? "tabu" : "tabular")+"}{" + header + "}";
    }
    var rg2 = [],rowIndex = [],isVCell = [],
    multiRows = {},rowI=0;
    for(var i=0;i<rg.length;i++){
        var cells = rg[i];
        var row = [];
        var valign = false;
        //if(!blacklistPackages["vcell"]){
        //	valign = vcell(i,rg); // Vertical align
        //}
        for(var j=0;j<cells.length;j++){
            var cell = cells[j],
            header = colHeaders[j] || "l";
            if(cell.rowSpan > 1){
                for(var k=i;k<i+cell.rowSpan;k++){
                    multiRows[k] = true;
                }
            }
            if(!cell || cell.ignore){
                row.push(false);
            }
            else{
                if(cell.switch){
                    cell = rg[i+cell.rowSpan-1][j]
                    cell.unswitch = true;
                }
                else if(cell.unswitch){
                    cell = cell.refCell
                }
                var text = "";
                if(j == 0){
                    // rowColor;
                    text = rowColor(i, rg);
                    if(text){ text += " " }
                }
                if(cell.vcell){
                    valign = true;
                }
                text += cell.getFullContent(actualColor);
                row.push({
                        text: text, 
                        colSpan : cell.colSpan || (cell.refCell ? cell.refCell.colSpan : 1) || 1
                     })
            }
        }
        isVCell.push(false);
        rowIndex.push(rowI);
        rg2.push(row);
        if(valign){
            row = [];
            for(var j=0;j<cells.length;j++){
                var cell = cells[j],
                text = "";
                if(!cell || cell.ignore){
                    row.push(false);
                }
                else{
                    var text = "";
                    if(j == 0){
                        // rowColor;
                        text = rowColor(i, rg);
                        if(text){ text += " " }
                    }
                    cell.vcell = false;
                    if((cell.refCell||cell).rowSpan == 1){
                        text += cell.getVCellContent(actualColor);
                    }
                    else{
                        var refCell = rg[(cell.refCell||cell).y+1][(cell.refCell||cell).x];											text += refCell.getVCellContent(actualColor);
                    }
                    row.push({
                        text: text, 
                        colSpan : cell.colSpan || (cell.refCell ? cell.refCell.colSpan : 1) || 1
                    })
                }
            }
            rg2.push(row);
            rowIndex.push(rowI);
            isVCell.push(true);
        }
        rowI++;
    }
    var beautifyRows = beautifyRows(rg2);
    var foundFirst = false;
    for(var i=0;i<beautifyRows.length;i++){
        var row = beautifyRows[i];
        if (isVCell[i]){
            str += " \\\\";
            if(useLongtable){
                str += "*";
            }
            str += "[-\\rowheight]";
        }
        else{
            if (i === 0 && booktabs) {
                if(borderNewLine){
                    border = " \n\\toprule";
                }
                else{
                    border = " \\toprule";
                }
            } else {
                border = getBorder(rowIndex[i], rg);
                if(borderNewLine){
                    border = border ? " \n" + border : ""
                }
                else{
                    border = border ? " " + border : "";
                }
            }
            if (rowIndex[i] !== 0) {
                if(!foundFirst && useLongtable && !multiRows[rowIndex[i]]){
                    str += " \\endfirsthead";
                }
                else{						
                    str += " \\\\";
                }
                if(asteriskMultirow && multiRows[rowIndex[i]]){
                    str+= "*";
                }
                else{foundFirst = true;}
                str += border
            } else {
                str += border;
            }
        }
        str += "\n" + row;
    }
    if (booktabs) {
        str += " \\\\"+ (borderNewLine ? "\n" : " ") +"\\bottomrule"
    } else {
        border = getBorder(rg.length, rg);
        if (border) {
            str += " \\\\"+ (borderNewLine ? "\n" : " ") + border;
        }
    }
    if(useLongtable){
        if(!useTabu){
            packages["longtable"] = true;
        }
        str += "\n\\end{"+(useTabu ? "longtabu" : "longtable")+"}\n"
        if(booktabColor && !rotateTable){
            str += "}\n";
        }
    }
    else{
        str += "\n\\end{"+(useTabu ? "tabu" : "tabular")+"}\n"
        if(scale){
            str += "}\n";
        }
    }
    // Booktabs
    if (/\\(bottomrule)|(toprule)|(midrule)|(cmidrule)|(heavyrulewidth)|(lightrulewidth)/.test(str)) {
        packages["booktabs"] = true;
    }
    // arydshln
    if (/\\(cdashline|hdashline)/.test(str)) {
        packages["arydshln"] = true;
    }
    if(str.indexOf("\\hhline")>-1){
        packages["hhline"] = true;
    }
    if(str.indexOf("\\vcell")>-1){
        packages["vcell"] = true;
        uniqueLog("If you get an <kbd>File 'vcell.sty' not found</kbd> error, download the file <a href='https://ctan.org/pkg/vcell' target='_blank'>here</a> and install it in the same repertory as your table.","warning");
    }
    if(str.indexOf("\\arrayrulecolor") > -1 || firstPart.indexOf("\\arrayrulecolor") > -1 
       || str.indexOf("\\doublerulesepcolor") > -1 || firstPart.indexOf("\\doublerulesepcolor") > -1){
        packages["colortbl"] = true;
        if(!areSameColors(actualColor, "#000000")){
            str += "\\arrayrulecolor"+getColor("#000000")+"\n";
        }
        if(!useTabu && packages["arydshln"]){
            firstPart += "\\ADLnullwidehline\n";
        }
        if(firstPart.indexOf("\\arrayrulecolor")<0){
            firstPart += "\\arrayrulecolor"+getColor("#000000")+"\n";
        }
    }
    else if(str.indexOf("\\cellcolor") > -1 || str.indexOf("\\rowcolor") > -1 || str.indexOf("\\columncolor") > -1){
        packages["colortbl"] = true;
    }
    if(useTabu || useCustomColors){
        // Let see if we have some colors from tabu that we have to declare
        var tabuColors = tabuColors;
        for(var i in tabuColors){
            if(tabuColors.hasOwnProperty(i)){
                var color = tabuColors[i];
                firstPart += "\\definecolor{"+color.name+"}{rgb}{"+color.rgb.join(",")+"}\n";
            }
        }
    }
    if(!useLongtable){
        if(float){
            if(rotateTable){
                packages["rotating"] = true;
            }
            str +="\\end{"+(rotateTable ? "sidewaystable" : "table")+"}";
        }
        else{
            if(rotateTable){
                str+= "\\end{adjustbox}";
            }
            else{
                str += "\\end{minipage}";
            }
        }
    }
    else if(rotateTable){
        str += "\\end{landscape}";
    }
    // Packages
    var packages = "";
    for (var i in packages) {
        if (packages.hasOwnProperty(i)) {
            if(i == "ulem"){
                packages += "% \\usepackage[normalem]{ulem}\n";
            }
            else if(i == "multirow" && useLongtable){
                packages += "% \\usepackage[longtable]{multirow}\n";
            }
            else if(i != "arydshln" && !(i == "color" && packages["colortbl"])){
                packages += "% \\usepackage{" + i + "}\n";
            }
        }
    }
    if (!useTabu && packages["arydshln"]) {
        // Compatibility between packages
        packages += "% \\usepackage{arydshln}\n";
    }
    /* Show some message*/
    if (shrink && packages["multirow"]){
        message("The shrink algorithmn might not work with cells spanning multiple rows.","warning");
    }
    if (element.querySelector("td[data-two-diagonals]")) {
        message(
            "If you get an '! FP error: Logarithm of negative value!.' error, the content of the bottom part of one of your cells with two diagonals is too long.", "warning"
        )
    }
    /* Show some information about packages used */
    showPackagesInformation(packages);
    console.log((packages ? packages + "\n\n" : "") + firstPart + str);
    return (packages ? packages + "\n\n" : "") + firstPart + str;
}

export { GenerateToLatex };