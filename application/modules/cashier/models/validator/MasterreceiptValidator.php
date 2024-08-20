<?php

class Cashier_Models_Validator_MasterreceiptValidator extends Cashier_Box_Models_App_Validator {

    public $appRequest;
    public $session;
    public $action;
    public $receipt_id;
    public $paramdata;

    public function run(Cashier_Models_Master_Receipt $pl) {
        $msg = "";
        $this->receipt_id = 0;
        $dao = $this->controller->getDao();
        $idExist = 0;
        $request = $this->appRequest;
            $data = $this->paramdata;
            $validationreceiptno = $dao->validationreceiptno($pl, $request);
            if(($validationreceiptno[0][0]['receipt_no']!=null || $validationreceiptno[0][0]['receipt_no']!='')&& $data['receipt_type'].$data['prefix_no'].$data['receipt_no']!=$data['receipt_type_bfr'].$data['prefix_no_bfr'].$data['receipt_no_bfr']){
                $msg = "Gagal create. Receipt No ".$validationreceiptno[0][0]['receipt_no']." sudah ada.";
            }else{
                if ($this->action == 'update') {
                    $update = $dao->update($pl, $request);
                } else {
                    $update = $dao->save($pl, $request);
                }
                if ($update) {
                    $msg = "SUCCESS";
                    $this->receipt_id = $update;
                    $this->setStatus(TRUE);
                } else {
                    $msg = "Unable to proccess data.";
                }
            }
//        }

        $this->setMsg($msg);
    }

}
