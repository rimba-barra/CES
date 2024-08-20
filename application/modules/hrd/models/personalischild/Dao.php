<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Dao
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Personalischild_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public static function getSession(){
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $session->report_path = APPLICATION_PATH . '/../public/app/hrd/report/';

        $sesBox = new Master_Box_Models_App_Session();
        $sesBox->getProject()->setId($session->getCurrentProjectId());
        $sesBox->getPt()->setId($session->getCurrentPtId());
        $sesBox->getUser()->setId($session->getUserId());
        
        return $sesBox;
    }

    public function save(Hrd_Models_Personalischild_Personalischild $d) {
        $hasil = 0;
        $hasil = 1;
        
        
        return $hasil;
    }

    
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Personalischild_Personalischild $d){
        $hasil = 0;
        
        $ses = $this->getSession();

        if($d->getIndicatorKtp() == 1){
            $hasil = $this->dbTable->SPExecute('sp_personalischild_read',
                    $d->getProject()->getId(),
                    $d->getPt()->getId(),
                    $d->getNikGroup(),
                    $d->getEmployeeName(),
                    $d->getIsChild(),
                    $d->getEmployeeStatusId(),
                    $r->getPage(), $r->getLimit());
        }else{
            $hasil = $this->dbTable->SPExecute('sp_personalischild_all_read',
                    $ses->getUser()->getId(),
                    $d->getProject()->getId(),
                    $d->getPt()->getId(),
                    $d->getNikGroup(),
                    $d->getEmployeeName(),
                    $d->getIsChild(),
                    $d->getEmployeeStatusId(),
                    $r->getPage(), $r->getLimit());
        }
        return $hasil;
    }
    
    public function getAllWoPL(Hrd_Models_Personalischild_Personalischild $d){
        $hasil = 0;

        $ses = $this->getSession();

        if($d->getIndicatorKtp() == 1){
            $hasil = $this->dbTable->SPExecute('sp_personalischild_read',
                    $d->getProject()->getId(),
                    $d->getPt()->getId(),
                    $d->getNikGroup(),
                    $d->getEmployeeName(),
                    $d->getIsChild(),
                    $d->getEmployeeStatusId(),
                    1,99999);
        }else{
            $hasil = $this->dbTable->SPExecute('sp_personalischild_all_read',
                    $ses->getUser()->getId(),
                    $d->getProject()->getId(),
                    $d->getPt()->getId(),
                    $d->getNikGroup(),
                    $d->getEmployeeName(),
                    $d->getIsChild(),
                    $d->getEmployeeStatusId(),
                    1,99999);
        }
        return $hasil;
    }

    public function getSpecialEmployee(Hrd_Models_Personalischild_Personalischild $d){
        $hasil = 0;
        $ses = $this->getSession();

        if($d->getIndicatorKtp() == 1){
            $hasil = $this->dbTable->SPExecute('sp_personalischild_read',
                    $d->getProject()->getId(),
                    $d->getPt()->getId(),
                    $d->getNikGroup(),
                    $d->getEmployeeName(),
                    $d->getIsChild(),
                    $d->getEmployeeStatusId(),
                    1,99999);
        }else{
            $hasil = $this->dbTable->SPExecute('sp_personalischild_all_read',
                    $ses->getUser()->getId(),
                    $d->getProject()->getId(),
                    $d->getPt()->getId(),
                    $d->getNikGroup(),
                    $d->getEmployeeName(),
                    $d->getIsChild(),
                    $d->getEmployeeStatusId(),
                    1,99999);
        }
        return $hasil;
    }

    public function getUpdateEmployee($session, Hrd_Models_Personalischild_Personalischild $d, $employee_id){
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_save_ischild_personal_update',
                $session->getUserId(),
                $employee_id,
                1);
        return $hasil;
    }

    public function getUpdateEmployeeUnchecked($session, Hrd_Models_Personalischild_Personalischild $d, $employee_id){
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_save_ischild_personal_update',
                $session->getUserId(),
                $employee_id,
                0);
        return $hasil;
    }
    

    public function update(Hrd_Models_Personalischild_Personalischild $em) {
        $hasil = 0;
        if ($em->getId() == 0) {
            return $hasil;
        }
       
        $hasil = 1;
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = 1;
        return $row;
    }
}
