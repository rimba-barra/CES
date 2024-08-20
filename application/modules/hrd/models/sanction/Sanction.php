<?php

/**
 * Description of Sanction
 *
 * @author MIS
 */
class Hrd_Models_Sanction_Sanction extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Models_Master_InterProjectPt {
    private $employee;
    private $sanctionType;
    private $startDate;
    private $endDate;
    private $project;
    private $pt;
    private $note;
    private $is_sanctiontype_lisan;
    
    public function __construct() {
        $this->embedPrefix = "sanction_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['sanction_id'])){
           $this->setId($x['sanction_id']); 
        }
        if(isset ($x['start_date'])){
           $this->setStartDate($x['start_date']); 
        }
        if(isset ($x['end_date'])){
           $this->setEndDate($x['end_date']); 
        }
        
        if(isset ($x['note'])){
           $this->setNote($x['note']); 
        }
        
        // edited by wulan sari 20190328
        if(isset ($x['is_sanctiontype_lisan'])){
           $this->setIs_sanctiontype_lisan($x['is_sanctiontype_lisan']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'sanction_id'=>$this->getId(),
            'start_date'=>$this->getStartDate(),
            'end_date'=>$this->getEndDate(),
            'note'=>$this->getNote(),
            'is_sanctiontype_lisan'=>$this->getIs_sanctiontype_lisan() // edited by wulan sari 20190328
        );
      
        return $x;
    }
    
    public function getEmployee() {
        if(!$this->employee){
            $this->employee = new Hrd_Models_Master_Employee();
        }
        return $this->employee;
    }

    public function setEmployee(Hrd_Models_Master_Employee $employee) {
        $this->employee = $employee;
    }

    public function getSanctionType() {
        if(!$this->sanctionType){
            $this->sanctionType = new Hrd_Models_Master_SanctionType();
        }
        return $this->sanctionType;
    }

    public function setSanctionType(Hrd_Models_Master_SanctionType $sanctionType) {
        $this->sanctionType = $sanctionType;
    }

    public function getStartDate() {
        return $this->startDate;
    }

    public function setStartDate($startDate) {
        $this->startDate = $startDate;
    }

    public function getEndDate() {
        return $this->endDate;
    }

    public function setEndDate($endDate) {
        $this->endDate = $endDate;
    }

    public function getProject() {
        if(!$this->project){
            $this->project = new Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function setProject(Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setPt(Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
    
    public function getNote() {
        return $this->note;
    }

    public function setNote($note) {
        $this->note = $note;
    }
    
    // edited by wulan sari 20190328
    public function getIs_sanctiontype_lisan() {
        return $this->is_sanctiontype_lisan;
    }

    public function setIs_sanctiontype_lisan($is_sanctiontype_lisan) {
        $this->is_sanctiontype_lisan = $is_sanctiontype_lisan;
    }
    // end edited by wulan sari 20190328

    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getSanctionType(),$this->getEmployee(),$this->getProject(),$this->getPt());
    }
    
    public function getDatefields() {
        return array("start_date","end_date");
    }


}

?>
