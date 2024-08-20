<?php

class Hrd_KlaimkacamataController extends Box_Models_App_Hermes_AbstractController {
    
    
    protected function testingFlag() {
        return FALSE;
    }
    
    public function allRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employee', array('department','employeestatus','group'),array());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $em = new Hrd_Models_Master_EmployeePersonal();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllForMultiplemodule($this->getAppRequest(),$em);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function plafongolonganRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'plafonpengobatan', array('jenispengobatan'),array());
        $dao = new Hrd_Models_Pengobatan_Dao();
        $plafon = new Hrd_Models_Pengobatan_Plafon();
        $plafon->setProject($this->getAppSession()->getProject());
        $plafon->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllWOPL($plafon);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function plafoninfoRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $creator = new Box_Models_App_Creator();
        
        $masterPT = new Hrd_Models_App_Mastertable_JenisPengobatan();
        $allPT = $masterPT->prosesDataWithSession($this->getAppSession(), TRUE);
        
        

        $data = $this->getAppData();
        $dao = new Hrd_Models_Pengobatan_PlafonKaryawanDao();
        $plafon = new Hrd_Models_Pengobatan_PlafonKaryawan();
        $plafon->setProject($this->getAppSession()->getProject());
        $plafon->setPt($this->getAppSession()->getPt());
        $plafon->setYear(isset($data["year"])?$data["year"]:0);
        
        $dataPlafon = $dao->getAllByYear($this->getAppRequest(),$plafon);
        $plafons = array();
        if(isset($dataPlafon[1])){
            foreach ($dataPlafon[1] as $rec){
                $plafon = new Hrd_Models_Pengobatan_PlafonKaryawan();
                $plafon->setArrayTable($rec);
                $plafons[] = $plafon;
            }
        }
        
      
        /// param limit
        $daoParam = new Hrd_Models_Master_GeneralParameterDao();
      //  $hasilParam = $daoParam->getParamsByProjectPtWOPL($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), "medicalparameter");
        $hasilParam = $daoParam->getParamsByProjectPtWOPLB("medicalparameter",$this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());

        $hasilParam = Box_Tools::toObjectResult($hasilParam, new Hrd_Models_Master_GeneralParameter());
        $minimalTahun = 0;
        $persenPenambahan = 0;
        
        foreach ($hasilParam as $param) {
            
            
        
            if($data["jenis"]=="FRAME" && $param->getName()==Box_Config::GENERALPARAMATER_NAME_CLAIM_FRAMELIMIT){
                $minimalTahun = $param->getValue();
            }else if($data["jenis"]=="LENSA" && $param->getName()==Box_Config::GENERALPARAMATER_NAME_CLAIM_LENSLIMIT){
                $minimalTahun = $param->getValue();
            }
            
           
            
            if($param->getName()==Box_Config::GENERALPARAMATER_NAME_CLAIM_PERCENTADDPLF){
                $persenPenambahan = $param->getValue();
            }
        }
        
        /// /param limit
        
        
        /// employee detail
        $dao = new Hrd_Models_Master_EmployeeDao();
        $em = new Hrd_Models_Master_EmployeePersonal();
        $em->setId(intval($data["employee_id"]));
        $hasilEmployee = $dao->getDetail($em);
        $hasilEmployee = Box_Tools::toObjectRow($hasilEmployee,new Hrd_Models_Master_Employee());
        /// /employee detail
        
        $otherAT = array(array(
            "PARAM_LIMIT"=>$minimalTahun,
            "PARAM_PERSENADD"=>$persenPenambahan
        ));
       

        $dm->setHasil(array($allPT,$plafons,$hasilEmployee,$otherAT));
        
        
        return $dm;
    }
    
    
    public function lensRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'claimglasses', array('employee'),array());
        $dao = new Hrd_Models_Claim_Dao();
        $c = new Hrd_Models_Claim_Lens();
        $c->setArrayTable($this->getAppData());
        $c->setProject($this->getAppSession()->getProject());
        $c->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(),$c);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    
    public function frameRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'claimglasses', array('employee'),array());
        $dao = new Hrd_Models_Claim_Dao();
        $c = new Hrd_Models_Claim_Frame();
        $c->setArrayTable($this->getAppData());
        $c->setProject($this->getAppSession()->getProject());
        $c->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(),$c);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
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
    
    public function recordRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'claimglasses', array(),array());
      
        $hasil = array();
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    
    
    
    public function maindetailRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'employeepersonal', array('religion','department','bloodgroup','education','marriagestatus','spouse','division','position','group','groupposition','employeestatus','statusinformation',array("relation","mother_"),array("relation","father_")), array("detail","educations","relation","saudaras","childs","jobhistories","trainings","deleted","skills","organizations"));
        //$dao = new Erems_Models_Payment_Dao();
        $employee = new Hrd_Models_Master_EmployeePersonal();
     
        $employee->setArrayTable($this->getAppData());
        $dao = new Hrd_Models_Master_EmployeeDao();
        $hasil = $dao->getDetail($employee);
  
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    /* GAK DIPAKE 28 April 2016*/
    public function mainDelete(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Hrd_Models_Claim_ClaimGlasses());
        $dm->setDao(new Hrd_Models_Claim_Dao());
        $dm->setIdProperty("klaimkacamata_id");
        return $dm;
    }
    
    public function deleteRead() {
        $data = $this->getAppData();
        $success = FALSE;
        $msg = "...";
        
        $dao = new Hrd_Models_Claim_Dao();
        $success = $dao->delete($data["klaimkacamata_id"], $this->getAppSession());
        
        return Box_Tools::instantRead(array(
                    "HASIL" => $success,
                    "MSG" => $msg
        ));
    }
    
    
    
    
    public function mainCreate(){
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $c = new Hrd_Models_Claim_ClaimGlasses();
        $v = new Hrd_Models_Claim_Validator();
        $dao = new Hrd_Models_Claim_Dao();
        $dao->setAddOnFields($this->getAppData());
        $v->setSession($this->getAppSession());
        $dm->setDao($dao);
        $dm->setValidator($v);
        $dm->setObject($c);
       
        return $dm;
    }
    
    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_Processor();
    }


}

?>