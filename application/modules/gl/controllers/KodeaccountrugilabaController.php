<?php

class Gl_KodeaccountrugilabaController extends Zend_Controller_Action {

    function readAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);       
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['flag_input'] = $this->getRequest()->getPost('flag_input');
        $post_data['profitloss_coa_from'] = $this->getRequest()->getPost('profitloss_coa_from');
        $post_data['profitloss_coa_until'] = $this->getRequest()->getPost('profitloss_coa_until');
        $post_data['desc1_coa_from'] = $this->getRequest()->getPost('desc1_coa_from');
        $post_data['desc1_coa_until'] = $this->getRequest()->getPost('desc1_coa_until');
        $post_data['desc1_note'] = $this->getRequest()->getPost('desc1_note');
        $post_data['desc2_coa_from'] = $this->getRequest()->getPost('desc2_coa_from');
        $post_data['desc2_coa_until'] = $this->getRequest()->getPost('desc2_coa_until');
        $post_data['desc2_note'] = $this->getRequest()->getPost('desc2_note');
        $post_data['sum1_note'] = $this->getRequest()->getPost('sum1_note');
        $post_data['desc3_coa_from'] = $this->getRequest()->getPost('desc3_coa_from');
        $post_data['desc3_coa_until'] = $this->getRequest()->getPost('desc3_coa_until');
        $post_data['desc3_note'] = $this->getRequest()->getPost('desc3_note');
        $post_data['sum2_note'] = $this->getRequest()->getPost('sum2_note');
        $post_data['desc4_coa_from'] = $this->getRequest()->getPost('desc4_coa_from');
        $post_data['desc4_coa_until'] = $this->getRequest()->getPost('desc4_coa_until');
        $post_data['desc4_note'] = $this->getRequest()->getPost('desc4_note');
        $post_data['sum3_note'] = $this->getRequest()->getPost('sum3_note');
        $post_data['desc5_coa_from'] = $this->getRequest()->getPost('desc5_coa_from');
        $post_data['desc5_coa_until'] = $this->getRequest()->getPost('desc5_coa_until');
        $post_data['desc5_note'] = $this->getRequest()->getPost('desc5_note');
        $post_data['desc6_coa_from'] = $this->getRequest()->getPost('desc6_coa_from');
        $post_data['desc6_coa_until'] = $this->getRequest()->getPost('desc6_coa_until');
        $post_data['desc6_note'] = $this->getRequest()->getPost('desc6_note');
        $post_data['sum4_note'] = $this->getRequest()->getPost('sum4_note');
        $post_data['coa_bungaloan1'] = $this->getRequest()->getPost('coa_bungaloan1');
        $post_data['coa_bungaloan2'] = $this->getRequest()->getPost('coa_bungaloan2');
        $post_data['bungaloan_desc'] = $this->getRequest()->getPost('bungaloan_desc');
        $post_data['val1'] = $this->getRequest()->getPost('val1');
        $post_data['val2'] = $this->getRequest()->getPost('val2');
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $model = new Gl_Models_Kodeaccountrugilaba();
        $result = $model->kodeaccountrugilabaRead($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Kodeaccountrugilaba();
        $result = $model->kodeaccountrugilabaCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Gl_Models_Kodeaccountrugilaba();
        $result = $model->kodeaccountrugilabaUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

   

}

?>