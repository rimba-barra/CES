<?php

/**
 * Description of Badan usaha
 *
 * @author MIS
 */
class Master_Models_Master_Provinsi extends Master_Box_Models_ObjectEmbedData {

    private $name;
    private $country;
    private $description;

    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "provinsi_";
        $this->country = new Master_Models_Master_Country();
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getName() {
        return $this->name;
    }

    public function setdescription($param) {
        $this->description = $param;
    }

    public function getdescription() {
        return $this->description;
    }

    function getCountry() {
        if (!$this->country) {
            $this->country = new Master_Models_Master_Country();
        }
        return $this->country;
    }

    function setCountry(Master_Models_Master_Provinsi $country) {
        $this->country = $country;
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x['province_id'])) {
            $this->setId($x['province_id']);
        }
        if (isset($x['province_name'])) {
            $this->setName($x['province_name']);
        }
        if (isset($x['country_id'])) {
            $this->getCountry()->setId($x['country_id']);
        }
        if (isset($x['description'])) {
            $this->setdescription($x['description']);
        }
        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            "province_id" => $this->getId(),
            "province_name" => $this->getName(),
            "country_id" => $this->getCountry()->getId(),
            "description" => $this->getdescription(),
        );
        return $x;
    }

}

?>
