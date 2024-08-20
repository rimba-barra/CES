<?php

require_once dirname(__DIR__) . '../library/apli/ApliCashierController.php';

class Cashier_JournaleliminasiController extends ApliCashierController {

    public function init() {
        $this->setDao(new Cashier_Models_Transaction_JournaleliminasiDao());
        $this->setValidator(new Cashier_Models_Validator_JournalValidator());
        $this->setObject(new Cashier_Models_Master_Journal());
        $validator = $this->getValidator();
        $validator->controller = $this;

        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->session->set('selected_dbapps', 'gl_2018');
    }

    public function allRead() {

        $params = $this->getRequest()->getPost();
        $eremsReq = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'journal', array('payment', 'voucherprefix', 'prefix', 'department', 'cheque', 'purchaselettertransaction','unitb','project', 'pt','plafon', 'consolidation'), array("deletedRows", "deletedsubRows", "detailcoa", "detailar", "detailescrow", "subdetailcoa", "voucher_generate", "paymentflag","test")));
        $objectCreator = $this->getObject();
        $objectCreator->setProject($session->getProject());
        $objectCreator->setPt($session->getPt());
        $dao = $this->getDao();
        $dm->setObject($dao);
        $dm->setDao($dao);
        $hasil = $dao->getByProjectPtWithPageSearch($objectCreator, $eremsReq);


        $dm->setHasil($hasil);
        $dl = $dm->getDataList();


        $dl->setDataDao($hasil);

        $hasilData = Apli::prosesDao($dm->getDataList());   

        return array(
            "model" => Apli::generateExtJSModel($dm->getDataList()),
            "data" => $hasilData["data"],
            "totalRow" => $hasilData["row"]
        );
    }

    public function detailRead() {

        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $deptHasil = $dao->getCustomRead('detaildept', $request, $session);
        $ptHasil = $dao->getCustomReadDirectModule('global','detailpt',$request,$session);
        $projectHasil = $dao->getCustomRead('detailproject', $request, $session);
        $kasbankHasil = $dao->getCustomRead('kasbank', $request, $session);
        $consolHasil = $dao->getCustomRead('consolidation',$request,$session);
        $paymentmethodHasil = $dao->getCustomRead('paymentmethod', $request, $session);
        $deptModel = Apli::generateExtJSModelDirect('department');
        $ptModel = Apli::generateExtJSModelDirectWithDetail('pt','project');
        $consolModel = Apli::generateExtJSModelDirect('consolidation');
        $projectModel = Apli::generateExtJSModelDirectWithDetail('multiproject', array('user', 'project'));
        $kasbankModel = Apli::generateExtJSModelDirectWithDetail('voucherprefix', array('prefix', 'coa'));
        $paymentmethodModel = Apli::generateExtJSModelDirect('paymentmethod');

        return array(
            "data" => array(
                "consolidation" => array(
                    "model" => $consolModel,
                    "data" => $consolHasil[0]
                ),
                "dept" => array(
                    "model" => $deptModel,
                    "data" => $deptHasil[0]
                ),
                "pt" => array(
                    "model" => $ptModel,
                    "data" => $ptHasil[0]
                ),
                "project" => array(
                    "model" => $projectModel,
                    "data" => $projectHasil[0]
                ),
                "paymentmethod" => array(
                    "model" => $paymentmethodModel,
                    "data" => $paymentmethodHasil[0]
                ),
                "kasbank" => array(
                    "model" => $kasbankModel,
                    "data" => $kasbankHasil[0]
                ),
                "ptid" => $session->getPt()->getId(),
            ),
                //"model" => $mainModel
        );
    }

    public function mainUpdate() {

        $params = $this->getRequest()->getPost();
        $request = Apli::getRequest($params);
        $data = Apli::getAppdata($params);
        $session = Apli::getSession();
        $objectCreator = $this->getObject();
        Cashier_Box_Tools::setArrayTable($objectCreator, $data);
        $objectCreator->setAddBy($session->getUser()->getId());
        $objectCreator->setProjectPt($session->getProject(), $session->getPt());
        $validator = $this->getValidator();
        $validator->appRequest = $request;
        $validator->session = $session;
        $validator->action = $this->getRequest()->getActionName();
        $validator->paramdata = $data;
        $validator->run($objectCreator);
        return array(
            "success" => $validator->getStatus(),
            "msg" => $validator->getMsg(),
            "id" => $validator->getPrimarykey()
        );
    }

    public function mainDelete() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $data = json_decode($params['data'], true);
        $user = $session->getUser()->getId();
        $deletedId = array();
        if (count($data) !== count($data, COUNT_RECURSIVE)) {
            foreach ($data as $row => $index) {
                $deletedId[$row] = $index['journal_id'];
            }
            $send = implode('~', $deletedId);
        } else {
            $send = $data['journal_id'];
        }
        $dao = $this->getDao();

        $hasil = $dao->deleteData($user, $send, $request);

        if ($hasil) {
            $status = TRUE;
        } else {
            $status = FALSE;
        }
        return array(
            "success" => $status,
            "total" => $hasil
        );
    }

    public function browsedetailRead() {
        $params = $this->getRequest()->getPost();
        $params['mode_read'] = 'all';
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $request->setModule("voucher");
        $dao = new Cashier_Models_Master_BlockDao();
        $block = new Cashier_Models_Master_BlockTran();
        $block->setProjectPt($session->getProject(), $session->getPt());
        $blockData = $dao->getByCPP($block);
        $blockModel = Apli::generateExtJSModelDirect('blocktran');
        $ptHasil = $dao->getCustomReadDirectModule('global','detailpt',$request,$session);
        $ptModel = Apli::generateExtJSModelDirectWithDetail('pt','project');
        
        $bankHasil = $dao->getCustomRead('detailbank',$request,$session);
        $bankModel =Apli::generateExtJSModelDirect('bank');

        $projectHasil = $dao->getCustomRead('detailproject', $request, $session);
        $projectModel = Apli::generateExtJSModelDirectWithDetail('multiproject', array('user', 'project'));

        return array(
            "data" => array(
                "block" => array(
                    "model" => $blockModel,
                    "data" => $blockData[0]
                ),
                "pt" => array(
                    "model" => $ptModel,
                    "data" => $ptHasil[0]
                ),
                "project" => array(
                    "model" => $projectModel,
                    "data" => $projectHasil[0]
                ),
                 "bank"=>array(
                    "model" => $bankModel,
                    "data" => $bankHasil[0]
                ),
            ),
        );
    }

    public function angsuranlistRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $data = Apli::getAppdata($params);

        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        //  $dataList = new Cashier_Box_Models_App_DataListCreator('', 'unittran', array('unitstatus', 'purchaselettertransaction', 'customer', 'clusterb', 'blockb', 'productcategory', 'type'));
        $dataList = new Cashier_Box_Models_App_DataListCreator('', 'schedule', array('purchaselettertransaction', 'payment', 'unitstatus', 'unitb', 'customer', 'clusterb', 'blockb', 'productcategory', 'type', 'project', 'pt', 'voucher'));
        $dm->setDataList($dataList);

        $dao = $this->getDao();
        $unitTran = new Cashier_Models_Unit_UnitTran();
        $unitTran->setArrayTable($params);
        $unitTran->setProject($session->getProject());
        $unitTran->setPt($session->getPt());
        $unitTran->setAddBy($session->getUser()->getId());
        $unitTran->getStatus()->setId(Cashier_Box_Config::UNITSTATUS_SOLD);
        $unitTran->getBlock()->setId(Cashier_Box_Tools::cleanComboData($data, 'block_id'));
        $hasil = $dao->getAllNonLunas($request, $unitTran);

        $dm->setHasil($hasil);
        $dl = $dm->getDataList();
        $dl->setDataDao($hasil);
        $hasilData = Apli::prosesDao($dm->getDataList());

        return array(
            "model" => Apli::generateExtJSModel($dm->getDataList()),
            "data" => $hasilData["data"],
            "totalRow" => $hasilData["row"]
        );
    }

    public function unitsublistRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $data = Apli::getAppdata($params);

        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dataList = new Cashier_Box_Models_App_DataListCreator('', 'subgl', array());
        $dm->setDataList($dataList);

        $dao = $this->getDao();
        $unitTran = new Cashier_Models_Unit_UnitTran();
        $unitTran->setArrayTable($params);
        $unitTran->setProject($session->getProject());
        $unitTran->setPt($session->getPt());

        $hasil = $dao->getUnitsub($request, $unitTran);

        $dm->setHasil($hasil);
        $dl = $dm->getDataList();
        $dl->setDataDao($hasil);
        $hasilData = Apli::prosesDao($dm->getDataList());

        return array(
            "model" => Apli::generateExtJSModel($dm->getDataList()),
            "data" => $hasilData["data"],
            "totalRow" => $hasilData["row"]
        );
    }
    
    public function escrowlistRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $data = Apli::getAppdata($params);
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dataList = new Cashier_Box_Models_App_DataListCreator('', 'scheduleescrow', array('purchaselettertransaction', 'payment', 'unitstatus', 'unitb', 'customer', 'clusterb', 'blockb', 'productcategory', 'type', 'project', 'pt', 'voucher','plafon'));
        $dm->setDataList($dataList);
        $dao = $this->getDao();
        $unitTran = new Cashier_Models_Unit_UnitTran();
        $unitTran->setArrayTable($params);
        $unitTran->setProject($session->getProject());
        $unitTran->setPt($session->getPt());
        $unitTran->setAddBy($session->getUser()->getId());
        $unitTran->getStatus()->setId(Cashier_Box_Config::UNITSTATUS_SOLD);
        $unitTran->getBlock()->setId(Cashier_Box_Tools::cleanComboData($data, 'block_id'));
        $hasil = $dao->getSchemaEscrow($request, $unitTran);

        $dm->setHasil($hasil);
        $dl = $dm->getDataList();
        $dl->setDataDao($hasil);
        $hasilData = Apli::prosesDao($dm->getDataList());

        return array(
            "model" => Apli::generateExtJSModel($dm->getDataList()),
            "data" => $hasilData["data"],
            "totalRow" => $hasilData["row"]
        );
    }

    public function chequelistRead() {
        $params = $this->getRequest()->getPost();
        $eremsReq = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'cheque', array('bank', 'pt'), array("deletedRows")));
        $objectCreator = new Cashier_Models_Master_Cheque();
        $objectCreator->setProject($session->getProject());
        $objectCreator->setPt($session->getPt());
        $dao = new Cashier_Models_Master_ChequeDao();
        $dm->setObject(new Cashier_Models_Master_Cheque());
        $dm->setDao($dao);
        $hasil = $dao->getByProjectPtWithPageSearch($objectCreator, $eremsReq, $session);
        $dm->setHasil($hasil);
        $dl = $dm->getDataList();
        $dl->setDataDao($hasil);
        $hasilData = Apli::prosesDao($dm->getDataList());
        return array(
            "model" => Apli::generateExtJSModel($dm->getDataList()),
            "data" => $hasilData["data"],
            "totalRow" => $hasilData["row"]
        );
    }

    public function generatetemplatecoaRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dataList = new Cashier_Box_Models_App_DataListCreator('', 'journaldetail', array('coa', 'kelsub','subgl','cashflowtype','unit'), array());
        $dao = new Cashier_Models_Master_CoaConfigDao();
        $data = $params;
        $template = $data['template_id'];
        $request = Apli::getRequest($params);

        if (!empty($data['payment_id'])) {
            $paymentcashier_id = $data['payment_id'];
            $dao->paymentcashier_id = $paymentcashier_id;
        }
        if (!empty($data['amount'])) {
            $amount = $data['amount'];
            $dao->amount = $amount;
        }
        if (!empty($data['unit_id'])) {
            $unitid = $data['unit_id'];
            $dao->unitId = $unitid;
        }

        if (!empty($data['schedule_id'])) {
            $scheduleid = $data['schedule_id'];
            $dao->scheduleId = $scheduleid;
        }

        if((int)$data['start']>1){
            $data['paging_mode'] = 1;
        }

        $dao->session = $session;
        $dao->template = $template;
        if (!empty($data['kasbank_id'])) {
            $dao->th_kasbank_id = $data['kasbank_id'];
        }
        if (!empty($data['purchaseletter_pencairankpr_id'])) {
            $dao->purchaselleterKprId = $data['purchaseletter_pencairankpr_id'];
        }
        if(isset($data['kasbank_id'])){
             if($data['kasbank_id']==""){
                //for generate
                $hasil = $dao->getDetailByJournalTemplateGen($dao,$request);
             }elseif($data['paging_mode']==1){
                $hasil = $dao->getDetailByJournalTemplatePaging($dao,$data['start'],$data['limit']);
             }else{
                $hasil = $dao->getDetailByJournaleliminasiTemplate($dao);
             }
        }else{
             $hasil = $dao->getDetailByJournaleliminasiTemplate($dao);
        }
       
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        $dm->setHasil($hasil);
        $dl = $dm->getDataList();
        $dl->setDataDao($hasil);
        $hasilData = Apli::prosesDao($dm->getDataList());

        return array(
            "model" => Apli::generateExtJSModel($dm->getDataList()),
            "data" => $hasilData["data"],
            "totalRow" => $hasilData["row"]
        );
    }

    public function journalidRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $month = date('M', strtotime($params['date']));
        $cek = array();
        $cek[0][0][$month] = null;
        //$cek = $dao->getCustomRead('checkclosing', $request, $session);

        /*

        if (isset($cek)) {

            if (isset($cek[0][0][$month])) {
                if ($cek[0][0][$month] == '0') {
                    $hasil = $dao->getCustomRead('', $request, $session);
                } else {
                    $hasil = array(
                        array(
                            array(
                                "jid" => 0
                            )
                        )
                    );
                }
            } elseif (isset($cek[0])) {
                $hasil = array(
                    array(
                        array(
                            "jid" => 2
                        )
                    )
                );
            } else {
                $hasil = array(
                    array(
                        array(
                            "jid" => 0
                        )
                    )
                );
            }
        }
        */
        $hasil = $dao->getCustomRead('', $request, $session);

        return array(
            "data" => array(
                "hasil" => $hasil
            ),
        );
    }

    public function subdetailcoaRead() {
        $params = $this->getRequest()->getPost();

        //supaya tidak ada data kotor
        if(!isset($params['journaldetail_id'])){
            $params['journaldetail_id'] = -1;
        }else{
            if($params['journaldetail_id']==0){
                $params['journaldetail_id'] = -1;
            }
            if($params['module']=='journal'){
                $params['module'] = 'journaleliminasi';
            }
        }

        $req = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'journalsubdetail', array('journaldetail', 'kelsub', 'subgl'), array("")));
        $objectCreator = new Cashier_Models_Transaction_Journalsubdetail();
        $objectCreator->setProject($session->getProject());
        $objectCreator->setPt($session->getPt());
        $dao = new Cashier_Models_Transaction_JournalDao();
        $dm->setObject($objectCreator);
        $dm->setDao($dao);

        if(!isset($params['paging_mode'])){
            $params['paging_mode'] = 0;
        }

        if($params['paging_mode']==1){
            $hasil = $dao->getSubDetailPaging($objectCreator, $req, $session);
        }else{
            $hasil = $dao->getSubeliminasiDetail($objectCreator, $req, $session);
        }
        
        $dm->setHasil($hasil);
        $dl = $dm->getDataList();
        $dl->setDataDao($hasil);
        $hasilData = Apli::prosesDao($dm->getDataList());
        return array(
            "model" => Apli::generateExtJSModel($dm->getDataList()),
            "data" => $hasilData["data"],
            "totalRow" => $hasilData["row"]
        );
    }

    public function mainCreate() {
        $this->allRead();
        $params = $this->getRequest()->getPost();


        //handle 1 triliun
        ini_set('precision', 15);
        ini_set('serialize_precision', 15);
        
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        if (array_key_exists('hideparam',$post_data)){

            if($post_data['hideparam']){
                $model = new Gl_Models_Journal();
                if(isset($post_data['data'])){
                    $detail = $post_data['data'];
                }else{
                    $detail = $post_data;
                }
                
                //undefined vars
                if(!isset($detail['cashflowtype_cashflowtype_id'])){
                    $detail['cashflowtype_cashflowtype_id'] = 0;
                }

                switch ($post_data['hideparam']) {
                    case 'directsavedetail':
                            if($detail['voucherdetail_id']>0){ //marked as update
                                $result = $model->accountjournalDirectUpdate($detail);
                            }else{
                                $detail['deleted'] = false;
                                $result = $model->accountjournalDirectCreate($detail);
                            }
                        break;
                    case 'directreservedetail':
                            if($detail['voucherdetail_id']>0){ //marked as update
                                //$result = $model->accountjournalDirectUpdate($detail);
                            }else{
                                $detail['deleted'] = false;
                                $result = $model->accountjournalDirectReserveCreate($detail);
                            }
                        break;   
                    case 'directdeletedetail':
                            if($detail['journaldetail_id']>0){ //marked as update
                                $result = $model->accountjournalDirectDelete($detail);
                            }
                        break;
                    case 'directdeletesubdetail':
                            if($detail['journalsubdetail_id']>0){ //marked as update
                                $result = $model->subaccountDirectDelete($detail);
                            }
                        break;
                    case 'directsavesubdetail':
                            if($detail['journalsubdetail_id']>0){ //marked as update
                                $result = $model->subaccountDirectUpdate($detail);
                            }else{
                                $detail['deleted'] = false;
                                $result = $model->subaccountDirectCreate($detail);
                            }
                        break;
                    case 'directsumdebetcredit':
                            if($detail['journal_id']>0){ 
                                $result = $model->accountDirectSumdebetcredit($detail);
                            }
                        break;
                    case 'directsumdetailfromsub':
                            if($detail['journaldetail_id']>0){ 
                                $result = $model->accountDirectSumdetailfromsub($detail);
                            }
                        break;
                    case 'directsaveheader':
                            if($detail['journal_id']>0){ 
                                $result = $model->journalDirectUpdate($detail);
                            }
                        break;
                    case 'generatevoucher':
                            $result = $model->journalCreate($detail);
                        break;
                    case 'copyjournal':
                            $result = $model->journalCreate($detail);
                        break;
                    case 'genjournalpph':
                            $result = $model->generatepphjo($detail);
                }
                echo Zend_Json::encode($result);
                $this->_helper->viewRenderer->setNoRender(true);
                die();       
            }else{
                $model = new Gl_Models_Journal();
                $result = $model->journalCreate($post_data);
                echo Zend_Json::encode($result);
                $this->_helper->viewRenderer->setNoRender(true);
                die();           
            }


        } 

        $request = Apli::getRequest($params);
        $data = Apli::getAppdata($params);
        $session = Apli::getSession();
        $objectCreator = $this->getObject();
        $data['sum_total_detail'] = Cashier_Box_Tools::unformatMoney($data['sum_total_detail']);
        $data['sum_totalc_detail'] = Cashier_Box_Tools::unformatMoney($data['sum_totalc_detail']);

        Cashier_Box_Tools::setArrayTable($objectCreator, $data);
        $objectCreator->setAddBy($session->getUser()->getId());
        $objectCreator->setProjectPt($session->getProject(), $session->getPt());
        $validator = $this->getValidator();
        $validator->appRequest = $request;
        $validator->session = $session;
        $validator->action = $this->getRequest()->getActionName();
        $validator->paramdata = $data;
        $validator->run($objectCreator);
    
        //update prefix no +1
        //Journal Eliminasi Tidak Perlu
        /* 
        if($validator->getStatus()==true){
            $model = new Gl_Models_Journal();
            $result = $model->docNumberprojectpt($post_data['prefix_prefix_id'], '1', $post_data['journal_date'],$data);
        }
        */

        return array(
            "success" => $validator->getStatus(),
            "msg" => $validator->getMsg(),
            "id" => $validator->getPrimarykey()
        );
    }

    public function initRead() {

        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $ptHasil = $dao->getCustomReadDirectModule('global','detailpt',$request,$session);
        $projectHasil = $dao->getCustomRead('detailproject', $request, $session);
        $consolHasil = $dao->getCustomRead('consolidation', $request, $session);
        $ptModel = Apli::generateExtJSModelDirectWithDetail('pt','project');
        $projectModel = Apli::generateExtJSModelDirectWithDetail('multiproject', array('user', 'project'));
        $consolModel = Apli::generateExtJSModelDirect('consolidation');

        return array(
            "data" => array(
                "pt" => array(
                    "model" => $ptModel,
                    "data" => $ptHasil[0]
                ),
                "project" => array(
                    "model" => $projectModel,
                    "data" => $projectHasil[0]
                ),
                "consolidation" => array(
                    "model" => $consolModel,
                    "data" => $consolHasil[0]
                ),
            ),
        );
    }

    public function arpaymentRead() {
        $params = $this->getRequest()->getPost();
        $req = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'voucherardetail', array('kasbank','customer','unit','purchaselettertransaction'), array("")));
        $objectCreator = new Cashier_Models_Transaction_Voucherardetail();
        $objectCreator->setProject($session->getProject());
        $objectCreator->setPt($session->getPt());
        $dao = new Cashier_Models_Transaction_VoucherDao();
        $dm->setObject($objectCreator);
        $dm->setDao($dao);
        $hasil = $dao->getAr($objectCreator, $req);
        $dm->setHasil($hasil);
        $dl = $dm->getDataList();
        $dl->setDataDao($hasil);
        $hasilData = Apli::prosesDao($dm->getDataList());
        return array(
            "model" => Apli::generateExtJSModel($dm->getDataList()),
            "data" => $hasilData["data"],
            "totalRow" => $hasilData["row"]
        );
    }
    
    public function escrowpaymentRead() {
        $params = $this->getRequest()->getPost();
        $req = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'voucherescrowdetail', array('kasbank','customer','unit','purchaselettertransaction'), array("")));
        $objectCreator = new Cashier_Models_Transaction_Voucherardetail();
        $objectCreator->setProject($session->getProject());
        $objectCreator->setPt($session->getPt());
        $dao = new Cashier_Models_Transaction_VoucherDao();
        $dm->setObject($objectCreator);
        $dm->setDao($dao);
        $hasil = $dao->getAr($objectCreator, $req);
        $dm->setHasil($hasil);
        $dl = $dm->getDataList();
        $dl->setDataDao($hasil);
        $hasilData = Apli::prosesDao($dm->getDataList());
        return array(
            "model" => Apli::generateExtJSModel($dm->getDataList()),
            "data" => $hasilData["data"],
            "totalRow" => $hasilData["row"]
        );
    }

    public function getsubglv2Read() {

        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $hasil = $dao->getCustomRead('', $request, $session);
        return array(
            "data" => array(
                "result" => empty($hasil) ? 0 : $hasil[0][0]
            ),
        );
    }

    public function checksubRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $cek = array();
        $cek = $dao->getCustomRead('checksub', $request, $session);
        if(sizeof($cek)>0){
            $hasil = $cek[0];
        }else{
            $hasil = $cek;
        }

        return array(
            "data" => array(
                "hasil" => $hasil
            ),
        );
    }


}
