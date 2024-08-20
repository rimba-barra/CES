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
class Hrd_Models_Training_Trainingbudget_Validator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Training_Trainingbudget_Trainingbudget $d){
        $msg = "";
        $ok = "";

        if($d->getBudget()){
            $explode_back_budget = explode('.', $d->getBudget());
            if(array_key_exists(1, $explode_back_budget)){
                $explode_comma_budget = explode(',', $explode_back_budget[0]);
                if(array_key_exists(1, $explode_comma_budget)){
                    // $gabungan_budget = $explode_comma_budget[0].''.$explode_comma_budget[1];
                    //updated by anas 28042022
                    $gabungan_budget = str_replace(',','',$explode_back_budget[0]);
                }else{
                    $gabungan_budget = $explode_comma_budget[0];
                }
            }else{
                $gabungan_budget = $explode_back_budget[0];
            }
        }else{
            $gabungan_budget = 0 ;
        }
        if($d->getSisaBudget()){
            $explode_back = explode('.', $d->getSisaBudget());
            if(array_key_exists(1, $explode_back)){
                $explode_comma = explode(',', $explode_back[0]);
                if(array_key_exists(1, $explode_comma)){
                    // $gabungan_sisa = $explode_comma[0].''.$explode_comma[1];
                    //updated by anas 28042022
                    $gabungan_sisa = str_replace(',','',$explode_back[0]);
                }else{
                    $gabungan_sisa = $explode_comma[0];
                }
            }else{
                $gabungan_sisa = $explode_back[0];
            }
        }else{
            $gabungan_sisa = 0 ;
        }

        if($d->getTrainingBudgetProgramId() < 1){
            $msg = "Budget Program tidak boleh kosong";
            $ok = 0;
        }else{
            if($d->getBudget() < 1){
                $msg = "Budget tidak boleh kosong";
                $ok = 0;
            }elseif($gabungan_sisa < $gabungan_budget){
                $msg = "Sisa Saldo lebih kecil daripada Budget";
                $ok = 0;
            }else{
                if($d->getApplyBudget() < 1){
                    $msg = "Silahkan pilih apply budget";
                    $ok = 0;
                }elseif($d->getApplyBudget() == 1){
                    if(empty($d->getBandingId())){
                        $msg = "Silahkan pilih banding";
                        $ok = 0;
                    }else{
                        if(empty($d->getEmployeeStatusId())){
                            $msg = "Silahkan pilih employee status";
                            $ok = 0;
                        }else{
                            $ok = 1;
                        }
                    }
                }elseif($d->getApplyBudget() == 2){
                    if(empty($d->getDepartmentId())){
                        $msg = "Silahkan pilih department";
                        $ok = 0;
                    }else{
                        if(empty($d->getEmployeeStatusId())){
                            $msg = "Silahkan pilih employee status";
                            $ok = 0;
                        }else{
                            $ok = 1;
                        }
                    }
                }elseif($d->getApplyBudget() == 3){
                    if(empty($d->getDepartmentId())){
                        $msg = "Silahkan pilih department";
                        $ok = 0;
                    }elseif(empty($d->getBandingId())){
                        $msg = "Silahkan pilih banding";
                        $ok = 0;
                    }else{
                        if(empty($d->getEmployeeStatusId())){
                            $msg = "Silahkan pilih employee status";
                            $ok = 0;
                        }else{
                            $ok = 1;
                        }
                    }
                }else{

                    if(empty($d->getEmployeeStatusId())){
                        $msg = "Silahkan pilih employee status";
                        $ok = 0;
                    }else{
                        $ok = 1;
                    }
                }

            }
        }

        if($ok == 1){
            $this->setStatus(TRUE);
        }else{
        	$this->setMsg($msg);
        }
    }
}
