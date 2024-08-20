<?php


/**
 * Description of MediaPromotion
 *
 * @author tommytoban
 */
class Erems_Models_Master_MediaPromotion extends Erems_Box_Models_ObjectEmbedData {
    private $code;
    private $name;
    private $description;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "mediapromotion_";
    }
    
    public function getCode() {
        return $this->code;
    }

    public function getName() {
        return $this->name;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setDescription($description) {
        $this->description = $description;
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['mediapromotion_id'])) {
            $this->setId($x['mediapromotion_id']);
        }
        if (isset($x['code'])) {
            $this->setCode($x['code']);
        }
        if (isset($x['mediapromotion'])) {
            $this->setName($x['mediapromotion']);
        }
        if (isset($x['description'])) {
            $this->setDescription($x['description']);
        }
       
        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            "mediapromotion_id" => $this->getId(),
            "code"=>$this->getCode(),
            "mediapromotion"=>$this->getName(),
            "description"=>$this->getDescription()
        );

        return $x;
    }



}
