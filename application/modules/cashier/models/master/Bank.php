<?php

/**
 * Description of Bank
 *
 * @author tommytoban
 */
class Cashier_Models_Master_Bank extends Cashier_Box_Models_ObjectEmbedData {
    private $name;
    private $company;
    private $description;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "bank_";
    }
    
    public function getName() {
        return $this->name;
    }

    public function getCompany() {
        return $this->company;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setCompany($company) {
        $this->company = $company;
    }

    public function setDescription($description) {
        $this->description = $description;
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['bank_id'])) {
            $this->setId($x['bank_id']);
        }
        if (isset($x['bank_name'])) {
            $this->setName($x['bank_name']);
        }
        if (isset($x['bank_company_name'])) {
            $this->setCompany($x['bank_company_name']);
        }
        if (isset($x['description'])) {
            $this->setDescription($x['description']);
        }
        
        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            "bank_id" => $this->getId(),
            "bank_name"=>$this->getName(),
            "bank_company_name"=>$this->getCompany(),
            "description"=>$this->getDescription()
            
        );

        return $x;
    }


}
