<?php

/**
 * Description of DepartmentDao
 *
 * @author MIS
 */
class Hrd_Models_Absent_ReminderabsensiDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

   

    // public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Absent_Logfingerprint $d) {
    // added by Michael 2021.05.19 
    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Absent_Reminderabsensi $d, $data) {
    // end added by Michael 2021.05.19 
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
                                    'sp_absent_reminder_read',

                                   $d->getEmployee_id(),
                                   $d->getDepartment_id(),
                                   $d->getFromdate(),
                                   $d->getUntildate(),
                                   $data['project_id'],
                                   $data['pt_id'],
                                   1,
                                   999999999
                            );
        return $hasil;
    }

    public function alreadySent(Hrd_Models_Absent_Reminderabsensi $d, Box_Models_App_Session $ses, $item) {
        $hasil = 0;

        if($item){
          foreach($item as $key => $item_item){
            $hasil = $this->dbTable->SPExecute('sp_reminderabsensi_create', 
                                                $ses->getUser()->getId(),
                                                $item_item['project_id'],
                                                $item_item['pt_id'],
                                                $item_item['employee_id'],
                                                $item_item['absentdetail_id'],
                                                1
                                              );
          }
        }

        return $hasil;
    }

    

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        
    }

}



?>
