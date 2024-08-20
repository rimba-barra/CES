<?php

class Erems_Models_Expenserequest_ExpenseDaoxxx extends Erems_Kouti_AbDao {

    protected $dbTable;

    public function __construct(Erems_Kouti_InterHasil $interHasil) {
        $this->dbTable = new Erems_Models_Dbtable_Db();
        $this->interHasil = $interHasil;
    }

    /* @return Erems_Kouti_InterHasil */

    public function getAll(Erems_Box_Models_App_HasilRequestRead $requestRead) {
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_expenserequest_read', $requestRead->getPage(), $requestRead->getLimit(), $requestRead->getOthersValue("expense_no"),$requestRead->getOthersValue("voucher_no"),$requestRead->getOthersValue("approved"),$requestRead->getOthersValue("paymentmethod_id"), $requestRead->getOthersValue("bot_expense_date"), $requestRead->getOthersValue("top_expense_date"), $requestRead->getOthersValue("bot_approve_date"), $requestRead->getOthersValue("top_approve_date"), $requestRead->getOthersValue("department_id")
        );
        $arEx = array();
        $arEx['totalRow'] = $hasil[0][0]['totalRow'];
        foreach ($hasil[1] as $row) {

            $groupedEmbed = array(new Erems_Models_Master_User(), new Erems_Models_Master_Department(), new Erems_Models_Master_PaymentMethod());
            $converter = new Erems_Models_App_Converter($row);
            $converter->process($groupedEmbed);
            $expense = new Erems_Models_Expenserequest_Expense();
            $expense->setArrayTable($row);
            $expense->setGroupedEmbed($groupedEmbed);

            $arEx['expense'][] = $expense;
        }
        /* bindHasil from table direct to array without Object */
        //$this->bindHasil(0,$hasil);
        // return $this->interHasil;
        return $arEx;
    }

    public function getDetail(Erems_Models_Expenserequest_Expense $ex) {
        $hasil = array();
        $arDetail = array();
        if ($ex->getId() > 0) {
            $hasil = $this->dbTable->SPExecute('sp_expenserequestdetail_read', $ex->getId());
            //$expense = new Erems_Models_Expenserequest_Expense();


            $acHasil = $hasil[0];

            foreach ($acHasil as $row) {

                $groupEmbed = array(new Erems_Models_Master_ExpenseType(), new Erems_Models_Master_Unit(), new Erems_Models_Master_Cluster(), new Erems_Models_Master_Block(), new Erems_Models_Master_PaymentType());

                $converter = new Erems_Models_App_Converter($row);
                $converter->process($groupEmbed);

                $x = new Erems_Models_Expenserequest_ExpenseDetail();
                $x->setArrayTable($row);
                $x->setGroupedEmbed($groupEmbed);
                $arDetail[] = $x;
            }
        }
        return $arDetail;
    }

    public function getDetailByUnit(Erems_Models_Master_Unit $unit) {
        $hasil = array();
        $arDetail = array();
        $unitId = (int) $unit->getId();
        if ($unitId == 0)
            return $arDetail;


        $hasil = $this->dbTable->SPExecute('sp_expenserequestdetailbyunit_read', $unitId);
        //$expense = new Erems_Models_Expenserequest_Expense();


        $acHasil = $hasil[0];
    

        foreach ($acHasil as $row) {

            $groupEmbed = array(new Erems_Models_Expenserequest_Expense(),new Erems_Models_Master_ExpenseType(), new Erems_Models_Master_Unit(), new Erems_Models_Master_Cluster(), new Erems_Models_Master_Block(), new Erems_Models_Master_PaymentType());

            $converter = new Erems_Models_App_Converter($row);
            $converter->process($groupEmbed);

            $x = new Erems_Models_Expenserequest_ExpenseDetail();
            $x->setArrayTable($row);
            $x->setGroupedEmbed($groupEmbed);
            $arDetail[] = $x;
        }



        return $arDetail;
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


        $row = $this->dbTable->SPUpdate('sp_expenserequest_create', $ex->getProjectId(), $ex->getPtId(), $ex->getNomor(), $ex->getDepartmentId(), $ex->getDate(), $ex->getNote(), $ex->getTotalAmount(), $ex->getAddBy(), $detail['expensedetail_id'], $detail['unit_id'], $detail['description'], $detail['amount'], $detail['paymenttype_id'], $detail['expensetype_id']);



        return $row;
    }

    public function update(Erems_Models_Expenserequest_Expense $ex, Erems_Box_Models_App_Decan $deletedDecan) {
        $row = 0;

        $detail = $ex->getDCResult();


        $row = $this->dbTable->SPUpdate('sp_expenserequest_update', $ex->getId(), $ex->getProjectId(), $ex->getPtId(), $ex->getNomor(), $ex->getDepartmentId(), $ex->getDate(), $ex->getNote(), $ex->getTotalAmount(), $ex->getAddBy(), $deletedDecan->getString(), $detail['expensedetail_id'], $detail['unit_id'], $detail['description'], $detail['amount'], $detail['paymenttype_id'], $detail['expensetype_id']
        );

        return $row;
    }
    
    public function approve(Erems_Models_Expenserequest_Expense $ex){
        $row = 0;
        $v = $ex->getVoucher();
        $row = $this->dbTable->SPUpdate('sp_expenserequest_approve', $ex->getId(),$v->getNumber(),$v->getDate(),$v->getReferenceNumber(),$ex->getApproveDate(),$ex->getPaymentMethodId(),$ex->getAddBy());
        return $row;
    }

    public function delete(Erems_Box_Models_App_Decan $decan, Erems_Kouti_Session $ses) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_expenserequest_destroy', $decan->getString(), $ses->getUserId());
        return $row;
    }

}

?>
