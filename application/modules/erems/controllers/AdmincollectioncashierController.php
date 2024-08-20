<?php

class Erems_AdmincollectioncashierController extends Zend_Controller_Action {
   
    function readAction() {

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $requestorCode = $this->getRequest()->getPost('mode_read');
         
         switch($requestorCode) {
            case "generatetemplatecoa":
                return $this->_forward("read", "installmentpayment", "cashier");
            break;
            case "getdepartmentprefix":
                return $this->_forward("read", "common", "cashier");
            break;
            case "getvoucherprefixsetupv2":
                return $this->_forward("read", "common", "cashier");
            break;
            case "getvoucherprefixsetupv2bank":
                return $this->_forward("read", "common", "cashier");
            break;
            case "grouptransaction":
                return $this->_forward("read", "grouptransaction", "cashier");
            break;
            case "init":
                return $this->_forward("read", "installmentpayment", "cashier");
            break;
            case "maindetail":
                return $this->_forward("read", "installmentpayment", "cashier");
            break;
            default:
                $this->getResponse()->setHeader('Content-Type', 'application/json');
                $model_admincollection = new Erems_Models_Admincollection_Admincollectioncashier();
                $post_data['start'] = $this->getRequest()->getPost('start');
                $post_data['limit'] = $this->getRequest()->getPost('limit');
                $post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
                $post_data['block_id'] = $this->getRequest()->getPost('block_id');
                // $post_data['kavling_number_start'] = $this->getRequest()->getPost('kavling_number_start');
                // $post_data['kavling_number_end'] = $this->getRequest()->getPost('kavling_number_end');
                $post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
                $post_data['customer_name'] = $this->getRequest()->getPost('customer_name');
                $post_data['purchase_startdate'] = $this->getRequest()->getPost('purchase_startdate');
                $post_data['purchase_enddate'] = $this->getRequest()->getPost('purchase_enddate');
                $post_data['pricetype_id'] = $this->getRequest()->getPost('pricetype_id');
                $result = $model_admincollection->admincollectionRead($post_data);
                echo Zend_Json::encode($result);
                $this->_helper->viewRenderer->setNoRender(true);
        }    
    }
    
    
    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
         switch($post_data['hideparam']) {
            case "gettransnocash":
                return $this->_forward("create", "common", "cashier");
            break;
            case "generatevouchernocashv2":
                return $this->_forward("create", "common", "cashier");
            break;
            case "generatevouchernobank":
                return $this->_forward("create", "common", "cashier");
            break;
         }
    }

  
}

?>