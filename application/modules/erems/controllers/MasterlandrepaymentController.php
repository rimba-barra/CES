<?php

class Erems_MasterlandrepaymentController extends Zend_Controller_Action {

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
		
		$read_type_mode = ($this->getRequest()->getPost('read_type_mode') ? $this->getRequest()->getPost('read_type_mode') : '');

        $model = new Erems_Models_Masterlandrepayment();

		if($read_type_mode == 'update_setlrpproject'){
			$post_data['set_status'] = $this->getRequest()->getPost('set_status');
			$result = $model->lrpprojectsettingUpdate($post_data);
		} else if($read_type_mode == 'detail'){
			$post_data['landrepayment_id'] = $this->getRequest()->getPost('landrepayment_id');
			$result = $model->landrepaymentdetailRead($post_data);
		} else if($read_type_mode == 'efisiensi_config'){
            $config = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
            $result = $config->showEfisiensiLRP();
        }
        else {
			$post_data['start'] = $this->getRequest()->getPost('start');
			$post_data['limit'] = $this->getRequest()->getPost('limit');
			
			$post_data['landrepayment_id'] = $this->getRequest()->getPost('landrepayment_id');
			$post_data['code'] = $this->getRequest()->getPost('code');
			$post_data['keterangan'] = $this->getRequest()->getPost('keterangan');
			
			$result = $model->landrepaymentRead($post_data);
		}
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Erems_Models_Masterlandrepayment();
        $result = $model->landrepaymentCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    /*function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_bankkpr = new Erems_Models_Masterlandrepayment();
        $result = $mode_bankkpr->bankkprUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }*/

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Erems_Models_Masterlandrepayment();
        $result = $model->landrepaymentDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>