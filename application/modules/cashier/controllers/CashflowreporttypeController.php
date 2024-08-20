<?php

require_once dirname(__DIR__) . '../library/apli/ApliCashierController.php';

class Cashier_CashflowreporttypeController extends ApliCashierController {

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
		$cashflowtypeHasil = $dao->getCustomRead('detailcashflowtype', $request, $session);
        $ptModel = Apli::generateExtJSModelDirectWithDetail('pt','project');
        $projectModel = Apli::generateExtJSModelDirect('department');
		$cashflowtypeModel = Apli::generateExtJSModelDirect('cashflowtype');
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
				"cashflowtype" => array(
                    "model" => $cashflowtypeModel,
                    "data" => $cashflowtypeHasil[0]
                ),
            ),
        );
    }

}
