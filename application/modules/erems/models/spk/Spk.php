<?php

/**
 * Description of Spk
 *
 * @author MIS
 */
class Erems_Models_Spk_Spk extends Erems_Box_Models_ObjectEmbedData {
    private $code;
    private $nomor;
    private $date;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'spk_';
    }
    
    public function getCode() {
        return $this->code;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function getNomor() {
        return $this->nomor;
    }

    public function setNomor($nomor) {
        $this->nomor = $nomor;
    }

    public function getDate() {
        return $this->date;
    }

    public function setDate($date) {
        $this->date = $date;
      //  $this->date = $date;
    }
    
    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['spk_id'])){
           $this->setId($x['spk_id']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['spk_no'])){
           $this->setNomor($x['spk_no']); 
        }
        if(isset ($x['spk_date'])){
           $this->setDate($x['spk_date']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            "spk_id"=>$this->getId(),
            "code"=>$this->getCode(),
            "spk_no"=>$this->getNomor(),
            "spk_date"=>$this->getDate()
        );
        return $x;
    }
    
    protected function getDatefields() {
        return array("spk_date");
    }

    
    


    
}

?>
