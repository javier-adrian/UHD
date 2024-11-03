<?php
session_start();
require 'dbconn.php';

class LoginStudent
{
    public function checkUser($username)
    {
        error_reporting(E_ERROR);
        $config = new Config();
        $conn = $config->conn;

        if ($conn->connect_error)
            return $conn->connect_error;
        else {
            $query = 'SELECT username from users where username = ?';

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

    public function getHashPassword($username)
    {
        error_reporting(E_ERROR);
        $config = new Config();

        $conn = $config->conn;

        if ($conn->connect_error)
            return $conn->connect_error;
        else {
            $query = 'SELECT password from users where username = ?';

            if ($stmt = $conn->prepare($query))
            {
                $stmt->bind_param('s', $username);

                if ($stmt->execute())
                {
                    $stmt->bind_result($password);
                    $stmt->store_result();

                    if ($stmt->num_rows > 0)
                        while($stmt->fetch())
                            return crypt($password, "JL^Dm_dJj2pZ");

                    $stmt->close();
                } else
                    return $stmt->error;
            } else
                return $conn->error;

            $conn->close();
        }
    }

    public function verifyInput($password, $hashpassword)
    {
        return crypt($password, "JL^Dm_dJj2pZ") == $hashpassword;
    }

    public function doLogin($username, $password)
    {
        $app = new LoginStudent();
        $response = array();

        $checkUser = $app->checkUser($username);

        if ($checkUser == 'USER_FOUND') {

            $hashpassword = $app->getHashPassword($username);

            if (crypt($password, "JL^Dm_dJj2pZ") == $hashpassword) {
                $response['isSuccess'] = true;
                $response['value'] = 1;
                $response['msg'] = "Login Successful";
            } else {
                $response['isSuccess'] = false;
                $response['value'] = 0;
                $response['msg'] = "Invalid Login Credentials";
            }
        } else if ($checkUser == 'USER_NOT_FOUND') {
            $response['isSuccess'] = false;
            $response['value'] = 0;
            $response['msg'] = "User not found";
        } else {
            $response['isSuccess'] = false;
            $response['value'] = 0;
            $response['msg'] = $checkUser;
        }

        return json_encode($response);
    }
}

$app = new LoginStudent();

if (isset($_REQUEST['action'])) {
    if ($_REQUEST['action'] == 'isLogin') {
        $username = $_REQUEST['username'];
        $password = $_REQUEST['password'];

        $response = $app->doLogin($username, $password);

        echo $response;
        $decode_response = json_decode($response);

        if ($decode_response->isSuccess)
            $_SESSION['username'] = $username;
    }
} else
    echo 'ERROR: No direct access';
