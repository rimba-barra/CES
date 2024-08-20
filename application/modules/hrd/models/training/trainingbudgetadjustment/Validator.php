<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Validator
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Training_Trainingbudgetadjustment_Validator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Training_Trainingbudgetadjustment_Trainingbudgetadjustment $d){
        $msg = "";
        $ok = "";

        if($d->getApplyAdjustmentTo() < 1){
            $msg = "Silahkan pilih apply budget";
            $ok = 0;
        }elseif($d->getApplyAdjustmentTo() == 1){
            if(empty($d->getBudgetProgramId())){
                $msg = "Silahkan pilih budget program";
                $ok = 0;
            }else{
                if($d->getAdjustment() < 1){
                    $msg = "Adjustment tidak boleh kosong";
                    $ok = 0;
                }else{
                    $ok = 1;
                }
            }
        }elseif($d->getApplyAdjustmentTo() == 2){
            if(empty($d->getEmployeeId())){
                $msg = "Silahkan pilih employee";
                $ok = 0;
            }else{
                if($d->getAdjustment() < 1){
                    $msg = "Adjustment tidak boleh kosong";
                    $ok = 0;
                }else{
                    $ok = 1;
                }
            }
        }else{

            if($d->getAdjustment() < 1){
                $msg = "Adjustment tidak boleh kosong";
                $ok = 0;
            }else{
                $ok = 1;
            }
        }

        if($ok == 1){
            $this->setStatus(TRUE);
        }else{
        	$this->setMsg($msg);
        }
    }
}
