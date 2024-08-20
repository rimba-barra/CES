<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

class Cashier_VDRequestController extends Zend_Controller_Action {

    function init() {
        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    }

    function readAction() {
        $ses              = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/VDRequestier/report/';

        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result                                 = array('data' => array(), 'total' => 0, 'success' => false);
        $model                                  = new Cashier_Models_VDRequest();
        $post_data['page']                      = $this->getRequest()->getPost('page');
        $post_data['start']                     = $this->getRequest()->getPost('start');
        $post_data['limit']                     = $this->getRequest()->getPost('limit');
        $post_data['voucher_id']                = $this->getRequest()->getPost('voucher_id');
        $post_data['voucherprefix_id']          = $this->getRequest()->getPost('voucherprefix_id');
        $post_data['kasbank_id']                = $this->getRequest()->getPost('kasbank_id');
        $post_data['projectpt_id']              = $this->getRequest()->getPost('projectpt_id');
        $post_data['project_id']                = $this->getRequest()->getPost('project_id');
        $post_data['projectcode']               = $this->getRequest()->getPost('projectcode');
        $post_data['projectname']               = $this->getRequest()->getPost('projectname');
        $post_data['pt_id']                     = $this->getRequest()->getPost('pt_id');
        $post_data['ptcode']                    = $this->getRequest()->getPost('ptcode');
        $post_data['ptname']                    = $this->getRequest()->getPost('ptname');
        $post_data['projectpt_id']              = $this->getRequest()->getPost('projectpt_id');
        $post_data['department_id']             = $this->getRequest()->getPost('department_id');
        $post_data['department']                = $this->getRequest()->getPost('department');
        $post_data['coa_id']                    = $this->getRequest()->getPost('coa_id');
        $post_data['coaname']                   = $this->getRequest()->getPost('coaname');
        $post_data['coa']                       = $this->getRequest()->getPost('coa');
        $post_data['prefix_id']                 = $this->getRequest()->getPost('prefix_id');
        $post_data['prefix']                    = $this->getRequest()->getPost('prefix');
        $post_data['hideparam']                 = $this->getRequest()->getPost('hideparam');
        $post_data['vendor_id']                 = $this->getRequest()->getPost('vendor_id');
        $post_data['vendorcode']                = $this->getRequest()->getPost('vendorcode');
        $post_data['vendorname']                = $this->getRequest()->getPost('vendorname');
        $post_data['approveby_id']              = $this->getRequest()->getPost('approveby_id');
        $post_data['approvename']               = $this->getRequest()->getPost('approvename');
        $post_data['module_id']                 = $this->getRequest()->getPost('module_id');
        $post_data['fromdate']                  = $this->getRequest()->getPost('fromdate');
        $post_data['untildate']                 = $this->getRequest()->getPost('untildate');
        $post_data['voucher_date']              = $this->getRequest()->getPost('voucher_date');
        $post_data['chequegiro_date']           = $this->getRequest()->getPost('chequegiro_date');
        $post_data['chequegiro_handover_date']  = $this->getRequest()->getPost('chequegiro_handover_date');
        $post_data['cashier_voucher_date']      = $this->getRequest()->getPost('cashier_voucher_date');
        $post_data['trans_yearmonth']           = $this->getRequest()->getPost('trans_yearmonth');
        $post_data['voucher_no']                = $this->getRequest()->getPost('voucher_no');
        $post_data['chequegiro_no']             = $this->getRequest()->getPost('chequegiro_no');
        $post_data['cashier_voucher_no']        = $this->getRequest()->getPost('cashier_voucher_no');
        $post_data['kasbank']                   = $this->getRequest()->getPost('kasbank');
        $post_data['dataflow']                  = $this->getRequest()->getPost('dataflow');
        $post_data['status']                    = $this->getRequest()->getPost('status');
        $post_data['cashier_note']              = $this->getRequest()->getPost('cashier_note');
        $post_data['description']               = $this->getRequest()->getPost('description');
        $post_data['amount']                    = $this->getRequest()->getPost('amount');
        $post_data['active']                    = $this->getRequest()->getPost('active');
        $post_data['due_date']                  = $this->getRequest()->getPost('due_date');
        $post_data['is_pajak']                  = $this->getRequest()->getPost('is_pajak');
        $post_data['mode_read']                 = $this->getRequest()->getPost('mode_read');
        $post_data['vid']                       = $this->getRequest()->getPost('vid');
        $post_data['owner']                     = $this->getRequest()->getPost('owner');
        $post_data['spk']                       = $this->getRequest()->getPost('spk');
        $post_data['bank_account_no']           = $this->getRequest()->getPost('bank_account_no');
        $post_data['fromsenddate']              = $this->getRequest()->getPost('fromsenddate');
        $post_data['untilsenddate']             = $this->getRequest()->getPost('untilsenddate');
        $post_data['fromreceivedate']           = $this->getRequest()->getPost('fromreceivedate');
        $post_data['untilreceivedate']          = $this->getRequest()->getPost('untilreceivedate');
        $post_data['addby']                     = $this->getRequest()->getPost('addby');
        $post_data['receive_status']            = $this->getRequest()->getPost('receive_status');
        $post_data['user_id']                   = $this->getRequest()->getPost('user_id');
        $post_data['approval_type']             = $this->getRequest()->getPost('approval_type');
        $post_data['uploadapi_id']              = $this->getRequest()->getPost('uploadapi_id');
        $post_data['list_params']               = $this->getRequest()->getPost('list_params');
        $post_data['list_params_name']          = $this->getRequest()->getPost('list_params_name');
        $post_data['purchaseletter_no']         = $this->getRequest()->getPost('purchaseletter_no');
        $post_data['unit_number']               = $this->getRequest()->getPost('unit_number');
        $post_data['purchaseletter_reward_ids'] = $this->getRequest()->getPost('purchaseletter_reward_ids');
        $post_data['fromrealizationdate']       = $this->getRequest()->getPost('fromrealizationdate');
        $post_data['untilrealizationdate']      = $this->getRequest()->getPost('untilrealizationdate');
        
        $modeRead = $this->getRequest()->getPost('mode_read');
        if ($modeRead) {
            return $this->_forward("read", "voucher", "cashier");
        }
            // echo json_encode($post_data);die;
            //$this->redirect('/module/controller/action/');
        $result                 = $model->VDRequestRead($post_data);
        $result['project_name'] = $this->session->getCurrentProjectName();
        $result['pt_name']      = $this->session->getCurrentPtName();
        $result['userprint']    = $this->session->getUserFullName();
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function printAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result    = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model     = new Cashier_Models_VDRequest();
        $result    = $model->Printdata($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result    = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        if ($post_data['hideparam'] == 'copyatt') {
            $temp_filename = explode('.', $post_data['filename']);
            $filename      = 'Copy_Attachment_' . $post_data['voucher_id'] . '.' . end($temp_filename);
            // echo $filename;die;
            $newFilePath   = APPLICATION_PATH . '/../public/app/cashier/uploads/'.$filename;

            $src = base64_decode($post_data['f_base64src']);
            
            file_put_contents($newFilePath, $src);
            
            $uploadedFile = [
                'name'     => $filename,
                'size'     => filesize($newFilePath),
                'tmp_name' => $newFilePath,
                'type'     => $post_data['type']
            ];

            $post_data['filespath'] = $uploadedFile;
        }

            //JIKA LEWAT UPLOAD
        if($post_data['hideparam']=='upload'){
            $tmpName             = $_FILES['file-path']['tmp_name'];
            $post_data['csvraw'] = file($tmpName);
        }
        if($post_data['hideparam']=='uploadattachment'){
            $tmpName   = $_FILES['file-path-attachment']['tmp_name'];
            $filesPath = $_FILES['file-path-attachment'];
                //$post_data['fileraw'] = file($tmpName);
            $post_data['filespath'] = $filesPath;
        }

        $post_data = $this->cleaningUnicodeString($post_data);

        $model  = new Cashier_Models_VDRequest();
        $result = $model->VDRequestCreate($post_data);

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result    = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model     = new Cashier_Models_VDRequest();

        $post_data = $this->cleaningUnicodeString($post_data);
        $result    = $model->VDRequestUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result    = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model     = new Cashier_Models_VDRequest();
        $result    = $model->VDRequestDelete($post_data);

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function detailreadAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result                                = array('data' => array(), 'total' => 0, 'success' => false);
        $model                                 = new Cashier_Models_VDRequestdetail();
        $post_data['page']                     = $this->getRequest()->getPost('page');
        $post_data['start']                    = $this->getRequest()->getPost('start');
        $post_data['limit']                    = $this->getRequest()->getPost('limit');
        $post_data['voucherdetail_id']         = $this->getRequest()->getPost('voucherdetail_id');
        $post_data['voucher_id']               = $this->getRequest()->getPost('voucher_id');
        $post_data['coa_id']                   = $this->getRequest()->getPost('coa_id');
        $post_data['kelsub_id']                = $this->getRequest()->getPost('kelsub_id');
        $post_data['kelsub']                   = $this->getRequest()->getPost('kelsub');
        $post_data['kelsubdesc']               = $this->getRequest()->getPost('kelsubdesc');
        $post_data['subcashier_id']            = $this->getRequest()->getPost('subcashier_id');
        $post_data['indexdata']                = $this->getRequest()->getPost('indexdata');
        $post_data['coa']                      = $this->getRequest()->getPost('coa');
        $post_data['dataflow']                 = $this->getRequest()->getPost('dataflow');
        $post_data['remarks']                  = $this->getRequest()->getPost('remarks');
        $post_data['amount']                   = $this->getRequest()->getPost('amount');
        $post_data['hideparam']                = $this->getRequest()->getPost('hideparam');
        $post_data['active']                   = $this->getRequest()->getPost('active');
        $post_data['department_id']            = $this->getRequest()->getPost('department_id');
        $post_data['is_pajak']                 = $this->getRequest()->getPost('is_pajak');
        $post_data['sequence']                 = $this->getRequest()->getPost('sequence');
        $post_data['voucher_groupapprover_id'] = $this->getRequest()->getPost('voucher_groupapprover_id');
        $post_data['approval_type']            = $this->getRequest()->getPost('approval_type');
        $post_data['project_id']               = $this->getRequest()->getPost('project_id');
        $post_data['pt_id']                    = $this->getRequest()->getPost('pt_id');
        $post_data['no_faktur']                = $this->getRequest()->getPost('no_faktur');
        
        $result = $model->VDRequestdetailRead($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function detailcreateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result    = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model     = new Cashier_Models_VDRequestdetail();

        $post_data = $this->cleaningUnicodeString($post_data);

        $result = $model->VDRequestdetailCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function detailupdateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result    = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model     = new Cashier_Models_VDRequestdetail();

        $post_data = $this->cleaningUnicodeString($post_data);

        $result = $model->VDRequestdetailUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function detaildeleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result    = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model     = new Cashier_Models_VDRequestdetail();
        $result    = $model->VDRequestdetailDelete($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function subdetailreadAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result                           = array('data' => array(), 'total' => 0, 'success' => false);
        $model                            = new Cashier_Models_VDRequestsubdetail();
        $post_data['page']                = $this->getRequest()->getPost('page');
        $post_data['start']               = $this->getRequest()->getPost('start');
        $post_data['limit']               = $this->getRequest()->getPost('limit');
        $post_data['vouchersubdetail_id'] = $this->getRequest()->getPost('vouchersubdetail_id');
        $post_data['voucherdetail_id']    = $this->getRequest()->getPost('voucherdetail_id');
        $post_data['voucher_id']          = $this->getRequest()->getPost('voucher_id');
        $post_data['coa_id']              = $this->getRequest()->getPost('coa_id');
        $post_data['kelsub_id']           = $this->getRequest()->getPost('kelsub_id');
        $post_data['kelsub']              = $this->getRequest()->getPost('kelsub');
        $post_data['subgl_id']            = $this->getRequest()->getPost('subgl_id');
        $post_data['subgl']               = $this->getRequest()->getPost('subgl');
        $post_data['indexdata']           = $this->getRequest()->getPost('indexdata');
        $post_data['coa']                 = $this->getRequest()->getPost('coa');
        $post_data['dataflow']            = $this->getRequest()->getPost('dataflow');
        $post_data['remarks']             = $this->getRequest()->getPost('remarks');
        $post_data['amount']              = $this->getRequest()->getPost('amount');
        $post_data['hideparam']           = $this->getRequest()->getPost('hideparam');
        $post_data['active']              = $this->getRequest()->getPost('active');
        $result                           = $model->VDRequestsubdetailRead($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function subdetailcreateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result    = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model     = new Cashier_Models_VDRequestsubdetail();

        $post_data = $this->cleaningUnicodeString($post_data);

        $result = $model->VDRequestsubdetailCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function subdetailupdateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result    = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model     = new Cashier_Models_VDRequestsubdetail();

        $post_data = $this->cleaningUnicodeString($post_data);

        $result = $model->VDRequestsubdetailUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function subdetaildeleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result    = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model     = new Cashier_Models_VDRequestsubdetail();
        $result    = $model->VDRequestsubdetailDelete($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function descreadAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result                      = array('data' => array(), 'total' => 0, 'success' => false);
        $model                       = new Cashier_Models_VDRequestdesc();
        $post_data['page']           = $this->getRequest()->getPost('page');
        $post_data['start']          = $this->getRequest()->getPost('start');
        $post_data['limit']          = $this->getRequest()->getPost('limit');
        $post_data['voucherdesc_id'] = $this->getRequest()->getPost('voucherdesc_id');
        $post_data['voucher_id']     = $this->getRequest()->getPost('voucher_id');
        $post_data['indexdata']      = $this->getRequest()->getPost('indexdata');
        $post_data['posting_no']     = $this->getRequest()->getPost('posting_no');
        $post_data['receipt_no']     = $this->getRequest()->getPost('receipt_no');
        $post_data['code']           = $this->getRequest()->getPost('code');
        $post_data['description']    = $this->getRequest()->getPost('description');
        $post_data['hideparam']      = $this->getRequest()->getPost('hideparam');
        $post_data['active']         = $this->getRequest()->getPost('active');
        $result                      = $model->VDRequestdescRead($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function desccreateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result    = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model     = new Cashier_Models_VDRequestdesc();
        $result    = $model->VDRequestdescCreate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function descupdateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result    = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model     = new Cashier_Models_VDRequestdesc();
        $result    = $model->VDRequestdescUpdate($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function descdeleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');
        $result    = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $model     = new Cashier_Models_VDRequestdesc();
        $result    = $model->VDRequestdescDelete($post_data);
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function cleaningUnicodeString($postData) {
        $cleanString    = array();
        $idxWillbeClean = array('description', 'remarks');

        foreach ($postData as $k => $v) {
            if (in_array($k, $idxWillbeClean)) {
                $v = Cashier_Box_Library_Cleansing::clean_str2($v);
            }
            $cleanString[$k] = $v;
        }

        return $cleanString;
    }

    function detailuploadAction(){
        $model      = new Cashier_Models_VDRequestdetail();
        $project_id = $this->getRequest()->getPost('u_project_id');
        $pt_id      = $this->getRequest()->getPost('u_pt_id');
        $hideparam  = $this->getRequest()->getPost('hideparam');
        $result     = array('data' => array(), 'total' => 0, 'success' => true);

        if ($hideparam == 'upload') {
            $tmpName    = $_FILES['file-path2']['tmp_name'];
            $arrData    = array();
            $accData    = array();
            $accDataSub = array();
            $csvAsArray = fopen($tmpName, "r");
            $i          = 1;
            while ($line = fgets($csvAsArray)) {
               $line = str_replace("\t",";",$line);
               $line = str_replace("\r\n","",$line);
               $line = str_replace("\r","",$line);
               $line = str_replace("\n","",$line);
               $line = str_replace("\"","",$line);
               $line = str_replace("'","`",$line);
               $line = preg_replace('/[[:^print:]]/', ' ', $line);
               $arr  = explode(';',$line);
               array_push($arrData, $arr);
               $i++;
            }
            
            fclose($csvAsArray);
            
            for ($a = 0; $a < sizeof($arrData); $a++) { 
                if ($a > 0) {
                    $kelsubname = '';
                    $kelsubdesc = '';
                    $coa = $model->VDRequestdetailGetdata(["flag"=>"coa", "deleted"=>0, "project_id"=>$project_id, "pt_id"=>$pt_id, "name"=>$arrData[$a][1]]);
                    if ($coa[0][0]['kelsub_id'] > 0) {
                        $kelsub = $model->VDRequestdetailGetdata(["flag"=>"kelsub", "deleted"=>0, "project_id"=>$project_id, "pt_id"=>$pt_id, "kelsub_id"=>$coa[0][0]['kelsub_id']]);
                        $kelsubname = $kelsub[0][0]['kelsub'];
                        $kelsubdesc = $kelsub[0][0]['description'];
                    }
                    $tempAcc = [
                        'voucher_id'       => 0,
                        'voucherdetail_id' => 0,
                        'coa_id'           => $coa[0][0]['coa_id'],
                        'coa'              => $arrData[$a][1],
                        'coaname'          => $coa[0][0]['name'],
                        'kelsub_id'        => $coa[0][0]['kelsub_id'],
                        'kelsub'           => $kelsubname,
                        'kelsubdesc'       => $kelsubdesc,
                        'indexdata'        => $arrData[$a][0],
                        'dataflow'         => $arrData[$a][2],
                        'amount'           => $arrData[$a][4],
                        'remarks'          => $arrData[$a][5],
                        'active'           => 1,
                        'deleted'          => 0,
                        'hideparam'        => 'default',
                        'statedata'        => 'create'
                    ]; 
                    
                    array_push($accData, $tempAcc);

                    if ( strlen($arrData[$a][3]) > 0) {
                    $subgl = $model->VDRequestdetailGetdata(["flag"=>"subgl", "deleted"=>0, "project_id"=>$project_id, "pt_id"=>$pt_id, "name"=>$arrData[$a][3]]);
                    $tempAccSub = [
                            'amount'           => $arrData[$a][4],
                            'coa_id'           => $coa[0][0]['coa_id'],
                            'subgl_id'         => $subgl[0][0]['subgl_id'],
                            'code'             => $subgl[0][0]['code'],
                            'code1'            => $subgl[0][0]['code1'],
                            'code2'            => $subgl[0][0]['code2'],
                            'code3'            => $subgl[0][0]['code3'],
                            'code4'            => $subgl[0][0]['code4'],
                            'active'           => 1,
                            'deleted'          => 0,
                            'hideparam'        => 'default',
                            'statedata'        => 'create',
                            'indexdata'        => $a,
                            'indexdataheader'  => $arrData[$a][0],
                            'indexsubdata'     => $arrData[$a][0],
                            'kelsub_id'        => $coa[0][0]['kelsub_id'],
                            'kelsub'           => $kelsubname,
                            'remarks'          => $arrData[$a][5],
                            'voucher_id'       => 0,
                            'voucherdetail_id' => $arrData[$a][0]
                        ];
    
                        array_push($accDataSub, $tempAccSub);
                    }

                }
            }
            $result = array('data' => array($accData), 'datasub' => array($accDataSub), 'total' => 0, 'success' => true);
        }

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
}

?>