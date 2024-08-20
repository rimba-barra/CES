<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of WingedBController
 *
 * @author MIS
 */
abstract class Box_Models_App_Hermes_WingedBController extends Box_Models_App_Hermes_WingedController {
    
    public function allRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employeeb', array('department','employeestatus','statusinformation','group','position'),array());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $em = new Hrd_Models_Employee_Employee();
        $em->setArrayTable($this->getAppData());
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
       
        $hasil = $dao->getAllEPJustActive($this->getAppRequest(),$em);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
}

?>
