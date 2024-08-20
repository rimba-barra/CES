<?php

class Cashier_Models_Validator_CorporatepayValidator extends Cashier_Box_Models_App_Validator {

    public $appRequest;
    public $session;
    public $action;
    public $corporatepay_id;
    public $paramdata;

    public function run(Cashier_Models_Master_Corporatepay $pl) {
        $msg = "";
        $this->corporatepay_id = 0;
        $dao = $this->controller->getDao();
        $idExist = 0;
        $request = $this->appRequest;
            $data = $this->paramdata;
            $corporatepaydetail = array();
            $allcorporatepaydetail = array();
            $is_allow = true;
            $totalcorporatepay = 0;

            $decanCorporatepayDetail = array();
            if (count($data['corporatepaydetail'])) {
                $corporatepaydetail = $data['corporatepaydetail'];
                $negative = '-';
                foreach ($corporatepaydetail as $row) {
                    $d = new Cashier_Models_Master_Corporatepaydetail();
                    Cashier_Box_Tools::setArrayTable($d, $row);
                    $allcorporatepaydetail[] = $d;
                }
                $decanCorporatepayDetail = Cashier_Box_Tools::toDecan($allcorporatepaydetail);
                $decanCorporatepayDetail = $decanCorporatepayDetail->getDCResult();
               
                
            }
            if($is_allow==true){
                $update = $dao->save($pl, $request, $decanCorporatepayDetail);
                if ($update) {
                    $msg = "SUCCESS";
                    $this->corporatepay_id = $update;
                    $this->setStatus(TRUE);
                    
                    
                } else {
                    $msg = "Unable to proccess data.";
                }
            }
//        }

        $this->setMsg($msg);
    }

}
