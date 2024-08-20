<?php


/**
 * Description of Department
 *
 * @author MIS
 */
class Hrd_Models_Master_Hcreportlog extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora{
    
    private $reporttype;
    private $reporttype_description;
    private $cuttoffdate;
    private $filename;
    private $is_mark;
    private $project_id;
    private $pt_id;
    private $mark_month;  
    private $mark_year; 
    private $addon; 
    private $addby_desc; 
    private $modion; 
    private $modiby_desc;
    
    public function __construct($prefix=NULL) {
        parent::__construct();
        $this->embedPrefix = $prefix?$prefix:"hcreportlog_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;

        if(isset ($x['log_hcreport_id'])){
           $this->setId($x['log_hcreport_id']); 
        }
        if(isset ($x['report_type'])){
           $this->setReporttype($x['report_type']); 
        }
        if(isset ($x['cutoff_date'])){
           $this->setCutoffdate($x['cutoff_date']); 
        }
        if(isset ($x['filename'])){
           $this->setFilename($x['filename']); 
        }
        if(isset ($x['is_mark'])){
           $this->setIsmark($x['is_mark']); 
        }
        if(isset ($x['mark_month'])){
           $this->setMarkmonth($x['mark_month']); 
        }
        if(isset ($x['mark_year'])){
           $this->setMarkyear($x['mark_year']);
        }
        if(isset ($x['project_id'])){
           $this->setProjectId($x['project_id']); 
        }
        if(isset ($x['pt_id'])){
           $this->setPtId($x['pt_id']); 
        }

        if(isset ($x['report_type_description'])){
           $this->setReporttype_description($x['report_type_description']); 
        }

        if(isset ($x['addon'])){
           $this->setAddon($x['addon']); 
        }
        if(isset ($x['addby_desc'])){
           $this->setAddby_desc($x['addby_desc']); 
        }

        if(isset ($x['modion'])){
           $this->setModion($x['modion']); 
        }
        if(isset ($x['modiby_desc'])){
           $this->setModiby_desc($x['modiby_desc']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(

            'log_hcreport_id'=>$this->getId(),
            'report_type'=>$this->getReporttype(),
            'cutoff_date'=>$this->getCutoffdate(),
            'filename'=>$this->getFilename(),
            'is_mark'=>$this->getIsmark(),
            'mark_month'=>$this->getMarkmonth(),
            'mark_year'=>$this->getMarkyear(),
            'project_id'=>$this->getProjectId(),
            'pt_id'=>$this->getPtId(),
            'report_type_description'=>$this->getReporttype_description(),
            'marked_periode'=>$this->getMarkedperiode(),

            'addon'=>$this->getAddon(),
            'addby_desc'=>$this->getAddby_desc(),
            'modion'=>$this->getModion(),
            'modiby_desc'=>$this->getModiby_desc(),

        );
      
        return $x;
    }


    public function getReporttype() {
        return $this->reporttype;
    }

    public function setReporttype($reporttype) {
        $this->reporttype = $reporttype;
    }

    public function getCutoffdate() {
        return $this->cuttoffdate;
    }

    public function setCutoffdate($cuttoffdate) {
        $this->cuttoffdate = $cuttoffdate;
    }

    public function getFilename() {
        return $this->filename;
    }

    public function setFilename($filename) {
        $this->filename = $filename;
    }
    
    public function getIsmark() {
        return $this->is_mark;
    }

    public function setIsmark($is_mark) {
        $this->is_mark = $is_mark;
    }

    public function getMarkmonth() {
        return $this->mark_month;
    }

    public function setMarkmonth($mark_month) {
        $this->mark_month = $mark_month;
    }

    public function getMarkyear() {
        return $this->mark_year;
    }

    public function setMarkyear($mark_year) {
        $this->mark_year = $mark_year;
    }

    public function getProjectId() {
        return $this->project_id;
    }

    public function setProjectId($project_id) {
        $this->project_id = $project_id;
    }

    public function getPtId() {
        return $this->pt_id;
    }

    public function setPtId($pt_id) {
        $this->pt_id = $pt_id;
    }    

    public function getReporttype_description() {
        return $this->reporttype_description;
    }

    public function setReporttype_description($reporttype_description) {
        $this->reporttype_description = $reporttype_description;
    }

    public function getMarkedperiode() {
        $periode = '';
        if($this->mark_month != ''  && $this->mark_year != '')
        {
            $periode = $this->mark_month . ' / ' . $this->mark_year;

        }
        return $periode;
    }

    public function setPeriodemarked($periode_marked) {
        $this->periode_marked = $periode_marked;
    }


    public function getAddby_desc() {
        return $this->addby_desc;
    }
    
    public function setAddby_desc($addby_desc) {
        $this->addby_desc = $addby_desc;
    }  

    public function getAddon() {
        return $this->addon;
    }

    public function setAddon($addon) {
        $this->addon = $addon;
    }  

    public function getModiby_desc() {
        return $this->modiby_desc;
    }
    
    public function setModiby_desc($modiby_desc) {
        $this->modiby_desc = $modiby_desc;
    }  

    public function getModion() {
        return $this->modion;
    }

    public function setModion($modion) {
        $this->modion = $modion;
    }



    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }


}

?>
