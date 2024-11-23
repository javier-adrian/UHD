<?php

session_start();
require 'dbconn.php';

class Statement
{
    public function getUser($username)
    {

        error_reporting(E_ERROR);

        $config = new Config();
        $conn = $config->conn;

        if ($conn->connect_error)
            return $conn->connect_error;
        else {
            $query = 'SELECT id from user where username = ?';

            if ($stmt = $conn->prepare($query))
            {
                $stmt->bind_param('s', $username);

                if ($stmt->execute())
                {
                    $stmt->bind_result($id);
                    $stmt->store_result();
                    $stmt->fetch();
                    return $id;
                } else
                    return $stmt->error;
            } else
                return $conn->error;

            $conn->close();
        }
    }
    public function addStatement($user, $type, $amount, $time, $description)
    {
        error_reporting(E_ERROR);

        $config = new Config();
        $conn = $config->conn;

        if ($conn->connect_error)
            return $conn->connect_error;
        else {
            $query = "INSERT INTO statement (user, amount, timestamp, description, type) VALUES (?, ?, from_unixtime(?), ?, ?)";

            if ($stmt = $conn->prepare($query))
            {
                $stmt->bind_param("iidss",  $user,  $amount, $time, $description, $type);

                if ($stmt->execute())
                {
                    $stmt->close();
                    return 'SUCCESSFUL';
                } else
                    return $stmt->error;
            } else
                return $conn->error;
        }
    }

    public function read($user)
    {
        error_reporting(E_ERROR);

        $config = new Config();
        $conn = $config->conn;

        if ($conn->connect_error)
            return $conn->connect_error;
        else {
            $query = "SELECT id, amount, UNIX_TIMESTAMP(timestamp), description, type FROM statement WHERE user = ?";

            if ($stmt = $conn->prepare($query))
            {
                $stmt->bind_param("i",  $user);

                $statements = array();
                $statement = array();

                if ($stmt->execute())
                {
                    $stmt->bind_result($id, $amount, $timestamp, $description, $type);

                    while ($stmt->fetch())
                    {
                        $statement["id"] = $id;
                        $statement["amount"] = $amount;
                        $statement["timestamp"] = $timestamp;
                        $statement["description"] = $description;
                        $statement["type"] = $type;
                        $statements[strval($id)] = $statement;
                    }

                    $stmt->close();

                    return json_encode($statements);
                } else
                    return $stmt->error;
            } else
                return $conn->error;
        }
    }

    public function add($user, $type, $amount, $time, $description)
    {
        $response = array();

        $add = $this->addStatement($user, $type, $amount, $time, $description);

        if ($add == 'SUCCESSFUL') {

            $response['isSuccess'] = true;
            $response['value'] = 1;
            $response['msg'] = "Successfully created";
        } else {
            $response['isSuccess'] = false;
            $response['value'] = 0;
            $response['msg'] = "tf";
        }

        return json_encode($response);
    }

//    public function read($user)
//    {
//        $response = array();
//
//        $read = $this->readStatements($user);
//
//        if ($read) {
//
//            $response['isSuccess'] = true;
//            $response['value'] = 1;
//            $response['msg'] = "Successfully created";
//        } else {
//            $response['isSuccess'] = false;
//            $response['value'] = 0;
//            $response['msg'] = "tf";
//        }
//
//        return json_encode($response);
//    }
}

$app = new Statement();

if (isset($_REQUEST['action']))
{
    if ($_REQUEST['action'] == 'isCreate')
    {
        $user = $app->getUser($_SESSION['username']);
        $type = $_REQUEST['type'];
        $amount = $_REQUEST['amount'];
        $description = $_REQUEST['description'];
        $time = $_REQUEST['timestamp'];

        $response = $app->add($user, $type, $amount, $time, $description);

        echo $response;
    }
    if ($_REQUEST['action'] == 'isRead')
    {
        $user = $app->getUser($_SESSION['username']);

        $response = $app->read($user);

        echo $response;
    }
} else
    echo 'ERROR: No direct access';
//    file_put_contents('php://stderr', print_r($_REQUEST['action'], TRUE));
