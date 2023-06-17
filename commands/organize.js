function organizeFn(dirPath){

    // input -> dirpath given
    // create -> organized file ki directory
    // check all files -> identify categories of all the files presrnt in tht input directory
    // copy/cut files to that organized directory 

    let destPath = path.join(dirPath, "organized_files");

    if(dirPath == undefined){
        // console.log("Kindly enter the path");
        destPath = process.cwd();
        
        return;
    }
    else{
        let doesexist = fs.existsSync(dirPath);
        if(doesexist){
            
            if(fs.existsSync(destPath) == false){
                fs.mkdirSync(destPath);
            }
            
        }
        else{
            console.log("Kindly enter the correct path");
        }
    }
    organizeHelper(dirPath, destPath);

}


function organizeHelper(src , dest){
    let childNames = fs.readdirSync(src);
    console.log(childNames);
    for(let i = 0; i < childNames.length; i++){
        let childAddress = path.join(src, childNames[i]);

        let isFile = fs.lstatSync(childAddress).isFile();

        if(isFile){
            let category = getCategory(childNames[i]);
            // console.log(childNames[i], "belongs to ->", category);
            sendFiles(childAddress,dest,category);
        }
    }

}
function sendFiles(srcFilePath, dest, category) {
    // 
    let categoryPath = path.join(dest, category);
    if (fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    // fs.unlinkSync(srcFilePath);
    console.log(fileName, "copied to ", category);
    fs.unlinkSync(srcFilePath);

}

function getCategory(name){
    let ext = path.extname(name);
    ext = ext.slice(1);
    console.log(ext);
    for(let type in types){
        let cTypeArray = types[type];
        for(let i = 0; i < cTypeArray.length;i++){
            if(ext == cTypeArray[i]){
                return type;
            }
        }
        
    }
    return "others";
}

module.exports={
    organizeKey: organizeFn
}