<?php

/**
 * Description of Dao
 *
 * @author MIS
 */
class Hrd_Models_Master_PrivacypolicyDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {


    public function save(Hrd_Models_Overtime_Overtime $d) {        
        
        $hasil = 0;
        return $hasil;
    }

    public function update(Hrd_Models_Overtime_Overtime $d) {
        $hasil = 0;
        return $hasil;
    }

    public function getAll($user_id, Box_Models_App_HasilRequestRead $r, Hrd_Models_Master_Privacypolicy $d)
    {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_privacypolicy_report_read', $user_id, $d->getProject_id(), $d->getPt_id(), $d->getYear_submit(), $d->getEmployee_name(), $r->getPage(), $r->getLimit());


        return $hasil;
    }

    public function getAllWithEmployeeFilter(Box_Models_App_HasilRequestRead $r, Hrd_Models_Overtime_Overtime $d, Hrd_Models_Employee_Employee $emp, $start, $end) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_privacypolicy_report_read', $d->getProject()->getId(), $d->getPt()->getId(), $r->getPage(), $r->getLimit(), $emp->getName(), intval($emp->getDepartment()->getId()) == 999 ? "" : intval($emp->getDepartment()->getId()), 
                $start, $end, $emp->getId());


        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        return $row;
    }

    
}

?>
