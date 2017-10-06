<?php    
    header('Content-type: text/json');
    $servername = "URL HERE";
	$username = "USERNAME HERE";
	$password = "PASSWORD HERE";
	$dbname = "DBNAME HERE";
	
	
	//in case of inserting, REQUEST_METHOD is POST
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {		
		
		try {
			$conn = new PDO("sqlsrv:server = tcp:mariavoreakou.database.windows.net,1433; Database = ". $dbname , $username , $password);
    
			// set the PDO error mode to exception
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


			// prepare sql and bind parameters 
			$author = $_POST['author'];
			$title = $_POST['title'];
			$price = $_POST['price'];
			$genre=$_POST['genre'];
			
			$stmt = $conn->prepare("INSERT INTO books (author, title, genre, price) VALUES (:author, :title, :genre, :price)");
			$stmt->bindParam(':author', $author);
			$stmt->bindParam(':title', $title);
			$stmt->bindParam(':genre', $genre);
			$stmt->bindParam(':price', $price);
		  
			$result = array();
			$result["result"] = $stmt->execute();


			$json = json_encode($result);		
			echo $json;
			
			$stmt=null;
			$conn = null;
		}
		catch(Exception $e)
		{
			echo "Error: " . $e->getMessage();
			$stmt=null;
			$conn = null;
		}
	}
	else{
		try {

			$conn = new PDO("sqlsrv:server = tcp:mariavoreakou.database.windows.net,1433; Database = ". $dbname , $username , $password);    
			
			// set the PDO error mode to exception
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			
			// prepare sql and bind parameters 
			$search_textarea=$_GET["search_textarea"];
			 
			$search_textarea = "%".$search_textarea."%";
			$stmt = $conn->prepare("SELECT * FROM books WHERE author LIKE :author OR title LIKE :title OR genre LIKE :genre");
			

			//bind parameters
			$stmt->bindParam(':author', $search_textarea, PDO::PARAM_STR);
			$stmt->bindParam(':title', $search_textarea, PDO::PARAM_STR);
			$stmt->bindParam(':genre', $search_textarea, PDO::PARAM_STR);
		
			$stmt->execute();
			$results = array();
			while($row = $stmt->fetch(PDO::FETCH_ASSOC))
			{
			   $results[] = array(
				  'id' => $row['ID'],
				  'author' => $row['author'],
				  'title' => $row['title'],
				  'genre' => $row['genre'],
				  'price' => $row['price']
			   );
			}
			$json = json_encode($results);
			echo $json;
            
			$stmt=null;
			$conn=null;


		}
		catch(PDOException $e)
		{
			echo "Error: " . $e->getMessage();
			$stmt=null;
			$conn=null;
		}

	
	}
	
?>
