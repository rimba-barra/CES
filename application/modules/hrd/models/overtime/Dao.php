<?php

/**
 * Description of Dao
 *
 * @author MIS
 */
class Hrd_Models_Overtime_Dao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function updatestatus_in_Intranet($valid, $lembur_id, $configintranet, $overtime_id) {
        if ($valid) {
            foreach ($lembur_id as $row) {
                $id = $row;
                $dao_intranet = new Hrd_Models_Intranet_OvertimeDao();
                $dao_intranet->updateStatus($configintranet, $id);
            }
        }
    }
    
    //edit by wulan sari 20190320
    public function updatestatus_in_Api($valid, $lembur_id, $admin) {
        if ($valid) {
            foreach ($lembur_id as $row) {
                $id = $row;
                $dao_intranet = new Hrd_Models_Intranet_OvertimeDao();
                $dao_intranet->updateStatusApi($id, $admin);
            }
        }
    }

    public function save(Hrd_Models_Overtime_Overtime $d) {
        $basedata = $d->getBasedata();
        $ref_base = '';
        $ref_lembur_id = '';
        if ($basedata == 'intranet') {
            $transaction = $d->getTransaction();
            if ($transaction == 'overtimeintranet') {
                $ref_base = $basedata;
                $ref_lembur_id = $d->getLembur_id();
            }
            
        // edit by wulan sari 20190320
        } else if ($basedata == 'api') {
            $transaction = $d->getTransaction();
            if ($transaction == 'overtimeintranet') {
                $ref_base = $basedata;
                $ref_lembur_id = $d->getLembur_id();
            }
        }
        
        if($d->getCalculate_from_intranet() == 'on' || $d->getCalculate_from_intranet() == '1' || $d->getCalculate_from_intranet() == 'true'){
            $d->setCalculate_from_intranet(1);
        }
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_overtime_create', $d->getAddBy(), $d->getProject()->getId(), $d->getPt()->getId(), $d->getDate(), 
                $d->getEmployee()->getId(), $d->getShiftType()->getId(), $d->getStatus(), $d->getReason(), $d->getPlanBeforeStart(), $d->getPlanBeforeEnd(), 
                $d->getPlanAfterStart(), $d->getPlanAfterEnd(), $d->getExecTimeInStart(), $d->getExecTimeInEnd(), $d->getBeforeDurationText(), 
                $d->getBeforeNetHours(), $d->getBeforeBreakDuration(), $d->getBeforeTotalHours(), $d->getExecTimeOutStart(), $d->getExecTimeOutEnd(), 
                $d->getAfterDurationText(), $d->getAfterNetHours(), $d->getAfterBreakDuration(), $d->getAfterTotalHours(), $d->getBeforeFactorFactor1(), 
                $d->getBeforeFactorValue1(), $d->getBeforeFactorResult1(), $d->getBeforeFactorFactor2(), $d->getBeforeFactorValue2(), $d->getBeforeFactorResult2(), 
                $d->getAfterFactorFactor1(), $d->getAfterFactorValue1(), $d->getAfterFactorResult1(), $d->getAfterFactorFactor2(), $d->getAfterFactorValue2(), 
                $d->getAfterFactorResult2(), $d->getAfterFactorFactor3(), $d->getAfterFactorValue3(), $d->getAfterFactorResult3(), $d->getDasarLembur(), 
                $d->getJamKerja(), $d->getNilaiLembur(), $d->getMakanExtra(), $d->getTotalHour(), $d->getIntranet_reportto_id(), $d->getIntranet_hrd_comment(), 
                $ref_base, $ref_lembur_id, $d->getIntranet_hrd_comment_jam(), $d->getCalculate_from_intranet()
        );
        
        if ($basedata == 'intranet') {
            $transaction = $d->getTransaction();
            if ($transaction == 'overtimeintranet') {
                $tmp_lembur_id = explode(",", $d->getLembur_id());
                $array_lembur_id = $tmp_lembur_id;
                $configintranet = $d->getConfigintranet();
                $this->updatestatus_in_Intranet($hasil, $array_lembur_id, $configintranet, $hasil);
            }
            
        // edit by wulan sari 20190320
        } else if ($basedata == 'api') {
            $transaction = $d->getTransaction();
            if ($transaction == 'overtimeintranet') {
                $tmp_lembur_id = explode(",", $d->getLembur_id());
                $array_lembur_id = $tmp_lembur_id;
                $configintranet = $d->getConfigintranet();
                $this->updatestatus_in_Api($hasil, $array_lembur_id, $d->getAddBy());
            }
        }
        // end by wulan sari 20190320
        
        return $hasil;
    }

    public function update(Hrd_Models_Overtime_Overtime $d) {
        $hasil = 0;

        //   $d->setSelectedRelation("overtimes");




        if($d->getCalculate_from_intranet() == 'on' || $d->getCalculate_from_intranet() == '1' || $d->getCalculate_from_intranet() == 'true'){
            $d->setCalculate_from_intranet(1);
        } else {
            $d->setCalculate_from_intranet(0);            
        }

        $hasil = $this->dbTable->SPUpdate('sp_overtime_update', $d->getAddBy(), $d->getProject()->getId(), $d->getPt()->getId(), $d->getId(), $d->getDate(), 
                $d->getEmployee()->getId(), 
                $d->getShiftType()->getId(), $d->getStatus(), $d->getReason(), $d->getPlanBeforeStart(), $d->getPlanBeforeEnd(), $d->getPlanAfterStart(), 
                $d->getPlanAfterEnd(), $d->getExecTimeInStart(), $d->getExecTimeInEnd(), $d->getBeforeDurationText(), $d->getBeforeNetHours(), 
                $d->getBeforeBreakDuration(), $d->getBeforeTotalHours(), $d->getExecTimeOutStart(), $d->getExecTimeOutEnd(), $d->getAfterDurationText(), 
                $d->getAfterNetHours(), $d->getAfterBreakDuration(), $d->getAfterTotalHours(), $d->getBeforeFactorFactor1(), $d->getBeforeFactorValue1(), 
                $d->getBeforeFactorResult1(), $d->getBeforeFactorFactor2(), $d->getBeforeFactorValue2(), $d->getBeforeFactorResult2(), $d->getAfterFactorFactor1(), 
                $d->getAfterFactorValue1(), $d->getAfterFactorResult1(), $d->getAfterFactorFactor2(), $d->getAfterFactorValue2(), $d->getAfterFactorResult2(), 
                $d->getAfterFactorFactor3(), $d->getAfterFactorValue3(), $d->getAfterFactorResult3(), $d->getDasarLembur(), $d->getJamKerja(), 
                $d->getNilaiLembur(), $d->getMakanExtra(), $d->getTotalHour(), $d->getIntranet_reportto_id(), $d->getIntranet_hrd_comment(), 
                $d->getIntranet_hrd_comment_jam(), $d->getCalculate_from_intranet()
        );

        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Overtime_Overtime $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_overtime_read', $d->getProject()->getId(), $d->getPt()->getId(), $r->getPage(), $r->getLimit());

        return $hasil;
    }

    public function getAllWithEmployeeFilter(Box_Models_App_HasilRequestRead $r, Hrd_Models_Overtime_Overtime $d, Hrd_Models_Employee_Employee $emp, $start, $end) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_overtime_read', $d->getProject()->getId(), $d->getPt()->getId(), $r->getPage(), $r->getLimit(), $emp->getName(), intval($emp->getDepartment()->getId()) == 999 ? "" : intval($emp->getDepartment()->getId()), 
                $start, $end, $emp->getId());
        //var_Dump($this->dbTable);


        return $hasil;
    }

    public function getShiftInformation(Hrd_Models_Overtime_Header $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_overtimeshiftinfo_read', $d->getEmployee()->getId(), $d->getDate());
        return $hasil;
    }

    public function getOvertimes(Box_Models_App_HasilRequestRead $r, Hrd_Models_Overtime_Header $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_overtimedetail_read', $d->getId());
        return $hasil;
    }

    /* @return boolean */

    public function isExist(Hrd_Models_Overtime_Overtime $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_overtimecodeexist_read', $d->getDate(), $d->getEmployee()->getId(), $d->getProject()->getId(), $d->getPt()->getId(), $d->getExecTimeInStart(), $d->getExecTimeInEnd(), $d->getExecTimeOutStart(), $d->getExecTimeOutEnd());

        if (Box_Tools::adaRecordSimple($hasil)) {
            return TRUE;
        }

        return FALSE;
    }


    public function isAbsentNull(Hrd_Models_Overtime_Overtime $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_overtimeabsentexist_read', $d->getDate(), $d->getEmployee()->getId(), $d->getProject()->getId(), $d->getPt()->getId());

        if (Box_Tools::adaRecordSimple($hasil)) {
            return TRUE;
        }

        return FALSE;
    }

    public function getAbsentTime(Hrd_Models_Overtime_Overtime $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_overtimeabsenttime_read', $d->getDate(), $d->getEmployee()->getId(), $d->getProject()->getId(), $d->getPt()->getId());
        //var_dump($this->dbTable);
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_overtime_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }

    public function deleteOne($id, $userId) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_overtime_destroy', $id, $userId);

        return $row;
    }
    
    function getEmail($employee_id, $intranet_reportto_id, $user_id, $overtime_id, $comment) {
        $hasil_selected	= $this->dbTable->SPExecute('sp_overtime_update_comment', $user_id, $overtime_id, $comment);   
        $hasil_selected	= $this->dbTable->SPExecute('sp_overtime_email', $employee_id, $intranet_reportto_id);
        return $hasil_selected;
    }
    
    function getEmailJam($employee_id, $intranet_reportto_id, $user_id, $overtime_id, $comment) {
        $hasil_selected	= $this->dbTable->SPExecute('sp_overtime_update_comment_jam', $user_id, $overtime_id, $comment);   
        $hasil_selected	= $this->dbTable->SPExecute('sp_overtime_email', 0, $intranet_reportto_id);
        return $hasil_selected;
    }
    
    public function getCekDate(Hrd_Models_Overtime_Overtime $d){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_overtime_cekdate',$d->getEmployee()->getId(), $d->getStatus(), $d->getDate(), $d->getExecTimeInStart(), $d->getExecTimeInEnd(), $d->getExecTimeOutStart(), $d->getExecTimeOutEnd(), $d->getId());
        //var_dump($this->dbTable); exit;
        return $hasil;
    }
    
    // added by wulan 20200508
    function getOvertimeByid($overtime_id) {
        $hasil	= $this->dbTable->SPExecute('sp_overtime_byid_read', $overtime_id);   
        return $hasil;
    }
    
}

?>
