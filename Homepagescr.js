let equipment = ["Camera","Tripod","Dissection kit","Beaker","China dish","Calculator"];
let searchbutton = document.getElementById("search_button");
searchbutton.addEventListener("click",function(){
    let searchtext = document.getElementById("equipment_search").value.toLowerCase();
    let results = equipment.filter(function(item){
        return item.toLowerCase().includes(searchtext);
    })
    if(results.length>0){
        alert("its present")
    }
    
})