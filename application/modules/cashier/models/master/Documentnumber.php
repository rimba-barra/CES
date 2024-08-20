<?php
/**
 * Description of Department
 *
 * @author MIS
 */
class Cashier_Models_Master_Documentnumber extends Cashier_Box_Models_ObjectEmbedData  implements Cashier_Box_Kouti_Remora,  Cashier_Box_Models_Master_InterProjectPt,Cashier_Box_Delien_DelimiterCandidate {
    
    private $module;
    private $resettype;
    private $format;
    private $month;
    private $day;
    private $counter;
    private $year;

    
     public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
       
        //$this->detail = array();
        $this->embedPrefix = 'documentnumber_';
    }
    
    function getModule() {
        return $this->module;
    }

    function getResettype() {
        return $this->resettype;
    }

    function getFormat() {
        return $this->format;
    }

    function getMonth() {
        return $this->month;
    }

    function getDay() {
        return $this->day;
    }

    function getCounter() {
        return $this->counter;
    }

    function setModule($module) {
        $this->module = $module;
    }

    function setResettype($resettype) {
        $this->resettype = $resettype;
    }

    function setFormat($format) {
        $this->format = $format;
    }

    function setMonth($month) {
        $this->month = $month;
    }

    function setDay($day) {
        $this->day = $day;
    }

    function setCounter($counter) {
        $this->counter = $counter;
    }


    function getYear() {
        return $this->year;
    }

    function setYear($year) {
        $this->year = $year;
    }

        
        
    public function setArrayTable($dataArray=NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['documentnumber_id'])){
           $this->setId($x['documentnumber_id']); 
        }
        if(isset ($x['module_name'])){
           $this->setModule($x['module_name']); 
        }
        if(isset ($x['reset_type'])){
           $this->setResettype($x['reset_type']); 
        }
        if(isset ($x['format'])){
           $this->setFormat($x['format']); 
        }
        if(isset ($x['month'])){
           $this->setMonth($x['month']); 
        }
        if(isset ($x['day'])){
           $this->setDay($x['day']); 
        }
        if(isset ($x['counter'])){
           $this->setCounter($x['counter']); 
        }
        if(isset ($x['active'])){
           $this->setActived($x['active']); 
        }
        if(isset ($x['year'])){
           $this->setYear($x['year']); 
        }
       
      
    }
    
    public function getArrayTable(){

        $x = array(
            "documentnumber_id"=>$this->getId(),
            "module_name"=>$this->getModule(),
            "reset_type"=>$this->getResettype(),
            "year"=>$this->getYear(),
            "format"=>$this->getFormat(),
            "month"=>$this->getMonth(),
            "day"=>$this->getDay(),
            "counter"=>$this->getCounter() ? $this->getCounter() : '0',
            "active"=>$this->getActived(),
            "modiby"=>$this->getModiBy(),
            "modion"=>$this->getModiOn()   
        );
        
        return $x;
        
    }
    
    
    public function getProject() {
        return $this->project;
    }

    public function setProject(Cashier_Box_Models_Master_Project $project) {
        $this->project = $project;
    }
    
     public function setProjectPt(Cashier_Box_Models_Master_Project $project, Cashier_Box_Models_Master_Pt $pt) {
        $this->project = $project;
        $this->pt = $pt;
    }

    public function getPt() {
        return $this->pt;
    }

    public function setPt(Cashier_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getProject(),$this->getPt());
    }
    
    protected function getDatefields() {
        $x = parent::getDatefields();
        return array_merge($x,array("Modion","Addon"));
    }

    public function getDCArray() {
        return $this->detail;
    }

    public function getDCResult() {
        return $this->dcResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->dcResult = $delimiteredArray;
    }


}

?>
