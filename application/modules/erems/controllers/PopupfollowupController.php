<?php

class Erems_PopupfollowupController extends Erems_Models_App_Template_AbstractMasterController {
 
    public function _getMainDataModel() {
        $dao = new Erems_Models_Purchaseletter_FollowupDao();
        //  $dao->setSession($this->getAppSession());
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('unitb', 'customerprofile'), array()));
        $dm->setObject(new Erems_Models_Cac_Proses());
        $dm->setDao($dao);
        $dm->setValidator(NULL);
        $dm->setIdProperty("purchaseletter_id");
        return $dm;
        
       
        
    } 
    
     public function allRead() {
      $data = $this->getAppData();
        $dm = $this->_getMainDataModel();
        if ($dm instanceof Erems_Box_Models_App_Hermes_DataModel) {
            $dataList = $dm->getDataList();
            $dao = $dm->getDao();
            $obj = $dm->getObject();
            $obj->setArrayTable($data);


            if ($obj instanceof Erems_Box_Models_Master_InterProjectPt) {
                $ses = $this->getAppSession();
                $obj->setProject($ses->getProject());
                $obj->setPt($ses->getPt());
            }

            //   $prosesFilter = new Erems_Models_Cac_Proses();
            // $prosesFilter->setProject($this->getAppSession()->getProject());
            // $prosesFilter->setPt($this->getAppSession()->getPt());
            $hasil = $dao->getAllwithDate($this->getAppRequest(), $this->getAppSession(), $data["unit_number"], $data["purchaseletter_no"]);

            $dm->setDataList($dataList);
            $dm->setHasil($hasil);
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

             $hasil = $dao->getPopupfollowupPage(
                    $this->getAppRequest(),
                    $this->getAppSession()->getProject()->getId(),
                    $this->getAppSession()->getPt()->getId(),
                    $customerName,
                    $unitNumber,
                    $params["page"]);
             
            $dm->setDataList($dataList);
            
            //var_dump($hasil);
            
        $ps = new Erems_Models_Popupfollowup_ExportExcel($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
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
             $data = $this->getAppData();
         $dm = $this->_getMainDataModel();
          $dm->setDirectResult(TRUE);
            $dm->setRequiredDataList(FALSE);
            $dm->setRequiredModel(FALSE);
        if ($dm instanceof Erems_Box_Models_App_Hermes_DataModel) {
            $dataList = $dm->getDataList();
            $dao = $dm->getDao();
            $obj = $dm->getObject();
            $obj->setArrayTable($data);


            if ($obj instanceof Erems_Box_Models_Master_InterProjectPt) {
                $ses = $this->getAppSession();
                $obj->setProject($ses->getProject());
                $obj->setPt($ses->getPt());
            }

           
              
            $hasil = $dao->getAllNoPaging($this->getAppRequest(), $this->getAppSession(), $data["unit_number"], $data["purchaseletter_no"]);

            //var_dump($hasil);
            
        $ps = new Erems_Models_Purchaseletter_ExportExcel($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
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
        $ps = new Erems_Models_Popupfollowup_ExportExcel($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
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
