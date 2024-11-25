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

    public function delete($username, $statement)
    {

        error_reporting(E_ERROR);

        $config = new Config();
        $conn = $config->conn;

        if ($conn->connect_error)
            return $conn->connect_error;
        else {
            $query = 'DELETE FROM statement WHERE user = ? AND id = ?';

            if ($stmt = $conn->prepare($query))
            {
                $stmt->bind_param('ii', $username, $statement);

                if ($stmt->execute())
                {
                    echo "Deleted Successfully";
                } else
                    return $stmt->error;
            } else
                return $conn->error;

            $conn->close();
        }
    }

    public function update($user, $statement, $amount, $type, $description, $time, $currency)
    {

        error_reporting(E_ERROR);

        $config = new Config();
        $conn = $config->conn;

        if ($conn->connect_error)
            return $conn->connect_error;
        else {
            $query = 'UPDATE statement SET amount = ?, type = ?, description = ?, timestamp = from_unixtime(?), currency = ? WHERE id = ? AND user = ?';

            if ($stmt = $conn->prepare($query))
            {
                $stmt->bind_param('issisii', $amount, $type, $description, $time, $currency, $statement, $user);

                if ($stmt->execute())
                {
                    file_put_contents('php://stderr', print_r("lasdkfjalsdkjf", TRUE));
                    echo "Updated Successfully";
                } else
                    file_put_contents('php://stderr', print_r("lladslkfjsad", TRUE));
                    echo "Update unsuccessful";
                    return $stmt->error;
            } else
                return $conn->error;

            $conn->close();
        }
    }

    public function addStatement($user, $type, $amount, $time, $description, $currency)
    {
        error_reporting(E_ERROR);

        $config = new Config();
        $conn = $config->conn;

        if ($conn->connect_error)
            return $conn->connect_error;
        else {
            $query = "INSERT INTO statement (user, amount, timestamp, description, type, currency) VALUES (?, ?, from_unixtime(?), ?, ?, ?)";

            if ($stmt = $conn->prepare($query))
            {
                $stmt->bind_param("iidsss",  $user,  $amount, $time, $description, $type, $currency);

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
            $query = "SELECT id, amount, UNIX_TIMESTAMP(timestamp), description, type, currency FROM statement WHERE user = ?";

            if ($stmt = $conn->prepare($query))
            {
                $stmt->bind_param("i",  $user);

                $statements = array();
                $statement = array();

                if ($stmt->execute())
                {
                    $stmt->bind_result($id, $amount, $timestamp, $description, $type, $currency);

                    while ($stmt->fetch())
                    {
                        $statement["id"] = $id;
                        $statement["amount"] = $amount;
                        $statement["timestamp"] = $timestamp;
                        $statement["description"] = $description;
                        $statement["type"] = $type;
                        $statement["currency"] = $currency;
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

    public function add($user, $type, $amount, $time, $description, $currency)
    {
        $response = array();

        $add = $this->addStatement($user, $type, $amount, $time, $description, $currency);

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
        $time = $_REQUEST['datetime'];
        $currency = $_REQUEST['currency'];

        $response = $app->add($user, $type, $amount, $time, $description, $currency);

        echo $response;
    }
    if ($_REQUEST['action'] == 'isRead')
    {
        $user = $app->getUser($_SESSION['username']);

        $response = $app->read($user);

        echo $response;
    }
    if ($_REQUEST['action'] == 'isDelete')
    {
        $user = $app->getUser($_SESSION['username']);
        $id = $_REQUEST['id'];
        file_put_contents('php://stderr', print_r("lasdkfjalsdkjf", TRUE));

        $app->delete($user, $id);
    }
    if ($_REQUEST['action'] == 'isUpdate')
    {
        $user = $app->getUser($_SESSION['username']);
        $id = $_REQUEST['id'];
        $amount = $_REQUEST['amount'];
        $type = $_REQUEST['type'];
        $description = $_REQUEST['description'];
        $time = $_REQUEST['datetime'];
        $currency = $_REQUEST['currency'];
//        file_put_contents('php://stderr', print_r("lasdkfjalsdkjf", TRUE));

        $app->update($user, $id, $amount, $type, $description, $time, $currency);
    }
} else
    echo 'ERROR: No direct access';
//    file_put_contents('php://stderr', print_r($_REQUEST['action'], TRUE));
