<?php

class Erems_Models_Expenserequest_ExpenseDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {

    protected $dbTable;

    /* @return Erems_Kouti_InterHasil */

    public function getAll(Erems_Box_Models_App_HasilRequestRead $requestRead, Erems_Box_Models_App_Session $session = NULL) {
        $hasil = array();

        $bot_expense_date = $requestRead->getOthersValue("bot_expense_date");
        $top_expense_date = $requestRead->getOthersValue("top_expense_date");
        $bot_approve_date = $requestRead->getOthersValue("bot_approve_date");
        $top_approve_date = $requestRead->getOthersValue("top_approve_date");

        if ($session) {
            $approved = $requestRead->getOthersValue("approved");
         
            if(strlen($approved) < 1){
                $approved = 999;
            }
            
            if(intval($approved)==2){
                $approved = 1;
            }else if(intval($approved)==1){
                $approved = 0;
            }
           
            $hasil = $this->dbTable->SPExecute('sp_expenserequest_read',
                    $session->getProject()->getId(),
                    $session->getPt()->getId(),
                    $requestRead->getPage(), $requestRead->getLimit(), 
                    $requestRead->getOthersValue("expense_no"), 
                    $requestRead->getOthersValue("voucher_no"),
                    $approved, 
                    $requestRead->getOthersValue("paymentmethod_id"),
                    $requestRead->getOthersValue("department_id"),
					$requestRead->getOthersValue("unit_number"),
                    $bot_expense_date,$top_expense_date,$bot_approve_date,$top_approve_date
            );
        } else {
            $hasil = $this->dbTable->SPExecute('sp_expenserequest_read', $requestRead->getPage(), $requestRead->getLimit(), $requestRead->getOthersValue("expense_no"), $requestRead->getOthersValue("voucher_no"), $requestRead->getOthersValue("approved"), $requestRead->getOthersValue("paymentmethod_id"), $requestRead->getOthersValue("department_id"), $requestRead->getOthersValue("unit_number"),$bot_expense_date,$top_expense_date,$bot_approve_date,$top_approve_date
            );
        }
        
        return $hasil;
    }

    public function getDetail(Erems_Models_Expenserequest_Expense $ex, Erems_Box_Models_App_HasilRequestRead $requestRead) {
        $hasil = array();
        $arDetail = array();
        if ($ex->getId() > 0) {
            $hasil = $this->dbTable->SPExecute('sp_expenserequestdetail_read', $ex->getId(), $requestRead->getPage(), $requestRead->getLimit());
        }
        return $hasil;
    }

    public function getDetailByUnit(Erems_Models_Master_Unit $unit, Erems_Box_Models_App_HasilRequestRead $requestRead) {
        $hasil = array();
        $arDetail = array();
        $unitId = (int) $unit->getId();
        if ($unitId == 0)
            return $arDetail;


        $hasil = $this->dbTable->SPExecute('sp_expenserequestdetailbyunit_read', $unitId, $requestRead->getPage(), $requestRead->getLimit());
        //$expense = new Erems_Models_Expenserequest_Expense();
        return $hasil;
    }
    
    public function checkIsRequested($unitId,$paymentTypeId,$purchaseID){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_expenserequestexist_read', $unitId,$paymentTypeId,$purchaseID);
        if(is_array($hasil)){
            if(count($hasil) > 0){
                if(count($hasil[1]) > 0){
                  
                    return $hasil;
                }
            }
        }
        $hasil = array();
        return $hasil;
    }

    public function getPaymentTypeByUnit(Erems_Models_Master_Unit $unit) {
        $hasil = FALSE;
        $arDetail = FALSE;
        $unitId = (int) $unit->getId();
        if ($unitId == 0)
            return $arDetail;

        $hasil = $this->dbTable->SPExecute('sp_expenserequestgetpaymenttypebyunit_read', $unitId);
        //$expense = new Erems_Models_Expenserequest_Expense();
        $acHasil = $hasil[0];

        foreach ($acHasil as $row) {
            $x = new Erems_Models_Master_PaymentType();
            $x->setArrayTable($row);
            $arDetail[] = $x;
        }

        return $arDetail;
    }

    public function save(Erems_Models_Expenserequest_Expense $ex) {
        $row = 0;
        $detail = $ex->getDCResult();
        if (count($ex->getExpenseDetail()) == 0) {
            return $row;
        }
        $v = $ex->getVoucher();
        
        $row = $this->dbTable->SPUpdate('sp_expenserequest_create', $ex->getProject()->getId(), $ex->getPt()->getId(), $ex->getNomor(), $ex->getDepartment()->getId(), $ex->getDate(), $ex->getNote(), $ex->getTotalAmount(), $ex->getAddBy(), $detail['expensedetail_id'], $detail['unit_unit_id'], $detail['description'], $detail['amount'], $detail['paymenttype_paymenttype_id'], $detail['expensetype_expensetype_id'],$detail['purchaseletter_purchaseletter_id'],$v->getNumber(),$v->getReferenceNumber());

        return $row;
    }

    public function update(Erems_Models_Expenserequest_Expense $ex, Erems_Box_Models_App_Decan $deletedDecan = NULL) {
        $row = 0;
        $v = $ex->getVoucher();
        $detail = $ex->getDCResult();
        
        $ds = '';

        if ($deletedDecan) {
            $ds = $deletedDecan->getString();
        }

        $row = $this->dbTable->SPUpdate('sp_expenserequest_update', $ex->getId(), $ex->getProjectId(), $ex->getPtId(), $ex->getNomor(), $ex->getDepartmentId(), $ex->getDate(), $ex->getNote(), $ex->getTotalAmount(), $ex->getAddBy(), $ds, $detail['expensedetail_id'], $detail['unit_unit_id'], $detail['description'], $detail['amount'], $detail['paymenttype_paymenttype_id'], $detail['expensetype_expensetype_id']
        ,$ex->getPaymentMethod()->getId(),$v->getNumber(),$v->getReferenceNumber(),$detail['purchaseletter_purchaseletter_id']);
        //var_dump($this->dbTable);
        return $row;
    }

    public function approve(Erems_Models_Expenserequest_Expense $ex) {
        $row = 0;
        $v = $ex->getVoucher();
        $row = $this->dbTable->SPUpdate('sp_expenserequest_approve', $ex->getId(), $v->getNumber(), $v->getDate(), $v->getReferenceNumber(), $ex->getApproveDate(), $ex->getPaymentMethod()->getId(), $ex->getAddBy());

        return $row;
    }
    
    public function unApprove(Erems_Models_Expenserequest_Expense $ex) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_expenserequest_unapprove', $ex->getId(),$ex->getAddBy());
        return $row;
    }

    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_expenserequest_destroy', $decan->getString(), $session->getUser()->getId());
        return $row;
    }
}
?>
