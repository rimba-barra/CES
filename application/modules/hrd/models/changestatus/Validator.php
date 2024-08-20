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
class Hrd_Models_Changestatus_Validator extends Box_Models_App_Validator {

    public function run(Hrd_Models_Changestatus_Changestatus $d) {
        $msg = "";
        
        
        $dao = new Hrd_Models_Changestatus_Dao();
        $oneChange = NULL;
        if($d->getId() > 0){ // untuk proses update
            $oneChange = $dao->getOne($d);
            if(Box_Tools::adaRecord($oneChange)){
                $objName = "";
                if($d->getType()== Box_Config::CHANGESTATUSTYPE_MUTASI){
                    $objName = "mutasi";
                }else if($d->getType()== Box_Config::CHANGESTATUSTYPE_PROMOSI){
                    $objName = "promosi";
                }else{
                    $objName = "rotasi";
                }
                $oneChange = Box_Tools::toObjectsb($objName, $oneChange,TRUE);
           
               
                
            }
            
        }

        if ($d->getEmployee()->getId() == 0) {
            $msg = "Invalid Employee";
        } else if ($d->getType() == 0) {
            $msg = "Invalid type";
        } else {
            $tempValid = FALSE;

            /// for promosi / demosi
            if ($d->getType() == Box_Config::CHANGESTATUSTYPE_PROMOSI) {
                if (!$d->getEffectiveDate()) {
                    $msg = "Efektik tanggal tidak valid";
                } else if ($d->getNewGroup()->getId() == 0) {
                    $msg = "Golongan baru tidak valid";
                } else if ($d->getNewPosition()->getId() == 0) {
                    $msg = "Jabatan baru tidak valid";
                } else {
                    $tempValid = TRUE;
                }
            } else if ($d->getType() == Box_Config::CHANGESTATUSTYPE_ROTASI) {
                if (!$d->getEffectiveDate()) {
                    $msg = "Efektik tanggal tidak valid";
                } else if ($d->getNewDepartment()->getId() == 0) {
                    $msg = "Departemen baru tidak valid";
                } else if ($d->getNewDivision()->getId() == 0) {
                    $msg = "Division baru tidak valid";
                } else if ($d->getNewPosition()->getId() == 0) {
                    $msg = "Jabatan baru tidak valid";
                } else {
                    $tempValid = TRUE;
                }
            } else if ($d->getType() == Box_Config::CHANGESTATUSTYPE_MUTASI) {
                if (!$d->getEffectiveDate()) {
                    $msg = "Efektik tanggal tidak valid";
                } else if ($d->getNewDepartment()->getId() == 0) {
                    $msg = "Departemen baru tidak valid";
                } else if ($d->getNewGroup()->getId() == 0) {
                    $msg = "Golongan baru tidak valid";
                } else if ($d->getNewPosition()->getId() == 0) {
                    $msg = "Jabatan baru tidak valid";
                } else {
                    $tempValid = TRUE;
                }
            }
            
            /// kalau sudah approve tidak boleh update menjadi tidak approve
            if($d->getId() > 0 && $oneChange != NULL){
                if($d->getIsApprove()==0 && $oneChange->getIsApprove()==1){
                    $tempValid = FALSE;
                    $msg = "Transaksi ini sudah di approve.";
                }
            }

            if ($tempValid == TRUE) {
                if (intval($d->getIsApprove()) == 1) {
                    if (strlen($d->getSkNumber()) < 5) {
                        $msg = "SK Number minimal 5 karakter";
                    } else {
                        $this->setStatus(TRUE);
                    }
                } else {
                    $this->setStatus(TRUE);
                }
            }
        }

     
        $this->setMsg($msg);
    }

}
