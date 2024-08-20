<?php

require_once dirname(__DIR__) . '../library/apli/ApliCashierController.php';

class Cashier_VoucherController extends ApliCashierController {

    public function init() {
        $this->setDao(new Cashier_Models_Transaction_VoucherDao());
        $this->setValidator(new Cashier_Models_Validator_VoucherValidator());
        $this->setObject(new Cashier_Models_Master_Kasbank());
        $validator = $this->getValidator();
        $validator->controller = $this;
    }

    public function allRead() {

        $params = $this->getRequest()->getPost();
        $cashiereq = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'kasbank', array('payment', 'voucherprefix', 'prefix', 'department', 'cheque', 'purchaselettertransaction', 'unitb', 'project', 'pt', 'plafon', 'vendor', 'coa'), array("deletedRows", "deletedsubRows", "detailcoa", "detailar", "detailescrow", "subdetailcoa", "voucher_generate", "paymentflag", "detailotherpayment", "deletedOtherPaymentRows", "department_id", "deletedarpayment", "deletedarpaymentesc", "is_reimburse", "reimburse_kasbank_id", "is_pettycashloan", "pettycashloan_kasbon_id","attachmentdetail","deletedattachment","detailnonlink","deletednonlink")));
        $objectCreator = $this->getObject();
        $objectCreator->setProject($session->getProject());
        $objectCreator->setPt($session->getPt());
        $dao = $this->getDao();
        $deptHasil = $dao->getCustomRead('detaildeptdirect', $cashiereq, $session);
        $dm->setObject($dao);
        $dm->setDao($dao);
        $hasil = $dao->getByProjectPtWithPageSearch($objectCreator, $cashiereq, $session);
        $dm->setHasil($hasil);
        $dl = $dm->getDataList();
        $dl->setDataDao($hasil);
        $hasilData = Apli::prosesDao($dm->getDataList());
        //print_r($deptHasil);
        return array(
            "model" => Apli::generateExtJSModel($dm->getDataList()),
            "data" => $hasilData["data"],
            "totalRow" => $hasilData["row"],
            "department" => empty($deptHasil[0]) ? 0 : $deptHasil[0][0]
        );
    }

    public function detailRead() {

        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        // $deptHasil = $dao->getCustomRead('detaildept', $request, $session);
        $ptHasil = $dao->getCustomRead('detailpt', $request, $session);
        $projectHasil = $dao->getCustomRead('detailproject', $request, $session);
        // $kasbankHasil = $dao->getCustomRead('kasbank', $request, $session);
        $paymentmethodHasil = $dao->getCustomRead('paymentmethod', $request, $session);
//        $undangancpmsHasil = $dao->getCustomRead('undangancpms', $request, $session);
        // $deptModel = Apli::generateExtJSModelDirect('department');
        $ptModel = Apli::generateExtJSModelDirect('pt');
//        $undangancpmsModel = Apli::generateExtJSModelDirect('undangancpms');
        $projectModel = Apli::generateExtJSModelDirectWithDetail('multiproject', array('user', 'project'));
        // $kasbankModel = Apli::generateExtJSModelDirectWithDetail('voucherprefix', array('prefix', 'coa'));
        $paymentmethodModel = Apli::generateExtJSModelDirect('paymentmethod');

        return array(
            "data" => array(
//                "dept" => array(
//                    "model" => $deptModel,
//                    "data" => $deptHasil[0]
//                ),
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
//                "undangancpms" => array(
//                    "model" => $undangancpmsModel,
//                    "data" => $undangancpmsHasil[0]
//                ),
//                "kasbank" => array(
//                    "model" => $kasbankModel,
//                    "data" => $kasbankHasil[0]
//                ),
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
            "msg" => $validator->getMsg()
        );
    }

    public function mainDelete() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $data = json_decode($params['data'], true);
        $user = $session->getUser()->getId();
        $deletedId = array();
        $deletedPaymentId = array();
        $deletedReason = array();
        if (count($data) !== count($data, COUNT_RECURSIVE)) {
            foreach ($data as $row => $index) {
                $deletedId[$row] = $index['kasbank_id'];
                $deletedPaymentId[$row] = $index['payment_id_erems'];
                $deletedReason[$row] = $index['reason_delete'];
            }
            $send = implode('~', $deletedId);
            $paymentid = implode('~', $deletedPaymentId);
            $reason_delete= implode('~', $deletedReason);
        } else {
            $send = $data['kasbank_id'];
            $paymentid = $data['payment_id_erems'];
            $reason_delete = $data['reason_delete'];
        }
        $dao = $this->getDao();

        $hasil = $dao->deleteData($user, $send, $request, $paymentid, $reason_delete);

        $status = '';
        $msg = '';
        $total = '';



        if (!empty($hasil)) {
            if (!empty($hasil[0])) {

                if (array_key_exists('result', $hasil[0][0])) {
                    if ($hasil[0][0]['result']) {
                        $status = TRUE;
                        $total = $hasil[0][0]['result'];
                    } else {
                        $status = FALSE;
                        $total = 0;
                        $msg = $hasil[2][0]['msg'];
                    }
                } else if (array_key_exists('ErrorMessage', $hasil[0][0])) {
                    $status = FALSE;
                    $total = 0;
                    $msg = $hasil[2][0]['msg'];
                }
            } else {
                $status = FALSE;
                $total = 0;
                $msg = 'Failed to delete data';
            }
        }

//        print_r($hasil);
//        if ($hasil[0][0]['result']) {
//            $status = TRUE;
//        } else {
//            $status = FALSE;
//        }
        return array(
            "success" => $status,
            "total" => $total,
            "msg" => $msg
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
        // print_r(Cashier_Box_GlobalParams::$running_sp);die;
        $blockModel = Apli::generateExtJSModelDirect('blocktran');
        $ptHasil = $dao->getCustomRead('detailpt', $request, $session);
        $ptModel = Apli::generateExtJSModelDirectWithDetail('pt', 'project');

        $bankHasil = $dao->getCustomRead('detailbank', $request, $session);
        $bankModel = Apli::generateExtJSModelDirect('bank');

        $prefixHasil = $dao->getCustomRead('detailprefix', $request, $session);
        $prefixModel = Apli::generateExtJSModelDirectWithDetail('voucherprefix', array('prefix', 'coa'));

        $projectHasil = $dao->getCustomRead('detailproject', $request, $session);
        $projectModel = Apli::generateExtJSModelDirectWithDetail('multiproject', array('user', 'project'));

        $ptcashbonHasil = $dao->getCustomRead('detailptforcashbon', $request, $session);
        $ptcashbonModel = Apli::generateExtJSModelDirectWithDetail('ptforcashbon', array('pt', 'project'));
        
        $clusterHasil = $dao->getCustomRead('clusterpt', $request, $session);
        $clusterModel = Apli::generateExtJSModelDirect('cluster');

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
                "prefix" => array(
                    "model" => $prefixModel,
                    "data" => $prefixHasil[0]
                ),
                "ptcashbon" => array(
                    "model" => $ptcashbonModel,
                    "data" => $ptcashbonHasil[0]
                ),
                "cluster" => array(
                    "model" => $clusterModel,
                    "data" => $clusterHasil[0]
                ),
            ),
        );
    }

    public function angsuranlistRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $data = Apli::getAppdata($params);
        if(!isset($params['tipeangsuran'])){
            $params['tipeangsuran'] = 'nonkpr';
        }
//        if(!isset($params['virtualaccount_no'])){
//            $params['virtualaccount_no'] = '';
//        }

        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        //  $dataList = new Cashier_Box_Models_App_DataListCreator('', 'unittran', array('unitstatus', 'purchaselettertransaction', 'customer', 'clusterb', 'blockb', 'productcategory', 'type'));
        $dataList = new Cashier_Box_Models_App_DataListCreator('', 'schedule', array('purchaselettertransaction', 'payment', 'paymenttype', 'unitstatus', 'unitb', 'customer', 'clusterb', 'blockb', 'productcategory', 'type', 'project', 'pt', 'voucher'));
        $dm->setDataList($dataList);

        $dao = $this->getDao();
        $unitTran = new Cashier_Models_Unit_UnitTran();
        $unitTran->setArrayTable($params);
        $unitTran->setProject($session->getProject());
        $unitTran->setPt($session->getPt());
        $unitTran->setAddBy($session->getUser()->getId());
        $unitTran->getStatus()->setId(Cashier_Box_Config::UNITSTATUS_SOLD);
        $unitTran->getBlock()->setId(Cashier_Box_Tools::cleanComboData($data, 'block_id'));
        $hasil = $dao->getAllNonLunas($request, $unitTran,$params['tipeangsuran']);
        $dm->setHasil($hasil);
        $dl = $dm->getDataList();
        $dl->setDataDao($hasil);
        $hasilData = Apli::prosesDao($dm->getDataList());

//        var_dump($hasilData["data"]);
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
        $dataList = new Cashier_Box_Models_App_DataListCreator('', 'scheduleescrow', array('purchaselettertransaction', 'schedule', 'payment', 'unitstatus', 'unitb', 'customer', 'clusterb', 'blockb', 'productcategory', 'type', 'project', 'pt', 'voucher', 'plafon'));
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
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'cheque', array('bank', 'pt', 'voucherprefix'), array("deletedRows")));
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

    public function customerlistRead() {
        $params = $this->getRequest()->getPost();
        $req = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'customer', array(), array()));
        $objectCreator = new Cashier_Models_Master_Customer();
        $objectCreator->setProject($session->getProject());
        $objectCreator->setPt($session->getPt());
        $dao = $this->getDao();
        $dm->setObject($objectCreator);
        $dm->setDao($dao);
        $hasil = $dao->getCustomerList($req, $objectCreator, $session);
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

    public function komisiklaimlistRead() {
        $params = $this->getRequest()->getPost();
        $req = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'komisiklaim', array(), array()));
        $objectCreator = new Cashier_Models_Master_Komisiklaim();
        $objectCreator->setProject($session->getProject());
        $objectCreator->setPt($session->getPt());
        $dao = $this->getDao();
        $dm->setObject($objectCreator);
        $dm->setDao($dao);
        $hasil = $dao->getKomisiklaimList($req, $objectCreator, $session);
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

    public function kasbonklaimlistRead() {
        $params = $this->getRequest()->getPost();
        $req = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'kasbonklaim', array(), array()));
        $objectCreator = new Cashier_Models_Master_Komisiklaim();
        $objectCreator->setProject($session->getProject());
        $objectCreator->setPt($session->getPt());
        $dao = $this->getDao();
        $dm->setObject($objectCreator);
        $dm->setDao($dao);
        $hasil = $dao->getKasbonklaimList($req, $objectCreator, $session);
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
        $dataList = new Cashier_Box_Models_App_DataListCreator('', 'voucherdetail', array('coa', 'kelsub', 'subgl', 'cashflow', 'cashflowtype'), array());
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

        $dao->session = $session;
        $dao->template = $template;
        if (!empty($data['kasbank_id'])) {
            $dao->th_kasbank_id = $data['kasbank_id'];
        }
        if (!empty($data['purchaseletter_pencairankpr_id'])) {
            $dao->purchaselleterKprId = $data['purchaseletter_pencairankpr_id'];
        }
        if (!empty($data['paymenttype_id'])) {
            $dao->paymenttype = $data['paymenttype_id'];
        }
        $hasil = $dao->getDetailByTemplate($dao, $request);
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

    public function generatetemplatecoapajakRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dataList = new Cashier_Box_Models_App_DataListCreator('', 'voucherdetail', array('coa', 'kelsub', 'subgl', 'cashflow', 'cashflowtype'), array());
        $dao = new Cashier_Models_Master_CoaConfigDao();
        $data = $params;
        $request = Apli::getRequest($params);
        $hasil = $dao->getDetailByTemplatePajak($dao, $request);
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
    public function voucheridRead() {
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
                                "vid" => 0
                            )
                        )
                    );
                }
            } elseif (isset($cek[0])) {
                $hasil = array(
                    array(
                        array(
                            "vid" => 2
                        )
                    )
                );
            } else {
                $hasil = array(
                    array(
                        array(
                            "vid" => 0
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

    public function subdetailcoaRead() {
        $params = $this->getRequest()->getPost();
        $req = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'vouchersubdetail', array('voucherdetail', 'kelsub', 'subgl'), array("")));
        $objectCreator = new Cashier_Models_Transaction_Vouchersubdetail();
        $objectCreator->setProject($session->getProject());
        $objectCreator->setPt($session->getPt());
        $dao = new Cashier_Models_Transaction_VoucherDao();
        $dm->setObject($objectCreator);
        $dm->setDao($dao);
        $hasil = $dao->getSubDetail($objectCreator, $req, $session);
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
            "kasbank_id" => $validator->kasbank_id,
        );
    }

    public function initRead() {

        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();

//        $deptHasil = $dao->getCustomRead('detaildept', $request, $session);
//        $deptModel = Apli::generateExtJSModelDirect('department');

        $request->setModule('global');
        $ptHasil = $dao->getCustomRead('detailpt', $request, $session);
        $projectHasil = $dao->getCustomRead('detailproject', $request, $session);
        $setdata = new Cashier_Models_General_Setdata();
        $departmentHasil = $setdata->getEmployeedata();
        //  $departmentHasil = $dao->getCustomRead('detaildeptuser', $request, $session);
        $ptModel = Apli::generateExtJSModelDirectWithDetail('pt', 'project', 'multiprojectdetail');
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
                "department" => array(
                    "department_id" => $departmentHasil['department_id']
                ),
//                "departmentlist" => array(
//                    "data" => $deptHasil[0],
//                    "model" => $deptModel
//                ),
                "FILE_REPORT" => Cashier_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($session->getProject()->getId(), $session->getPt()->getId())->getMasterChequePaymentListReport(),
            ),
        );
    }

    public function arpaymentRead() {
        $params = $this->getRequest()->getPost();
        $req = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'voucherardetail', array('kasbank', 'customer', 'unit', 'purchaselettertransaction', 'project', 'pt','payment','paymenttype','unitb','schedule','scheduletype'), array("")));
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
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'voucherescrowdetail', array('kasbank', 'customer', 'unit', 'purchaselettertransaction','scheduleescrow'), array("")));
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
    
    
    public function cashbonpaymentRead() {
        $params = $this->getRequest()->getPost();
        $req = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'vouchercashbondetail', array("kasbank"), array("")));
        $objectCreator = new Cashier_Models_Transaction_Vouchercashbondetail();
        $objectCreator->setProject($session->getProject());
        $objectCreator->setPt($session->getPt());
        $dao = new Cashier_Models_Transaction_VoucherDao();
        $dm->setObject($objectCreator);
        $dm->setDao($dao);
        $hasil = $dao->getCashbonpayment($objectCreator, $req);
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

    public function vendorlistRead() {
        $params = $this->getRequest()->getPost();
        $req = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'vendor', array(), array()));
        $objectCreator = new Cashier_Models_Master_Vendor();
        $objectCreator->setProject($session->getProject());
        $objectCreator->setPt($session->getPt());
        $dao = $this->getDao();
        $dm->setObject($objectCreator);
        $dm->setDao($dao);
        $hasil = $dao->getVendorList($req, $objectCreator, $session);
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

    public function getsubgltempRead() {
        $params = $this->getRequest()->getPost();
        $req = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'subgl', array(), array()));
        $objectCreator = new Cashier_Models_Master_SubLedger();
        $objectCreator->setProject($session->getProject());
        $objectCreator->setPt($session->getPt());
        $dao = $this->getDao();
        $dm->setObject($objectCreator);
        $dm->setDao($dao);
        $hasil = $dao->getSubgllist($req, $objectCreator, $session);
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

    public function getprefixRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $Hasil = $dao->getCustomRead('', $request, $session);
        return array(
            "data" => array(
                "result" => $Hasil[0][0]['prefix'],
                "counter" => str_pad($Hasil[0][0]['counter'], 4, '0', STR_PAD_LEFT)
            ),
        );
    }
    
    
    public function getvcrprefixcashRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $Hasil = $dao->getCustomRead('', $request, $session);
        return array(
            "data" => (!isset($Hasil[0][0])?"0":$Hasil[0][0]),
        );
    }


    public function realizationvoucherCreate() {
        $this->allRead();
        $params = $this->getRequest()->getPost();
        $request = Apli::getRequest($params);
        $data = Apli::getAppdata($params);
        $session = Apli::getSession();
        $objectCreator = $this->getObject();
        Cashier_Box_Tools::setArrayTable($objectCreator, $data);
        $objectCreator->setAddBy($session->getUser()->getId());
        $objectCreator->setProjectPt($session->getProject(), $session->getPt());
        $validator = new Cashier_Models_Validator_VoucherRealizationValidator();
        $validator->appRequest = $request;
        $validator->session = $session;
        $validator->action = $this->getRequest()->getActionName();
        $validator->paramdata = $data;
        $validator->run($objectCreator);
        return array(
            "success" => $validator->getStatus(),
            "msg" => $validator->getMsg(),
            "total" => $validator->getTotal()
        );
    }

    public function postingCreate() {
        $this->allRead();
        $params = $this->getRequest()->getPost();
        $request = Apli::getRequest($params);
        $data = Apli::getAppdata($params);
        
        $session = Apli::getSession();
        $objectCreator = $this->getObject();
        Cashier_Box_Tools::setArrayTable($objectCreator, $data);
        $objectCreator->setAddBy($session->getUser()->getId());
        $objectCreator->setProjectPt($session->getProject(), $session->getPt());
        $validator = new Cashier_Models_Validator_VoucherPostingValidator();
        $validator->appRequest = $request;
        $validator->session = $session;
        $validator->action = $this->getRequest()->getActionName();
        $validator->paramdata = $data;
        $validator->run($objectCreator);

        if ($validator->getStatus()) {
            //API 
            $this->updatevoucherposting_API($data[0]['kasbank_id']);    
        }

        return array(
            "success" => $validator->getStatus(),
            "msg" => $validator->getMsg(),
            "total" => $validator->getTotal()
        );
    }

    public function unpostingCreate() {
        $this->allRead();
        $params = $this->getRequest()->getPost();
        $request = Apli::getRequest($params);
        $data = Apli::getAppdata($params);
        $session = Apli::getSession();
        $objectCreator = $this->getObject();
        Cashier_Box_Tools::setArrayTable($objectCreator, $data);
        $objectCreator->setAddBy($session->getUser()->getId());
        $objectCreator->setProjectPt($session->getProject(), $session->getPt());
        $validator = new Cashier_Models_Validator_VoucherUnPostingValidator();
        $validator->appRequest = $request;
        $validator->session = $session;
        $validator->action = $this->getRequest()->getActionName();
        $validator->paramdata = $data;
        $validator->run($objectCreator);
        return array(
            "success" => $validator->getStatus(),
            "msg" => $validator->getMsg(),
            "total" => $validator->getTotal()
        );
    }

    public function checkunitRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $Hasil = $dao->getCustomRead('', $request, $session);
        return array(
            "data" => array(
                "result" => $Hasil[0][0]['result']
            ),
        );
    }

    public function checkmutipleunitRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $Hasil = array();
        $Hasil = $dao->getCustomRead('', $request, $session);
        $result = array();
        $vid = 0;
        $unit = 0;
        if (is_array($Hasil)) {
            if (array_key_exists('result', $Hasil[0])) {
                $result = $Hasil[0][0]['result'];
                $vid = $Hasil[0][0]['vid'];
                $unit = $Hasil[0][0]['unit_number'];
            } else {
                if (!empty($Hasil[0])) {
                    $result = $Hasil[0][0]['result'];
                    $vid = $Hasil[0][0]['vid'];
                    $unit = $Hasil[0][0]['unit_number'];
                }
            }
        }
        return array(
            "data" => array(
                "result" => $result,
                "vid" => $vid,
                "unit_number" => $unit,
            ),
        );
    }

    public function checkdendaRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $Hasil = $dao->getCustomRead('', $request, $session);
        return array(
            "data" => array(
                "result" => $Hasil[0][0]['result']
            ),
        );
    }

    public function chequeinfoRead() {

        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $chequeinfo = $dao->getCustomRead('', $request, $session);

        return array(
            "data" => array(
                "prefix" => $chequeinfo[0][0]['description'],
                "prefix_id" => $chequeinfo[0][0]['voucherprefix_id'],
                "issued_date" => $chequeinfo[0][0]['issued_date'] == '1900-01-01 00:00:00.000' ? '' : $chequeinfo[0][0]['issued_date'],
            ),
        );
    }

    public function paymentvoucherCreate() {
        $this->allRead();
        $params = $this->getRequest()->getPost();
        $request = Apli::getRequest($params);
        $data = Apli::getAppdata($params);
        $session = Apli::getSession();
        $objectCreator = $this->getObject();
        Cashier_Box_Tools::setArrayTable($objectCreator, $data);
        $objectCreator->setAddBy($session->getUser()->getId());
        $objectCreator->setProjectPt($session->getProject(), $session->getPt());
        $validator = new Cashier_Models_Validator_VoucherPaymentValidator();
        $validator->appRequest = $request;
        $validator->session = $session;
        $validator->action = $this->getRequest()->getActionName();
        $validator->paramdata = $data;
        $validator->run($objectCreator);
        return array(
            "success" => $validator->getStatus(),
            "msg" => $validator->getMsg()
        );
    }

    public function vendorCreate() {
        $this->allRead();
        $params = $this->getRequest()->getPost();
        $request = Apli::getRequest($params);
        $data = Apli::getAppdata($params);
        $session = Apli::getSession();
        $objectCreator = new Cashier_Models_Master_Vendor();
        Cashier_Box_Tools::setArrayTable($objectCreator, $data);
        $objectCreator->setAddBy($session->getUser()->getId());
        $objectCreator->setProjectPt($session->getProject(), $session->getPt());
        $validator = new Cashier_Models_Validator_VendorValidator();
        $validator->appRequest = $request;
        $validator->session = $session;
        $validator->action = $this->getRequest()->getActionName();
        $validator->paramdata = $data;
        $validator->run($objectCreator);
        return array(
            "success" => $validator->getStatus(),
            "msg" => $validator->getMsg(),
            "id" => $validator->getReturnId()
        );
    }

    public function unitlistRead() {
        $params = $this->getRequest()->getPost();
        $req = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('unit', 'customer', 'project', 'pt'), array()));
        $objectCreator = new Cashier_Models_Purchaseletter_PurchaseLetterTransaction();
        $objectCreator->setProject($session->getProject());
        $objectCreator->setPt($session->getPt());
        $dao = $this->getDao();
        $dm->setObject($objectCreator);
        $dm->setDao($dao);
        $hasil = $dao->getUnitList($req, $objectCreator, $session);
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

    public function otherpaymentRead() {
        $params = $this->getRequest()->getPost();
        $req = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'voucherotherpaymentdetail', array('kasbank', 'customer', 'unit', 'purchaselettertransaction', 'paymenttype'), array("")));
        $objectCreator = new Cashier_Models_Transaction_Voucherotherpaymentdetail();
        $objectCreator->setProject($session->getProject());
        $objectCreator->setPt($session->getPt());
        $dao = new Cashier_Models_Transaction_VoucherDao();
        $dm->setObject($objectCreator);
        $dm->setDao($dao);
        $hasil = $dao->getOtherPayment($objectCreator, $req);
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

    public function vendorcodeRead() {

        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $vendorcode = $dao->getCustomRead('', $request, $session);


        return array(
            "data" => array(
                "code" => $vendorcode[0][0]['code'],
                 "project_code" => $vendorcode[1][0]['project_code'],
            ),
        );
    }

    public function deptbyptRead() {

        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $deptHasil = $dao->getCustomRead('detaildeptdirect', $request, $session);
        return array(
            "data" => array(
                "department" => empty($deptHasil[0]) ? 0 : $deptHasil[0][0]
            ),
        );
    }

    public function checkscheduleRead() {

        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $hasil = $dao->getCustomRead('', $request, $session);
        return array(
            "data" => array(
                "result" => empty($hasil[0]) ? 0 : $hasil[0][0]
            ),
        );
    }

    public function checkmutiplescheduleRead() {

        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $hasil = $dao->getCustomRead('', $request, $session);
        return array(
            "data" => array(
                "result" => empty($hasil[0]) ? 0 : $hasil[0][0]
            ),
        );
    }

    public function getschedulefromkasbankRead() {

        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $hasil = $dao->getCustomRead('', $request, $session);
        return array(
            "data" => array(
                "result" => empty($hasil[0]) ? 0 : $hasil[0][0]['result']
            ),
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
    public function getsubglkasbankidRead() {

        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $hasil = $dao->getCustomRead('', $request, $session);
        return array(
            "data" => empty($hasil) ? 0 : $hasil[0]
        );
    }

    public function postingsummaryCreate() {
        $this->allRead();
        $params = $this->getRequest()->getPost();
        $request = Apli::getRequest($params);
        $data = Apli::getAppdata($params);
        $session = Apli::getSession();
        $objectCreator = $this->getObject();
        Cashier_Box_Tools::setArrayTable($objectCreator, $data);
        $objectCreator->setAddBy($session->getUser()->getId());
        $objectCreator->setProjectPt($session->getProject(), $session->getPt());
        $validator = new Cashier_Models_Validator_VoucherSummaryPostingValidator();
        $validator->appRequest = $request;
        $validator->session = $session;
        $validator->action = $this->getRequest()->getActionName();
        $validator->paramdata = $data;
        $validator->run($objectCreator);
        return array(
            "success" => $validator->getStatus(),
            "msg" => $validator->getMsg(),
            "total" => $validator->getTotal()
        );
    }

    public function pettycashloanCreate() {
        $this->allRead();
        $params = $this->getRequest()->getPost();
        $request = Apli::getRequest($params);
        $data = Apli::getAppdata($params);
        $session = Apli::getSession();
        $objectCreator = $this->getObject();
        Cashier_Box_Tools::setArrayTable($objectCreator, $data);
        $objectCreator->setAddBy($session->getUser()->getId());
        $objectCreator->setProjectPt($session->getProject(), $session->getPt());
        $validator = new Cashier_Models_Validator_PettycashloanValidator();
        $validator->appRequest = $request;
        $validator->session = $session;
        $validator->action = $this->getRequest()->getActionName();
        $validator->paramdata = $data;
        $validator->run($objectCreator);
        return array(
            "success" => $validator->getStatus(),
            "msg" => $validator->getMsg()
        );
    }

    public function getprojectptRead() {

        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $ptHasil = $dao->getCustomRead('', $request, $session);
        $ptModel = Apli::generateExtJSModelDirectWithDetail('pt', 'project');
        return array(
            "data" => array(
                "pt" => array(
                    "model" => $ptModel,
                    "data" => $ptHasil[0]
                ),
            ),
        );
    }

    public function checktemplateuserRead() {

        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $request->setModule('global');
        $data = $dao->getCustomRead('', $request, $session);

        $hasil = 0;
        if ($data) {
            if (is_array($data)) {
                if (!empty($data[0][0])) {
                    $hasil = $data[0][0]['templatedetail_id'];
                }
            }
        }

        return array(
            "data" => array(
                "result" => $hasil
            ),
        );
    }

    public function printpdfRead() {
        return $this->_forward("read", "installmentpayment", "erems");
    }

    public function voucherlistRead() {
        $params = $this->getRequest()->getPost();
        $req = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'kasbank', array('coa'), array()));
        $objectCreator = new Cashier_Models_Master_Vendor();
        $objectCreator->setProject($session->getProject());
        $objectCreator->setPt($session->getPt());
        $dao = $this->getDao();
        $dm->setObject($objectCreator);
        $dm->setDao($dao);
        $hasil = $dao->getVoucherList($req, $objectCreator, $session);
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

    public function getdetailvoucherRead() {
        $params = $this->getRequest()->getPost();
        $req = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'voucherdetail', array('coa', 'kelsub', 'subgl', 'cashflow', 'cashflowtype'), array()));
        $objectCreator = new Cashier_Models_Master_Vendor();
        $objectCreator->setProject($session->getProject());
        $objectCreator->setPt($session->getPt());
        $dao = $this->getDao();
        $dm->setObject($objectCreator);
        $dm->setDao($dao);
        $hasil = $dao->getdetailvoucher($req, $objectCreator, $session);
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

    public function kasbonlistRead() {
        $params = $this->getRequest()->getPost();
        $req = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'kasbon', array('coa', 'pt', 'project'), array()));
        $objectCreator = new Cashier_Models_Master_Vendor();
        $objectCreator->setProject($session->getProject());
        $objectCreator->setPt($session->getPt());
        $dao = $this->getDao();
        $dm->setObject($objectCreator);
        $dm->setDao($dao);
        $hasil = $dao->getKasbonlist($req, $objectCreator, $session);
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

    public function getsupplierbankRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $data = $dao->getCustomRead('', $request, $session);
        return array(
            "data" => array(
                "vendor_id" => $data[0][0]['vendor_id'],
                "customer_name" => $data[0][0]['customer_name']
            ),
        );
    }
    
    public function checkcoabycompanyRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
//        var_dump($params);
        $data = $dao->iscoaexist($params);
        if(!isset($data[0][0])){
            $data[0][0]['IS_EXIST'] = 0;
            $data[0][0]['coa_id'] = 0;
            $data[0][0]['kelsub_id'] = 0;
            $data[0][0]['kelsub'] = '';
            $data[0][0]['description'] = '';
            $data[0][0]['coa_description'] = '';
        }
        return array(
            "data" => array(
                "IS_EXIST" => ($data[0][0]['IS_EXIST']==0?false:true),
                "coa_id" => $data[0][0]['coa_id'],
                "kelsub_id" => $data[0][0]['kelsub_id'],
                "kelsub" => $data[0][0]['kelsub'],
                "description" => $data[0][0]['description'],
                "coa_description" => $data[0][0]['coa_description']
            ),
        );
    }

    public function subcodelistRead() {
        $params = $this->getRequest()->getPost();
        $req = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'subgl', array('coa', 'pt', 'project'), array()));
        $objectCreator = new Cashier_Models_Master_SubLedger();
        $objectCreator->setProject($session->getProject());
        $objectCreator->setPt($session->getPt());
        $dao = $this->getDao();
        $dm->setObject($objectCreator);
        $dm->setDao($dao);
        $hasil = $dao->getSubgl($req, $objectCreator, $session);
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
    
    
    public function reffvcrRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'kasbank', array('payment', 'voucherprefix', 'prefix', 'department', 'cheque', 'purchaselettertransaction', 'unitb', 'project', 'pt', 'plafon', 'vendor', 'coa'), array("deletedRows", "deletedsubRows", "detailcoa", "detailar", "detailescrow", "subdetailcoa", "voucher_generate", "paymentflag", "detailotherpayment", "deletedOtherPaymentRows", "department_id", "deletedarpayment", "deletedarpaymentesc", "is_reimburse", "reimburse_kasbank_id", "is_pettycashloan", "pettycashloan_kasbon_id","attachmentdetail","deletedattachment","detailnonlink","deletednonlink")));
        $dao = $this->getDao();
        $dm->setObject($dao);
        $dm->setDao($dao);
        $data = $dao->getCustomPagingRead('', $request, $session);
        $dm->setHasil($data);
        $dl = $dm->getDataList();
        $dl->setDataDao($data);
        $hasilData = Apli::prosesDao($dm->getDataList());
        //print_r($deptHasil);
        return array(
            "model" => Apli::generateExtJSModel($dm->getDataList()),
            "data" => $hasilData["data"],
            "totalRow" => $hasilData["row"]
        );
    }

    public function receiptidvcrRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'masterreceipt', array( 'pt', 'project'), array()));
        $dao = $this->getDao();
        $dm->setObject($dao);
        $dm->setDao($dao);
        $data = $dao->getCustomPagingRead('', $request, $session);
        $dm->setHasil($data);
        $dl = $dm->getDataList();
        $dl->setDataDao($data);
        $hasilData = Apli::prosesDao($dm->getDataList());
        //print_r($deptHasil);
        return array(
            "model" => Apli::generateExtJSModel($dm->getDataList()),
            "data" => $hasilData["data"],
            "totalRow" => $hasilData["row"]
        );
    }
    public function subdetailcheckRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->checksubdetail($params);
        if(!isset($data[0][0])){
            $data[0][0]['ERROR'] = 0;
        }
        return array(
            "data" => array(
                "ERROR" => ($data[0][0]['ERROR']==0?false:true),
            ),
        );
    }

    public function checktemplate3rangkapRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $params['is_preprinted']=0;
        $data = $dao->checktemplate3rangkap($params);
        return array(
            "data" => array(
                "template" => (!isset($data[0][0]['template'])?'':$data[0][0]['template']),
            ),
        );
    }
    public function checktemplate3rangkappreprintedRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $params['is_preprinted']=1;
        $data = $dao->checktemplate3rangkap($params);
        return array(
            "data" => array(
                "template" => (!isset($data[0][0]['template'])?'':$data[0][0]['template']),
            ),
        );
    }
    
    public function voucherprefixcoaprefixcheckRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->checkvoucherprefixcoaprefix($params);
        if(!isset($data[0][0])){
            $data[0][0]['ERROR'] = 0;
        }
        return array(
            "data" => array(
                "ERROR" => ($data[0][0]['ERROR']==0?false:true),
            ),
        );
    }
    public function getallsubdetailRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->getallsubdetail($params);
        return array(
            "data" => $data,
        );
    }
    
    public function checkcoatampunganRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->checkcoatampungan($params);
        if(!isset($data[0][0])){
            $data[0][0]['ERROR'] = 0;
        }
        return array(
            "data" => array(
                "ERROR" => ($data[0][0]['ERROR']==0?false:true),
            ),
        );
    }
    
    public function checkkasbonrealisasiRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->checkkasbonrealisasi($params);
        if(!isset($data[0][0])){
            $data[0][0]['ERROR'] = 0;
        }
        return array(
            "data" => array(
                "ERROR" => ($data[0][0]['ERROR']==0?false:true),
            ),
        );
    }
    
    public function getprefixdetailRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
//        var_dump($params);
        $data = $dao->getprefixdetail($params);
        if(!isset($data[0][0])){
            $data[0][0]['prefix'] = '';
        }
        return array(
            "data" => array(
                "prefix" => $data[0][0]['prefix']
            ),
        );
    }
    
    
    public function checktemplatesetoranRead() {

        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $request->setModule('global');
        $data = $dao->getCustomRead('', $request, $session);

        $hasil = 0;
        if ($data) {
            if (is_array($data)) {
                if (!empty($data[0][0])) {
                    $hasil = $data[0][0]['templatedetail_id'];
                }
            }
        }

        return array(
            "data" => array(
                "result" => $hasil
            ),
        );
    }
    public function getdescriptionkwitansiRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
//        var_dump($params);
        $data = $dao->getdescriptionkwitansi($params);
        if(!isset($data[0][0])){
            $data[0][0]['description_kwitansi_ar'] = '';
            $data[0][0]['amount_kwitansi'] = '';
            $data[0][0]['terbilang_kwitansi'] = '';
            $data[0][0]['dibayarkan_description'] = '';
            $data[0][0]['tanggal_sp'] = '';
        }
        return array(
            "data" => array(
                "description_kwitansi_ar" => ($data[0][0]['description_kwitansi_ar']==""?"":$data[0][0]['description_kwitansi_ar']),
                "amount_kwitansi" => $data[0][0]['amount_kwitansi'],
                "terbilang_kwitansi" => $data[0][0]['terbilang_kwitansi'],
                "terbilang_kwitansi_capitalize" => ucwords(strtolower($data[0][0]['terbilang_kwitansi'])),
                "dibayarkan_description" => $data[0][0]['dibayarkan_description'],
                "tanggal_sp" => $data[0][0]['tanggal_sp']
            ),
        );
    }
    public function checkescrowpaymentrealisasiRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
//        var_dump($params);
        $data = $dao->checkescrowpaymentrealisasi($params);
        if(!isset($data[0][0])){
            $data[0][0]['videscrowpayment'] = '';
        }
        return array(
            "data" => array(
                "videscrowpayment" => ($data[0][0]['videscrowpayment']==""?"":$data[0][0]['videscrowpayment'])
            ),
        );
    }
    public function updatedeletereasonRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = json_decode($params['data'], true);
        $deletedId = array();
        if (count($data) !== count($data, COUNT_RECURSIVE)) {
            foreach ($data as $row => $index) {
                $deletedId[$row] = $index['kasbank_id'];
            }
            $send = implode('~', $deletedId);
        } else {
            $send = $data['kasbank_id'];
        }
        $dataresult = $dao->updatedeletereason($send,$params['message'],$params['pilihandelete']);
        if(!isset($dataresult[0][0])){
            $dataresult[0][0]['RESULT'] = '';
        }
        return array(
            "data" => array(
                "RESULT" => ($dataresult[0][0]['RESULT']==""?"1":$dataresult[0][0]['RESULT'])
            ),
        );
    }
    
    public function getmandatoryfieldRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->getmandatoryfield($params);
        if(!isset($data[0][0])){
            $data[0][0]['is_mandatory'] = 0;
        }
        return array(
            "data" => array(
                "is_mandatory" => $data[0][0]['is_mandatory']
            ),
        );
    }
    
    public function checktemplatevoucherRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->checktemplatevoucher($params);
        return array(
            "data" => array(
                "template" => (!isset($data[0][0]['template'])?'':$data[0][0]['template']),
            ),
        );
    }
    public function getvoucherfdarRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->getvoucherfdar($params);
        return array(
            "data" => array(
                "voucher_id" => (!isset($data[0][0]['voucher_id'])?'':$data[0][0]['voucher_id']),
                "unit_cluster" => (!isset($data[0][0]['unit_cluster'])?'':$data[0][0]['unit_cluster']),
                "uploadcpms_id" => (!isset($data[0][0]['uploadcpms_id'])?0:$data[0][0]['uploadcpms_id']),
                "uploadems_id" => (!isset($data[0][0]['uploadems_id'])?0:$data[0][0]['uploadems_id']),
                "cluster_id" => (!isset($data[0][0]['cluster_id'])?0:$data[0][0]['cluster_id']),
                "idsuratundangan" => (!isset($data[0][0]['idsuratundangan'])?0:$data[0][0]['idsuratundangan']),
                "no_surat_undangan" => (!isset($data[0][0]['no_surat_undangan'])?0:$data[0][0]['no_surat_undangan']),
                "is_cashback" => (!isset($data[0][0]['is_cashback'])?0:$data[0][0]['is_cashback']),
                "auto_cashback" => (!isset($data[0][0]['auto_cashback'])?0:$data[0][0]['auto_cashback']),
                "remainingkasbon" => (!isset($data[0][0]['remainingkasbon'])?0:$data[0][0]['remainingkasbon']),
                "voucherprefixcashbon_id" => (!isset($data[0][0]['voucherprefixcashbon_id'])?0:$data[0][0]['voucherprefixcashbon_id']),
                "subholding_id" => (!isset($data[0][0]['subholding_id'])?0:$data[0][0]['subholding_id']),
                "casboncashbackvid" => (!isset($data[0][0]['casboncashbackvid'])?0:$data[0][0]['casboncashbackvid']),
                "isf9" => (!isset($data[0][0]['isf9'])?0:$data[0][0]['isf9']),
                "kelsub_id" => (!isset($data[0][0]['kelsub_id'])?0:$data[0][0]['kelsub_id']),
                "subgl_id" => (!isset($data[0][0]['subgl_id'])?0:$data[0][0]['subgl_id']),
                "subgl_code" => (!isset($data[0][0]['subgl_code'])?0:$data[0][0]['subgl_code']),
                "isdenda" => (!isset($data[0][0]['isdenda'])?0:$data[0][0]['isdenda']),
                "isnonppn" => (!isset($data[0][0]['isnonppn'])?0:$data[0][0]['isnonppn']),
                "bylegal" => (!isset($data[0][0]['bylegal'])?0:$data[0][0]['bylegal']),
                "isdisablevoucherno" => (!isset($data[0][0]['isdisablevoucherno'])?0:$data[0][0]['isdisablevoucherno']),
                "isprojectclosedate" => (!isset($data[0][0]['isprojectclosedate'])?0:$data[0][0]['isprojectclosedate']),
                "project_close_date" => (!isset($data[0][0]['project_close_date'])?0:$data[0][0]['project_close_date']),
                "excludeamount" => (!isset($data[0][0]['excludeamount'])?0:$data[0][0]['excludeamount']),
                "cashbackcashbonno" => (!isset($data[0][0]['cashbackcashbonno'])?'':$data[0][0]['cashbackcashbonno']),
                "terbilangexcludeamount" => (!isset($data[0][0]['excludeamount'])?'':Cashier_Box_Library_Terbilang::terbilang($data[0][0]['excludeamount'], 3)),
                "request_unrealisasi_message" => (!isset($data[0][0]['request_unrealisasi_message'])?'':$data[0][0]['request_unrealisasi_message']),
                "payment_id_erems" => (!isset($data[0][0]['payment_id_erems'])?'':$data[0][0]['payment_id_erems']),
                "currency_word" => (!isset($data[0][0]['currency_word'])?'':$data[0][0]['currency_word'])
            ),
        );
    }
    public function getestimasidendaRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->getestimasidenda($params);
        return array(
            "data" => array(
                "toleransi_denda" => (!isset($data[0][0]['toleransi_denda'])?'':$data[0][0]['toleransi_denda']),
                "current_denda" => (!isset($data[0][0]['current_denda'])?'':$data[0][0]['current_denda']),
                "denda" => (!isset($data[0][0]['denda'])?'':$data[0][0]['denda']),
                "total_denda" => (!isset($data[0][0]['total_denda'])?'':$data[0][0]['total_denda']),
            ),
        );
    }
    public function checkisexistarRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->checkisexistar($params);
        if(!isset($data[0][0])){
            $data[0][0]['ERROR'] = 0;
        }
        return array(
            "data" => array(
                "ERROR" => ($data[0][0]['ERROR']==0?false:true),
            ),
        );
    }
    public function createcopyvoucherRead() {
        
        $session = Apli::getSession();
        $params = $this->getRequest()->getPost();
        $params['user_id'] = $session->getUser()->getId();
        $dao = $this->getDao();
        $data = $dao->createcopyvoucher($params);
        return array(
            "data" => array(
                "vid" => (!isset($data[0][0]['result'])?'':$data[0][0]['result']),
                "returnmsg" => (!isset($data[0][0]['rmessage'])?'':$data[0][0]['rmessage']),
            ),
        );
    }
    
    public function createpindahvoucherRead() {
        
        $session = Apli::getSession();
        $params = $this->getRequest()->getPost();
        $params['user_id'] = $session->getUser()->getId();
        $dao = $this->getDao();
        $data = $dao->createpindahvoucher($params);
        return array(
            "data" => array(
                "vid" => (!isset($data[0][0]['result'])?'':$data[0][0]['result']),
                "returnmsg" => (!isset($data[0][0]['rmessage'])?'':$data[0][0]['rmessage']),
            ),
        );
    }
    public function updaterealisasicpmsRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->getvoucherfdar($params);
        
        $uploadapi_id = $data[0][0]['uploadapi_id'];
        $uploadcpmsid = $data[0][0]['uploadcpms_id'];

        if ($uploadcpmsid == "" || $uploadcpmsid == '') {
            if ($uploadapi_id != "") {
                $exp_uniqueID = explode('-', $uploadapi_id);

                if (isset($exp_uniqueID[0]) && isset($exp_uniqueID[1]) ) {
                    if (strtoupper($exp_uniqueID[0])  == 'CPMS') {
                        $uploadcpmsid = $exp_uniqueID[1];
                    }
                }

                $uploadcpmsid = $uploadcpmsid;
            }
        }

        $nosuratcpms = $data[0][0]['no_surat_undangan'];
        $idsuratcpms = $data[0][0]['idsuratundangan'];
        $response = "";
        if($uploadcpmsid!='' && $params['master_undangan_id']!=''){
            
            $curl = curl_init();
            
            curl_setopt_array($curl, array(
              CURLOPT_URL => "https://cpms.ciputra.app/api/requestkey",
              CURLOPT_RETURNTRANSFER => true,
              CURLOPT_ENCODING => "",
              CURLOPT_MAXREDIRS => 10,
                CURLOPT_SSL_VERIFYHOST=> 0,
                CURLOPT_SSL_VERIFYPEER=>0,
              CURLOPT_TIMEOUT => 30,
              CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
              CURLOPT_CUSTOMREQUEST => "POST",
              CURLOPT_HTTPHEADER => array(
                'Content-Length: 0'
              ),
            ));

            $response = json_decode(curl_exec($curl));
            curl_close($curl);
            $requestkey = $response->key;
            
            $curl = curl_init();
            curl_setopt_array($curl, array(
              CURLOPT_URL => "https://cpms.ciputra.app/api/input_bayardokumen",
              CURLOPT_RETURNTRANSFER => true,
              CURLOPT_ENCODING => "",
              CURLOPT_MAXREDIRS => 10,
              CURLOPT_SSL_VERIFYHOST=> 0,
              CURLOPT_SSL_VERIFYPEER=>0,
              CURLOPT_TIMEOUT => 30,
              CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
              CURLOPT_CUSTOMREQUEST => "POST",
              CURLOPT_POSTFIELDS => "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"requestkey\"\r\n\r\n".$requestkey."\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"no_surat\"\r\n\r\n".$nosuratcpms."\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"id_surat\"\r\n\r\n".$idsuratcpms."\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"receipt_no\"\r\n\r\n".$params['payment_receipt_no']."\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"tanggal_bayar\"\r\n\r\n".$params['realization_date']."\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--",
              CURLOPT_HTTPHEADER => array(
                "cache-control: no-cache",
                "content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
              ),
            ));

            $response = json_decode(curl_exec($curl));
            $err = curl_error($curl);   
            curl_close($curl);
        }
        if($uploadcpmsid!='' && $params['master_undangan_id']==''){ //jika bayar undangan tender
            
            $curl = curl_init();
            $nuploadcpmsid = preg_replace("/".$params['project_id'].$params['pt_id']."/i",'',$uploadcpmsid,1);
            curl_setopt_array($curl, array(
              CURLOPT_URL => "https://cpms.ciputra.app/api/requestkey",
              CURLOPT_RETURNTRANSFER => true,
              CURLOPT_ENCODING => "",
              CURLOPT_MAXREDIRS => 10,
              CURLOPT_SSL_VERIFYHOST=> 0,
              CURLOPT_SSL_VERIFYPEER=>0,
              CURLOPT_TIMEOUT => 30,
              CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
              CURLOPT_CUSTOMREQUEST => "POST",
              CURLOPT_HTTPHEADER => array(
                'Content-Length: 0'
              ),
            ));

            $response = json_decode(curl_exec($curl));
            curl_close($curl);
            $requestkey = $response->key;
            
            $curl = curl_init();
            curl_setopt_array($curl, array(
              CURLOPT_URL => "https://cpms.ciputra.app/api/input_tanggalcair",
              CURLOPT_RETURNTRANSFER => true,
              CURLOPT_ENCODING => "",
              CURLOPT_MAXREDIRS => 10,
              CURLOPT_SSL_VERIFYHOST=> 0,
              CURLOPT_SSL_VERIFYPEER=>0,
              CURLOPT_TIMEOUT => 30,
              CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
              CURLOPT_CUSTOMREQUEST => "POST",
              CURLOPT_POSTFIELDS => "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"requestkey\"\r\n\r\n".$requestkey."\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"uniqnumber\"\r\n\r\n".$nuploadcpmsid."\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"voucher_no\"\r\n\r\n".$params['voucher_no']."\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"receipt_no\"\r\n\r\n".$params['payment_receipt_no']."\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"voucher_id\"\r\n\r\n".$params['vid']."\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"tanggal_cair\"\r\n\r\n".$params['realization_date']."\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--",
              CURLOPT_HTTPHEADER => array(
                "cache-control: no-cache",
                "content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
              ),
            ));

            $response = json_decode(curl_exec($curl));
            $err = curl_error($curl);   
            curl_close($curl);
        }
        return $response;
    }    
    
    public function updaterealisasipimRead() {
        $params = $this->getRequest()->getPost();
        $token = $this->gettokenapipim();
        $dao = $this->getDao();
        $data = $dao->getvoucherfdar($params);
        $item = $dao->getvoucherstatus($params);
        $kasbon_no = null;
        $uploadkasbondept_id = 0;
        $kasbon_dept_amount = 0;
        $kasbon_dept_payamount = 0;
        $kasbon_dept_finalamount = 0;

        $uploadapi_id = $data[0][0]['uploadapi_id'];
        $uploadpim_id = $data[0][0]['uploadpim_id'];

        if ($uploadpim_id == "" || $uploadpim_id == '') {
            if ($uploadapi_id != "") {
                $exp_uniqueID = explode('-', $uploadapi_id);

                if (isset($exp_uniqueID[0]) && isset($exp_uniqueID[1]) ) {
                    if (strtoupper($exp_uniqueID[0])  == 'PIM') {
                        $uploadpim_id = $exp_uniqueID[1];
                    }
                }

                $uploadpim_id = $uploadpim_id;
            }
        }
        
        if (isset($item[0][0])) {
            $amount = $item[0][0]['amount'];
            $kasbon_no = $item[0][0]['kasbon_no'];
            $uploadkasbondept_id = $item[0][0]['uploadkasbondept_id'];
            $kasbon_dept_amount = $item[0][0]['kasbon_dept_amount'];
            $kasbon_dept_payamount = $item[0][0]['kasbon_dept_payamount'];
            $kasbon_dept_finalamount = $item[0][0]['kasbon_dept_finalamount'];
        }else{
            $amount = 0;
            $kasbon_no = null;
            $uploadkasbondept_id = 0;
            $kasbon_dept_amount = 0;
            $kasbon_dept_payamount = 0;
            $kasbon_dept_finalamount = 0;
        }

        $response = "";

        if($uploadpim_id!='' || $uploadkasbondept_id >0){
            
            $curl = curl_init();

            curl_setopt_array($curl, array(
              CURLOPT_URL => 'https://pim.ciputragroup.com:11441/api/update-voucher-status',
              CURLOPT_RETURNTRANSFER => true,
              CURLOPT_ENCODING => '',
              CURLOPT_MAXREDIRS => 10,
              CURLOPT_TIMEOUT => 0,
              CURLOPT_FOLLOWLOCATION => true,
              CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
              CURLOPT_CUSTOMREQUEST => 'POST',
              CURLOPT_POSTFIELDS => array(
                            'request_key' =>  $token,
                            'voucher_id' => $params['voucherID'],
                            'no_voucher_kasir' => $params['voucher_no'],
                            'tanggal_pembayaran_kasir' => $params['realization_date'],
                            'project_id' => $params['project_id'],
                            'pt_id' => $params['pt_id'], 
                            'amount' => $amount,
                            'kasbon_dept_uploaduniqueid' => $uploadkasbondept_id,
                            'kasbon_dept_no' => $kasbon_no,
                            'kasbon_dept_amount' => $kasbon_dept_amount,
                            'kasbon_dept_payamount' => $kasbon_dept_payamount,
                            'kasbon_dept_finalamount' => $kasbon_dept_finalamount
                        )
            ));

            $response = curl_exec($curl);

            curl_close($curl);
        }
        return $response;
    }   
    
    public function checkrealisasicpmsRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->getvoucherfdar($params);
        $uploadcpmsid = $data[0][0]['uploadcpms_id'];
        $uploadapi_id = $data[0][0]['uploadapi_id'];

        if ($uploadcpmsid == "" || $uploadcpmsid == '') {
            if ($uploadapi_id != "") {
                $exp_uniqueID = explode('-', $uploadapi_id);

                if (isset($exp_uniqueID[0]) && isset($exp_uniqueID[1]) ) {
                    if (strtoupper($exp_uniqueID[0])  == 'CPMS') {
                        $uploadcpmsid = $exp_uniqueID[1];
                    }
                }

                $uploadcpmsid = $uploadcpmsid;
            }
        }

        $response['status'] = 1;
        if($uploadcpmsid!='' && $uploadcpmsid!=null && $params['master_undangan_id']==''){
            $nuploadcpmsid = preg_replace("/".$params['project_id'].$params['pt_id']."/i",'',$uploadcpmsid,1);
            $this->sendApprove_CPMS($data, $nuploadcpmsid);
            $curl = curl_init();

            curl_setopt_array($curl, array(
              CURLOPT_URL => "https://cpms.ciputra.app/api/cekdapat_bayar",
              CURLOPT_RETURNTRANSFER => true,
              CURLOPT_ENCODING => "",
              CURLOPT_MAXREDIRS => 10,
              CURLOPT_TIMEOUT => 30,
                CURLOPT_SSL_VERIFYHOST=> 0,
                CURLOPT_SSL_VERIFYPEER=>0,
              CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
              CURLOPT_CUSTOMREQUEST => "POST",
              CURLOPT_POSTFIELDS => "uniqnumber=".$nuploadcpmsid."&voucher_id=".$params['vid'],
//              CURLOPT_POSTFIELDS => "uniqnumber=4093&voucher_id=VC201911260000792",
              CURLOPT_HTTPHEADER => array(
                "cache-control: no-cache",
                "content-type: application/x-www-form-urlencoded",
              ),
            ));

            $response = json_decode(curl_exec($curl));
        }
        return $response;
    }

    function sendApprove_CPMS($params , $nuploadcpmsid){
        $apiKey = $this->gettokenapicpms();
        $params = $params[0][0];
        $vid = $params['voucherdepartement_vid'];
        $voucher_no = $params['voucherdepartement_no'];
        
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
            'uniqnumber' => $nuploadcpmsid,
            'voucher_no' => $voucher_no,
            'voucher_id' => $vid),
        ));
        
        $response = json_decode(curl_exec($curl));        
        curl_close($curl);
    }

    public function writeoffdendaRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $params['user_id'] = $session->getUser()->getId();
        $dao = $this->getDao();
        $data = $dao->writeoffdenda($params);
        return $data;
    }
    public function searchchequeRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->searchcheque($params);
        if(!isset($data[0][0])){
            $data[0][0]['cheque_id'] = '0';
        }
        return $data[0][0];
    }
    public function checknullcashflowRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->checknullcashflow($params);
        if(!isset($data[0][0])){
            $data[0][0]['ERROR'] = 0;
        }
        return array(
            "data" => array(
                "ERROR" => ($data[0][0]['ERROR']==0?false:true),
            ),
        );
    }
    public function updatenokwitansiRead() {
        
        $session = Apli::getSession();
        $params = $this->getRequest()->getPost();
        $params['user_id'] = $session->getUser()->getId();
        $dao = $this->getDao();
        $data = $dao->updatenokwitansi($params);
        return array(
            "data" => array(
                "success" => true,
            ),
        );
    }   
    public function createsubaccountRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $params['user_id'] = $session->getUser()->getId();
        $dao = $this->getDao();
        $data = $dao->createsubaccount($params);
        return array(
            "data" => $data[0][0],
        );
    }
    public function getanotherdendaRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dataList = new Cashier_Box_Models_App_DataListCreator('', 'schedule', array('purchaselettertransaction', 'payment', 'paymenttype', 'unitstatus', 'unitb', 'customer', 'clusterb', 'blockb', 'productcategory', 'type', 'project', 'pt', 'voucher','scheduletype'));
        $dm->setDataList($dataList);
        $dao = $this->getDao();
        $dm->setObject($dao);
        $dm->setDao($dao);
        $data = $dao->getCustomRead('', $request, $session);
        $dm->setHasil($data);
        $dl = $dm->getDataList();
        $dl->setDataDao($data);
        $hasilData = Apli::prosesDao($dm->getDataList());
        //print_r($deptHasil);
        return array(
            "model" => Apli::generateExtJSModel($dm->getDataList()),
            "data" => $hasilData["data"],
            "totalRow" => $hasilData["row"]
        );
    }
    public function vendorautofillRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        
        $data = $dao->getCustomRead('', $request, $session);
        return array(
            "data" => $data[0][0],
        );
    }
    public function slipsetoranRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'cetakslip', array(), array()));
        $dao = $this->getDao();
        $dm->setObject($dao);
        $dm->setDao($dao);
        $data = $dao->getCustomPagingRead('', $request, $session);
        $dm->setHasil($data);
        $dl = $dm->getDataList();
        $dl->setDataDao($data);
        $hasilData = Apli::prosesDao($dm->getDataList());
        //print_r($deptHasil);
        return array(
            "model" => Apli::generateExtJSModel($dm->getDataList()),
            "data" => $hasilData["data"],
            "totalRow" => $hasilData["row"]
        );
    }
    public function prosescetakslipRead() {
        
        $session = Apli::getSession();
        $params = $this->getRequest()->getPost();
        $params['user_id'] = $session->getUser()->getId();
        $dao = $this->getDao();
        $data = $dao->createcetakslip($params);
        return array(
            "data" => $data[0][0],
        );
    }
    public function deletecetakslipRead() {
        
        $session = Apli::getSession();
        $params = $this->getRequest()->getPost();
        $params['user_id'] = $session->getUser()->getId();
        $dao = $this->getDao();
        $data = $dao->deletecetakslip($params);
        return array(
            "data" => $data[0][0],
        );
    }
    public function uploadattachmentRead() {
        
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $tmpName = $_FILES['file-path-attachment']['tmp_name'];
        $filesPath = $_FILES['file-path-attachment'];
        //$post_data['fileraw'] = file($tmpName);
        $post_data['filespath'] = $filesPath;
        $dao = $this->getDao();
        $result = $dao->uploadattachment($post_data);
        echo Zend_Json::encode($result);
    }
    public function voucherattachmentRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'voucherattachment', array(), array()));
        $dao = $this->getDao();
        $dm->setObject($dao);
        $dm->setDao($dao);
        $data = $dao->getCustomPagingRead('', $request, $session);
        $dm->setHasil($data);
        $dl = $dm->getDataList();
        $dl->setDataDao($data);
        $hasilData = Apli::prosesDao($dm->getDataList());
        //print_r($deptHasil);
        return array(
            "model" => Apli::generateExtJSModel($dm->getDataList()),
            "data" => $hasilData["data"],
            "totalRow" => $hasilData["row"]
        );
    }
    public function voucherapprovaldetailRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'voucherapprovaldetail', array(), array()));
        $dao = $this->getDao();
        $dm->setObject($dao);
        $dm->setDao($dao);
        $data = $dao->getCustomPagingRead('', $request, $session);
        $dm->setHasil($data);
        $dl = $dm->getDataList();
        $dl->setDataDao($data);
        $hasilData = Apli::prosesDao($dm->getDataList());
        //print_r($deptHasil);
        return array(
            "model" => Apli::generateExtJSModel($dm->getDataList()),
            "data" => $hasilData["data"],
            "totalRow" => $hasilData["row"]
        );
    }
    
    public function nonlinkRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'vouchernonlink', array(), array()));
        $dao = $this->getDao();
        $dm->setObject($dao);
        $dm->setDao($dao);
        $data = $dao->getCustomPagingRead('', $request, $session);
        $dm->setHasil($data);
        $dl = $dm->getDataList();
        $dl->setDataDao($data);
        $hasilData = Apli::prosesDao($dm->getDataList());
        //print_r($deptHasil);
        return array(
            "model" => Apli::generateExtJSModel($dm->getDataList()),
            "data" => $hasilData["data"],
            "totalRow" => $hasilData["row"]
        );
    }
    public function subheadercheckRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->validasisubheader($params);
        
        return $data[0][0];
    }
    public function autoduedateRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        
        $data = $dao->getCustomRead('', $request, $session);
        return array(
            "data" => (isset($data[0][0])?$data[0][0]:0),
        );
    }
    public function usemasterreceiptRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        
        $data = $dao->getCustomRead('', $request, $session);
        return array(
            "data" => (isset($data[0][0])?$data[0][0]:array("value"=>0)),
        );
    }
    public function converttoangsuranRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $params['user_id'] = $session->getUser()->getId();
        $dao = $this->getDao();
        $data = $dao->converttoangsuran($params);
        return array(
            "data" => $data[0][0],
        );
    }
    public function uploaddetailRead(){
        $params = $this->getRequest()->getPost();
        $post_data['start'] = 0;
        $post_data['limit'] = 10000;
        $tmpName = $_FILES['file-path']['tmp_name'];
        $arrData =  array();
        $accData =  array();
        $csvAsArray = fopen($tmpName, "r");
        $session = Apli::getSession();
        $params['user_id'] = $session->getUser()->getId();
        while ($line = fgets($csvAsArray)) {
           $line = str_replace('"',"",$line);
           $line = str_replace("\t",";",$line);
           $arr = explode(';',$line);
           array_push($arrData, $arr);
        }

        fclose($csvAsArray);
        $i=0;
        $tmpAcc = '';
        $sumSub = 0;
        $vid = '';
        $dao = $this->getDao();
        $return = 1;
        $message = array();
        foreach ($arrData as $key => $a) {
            if($key!=0){
                $acc = array(
                    'project_id'=>$params['project_id'],
                    'pt_id'=>$params['pt_id'],
                    'kasbank_id'=>$params['kasbank_id'],
                    'department_id'=>$params['department_id'],
                    'user_id'=>$params['user_id'],
//                    'groupingdata'=>$params['groupingdata'],
                    'coa'=> trim($a[0]),
                    'amount'=> trim($a[1]),
                    'description'=> str_replace("'","`",trim($a[2])),
                    'sub'=> (!isset($a[3])?"":trim($a[3])),
                    'cluster'=> (!isset($a[4])?"":trim($a[4])),
                    'subdescription'=> str_replace("'","`",trim($a[5])),
                    'cashflow'=> str_replace("'","`",trim($a[6])),
                ); 
                
                $data = $dao->getdetailupload($acc);
                if($data[0][0]['hasil']==0){
                    array_push($message,$data[0][0]['msg']);
                    $return = 0;
                }
                foreach($data[0][0] as $k2y => $value){
                    $acc[$k2y]=$value;
                }
                $ketemu = false;
                foreach ($accData as $ky => $vl) {
                    if($vl['coa']==trim($a[0])){
                        if($params['groupingdata']=="1"){
                            $accData[$ky]['amount']=$vl['amount']+trim($a[1]);
                            $ketemu = true;
                            if(!isset($accData[$ky]['subdetail'])){
                                $accData[$ky]['subdetail'] = array();
                            }
                            array_push($accData[$ky]['subdetail'],$acc);
                        }
                    }
                }
                if($ketemu==false){
                    array_push($accData, $acc);
                    
                    foreach ($accData as $ky => $vl) {
                        if($vl['coa']==trim($a[0])){
                            if($params['groupingdata']=="1"){
                                if(!isset($accData[$ky]['subdetail'])){
                                    $accData[$ky]['subdetail'] = array();
                                }
                                array_push($accData[$ky]['subdetail'],$acc);
                            }
                        }
                    }
                }
                $tmpAcc = $a[0];

            }
        }
//        $subgrouping = array();
        $result = array('data' => $accData, 'total' => 0, 'success' => 1, 'error'=>$return,'errormsg'=>array_unique($message, SORT_REGULAR));
        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    public function needreviseRead() {
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $params['user_id'] = $session->getUser()->getId();
        $model = new Cashier_Models_VDApprove();
        $result = $model->VDApproveUpdate($params);
        return array(
            "data" => $result,
        );
    }
    public function autogenerateschemaRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->autogenerateschema($params);
        
        return $data[0][0];
    }
    public function checkIsBankApprovalRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->checkIsBankApproval($params['project_id'],$params['pt_id']);
        return array(
            "data" => array(
                "BANKING_APPROVAL" => (!isset($data[0][0]['BANKING_APPROVAL'])?'':$data[0][0]['BANKING_APPROVAL']),
                "BANKING_APPROVAL_APPROVER" => (!isset($data[0][0]['BANKING_APPROVAL_APPROVER'])?'':$data[0][0]['BANKING_APPROVAL_APPROVER']),
                "BANKING_APPROVAL_RELEASER" => (!isset($data[0][0]['BANKING_APPROVAL_RELEASER'])?'':$data[0][0]['BANKING_APPROVAL_RELEASER']),
            ),
        );
    }
    public function savevendorbankRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $session = Apli::getSession();
        $params['user_id'] = $session->getUser()->getId();
        $data = $dao->savevendorbank($params);
        
        return $data[0][0]['vendor_bankacc_id'];
    }
    public function checkIsBankApprovedRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->checkIsBankApproved($params['kasbank_id']);
        return array(
            "data" => array(
                "approver_0" => (!isset($data[0][0]['approver_0'])?'':$data[0][0]['approver_0']),
                "approver_1" => (!isset($data[0][0]['approver_1'])?'':$data[0][0]['approver_1']),
                "approver_2" => (!isset($data[0][0]['approver_2'])?'':$data[0][0]['approver_2']),
                "approver_3" => (!isset($data[0][0]['approver_3'])?'':$data[0][0]['approver_3']),
                "approver_4" => (!isset($data[0][0]['approver_4'])?'':$data[0][0]['approver_4']),
                "approver_5" => (!isset($data[0][0]['approver_5'])?'':$data[0][0]['approver_5']),
                "approver_6" => (!isset($data[0][0]['approver_6'])?'':$data[0][0]['approver_6']),
                "approver_7" => (!isset($data[0][0]['approver_7'])?'':$data[0][0]['approver_7']),
                "approver_8" => (!isset($data[0][0]['approver_8'])?'':$data[0][0]['approver_8']),
                "releaser_1" => (!isset($data[0][0]['releaser_1'])?'':$data[0][0]['releaser_1']),
                "releaser_2" => (!isset($data[0][0]['releaser_2'])?'':$data[0][0]['releaser_2']),
                "releaser_3" => (!isset($data[0][0]['releaser_3'])?'':$data[0][0]['releaser_3']),
            ),
        );
    }

    public function getpersentaseppndtpRead()
    {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $session = Apli::getSession();

        $data = $dao->getpersentaseppndtp($params);
        
        return array('data' => $data[0][0]);
    }
    
    public function resetprintRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $session = Apli::getSession();
        $params['user_id'] = $session->getUser()->getId();

        $data = $dao->resetprint($params);
        return array(
            "data" => array(
                "result" => $data[0][0]['result'],
                "msg" => $data[0][0]['msg'],
            ),
        );
    }
    
    public function checkvouchernorealisasiRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $session = Apli::getSession();
        $params['user_id'] = $session->getUser()->getId();

        $data = $dao->checkvouchernorealisasi($params);
        return array(
            "data" => array(
                "result" => $data[0][0]['result'],
                "msg" => $data[0][0]['msg'],
            ),
        );
    }

    public function kasbanklogRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $session = Apli::getSession();
        $params['user_id'] = $session->getUser()->getId();

        $data = $dao->kasbanklog($params);
        return array(
            "data" => array(
                "data" => $data[1],
                "totalRow" => $data[0][0]['totalRow'],
                "msg" => 'Success'
            ),
        );
    }

    public function updaterealisasiapiRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->getvoucherstatus($params);

        $appsinitial ="";
        if (isset($data[0][0])) {
            $appsinitial = $data[0][0]['datasource'];
        }

        switch ($appsinitial) {
            case 'HCIS':
                $item = $this->updaterealisasihcis($data);
                return $item;
            break;
            case 'TESTHCIS':
                $item = $this->updaterealisasihcisTest($data);
                return $item;
            break;
            
            default:
                return 0;
                break;
        }
    }

    function gettokenapihcis($params){
        
    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://hcis.ciputra.com/front/m_token_login',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS => 'ucompany=e6762607-e088-11e5-ae3b-0019660dca60%20&uuser=cis_voucher_fams&upw=xMg9r78Bwt77',
      CURLOPT_HTTPHEADER => array(
        'AUTHENTICATION: VOUCHERFAMS VkUvbmtJL1I3T3NGclFsQ3FrWHNrR3NCSEliL0hLdkxwc0N6VzcycEZCaz0',
        'Content-Type: application/x-www-form-urlencoded',
        'Cookie: ARRAffinity=0cdf7704b9cf9f6d27064f82bf38eb9b58f6c3d52778d01ce32d36114bdc9675; ARRAffinitySameSite=0cdf7704b9cf9f6d27064f82bf38eb9b58f6c3d52778d01ce32d36114bdc9675'
      ),
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    $token_raw = json_decode($response, true);
    $token = $token_raw["data"]["m_token"];

    return $token;
    
    }

    function gettokenapicpms(){
        
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

        $response = curl_exec($curl);

        curl_close($curl);
        $token_raw = json_decode($response, true);
        $token = $token_raw["key"];

        return $token;
    
    }

    function gettokenapipim(){
        
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

        $response = curl_exec($curl);

        curl_close($curl);
        $token_raw = json_decode($response, true);
        $token = $token_raw["key"];

        return $token;
    
    }

    function updaterealisasihcis($params){
        $token = $this->gettokenapihcis($params);
        $curl = curl_init();

        curl_setopt_array($curl, array(
          CURLOPT_URL => 'https://hcis.ciputra.com/ces_voucher/update_status',
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => '',
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 0,
          CURLOPT_FOLLOWLOCATION => true,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => 'POST',
          CURLOPT_POSTFIELDS => 'uploaduniquenumber='.$params[0]['uploadapi_id'].'&realization_date='.$params[0]['realization_date'].'&payment_date='.$params[0]['payment_date'].'&m_token='.$token,
          CURLOPT_HTTPHEADER => array(
            'Content-Type: application/x-www-form-urlencoded',
            'Cookie: ARRAffinity=0cdf7704b9cf9f6d27064f82bf38eb9b58f6c3d52778d01ce32d36114bdc9675; ARRAffinitySameSite=0cdf7704b9cf9f6d27064f82bf38eb9b58f6c3d52778d01ce32d36114bdc9675; ci_session=j34atr0kbc337jiooq33o5tcgq22dbgp'
          ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        echo $response;
    }

    function gettokenapiHCISTest($params){
        
        $curl = curl_init();
        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://trial.uc.ac.id/front/m_token_login',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => 'ucompany=e6762607-e088-11e5-ae3b-0019660dca60&uuser=cis_voucher_fams&upw=xMg9r78Bwt77',
        CURLOPT_HTTPHEADER => array(
            'AUTHENTICATION: VOUCHERFAMS VkUvbmtJL1I3T3NGclFsQ3FrWHNrR3NCSEliL0hLdkxwc0N6VzcycEZCaz0',
            'Content-Type: application/x-www-form-urlencoded',
            'Cookie: XSRF-TOKEN=SxjxyLxbKl8qjwfwdiC3hrXXcEkIbb9IxUO4urkz%2B01BdxQhL6gHQMa2mcAO5DlaRyzUvqsBJjr5DKDnEvaLdOGaVo3MtgOIXcyAs%2BOpS5g%3D; ci_session=ec642dfd050d20054dd1bf540dfa5a8e072d9e5b'
        ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        $token_raw = json_decode($response, true);
        $token = $token_raw["data"]["m_token"];

        return $token;
    
    }

    function updaterealisasihcisTest($params){
        $token = $this->gettokenapiHCISTest($params);
        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://trial.uc.ac.id/ces_voucher/update_status',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => 'uploaduniquenumber='.$params[0][0]['uploadapi_id'].'&realization_date='.$params[0][0]['realization_date'].'&payment_date='.$params[0][0]['payment_date'].'&m_token='.$token,
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/x-www-form-urlencoded',
            'Cookie: XSRF-TOKEN=SxjxyLxbKl8qjwfwdiC3hrXXcEkIbb9IxUO4urkz%2B01BdxQhL6gHQMa2mcAO5DlaRyzUvqsBJjr5DKDnEvaLdOGaVo3MtgOIXcyAs%2BOpS5g%3D; ci_session=ec642dfd050d20054dd1bf540dfa5a8e072d9e5b'
        ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        // echo $response;
    }

    public function updateunrealisasiapiRead() {
        date_default_timezone_set('Asia/Jakarta');
        $params = $this->getRequest()->getPost();
        
        $voucherno = $params['voucher_no'];
        $voucherid = $params['voucherID'];
        
        $token = $this->gettokenapipim();
        $dao = $this->getDao();

        $items = $dao->getvoucherfdar($params);
        $data = $dao->getvoucherstatus($params);

        $uploadapi_id = $items[0][0]['uploadapi_id'];
        $uploadpim_id = $items[0][0]['uploadpim_id'];

        if ($uploadpim_id == "" || $uploadpim_id == '') {
            if ($uploadapi_id != "") {
                $exp_uniqueID = explode('-', $uploadapi_id);

                if (isset($exp_uniqueID[0]) && isset($exp_uniqueID[1]) ) {
                    if (strtoupper($exp_uniqueID[0])  == 'PIM') {
                        $uploadpim_id = $exp_uniqueID[1];
                    }
                }

                $uploadpim_id = $uploadpim_id;
            }
        }

        $pt_id = $params['pt_id'];
        $project_id = $params['project_id'];
        $kasbon_no = null;
        $uploadkasbondept_id = 0;
        $kasbon_dept_amount = 0;
        $kasbon_dept_payamount = 0;
        $kasbon_dept_finalamount = 0;
        
        if (isset($data[0][0])) {
            $voucherid = $data[0][0]['vid'];
            $amount = $data[0][0]['amount'];
            $kasbon_no = $data[0][0]['kasbon_no'];
            $uploadkasbondept_id = $data[0][0]['uploadkasbondept_id'];
            $kasbon_dept_amount = $data[0][0]['kasbon_dept_amount'];
            $kasbon_dept_payamount = $data[0][0]['kasbon_dept_payamount'];
            $kasbon_dept_finalamount = $data[0][0]['kasbon_dept_finalamount'];
        }else{
            $amount = 0;
            $kasbon_no = null;
            $uploadkasbondept_id = 0;
            $kasbon_dept_amount = 0;
            $kasbon_dept_payamount = 0;
            $kasbon_dept_finalamount = 0;
        }

        $response = "";

        // if (($project_id == '4065') && ($pt_id == '4223')) {

            if($uploadpim_id > 0 || $uploadkasbondept_id >0){

                $curl = curl_init();

                curl_setopt_array($curl, array(
                  CURLOPT_URL => 'https://pim.ciputragroup.com:11441/api/update-voucher-unrealization',
                  CURLOPT_RETURNTRANSFER => true,
                  CURLOPT_ENCODING => '',
                  CURLOPT_MAXREDIRS => 10,
                  CURLOPT_TIMEOUT => 0,
                  CURLOPT_FOLLOWLOCATION => true,
                  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                  CURLOPT_CUSTOMREQUEST => 'POST',
                  CURLOPT_POSTFIELDS => array(
                    'request_key' =>  $token,
                    'uploadpim_id' => $uploadpim_id,
                    'voucher_id' => $voucherid,
                    'no_voucher_kasir' => $voucherno,
                    'project_id' => $project_id,
                    'pt_id' => $pt_id,
                    'unrealization_date' => date('Y-m-d H:i:s'),
                    // 'unrealization_reason' => ,
                    'kasbon_dept_uploaduniqueid' => $uploadkasbondept_id,
                    'kasbon_dept_no' => $kasbon_no,
                    'kasbon_dept_amount' => $kasbon_dept_amount,
                    'kasbon_dept_payamount' => $kasbon_dept_payamount,
                    'kasbon_dept_finalamount' => $kasbon_dept_finalamount  
                )
              ));

                $response = curl_exec($curl);

                curl_close($curl);
            }
        
        // }else{
        //     echo "bukan citra test";
        // }

    }


    
    public function checkkasbankreffidsRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $session = Apli::getSession();
        $params['user_id'] = $session->getUser()->getId();

        $data = $dao->checkkasbankreffids($params);
        return array(
            "data" => array(
                "result" => $data[0][0]['result'],
                "msg" => $data[1][0]['msg']
            ),
        );
    }


    public function kasbankmakerRead(){
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $session = Apli::getSession();
        $params['user_id'] = $session->getUser()->getId();

        $data = $dao->kasbankmaker($params);

        return array(
            "data" => array(
                "result" => $data[0],
                "msg" => 'Success'
            ),
        );
    }

    public function checkblockunitRead(){
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $session = Apli::getSession();
        $params['user_id'] = $session->getUser()->getId();

        $data = $dao->checkblockunit($params);
        return array(
            "data" => array(
                "result" => $data[0][0]['result'],
                "msg" => $data[1][0]['msg']
            ),
        );
    }

    public function reportkwitansiRead(){
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $session = Apli::getSession();
        $params['user_id'] = $session->getUser()->getId();
        // echo json_encode($params);die;

        $data = $dao->reportKwitansi3Rangkap($params);
        // echo json_encode($data);die;

        for ($i=0; $i < sizeof($data[0]); $i++) { 
            $data[0][$i]['qr_code'] = 'https://apps.ciputragroup.com/ces-kwitansivalidator?t='.base64_encode($data[0][$i]['kasbank_id']);
        }

        return array(
            "data" => array(
                "result" => $data[0],
                "msg" => 'Success'
            ),
        );
    }

    public function savepdfRead()
    {
        $data = [];
        $desc = '';
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $session = Apli::getSession();
        $params['user_id'] = $session->getUser()->getId();
        $minio = new Cashier_Helpers_Minio();
        // echo json_encode($params);die;
        
        $paramList = Zend_Json::decode(utf8_encode(base64_decode($_POST['paramList'])));
        // echo json_encode($paramList);die;

        if ( $params['optionQr'] == 1 ) {
            $desc = ' - Format All';
        }else if ( $params['optionQr'] == 2 ) {
            $desc = ' - Format Customer';
        }else{
            $desc = ' - Format Cashier & Collection';
        }

        $params['transaction_id'] = $paramList[0]['kasbank_id'];
        $params['description'] = 'Kwitansi Rangkap 3 : '.$paramList[0]['vid'];

        if (isset($_FILES['file']) && !$_FILES['file']['error']) {
            $filename = $params['description'].'.pdf';
            $filesPath = APPLICATION_PATH . '/../public/app/cashier/uploads/pdf/' . $filename;
            
            $file = [
                'name' => basename($filesPath),
                'size' => $_FILES['file']['size'],
                'tmp_name' => $_FILES['file']['tmp_name'],
                'type' => $_FILES['file']['type'],
            ];
            $result = $minio->upload($file, 'voucher');
            // echo json_encode($result);die;
            $filename = $result['filename'];
            $file['name'] = $filename;
            move_uploaded_file($_FILES['file']['tmp_name'], APPLICATION_PATH . '/../public/app/cashier/uploads/pdf/' . $filename);
            // die;
            $params['description'] = $params['description'].$desc;
            
            $params['attachment'] = $file;
            $params['path'] = $result['path'];
            $data = $dao->reportKwitansi3RangkapSaveAttachment($params);
            // echo json_encode($data);die;    
            unlink(APPLICATION_PATH . '/../public/app/cashier/uploads/pdf/' . $filename);
        }


        return array(
            "data" => array(
                "result" => $data[0],
                "msg" => 'Success'
            ),
        );
    }

    public function updatevoucherposting_API($kasbankid=0) {
        $dao = $this->getDao();
        $data = $dao->getDetailVoucherposting($kasbankid);
        
        if ($data['return']) {
            if ($data['datasource'] == 'API') {
                $exp_uniqueID = explode('-', $data['uploaduniquenumber']); //explode datasource dan uniqueid
                $datasource = $exp_uniqueID[0]; 
                $nuploadcpmsid = preg_replace("/".$data['project_id'].$data['pt_id']."/i",'',$exp_uniqueID[1],1); //hilangkan project id dan pt_id di uniqueid
                $data['real_uploaduniquenumber'] = $nuploadcpmsid; //ambil unique id real di masing2 apps 
            }else{
                $datasource = $data['datasource'];
                $nuploadcpmsid = preg_replace("/".$data['project_id'].$data['pt_id']."/i",'',$data['uploaduniquenumber'],1); //hilangkan project id dan pt_id di uniqueid
                $data['real_uploaduniquenumber'] = $nuploadcpmsid; //ambil unique id real di masing2 apps 
            }
            
            switch ($datasource) {
                case 'PIM':
                    $this->updatevoucherposting_API_PIM($data); 
                break;
                case 'CPMS':
                    $this->updatevoucherposting_API_CPMS($data);
                break;
                case 'TEST':
                    $this->updatevoucherposting_API_TEST($data);
                break;
                default:
                break;
            }

        }
    }

    public function updatevoucherposting_API_TEST($params){
        $data = array(
            'uploaduniquenumber' => $params['real_uploaduniquenumber'],
            'voucher_id' => $params['vid'],
            'project_id' => $params['project_id'],
            'pt_id' => $params['pt_id'],
            'detail' => json_encode($params['data']),
            'attachment' => json_encode($params['attachment']));
        
        return $data;
    }

    public function updatevoucherposting_API_CPMS($params){
        $curl = curl_init();
        $token = $this->gettokenapicpms(); // ambil token cpms

        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://cpms.ciputra.app/api/update-voucher-posting',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => array(
                'requestkey' => $token,
                'uploaduniquenumber' => $params['real_uploaduniquenumber'],
                'voucher_id' => $params['vid'],
                'project_id' => $params['project_id'],
                'pt_id' => $params['pt_id'],
                'detail' => json_encode($params['data']),
                'attachment' => json_encode($params['attachment'])
                )
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        // echo $response;
    }

    public function updatevoucherposting_API_PIM($params){
        $curl = curl_init();
        $token = $this->gettokenapipim();

        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://pim.ciputragroup.com:11441/api/update-voucher-posting',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => array(
            'request_key' => $token,
            'uploaduniquenumber' => $params['real_uploaduniquenumber'],
            'voucher_id' => $params['vid'],
            'project_id' => $params['project_id'],
            'pt_id' => $params['pt_id'],
            'detail' => json_encode($params['data']),
            'attachment' => json_encode($params['attachment'])
            )
        ));

        $response = curl_exec($curl);

        curl_close($curl);
    }

    public function checkIsBankApprovalPaymentTypeRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->checkIsBankApprovalPaymentType($params['project_id'],$params['pt_id']);
        // echo json_encode($data);die;
        return array(
            "data" => array(
                'BANKING_APPROVAL_PAYMENT_TYPE' => $data[0][0]['BANKING_APPROVAL_PAYMENT_TYPE']
            ),
        );
    }

    public function sendEmailToFcRead(){
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->sendEmailToFc($params['kasbank_id']);
        echo json_encode($data);die;
        
    }

    public function generateKwitansiNumberRead(){
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->generateKwitansiNumber($params);
        // echo json_encode($data);die;
        return array(
            "data" => array(
                'result' => $data[0][0]['result'],
                'msg' => $data[1][0]['msg']
            )
        );
    }

    public function checkprintqrRead(){
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->checkPrintQr($params);
        // echo json_encode($data);die;
        return array(
            "data" => array(
                'result' => $data[0][0]['result'],
                'msg' => $data[1]
            )
        );
    }

    public function checktemplateinvoiceRead(){
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->checkTemplateInvoice($params);
        // echo json_encode($data);die;
        return array(
            "data" => array(
                'result' => $data[0][0]['result'],
                'msg' => $data[1][0]['msg']
            )
        );
    }

    public function printinvoiceRead(){
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        echo json_encode($params);
    }

    public function checkRequestUnrealizationRead(){
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->checkRequestUnrealization($params);
        // echo json_encode($data);die;
        return array(
            "data" => array(
                'result' => $data[0][0]['result'],
                'msg' => $data[1][0]['msg']
            )
        );
    }

    public function requestUnrealizationRead(){
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $session = Apli::getSession();
        $params['user_id'] = $session->getUser()->getId();
        $data = $dao->prosesRequestUnrealization($params);
        // echo json_encode($data);die;
        return array(
            "data" => array(
                'result' => $data[0][0]['result'],
                'msg' => $data[1][0]['msg']
            )
        );
    }

    public function getUserDeletedVaRead(){
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->getUserDeletedVa($params);
        // echo json_encode($data);die;
        return array(
            "data" => array(
                'result' => $data[0][0]['result'],
                'msg' => isset($data[1][0]['value']) ? $data[1][0]['value'] : $data[1][0]['msg']
            )
        );
    }


    public function getcurrencyRead(){
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $session = Apli::getSession();
        $params['user_id'] = $session->getUser()->getId();

        $data = $dao->getcurrency($params);

        return array(
            "data" => array(
                "result" => $data[0],
                "msg" => 'Success'
            ),
        );
    }

    public function checkPtCrRead(){
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->checkPtCr($params);
        // echo json_encode($data);die;
        return array(
            "data" => array(
                'result' => $data[0][0]['result'],
                'msg' => $data[1][0]['msg']
            )
        );
    }
    
    public function resetprintkwitansiRead() {
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $session = Apli::getSession();
        $params['user_id'] = $session->getUser()->getId();

        $data = $dao->resetprintkwitansi($params);
        return array(
            "data" => array(
                "result" => $data[0][0]['result'],
                "msg" => $data[0][0]['msg'],
            ),
        );
    }
    
    public function checkPtCGGRead(){
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->checkPtCGG($params);
        // echo json_encode($data);die;
        return array(
            "data" => array(
                'result' => $data[0][0]['result'],
                'msg' => $data[1][0]['msg']
            )
        );
    }
    
    public function checklinkvoucherRead(){
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->checklinkvoucher($params);
        // echo json_encode($data);die;
        return array(
            "data" => array(
                'result' => $data[0][0]['result'],
                'msg' => $data[1][0]['msg']
            )
        );
    }
    
    public function checkbudgetcfRead(){
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->checkbudgetcf($params);
        return array(
            "data" => array(
                'result' => $data[0][0]['result'],
                'msg' => $data[1][0]['msg']
            )
        );
    }
    
    public function checknokwitansiRead(){
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->checknokwitansi($params);
        // echo json_encode($data);die;
        return array(
            "data" => array(
                'result' => $data[0][0]['result'],
                'msg' => $data[1][0]['msg']
            )
        );
    }

    public function dendalistRead() {
        $params  = $this->getRequest()->getPost();
        $req     = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm      = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'pemutihandenda', array('unit'), array()));
        $objectCreator = new Cashier_Models_Purchaseletter_PurchaseLetterTransaction();
        $objectCreator->setProject($session->getProject());
        $objectCreator->setPt($session->getPt());
        $dao = $this->getDao();
        $dm->setObject($objectCreator);
        $dm->setDao($dao);
        $hasil = $dao->getDendaList($req, $objectCreator, $session);
        // echo json_encode($hasil);die;
        $dm->setHasil($hasil);
        $dl = $dm->getDataList();
        $dl->setDataDao($hasil);
        $hasilData = Apli::prosesDao($dm->getDataList());
        return array(
            "model"    => Apli::generateExtJSModel($dm->getDataList()),
            "data"     => $hasilData["data"],
            "totalRow" => $hasilData["row"]
        );
    }
    
    public function prosespemutihanRead(){
        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $params['user_id'] = $session->getUser()->getId();
        $dao = $this->getDao();
        $data = $dao->prosespemutihan($params);
        // echo json_encode($data);die;
        return array(
            "data" => array(
                'result' => $data[0][0]['result'],
                'msg' => $data[1][0]['msg']
            )
        );
    }

    public function getartypeRead(){
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $session = Apli::getSession();
        $params['user_id'] = $session->getUser()->getId();

        $data = $dao->getartype($params);

        return array(
            "data" => array(
                "result" => $data[0],
                "msg" => 'Success'
            ),
        );
    }
    
    public function checkvalidationRead(){
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->checkvalidation($params);
        return array(
            "data" => array(
                'result' => $data[0]
            )
        );
    }

    public function usedcoaarRead(){
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $session = Apli::getSession();
        $params['user_id'] = $session->getUser()->getId();

        $data = $dao->usedcoaar($params);

        return array(
            "data" => array(
                "result" => $data[0][0]['result'],
                "msg" => 'Success'
            ),
        );
    }
    
    public function getsubglbyvcrprefixRead(){
        $params = $this->getRequest()->getPost();
        $dao = $this->getDao();
        $data = $dao->getsubglbyvcrprefix($params);
        return array(
            "data" => array(
                'result' => $data[0]
            )
        );
    }
}
