<?php

/**
 * 
 *
 * @author MIS
 */
class Hrd_CostcontrolController extends Box_Models_App_Hermes_AbstractController {



    protected function testingFlag() {
        return FALSE;
    }

    
    
    
    
    public function allRead(){
        $paramLains = NULL;
        // param lain lain
        
        $dao = new Hrd_Models_Payroll_Param_Dao();
        $p = new Hrd_Models_Payroll_Param_Lainlain();
        $p->setProject($this->getAppSession()->getProject());
        $p->setPt($this->getAppSession()->getPt());
        $params = $dao->getParams($p);
        if(Box_Tools::adaRecord($params)){
            $paramLains = Box_Tools::toObjects('payparamlain', $params,TRUE);
        }
        
     
        
        
        
        return Box_Tools::instantRead(array(
            "HASIL"=>1
        ),array($paramLains
        ));
    }
    
    public function parameterRead(){
        
 
   
        
        $mb = new Hrd_Models_App_Mastertable_KomponenGaji();
        $bb = $mb->prosesDataWithSession($this->getAppSession(), TRUE);
        
        /// load cca 
        $dao = new Hrd_Models_Payroll_Costcontrol_Dao();
        $cca = new Hrd_Models_Payroll_Costcontrol_Cca();
        $cca->setProject($this->getAppSession()->getProject());
        $cca->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(), $cca);
        $allCca = false;
        if(Box_Tools::adaRecord($hasil)){
            $allCca = Box_Tools::toObjects("cca", $hasil,FALSE);
        }
        
        /// load ccb 
        $dao = new Hrd_Models_Payroll_Costcontrol_Dao();
        $ccb = new Hrd_Models_Payroll_Costcontrol_Ccb();
        $ccb->setProject($this->getAppSession()->getProject());
        $ccb->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(), $ccb);
        $allCcb = false;
        if(Box_Tools::adaRecord($hasil)){
            $allCcb = Box_Tools::toObjects("ccb", $hasil,FALSE);
        }
        
        return Box_Tools::instantRead(array(
            "HASIL"=>1
        ),array($bb,$allCca,$allCcb));
    }
    
    public function ccaRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'costcontrol', array(), array());
        $dao = new Hrd_Models_Payroll_Costcontrol_Dao();
        $cca = new Hrd_Models_Payroll_Costcontrol_Cca();
        $cca->setProject($this->getAppSession()->getProject());
        $cca->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(),$cca);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function ccbRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'costcontrol', array(), array());
        $dao = new Hrd_Models_Payroll_Costcontrol_Dao();
        $ccb = new Hrd_Models_Payroll_Costcontrol_Ccb();
        $ccb->setProject($this->getAppSession()->getProject());
        $ccb->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(),$ccb);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function cccRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'costcontrol', array(), array());
        $dao = new Hrd_Models_Payroll_Costcontrol_Dao();
        $ccc = new Hrd_Models_Payroll_Costcontrol_Ccc();
        $ccc->setProject($this->getAppSession()->getProject());
        $ccc->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(),$ccc);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function mainCreate() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setUseProcess(FALSE);

        $data = $this->getAppData();
        $hasilSave = FALSE;
        $msg = "Process...";
        
       
        
        
        /// cca
      
        $dataCca = $data["cca"];
        $decanCca = NULL;
        if(count($dataCca) > 0){
            $allCca = array();
            foreach ($dataCca as $row){
                $cca = new Hrd_Models_Payroll_Costcontrol_Cca();
                $cca->setArrayTable($row);
             
                $allCca[] = $cca;
            }
            
            $decanCca = Box_Tools::toDecan($allCca);
            
        }
        
        
        /// ccb
      
        $dataCcb = $data["ccb"];
        $decanCcb = NULL;
        if(count($dataCcb) > 0){
            $allCcb = array();
            foreach ($dataCcb as $row){
                $ccb = new Hrd_Models_Payroll_Costcontrol_Ccb();
                $ccb->setArrayTable($row);
                if(intval($ccb->getParent()) > 0){
                    $allCcb[] = $ccb;
                }
             
                
            }
            
            $decanCcb = Box_Tools::toDecan($allCcb);
            
        }
        
        
        /// ccc
      
        $dataCcc = $data["ccc"];
        $decanCcc = NULL;
        if(count($dataCcc) > 0){
            $allCcc = array();
            foreach ($dataCcc as $row){
                $ccc = new Hrd_Models_Payroll_Costcontrol_Ccc();
                $ccc->setArrayTable($row);
                if(intval($ccc->getParent()) > 0){
                    $allCcc[] = $ccc;
                }
             
                
            }
            
            $decanCcc = Box_Tools::toDecan($allCcc);
            
        }
        
        
        $dao = new Hrd_Models_Payroll_Costcontrol_Dao();
      
        
         $hasilSave = $dao->save($this->getAppSession(),$decanCca,$data["deleted_id"]['cca'],$decanCcb,$data["deleted_id"]['ccb'],
                 $decanCcc,$data["deleted_id"]['ccc']);
        


        $dm->setHasil(array("msg" => $msg, "status" => $hasilSave ? TRUE : FALSE));
        return $dm;
    }

   /* public function mainDelete() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Hrd_Models_Sanction_Sanction());
        $dm->setDao(new Hrd_Models_Sanction_Dao());
        $dm->setIdProperty("sanction_id");
        return $dm;
    }*/

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_Processor();
    }

}

?>
