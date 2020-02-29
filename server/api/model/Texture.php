<?php
class Texture {
    //Database information
    private $connection;
    private $tableName = "textures";

    //Texture informations
    public $id;
    public $name;
    public $source;
    public $width;
    public $height;

    public function __construct($db, $textureId) {
        $this->id = $textureId;
        $this->connection = $db;

        $this->setDataForModel();
    }

    private function setDataForModel() {
        //Database query
        $query = "SELECT * FROM ". $this->tableName . " WHERE id=" . $this->id . " LIMIT 1";
        
        //Prepare and execute statemaent
        $stmt = $this->connection->query($query);
        $result = $stmt->fetch();

        if(is_array($result)) {
            $this->name = $result["name"];
            $this->source = $result["source"];
            $this->width = $result["widht"];
            $this->height = $result["height"];
        }
    }
}
?>