<?php


/**
 * Description of KTP
 *
 * @author MIS
 */
class Hrd_Models_Master_General_KTP extends Box_Models_ObjectEmbedData {
    private $nomor;
    private $name;
    private $address;
    
    
   /*start added by ahmad riadi 08-02-2018 */    
    public function cleanData($param) {
        $setup = new Hrd_Models_General_Setup();
        $data = $setup->clean_specialcaracter($param);
        return $data;
    }
    /*end added by ahmad riadi 08-02-2018 */
    
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
        if(isset ($x['ktp_number'])){
           $this->setNomor($x['ktp_number']); 
        }
        if(isset ($x['ktp_name'])){
           $this->setName($x['ktp_name']); 
        }
        if(isset ($x['ktp_address'])){
           $this->setAddress($x['ktp_address']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'ktp_number'=>$this->getNomor(),
            'ktp_name'=>$this->getName(),
            'ktp_address'=>$this->cleanData($this->getAddress())
        );
      
        return $x;
    }
    
    


}

?>
