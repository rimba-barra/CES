<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of IntranetDao
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Intranet_IntranetDao extends Box_Models_App_AbDao {

    public function saveUserCes(Hrd_Models_Master_EmployeePersonal $em,$userId,$password,$user) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_usercreate_read',$userId,$em->getEmailCiputra(),$password,$em->getName(),$user);

        return $hasil;
    }

    public function getAllByIds($ids) {
        $hasil = 0;

       // $hasil = $this->dbTable->SPExecute('sp_employee_bylist_id_read',$ids);

        return $hasil;
    }
    
    public function getEmployeeDetail($emId) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_employeedetail_read', $emId);
        return $hasil;
    }

    

}
