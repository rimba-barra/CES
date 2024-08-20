<?php

/**
 * Description of Phone
 *
 * @author MIS
 */
class Hrd_Models_Master_General_PhoneNumber extends Box_Models_ObjectEmbedData {
    private $number;
    private $mobile;
    private $office;
    
    public function getNumber() {
        return $this->number;
    }

    public function setNumber($number) {
        $this->number = $number;
    }

    public function getMobile() {
        return $this->mobile;
    }

    public function setMobile($mobile) {
        $this->mobile =$mobile;
    }

    public function getOffice() {
        return $this->office;
    }

    public function setOffice($office) {
        $this->office = $office;
    }

        
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['phone_number'])){
           $this->setNumber($x['phone_number']); 
        }
        if(isset ($x['hp_number'])){
           $this->setMobile($x['hp_number']); 
        }
        if(isset ($x['office_number'])){
           $this->setOffice($x['office_number']); 
        }
        
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'phone_number'=>$this->getNumber(),
            'hp_number'=>$this->getMobile(),
            'office_number'=>$this->getOffice()
        );
      
        return $x;
    }
    
    


}

?>
