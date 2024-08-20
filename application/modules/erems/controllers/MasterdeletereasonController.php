<?php

class Erems_MasterdeletereasonController extends Zend_Controller_Action {

    function readAction() {




        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);


       // $modeRead = $this->getRequest()->getPost('mode_read');

       
           // $post_data['start'] = $this->getRequest()->getPost('start');
            //$post_data['limit'] = $this->getRequest()->getPost('limit');
            $post_data['Deletereason'] = $this->getRequest()->getPost('Deletereason');
            $post_data['Description'] = $this->getRequest()->getPost('Description');
           // $post_data['datatype'] = $this->getRequest()->getPost('datatype');
            //$post_data['description'] = $this->getRequest()->getPost('description');
            $model_masterdeletereason = new Erems_Models_Masterdeletereason();
            $result = $model_masterdeletereason->masterdeletereasonRead($post_data);




        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_masterparameterglobal = new Erems_Models_Masterparameterglobal();
        $result = $model_masterparameterglobal->masterparameterglobalCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterparameterglobal = new Erems_Models_Masterparameterglobal();
        $result = $mode_masterparameterglobal->masterparameterglobalUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterparameterglobal = new Erems_Models_Masterparameterglobal();
        $result = $mode_masterparameterglobal->masterparameterglobalDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>