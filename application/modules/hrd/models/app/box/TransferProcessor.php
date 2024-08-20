<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of TransferProcessor
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_App_Box_TransferProcessor extends Hrd_Models_App_Box_Processor {

    protected function afterFillData($transfer) {

        self::fillMonthYear($transfer);

        return $transfer;
    }

    public function daoSave($dao, $object) {
      //  var_dump($object->getDCResult());
        return $dao->save($object);
    }

    public static function fillMonthYear(Hrd_Models_Payroll_Transfer_Transfer $transfer) {
        $periode = $transfer->getMonthYear();
        $my = explode("/", $periode);
        if (is_array($my)) {
            if (count($my) == 2) {
                $transfer->setMonth($my[0]);
                $transfer->setYear($my[1]);
            }
        }
    }

}
