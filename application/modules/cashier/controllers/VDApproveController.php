<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
class Cashier_VDApproveController extends Zend_Controller_Action {

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/VDApproveier/report/';

        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $model = new Cashier_Models_VDApprove();
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['voucher_id'] = $this->getRequest()->getPost('voucher_id');
        $post_data['voucherprefix_id'] = $this->getRequest()->getPost('voucherprefix_id');
        $post_data['kasbank_id'] = $this->getRequest()->getPost('kasbank_id');
        $post_data['project_id'] = $this->getRequest()->getPost('project_id');
        $post_data['projectcode'] = $this->getRequest()->getPost('projectcode');
        $post_data['projectname'] = $this->getRequest()->getPost('projectname');
        $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
        $post_data['ptcode'] = $this->getRequest()->getPost('ptcode');
        $post_data['ptname'] = $this->getRequest()->getPost('ptname');
        $post_data['projectpt_id'] = $this->getRequest()->getPost('projectpt_id');
        $post_data['department_id'] = $this->getRequest()->getPost('department_id');
        $post_data['department'] = $this->getRequest()->getPost('department');
        $post_data['coa_id'] = $this->getRequest()->getPost('coa_id');
        $post_data['coaname'] = $this->getRequest()->getPost('coaname');
        $post_data['coa'] = $this->getRequest()->getPost('coa');
        $post_data['prefix_id'] = $this->getRequest()->getPost('prefix_id');
        $post_data['prefix'] = $this->getRequest()->getPost('prefix');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['desc'] = $this->getRequest()->getPost('desc');

        $post_data['vendor_id'] = $this->getRequest()->getPost('vendor_id');
        $post_data['vendorcode'] = $this->getRequest()->getPost('vendorcode');
        $post_data['vendorname'] = $this->getRequest()->getPost('vendorname');
        $post_data['approveby_id'] = $this->getRequest()->getPost('approveby_id');
        $post_data['approvename'] = $this->getRequest()->getPost('approvename');
        $post_data['module_id'] = $this->getRequest()->getPost('module_id');
        $post_data['fromdate'] = $this->getRequest()->getPost('fromdate');
        $post_data['untildate'] = $this->getRequest()->getPost('untildate');
        $post_data['voucher_date'] = $this->getRequest()->getPost('voucher_date');
        $post_data['chequegiro_date'] = $this->getRequest()->getPost('chequegiro_date');
        $post_data['chequegiro_handover_date'] = $this->getRequest()->getPost('chequegiro_handover_date');
        $post_data['cashier_voucher_date'] = $this->getRequest()->getPost('cashier_voucher_date');
        $post_data['trans_yearmonth'] = $this->getRequest()->getPost('trans_yearmonth');
        $post_data['voucher_no'] = $this->getRequest()->getPost('voucher_no');
        $post_data['chequegiro_no'] = $this->getRequest()->getPost('chequegiro_no');
        $post_data['cashier_voucher_no'] = $this->getRequest()->getPost('cashier_voucher_no');
        $post_data['kasbank'] = $this->getRequest()->getPost('kasbank');
        $post_data['dataflow'] = $this->getRequest()->getPost('dataflow');
        $post_data['status'] = $this->getRequest()->getPost('status');
        $post_data['cashier_note'] = $this->getRequest()->getPost('cashier_note');
        $post_data['description'] = $this->getRequest()->getPost('description');
        $post_data['amount'] = $this->getRequest()->getPost('amount');
        $post_data['active'] = $this->getRequest()->getPost('active');
        $post_data['vid'] = $this->getRequest()->getPost('vid');
        $post_data['uploadapi_id'] = $this->getRequest()->getPost('uploadapi_id');

        $result = $model->VDApproveRead($post_data);
        $result['project_name'] = $this->session->getCurrentProjectName();
        $result['pt_name'] = $this->session->getCurrentPtName();
        $result['userprint'] = $this->session->getUserFullName();
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Cashier_Models_VDApprove();
        $result = $model->VDApproveCreate($post_data);

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
     function printAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_VDRequest();
        $result = $model->Printdata($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        // echo json_encode($post_data);die;
        $model = new Cashier_Models_VDApprove();
        $result = $model->VDApproveUpdate($post_data);
        
        if ($result['success'] == 1) {
            if ($post_data['uploadapi_id'] !="" and $post_data['datasource'] != "") {
                $post_data['vid'] = $model->getVIDbyAPI($post_data);
                $this->sendapprovebyAPI($post_data);
            }
        }
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    function sendapprovebyAPI($post_data){
        $datasource = $post_data['datasource'];
        switch ($datasource) {
            case 'CPMS':
                $this->sendApprove_CPMS($post_data);
            break;
            case 'PIM':
                $this->sendApprove_PIM($post_data);
            break;
            
            default:
            break;
        }
    }

    function sendApprove_PIM($post_data){
        $apiKey = $this->sendApprove_PIM_key($post_data);
        $uploadtemp = $post_data['datasource'].'-'.$post_data['project_id'].$post_data['pt_id'];
        $uploadapi_id = str_replace($uploadtemp,"",$post_data['uploadapi_id']);
        
        $vid = $post_data['vid'];
        $project_id = $post_data['project_id'];
        $pt_id = $post_data['pt_id'];
        $voucher_no = $post_data['voucher_no'];

        $curl = curl_init();

        curl_setopt_array($curl, array(
          CURLOPT_URL => 'https://pim.ciputragroup.com:11441/api/update-voucher-department?request_key='.$apiKey.'&voucher_id='.$vid.'&voucher_no='.$voucher_no.'&project_id='.$project_id.'&pt_id='.$pt_id.'&uploaduniquenumber='.$uploadapi_id,
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => '',
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 0,
          CURLOPT_FOLLOWLOCATION => true,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => 'POST',
        ));
        
        $response = json_decode(curl_exec($curl));
        $info = curl_getinfo($curl);
        $this->logSelfApproveAPI($info,$post_data, $response);
        curl_close($curl);
    }

    function sendApprove_CPMS($post_data){
        $apiKey = $this->sendApprove_CPMS_key($post_data);
        $uploadtemp = $post_data['datasource'].'-'.$post_data['project_id'].$post_data['pt_id'];
        $uploadapi_id = str_replace($uploadtemp,"",$post_data['uploadapi_id']);
        
        $vid = $post_data['vid'];
        $voucher_no = $post_data['voucher_no'];
        
        $curl = curl_init();
        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://cpms.ciputra.app/api/input_voucherid',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => array(
            'requestkey' => $apiKey,
            'uniqnumber' => $uploadapi_id,
            'voucher_no' => $voucher_no,
            'voucher_id' => $vid),
        ));
        
        $response = json_decode(curl_exec($curl));
        $info = curl_getinfo($curl);
        $this->logSelfApproveAPI($info,$post_data, $response);
        
        curl_close($curl);
    }

    function logSelfApproveAPI($info,$post_data, $response){
        $model = new Cashier_Models_VDApprove();
        $model->LogAPISelfApprove($info,$post_data, $response);
    }

    function sendApprove_PIM_key($post_data){
        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://pim.ciputragroup.com:11441/api/fams-request-key',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        ));

        $response = json_decode(curl_exec($curl));
        curl_exec($curl);
        return $response->key;
    }

    function sendApprove_CPMS_key($post_data){
        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://cpms.ciputra.app/api/requestkey',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_HTTPHEADER => array(
            'Content-Length: 0'
          ),
        ));
        
        $response = json_decode(curl_exec($curl));
        curl_close($curl);
        return $response->key;
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_VDApprove();
        $result = $model->VDApproveDelete($post_data);

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function detailreadAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $model = new Cashier_Models_VDApprovedetail();
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['voucherdetail_id'] = $this->getRequest()->getPost('voucherdetail_id');
        $post_data['voucher_id'] = $this->getRequest()->getPost('voucher_id');
        $post_data['coa_id'] = $this->getRequest()->getPost('coa_id');
        $post_data['kelsub_id'] = $this->getRequest()->getPost('kelsub_id');
        $post_data['kelsub'] = $this->getRequest()->getPost('kelsub');
        $post_data['kelsubdesc'] = $this->getRequest()->getPost('kelsubdesc');
        $post_data['subcashier_id'] = $this->getRequest()->getPost('subcashier_id');
        $post_data['indexdata'] = $this->getRequest()->getPost('indexdata');
        $post_data['coa'] = $this->getRequest()->getPost('coa');
        $post_data['dataflow'] = $this->getRequest()->getPost('dataflow');
        $post_data['remarks'] = $this->getRequest()->getPost('remarks');
        $post_data['amount'] = $this->getRequest()->getPost('amount');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['active'] = $this->getRequest()->getPost('active');
        $result = $model->VDApprovedetailRead($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function detailcreateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_VDApprovedetail();
        $result = $model->VDApprovedetailCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function detailupdateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_VDApprovedetail();
        $result = $model->VDApprovedetailUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function detaildeleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_VDApprovedetail();
        $result = $model->VDApprovedetailDelete($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function subdetailreadAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $model = new Cashier_Models_VDApprovesubdetail();
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['vouchersubdetail_id'] = $this->getRequest()->getPost('vouchersubdetail_id');
        $post_data['voucherdetail_id'] = $this->getRequest()->getPost('voucherdetail_id');
        $post_data['voucher_id'] = $this->getRequest()->getPost('voucher_id');
        $post_data['coa_id'] = $this->getRequest()->getPost('coa_id');
        $post_data['kelsub_id'] = $this->getRequest()->getPost('kelsub_id');
        $post_data['kelsub'] = $this->getRequest()->getPost('kelsub');
        $post_data['subgl_id'] = $this->getRequest()->getPost('subgl_id');
        $post_data['subgl'] = $this->getRequest()->getPost('subgl');
        $post_data['indexdata'] = $this->getRequest()->getPost('indexdata');
        $post_data['coa'] = $this->getRequest()->getPost('coa');
        $post_data['dataflow'] = $this->getRequest()->getPost('dataflow');
        $post_data['remarks'] = $this->getRequest()->getPost('remarks');
        $post_data['amount'] = $this->getRequest()->getPost('amount');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['active'] = $this->getRequest()->getPost('active');
        $result = $model->VDApprovesubdetailRead($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function subdetailcreateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_VDApprovesubdetail();
        $result = $model->VDApprovesubdetailCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function subdetailupdateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_VDApprovesubdetail();
        $result = $model->VDApprovesubdetailUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function subdetaildeleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_VDApprovesubdetail();
        $result = $model->VDApprovesubdetailDelete($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function descreadAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $model = new Cashier_Models_VDApprovedesc();
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['voucherdesc_id'] = $this->getRequest()->getPost('voucherdesc_id');
        $post_data['voucher_id'] = $this->getRequest()->getPost('voucher_id');
        $post_data['indexdata'] = $this->getRequest()->getPost('indexdata');
        $post_data['posting_no'] = $this->getRequest()->getPost('posting_no');
        $post_data['receipt_no'] = $this->getRequest()->getPost('receipt_no');
        $post_data['code'] = $this->getRequest()->getPost('code');
        $post_data['description'] = $this->getRequest()->getPost('description');
        $post_data['hideparam'] = $this->getRequest()->getPost('hideparam');
        $post_data['active'] = $this->getRequest()->getPost('active');
        $result = $model->VDApprovedescRead($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function desccreateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_VDApprovedesc();
        $result = $model->VDApprovedescCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function descupdateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_VDApprovedesc();
        $result = $model->VDApprovedescUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function descdeleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model = new Cashier_Models_VDApprovedesc();
        $result = $model->VDApprovedescDelete($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>