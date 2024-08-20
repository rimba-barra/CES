<?php

class Hrd_Models_Master_Packagemanagement_Packagemanagement extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora, Box_Delien_DelimiterCandidate, Box_Arried {
    /* START VARIABLE HEADER */

    public $project;
    public $project_id;
    public $project_name;
    public $pt;
    public $pt_id;
    public $pt_name;
    public $group_id_login;
    public $group_id_globalparam;
    public $header_id;
    public $detail_id;
    public $code;
    public $package_name;
    public $is_approve;
    public $is_reject;
    /* END VARIABLE HEADER */

    /* START VARIABLE DETAIL */
    private $detail;
    private $DCResult;
    public $jenisdokumen_id;
    public $jenisdokumen_code;
    public $jenisdokumen_desc;
    public $bobot;

    /* END VARIABLE DETAIL */

    public function __construct() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        parent::__construct();
        $this->embedPrefix = "packagedocument_";
        $this->detail = array();
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

    public function setGroupidinglobalparam() {
        $dao = new Hrd_Models_Master_GeneralParameterDao();
		
        $result = $dao->getParamsByProjectPtWOPLB('packagemanagement', $this->getProjectId(), $this->getPtId());
        if (empty($result[1])) {
            $this->group_id_globalparam = 'notexist';
        } else {
            $data = $result[1][0];
            $this->group_id_globalparam = intval($data['value']);
        }
    }

    public function getGroupidinglobalparam() {
        return $this->group_id_globalparam;
    }
    
    public function getUserlogin() {
         return $this->session->getUserId();
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        $this->setId(isset($x['pmdocument_id']) ? $x['pmdocument_id'] : 0);
        $this->header_id = isset($x['pmdocument_id']) ? $x['pmdocument_id'] : 0;
        $this->detail_id = isset($x['pmdocument_detail_id']) ? $x['pmdocument_detail_id'] : 0;
        $this->jenisdokumen_id = isset($x['jenisdocument_id']) ? $x['jenisdocument_id'] : 0;
        $this->bobot = isset($x['bobot']) ? $x['bobot'] : 0;
        $this->code = isset($x['code']) ? $x['code'] : '';
        $this->package_name = isset($x['package_name']) ? $x['package_name'] : '';       
        if(isset($x['is_reject']) && $x['is_reject']){
            $this->is_reject ='yes';
        }else{
            $this->is_reject ='no';
        }        
        if(isset($x['is_approve']) && $x['is_approve']){
            $this->is_approve ='yes';
        }else{
            $this->is_approve ='no';
        }        
        $this->group_id_globalparam = isset($x['group_id_globalparam']) ? $x['group_id_globalparam'] : 0;
        $this->setGroupidinglobalparam();
        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            'pmdocument_id' => $this->header_id,
            'pmdocument_detail_id' => $this->detail_id,
            'project_id' => $this->session->getCurrentProjectId(),
            'pt_id' => $this->session->getCurrentPtId(),
            'jenisdocument_id' => $this->jenisdokumen_id,
            'code' => $this->code,
            'package_name' => $this->package_name,
            'bobot' => $this->bobot,
            'is_approve' => $this->is_approve,
            'is_reject' => $this->is_reject,
            'group_id_login' => $this->session->getCurrentGroupId(),
            'group_id_globalparam' => $this->getGroupidinglobalparam(),
        );

        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

    public function addDetail(Hrd_Models_Master_Packagemanagement_Packagemanagementdetail $param) {
        $this->detail[] = $param;
    }

    public function getDCArray() {
        return $this->detail;
    }

    public function getDCResult() {
        return $this->DCResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->DCResult = $delimiteredArray;
    }

    public function getDetail($index = -1) {
        if ($index >= 0) {
            return $this->detail[$index];
        } else {
            return $this->detail;
        }
    }

    public function getArray() {
        return $this->getArrayTable();
    }

    public function getDatefields() {
        return array();
    }

}

?>