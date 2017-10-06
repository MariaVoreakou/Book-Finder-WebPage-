function loadJSONDoc(){
    var search_textarea = document.getElementById("search_textarea").value;
    
    if(search_textarea.length == 0){
        var divText = "<h2>Συμπληρώστε keyword για να γίνει εύρεση! "+ search_textarea +" </h2>";
        document.getElementById("result-div").innerHTML= divText;
        return false;
     }
     
    var xhttp;
    if (window.XMLHttpRequest)
    {
       xhttp=new XMLHttpRequest();
    }
    else
    {
      xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
        console.log("test1");
    xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
           searchXML(xhttp.responseText,search_textarea); 
       }
    };
    
    var url = "api";
    var regPattern = /[\s]{2,}/;
    var checkReg = new RegExp(regPattern,'g');
    
    search_textarea = search_textarea.replace(checkReg,' ');
    
    var params = "?search_textarea="+search_textarea;
    xhttp.open("GET", url+params, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhttp.send();
    
} 


function searchXML(jsonResponse, keyword) {
   
    var parsedObject = JSON.parse(jsonResponse);    

              var divText = '<h2>Αναζήτηση με keyword: "'+ keyword +'"</h2><br /><table style="width: 99%;margin: 0 auto;border: solid 2px #888;padding: 5px;font-family: sans-serif;border-radius: 20px;"><tr><th>Id</th><th>Title</th><th>Author</th><th>Genre</th><th>Price</th></tr>';
              for (i=0;i<parsedObject.length;i++){

                //startString = title.substring(0,size);
               var id=parsedObject[i].id;
               var title=parsedObject[i].title;
               var author=parsedObject[i].author;
               var genre=parsedObject[i].genre;
               var price=parsedObject[i].price;
               var indexOfPoint = price.indexOf(".");
                if(price.length > indexOfPoint+3){
                    price = price.substring(0,indexOfPoint+3);
                }


                    
                divText += '<tr><td style="text-align:center;background:#AADDF4;">'+id+'</td><td style="text-align:center;background:#E1E1E1;">'+title+'</td><td style="text-align:center;background:#AADDF4;">'+author+'</td><td style="text-align:center;background:#E1E1E1;">'+genre+'</td><td style="text-align:center;background:#AADDF4;">'+price+'</td></tr>';
                
             }
        divText += "</table>";
        
        document.getElementById("result-div").innerHTML= divText;
    
}
