<?php

class Erems_PopupakadkreditController extends Erems_Models_App_Template_AbstractMasterController {
 
    public function _getMainDataModel() {
        $dao = new Erems_Models_Master_GeneralDao();
      //  $dao->setSession($this->getAppSession());
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('customer','unittran','block','cluster','type','pricetype'), array()));
        $dm->setObject(new Erems_Models_Purchaseletter_Scheduleakadkredit());
        //test comment
        $dm->setDao($dao);
        $dm->setValidator(new Erems_Models_Purchaseletter_Validator());
        $dm->setIdProperty("schedule_id");
        return $dm;
        
       
        
    } 
    
     public function allRead() {
        $dm = $this->_getMainDataModel();
        if ($dm instanceof Erems_Box_Models_App_Hermes_DataModel) {
            $dataList = $dm->getDataList();
            $dao = $dm->getDao();
            $obj = $dm->getObject();
            $data = $this->getAppData();
            $obj->setArrayTable($data);
            if($obj instanceof Erems_Box_Models_Master_InterProjectPt){
                $ses = $this->getAppSession();
                $obj->setProject($ses->getProject());
                $obj->setPt($ses->getPt());
            }
            
            $unitNumber = $data["unit_number"];
            $customerName = $data["name"];
  
            $hasil = $dao->getPopupAkadKredit(
                    $this->getAppRequest(),
                    $this->getAppSession()->getProject()->getId(),
                    $this->getAppSession()->getPt()->getId(),
                    $customerName,
                    $unitNumber);
            
            $dm->setDataList($dataList);
            $dm->setHasil($hasil);
            //var_dump($hasil);
        }

        
        
        return $dm;
    }
    
     
    
    public function detailRead() {




        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Erems_Box_Models_App_Creator();

        //===== MASTERDATA == //
        
       

       // $masterPL = new Erems_Models_App_Masterdata_Cluster();
       // $allPL = $masterPL->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $kDao = new Erems_Models_Hrd_EmployeeDao();
        $filterEmployee = new Erems_Models_Hrd_Employee();
        $filterEmployee->setJabatanId(Erems_Box_Config::POSITION_ID_UPLINE);
        $filterEmployee->setProject($this->getAppSession()->getProject());
        $filterEmployee->setPt($this->getAppSession()->getPt());
        
        $upline = $kDao->getAllWOPL($filterEmployee);
        $upline = Erems_Box_Tools::toObjectResult($upline,new Erems_Models_Hrd_Employee());
        
        // bank 
        $masterBank = new Erems_Models_App_Masterdata_Bank();
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
        if ($dm instanceof Erems_Box_Models_App_Hermes_DataModel) {
            $dataList = $dm->getDataList();
            $dao = $dm->getDao();
            $obj = $dm->getObject();
            $data = $this->getAppData();
            $obj->setArrayTable($data);
            if($obj instanceof Erems_Box_Models_Master_InterProjectPt){
                $ses = $this->getAppSession();
                $obj->setProject($ses->getProject());
                $obj->setPt($ses->getPt());
            }
           
            
            $params = $this->getAppData();
            $clusterId = 0;
            $blockId = 0;
            $unitNumber = $data["unit_number"];
            $customerName = $data["name"];
            
//            $hasil = $dao->getPopupJatuhTempoPage($this->getAppRequest(),
//                    $this->getAppSession()->getProject()->getId(),
//                    $this->getAppSession()->getPt()->getId(),
//                    $clusterId,$blockId,$customerName,$unitNumber,$data["today_plus"],$params["page"],25);

             $hasil = $dao->getPopupUnitSpkPage(
                    $this->getAppRequest(),
                    $this->getAppSession()->getProject()->getId(),
                    $this->getAppSession()->getPt()->getId(),
                    $customerName,
                    $unitNumber,
                    $params["page"]);
             
            $dm->setDataList($dataList);
            
            //var_dump($hasil);
            
        $ps = new Erems_Models_Popupakadkredit_ExportExcel($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
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
        if ($dm instanceof Erems_Box_Models_App_Hermes_DataModel) {
            $dataList = $dm->getDataList();
            $dao = $dm->getDao();
            $obj = $dm->getObject();
            $data = $this->getAppData();
            $obj->setArrayTable($data);
            if($obj instanceof Erems_Box_Models_Master_InterProjectPt){
                $ses = $this->getAppSession();
                $obj->setProject($ses->getProject());
                $obj->setPt($ses->getPt());
            }
           
            
            $params = $this->getAppData();
            $clusterId = 0;
            $blockId = 0;
           
            
//            $hasil = $dao->getPopupJatuhTempoAll($this->getAppRequest(),
//                    $this->getAppSession()->getProject()->getId(),
//                    $this->getAppSession()->getPt()->getId(),
//                    $clusterId,$blockId,$customerName,$unitNumber,$data["today_plus"]);
            
            $unitNumber = $data["unit_number"];
            $customerName = $data["name"];
  
            $hasil = $dao->getPopupUnitSpkAll(
                    $this->getAppRequest(),
                    $this->getAppSession()->getProject()->getId(),
                    $this->getAppSession()->getPt()->getId(),
                    $customerName,
                    $unitNumber
                    );

            //var_dump($hasil);
            
        $ps = new Erems_Models_Popupakadkredit_ExportExcel($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
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
        $ps = new Erems_Models_Popupakadkredit_ExportExcel($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
        $ps->process($data);
        $msg = 'Export Excel All';
        $otherAT = array(
                "PRINTOUT" => TRUE,
                "MSG" => $msg,
                "URL" => $ps->getUrl()
        );
        return Erems_Box_Tools::instantRead($otherAT, array());  
     }

    
}

?>
