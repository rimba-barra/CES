<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Spouse
 *
 * @author MIS
 */
class Hrd_Models_Master_Spouse extends Hrd_Models_Master_Relation {
    private $phoneNumber;
    private $company;
    private $child;
    
    public function __construct($embedPrefix = NULL) {
        parent::__construct("spouse_");
        $type = new Hrd_Models_Master_RelationType();
   
        $type->setId(Box_Config::getv("RT_SPOUSE"));
        $this->setRelationType($type);
        
    }


    public function setArrayTable($dataArray=NULL) {
   
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        parent::setArrayTable($x);
        
        if(isset ($x['birth_place'])){
           $this->setBirthPlace($x['birth_place']); 
        }
        if(isset ($x['child'])){
           $this->setChild($x['child']); 
        }
        
        $this->getPhoneNumber()->setArrayTable($x);
        $this->getCompany()->setArrayTable($x);
        
       
        unset($x);

        
    }
    
    public function getArrayTable(){
        $x = parent::getArrayTable();
        $y = $this->getPhoneNumber()->getArrayTable();
        $z = $this->getCompany()->getArrayTable();
        $w = array(
            "birth_place"=>$this->getBirthPlace(),
            "child"=>$this->getChild()
        );
        $x = array_merge($x,$y,$z,$w);
        return $x;
    }
    
    public function getChild() {
        return $this->child;
    }

    public function setChild($child) {
        $this->child = $child;
    }

        
    

    public function getPhoneNumber() {
        if(!$this->phoneNumber){
            $this->phoneNumber = new Hrd_Models_Master_General_PhoneNumber();
        }
        return $this->phoneNumber;
    }

    public function setPhoneNumber($phoneNumber) {
        $this->phoneNumber = $phoneNumber;
    }

  

    public function getCompany() {
        if(!$this->company){
            $this->company = new Hrd_Models_Master_General_Company();
        }
        return $this->company;
    }

    public function setCompany($company) {
        $this->company = $company;
    }


}

?>
