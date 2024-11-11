<?php

session_start();

$arr = array('isSuccess' => isset($_SESSION['username']));

echo json_encode($arr);