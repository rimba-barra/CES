<?php

require_once dirname(__FILE__) . '/../library/apli/ApliCashierController.php';

class Cashier_CashflowreportController extends ApliCashierController {

    public function init() {
        $this->setDao(new Cashier_Models_Transaction_VoucherDao());
        $this->setValidator(new Cashier_Models_Validator_VoucherValidator());
        $this->setObject(new Cashier_Models_Master_Kasbank());
        $validator = $this->getValidator();
        $validator->controller = $this;
    }

    public function initRead() {

        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $ptHasil = $dao->getCustomReadDirectModule('global','detailpt',$request,$session);
        $projectHasil = $dao->getCustomRead('detaildept', $request, $session);
        $ptModel = Apli::generateExtJSModelDirectWithDetail('pt','project');
        $projectModel = Apli::generateExtJSModelDirect('department');

        return array(
            "data" => array(
                "pt" => array(
                    "model" => $ptModel,
                    "data" => $ptHasil[0]
                ),
                "department" => array(
                    "model" => $projectModel,
                    "data" => $projectHasil[0]
                ),
            ),
        );
    }

     function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
         $model = new Gl_Models_Cashflow();
        $result = $model->Create($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}
