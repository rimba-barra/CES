<?php

class Cashier_Models_Validator_VoucherValidator extends Cashier_Box_Models_App_Validator {
    public $kasbank_id;
    public function run(Cashier_Models_Master_Kasbank $pl) {
        $msg = "";
        $this->kasbank_id = 0;
        $dao = $this->controller->getDao();
        $name = $dao->codeExist($pl, $this->appRequest);
        $idExist = 0;
        $val = '';
        $request = $this->appRequest;
        if ($name) {
            if (count($name[0]) > 0 && $pl->getIs_f7_convert() == 0) {
                $idExist = $name[0][0]['payment_id'];
                $val = $name[0][0]['receipt_no'];
                $val2 = $name[0][0]['vid'];
            }
        }
        if ($idExist && ($pl->getId() != $idExist)) {
            $msg = "Receipt No. <b>" . $val . "</b> sudah terpakai oleh <b>" .$val2. "</b>";
        } else {

            $data = $this->paramdata;
            $attachment = array();
            $allattachmentdetail= array();
            $detailnonlink = array();
            $alldetailnonlink= array();
            $detailcoa = array();
            $subdetailcoa = array();
            $detailar = array();
            $detailescrow = array();
            $detailother = array();
            $alldetailcoa = array();
            $allsubdetailcoa = array();
            $alldetailar = array();
            $alldetailescrow = array();
            $alldetailother= array();

            $decanDetailCoa = array();
            
            $totaldetailcoa = count($data['detailcoa']);
            $validasirowlimit = $dao->maxRowProject($pl, $this->appRequest,$totaldetailcoa);
            $validasiupdatenokwitansi = $dao->validasiUpdateNoKwitansi($pl, $this->appRequest,$totaldetailcoa);
            $allowed = true;
            if(($data["payment_paymentflag_id"]==1 || $data["payment_paymentflag_id"]==2) && $data['dataflow']=="I" && $validasirowlimit[0][0]['result']==0){
                $allowed=false; 
                $msg = $msg . "<br>".$validasirowlimit[0][0]['msg'];
            }
            if($validasiupdatenokwitansi[0][0]['success']!='1'){
                $allowed = false;
                $msg = $msg . "<br>".$validasiupdatenokwitansi[0][0]['msg'];
            }
            if (count($data['detailcoa'])) {
                $detailcoa = $data['detailcoa'];
                $negative = '-';
                foreach ($detailcoa as $row) {
                    if($row['amount']<0) {
                        $row['amount'] = $negative.Cashier_Box_Tools::unformatMoney(number_format($row['amount'], 2));
                    } else {
                        $row['amount'] = Cashier_Box_Tools::unformatMoney(number_format($row['amount'], 2));
                    }
                    if($row['ppn_tipepajakdetail_id']==""){
                        $row['ppn_tipepajakdetail_id'] = 0;
                    }
                    if($row['pph_tipepajakdetail_id']==""){
                        $row['pph_tipepajakdetail_id'] = 0;
                    }
                    if($row['ppn_percentage']==""){
                        $row['ppn_percentage'] = 0;
                    }
                    if($row['pph_percentage']==""){
                        $row['pph_percentage'] = 0;
                    }
                    if($row['is_ppn']==""){
                        $row['is_ppn'] = 0;
                    }
                    if($row['is_pph']==""){
                        $row['is_pph'] = 0;
                    }
                    $d = new Cashier_Models_Transaction_Voucherdetail();
                    Cashier_Box_Tools::setArrayTable($d, $row);
                    $alldetailcoa[] = $d;
                }
                $decanDetailCoa = Cashier_Box_Tools::toDecan($alldetailcoa);
                $decanDetailCoa = $decanDetailCoa->getDCResult();
               
                
            }

            if (count($data['subdetailcoa'])) {
                $subdetailcoa = $data['subdetailcoa'];
               
                foreach ($subdetailcoa as $row) {
                    
                    $d = new Cashier_Models_Transaction_Vouchersubdetail();
                    Cashier_Box_Tools::setArrayTable($d, $row);
                    $allsubdetailcoa[] = $d;
                }
                $decanSubDetailCoa = Cashier_Box_Tools::toDecan($allsubdetailcoa);
                $decanSubDetailCoa = $decanSubDetailCoa->getDCResult();
            } else {
                $decanSubDetailCoa = array();
            }
            
            $decanAlldetailar = array();
            if (count($data['detailar'])) {
                $detailar = $data['detailar'];
                foreach ($detailar as $row) {
//                    print_r($row);
                    $d = new Cashier_Models_Transaction_Voucherardetail(true);
                    Cashier_Box_Tools::setArrayTable($d, $row);
                    $alldetailar[] = $d;
                }
                $decanAlldetailar = Cashier_Box_Tools::toDecan($alldetailar);
                $decanAlldetailar = $decanAlldetailar->getDCResult();
            }
            
            $decanAlldetailescrow = array();
            if (count($data['detailescrow'])) {
                $detailescrow = $data['detailescrow'];
                foreach ($detailescrow as $row) {
                    $d = new Cashier_Models_Purchaseletter_ScheduleEscrow();
                    Cashier_Box_Tools::setArrayTable($d, $row);
                    $alldetailescrow[] = $d;
                }
                $decanAlldetailescrow = Cashier_Box_Tools::toDecan($alldetailescrow);
                $decanAlldetailescrow = $decanAlldetailescrow->getDCResult();
            }
            
             $decanAlldetailother = array();
            if (count($data['detailotherpayment'])) {
                $detailother = $data['detailotherpayment'];
                foreach ($detailother as $row) {
                    $d = new Cashier_Models_Transaction_Voucherotherpaymentdetail();
                    Cashier_Box_Tools::setArrayTable($d, $row);
                    $alldetailother[] = $d;
                }
                $decanAlldetailother = Cashier_Box_Tools::toDecan($alldetailother);
                $decanAlldetailother = $decanAlldetailother->getDCResult();
            }
            
             $decanAllattachment = array();
            if (count($data['attachmentdetail'])) {
                $attachment = $data['attachmentdetail'];
                foreach ($attachment as $row) {
                    $d = new Cashier_Models_Transaction_Voucherattachment();
                    Cashier_Box_Tools::setArrayTable($d, $row);
                    $allattachmentdetail[] = $d;
                }
                $decanAllattachment = Cashier_Box_Tools::toDecan($allattachmentdetail);
                $decanAllattachment = $decanAllattachment->getDCResult();
            }

             $decannonlink = array();
            if (count($data['detailnonlink'])) {
                $nonlink = $data['detailnonlink'];
                foreach ($nonlink as $row) {
                    $d = new Cashier_Models_Transaction_Vouchernonlink();
                    Cashier_Box_Tools::setArrayTable($d, $row);
                    $alldetailnonlink[] = $d;
                }
                $decannonlink = Cashier_Box_Tools::toDecan($alldetailnonlink);
                $decannonlink = $decannonlink->getDCResult();
            }

            $deletednonlink = 0;
            if ($this->action == 'update') {
                if (count($data["deletednonlink"]) && isset($data["deletednonlink"])) {
                    $deletednonlink = implode("~", $data["deletednonlink"]);
                } 
            }
            
            $deletedDetail = 0;
            if (count($data["deletedRows"])) {
                $deletedDetail = implode("~", $data["deletedRows"]);
            }
            $deletedSubDetail = 0;
            if (count($data["deletedsubRows"])) {
                $deletedSubDetail = implode("~", $data["deletedsubRows"]);
            } 
            $deletedOtherPaymentRows = 0;
            if (count($data["deletedOtherPaymentRows"])) {
                $deletedOtherPaymentRows = implode("~", $data["deletedOtherPaymentRows"]);
            } 
            $deletedarpayment = 0;
            if (count($data["deletedarpayment"])) {
                $deletedarpayment = implode("~", $data["deletedarpayment"]);
            } 
            $deletedarpaymentesc = 0;
            if (count($data["deletedarpaymentesc"])) {
                $deletedarpaymentesc = implode("~", $data["deletedarpaymentesc"]);
            } 
            $deletedattachment = 0;
            if (count($data["deletedattachment"])) {
                $deletedattachment = implode("~", $data["deletedattachment"]);
            } 
            if($allowed){
                if ($this->action == 'update') {
                    $update = $dao->update($pl, $request, $decanDetailCoa, $decanSubDetailCoa, $decanAlldetailar,$decanAlldetailescrow, $decanAlldetailother, $deletedDetail, $deletedSubDetail,$deletedOtherPaymentRows,$deletedarpayment,$deletedarpaymentesc,$decanAllattachment,$deletedattachment,$decannonlink,$deletednonlink);
                } else {
                    $update = $dao->save($pl, $request, $decanDetailCoa, $decanSubDetailCoa, $decanAlldetailar, $decanAlldetailescrow, $decanAlldetailother,$decanAllattachment,$decannonlink);
                }
                if ($update) {
                    $msg = "SUCCESS";
                    $this->kasbank_id = $update;
                    $this->setStatus(TRUE);
                } else {
                    $msg = "Unable to proccess data.";
                }
            }
            
        }

        $this->setMsg($msg);
    }

}
