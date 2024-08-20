<?php

/**
 * Description of AbsentType
 *
 * @author MIS
 */
class Hrd_Models_Master_AbsentType extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    private $name;
    private $code;
    private $isCutLeave;
    private $group;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "absenttype_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['absenttype_id'])){
           $this->setId($x['absenttype_id']); 
        }
        if(isset ($x['absenttype'])){
           $this->setName($x['absenttype']); 
        }
        if(isset ($x['code'])){
           $this->setCode($x['code']); 
        }
        if(isset ($x['is_cutleave'])){
           $this->setIsCutLeave($x['is_cutleave']); 
        }
        if(isset ($x['absenttypegroup_absenttypegroup_id'])){
           $this->getGroup()->setId($x['absenttypegroup_absenttypegroup_id']); 
        }
        if(isset ($x['absenttypegroup_absenttypegroup'])){
           $this->getGroup()->setName($x['absenttypegroup_absenttypegroup']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'absenttype_id'=>$this->getId(),
            'absenttype'=>$this->getName(),
            'code'=>$this->getCode(),
            'is_cutleave'=>$this->getIsCutLeave(),
            'absenttypegroup_absenttypegroup_id'=>$this->getGroup()->getId(),
            'absenttypegroup_absenttypegroup'=>$this->getGroup()->getName()
        );
      
        return $x;
    }
    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getCode() {
        return $this->code;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function getIsCutLeave() {
        return $this->isCutLeave;
    }

    public function setIsCutLeave($isCutLeave) {
        $this->isCutLeave = $isCutLeave;
    }

    public function getGroup() {
        if(!$this->group){
            $this->group = new Hrd_Models_Master_AbsentTypeGroup();
        }
        return $this->group;
    }

    public function setGroup(Hrd_Models_Master_AbsentTypeGroup $group) {
        $this->group = $group;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getGroup());
    }


}

?>
