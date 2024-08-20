<?php

class Erems_BankkprController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model_bankkpr = new Erems_Models_Bankkpr();

		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');
		
		$post_data['purchaseletter_bankkpr_id'] = $this->getRequest()->getPost('purchaseletter_bankkpr_id');
		$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
		
		$result = $model_bankkpr->bankkprRead($post_data);
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
	
	function readakadAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model_bankkpr = new Erems_Models_Bankkpr();

		$post_data['start'] = $this->getRequest()->getPost('start');
		$post_data['limit'] = $this->getRequest()->getPost('limit');
		
		$post_data['akadconfirmation_id'] = $this->getRequest()->getPost('akadconfirmation_id');
		$post_data['purchaseletter_bankkpr_id'] = $this->getRequest()->getPost('purchaseletter_bankkpr_id');
		$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
		
		$result = $model_bankkpr->bankkprakadRead($post_data);
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
		
		$save_mode_type = ($this->getRequest()->getPost('save_mode_type') ? $this->getRequest()->getPost('save_mode_type') : '');
		
		$model_bankkpr = new Erems_Models_Bankkpr();
		
		if($save_mode_type == 'payment'){
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$post_data['unit_id'] = $this->getRequest()->getPost('unit_id');
			$post_data['kpr_acc_date'] = $this->getRequest()->getPost('kpr_acc_date');
			$post_data['akad_date'] = $this->getRequest()->getPost('akad_date');
			$post_data['kpr_realisation'] = $this->getRequest()->getPost('kpr_realisation');
			
			$result = $model_bankkpr->bankkprCreatePayment($post_data);
		} else if($save_mode_type == 'full_payment'){
			$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
			$post_data['unit_id'] = $this->getRequest()->getPost('unit_id');
			$post_data['kpr_acc_date'] = $this->getRequest()->getPost('kpr_acc_date');
			$post_data['akad_date'] = $this->getRequest()->getPost('akad_date');
			$post_data['kpr_realisation'] = $this->getRequest()->getPost('kpr_realisation');
			$post_data['payment_date'] = $this->getRequest()->getPost('payment_date');
			
			$result = $model_bankkpr->bankkprCreateFullPayment($post_data);
		} else {
			$post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
			$result = $model_bankkpr->bankkprCreate($post_data);
		}

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    /*function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_bankkpr = new Erems_Models_Bankkpr();
        $result = $mode_bankkpr->bankkprUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }*/

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_bankkpr = new Erems_Models_Bankkpr();
        $result = $mode_bankkpr->bankkprDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
	
	function batalbyAction(){
		
		$this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

		$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
		$post_data['batal_by'] = $this->getRequest()->getPost('batal_by');
		$post_data['notes_batal'] = $this->getRequest()->getPost('notes_batal');
		$post_data['removeStatus'] = $this->getRequest()->getPost('removeStatus');
		
		$model = new Erems_Models_Bankkpr();
        $result = $model->bankkprBatalby($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
	}

}

?>