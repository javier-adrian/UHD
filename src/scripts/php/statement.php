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
                    return "Deleted Successfully";
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
                    return "Updated Successfully";
                } else
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
            $query = "SELECT DAY(timestamp) AS day, MONTH(timestamp) AS month, YEAR(timestamp) AS year, id, amount, TO_CHAR(timestamp, 'HH24:MI:SS'), description, type, currency, timestamp FROM statement WHERE user = ? ORDER BY timestamp";

            if ($stmt = $conn->prepare($query))
            {
                $stmt->bind_param("i",  $user);

                $statements = array();
                $statement = array();

                if ($stmt->execute())
                {
                    $stmt->bind_result($day, $month, $year, $id, $amount, $timestamp, $description, $type, $currency, $datetime);

                    while ($stmt->fetch())
                    {
                        $statement["id"] = $id;
                        $statement["amount"] = $amount;
                        $statement["timestamp"] = $timestamp;
                        $statement["description"] = $description;
                        $statement["type"] = $type;
                        $statement["currency"] = $currency;
                        $statement["datetime"] = $datetime;
                        $statements[$year][$month][$day][strval($id)] = $statement;
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

        echo $app->add($user, $type, $amount, $time, $description, $currency);
    }
    if ($_REQUEST['action'] == 'isRead')
    {
        $user = $app->getUser($_SESSION['username']);

        echo $app->read($user);
    }
    if ($_REQUEST['action'] == 'isDelete')
    {
        $user = $app->getUser($_SESSION['username']);
        $id = $_REQUEST['id'];

        echo $app->delete($user, $id);
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

        echo $app->update($user, $id, $amount, $type, $description, $time, $currency);
    }
    if ($_REQUEST['action'] == 'isTest')
    {
        $id = $_REQUEST['user'];
        file_put_contents('php://stderr', print_r("TEST", TRUE));
    }
} else
    echo 'ERROR: No direct access';
//    file_put_contents('php://stderr', print_r($_REQUEST['action'], TRUE));
