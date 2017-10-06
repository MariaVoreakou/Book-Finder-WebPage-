function insertBook(){
    var xhttp;
    var author=document.getElementById("in-author").value;
    var title=document.getElementById("in-title").value;
    var price=document.getElementById("in-price").value;
    var genre=document.getElementById("in-genre").value;

    if(author.length ==0 || title.length ==0 || price.length ==0 || genre.length ==0 ){
        var error ="<h3>Ανεπιτυχής καταχώρηση!</h3><br/>";
        error +="<h3>Παρακαλώ συμπληρώστε όλα τα πεδία</h3><br/>";
        document.getElementById("result-insert").innerHTML= error;
        return false;
    }
    
    if (window.XMLHttpRequest)
    {
       xhttp=new XMLHttpRequest();
    }
    else
    {
      xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

 xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            insertbooks(xhttp.responseText,author,title, price, genre); 
        }
     };

    var url = "api";
    var params = "author="+author+"&title="+title+"&price="+price+"&genre="+genre;
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
} 


function insertbooks(jsonText, author, title, price, genre) {
    
    
    var x=JSON.parse(jsonText);
	
    //console.log(x.innerHTML+" "+(x.innerHTML=="1"));
    
    if(x.result == true){
        var resultText ="<h2>Επιτυχής καταχώρηση</h2><br/>";
        resultText += '<h2>Στοιχεία βιβλίου: </h2><br /><table style="text-align:center;width: 99%;margin: 0 auto;border: solid 2px #888;padding: 5px;font-family: sans-serif;border-radius: 20px;"><tr><th>Author</th><th>Title</th><th>Price</th><th>Genre</th></tr>';
  
                    
        resultText += '<tr><td style="background:#AADDF4;">'+author+'</td><td style="background:#E1E1E1;">'+title+'</td><td style="background:#AADDF4;">'+price+'</td><td style="background:#E1E1E1;">'+genre+'</td></tr>';
                
             
        resultText += "</table>";
        
           
        document.getElementById("result-insert").innerHTML= resultText;
    }
    else{
        resultText ="Ανεπιτυχής καταχώρηση<br/>";
        document.getElementById("result-insert").innerHTML= resultText;
    }
 

}

