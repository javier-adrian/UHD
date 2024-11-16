<?php
session_start();

echo json_encode(array('isSuccess' => session_unset()));