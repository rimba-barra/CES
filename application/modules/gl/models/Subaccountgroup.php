<?php

class Gl_Models_Subaccountgroup extends Zend_Db_Table_Abstract {

    protected $_schema; //= 'gl';
    protected $_name = 'm_kelsub';
    protected $session;

    function init() {
        date_default_timezone_set('Asia/Jakarta');    
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_query = new Gl_Models_Query_Subaccountgroup();
    }

    function subaccountgroupRead($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                if ($parameter == 'project') {
                    $result = $this->projectRead();
                    $arraydata = $result[1];
                } else if ($parameter == 'pt') {
                    $result = $this->ptRead();
                    $arraydata = $result[1];
                }else if($parameter=='change_project_pt'){                    
                    $result = $this->changeReadProjectPt($param);
                    $arraydata = $result[1];
                }else if($parameter=='filterdatarange'){                    
                    $result = $this->filterbyRange($param);                     
                    $arraydata = $result[1];
                }else if($parameter=='kelsubid_in'){                    
                    $result = $this->Kelsubid_in($param);                     
                    $arraydata = $result[1];
                }else if($parameter=='kelsubid_inpt'){                    
                    $result = $this->Kelsubid_in($param);                     
                    $arraydata = $result[1];
                }else if($parameter=='filtersubaccgroup'){                    
                    $result = $this->filtersubaccgroup($param);                     
                    $arraydata = $result[1];
                }else if($parameter=='checkcoaexists') {
                    $result = $this->checkcoaexists($param);
                    $arraydata = array();
                }else if($parameter=='checkcoavalid') {
                    $result = $this->checkcoavalid($param);
                    $arraydata = array();
                }else if($parameter=='defaultbyprojectpt'){
                    $result = $this->defaultProjectPtRead($param);
                    $arraydata = $result[1];
                }else if($parameter=='filtersubbypt'){                    
                    $result = $this->showkelsubid($param);
                    $arraydata = $result[1];
                }else{
                    $result = $this->defaultRead($param);
                    $arraydata = $result[1];
                }
                
                $return['total'] = $result[0][0]['RECORD_TOTAL'];
                $return['data'] = $arraydata;
                $return['success'] = true;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }
    
    function filterbyRange($param){
        $data = array(
                $this->session->getCurrentProjectId(),
                $this->session->getCurrentPtId(),
                $param['fromkelsub'],
                $param['untilkelsub']
        );
        return $this->execSP3('sp_subaccountgroup_getkelsubbyrange', $data);
    }
    function Kelsubid_in($param){
        $result = $this->_query->getkelsub_in($param['kelsubid_in'],$param['pt_id']);
        return $result;
    }
//added by iqbal 9 july 2019
    function filtersubaccgroup($param){
        $result = $this->_query->getfilteraccgroup($param);
        return $result;
    }
//end added
    function projectRead() {
        //15 adalah group module gl
        $data = array($this->session->getUserId(), 15);
        //return $this->execSP3('sp_project_read', $param);
        return $this->execSP3('sp_projectbylogin_read', $data);
    }

    function ptRead() {
        //15 adalah group module gl
        $data = array($this->session->getUserId(), 15);
        //return $this->execSP3('sp_pt_read', $param);
        return $this->execSP3('sp_ptbylogin_read', $data);
    }
    
    
    function changeReadProjectPt($param){
        $data = array(           
            $param['project_id'],
            $param['pt_id']  
        );
        return $this->execSP3('sp_subaccountgroup_readbyproject_pt', $data);
    }
    function getkelsub($param){
        $data = array(          
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['kelsub']
        );
        return $this->execSP3('sp_subaccountgroup_getkelsub', $data);
        
    }    
    function defaultRead($param) {

        if(!isset($param['projectpt_id'])){
            $param['projectpt_id'] = 0;
        }
        
        $data = array(
            1,
            $param['kelsub_id'],
            $this->session->getCurrentProjectId(),
            $this->session->getCurrentPtId(),
            $param['kelsub'],
            $param['description'],
            $param['start'],
            $param['limit']
                //Rizal 31 Mei 2019
                ,
            $param['projectpt_id']
                //
        );
        return $this->execSP3('sp_subaccountgroup_read', $data);
    }

     function defaultProjectPtRead($param) {

        if(!isset($param['projectpt_id'])){
            $param['projectpt_id'] = 0;
        }
        
        $data = array(
            1,
            $param['kelsub_id'],
            $param['project_id'],
            $param['pt_id'],
            $param['kelsub'],
            $param['description'],
            $param['start'],
            $param['limit']
                //Rizal 31 Mei 2019
                ,
            $param['projectpt_id']
                //
        );
        return $this->execSP3('sp_subaccountgroup_readV3', $data);
    }

    function subaccountgroupCreate($param = array()) { 
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];

                if ($parameter == 'checkexist') {
                   $result = $this->checkExist($param);
                   $tmp_total =0;
                }else if($parameter == 'importdata'){
                    $result = $this->importData($param);
                    $tmp_total =0;
                }else if ($parameter == 'getkelsub') {
                    $result = $this->getkelsub($param);
                    $tmp_total = 0;
                }else if($parameter == 'checkdatabyptproject'){
                    $result = $this->checkDatabyPtProject($param);
                    $tmp_total = $result[0][0]['RECORD_TOTAL'];
                }else if($parameter == 'copycoa'){
                    $result = $this->processcopycoa($param);
                    $tmp_total = $result[0][0]['total_row'];
                }else {
                    $result = $this->defaultCreate($param);
                    $tmp_total =1;
                }
                //$return['total'] = $result[0];
                $return['total'] = $tmp_total;
                $return['success'] = $result[0]>0;
                $return['parameter'] = $parameter;
                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = $tmp_total;
                    $return['data'] = !empty($result[0][0]) ? $result[0][0] : NULL;
                }else{
                    $return['msg'] = $result[3][0]['msg'];
                    $return['success'] = true;
                    $return['total'] = $tmp_total;
                    $return['data'] = $result[0];


                }
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }
    
    function importData($param) {
        $data = array(
            $param['project_id'],
            $param['pt_id']
        );        
        $result = $this->execSP3('sp_subaccountgroup_import', $data);
        foreach ($result[0] as $row) {                       
            $dataimport = array(
                $this->session->getCurrentProjectId(),
                $this->session->getCurrentPtId(),
                $row["kelsub"],
                $row["description"],
                $this->session->getUserId(),
                '1'
            );
            $this->execSP3('sp_subaccountgroup_import_insert', $dataimport);
        }
        return 1;
    }
    
    function checkDatabyPtProject($param){
        $data = array(
            $param['project_id'],
            $param['pt_id']
        );
        return $this->execSP3('sp_subaccountgroup_checkdata', $data);
        
    }   
    
    function checkExist($param){         
                    $data = array(
                        $this->session->getCurrentProjectId(),
                        $this->session->getCurrentPtId(),
                        $param['kelsub']
                            //Rizal 31 Mei 2019
                            ,
                        $param['projectpt_id']
                            //
                    );
       return $this->execSP3('sp_subaccountgroup_checkexist', $data);
    }
    
    function defaultCreate($param){
                    $data = array(
                        $this->session->getCurrentProjectId(),
                        $this->session->getCurrentPtId(),
                        $param['kelsub'],
                        $param['description'],
                        $this->session->getUserId(),
                        '1'
                            //Rizal 31 Mei 2019
                            ,
                        $param['projectpt_id']
                            //
                    );
          $result =  $this->execSP3('sp_subaccountgroup_create', $data);
          return $result;
         
         
    }
    

    function subaccountgroupUpdate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $param['kelsub_id'],
                    $this->session->getCurrentProjectId(),
                    $this->session->getCurrentPtId(),
                    $param['kelsub'],
                    $param['description'],
                    $this->session->getUserId(),
                    '1'
                            //Rizal 31 Mei 2019
                            ,
                        $param['projectpt_id']
                            //
                );
                $result = $this->execSP3('sp_subaccountgroup_update', $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;

                if ($return['total'] != 1) {
                    $return['msg'] = !empty($result[0][0]['msg']) ? $result[0][0]['msg'] : NULL;
                    $return['success'] = false;
                    $return['total'] = 0;
                 }else{
                    $return['msg'] = $result[3][0]['msg'];
                    $return['success'] = true;
                    $return['total'] = $result[0];
                    $return['data'] = $result[0];


                }
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function subaccountgroupDelete($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            $key_name = 'kelsub_id';
            $param[$key_name] = isset($param[$key_name]) ? $param[$key_name] : '';
            foreach ($param as $key => $val) {
                if (is_array($val)) {
                    $param[$key_name] .= $val[$key_name] . ',';
                }
            }
            $param[$key_name] = preg_replace('/(,)$/', '', $param[$key_name]);
            try {
                $data = array(
                    $this->session->getUserId()
                );
                $result = $this->execSP3('sp_subaccountgroup_destroy', $param[$key_name], $data);
                $return['total'] = $result[0];
                $return['success'] = $result[0] > 0;
            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function checkcoaexists($param) {

        $this->_schema = "cashier.dbo";
        $result = $this->execSP3('sp_validator_read', $param['hideparam'], '', $param['project_id'], $param['pt_id'], '', '', '', '');
        return $result;
    }


    function checkcoavalid($param) {

        $this->_schema = "cashier.dbo";
        $result = $this->execSP3('sp_validator_read', $param['hideparam'], '', $param['project_id'], $param['pt_id'], '', '', '', '');
        return $result;
    }

    function processcopycoa($param) {

        $result = $this->execSP3('sp_subaccountgroup_copy', $param['from_project'], $param['from_pt'], $param['to_project'], $param['to_pt'], $param['copy_method'], $param['copy_sub_group'], $param['coa_source'], $this->session->getUserId());
        return $result;
    }

    function subaccountgroupMerge($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $data = array(
                    $param['hideparam'],
                    $param['project_id'],
                    $param['pt_id'],
                    $param['kelsub_deleted'],
                    $param['kelsub_keep'],
                    $this->session->getUserId()
                );
                
                $this->_schema = "gl_2018.dbo";
                $result = $this->execSP3('sp_subaccountgroup_merge', $data);
                $valid = $result[5][0]['VALIDDATA'];
                $counter = $result[6][0]['RECORD_TOTAL'];
                $message = $result[7][0]['MSG'];
                $data = null;

                $return = array(
                    "parameter" => $param['hideparam'],
                    "msg" => $message,
                    "success" => $valid,
                    "data" => $data,
                    "total" => $counter,
                );

            } catch (Exception $e) {
                
            }
        }
        return $return;
    }

    function showkelsubid($param) {

        $this->_schema = "gl_2018.dbo";
        $result = $this->execSP3('sp_kelsubfilter', 'READ',$param['project_id'], $param['pt_id']);
        return $result;
    }



}

?>