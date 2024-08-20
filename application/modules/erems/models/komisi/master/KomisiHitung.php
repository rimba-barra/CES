<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of KomisiHitung
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Komisi_Master_KomisiHitung extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora{
    private $code;
    private $name;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "komisihitung_";
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x["komisihitung_id"])) {
            $this->setid($x["komisihitung_id"]);
        }
        if (isset($x["code"])) {
            $this->setCode($x["code"]);
        }
        if (isset($x["name"])) {
            $this->setName($x["name"]);
        }
       

        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            "komisihitung_id" => $this->getId(),
            "code" => $this->getCode(),
            "name" => $this->getName()

        );

        return $x;
    }

    
    function getCode() {
        return $this->code;
    }

    function getName() {
        return $this->name;
    }

    function setCode($code) {
        $this->code = $code;
    }

    function setName($name) {
        $this->name = $name;
    }

        
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        
    }

}
