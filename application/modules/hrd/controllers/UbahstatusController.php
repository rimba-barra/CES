<?php

class Hrd_UbahstatusController extends Box_Models_App_Hermes_WingedBController {
    
    
    protected function testingFlag() {
        return FALSE;
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
    
    
    public function statuschangeRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'statuschange', array('employeestatus',array('statusinformation','newstatusinformation_'),array('statusinformation','oldstatusinformation_')));
        $st = $this->getMainObject();
        $st->setArrayTable($this->getAppData());
        $dao = $this->getMainDao();
        
        $hasil = $dao->getAll($this->getAppRequest(),$st);
        
        
  
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function detail_empRead() {

        // added by Michael 2021.05.19 
        $data = $this->getAppData();
        $data['project_id'] = $this->getAppSession()->getProjectId();
        $data['pt_id'] = $this->getAppSession()->getPtid();

        $dao = new Hrd_Models_AbsentDao();
        $hasil_projectpt = $dao->getProject_Pt_Id($this->getAppSession(), $data);

        $data['projectpt_id'] = $hasil_projectpt[1][0]['projectpt_id'];

        $obj = new Hrd_Models_App_Mastertable_Employee();
        // $data = $obj->prosesDataWithSession($this->getAppSession(), TRUE);
        $data_res = $obj->prosesDataWithoutSession($this->getAppSession(), FALSE, $data);
        
        $selected = null;
        foreach($data_res[1] as $key => $item){
            if($item['employee_id'] == $data['employee_id']){
                $selected = $item;
            }
        }
        
        return Box_Tools::instantRead(array("HASIL" => 1,), array($selected));
    }

    protected function getMainDao() {
        return new Hrd_Models_Statuschange_Dao();
    }

    protected function getMainFieldID() {
        return "statuschange_id";
    }

    protected function getMainObject() {
        return new Hrd_Models_Statuschange_StatusChange();
    }

    protected function getMainValidator() {
        return new Hrd_Models_Statuschange_Validator();
    }
    
    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_StatusChangeProcessor();
    }
    
    
    
    
    
    
    
    
    
    


}

?>