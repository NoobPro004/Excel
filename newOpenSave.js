let save=document.querySelector(".save");
let open=document.querySelector(".open");
save.addEventListener("click",function(){
    const data=JSON.stringify(sheetDB);
    const blob=new Blob([data],{type: 'application/json'});
    const url=window.URL.createObjectURL(blob);
    let a=document.createElement("a");
    a.download="file.json";
    a.href=url;
    a.click();
    a.remove();
})
// download file  -> open read
// inpput type file -> change event file name
open.addEventListener("change",function(e){
    // files array -> file accept
    let filesArray=open.files;
    let fileObj=filesArray[0];
    // file reader to read the files
    let fr=new FileReader(fileObj);
    // read as text
    fr.readAsText(fileObj);
    fr.onload=function(){
        console.log(fr.result);
    }

    // ui init
})