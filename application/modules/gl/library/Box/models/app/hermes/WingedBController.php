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
abstract class Gl_Box_Models_App_Hermes_WingedBController extends Gl_Box_Models_App_Hermes_WingedController {
    
    public function allRead(){
        $dm = new Gl_Box_Models_App_Hermes_DataModel();
        $dataList = new Gl_Box_Models_App_DataListCreator('', 'employee', array('department','employeestatus','statusinformation','group','position'),array());
        $dao = new Gl_Models_Master_EmployeeDao();
        $em = new Gl_Models_Master_EmployeePersonal();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllEP($this->getAppRequest(),$em);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
}

?>
