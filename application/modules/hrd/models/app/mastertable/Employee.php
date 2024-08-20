<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Employee
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_App_Mastertable_Employee extends Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Hrd_Models_Master_EmployeeDao();
    }

    public function getTableClass() {
        return new Hrd_Models_Employee_Employee();
    }

    public function getTableClassName() {
        return "employeeb";
    }

    public function prosesData(\Box_Models_App_AbDao $dao, \Box_Models_ObjectEmbedData $objectEmbedata, \Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAll($app->getRequest(),$objectEmbedata);
      
        return $hasil;
    }
    
    protected function getMethod($object){
        return $this->getDao()->getAllEPJustActiveWOPL($object);
    }

    // added by Michael 2021.05.19
    protected function getMethod_CustomProjectPt($object, $data){
        return $this->getDao()->getAllEPJustActiveWOPL_CustomProjectPt($object, $data);
    }
    // end added by Michael 2021.05.19

}