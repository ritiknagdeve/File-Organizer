
function treeFn(dirPath){

    // let destPath = path.join(dirPath, "organized_files");

    if(dirPath == undefined){
        // console.log("Kindly enter the path");
        
        treeHelper(process.cwd(), "");
        return;
    }
    else{
        let doesexist = fs.existsSync(dirPath);
        if(doesexist){
            treeHelper(dirPath, "");       
        }
        else{
            console.log("Kindly enter the correct path");
        }
    }
}
function treeHelper(dirPath, indent){
    let isFile = fs.lstatSync(dirPath).isFile();
    if(isFile){
        let fileName = path.basename(dirPath);
        console.log(indent +"|~~~~~~ "+ fileName);
    }
    else{
        let dirName = path.basename(dirPath);
        console.log(indent + "|-----" + dirName);
        let childrens = fs.readdirSync(dirPath);
        for(let i = 0; i < childrens.length; i++){
            let childPath = path.join(dirPath,childrens[i]);
            treeHelper(childPath, indent + "\t");
        }
    }
}

module.exports={
    treeKey: treeFn
}