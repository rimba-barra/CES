<?php

class Erems_MasterpbbindukController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
		
		$post_data['mode_read'] = $this->getRequest()->getPost('mode_read');
		
		$post_data['start'] = '';
		$post_data['limit'] = '';
		$post_data['pbbinduk_id'] = '';
		$post_data['code'] = '';

        $model_masterpbbinduk = new Erems_Models_Masterpbbinduk();
		
		if ($post_data['mode_read'] == 'detail') {
			$post_data['pbbinduk_id'] = $this->getRequest()->getPost('pbbinduk_id');
            $result = $model_masterpbbinduk->masterpbbindukRead($post_data);
		}
		else{
			$post_data['start'] = $this->getRequest()->getPost('start');
        	$post_data['limit'] = $this->getRequest()->getPost('limit');
			$post_data['code'] = $this->getRequest()->getPost('code');
			$result = $model_masterpbbinduk->masterpbbindukRead($post_data);
		}

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_masterpbbinduk = new Erems_Models_Masterpbbinduk();
        $result = $model_masterpbbinduk->masterpbbindukCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterpbbinduk = new Erems_Models_Masterpbbinduk();
        $result = $mode_masterpbbinduk->masterpbbindukUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterpbbinduk = new Erems_Models_Masterpbbinduk();
        $result = $mode_masterpbbinduk->masterpbbindukDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
