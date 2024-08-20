<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Position
 *
 * @author MIS
 */
class Hrd_Models_Master_Position extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {
    
    private $name;

    private $description;

    //UNTUK PAYROLL CHERRY
    private $status_transfer;
    private $action_process;
    private $subholding_subname;
    private $company_code;
    private $pt_id;
    private $pt_name;
    private $project_id;
    private $project_name;

    private $upload_check;

    //private $subholding_subname;


    
    /*
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "position_";
    }
    */
    public function __construct($prefix=NULL) {
        parent::__construct();
        $this->embedPrefix = $prefix?$prefix:"position_";
    }
    
    public function setArrayTable($dataArray = NULL) {
  
         $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['position_id'])){
           $this->setId($x['position_id']); 
        }
        if(isset ($x['position'])){
           $this->setName($x['position']); 
        }
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }



        if(isset ($x['subholding_subname'])){
           $this->setSubholding_subname(strtoupper($x['subholding_subname'])); 
		}

        if(isset ($x['status_transfer'])){
           $this->setStatusTransfer($x['status_transfer']); 
        }
        if(isset ($x['action_process'])){
           $this->setActionProcess($x['action_process']); 
        }
        if(isset ($x['subholding_subname'])){
           $this->setSubholdingSubname($x['subholding_subname']); 
        }
        if(isset ($x['company_code'])){
           $this->setCompanyCode($x['company_code']); 
		}
        if(isset ($x['pt_id'])){
           $this->setPtId($x['pt_id']); 
        }
        if(isset ($x['pt_name'])){
           $this->setPtName($x['pt_name']); 
        }
        if(isset ($x['project_id'])){
           $this->setProjectId($x['project_id']); 
        }
        if(isset ($x['project_name'])){
           $this->setProjectName($x['project_name']); 
        }
        if(isset ($x['upload_check'])){
           $this->setUploadCheck($x['upload_check']); 
        }


        // if(isset ($x['subholding_subname'])){
        //    $this->setSubholding_subname(strtoupper($x['subholding_subname'])); 
        // }
       
        
        unset($x);
    }
    
    public function getArrayTable() {
     
        $x = array(
            'position_id'=>$this->getId(),
            'position'=>$this->getName(),

            'description'=>$this->getDescription(),

            'status_transfer'=>$this->getStatusTransfer(),
            'action_process'=>$this->getActionProcess(),
            'subholding_subname'=>$this->getSubholdingSubname(),
            'company_code'=>$this->getCompanyCode(),
            'pt_id'=>$this->getPtId(),
            'pt_name'=>$this->getPtName(),
            'project_id'=>$this->getProjectId(),
            'project_name'=>$this->getProjectName(),

            'subholding_subname'=>$this->getSubholding_subname(),
            'upload_check'=>$this->getUploadCheck()


            // 'description'=>$this->getDescription(),
            // 'status_transfer'=>$this->getStatusTransfer(),
            // 'subholding_subname'=>$this->getSubholdingSubname(),
            // 'company_code'=>$this->getCompanyCode()

        );
      
        return $x;
    }
    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }


    public function getSubholding_subname() {
        return $this->subholding_subname;
    }

    public function setSubholding_subname($subholding_subname) {
        $this->subholding_subname = $subholding_subname;
    }


    public function getStatusTransfer() {
        return $this->status_transfer;
    }

    public function setStatusTransfer($status_transfer) {
        $this->status_transfer = $status_transfer;
    }

    public function getActionProcess() {
        return $this->action_process;
    }

    public function setActionProcess($action_process) {
        $this->action_process = $action_process;
    }

    public function getSubholdingSubname() {
        return $this->subholding_subname;
    }

    public function setSubholdingSubname($subholding_subname) {
        $this->subholding_subname = $subholding_subname;
    }

    public function getCompanyCode() {
        return $this->company_code;
    }

    public function setCompanyCode($company_code) {
        $this->company_code = $company_code;
    }

    public function getPtId() {
        return $this->pt_id;
    }

    public function setPtId($pt_id) {
        $this->pt_id = $pt_id;
    }

    public function getPtName() {
        return $this->pt_name;
    }

    public function setPtName($pt_name) {
        $this->pt_name = $pt_name;
    }

    public function getProjectId() {
        return $this->project_id;
    }

    public function setProjectId($project_id) {
        $this->project_id = $project_id;
    }

    public function getProjectName() {
        return $this->project_name;
    }

    public function setProjectName($project_name) {
        $this->project_name = $project_name;
    }
    
    public function getUploadCheck() {
        return $this->upload_check;
    }

    public function setUploadCheck($upload_check) {
        $this->upload_check = $upload_check;
    }

    // public function getSubholding_subname() {
    //     return $this->subholding_subname;
    // }

    // public function setSubholding_subname($subholding_subname) {
    //     $this->subholding_subname = $subholding_subname;
    // }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }    
}

?>
