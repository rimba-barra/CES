<?php
/**
 * Description of Plafon
 *
 * @author MIS
 */
class Hrd_Models_Pengobatan_Plafon extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora,  Box_Models_Master_InterProjectPt {
    private $year;
    private $startDate;
    private $endDate;
    private $employeeGroup;
    private $type;
    private $value;
    private $project;
    private $pt;
    private $nomorSk;
    private $tanggalSk;
    private $masterSk;

    private $employeePtkp;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "plafonpengobatan_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['plafonpengobatan_id'])){
           $this->setId($x['plafonpengobatan_id']); 
        }
        if(isset ($x['year'])){
           $this->setYear($x['year']); 
        }
        if(isset ($x['start_date'])){
           $this->setStartDate($x['start_date']); 
        }
        if(isset ($x['end_date'])){
           $this->setEndDate($x['end_date']); 
        }
        if(isset ($x['value'])){
           $this->setValue($x['value']); 
        }
        if(isset ($x['group_group_id'])){
           $this->getEmployeeGroup()->setId($x['group_group_id']); 
        }
        if(isset ($x['jenispengobatan_jenispengobatan_id'])){
           $this->getType()->setId($x['jenispengobatan_jenispengobatan_id']); 
        }
      
        if(isset ($x['mastersk_mastersk_id'])){
           $this->getMasterSk()->setId($x['mastersk_mastersk_id']); 
        }

        if(isset ($x['ptkp_id'])){
           $this->getEmployeePtkp()->setId($x['ptkp_id']); 
        }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'plafonpengobatan_id'=>$this->getId(),
            'year'=>$this->getYear(),
            'start_date'=>$this->getStartDate(),
            'end_date'=>$this->getEndDate(),
            'value'=>$this->getValue(),
            'group_group_id'=>$this->getEmployeeGroup()->getId(),
            'jenispengobatan_jenispengobatan_id'=>$this->getType()->getId(),
        
            'mastersk_mastersk_id'=>$this->getMasterSk()->getId(),

            'ptkp_id'=>$this->getEmployeePtkp()->getId(),
        );
      
        return $x;
    }
    
    public function getYear() {
        return $this->year;
    }

    public function setYear($year) {
        $this->year = $year;
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

    public function getEmployeeGroup() {
        if(!$this->employeeGroup){
            $this->employeeGroup = new Hrd_Models_Master_Group();
        }
        return $this->employeeGroup;
    }

    public function setEmployeeGroup(Hrd_Models_Master_Group $employeeGroup) {
        $this->employeeGroup = $employeeGroup;
    }

    public function getEmployeePtkp() {
        if(!$this->employeePtkp){
            $this->employeePtkp = new Hrd_Models_Master_Ptkp_Ptkp();
        }
        return $this->employeePtkp;
    }

    public function setEmployeePtkp(Hrd_Models_Master_Ptkp_Ptkp $employeePtkp) {
        $this->employeePtkp = $employeePtkp;
    }

    public function getType() {
        if(!$this->type){
            $this->type = new Hrd_Models_Pengobatan_Type();
        }
        return $this->type;
    }

    public function setType(Hrd_Models_Pengobatan_Type $type) {
        $this->type = $type;
    }

    public function getValue() {
        return $this->value;
    }

    public function setValue($value) {
        $this->value = (double)$value;
    }
    
    protected function getDatefields() {
        return array("start_date","end_date");
    }

        
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getEmployeeGroup(),$this->getType(), $this->getEmployeePtkp());
    }

    public function getProject() {
        if(!$this->project){
            $this->project = Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function getPt() {
        if(!$this->pt){
            $this->pt = new Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setProject(\Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(\Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
    
    public function getNomorSk() {
        return $this->nomorSk;
    }

    public function getTanggalSk() {
        return $this->tanggalSk;
    }

    public function setNomorSk($nomorSk) {
        $this->nomorSk = $nomorSk;
    }

    public function setTanggalSk($tanggalSk) {
        $this->tanggalSk = $tanggalSk;
    }
    
    public function getMasterSk() {
        if(!$this->masterSk){
            $this->masterSk = new Hrd_Models_Master_Sk_MasterSK();
        }
        return $this->masterSk;
    }

    public function setMasterSk(Hrd_Models_Master_Sk_MasterSK $masterSk) {
        $this->masterSk = $masterSk;
    }


    
    


}

?>
