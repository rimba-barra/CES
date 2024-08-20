<?php

/**
 * Description of Badan usaha
 *
 * @author MIS
 */
class Master_Models_Master_Citytype extends Master_Box_Models_ObjectEmbedData {

    private $name;


    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "citytype_";

    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getName() {
        return $this->name;
    }

  

    function setProvinsi(Master_Models_Master_Provinsi $provinsi) {
        $this->provinsi = $provinsi;
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x['city_type_id'])) {
            $this->setId($x['city_type_id']);
        }
        if (isset($x['city_type_name'])) {
            $this->setName($x['city_type_name']);
        }
 
        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            "city_type_id" => $this->getId(),
            "city_type_name" => $this->getName(),
           
        );
        return $x;
    }

}

?>
