<?php

class Cashier_Models_Trialbalance extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $session;
    protected $datatb;

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
        $this->_querytb = new Cashier_Models_Query_Trialbalance();
    }

    function generateData() {
        $activedate = $this->_helperdata->rangeActiveYear();
        //print_r($activedate);
        //exit;
        $fromdate = date('Y-m-d', strtotime($this->datatb['fromdate']));
        $untildate = date('Y-m-d', strtotime($this->datatb['untildate']));
        
        $startdatedb = date('Y-m-d',  strtotime($activedate['yeardb'].'-01-01'));
        
        if($fromdate==$startdatedb){
             $startdate = '<= '.$this->istext($fromdate);
             $fromdate = ' > '.$this->istext($fromdate);
        }else{
             $startdate = '< '.$this->istext($fromdate);
             $fromdate = ' >= '.$this->istext($fromdate);
        }   
        
        $this->cleardata();
        $this->create_coa();
        $this->create_suboncoaonlevel_2();
        $result = $this->_querytb->create_calculatetotal($startdate,$fromdate,$untildate,$this->datatb['headertype'],$this->datatb['detailtype']);
        $return = array(
            "cluster"=>$result
        );
        
        return $return;        
    }
    function generateDatabyparam($param) {
        $this->datatb = $param;        
        $fromdate = date('Y-m-d', strtotime($this->datatb['fromdate']));
        $untildate = date('Y-m-d', strtotime($this->datatb['untildate']));
        
        $startdatedb = date('Y-m-d',  strtotime($param['yeardata'].'-01-01'));
        
        if($fromdate==$startdatedb){
             $startdate = '<= '.$this->istext($fromdate);
             $fromdate = ' > '.$this->istext($fromdate);
        }else{
             $startdate = '< '.$this->istext($fromdate);
             $fromdate = ' >= '.$this->istext($fromdate);
        }   
        
        $this->cleardata();
        $this->create_coa();
        $this->create_suboncoaonlevel_2();
        $result = $this->_querytb->create_calculatetotal($startdate,$fromdate,$untildate,$this->datatb['headertype'],$this->datatb['detailtype']);
     
        
        return $result;        
    }

    function cleardata() {
        $counter = $this->_querytb->count_tmp_rpt();
        if ($counter > 0) {
            $counterbyuser = $this->_querytb->count_tmp_rpt_byuser();
            if ($counter == $counterbyuser) {
                $this->_querytb->truncate_tmp();
            } else {
                $this->_querytb->delete_tmp();
            }
        } else {
            $this->_querytb->delete_tmp();
        }
    }

    function create_coa() {
        //print_r($this->datatb);
        //exit;
        $result = $this->_querytb->get_coa_from_sumtrh($this->datatb['fromcoa'], $this->datatb['untilcoa']);
        if (!empty($result)) {          
            foreach ($result as $row) {
                $resultcoa = $this->_model->getcoa($row['coa']);
                $countercoa = $resultcoa[0][0]['counterdata'];
                if ($countercoa > 0) {
                    $rowcoa = $resultcoa[1][0];
                    if ($this->datatb['headertype'] == 2) {
                        $coaname = $rowcoa['name'];
                    } else {
                        $coaname = str_repeat("-", $rowcoa['level']) . $rowcoa['name'];
                    }

                    if (empty($rowcoa['parent_code'])) {
                        $parent_code = $rowcoa['coa'];
                    } else {
                        $parent_code = $rowcoa['parent_code'];
                    }

                    $resultcoajournal = $this->_querytb->get_coa_from_journaldetail($rowcoa['coa'], $rowcoa['coa']);
                    if (empty($resultcoajournal)) {
                        $level = 1;
                    } else {
                        $level = 2;
                    }

                    $record = array(
                        "project_id" => $this->_project_id,
                        "pt_id" => $this->_pt_id,
                        "user_id" => $this->_user_id,
                        "reportdate" => $this->istext($this->_curdatetime),
                        "coa_id" => $rowcoa['coa_id'],
                        "coa" => $this->istext($rowcoa['coa']),
                        "flag" => $this->istext('H'),
                        "level" => $level,
                        "coatype" => $this->istext($rowcoa['type']),
                        "coalevel" => $rowcoa['level'],
                        "coaname" => $this->istext($coaname),
                        "parent_code" => $this->istext($parent_code),
                    );
                    $this->_querytb->insert_to_tmp($record);
                }
            }
        }
    }

    function create_suboncoaonlevel_2() {
        $result = $this->_querytb->get_coa_from_tmp();
        $fromdate = date('Y-m-d', strtotime($this->datatb['fromdate']));
        $untildate = date('Y-m-d', strtotime($this->datatb['untildate']));
        if (!empty($result)) {
            foreach ($result as $row) {
                $resultjournal = $this->_querytb->get_coa_from_journaldetail_byperiode($row['coa'], $fromdate, $untildate);
                if (!empty($resultjournal)) {
                    foreach ($resultjournal as $rowjournal) {                        
                        $record = array(
                            "project_id" => $this->_project_id,
                            "pt_id" => $this->_pt_id,
                            "user_id" => $this->_user_id,
                            "reportdate" => $this->istext($this->_curdatetime),
                            "flag" => $this->istext('I'),
                            "level" => 3,
                            "flagshowdata" => $rowjournal['flagshowdata'],
                            "coa_id" => $rowjournal['coa_id'],
                            "coa" => $this->istext($rowjournal['coa']),
                            "coaname" => $this->istext($rowjournal['name']),
                            "coatype" => $this->istext($rowjournal['coatype']),
                            "parent_code" => $this->istext($rowjournal['parent_code']),
                            "coalevel" => $rowjournal['level'],
                            "prefix_id" => $rowjournal['prefix_id'],
                            "prefix" => $this->istext($rowjournal['prefix']),
                            "voucher_date" => $this->istext($rowjournal['voucher_date']),
                            "voucher_no" => $this->istext($rowjournal['voucher_no']),
                            "trxtype" => $this->istext($rowjournal['type']),
                            "amount" => $rowjournal['amount'],
                            "amount_debet" => $rowjournal['amount_debet'],
                            "amount_credit" => $rowjournal['amount_credit'],
                            "description" =>$this->istext($rowjournal['keterangan']),
                        );
                         $this->_querytb->insert_to_tmp($record);
                    }
                }
            }
        }
    }
    
     
    

    public function istext($param) {
        return $this->_helperdata->textforquery($param);
    }

    function Create($param) {
        
        $project_id_rpt =  $this->_querytb->getProjectbypt($param['pt_id']);

        $_SESSION['Ciputra']['common']['pt_id_rpt'] = $param['pt_id'];
        $_SESSION['Ciputra']['common']['project_id_rpt'] = $project_id_rpt;

        $this->_pt_id = $param['pt_id'];

        $this->_project_id = $project_id_rpt;
        
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
                $this->datatb = $param;
                switch ($parameter) {
                    case 'defaultrange':
                        $counter = 0;
                        $result = $this->_helperdata->rangeActiveYear();
                        break;
                    case 'getcoabyid':
                        $counter = 0;
                        $result = $this->_model->getcoabyid($param['coa_id']);
                        break;
                    case 'generatereport':
                        $counter = 0;
                        $result = $this->generateData($param);
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

}
