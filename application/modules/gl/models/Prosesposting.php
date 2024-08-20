<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Gl_Models_Prosesposting extends Zend_Db_Table_Abstract {

    function init() {
        date_default_timezone_set('Asia/Jakarta');    
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_summary = new Gl_Models_Prosesposting_Summary();
        $this->_incomestatement = new Gl_Models_Prosesposting_Incomestatement();        
        $this->_helperdata = new Gl_Models_Function_Helperdata();
        $this->_model = new Gl_Models_Prosesposting_Modelsp();
    }
    
    function dataCreate($param = array()) {
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                switch ($param['hideparam']) {
                    case 'defaultrange':
                        $counter = 0;
                        $result = $this->_helperdata->rangeActiveYear();
                        break;
                    case 'lr_creator':
                        $counter = $this->newgenerationLRCreate($param);
                        $result = null;
                        break;
                    case 'lr_creator_thread':
                        //$counter = $this->newgenerationLRthreadCreate($param);
						$counter = $this->newgenerationLRCreate($param);
                        $result = null;
                        break;
                    case 'newgeneration':
                        $counter = $this->newgenerationCreate($param);
                        $result = null;
                        break;
                    case 'newgeneration_thread':
                        //$counter = $this->newgenerationthreadCreate($param);
						$counter = $this->newgenerationCreate($param);
                        $result = null;
                        break;
                    case 'update_flag_posting':
                        $counter = $this->newgenerationupdateflagpostingCreate($param);
                        $result = null;
                        break;
                    case 'update_flag_posting_thread':
                        //$counter = $this->newgenerationupdateflagpostingthreadCreate($param);
						$counter = $this->newgenerationupdateflagpostingCreate($param);
                        $result = null;
                        break;
                    default:
                        $this->_model->CreateTmpSetParent();
                        $counter = $this->defaultCreate($param);
                        $result = null;
                        break;
                }
                if ($param['hideparam'] == 'default') {
                    $count = $counter['counter'];
                    $msg = $counter['mesg'];
                } else {
                    $count = $counter;
                    $msg = '';
                }
                $return['parameter'] = $param['hideparam'];
                $return['counter'] = $count;
                $return['message'] = $msg;
                $return['success'] = true;
                $return['data'] = $result;
            } catch (Exception $e) {
                var_dump($e);
            }
        }
        return $return;
    }

    function createLoopMonth($countmonth, $param) {
        if ($countmonth == '1') {
            $this->createOneMonth($param);
        } else {
            $frommonth = date('m', strtotime($param['fromdate']));
            $untilmonth = date('m', strtotime($param['untildate']));
            for ($i = $frommonth; $i <= $untilmonth; $i++) {
                $this->createCustomeMonth($i);
            }
        }
    }

    function createOneMonth($param) {
        $this->_model->Destroydata($param['fromdate'], $param['untildate']);
        $processdate = $param['fromdate'];
        while ($processdate <= $param['untildate']) {
            $date = $processdate;
            $this->calculateCOAbyVoucherdate($date);
            $processdate = date('Y-m-d', strtotime("+1 day", strtotime($date)));
        }
        
      $this->incomestatement($param['fromdate'], $param['untildate']);
        
    }

    function createCustomeMonth($month) {
        $tmp = explode("_", $this->session->getSelectedDbApp());
        $year = $tmp[1];
        $fromdate = date('Y-m-01', strtotime($year . '-' . $month));
        $untildate = date('Y-m-t', strtotime($year . '-' . $month));
        $this->_model->Destroydata($fromdate, $untildate);
        $processdate = $fromdate;
        while ($processdate <= $untildate) {
            $date = $processdate;
            $this->calculateCOAbyVoucherdate($date);
            $processdate = date('Y-m-d', strtotime("+1 day", strtotime($date)));
        }
     $this->incomestatement($fromdate, $untildate);
    }

    function newgenerationLRCreate($param) {
        $checkdata = $this->_model->postingNewgenerationLR($param['month'], $param['year']);
        if(sizeof($checkdata)>0){
            $mesg = "Success";
            $flag =  1;
        }else{
            $mesg = "Failed";
            $flag =  0;
        }
        return array("mesg" => $mesg, "counter" => $flag);
    }
    
    function newgenerationLRthreadCreate($param) {
        return $this->_model->postingNewgenerationLRthread($param['month'], $param['year']);
    }

    function newgenerationCreate($param) {
        $checkdata = $this->_model->postingNewgeneration($param['fromdate'], $param['untildate']);
        if(sizeof($checkdata)>0){
            $mesg = "Success";
            $flag =  1;
        }else{
            $mesg = "Failed";
            $flag =  0;
        }
        return array("mesg" => $mesg, "counter" => $flag);
    }

    function newgenerationthreadCreate($param) {
        return $this->_model->postingNewgenerationthread($param['fromdate'], $param['untildate']);
    }

    function newgenerationupdateflagpostingCreate($param) {
        $checkdata = $this->_model->postingflagNewgeneration($param['fromdate'], $param['untildate']);
        if(sizeof($checkdata)>0){
            $mesg = "Success";
            $flag =  1;
        }else{
            $mesg = "Failed";
            $flag =  0;
        }
        return array("mesg" => $mesg, "counter" => $flag);
    }
    
    function newgenerationupdateflagpostingthreadCreate($param) {
        return $this->_model->postingflagNewgenerationthread($param['fromdate'], $param['untildate']);
    }

    function defaultCreate($param) {
        $checktemplate = $this->_model->checkTemplate();
        $checkdata = $this->_model->checkData($param['fromdate'], $param['untildate']);
        $countertemplate = $checktemplate[0][0]['counterdata'];
        $counter = $checkdata[0][0]['counterdata'];

        if ($countertemplate > 0 and $counter > 0) {
            $countmonth = $this->_helperdata->countMonth($param['fromdate'], $param['untildate']);
            $this->createLoopMonth($countmonth, $param);
            $mesg = "Setup Income Statement Report and data transaction exist";
            $flag = 1;
        } else if ($countertemplate == 0 and $counter > 0) {
            $mesg = "Setup Income Statement Report still empty,please generate your report income statement first";
            $flag = 0;
        } else if ($countertemplate > 0 and $counter == 0) {
            $mesg = "No data on transaction in this period";
            $flag = 0;
        } else if ($countertemplate == 0 and $counter == 0) {
            $mesg = "Setup Income Statement Report still empty,please generate your report income statement first and no data on transaction in this period";
            $flag = 0;
        }
        return array("mesg" => $mesg, "counter" => $flag);
    }
     //proses transaksi
    function calculateCOAbyVoucherdate($date) {
        $this->_summary->gerenateth_summary($date);
    }    
    
    function incomestatement($fromdate,$untildate){   
       $this->_incomestatement->generatetemplate($fromdate,$untildate);
        
    }
    
}
