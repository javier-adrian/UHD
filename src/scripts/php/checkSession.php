<?php

session_start();

session_unset(); // reset button

$arr = array('isSuccess' => isset($_SESSION['username']));

echo json_encode($arr);