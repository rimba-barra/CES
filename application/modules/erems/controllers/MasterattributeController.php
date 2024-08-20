<?php

class Erems_MasterattributeController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');


        $post_data['code'] = $this->getRequest()->getPost('code');
        $post_data['attribute'] = $this->getRequest()->getPost('attribute');
        $post_data['description'] = $this->getRequest()->getPost('description');
        $post_data['atttype_id'] = $this->getRequest()->getPost('atttype_id');


        $model_masterattribute = new Erems_Models_Masterattribute();
        $result = $model_masterattribute->masterattributeRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        
        /// convert to string with delimeter
        $post_data['detail_id'] = NULL;
        $post_data['detail_code'] = NULL;
        $post_data['detail_attributevalue'] = NULL;
        $post_data['detail_is_default'] = NULL;
        $post_data['detail_description'] = NULL;
        $data = $post_data['detail'];
        $data_count = count($data);

        if ($data_count > 0) {

            $delimeter = '';
            for ($i = 0; $i < $data_count; $i++) {
                $delimeter = $data_count - $i > 1 ? '~' : '';

                $post_data['detail_id'] .= $data[$i]['attributevalue_id'] . $delimeter;
               // $post_data['detail_code'] .= $data[$i]['code'] . $delimeter;
                $post_data['detail_code'] .= "" . $delimeter;
                $post_data['detail_attributevalue'] .= $data[$i]['attributevalue'] . $delimeter;
                $post_data['detail_is_default'] .= $data[$i]['is_default'] . $delimeter;
                $post_data['detail_description'] .= $data[$i]['description'] . $delimeter;
            }
        }


        /// end convert to string with delimeter

        $model_masterattribute = new Erems_Models_Masterattribute();
        $result = $model_masterattribute->masterattributeCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        
        /// convert to string with delimeter
        $post_data['detail_id'] = NULL;
        $post_data['detail_code'] = NULL;
        $post_data['detail_attributevalue'] = NULL;
        $post_data['detail_is_default'] = NULL;
        $post_data['detail_description'] = NULL;
        $data = $post_data['detail'];
        $data_count = count($data);

        if ($data_count > 0) {

            $delimeter = '';
            for ($i = 0; $i < $data_count; $i++) {
                $delimeter = $data_count - $i > 1 ? '~' : '';

                $post_data['detail_id'] .= $data[$i]['attributevalue_id'] . $delimeter;
               // $post_data['detail_code'] .= $data[$i]['code'] . $delimeter;
                $post_data['detail_code'] .= "" . $delimeter;
                $post_data['detail_attributevalue'] .= $data[$i]['attributevalue'] . $delimeter;
                $post_data['detail_is_default'] .= $data[$i]['is_default'] . $delimeter;
                $post_data['detail_description'] .= $data[$i]['description'] . $delimeter;
            }
        }

        $mode_masterattribute = new Erems_Models_Masterattribute();
        $result = $mode_masterattribute->masterattributeUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterattribute = new Erems_Models_Masterattribute();
        $result = $mode_masterattribute->masterattributeDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    function readatttypeAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model_masterattribute = new Erems_Models_Masterattribute();
        $post_data = array();
        $result = $model_masterattribute->masterattributeatttypeRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    function readdetailAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['attribute_id'] = $this->getRequest()->getPost('attribute_id');

        $model_attribute = new Erems_Models_Masterattribute();
        $result = $model_attribute->masterattributeDetailRead($post_data);
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    function deletedetailAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_attribute = new Erems_Models_Masterattribute();
        $result = $model_attribute->masterattributeDeleteRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    function updatedetailAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_attribute = new Erems_Models_Masterattribute();
        $result = $model_attribute->masterattributeUpdateDetail($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>
