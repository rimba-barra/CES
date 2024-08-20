<?php

/**
 * Description of DepartmentDao
 *
 * @author MIS
 */
class Hrd_Models_Absent_AlllogfingerprintDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

   

    // public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Absent_Logfingerprint $d) {
    // added by Michael 2021.05.19 
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Absent_Logfingerprint $d, $data) {
    // end added by Michael 2021.05.19 
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
                                    'sp_absent_logfinger_read',
                                   1,
                                   999999999, 
                                   // $d->getProject_id(),
                                   // $d->getPt_id(),

                                   // added by Michael 2021.05.19 
                                   $data['project_id'],
                                   $data['pt_id'],
                                   // end added by Michael 2021.05.19 

                                   $d->getEmployee_id(),
                                   $d->getFromdate(),
                                   $d->getUntildate()
                            );
        return $hasil;
    }

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        
    }

}



?>
