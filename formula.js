for(let i=0;i<allCells.length;i++){
    // to save the user data into database for later use
    allCells[i].addEventListener("blur",function(){
        let data=allCells[i].innerText;
        let address=addressInput.value;
        let rid = allCells[i].getAttribute("rid");
        let cid = allCells[i].getAttribute("cid");
        let cellObj=sheetDB[rid][cid];
        if(cellObj.value==data)return ;

        if(cellObj.formula){
            removeFormula(cellObj,address);
            formulaBar.value="";
        }
        cellObj.value=data;
        updateChildren(cellObj);
    })
}

formulaBar.addEventListener("keydown",function(e){
    if(e.key=="Enter" && formulaBar.value){
    // user input formula
        let cFormula=formulaBar.value;
        // formula -> value get
        let address=addressInput.value;
        let ridcid=getRIDCIDfromAddress(address);
        let rid=ridcid.rid;
        let cid=ridcid.cid;
        let cellObj=sheetDB[rid][cid];
        if(cFormula!=cellObj.formula){
            removeFormula(cellObj,address);
        }
        // given for which we are setting the formula -> ui,db update
        let value=evaluateFormula(cFormula);
        setCell(value,cFormula);
setparentCHArray(cFormula,address);
updateChildren(cellObj);
    }
})

function evaluateFormula(formula){
// ( A1 + A2 )
//split
let formulaTokens=formula.split(" ");
for(let i=0;i<formulaTokens.length;i++){
    let ascii=formulaTokens[i].charCodeAt(0);
    if(ascii>=65 && ascii<=90){
        let{rid,cid}=getRIDCIDfromAddress(formulaTokens[i]);
        let value=sheetDB[rid][cid].value;
        if(value=="")value="0";
        formulaTokens[i]=value;
    }
}

let evaluatedFormula=formulaTokens.join(" ");

return eval(evaluatedFormula);
}

function setCell(value,formula){
let uicellElem=finduiCellElement();
uicellElem.innerText=value;
let address=addressInput.value;
let{rid,cid}=getRIDCIDfromAddress(address);
sheetDB[rid][cid].value=value;
sheetDB[rid][cid].formula=formula;
}

function finduiCellElement(){
    let address=addressInput.value;
    let ridcid=getRIDCIDfromAddress(address);
    let rid=ridcid.rid;
    let cid=ridcid.cid;
   let uiCellElement= document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
   return uiCellElement;
}
function getRIDCIDfromAddress(address){
    let cid=Number(address.charCodeAt(0))-65;
    let rid=Number(address.slice(1))-1;
    return {"rid":rid,"cid":cid};


}

function setparentCHArray(formula,chAddress){
    let formulaTokens=formula.split(" ");
for(let i=0;i<formulaTokens.length;i++){
    let ascii=formulaTokens[i].charCodeAt(0);
    if(ascii>=65 && ascii<=90){
        let{rid,cid}=getRIDCIDfromAddress(formulaTokens[i]);
        let parentObj=sheetDB[rid][cid];
        parentObj.child.push(chAddress);
    }
}

}

function updateChildren(cellObj){
    let children=cellObj.child;
    for(let i=0;i<children.length;i++){
        let chAddress=children[i];
       let {rid,cid}= getRIDCIDfromAddress(chAddress);
       let childObj=sheetDB[rid][cid];
       let chformula=childObj.formula;
       let newValue=evaluateFormula(chformula);
       SetChildrenCell(newValue,chformula,rid,cid);
       updateChildren(childObj);
    }
}

function SetChildrenCell(newValue,chformula,rid,cid){
    // let uicellElem=finduiCellElement();
    let uiCellElement= document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    uiCellElement.innerText=newValue;
    sheetDB[rid][cid].value=newValue;
    sheetDB[rid][cid].formula=chformula;

}

function removeFormula(cellObj,myName){
    let formula=cellObj.formula;
    let formulaTokens=formula.split(" ");
    for(let i=0;i<formulaTokens.length;i++){
        let ascii=formulaTokens[i].charCodeAt(0);
        if(ascii>=65 && ascii<=90){
            let{rid,cid}=getRIDCIDfromAddress(formulaTokens[i]);
            let parentObj=sheetDB[rid][cid];
            let idx=parentObj.child.indexOf(myName);
            parentObj.child.splice(idx,1);
        }
    }

    cellObj.formula="";
}