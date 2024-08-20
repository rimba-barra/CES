<?php

class Gl_Models_Prosesposting_Incomestatement extends Zend_Db_Table_Abstract {

    protected $_schema;
    protected $_name = 'th_summary';
    protected $session;

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->_schema = $this->session->getSelectedDbApp() . '.dbo';
        $this->_modelcoa = new Gl_Models_Coa();
        $this->_model = new Gl_Models_Prosesposting_Modelsp();
        $this->_report = new Gl_Models_Prosesposting_Reportdata();
        $this->_lr = new Gl_Models_Prosesposting_Createlr();
        $this->_helperdata = new Gl_Models_Function_Helperdata();
    }

    function generatetemplate($fromdate, $untildate) {
       $month =date('m',  strtotime($fromdate)); 
       $year =date('Y',  strtotime($fromdate)); 
       $param= array(
            "month"=>$month,
            "year"=>$year,
            "report"=>'L',
            "level"=>3,
        );  
        $result = $this->_report->genReport($param);
        $this->calculatefromsetup($result,$untildate);        
    }

    

    function calculatefromsetup($result,$enddate){
        $monthyear = date("F/Y",  strtotime($enddate));
        $rowcoalr = $this->_model->getcoarl();
        //die(print_r($rowcoalr));
         //Profitloss     
        $profitloss_coa_from = $rowcoalr['profitloss_coa_from'];
        $profitloss_coa_until = $rowcoalr['profitloss_coa_until'];    
        $sql =$result['cluster']." where flag=''G'' AND calculate_thismonth not in(0) order by rpt_id DESC";
        //echo $sql;
        $rowdata = $this->_model->customefromquery($sql);
        $netincomecomprehensive =0;
        if (!empty($rowdata[0])) {
            $rownet = $rowdata[0][0];
            $netincomecomprehensive = $rownet['calculate_thismonth'];
        }

        $absolutenet = abs($netincomecomprehensive);       
        $this->_lr->checkJournal($profitloss_coa_until,$profitloss_coa_from,$enddate,$netincomecomprehensive,$absolutenet);
    }
    
   
}
