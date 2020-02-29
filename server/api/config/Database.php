<?php
class Database {
    private $host = "localhost";
    private $databaseName = "phpengine";
    private $username = "root";
    private $password = "";
    private $connection;

    public function getConnection() {
        $this->connection = null;

        try {
            $this->connection = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->databaseName, $this->username, $this->password);
            $this->connection->exec("set names utf8");
        } catch(PDOException $exception) {
            echo $exception->getMessage();
        }
        return $this->connection;
    }
} 
?>