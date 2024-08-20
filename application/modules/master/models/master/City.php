<?php

/**
 * Description of Badan usaha
 *
 * @author MIS
 */
class Master_Models_Master_City extends Master_Box_Models_ObjectEmbedData {

    private $name;
    private $country;
    private $description;
    private $provinsi;

    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "city_";
        $this->country = new Master_Models_Master_Country();
        $this->provinsi = new Master_Models_Master_Provinsi();
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

    function getProvinsi() {
        if (!$this->provinsi) {
            $this->provinsi = new Master_Models_Master_Provinsi();
        }
        return $this->provinsi;
    }

    function setProvinsi(Master_Models_Master_Provinsi $provinsi) {
        $this->provinsi = $provinsi;
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x['city_id'])) {
            $this->setId($x['city_id']);
        }
        if (isset($x['city_name'])) {
            $this->setName($x['city_name']);
        }
        if (isset($x['country_id'])) {
            $this->getCountry()->setId($x['country_id']);
        }
        if (isset($x['province_id'])) {
            $this->getProvinsi()->setId($x['province_id']);
        }
        if (isset($x['description'])) {
            $this->setdescription($x['description']);
        }
        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            "city_id" => $this->getId(),
            "city_name" => $this->getName(),
            "country_id" => $this->getCountry()->getId(),
            "province_id" => $this->getProvinsi()->getId(),
            "description" => $this->getdescription(),
        );
        return $x;
    }

}

?>
