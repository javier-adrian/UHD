<?php
	Class Config
	{
		public function __construct()
		{
			$servername = getenv("db_host");
			$username = getenv("db_user");
			$password = getenv("db_password");
			$dbname = getenv("db");

			$conn = new mysqli($servername, $username, $password, $dbname);

			$this->conn = $conn;
		}
	}
?>
