<?php

/**
 * Description of Report
 *
 * @author MIS
 */
abstract class Erems_Box_Models_App_Hermes_Report extends Erems_Box_Models_App_Hermes_AbstractController{
    protected function testingFlag() {
        return FALSE;
    }

    public function initRead() {
        
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH.'/../public/app/erems/report/';

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $msg = '';
        
        
        $hasil = array();
        
        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "DATA" =>$hasil,
                "MSG" => $msg
        ));




        $dm->setHasil(array($otherAT));


        return $dm;
    }

    
    
    public function printoutRead() {




        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $msg = '';
        
        
       // $dao = new Erems_Models_Payment_Dao();
        $ses = $this->getAppSession();
        $payment = new Erems_Models_Payment_Payment();
        $payment->setArrayTable($this->getAppData());
        $data = $this->getAppData();
        $params = $this->processParams($data);
        $hasil = array(
            'pt_id'=>$ses->getPt()->getId(),
            'project_id'=>$ses->getProject()->getId()
        );
        
        $hasil = array_merge($hasil,$params);
        
       
        
        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "DATA" =>$hasil,
                "MSG" => $msg
        ));




        $dm->setHasil(array($otherAT));


        return $dm;
    }
    
    
    

    

    

    protected function getDefaultProcessor() {
        return new Erems_Models_App_Box_Processor();
    }
    
    abstract function processParams($request);
}

?>
