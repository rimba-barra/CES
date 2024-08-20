<?php

class Hrd_Models_Performancemanagement_Approvalmatrix extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {

    public $approvalmatrix_id;
    public $package_name;
    public $pmdocument_id;
    public $employee_id;
    public $employee_nik;
    public $employee_name;
    public $department_id;
    public $department;
    public $is_dinilai;
    public $project_id;
    public $pt_id;
    public $project_name;
    public $pt_name;

    //added by anas 15012024
    public $used_pmcontract;

    public function __construct() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        parent::__construct();
        $this->embedPrefix = "approvalmatrix_";
    }

    public function getProjectId() {
        return $this->session->getCurrentProjectId();
    }

    public function getPtId() {
        return $this->session->getCurrentPtId();
    }

    public function getGroupid() {
        return $this->session->getCurrentGroupId();
    }

    public function getUserlogin() {
        return $this->session->getUserId();
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;


        if (isset($x['employee_id'])) {
            $this->setId($x['employee_id']);
        }
        if (isset($x['approvalmatrix_id'])) {
            $this->approvalmatrix_id = $x['approvalmatrix_id'];
        }
        if (isset($x['pmdocument_id'])) {
            $this->pmdocument_id = $x['pmdocument_id'];
        }
        if (isset($x['package_name'])) {
            $this->package_name = $x['package_name'];
        }

        if (isset($x['employee_nik'])) {
            $this->employee_nik = $x['employee_nik'];
        }
        if (isset($x['employee_name'])) {
            $this->employee_name = $x['employee_name'];
        }
        if (isset($x['department_id'])) {
            $this->department_id = $x['department_id'];
        }
        if (isset($x['department'])) {
            $this->department = $x['department'];
        }
        if (isset($x['is_dinilai'])) {
            $this->is_dinilai = $x['is_dinilai'];
        }
        if (isset($x['project_id'])) {
            $this->project_id = $x['project_id'];
        }
        if (isset($x['pt_id'])) {
            $this->pt_id = $x['pt_id'];
        }
        if (isset($x['project_name'])) {
            $this->project_name = $x['project_name'];
        }
        if (isset($x['pt_name'])) {
            $this->pt_name = $x['pt_name'];
        }

        //added by anas 15012024
        if (isset($x['used_pmcontract'])) {
            $this->used_pmcontract = $x['used_pmcontract'];
        }

        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            'employee_id' => $this->getId(),
            'approvalmatrix_id' => $this->approvalmatrix_id,
            'pmdocument_id' => $this->pmdocument_id,
            'package_name' => $this->package_name,
            'employee_nik' => $this->employee_nik,
            'employee_name' => $this->employee_name,
            'department_id' => $this->department_id,
            'department' => $this->department,
            'is_dinilai' => $this->is_dinilai,
            'project_id' => $this->project_id,
            'pt_id' => $this->pt_id,
            'project_name' => $this->project_name,
            'pt_name' => $this->pt_name

            //added by anas 15012024
            , 'used_pmcontract' => $this->used_pmcontract
        );

        return $x;
    }

    /* public function getProject() {
      if(!$this->project){
      $this->project = new Box_Models_Master_Project();
      }
      return $this->project;
      }

      public function getPt() {
      if(!$this->pt){
      $this->pt = new Box_Models_Master_Pt();
      }
      return $this->pt;
      } */

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

}
