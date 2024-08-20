<?php
/**
 * Description of Sex
 *
 * @author MIS
 */
class Hrd_Models_Master_Global_Sex extends Box_Models_ObjectEmbedData {
    private $sex;
    private $code;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "sex_";
    }
    
    
    public function getSex() {
        return $this->sex;
    }

    public function setSex($sex) {
        $this->sex = $sex;
    }
    
    public function getCode() {
        return $this->code;
    }

    public function setCode($code) {
        $this->code = $code;
    }

        
    public function setArrayTable($dataArray=NULL) {
   
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
  
        if(isset ($x['sex_id'])){
           $this->setId($x['sex_id']); 
        }
        if(isset ($x['sex'])){
           $this->setSex($x['sex']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        unset($x);

        
    }
    
    public function getArrayTable(){
        $x = array(
            "sex_id"=>$this->getId(),
            "sex"=>$this->getSex(),
            "code"=>$this->getCode()
        );
      
        return $x;
    }


    
}

?>
