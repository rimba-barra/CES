<?php

class Cashier_Models_Validator_VoucherRealizationValidator extends Cashier_Box_Models_App_Validator {

    public $kasbank_id;

    public function run(Cashier_Models_Master_Kasbank $object) {
        $msg = "";
        $this->kasbank_id = 0;
        $dao = new Cashier_Models_Transaction_VoucherDao();
        $request = $this->appRequest;
        $name = $dao->checkIsRealization($object, $request);
        $checkNum = $dao->checkNumVoucher($object, $request);
        $checkSame = $dao->checkvouchernorealisasi($object, $request);
        $checkLastCounter = $dao->checkLastCounter($object, $request);
        $idExist = 0;
        $num = '';
        $val = '';
        $date = '';
        $data = $this->paramdata;

        if ($data['unrealisasi'] != 1) {
            if ($checkNum) {
                $num = $checkNum[0][0]['hasil'];
            }
        }

        if ($name) {
            if (count($name[0]) > 0) {
                $idExist = $name[0][0]['kasbank_id'];
                $val = $name[0][0]['voucher_no'];
                $date = $name[0][0]['realization_date'];
            }
        }
		
	

        if ($num and $data['unrealisasi'] != 1) {
            $msg = $num;
        } else if ($idExist && ($object->getId() != $idExist) and $data['unrealisasi'] != 1) {
            $msg = "Voucher No. " . $val . " sudah pernah terbuat, dengan tanggal realisasi (" . $date . ")";
        } else if( $checkSame[0][0]['result'] == 1 and $data['unrealisasi'] != 1) {
            $msg = "Voucher tidak dapat realisasi karna nomor voucher telah ada sebelumnya. Silahkan generate ulang";
        }  else if( $checkLastCounter[0][0]['result'] == 0 and $data['unrealisasi'] != 1) {
            $msg = "Voucher tidak dapat realisasi karna nomor voucher lompat. Silahkan hubungi administrator";
        } else {

            $update = $dao->prosesRealisasi($object, $request);

//            if ($update) {
//                $msg = "SUCCESS";
//                $this->setStatus(TRUE);
//            } else {
//                $msg = "Unable to proccess data.";
//            }

            if (array_key_exists('result', $update[0][0])) {
                if ($update[0][0]['result']) {
                    $msg = "SUCCESS";
                    $this->setStatus(TRUE);
                    $this->setTotal($update[0][0]['result']);
                } else {
                    $this->setTotal($update[0][0]['result']);
                    $msg = 'Unable to process, there are some data selected already closing';
                }
            } else {
                $msg = $update[2][0]['msg'];
            }
        }

        $this->setMsg($msg);
    }

}
