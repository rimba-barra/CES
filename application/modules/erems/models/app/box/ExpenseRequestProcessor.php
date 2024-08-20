<?php

/**
 * Description of AbsentProcessor
 *
 * @author MIS
 */
class Erems_Models_App_Box_ExpenseRequestProcessor extends Erems_Models_App_Box_Processor {

    public function daoProses($dao, $object, $modeCreate) {
     
        switch ($modeCreate) {
            case "approve":
                return $dao->approve($object);
                break;
        }
    }

    public function afterFillData($expense) {

        return $expense;
    }

    private function hitungTotalPayment(Erems_Models_Expenserequest_Expense $exp) {
        $total = 0;
        $detail = $exp->getExpenseDetail();
        foreach ($detail as $row) {
            if ($row instanceof Erems_Models_Expenserequest_ExpenseDetail) {
                $total +=$row->getAmount();
            }
        }
        $exp->setTotalAmount($total);
    }

    public function daoUpdate($dao, $object) {
        $this->hitungTotalPayment($object);
        $decan = NULL;
        if ($object->getId() > 0) {
            $data = $this->getData();
            $de = new Erems_Box_Delien_DelimiterEnhancer();
            $decan = new Erems_Box_Models_App_Decan(explode(",", $data["deletedRows"]));
            $de->setDelimiterCandidate($decan);
            $de->generate();
        }
        return $dao->update($object,$decan);
    }

    public function daoSave($dao, $object) {
        $this->hitungTotalPayment($object);
        return $dao->save($object);
    }

}

?>
