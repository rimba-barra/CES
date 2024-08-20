<?php

require_once dirname(__DIR__) . '../library/apli/ApliCashierController.php';

class Cashier_ReportarkawasanController extends ApliCashierController {

    public function init() {
        $this->setDao(new Cashier_Models_Master_DefaultDao());
        $this->setValidator(new Cashier_Models_Validator_VoucherValidator());
        $this->setObject(new Cashier_Models_Master_Kasbank());
        $validator = $this->getValidator();
        $validator->controller = $this;
    }
    public function detailRead() {

        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $request->setModule('masterclosing');
        $dao = $this->getDao();
//        $ptHasil = $dao->getCustomRead('detailpt',$request,$session);
//        $ptModel = Apli::generateExtJSModelDirect('pt');
        $projectHasil = $dao->getCustomReadDirectModule('voucher', 'detailproject', $request, $session);
        $projectModel = Apli::generateExtJSModelDirectWithDetail('multiproject', array('user', 'project'));
        return array(
            "data" => array(
                "project" => array(
                    "model" => $projectModel,
                    "data" => $projectHasil[0]
                ),
                "ptid" => $session->getPt()->getId(),
                "FILE_REPORT" => Cashier_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($session->getProject()->getId(), $session->getPt()->getId())->getReportArPerKawasan(),
            ),
        );
    }

}
