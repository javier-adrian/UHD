<?php
	Class Config {
		public function __construct(){
			$servername = "localhost";
			$username = "creui";
			$password = "....";
			$dbname = "health";

			$conn = new mysqli($servername, $username, $password, $dbname);

			$this->conn = $conn;

//			if ($conn->connect_error) {
//                die("connection failed: " . $conn->connect_error);
//			}
//
//			echo "Connected successfully";
		}
	}
?>
