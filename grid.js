
let leftCol = document.querySelector(".left_col");
let topRow = document.querySelector(".top_row");
let grid = document.querySelector(".grid");
let leftBox=document.querySelector(".left_box");
// current clicked cell 
let addressInput=document.querySelector(".address-input");
let boldBtn = document.querySelector(".bold");
let underlineBtn = document.querySelector(".underline");
let italicBtn = document.querySelector(".italic");
let alignBtns = document.querySelectorAll(".align-container>*");
let fontSizeElem = document.querySelector(".font-size");
let formulaBar=document.querySelector(".formula-input");
let btnContainer=document.querySelector(".add-sheet_btn-container");
let sheetList=document.querySelector(".sheet-list");
let gridContainer = document.querySelector(".grid-container");
let leftBtn = document.querySelector(".left");
let rightBtn = document.querySelector(".right");
let centerBtn = document.querySelector(".center");
let firstSheet=document.querySelector(".sheet");
let rows = 100;
let cols = 26;
let sheetDB;
let sheetArray=[];
for (let i = 0; i < rows; i++) {
    let colBox = document.createElement("div");
    colBox.innerText = i + 1;
    colBox.setAttribute("class", "box");
    leftCol.appendChild(colBox);
}

for (let i = 0; i < cols; i++) {
    let cell = document.createElement("div");
    cell.innerText = String.fromCharCode(65 + i);
    // setAttribute
    cell.setAttribute("class", "cell");
    topRow.appendChild(cell);
}

for (let i = 0; i < rows; i++) {
    let row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < cols; j++) {
        let cell = document.createElement("div");
        // cell.innerText=`${String.fromCharCode(65 + j)}  ${i+1}`
        cell.setAttribute("class", "cell");
        cell.setAttribute("rid", i);
        cell.setAttribute("cid", j);
        cell.setAttribute("contenteditable", "true");
        row.appendChild(cell);
    }
    grid.appendChild(row);
}


firstSheet.addEventListener("click",makeMeActive);
firstSheet.click();
btnContainer.addEventListener("click",function(){
    let AllSheets=document.querySelectorAll(".sheet");
    let lastSheet=AllSheets[AllSheets.length-1];
    let LastIdx=lastSheet.getAttribute("idx");
    LastIdx=Number(LastIdx);
    let NewSheet=document.createElement("div");
    NewSheet.setAttribute("class","sheet");
    NewSheet.setAttribute("idx",`${LastIdx+1}`);
    NewSheet.innerText=`Sheet ${LastIdx+2}`;
    sheetList.appendChild(NewSheet);
    for(let i=0;i<AllSheets.length;i++){
        AllSheets[i].classList.remove("active");
    }
    NewSheet.classList.add("active");
    createSheet();
    sheetDB=sheetArray[LastIdx+1];
    setUI();
    NewSheet.addEventListener("click",makeMeActive);
})

function createSheet(){
    let NewDb=[];
    for (let i = 0; i < rows; i++) {
        let row = [];
        
        for (let j = 0; j < cols; j++) {
            let cell ={
                bold:"normal",
                italic:"none",
                underline:"none",
                hAlign:"center",
                fontSize:"16",
                color:"balck",
                bColor:"none",
                value:"",
                formula:"",
                child:[],
                halign: "left"
            }
            let elem=document.querySelector(`.grid .cell[rid='${i}'][cid='${j}']`);
            elem.innerText="";
            row.push(cell);
        }
        NewDb.push(row);
    }
    
    sheetArray.push(NewDb);
}



let allCells=document.querySelectorAll(".grid .cell");
for(let i=0;i<allCells.length;i++){
    allCells[i].addEventListener("click",function(){
        let rid=allCells[i].getAttribute("rid");
        let cid=allCells[i].getAttribute("cid");
        rid=Number(rid);
        cid=Number(cid);
        let address=`${String.fromCharCode(65+cid)}${rid+1}`;
        addressInput.value=address;
        let cellObject=sheetDB[rid][cid];
        if(cellObject.bold=="normal"){
            boldBtn.classList.remove("active-btn");
        }else{
            boldBtn.classList.add("active-btn");
        }
        
        if(cellObject.italic=="italic"){
            italicBtn.classList.add("active-btn");
        }else{
            
            italicBtn.classList.remove("active-btn");
        }
        
        if(cellObject.underline=="underline"){
            underlineBtn.classList.add("active-btn");
        }else{
            underlineBtn.classList.remove("active-btn");
        }
        if (cellObject.halign == "left") {
            // left active
            leftBtn.classList.add("active-btn")
        }else{
            leftBtn.classList.remove("active-btn")
        }  if (cellObject.halign == "right") {
            rightBtn.classList.add("active-btn")
            // right active
        }else{
            rightBtn.classList.remove("active-btn")
        }  if (cellObject.halign == "center") {
            centerBtn.classList.add("active-btn")
        }else{
            centerBtn.classList.remove("active-btn")
        }
        if(cellObject.formula!=""){
            formulaBar.value=cellObject.formula;
        }else{
            formulaBar.value="";
        }
    })
}

gridContainer.addEventListener("scroll", function () {
    // console.log(e);
    let top = gridContainer.scrollTop;
    let left = gridContainer.scrollLeft;
    console.log(left);leftCol
    leftBox.style.top = top + "px";
    topRow.style.top = top + "px";
    leftCol.style.left = left + "px";
    leftBox.style.left = left + "px";
})
leftBtn.addEventListener("click", function () {
    let uiCellElement=finduiCellElement();
    let rid=uiCellElement.getAttribute("rid");
    let cid=uiCellElement.getAttribute("cid");
    let cellObject=sheetDB[rid][cid];
    for (let i = 0; i < alignBtns.length; i++) {
        alignBtns[i].classList.remove("active-btn");
    }
    leftBtn.classList.add("active-btn");
    uiCellElement.style.textAlign="left";
    cellObject.hAlign="left";
   
})
rightBtn.addEventListener("click", function () {
    let uiCellElement=finduiCellElement();
    let rid=uiCellElement.getAttribute("rid");
    let cid=uiCellElement.getAttribute("cid");
    let cellObject=sheetDB[rid][cid];
    for (let i = 0; i < alignBtns.length; i++) {
        alignBtns[i].classList.remove("active-btn");
    }
    rightBtn.classList.add("active-btn");
    uiCellElement.style.textAlign="right";
    cellObject.hAlign="right";
})
centerBtn.addEventListener("click", function () {
    let uiCellElement=finduiCellElement();
    let rid=uiCellElement.getAttribute("rid");
    let cid=uiCellElement.getAttribute("cid");
    let cellObject=sheetDB[rid][cid];
    for (let i = 0; i < alignBtns.length; i++) {
        alignBtns[i].classList.remove("active-btn");
    }
    centerBtn.classList.add("active-btn");
    uiCellElement.style.textAlign="center";
    cellObject.hAlign="center";
    
})
boldBtn.addEventListener("click",function(){
    let uiCellElement=finduiCellElement();
    let rid=uiCellElement.getAttribute("rid");
    let cid=uiCellElement.getAttribute("cid");
    let cellObject=sheetDB[rid][cid];
    if(cellObject.bold=="normal"){
        cellObject.bold="bold";
        boldBtn.classList.add("active-btn");
        uiCellElement.style.fontWeight="bold";
    }else{
        cellObject.bold="normal";
        boldBtn.classList.remove("active-btn");
        uiCellElement.style.fontWeight="normal";
    }
    
    
})
underlineBtn.addEventListener("click",function(){
    let uiCellElement=finduiCellElement();
    let rid=uiCellElement.getAttribute("rid");
    let cid=uiCellElement.getAttribute("cid");
    let cellObject=sheetDB[rid][cid];
    if(cellObject.underline=="none"){
        cellObject.underline="underline";
        underlineBtn.classList.add("active-btn");
        uiCellElement.style.textDecoration="underline";
    }else{
        cellObject.underline="none";
        underlineBtn.classList.remove("active-btn");
        uiCellElement.style.textDecoration="none";
    }
})

italicBtn.addEventListener("click",function(){
    let uiCellElement=finduiCellElement();
    let rid=uiCellElement.getAttribute("rid");
    let cid=uiCellElement.getAttribute("cid");
    let cellObject=sheetDB[rid][cid];
    if(cellObject.italic=="none"){
        cellObject.italic="italic";
       italicBtn.classList.add("active-btn");
       uiCellElement.style.fontStyle="italic";
    }else{
        cellObject.italic="none";
        italicBtn.classList.remove("active-btn");
        uiCellElement.style.fontStyle="none";
    }
    
})


for (let i = 0; i < alignBtns.length; i++) {
    alignBtns[i].addEventListener("click", function () {
        let alignment = alignBtns[i].getAttribute("class");
        let uiCellElement = finduiCellElement();
        uiCellElement.style.textAlign = alignment;
    })
}
fontSizeElem.addEventListener("change", function () {
    let val = fontSizeElem.value;
    let uiCellElement = finduiCellElement();
    uiCellElement.style.fontSize = val + "px";
})

allCells[0].click();
function makeMeActive(e){
    let sheet=e.currentTarget;
    let AllSheets=document.querySelectorAll(".sheet");
    for(let i=0;i<AllSheets.length;i++){
        AllSheets[i].classList.remove("active");
    }
    sheet.classList.add("active");
    let idx=sheet.getAttribute("idx");
    if(!sheetArray[idx]){
        createSheet();
    }
    
    sheetDB=sheetArray[idx];
    setUI();
}

function setUI(){
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let elem=document.querySelector(`.grid .cell[rid='${i}'][cid='${j}']`);
            
            let value=sheetDB[i][j].value;
            elem.innerText=`${value}`;
        }
    }
    
}