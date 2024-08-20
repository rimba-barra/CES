<?php

class Gl_Models_Balancesheet_bak extends Zend_Db_Table_Abstract {

    function init() {
        date_default_timezone_set('Asia/Jakarta');    
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_helperdata = new Gl_Models_Function_Helperdata();
        $this->_model = new Gl_Models_Generalmodel_Modelsp();
        $this->_query = new Gl_Models_Generalmodel_Builtquery();
    } 
    function genReport($param){
       $tmp = explode("_", $this->session->getSelectedDbApp());
       $year = $tmp[1];

       $resultperiode = $this->_helperdata->getFromanduntildate($param);
       $fromdatedesc = date("d F Y",  strtotime($resultperiode["fromdate"]));
       $untildatedesc = date("d F Y",  strtotime($resultperiode["untildate"]));
       $startdate = date("Y-m-d",  strtotime($year.'-01-01'));
       
       $fromdate = date("Y-m-d",  strtotime($resultperiode["fromdate"]));
       $untildate = date("Y-m-d",  strtotime($resultperiode["untildate"]));  
       
       $lastfromdate = date("Y-m-d",  strtotime("-1 month", strtotime($fromdate)));
       $lastuntildate = date("Y-m-t",  strtotime("-1 month",strtotime($fromdate)));  
       
       $param['fromdate']=$fromdatedesc;
       $param['untildate']=$untildatedesc;
       
       $this->_query->rpt_balancesheet_generate($param);  
       $resultlastmonth = $this->_model->getsumnet($startdate, $lastuntildate);  
       $resultthismonth = $this->_model->getsumnet($startdate, $untildate); 
       $resultthismonthlastyear = $this->_model->getsumnet($startdate, $untildate); 
       
       
       foreach ($resultlastmonth as $row) {
          $this->_query->rpt_balancesheet_set_lastmonth_amount($row);
       }
       foreach ($resultthismonth as $row) {
          $this->_query->rpt_balancesheet_set_thismonth_amount($row);
       }
       foreach ($resultthismonthlastyear as $row) {
          $this->_query->rpt_balancesheet_set_lastyear_amount($row);
       }
             
        
       $this->_query->rpt_balancesheet_setcalculate();
       $this->_query->rpt_balancesheet_set_total($param);
       $this->_query->rpt_balancesheet_setformat($param);
       $this->_query->rpt_balancesheet_set_sumtotal();
       $this->_query->rpt_balancesheet();
       $this->_query->checkgetalldata();  
       return $param;  
    }
    
    function Create($param) {        
        $return['success'] = false;
        if (is_array($param) && count($param)) {
            try {
                $parameter = $param['hideparam'];
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
                         $result = $this->genReport($param); 
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
