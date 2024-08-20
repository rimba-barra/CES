<?php

class Gl_Models_Offset extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $session;
    protected $dataof;

    function init() {
        date_default_timezone_set('Asia/Jakarta');
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_project_id = $this->session->getCurrentProjectId();
        $this->_pt_id = $this->session->getCurrentPtId();
        $this->_user_id = $this->session->getUserId();
        $this->_curdate = date('Y-m-d');
        $this->_curdatetime = date('Y-m-d H:i:s');

        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_helperdata = new Gl_Models_Function_Helperdata();
        $this->_model = new Gl_Models_Generalmodel_Modelsp();
        $this->_queryof = new Gl_Models_Query_Offset();
    }

    public function txt($param) {
        return $this->_helperdata->textforquery($param);
    }

    function generateData() {
         $tmp = explode("_", $this->session->getSelectedDbApp());
         $year = $tmp[1];
         $arraydate = array("month"=>$this->dataof['month'],"year"=>$year); 
         $resultdate = $this->_helperdata->getFromanduntildate($arraydate);         
         $filterdebet= implode(',', $this->dataof['datadebet']);
         $filtercredit= implode(',', $this->dataof['datacredit']);
         $periode = date("F",  strtotime(date('m',  strtotime(1)))).' to '.date("F", strtotime($resultdate['fromdate']));
         
        
        $d1 = array();
        foreach ($this->dataof['datadebet'] as $r1) {
            $d1[] = "''" . $r1 . "''";
        }
        $d2 = array();
        foreach ($this->dataof['datacredit'] as $r2) {
            $d2[] = "''" . $r2 . "''";
        }
        $arraydebet = implode(",", $d1);
        $arraycredit = implode(",", $d2);
        $this->dataof['datadebet'] = $arraydebet;
        $this->dataof['datacredit'] = $arraycredit;
        $this->_queryof->truncatedata();
        $this->_queryof->createdata($this->dataof);
        $this->createdatadebet();
        $this->createdatacredit();
        //start set summary subgl
        $this->setsumsubgl();      
        //end set summary subgl        
        //start set summary kelsub
        $this->setsumkelsub();      
        //end set summary kelsub        
        //start set summary kelsub
        $this->setsumaccount();           
        //end set summary kelsub       
       //$this->generate_staticdata();
        
        
        
        
       $return = array(
           "project_id"=>$this->_project_id,
           "pt_id"=>$this->_pt_id,
           "user_id"=>$this->_user_id,
           "periode"=>$periode,
           "filterdebet"=>$filterdebet,
           "filtercredit"=>$filtercredit
        );
       
       return $return;       
        
    }
    
    function generate_staticdata(){        
        $resdebet1 = $this->_model->getdataoffset_item('D',1);
        $resdebet2 = $this->_model->getdataoffset_item('D',2);
        $resdebet3 = $this->_model->getdataoffset_item('D',3);
        $resdebet4 = $this->_model->getdataoffset_item('D',4);
        
        $rescredit1 = $this->_model->getdataoffset_item('C',1);
        $rescredit2 = $this->_model->getdataoffset_item('C',2);
        $rescredit3 = $this->_model->getdataoffset_item('C',3);
        $rescredit4 = $this->_model->getdataoffset_item('C',4);     
        
       
         $arr_tmp = array();   
         $arr_all = array();
        
        if(!empty($resdebet1)){
            foreach ($resdebet1 as $rowd1) {
                $arr_tmp['account1'] = $rowd1['note'];
                $arr_tmp['amount1'] = $rowd1['amountdata'];
                $arr_all[] =$arr_tmp;
            }           
        }  
        
        if(!empty($resdebet2)){
            foreach ($resdebet2 as $rowd2) {
                $arr_tmp['account2'] = $rowd2['note'];
                $arr_tmp['amount2'] = $rowd2['amountdata'];
                $arr_all[] =$arr_tmp;
            }           
        }        
        //print_r($arr_all);
       
        
        
        
    }
    
    
  
    function createdatadebet() {
        $resultaccount = $this->_queryof->getdataforgriddebet('account');
        $resultkelsub = $this->_queryof->getdataforgriddebet('kelsub');
        $resultsubgl = $this->_queryof->getdataforgriddebet('subgl');
        $resultdetail = $this->_queryof->getdataforgriddebet('subdetail');
        $this->generate_account($resultaccount);
        $this->generate_kelsub($resultkelsub);
        $this->generate_subgl($resultsubgl);
        $this->generate_subdetail($resultdetail);
    }

    function createdatacredit() {
        $resultaccount = $this->_queryof->getdataforgridcredit('account');
        $resultkelsub = $this->_queryof->getdataforgridcredit('kelsub');
        $resultsubgl = $this->_queryof->getdataforgridcredit('subgl');
        $resultdetail = $this->_queryof->getdataforgridcredit('subdetail');
        $this->generate_account($resultaccount);
        $this->generate_kelsub($resultkelsub);
        $this->generate_subgl($resultsubgl);
        $this->generate_subdetail($resultdetail);
    }

    function generate_account($array) {
        if (!empty($array)) {
            $counter = 0;
            foreach ($array as $row) {
                $counter++;
                $record = array(
                    "user_id" => $this->_user_id,
                    "reportdate" => $this->txt($this->_curdate),
                    "project_id" => $this->_project_id,
                    "pt_id" => $this->_pt_id,
                    "coa_id" => $row['coa_id'],
                    "position" => $row['position'],
                    "accdesc" => $this->txt($row['accdesc']),
                    "accdate" => $this->txt($row['accdate']),
                    "coa" => $this->txt($row['coa']),
                    "parent_coa" => $this->txt($row['parent_coa']),
                    "coaname" => $this->txt($row['coaname']),
                    "coatype" => $this->txt($row['coatype']),
                    "flaggrid" => $this->txt($row['flaggrid']),
                    "flaggridposition" => $counter,
                    "flagstatus" => $this->txt($row['flagstatus'])
                );
                $this->_queryof->insert_to_tmp($record);
            }
        }
    }

    function generate_kelsub($array) {
        if (!empty($array)) {
            foreach ($array as $row) {
                $rowrpt = $this->_queryof->get_rptbycoaid($row['coa_id']);
                $flaggridposition = $rowrpt['flaggridposition'];                
                $record = array(
                    "user_id" => $this->_user_id,
                    "reportdate" => $this->txt($this->_curdate),
                    "project_id" => $this->_project_id,
                    "pt_id" => $this->_pt_id,
                    "coa_id" => $row['coa_id'],
                    "kelsub_id" => $row['kelsub_id'],
                    "position" => $row['position'],
                    "accdesc" => $this->txt($row['accdesc']),
                    "accdate" => $this->txt($row['accdate']),
                    "coa" => $this->txt($row['coa']),
                    "parent_coa" => $this->txt($row['parent_coa']),
                    "coaname" => $this->txt($row['coaname']),
                    "coatype" => $this->txt($row['coatype']),
                    "kelsub" => $this->txt($row['kelsub']),
                    "flaggrid" => $this->txt($row['flaggrid']),
                    "flaggridposition" => $flaggridposition,
                    "flagstatus" => $this->txt($row['flagstatus'])
                );
                $this->_queryof->insert_to_tmp($record);
            }
        }
    }

    function generate_subgl($array) {
        if (!empty($array)) {
            foreach ($array as $row) {
                $rowrpt = $this->_queryof->get_rptbycoaid($row['coa_id']);
                $flaggridposition = $rowrpt['flaggridposition'];
                $record = array(
                    "user_id" => $this->_user_id,
                    "reportdate" => $this->txt($this->_curdate),
                    "project_id" => $this->_project_id,
                    "pt_id" => $this->_pt_id,
                    "coa_id" => $row['coa_id'],
                    "kelsub_id" => $row['kelsub_id'],
                    "subgl_id" => $row['subgl_id'],
                    "position" => $row['position'],
                    "accdesc" => $this->txt($row['accdesc']),
                    "accdate" => $this->txt($row['accdate']),
                    "coa" => $this->txt($row['coa']),
                    "parent_coa" => $this->txt($row['parent_coa']),
                    "coaname" => $this->txt($row['coaname']),
                    "coatype" => $this->txt($row['coatype']),
                    "kelsub" => $this->txt($row['kelsub']),
                    "code" => $this->txt($row['code']),
                    "flaggrid" => $this->txt($row['flaggrid']),
                    "flaggridposition" => $flaggridposition,
                    "flagstatus" => $this->txt($row['flagstatus'])
                );
                
                $this->_queryof->insert_to_tmp($record);
            }
        }
    }

    function generate_subdetail($array) {
        if (!empty($array)) {
            foreach ($array as $row) {
                $rowrpt = $this->_queryof->get_rptbycoaid($row['coa_id']);
                $flaggridposition = $rowrpt['flaggridposition'];
                $record = array(
                    "user_id" => $this->_user_id,
                    "reportdate" => $this->txt($this->_curdate),
                    "project_id" => $this->_project_id,
                    "pt_id" => $this->_pt_id,
                    "coa_id" => $row['coa_id'],
                    "kelsub_id" => $row['kelsub_id'],
                    "subgl_id" => $row['subgl_id'],
                    "position" => $row['position'],
                    "accdesc" => $this->txt($row['accdesc']),
                    "accdate" => $this->txt($row['accdate']),
                    "coa" => $this->txt($row['coa']),
                    "parent_coa" => $this->txt($row['parent_coa']),
                    "coaname" => $this->txt($row['coaname']),
                    "coatype" => $this->txt($row['coatype']),
                    "trxtype" => $this->txt($row['trxtype']),
                    "kelsub" => $this->txt($row['kelsub']),
                    "code" => $this->txt($row['code']),
                    "description" => $this->txt($row['subdesc']),
                    "amount" => $row['amount'],
                    "flaggrid" => $this->txt($row['flaggrid']),
                    "flaggridposition" => $flaggridposition,
                    "flagstatus" => $this->txt($row['flagstatus'])
                );
                $this->_queryof->insert_to_tmp($record);
            }
        }
    }

    function setsumsubgl() {
        $result = $this->_queryof->set_totalsub();
        if (!empty($result)) {
            foreach ($result as $row) {
                $record = array(
                    "amounttotalsub" => $row['totalsub']
                );
                $this->_queryof->update_for_amounttotalsub($row['flaggrid'], $row['coa_id'], $row['kelsub_id'], $row['subgl_id'], $record);
            }
        $this->createtotalsubgrid('D');
        $this->createtotalsubgrid('C');
        }
    }

    function createtotalsubgrid($flag) {
        $result = $this->_queryof->set_totalsubgrid($flag);
        if (!empty($result)) {
            foreach ($result as $row) {
                $record = array("amounttotal_subgrid" => $row['totalsubgrid']);
                $this->_queryof->update_for_amounttotalsubgrid($row['flaggrid'], $row['kelsub_id'], $row['subgl_id'], $record);
            }
        }
    }

    function setsumkelsub() {
        $result = $this->_queryof->set_totalkelsub();
        if (!empty($result)) {
            foreach ($result as $row) {
                $record = array(
                    "amounttotal_kelsub" => $row['totalkelsub']
                );
                $this->_queryof->update_for_amounttotal_kelsub($row['flaggrid'], $row['coa_id'], $row['kelsub_id'], $record);
            }
              $this->createtotalkelsubgrid('D');
              $this->createtotalkelsubgrid('C');
        }
    }

    function createtotalkelsubgrid($flag) {
        $result = $this->_queryof->set_totalkelsubgrid($flag);
        if (!empty($result)) {
            foreach ($result as $row) {
                $record = array("amounttotal_kelsubgrid" => $row['totalkelsubgrid']);
                $this->_queryof->update_for_amounttotal_kelsubgrid($row['flaggrid'], $row['kelsub_id'], $record);
            }
        }
    }
    
     function setsumaccount() {
        $result = $this->_queryof->set_totalaccount();
        if (!empty($result)) {
            foreach ($result as $row) {
                $record = array(
                    "amounttotal_account" => $row['totalaccount']
                );
                $this->_queryof->update_for_amounttotal_account($row['flaggrid'], $row['coa_id'], $record);
            }
            $this->createtotalaccountgrid('D');
            $this->createtotalaccountgrid('C');  
        }
    }
    
  function createtotalaccountgrid($flag) {
        $result = $this->_queryof->set_totalaccountgrid($flag);
        if (!empty($result)) {
            foreach ($result as $row) {
                $record = array("amounttotal_accountgrid" => $row['totalaccountgrid']);
                $this->_queryof->update_for_amounttotal_accountgrid($row['flaggrid'], $record);
            }
        }
    }

    function offsetCreate($param) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                $this->dataof = $param;
                switch ($parameter) {
                    case 'defaultrange':
                        $counter = 0;
                        $result = $this->_helperdata->rangeActiveYear();
                        break;
                    case 'generatereport':
                        $counter = 0;
                        $result = $this->generateData();
                        break;
                    default:
                        $counter = 0;
                        $result = null;
                        break;
                }
                if ($param['hideparam'] == 'default') {
                    $count = 0;
                    $msg = " ";
                } else {
                    $count = $counter;
                    $msg = '';
                }
                $return['parameter'] = $param['hideparam'];
                $return['counter'] = $count;
                $return['message'] = $msg;
                $return['success'] = true;
                $return['data'] = $result;
            } catch (Exception $ex) {
                
            }
        }
        return $return;
    }

    function generateDatax() {
        $this->dataof['project_id'] = $this->_project_id;
        $this->dataof['pt_id'] = $this->_pt_id;
        $arraydebet = explode(',', $this->dataof['datadebet']);
        $arraycredit = explode(',', $this->dataof['datacredit']);
        $debet = array();
        $i = $j = 0;
        foreach ($arraydebet as $rowdebet) {
            $i++;
            $debet['coa'][] = $rowdebet;
        }

        $credit = array();
        foreach ($arraycredit as $rowcredit) {
            $credit['coa'][] = $rowcredit;
        }

        $this->dataof['datadebet'] = $debet;
        $this->dataof['datacredit'] = $credit;




        print_r($this->dataof);
        $xml = $this->_model->array_to_xml($this->dataof);
        $data = '|^' . $xml . '|^';
        $result = $this->_model->offset_read($data);
    }

}
