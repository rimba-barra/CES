<?php

/**
 * Description of ReadReport
 *
 * @author MIS
 */
class Cashier_Box_Models_App_Models_ReadReport extends Cashier_Box_Models_App_Models_ReadWorms {
    private $addedParams;
    private $ctrl;
    private $xUrl;
    
    public function __construct($controller, $debug = '') {
        parent::__construct($controller, $debug);
        $this->ctrl = $controller;
        $this->setStimulsoftSession();
        $this->addedParams = array();
    }
    
    public function setXurl($url){
        $this->xUrl = $url; 
    }

    protected function setStimulsoftSession() {
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/erems/report/';
    }

    public function doStandartInit() {
        $appDao = new Cashier_Box_Models_Master_AppDao();
        $pt = new Cashier_Box_Models_Master_Pt();
        $project = new Cashier_Box_Models_Master_Project();
        $ptInfo = $appDao->getPt($this->getSession()->getPt()->getId());
        $pt->setArrayTable($ptInfo[0][0]);
        $projectInfo = $appDao->getProject($this->getSession()->getProject()->getId());
        $project->setArrayTable($projectInfo[0][0]);

        $this->setData($this->processParams($pt, $project));
    }
    
    /*@added 24 Maret 2014*/
    public function attachParams($name,$value){
        $this->addedParams[$name] = $value;
    }
    
    /*@added 24 Maret 2014*/
    protected function processParams(Cashier_Box_Models_Master_Pt $pt,  Cashier_Box_Models_Master_Project $project){
    
        $listParams = array(
            "pt"=>$pt->getArrayTable(),
            "project"=>$project->getArrayTable(),
            "publicBaseUrl"=>""
        );
        foreach ($this->addedParams as $k=>$v){
            $listParams[$k] = $v;
        }
        return $listParams;
    }

}

?>
