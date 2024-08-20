<?php

class Cashier_PopupjatuhtempoController extends Cashier_Models_App_Template_AbstractMasterController {
 
    public function _getMainDataModel() {
        $dao = new Cashier_Models_Master_GeneralDao();
      //  $dao->setSession($this->getAppSession());
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Cashier_Box_Models_App_DataListCreator('', 'schedule', array('clusterb','unit','blockb','purchaselettertransaction'), array()));
        $dm->setObject(new Cashier_Models_Purchaseletter_Schedule());
        $dm->setDao($dao);
       // $dm->setValidator(new Cashier_Models_Purchaseletter_Validator());
        $dm->setIdProperty("schedule_id");
        return $dm;
        
        //EXEC erems.dbo.sp_warningjatuhtempo_read  '', '', '', '', '', '', '', 1, 108, 2090, 0, 25
        
    } 
    
     public function allRead() {
        $dm = $this->_getMainDataModel();
        if ($dm instanceof Cashier_Box_Models_App_Hermes_DataModel) {
            $dataList = $dm->getDataList();
            $dao = $dm->getDao();
            $obj = $dm->getObject();
            $data = $this->getAppData();
            $obj->setArrayTable($data);
            if($obj instanceof Cashier_Box_Models_Master_InterProjectPt){
                $ses = $this->getAppSession();
                $obj->setProject($ses->getProject());
                $obj->setPt($ses->getPt());
            }
            
            
            $scheduletypeId = isset($data["scheduletype"]);
          
            $clusterId = 0;
            $blockId = 0;
            $unitNumber = isset($data["unit_number"]);
            $customerName = isset($data["customer_name"]);
            
            $hasil = $dao->getPopupJatuhTempoFilter($this->getAppRequest(),
                    $this->getAppSession()->getProject()->getId(),
                    $this->getAppSession()->getPt()->getId(),
                    $clusterId,$blockId,$customerName,$unitNumber,$data["today_plus"],$scheduletypeId);

            $dm->setDataList($dataList);
            $dm->setHasil($hasil);
        }

        return $dm;
    }
    
     
    
    public function detailRead() {




        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Cashier_Box_Models_App_Creator();

        //===== MASTERDATA == //
        
       

       // $masterPL = new Cashier_Models_App_Masterdata_Cluster();
       // $allPL = $masterPL->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $kDao = new Cashier_Models_Hrd_EmployeeDao();
        $filterEmployee = new Cashier_Models_Hrd_Employee();
        $filterEmployee->setJabatanId(Cashier_Box_Config::POSITION_ID_UPLINE);
        $filterEmployee->setProject($this->getAppSession()->getProject());
        $filterEmployee->setPt($this->getAppSession()->getPt());
        
        $upline = $kDao->getAllWOPL($filterEmployee);
        $upline = Cashier_Box_Tools::toObjectResult($upline,new Cashier_Models_Hrd_Employee());
        
        // bank 
        $masterBank = new Cashier_Models_App_Masterdata_Bank();
        $allBank = $masterBank->prosesDataWithSession($this->getAppSession(), TRUE);

        $dm->setHasil(array($upline,$allBank));


        return $dm;
    }
    //addd by semy 21-6-2017
     public function saveexcelpageRead() {

         $dm = $this->_getMainDataModel();
          $dm->setDirectResult(TRUE);
            $dm->setRequiredDataList(FALSE);
            $dm->setRequiredModel(FALSE);
        if ($dm instanceof Cashier_Box_Models_App_Hermes_DataModel) {
            $dataList = $dm->getDataList();
            $dao = $dm->getDao();
            $obj = $dm->getObject();
            $data = $this->getAppData();
            $obj->setArrayTable($data);
            if($obj instanceof Cashier_Box_Models_Master_InterProjectPt){
                $ses = $this->getAppSession();
                $obj->setProject($ses->getProject());
                $obj->setPt($ses->getPt());
            }
           
            
            $params = $this->getAppData();
            $clusterId = 0;
            $blockId = 0;
           
            $unitNumber = $data["unit_number"];
            $customerName = $data["customer_name"];
            
            $hasil = $dao->getPopupJatuhTempoPage($this->getAppRequest(),
                    $this->getAppSession()->getProject()->getId(),
                    $this->getAppSession()->getPt()->getId(),
                    $clusterId,$blockId,$customerName,$unitNumber,$data["today_plus"],$params["page"],25,$scheduletypeId);

            $dm->setDataList($dataList);
            
        $ps = new Cashier_Models_Jatuhtempo_ExportExcel($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
        $ps->process($hasil[1]);


             $msg = 'Export Excel Page';
        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "MSG" => $msg,
                "URL" => $ps->getUrl()
        ));

        $dm->setHasil(array($otherAT));
             return $dm;
        }

       
        
     }
     

     
     public function saveexcelallRead() {

         $dm = $this->_getMainDataModel();
          $dm->setDirectResult(TRUE);
            $dm->setRequiredDataList(FALSE);
            $dm->setRequiredModel(FALSE);
        if ($dm instanceof Cashier_Box_Models_App_Hermes_DataModel) {
            $dataList = $dm->getDataList();
            $dao = $dm->getDao();
            $obj = $dm->getObject();
            $data = $this->getAppData();
            $obj->setArrayTable($data);
            if($obj instanceof Cashier_Box_Models_Master_InterProjectPt){
                $ses = $this->getAppSession();
                $obj->setProject($ses->getProject());
                $obj->setPt($ses->getPt());
            }
           
            
            $params = $this->getAppData();
            $clusterId = 0;
            $blockId = 0;
            $unitNumber = $data["unit_number"];
            $customerName = $data["customer_name"];
            
            $hasil = $dao->getPopupJatuhTempoAll($this->getAppRequest(),
                    $this->getAppSession()->getProject()->getId(),
                    $this->getAppSession()->getPt()->getId(),
                    $clusterId,$blockId,$customerName,$unitNumber,$data["today_plus"]);

            $dm->setDataList($dataList);
            
        $ps = new Cashier_Models_Jatuhtempo_ExportExcel($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
        $ps->process($hasil[1]);


        $msg = 'Export Excel Page';
        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "MSG" => $msg,
                "URL" => $ps->getUrl()
        ));

        $dm->setHasil(array($otherAT));
             return $dm;
        }    
    }
     
     
     public function saveexcelselectedRead() {
        $params = $this->getAppData();
        $data = json_decode($params["data"],true);
        $ps = new Cashier_Models_Jatuhtempo_ExportExcel($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
        $ps->process($data);
        $msg = 'Export Excel All';
        $otherAT = array(
                "PRINTOUT" => TRUE,
                "MSG" => $msg,
                "URL" => $ps->getUrl()
        );
        return Cashier_Box_Tools::instantRead($otherAT, array());  
     }
     
    public function processinitRead() {
       
        $dm = new Cashier_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $creator = new Cashier_Box_Models_App_Creator();
        $mpm = new Cashier_Models_Master_ScheduleType();
        $apm = $mpm->prosesDataWithSession($this->getAppSession(), TRUE);
        $dm->setHasil(array($apm));
        return $dm;      
          
    }
    
}
//ended semy
?>
