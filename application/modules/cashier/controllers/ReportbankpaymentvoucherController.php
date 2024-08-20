<?php

require_once dirname(__DIR__) . '../library/apli/ApliCashierController.php';

class Cashier_ReportbankpaymentvoucherController extends ApliCashierController {

    public function init() {

        //DECLARE CLASS MODEL AND OBJECT & VALIDATOR, COMMENT VALIDATOR IF DONT WANT USE VALIDATOR FILE
        $dao = new Cashier_Models_Master_DefaultDao();
        $object = new Cashier_Models_Master_Coa();
        $primary_key = "coa_id";

        //VALIDATOR, IF DONT USE VALIDATOR COMMENT THIS
        $validator = new Cashier_Models_Validator_DefaultValidator();
        $this->setValidator($validator);
        $unique_column_table = "coa";
        $validator->setObject($object);
        $validator->controller = $this;
        $validator->setUnique($unique_column_table);
        $validator->setPrimarykey($primary_key);

        //FILL
        $this->setDao(new $dao);
        $this->setObject($object);
        $this->setModel("coa"); //hanya 1 main model utama
        $this->setSubmodel(array('')); //harus array
        $this->setSubarray(array("deletedRows")); //harus array
        $this->setPropertyId($primary_key); //property id, primary key table
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
            ),
        );
    }
    public function reportlistRead() {

        $params = $this->getRequest()->getPost();
        $req = Apli::getRequest($params);
        $session = Apli::getSession();
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'reportbankpaymentvoucher', array(), array()));
        $objectCreator = new Cashier_Models_Master_Reportbankpaymentvoucher();
        $objectCreator->setProject($session->getProject());
        $objectCreator->setPt($session->getPt());
        $dao = $this->getDao();
        $dm->setObject($objectCreator);
        $dm->setDao($dao);
        $hasil = $dao->getReportList($req, $objectCreator, $session);
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





}
