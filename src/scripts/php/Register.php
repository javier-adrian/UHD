<?php

session_start();
require 'dbconn.php';

class Register
{
    public function checkRedundancy($username)
    {
        error_reporting(E_ERROR);

        $config = new Config();
        $conn = $config->conn;

        if ($conn->connect_error)
            return $conn->connect_error;
        else {
            $query = 'SELECT username from user where username = ?';

            if ($stmt = $conn->prepare($query))
            {
                $stmt->bind_param('s', $username);

                if ($stmt->execute())
                {
                    $stmt->bind_result($username);
                    $stmt->store_result();

                    if($stmt->num_rows > 0)
                    {
                        $stmt->close();
                        return 'USER_FOUND';
                    } else {
                        $stmt->close();
                        return 'USER_NOT_FOUND';
                    }
                } else
                    return $stmt->error;
            } else
                return $conn->error;

            $conn->close();
        }
    }
    public function register($username, $password, $email, $number)
    {
        error_reporting(E_ERROR);

        $config = new Config();
        $conn = $config->conn;

        if ($conn->connect_error)
            return $conn->connect_error;
        else {
            $redundant = $this->checkRedundancy($username);
            if ($redundant == 'USER_FOUND')
                return 'USER_ALREADY_REGISTERED';
            else
            {
                $query = "INSERT INTO user (username, password, email, number) VALUES (?, ?, ?, ?)";

                if ($stmt = $conn->prepare($query))
                {
                    $stmt->bind_param("ssss",  $username,  $password, $email, $number);

                    if ($stmt->execute())
                    {
                        $stmt->close();
                        return 'USER_REGISTERED';
                    } else
                        return $stmt->error;
                } else
                    return $conn->error;
            }
        }
    }

    public function doSignup($username, $password, $email, $number)
    {
        $app = new Register();
        $response = array();

        $redundancy = $app->checkRedundancy($username);

        if ($redundancy == 'USER_NOT_FOUND') {

            $register = $app->register($username, crypt($password, "pepper"), $email, $number);

            $response['isSuccess'] = true;
            $response['value'] = 1;
            $response['msg'] = "Signup Successful";
        } else if ($redundancy == 'USER_FOUND') {
            $response['isSuccess'] = false;
            $response['value'] = 0;
            $response['msg'] = "Username already exists";
        } else {
            $response['isSuccess'] = false;
            $response['value'] = 0;
            $response['msg'] = "Signup Unsuccessful";
        }

        return json_encode($response);
    }
}

$app = new Register();

if (isset($_REQUEST['action']))
{
//    file_put_contents('php://stderr', print_r($_REQUEST['action'], TRUE));
    if ($_REQUEST['action'] == 'isSignup')
    {
        $username = $_REQUEST['username'];
        $password = $_REQUEST['password'];
        $email = $_REQUEST['email'];
        $number = $_REQUEST['number'];

        $response = $app->doSignup($username, $password, $email, $number);

        echo $response;

        $decode_response = json_decode($response);

        if ($decode_response->isSuccess)
            $_SESSION['username'] = $username;
    }
} else
    echo 'ERROR: No direct access';
