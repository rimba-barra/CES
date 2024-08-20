<?php 

class Hrd_ReportmatrixcompetencyController extends Zend_Controller_Action {

    public function readAction() {
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH.'/../public/app/hrd/report/';

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model = new Hrd_Models_ReportMatrixCompetency();

        $post_data['table'] = $this->_getParam('table');//$this->getRequest()->getPost('table', null);
        //echo $this->_getParam('table');

        $result = $model->comboRead($post_data);
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }   
}

?>