<?php

class Erems_Models_Master_Salesgroup extends Erems_Box_Models_ObjectEmbedData {
    private $salesgroup;
    private $description;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "salesgroup_";
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if(isset ($x['salesgroup_id'])){ $this->setId($x['salesgroup_id']); }
        if(isset ($x['salesgroup'])){ $this->setSalesgroup($x['salesgroup']); }
        if(isset ($x['description'])){ $this->setDescription($x['description']); }

        unset($x);
    }

    public function getArrayTable() {
     
        $x = array(
            'salesgroup_id' => $this->getId(),
            'salesgroup'    => $this->getSalesgroup(),
            'description'   => $this->getDescription(),
        );
      
        return $x;
    }

    public function getSalesgroup() { return $this->salesgroup; }
    public function setSalesgroup($salesgroup) { $this->salesgroup = $salesgroup; }
    public function getDescription() { return $this->description; }
    public function setDescription($description) { $this->description = $description; }
}