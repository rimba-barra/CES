<?php

/**
 * Description of Bank
 *
 * @author tommytoban
 */
class Cashier_Models_Master_Ptforcashbon extends Cashier_Box_Models_ObjectEmbedData {
    
    private $pt;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "pt_id_cashbon_";
    }

    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['pt_id_cashbon'])) {
            $this->setId($x['pt_id_cashbon']);
        }
        
        
        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            "pt_id_cashbon" => $this->getId(),
       
            
        );

        return $x;
    }


}
