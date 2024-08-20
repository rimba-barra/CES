<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Registertrainingbytype
 *
 * @author MIS
 */
class Hrd_RegistertrainingbytypeController extends Box_Models_App_Hermes_WingedBController {
    protected function testingFlag() {
        return FALSE;
    }
    
    
    public function allRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingtran', array('scheduletraining','programtraining'),array('detail','deletedRows'));
        $dao = $this->getMainDao();
        $em = $this->getMainObject();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(),$em);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function registedemployeeRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingdetail', array('trainingtran','employee','department','group'),array());
        $dao = $this->getMainDao();
        $em = new Hrd_Models_Training_TrainingDetail();
        $em->setArrayTable($this->getAppData());
        $hasil = $dao->getDetail($this->getAppRequest(),$em);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function trainingdateRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingdate', array(),array());
        $dao = $this->getMainDao();
        $em = new Hrd_Models_Training_DetailDate();
        $em->setArrayTable($this->getAppData());
        $hasil = $dao->getDetailDate($this->getAppRequest(),$em);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function scheduleRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'scheduletraining', array('programtraining'),array());
        $dao = new Hrd_Models_Training_ScheduleDao();
        $obj = new Hrd_Models_Training_Schedule();
        $obj->setArrayTable($this->getAppData());
        $obj->setProject($this->getAppSession()->getProject());
        $obj->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(),$obj);
   
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function employeeRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employee', array('department'),array());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $employee = new Hrd_Models_Master_EmployeePersonal();
        $employee->setArrayTable($this->getAppData());
        $employee->setProject($this->getAppSession()->getProject());
        $employee->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllEPJustActive($this->getAppRequest(),$employee);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function updatehadirRead() {
        $hasil = FALSE;
        $params = $this->getAppData();
        $dao = new Hrd_Models_Training_TrainingDao();
        $ses = $this->getAppSession();
        $msg = "...";
        $data = $this->getAppData();
        $hasil = $dao->updateHadir($data["ids"],$data["hadir"],$this->getAppSession(),$data["trainingdetail_id"]);


        $arrayRespon = array("STATUS" => $hasil, "MSG" => $msg);
        return Box_Tools::instantRead($arrayRespon);
    }
   
    
    public function detailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $creator = new Box_Models_App_Creator();
        
        $masterD = new Hrd_Models_App_Mastertable_Department();
        $masterD->setRequest($this->getAppRequest());
        $allD = $masterD->prosesDataWithSession($this->getAppSession(), TRUE);

        
        
        
        
        
        $otherAT = array(array(
                "LISTYEARS"=>''
        ));

        $dm->setHasil(array($allD,$otherAT));
        
        
        return $dm;
    }
    
    
    

    protected function getMainDao() {
        return new Hrd_Models_Training_TrainingDao();
    }

    protected function getMainFieldID() {
        return "training_id";
    }

    protected function getMainObject() {
        return new Hrd_Models_Training_Training();
    }

    protected function getMainValidator() {
        return new Hrd_Models_Training_TrainingValidator();
    }
    
    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_TrainingProcessor();
    }
}

?>
