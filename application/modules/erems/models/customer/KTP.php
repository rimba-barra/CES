<?php


/**
 * Description of KTP
 *
 * @author MIS
 */
class Erems_Models_Customer_KTP extends Erems_Box_Models_ObjectEmbedData {
    private $nomor;
    private $name;
    private $address;
    
    public function getNomor() {
        return $this->nomor;
    }

    public function setNomor($nomor) {
        $this->nomor = $nomor;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getAddress() {
        return $this->address;
    }

    public function setAddress($address) {
        $this->address = $address;
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['KTP_number'])){
           $this->setNomor($x['KTP_number']); 
        }
        if(isset ($x['KTP_name'])){
           $this->setName($x['KTP_name']); 
        }
        if(isset ($x['KTP_address'])){
           $this->setAddress($x['KTP_address']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'KTP_number'=>$this->getNomor(),
            'KTP_name'=>$this->getName(),
            'KTP_address'=>$this->getAddress()
        );
      
        return $x;
    }
    
    


}

?>
