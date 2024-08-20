<?php

require_once dirname(__DIR__) . '../library/apli/ApliCashierController.php';

class Cashier_JournalController extends ApliCashierController
{

    public function init()
    {
        $this->setDao(new Cashier_Models_Transaction_JournalDao());
        $this->setValidator(new Cashier_Models_Validator_JournalValidator());
        $this->setObject(new Cashier_Models_Master_Journal());
        $validator = $this->getValidator();
        $validator->controller = $this;

        $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $this->session->set('selected_dbapps', 'gl_2018');
    }

    public function allRead()
    {

        $params = $this->getRequest()->getPost();
        $eremsReq = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'journal', array('payment', 'voucherprefix', 'prefix', 'department', 'cheque', 'purchaselettertransaction', 'unitb', 'project', 'pt', 'plafon'), array("deletedRows", "deletedsubRows", "detailcoa", "detailar", "detailescrow", "subdetailcoa", "voucher_generate", "paymentflag", "test", "reasondelete")));
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

    public function detailRead()
    {

        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $deptHasil = $dao->getCustomRead('detaildept', $request, $session);
        $ptHasil = $dao->getCustomReadDirectModule('global', 'detailpt', $request, $session);
        $projectHasil = $dao->getCustomRead('detailproject', $request, $session);
        $kasbankHasil = $dao->getCustomRead('kasbank', $request, $session);
        $paymentmethodHasil = $dao->getCustomRead('paymentmethod', $request, $session);
        $deptModel = Apli::generateExtJSModelDirect('department');
        $ptModel = Apli::generateExtJSModelDirectWithDetail('pt', 'project');
        $projectModel = Apli::generateExtJSModelDirectWithDetail('multiproject', array('user', 'project'));
        $kasbankModel = Apli::generateExtJSModelDirectWithDetail('voucherprefix', array('prefix', 'coa'));
        $paymentmethodModel = Apli::generateExtJSModelDirect('paymentmethod');

        return array(
            "data" => array(
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

    public function mainUpdate()
    {

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

    public function mainDelete()
    {
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
        
        $hasil = $dao->deleteData($user, $send, $request, $data['reasondelete']);

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

    public function browsedetailRead()
    {
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
        $ptHasil = $dao->getCustomReadDirectModule('global', 'detailpt', $request, $session);
        $ptModel = Apli::generateExtJSModelDirectWithDetail('pt', 'project');

        $bankHasil = $dao->getCustomRead('detailbank', $request, $session);
        $bankModel = Apli::generateExtJSModelDirect('bank');

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
                "bank" => array(
                    "model" => $bankModel,
                    "data" => $bankHasil[0]
                ),
            ),
        );
    }

    public function angsuranlistRead()
    {
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

    public function unitsublistRead()
    {
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

    public function escrowlistRead()
    {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $data = Apli::getAppdata($params);
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dataList = new Cashier_Box_Models_App_DataListCreator('', 'scheduleescrow', array('purchaselettertransaction', 'payment', 'unitstatus', 'unitb', 'customer', 'clusterb', 'blockb', 'productcategory', 'type', 'project', 'pt', 'voucher', 'plafon'));
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

    public function chequelistRead()
    {
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

    public function generatetemplatecoaRead()
    {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dataList = new Cashier_Box_Models_App_DataListCreator('', 'journaldetail', array('coa', 'kelsub', 'subgl', 'cashflowtype', 'unit'), array());
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

        if ((int)$data['start'] > 1) {
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
        if (isset($data['kasbank_id'])) {
            if ($data['kasbank_id'] == "") {
                //for generate
                $hasil = $dao->getDetailByJournalTemplateGen($dao, $request);
            } elseif ($data['paging_mode'] == 1) {
                $hasil = $dao->getDetailByJournalTemplatePaging($dao, $data['start'], $data['limit']);
            } else {
                $hasil = $dao->getDetailByJournalTemplate($dao);
            }
        } else {
            $hasil = $dao->getDetailByJournalTemplate($dao);
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

    public function journalidRead()
    {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $month = date('M', strtotime($params['date']));
        $cek = array();
        $cek[0][0][$month] = null;
        $cek = $dao->getCustomRead('checkclosing', $request, $session);



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

        return array(
            "data" => array(
                "hasil" => $hasil
            ),
        );
    }

    public function subdetailcoaRead()
    {
        $params = $this->getRequest()->getPost();

        //supaya tidak ada data kotor
        if (!isset($params['journaldetail_id'])) {
            $params['journaldetail_id'] = -1;
        } else {
            if ($params['journaldetail_id'] == 0) {
                $params['journaldetail_id'] = -1;
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

        if (!isset($params['paging_mode'])) {
            $params['paging_mode'] = 0;
        }

        if ($params['paging_mode'] == 1) {
            $hasil = $dao->getSubDetailPaging($objectCreator, $req, $session);
        } else {
            $hasil = $dao->getSubDetail($objectCreator, $req, $session);
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

    public function mainCreate()
    {
        $this->allRead();
        $params = $this->getRequest()->getPost();


        //handle 1 triliun
        ini_set('precision', 15);
        ini_set('serialize_precision', 15);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        if (array_key_exists('hideparam', $post_data)) {

            if ($post_data['hideparam']) {
                $model = new Gl_Models_Journal();
                if (isset($post_data['data'])) {
                    $detail = $post_data['data'];
                } else {
                    $detail = $post_data;
                }

                //undefined vars
                if (!isset($detail['cashflowtype_cashflowtype_id'])) {
                    $detail['cashflowtype_cashflowtype_id'] = 0;
                }

                switch ($post_data['hideparam']) {
                    case 'directsavedetail':
                        if ($detail['voucherdetail_id'] > 0) { //marked as update
                            $result = $model->accountjournalDirectUpdate($detail);
                        } else {
                            $detail['deleted'] = false;
                            $result = $model->accountjournalDirectCreate($detail);
                        }
                        break;
                        case 'directreservedetail':
                        if ($detail['voucherdetail_id'] > 0) { //marked as update
                            //$result = $model->accountjournalDirectUpdate($detail);
                        } else {
                            $detail['deleted'] = false;
                            $result = $model->accountjournalDirectReserveCreate($detail);
                        }
                        break;
                        case 'directdeletedetail':
                        if ($detail['journaldetail_id'] > 0) { //marked as update
                            $result = $model->accountjournalDirectDelete($detail);
                        }
                        break;
                        case 'directdeletesubdetail':
                        if ($detail['journalsubdetail_id'] > 0) { //marked as update
                            $result = $model->subaccountDirectDelete($detail);
                        }
                        break;
                        case 'directsavesubdetail':
                        if ($detail['journalsubdetail_id'] > 0) { //marked as update
                            $result = $model->subaccountDirectUpdate($detail);
                        } else {
                            $detail['deleted'] = false;
                            $result = $model->subaccountDirectCreate($detail);
                        }
                        break;
                        case 'directsumdebetcredit':
                        if ($detail['journal_id'] > 0) {
                            $result = $model->accountDirectSumdebetcredit($detail);
                        }
                        break;
                        case 'directsumdetailfromsub':
                        if ($detail['journaldetail_id'] > 0) {
                            $result = $model->accountDirectSumdetailfromsub($detail);
                        }
                        break;
                        case 'directsaveheader':
                        if ($detail['journal_id'] > 0) {
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
                        case 'exportdetailjournal':
                        $result = $model->exportdetailjournal($detail);
                    }
                    echo Zend_Json::encode($result);
                    $this->_helper->viewRenderer->setNoRender(true);
                    die();
                } else {
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
            if ($validator->getStatus() == true) {
                $model = new Gl_Models_Journal();
                $result = $model->docNumberprojectpt($post_data['prefix_prefix_id'], '1', $post_data['journal_date'], $data);
            }

            return array(
                "success" => $validator->getStatus(),
                "msg" => $validator->getMsg(),
                "id" => $validator->getPrimarykey()
            );
        }

        public function initRead()
        {

            $params = $this->getRequest()->getPost();
            $session = Apli::getSession();
            $request = Apli::getRequest($params);
            $dao = $this->getDao();
            $ptHasil = $dao->getCustomReadDirectModule('global', 'detailpt', $request, $session);
            $projectHasil = $dao->getCustomRead('detailproject', $request, $session);
            $ptModel = Apli::generateExtJSModelDirectWithDetail('pt', 'project');
            $projectModel = Apli::generateExtJSModelDirectWithDetail('multiproject', array('user', 'project'));

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
                ),
            );
        }

        public function arpaymentRead()
        {
            $params = $this->getRequest()->getPost();
            $req = Apli::getRequest($params);
            $session = Apli::getSession();
            $dm = new Cashier_Box_Models_App_Hermes_DataModel();
            $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'voucherardetail', array('kasbank', 'customer', 'unit', 'purchaselettertransaction'), array("")));
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

        public function escrowpaymentRead()
        {
            $params = $this->getRequest()->getPost();
            $req = Apli::getRequest($params);
            $session = Apli::getSession();
            $dm = new Cashier_Box_Models_App_Hermes_DataModel();
            $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'voucherescrowdetail', array('kasbank', 'customer', 'unit', 'purchaselettertransaction'), array("")));
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

        public function getsubglv2Read()
        {

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

        public function checksubRead()
        {
            $params = $this->getRequest()->getPost();
            $session = Apli::getSession();
            $request = Apli::getRequest($params);
            $dao = $this->getDao();
            $cek = array();
            $cek = $dao->getCustomRead('checksub', $request, $session);
            if (sizeof($cek) > 0) {
                $hasil = $cek[0];
            } else {
                $hasil = $cek;
            }

            return array(
                "data" => array(
                    "hasil" => $hasil
                ),
            );
        }

        function uploadRead()
        {
            $post_data = $this->getRequest()->getPost();
            $post_data['start'] = 0;
            $post_data['limit'] = 10000;
            $groupingdata = $post_data['groupingdata'];
            $journal_id = $post_data['journal_id'];
            $errormsg = array();

            try {
            //start try
                $model = new Gl_Models_Coa();
                $result = $model->coaupoladRead($post_data);
                $res = $result[1];
                $coa = array();
                $accData = array();
                $subData = array();
                $coaData = array();
                $coaBank = array();
                foreach ($res as $r) {
                    $coa[$r['coa']] = array(
                        'coa_id' => $r['coa_id'],
                        'coa' => $r['coa'],
                        'name' => $r['name'],
                        'kelsub_id' => $r['kelsub_id'],
                        'kelsub' => $r['kelsub']
                    );
                }

                $result = $model->getjournalinfoRead($post_data);
                $coa_bank = $result[0][0]['coa_bank'];
                $coa_bank_amount = $result[1][0]['coa_bank_amount'];

                $modelSac = new Gl_Models_Subaccountcode();
                $modelSag = new Gl_Models_Subaccountgroup();

                $tmpName = $_FILES['file-path']['tmp_name'];

                $cleaneds = array();

                $raw = file($tmpName);
                foreach ($raw as $r) {
                    $rclean = str_replace(",", "~", $r);
                    array_push($cleaneds, $rclean);
                }

            //$csvAsArray = array_map('str_getcsv', file($tmpName));
                $csvAsArray = array_map('str_getcsv', $cleaneds);

                $arrData =  array();
                $accData =  array();
                $subData =  array();
            //jika format csv titik koma ';'
                $i = 0;
                foreach ($csvAsArray as $c) {
                    if ($i > 0) {
                        $arr = explode(';', $c[0]);
                        array_push($arrData, $arr);
                    }
                    $i++;
                }
            //jika format csv koma ','

                $i = 0;
                if (sizeof($arrData[0]) == 1) {
                    $csvAsArray = array();
                    $arrData =  array();
                    $file = fopen($tmpName, "r");
                    while (!feof($file)) {
                        $csvAsArray[] = fgetcsv($file, null, ',');
                    }
                    foreach ($csvAsArray as $c) {
                        $coa_acc = $c[8];
                        if ($i > 0 && $coa_acc !== '' && $coa_acc !== null) {
                            array_push($arrData, $c);
                        }
                        $i++;
                    }
                }

            //array_shift($arrData);

                $i = 0;
                $tmpAcc = '';
                $sumSub = 0;
                $total_d = 0;
                $total_c = 0;
                foreach ($arrData as $a) {

                    $coa_acc = trim($a[8]);
                    $type_acc = trim($a[9]);
                    $casfflow_acc = trim((isset($a[13]) ? $a[13] : ''));
                    $remarks_acc = trim($a[6]);
                    $kawasan_sub = trim($a[10]);
                    $subgL_codes = trim($a[11]);
                    $amount_acc = trim($a[12]);
                    $remarks_sub = trim((isset($a[14]) ? $a[14] : ''));
                    $remarks_sub = trim((($remarks_sub == '') ? ($remarks_acc . ' ' . $subgL_codes) : $remarks_sub));

                    $remarks_acc = str_replace("~", ",", $remarks_acc);
                    $remarks_sub = str_replace("~", ",", $remarks_sub);

                    if (!isset($coa[$coa_acc])) {
                        $msg = "Coa " . $coa_acc . " Tidak Ada di Master";
                        array_push($errormsg, $msg);
                    } else {
                        $i++;
                        $coa_kelsub = $coa[$coa_acc]['kelsub'];
                    //jika ada cashflow
                        $cashflowtype_id = 0;
                        $setupcashflow_id = 0;
                        if ($casfflow_acc !== '') {
                            $cf = explode("/", $casfflow_acc);
                            $paramcf['project_id'] = $post_data['project_id'];
                            $paramcf['pt_id'] = $post_data['pt_id'];
                            $paramcf['department_code'] = trim($cf[0]);
                            $paramcf['cashflowtype'] = trim($cf[1]);
                            $rescf = $model->getSetupcashflow($paramcf);
                            $rescf = $rescf['result'][0];
                            if (sizeof($rescf) == 0) {
                                $msg = "Cashflow " . $casfflow_acc . " Tidak Terdaftar";
                                array_push($errormsg, $msg);
                                $cashflowtype_id = 0;
                                $setupcashflow_id = 0;
                            } else {
                                $cashflowtype_id = $rescf[0]['cashflowtype_id'];
                                $setupcashflow_id = $rescf[0]['setupcashflow_id'];
                            }
                        }

                    //jika coa bank tidak sama
                        if ($coa_bank == $coa_acc && $coa_bank !== '00.00.000') {
                            array_push($coaBank, $coa_acc);
                            if ((float)$amount_acc !== (float)$coa_bank_amount) {
                                $msg = "Amount Coa " . $coa_acc . " Bank, Tidak Sama.";
                                array_push($errormsg, $msg);
                            }
                        }

                        $acc = array(
                            'project_id' => $post_data['project_id'],
                            'pt_id' => $post_data['pt_id'],
                            'state' => 'default',
                            'journal_id' => $journal_id,
                            'journaldetail_id_acc' => $i,
                            'indexdata' => $i,
                            'coa_coa_id' => $coa[$coa_acc]['coa_id'],
                            'coa_coa' => $coa_acc,
                            'name_acc' => $coa[$coa_acc]['name'],
                            'type_acc' => $type_acc,
                            'kelsub_kelsub_id' => $coa[$coa_acc]['kelsub_id'],
                            'kelsub_kelsub' => $coa_kelsub,
                            'amount' => $amount_acc,
                            'remarks' => $remarks_acc,
                            'cashflowtype_cashflowtype_id' => $setupcashflow_id,
                            'setupcashflow_id' => $setupcashflow_id,
                            'deleted' => false,
                        );

                        if (trim($acc['type_acc']) == 'D') {
                            $total_d = $total_d + floatval($acc['amount']);
                        } else {
                            $total_c = $total_c + floatval($acc['amount']);
                        }

                        $accData[$i][$coa_acc][$type_acc] = $acc;

                        if ($subgL_codes !== "") {
                        //JIKA ADA SUB
                            $sub = array(
                                'project_id' => $post_data['project_id'],
                                'pt_id' => $post_data['pt_id'],
                                'hideparam' => "default",
                                'coa_id' => $coa[$coa_acc]['coa_id'],
                                'subgl_id_sub' => 0,
                                'amount' => floatval($acc['amount']),
                                'code_sub' => 0,
                                'code1_sub' => 0,
                                'code2_sub' => 0,
                                'code3_sub' => $kawasan_sub,
                                'code4_sub' => 0,
                                'kelsub_sub' => '',
                                'type_sub' => $acc['type_acc'],
                                'remarks' => $remarks_sub,
                                'journal_id' => $journal_id,
                                'journal_id_sub' => 0,
                                'journaldetail_id_sub' => 0,
                                'journalsubdetail_id_sub' => 0,
                                'cashflowtype_cashflowtype_id' => $setupcashflow_id,
                                'setupcashflow_id' => $setupcashflow_id,
                                'indexsubdata' => 1,
                                'deleted' => false
                            );

                            $param['subgl_codes'] = preg_replace('/\s+/', '', $subgL_codes);
                            $param['kelsub_id'] = (int)$coa[$coa_acc]['kelsub_id'];
                            $param['project_id'] = $post_data['project_id'];
                            $param['pt_id'] = $post_data['pt_id'];

                        //jika ada kelsub
                            if ($param['kelsub_id'] > 0) {
                                $result = $modelSac->getSubglbycode2($param);
                                $result = $result['result'];
                                if (isset($result[1][0])) {
                                    if (sizeof($result[1][0]) == 0) {
                                        $msg = 'Kelsub : ' . $coa_kelsub . ' (' . $param['kelsub_id'] . ') ' . $param['subgl_codes'] . " tidak ada di master";
                                        array_push($errormsg, $msg);
                                    } else {
                                        $sub['indexdata'] = $i;
                                        $code3 = $result[1][0]['code3'];
                                        $code3 = ($code3 == null) ? $kawasan_sub : $code3;
                                        $code3 = ($code3 !== '') ? $code3 : $kawasan_sub;
                                        $sub['subgl_subgl_id'] = $result[1][0]['subgl_id'];
                                        $sub['subgl_code'] = $result[1][0]['code'];
                                        $sub['subgl_code1'] = $result[1][0]['code1'];
                                        $sub['subgl_code2'] = $result[1][0]['code2'];
                                        $sub['subgl_code3'] = $code3;
                                        $sub['subgl_code4'] = $result[1][0]['code4'];
                                        $sub['kelsub_sub'] = $result[1][0]['description'];
                                        $sub['kelsub_kelsub_id'] = $param['kelsub_id'];
                                        $sub['journaldetail_indexdata'] = $i;
                                        $subData[$i][$coa_acc][$type_acc] =  $sub;
                                    }
                                } else {
                                    $msg = 'Kelsub : ' . $coa_kelsub . ' (' . $param['kelsub_id'] . ') ' . $param['subgl_codes'] . " tidak ada di master";
                                    array_push($errormsg, $msg);
                                }
                            }
                        }
                    }
                }

                if (sizeof($coaBank) == 0 && $coa_bank !== '00.00.000') {
                    $msg = "File excel tidak mengandung coa Bank : " . $coa_bank . " ";
                    array_push($errormsg, $msg);
                }

                if ($total_d !== $total_c) {
                    $msg = "Total Debit / Credit tidak balance D:" . $total_d . " C:" . $total_c;
                    array_push($errormsg, $msg);
                }

                if (sizeof($errormsg) > 0) {
                //dont execute
                } else {
                    $model = new Gl_Models_Journal();
                    $max = $i;
                    $i = 1;
                    $param['project_id'] = $post_data['project_id'];
                    $param['pt_id'] = $post_data['pt_id'];
                    $param['journal_id'] = $journal_id;
                    $res = $model->accountjournalDirectDeleteAll($param);


                //INPUT 1 DETAIL 1 SUB
                    $i = 1;
                    for ($i = 1; $i <= $max; $i++) {
                        foreach ($accData[$i] as $coa => $detail) {
                            if (isset($detail['D'])) {
                                $res = $model->accountjournalDirectCreate($detail['D']);
                                if (isset($subData[$i][$coa]['D'])) {
                                    $param = $subData[$i][$coa]['D'];
                                    $param['journaldetail_journaldetail_id'] = $res[1][0]['journaldetail_id'];
                                    $res = $model->subaccountDirectCreate($param);
                                }
                            }
                            if (isset($detail['C'])) {
                                $res = $model->accountjournalDirectCreate($detail['C']);
                                if (isset($subData[$i][$coa]['C'])) {
                                    $param = $subData[$i][$coa]['C'];
                                    $param['journaldetail_journaldetail_id'] = $res[1][0]['journaldetail_id'];
                                    $res = $model->subaccountDirectCreate($param);
                                }
                            }
                        }
                    }

                //JIKA 1 DETAIL MULTI SUB
                    if ($groupingdata == 1) {
                        $param['project_id'] = $post_data['project_id'];
                        $param['pt_id'] = $post_data['pt_id'];
                        $param['journal_id'] = $journal_id;
                        $res = $model->singledetailmultisubConvert($param);
                    }
                }
                $this->getResponse()->setHeader('Content-Type', 'application/json');
                $result = array('data' => array($accData, $subData), 'total' => 0, 'success' => true, 'error' => array_unique($errormsg, SORT_REGULAR));
            //end try
            } catch (Exception $e) {
            //start catch
                $msg = "Technical Error";
                array_push($errormsg, $msg);
                $this->getResponse()->setHeader('Content-Type', 'application/json');
                $result = array('data' => array(array(), array()), 'total' => 0, 'success' => true, 'error' => array_unique($errormsg, SORT_REGULAR));
            //end catch
            }

            echo Zend_Json::encode($result);
            $this->_helper->viewRenderer->setNoRender(true);
        }

        function checknomorjournalRead()
        {
            $params = $this->getRequest()->getPost();
            $session = Apli::getSession();
            $request = Apli::getRequest($params);
            $objectCreator = $this->getObject();
            $objectCreator->setProject($session->getProject());
            $objectCreator->setPt($session->getPt());
            $dao = $this->getDao();
            $cek = array();
            $cek = $dao->checkNoJournal($objectCreator, $request, $session);
            if (sizeof($cek) > 0) {
                $hasil = $cek[0];
            } else {
                $hasil = $cek;
            }

            return array(
                "data" => array(
                    "hasil" => $hasil
                ),
            );
        }

        function checkmonthclosingRead()
        {
            $params = $this->getRequest()->getPost();
            $session = Apli::getSession();
            $request = Apli::getRequest($params);
            $objectCreator = $this->getObject();
            $objectCreator->setProject($session->getProject());
            $objectCreator->setPt($session->getPt());
            $dao = $this->getDao();
            $cek = array();
            $cek = $dao->checkmonthclosing($objectCreator, $request, $session);

            if (sizeof($cek) > 0) {
                $hasil = $cek[0];
            } else {
                $hasil = $cek;
            }

            return array(
                "data" => array(
                    "result" => $hasil
                ),
            );
        }

        function getquickdetailRead()
        {
            $params = $this->getRequest()->getPost();
            $session = Apli::getSession();
            $request = Apli::getRequest($params);
            $objectCreator = $this->getObject();
            $objectCreator->setProject($session->getProject());
            $objectCreator->setPt($session->getPt());
            $dao = $this->getDao();
            $cek = array();
            $cek = $dao->getQuickDetail($objectCreator, $request, $session);
            if (sizeof($cek) > 0) {
                $hasil = $cek[0];
            } else {
                $hasil = $cek;
            }

            return array(
                "data" => array(
                    "hasil" => $hasil
                ),
            );
        }

        public function importsubRead()
        {
            $post_data = $this->getRequest()->getPost();
            $post_data['start'] = 0;
            $post_data['limit'] = 10000;
            $coa_id = $post_data['coa'];
            $journal_id = $post_data['journal_id'];
            $kelsub_kelsub_id = $post_data['kelsub_kelsub_id'];

            $errormsg = array();

            try {

                $tmpName = $_FILES['file-path']['tmp_name'];
                $path = $_FILES['file-path']['name'];

                $ext = pathinfo($path, PATHINFO_EXTENSION);

                if ($ext != 'csv') {
                   $msg = "Technical Error";
                   array_push($errormsg, $msg);
                   $this->getResponse()->setHeader('Content-Type', 'application/json');
                   $result = array('success' => false, 'res' => 1,'error' => array_unique($errormsg, SORT_REGULAR));
                   echo Zend_Json::encode($result);
                   $this->_helper->viewRenderer->setNoRender(true);
                   exit();
                }

               $cleaneds = array();

               $raw = file($tmpName);
               foreach ($raw as $r) {
                $rclean = str_replace(",", "~", $r);
                array_push($cleaneds, $rclean);
            }

            //$csvAsArray = array_map('str_getcsv', file($tmpName));
            $csvAsArray = array_map('str_getcsv', $cleaneds);

            $arrData =  array();
            $accData =  array();
            $subData =  array();
            //jika format csv titik koma ';'
            $i = 0;
            foreach ($csvAsArray as $c) {
                if ($i > 0) {
                    $arr = explode(';', $c[0]);
                    array_push($arrData, $arr);
                }
                $i++;
            }
            //jika format csv koma ','

            $i = 0;
            if (sizeof($arrData[0]) == 1) {
                $csvAsArray = array();
                $arrData =  array();
                $file = fopen($tmpName, "r");
                while (!feof($file)) {
                    $csvAsArray[] = fgetcsv($file, null, ',');
                }
                foreach ($csvAsArray as $c) {
                    if($i > 0){
                        array_push($arrData, $c);
                    }
                    $i++;
                }
            }

            $myData =  array();
            $item =  array();

            $mJournal = new Gl_Models_Journal();

            $txt = '';

            $item = array(
                'pt' => $post_data['pt_id'],
                'project' => $post_data['project_id'],
                'coa' => $coa_id,
                'kelsub_id' => $kelsub_kelsub_id
            );
            $g = 0;
            $aaa = array();

            for ($j=0; $j < count($arrData) ; $j++) {
                $res= $mJournal->checkSubglImport($item, trim($arrData[$j][0]),$journal_id,1,trim($arrData[$j][1]));

                if ($res[0][0]['total_subgl'] == 0) {
                   array_push($aaa, 1);
                   $msg = "Technical Error";
                   array_push($errormsg, $msg);
                   $this->getResponse()->setHeader('Content-Type', 'application/json');
                   $result = array('success' => false, 'res' => 0,'error' => array_unique($errormsg, SORT_REGULAR));
                   echo Zend_Json::encode($result);
                   $this->_helper->viewRenderer->setNoRender(true);
                   exit();
               }
           }

           for ($j=0; $j < count($arrData) ; $j++) { 
                for ($k=0; $k < 3 ; $k++) {
                    if($k == 0){
                        $txt = trim($arrData[$j][0]);
                    }
                    $myData[$j][$k] = trim($arrData[$j][$k]);
                }

                $checkSubglImport = $mJournal->checkSubglImport($item, $txt,$journal_id,2, NULL);

                foreach ($checkSubglImport[0] as $r) {
                    $myData[$j][3] = trim($r['code']);
                    $myData[$j][4] = trim($r['code1']);
                    $myData[$j][5] = trim($r['code2']);
                    $myData[$j][6] = trim($r['code3']);
                    $myData[$j][7] = trim($r['code4']);
                    $myData[$j][8] = trim($r['description']);
                    $myData[$j][9] = trim($r['kelsub']);
                    $myData[$j][10] = trim($r['kelsub_id']);
                    $myData[$j][11] = trim($r['subgl_id']);
                }
            }
            $this->getResponse()->setHeader('Content-Type', 'application/json');
            $result = array('data' => $myData, 'total' => count($myData), 'success' => true, 'error' => array_unique($errormsg, SORT_REGULAR));
                //end try
        } catch (Exception $e) {
                //start catch
            $msg = "Technical Error";
            array_push($errormsg, $msg);
            $this->getResponse()->setHeader('Content-Type', 'application/json');
            $result = array('data' => array(array(), array()), 'total' => 0, 'success' => true, 'error' => array_unique($errormsg, SORT_REGULAR));
                //end catch
        }

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    public function journallogRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $session = Apli::getSession();
        $params['user_id'] = $session->getUser()->getId();

        $data = $dao->journallog($params);
        
        return array(
                "data" => $data[0],
                "totalRow" => count($data[0]),
                "msg" => 'Success'
        );
    }
}
