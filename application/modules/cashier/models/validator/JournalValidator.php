<?php

class Cashier_Models_Validator_JournalValidator extends Cashier_Box_Models_App_Validator {

    public function run(Cashier_Models_Master_Journal $pl) {
        $msg = "";
        $dao = $this->controller->getDao();
        $name = $dao->codeExist($pl, $this->appRequest);
        $idExist = 0;
        $val = '';
        $request = $this->appRequest;
        if ($name) {
            if (count($name[0]) > 0) {
                $idExist = $name[0][0]['payment_id'];
                $val = $name[0][0]['receipt_no'];
            }
        }
        if ($idExist && ($pl->getId() != $idExist)) {
            $msg = "Receipt No. " . $val . " sudah terpakai.";
        } else {

            $data = $this->paramdata;
            $detailcoa = array();
            $subdetailcoa = array();
            $detailar = array();
            $detailescrow = array();
            $alldetailcoa = array();
            $allsubdetailcoa = array();
            $alldetailar = array();
            $alldetailescrow = array();

            $decanDetailCoa = array();
            if (count($data['detailcoa'])) {
                $detailcoa = $data['detailcoa'];
                
                foreach ($detailcoa as $row) {
                    $row['amount'] = Cashier_Box_Tools::unformatMoney(number_format((float)$row['amount'], 2));
                    $row['amountc'] = Cashier_Box_Tools::unformatMoney(number_format((float)$row['amountc'], 2));
                    $d = new Cashier_Models_Transaction_Journaldetail();
                    Cashier_Box_Tools::setArrayTable($d, $row);
                    $alldetailcoa[] = $d;
                }
                $decanDetailCoa = Cashier_Box_Tools::toDecan($alldetailcoa);
                $decanDetailCoa = $decanDetailCoa->getDCResult();
            }

            if (count($data['subdetailcoa'])) {
                $subdetailcoa = $data['subdetailcoa'];
                foreach ($subdetailcoa as $row) {
                    $d = new Cashier_Models_Transaction_Journalsubdetail();
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
                    $d = new Cashier_Models_Purchaseletter_Schedule(true);
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
            

            
            $deletedDetail = 0;
            if (count($data["deletedRows"])) {
                $deletedDetail = implode("~", $data["deletedRows"]);
            }
            $deletedSubDetail = 0;
            if (count($data["deletedsubRows"])) {
                $deletedSubDetail = implode("~", $data["deletedsubRows"]);
            }
            
           


            if ($this->action == 'update') {
                $update = $dao->update($pl, $request, $decanDetailCoa, $decanSubDetailCoa, $decanAlldetailar, $deletedDetail, $deletedSubDetail);
            } else {
                $update = $dao->save($pl, $request, $decanDetailCoa, $decanSubDetailCoa, $decanAlldetailar, $decanAlldetailescrow);
            }


            if ($update) {
                $msg = "Success";
                $this->setStatus(TRUE);
                $this->setPrimarykey($update);
            } else {
                $msg = "Unable to proccess data.";
            }
        }

        $this->setMsg($msg);
    }

}
