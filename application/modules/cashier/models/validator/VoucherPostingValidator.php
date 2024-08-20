<?php

class Cashier_Models_Validator_VoucherPostingValidator extends Cashier_Box_Models_App_Validator {

    public $kasbank_id;

    public function run(Cashier_Models_Master_Kasbank $object) {
        $msg = "";
        $this->kasbank_id = 0;
        $dao = new Cashier_Models_Transaction_VoucherDao();
        $request = $this->appRequest;
        $deletedId = array();
        $user = $this->session->getUser()->getId();
        $deletedPaymentId = array();
        $data = $this->paramdata;

        if (count($data) !== count($data, COUNT_RECURSIVE)) {
            foreach ($data as $row => $index) {
                $deletedId[$row] = $index['kasbank_id'];
                $deletedPaymentId[$row] = $index['payment_id_erems'];
            }
            $send = implode('~', $deletedId);
            $paymentid = implode('~', $deletedPaymentId);
        } else {
            $send = $data['kasbank_id'];
            $paymentid = $data['payment_id_erems'];
        }
        $checkisexistvouhcerno = $dao->checkisexistvouhcerno($request, $send, $paymentid);

        if ( $checkisexistvouhcerno[0][0]['result'] == 1 ) {
            $msg = $checkisexistvouhcerno[0][0]['msg'];
        }else{

            $update = $dao->prosesPosting($user, $send, $paymentid);

            if ($update) {
                if ($update[0]) {
                    if (array_key_exists('result', $update[0][0])) {
                        $msg = "SUCCESS";
                        $this->setStatus(TRUE);
                        $this->setTotal($update[0][0]['result']);
                    } else {
    //            $msg = $update[2][0]['msg']; 
                        $msg = 'Unable to posting data, selected data was closed or already posted';
                    }
                } else {
                    $msg = 'Unable to posting data, selected data was closed or already posted';
                }
            } else {
                $msg = 'Unable to posting data, selected data was closed or already posted';
            }
        }


        $this->setMsg($msg);
    }

}
