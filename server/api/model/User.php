<?php
class User {
    //Database information
    private $connection;
    private $tableName = "users";

    //User informations
    public $id;
    public $username;
    public $email;
    public $characterOne;
    public $characterTwo;
    public $characterThree;
    public $characterFour;
    public $accountCreated;
    public $lastLogin;
    public $lastLoginIp;

    public function __construct($db) {
        $this->connection = $db;

    }

    private function login($username, $password) {
        $username = htmlspecialchars(strip_tags($username));
        $password = htmlspecialchars(strip_tags($password));

        $query = 'SELECT id, username, email, characterOne, characterTwo, characterThree, characterFour, accountCreated, lastLogin, lastLoginIp FROM ' . $this->tableName . ' WHERE username="' . $username . '" and password="' . $password .'" limit 1';
        
        //Prepare and execute statemaent
        $stmt = $this->connection->query($query);
        $result = $stmt->fetch();

        //Check data and assign to model variables
        if(is_array($result)) {
            if($result["username"] == $username) {
                $this->id = $result["id"];
                $this->username = $result["username"];
                $this->email = $result["email"];
                $this->characterOne = $result["characterOne"];
                $this->characterTwo = $result["characterTwo"];
                $this->characterThree = $result["characterThree"];
                $this->characterFour = $result["characterFour"];
                $this->accountCreated = $result["accountCreated"];
                $this->lastLogin = $result["lastLogin"];
                $this->lastLoginIp = $result["lastLoginIp"];

                //Przypusanie aktaulniego ip i aktualnej daty

                return true;
            }
        }
        return false;
    }

    //Metoda rejestracji

}
?>