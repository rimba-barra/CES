<?php
/* start added by ahmad riadi */
		date_default_timezone_set('Asia/Jakarta');
	/* end added by ahmad riadi */
class Erems_OpportunitycustomerController extends Erems_Box_Models_App_Hermes_AbstractController {
	
	 

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {


      
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'opportunitycustomer', array("downline")); 
        $dao = new Erems_Models_Master_OpportunitycustomerDao();

        $hasil = $dao->getAllByFilter($this->getAppRequest(),$this->getAppSession());

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function detailRead() {




        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Erems_Box_Models_App_Creator();

        //===== MASTERDATA == //
        /// salesman 
        $dao = new Erems_Models_Hrd_EmployeeDao();
        $employee = new Erems_Models_Sales_Salesman();
        $employee->setProject($this->getAppSession()->getProject());
        $employee->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($employee);

        $allSalesman = array();
        $this->fillData($hasil[1], $allSalesman, $creator, 'salesman');

        /// collector 
        $dao = new Erems_Models_Hrd_EmployeeDao();
        $employee = new Erems_Models_Sales_Collector();
        $employee->setProject($this->getAppSession()->getProject());
        $employee->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($employee);

        $allCollector = array();
        $this->fillData($hasil[1], $allCollector, $creator, 'collector');



        $masterReligion = new Erems_Models_App_Masterdata_Religion();
        $allRelg = $masterReligion->prosesDataWithSession($this->getAppSession(), TRUE);

        $masterEdc = new Erems_Models_App_Masterdata_Education();
        $allEdc = $masterEdc->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $masterCity = new Erems_Models_App_Masterdata_City();
        $allCty = $masterCity->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $masterPurp = new Erems_Models_App_Masterdata_Purpose();
        $allPurp = $masterPurp->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $masterDownline = new Erems_Models_App_Masterdata_Downline();
        $allDownline = $masterDownline->prosesDataWithSession($this->getAppSession(), TRUE);
       

        //=== DETAIL INFORMATION == //
        /* schedule */
        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
        $pl->setArrayTable($this->getAppData());
        $hasil = $dao->getScheduleById($pl);

        $allSchedule = array();
        $this->fillData(array_key_exists(1, $hasil) ? $hasil[1] : array(), $allSchedule, $creator, 'schedule');
		
		/* start added by ahmad riadi */
        $userdata = new Erems_Models_Master_User();
        $currentuser = $userdata->getCurrentuser();
        $userlogin = array(array("addname"=>$currentuser['user_fullname'],"Addon"=>date("Y-m-d H:i:s")));
        /* end added by ahmad riadi */

        //$dm->setHasil(array($allRelg,$allEdc,$allCty,$allPurp));
		
		 /* start added by ahmad riadi */    
        $dm->setHasil(array($allRelg,$allEdc,$allCty,$allPurp,$allDownline,$userlogin));
         /* end added by ahmad riadi */

        return $dm;
    }

    
    public function maindetailRead() {


        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'opportunitycustomer', array('city', 'religion', 'purpose', 'education'));
         $dao = new Erems_Models_Master_OpportunitycustomerDao();
        $hasil = $dao->getById($this->getAppRequest());
       
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }
    
    //addby imaam on 20190729
    
    public function saveexcelallRead() {
//        $dm = new Erems_Box_Models_App_Hermes_DataModel();
//        $dm->setDirectResult(TRUE);
//        $dm->setRequiredDataList(FALSE);
//        $dm->setRequiredModel(FALSE);
//        $params = $this->getAppData();
//        
        
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
//        $dataList = new Erems_Box_Models_App_DataListCreator('', 'opportunitycustomer', array("downline")); 
        $dao = new Erems_Models_Master_OpportunitycustomerDao();

        $hasil = $dao->getAllNoFilter($this->getAppRequest(),$this->getAppSession());

        
//        
//        $dm->setDataList($dataList);
//        $dm->setHasil($hasil);
//        
//        
//        $dao = new Erems_Models_Sms_Dao();
//        
//
//      
//      
//        $all = $dao->getAllByPageNoLimit($this->getAppSession()->getProject()->getId(), 
//                $this->getAppSession()->getPt()->getId(), $params["unit_number"], $params["customer_name"], $params["process_date"], $params["smscategory_id"]);
// 
        
        
       

        $ps = new Erems_Models_Master_OpportunityCustomerExcel($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
        $ps->process($hasil[1]);


        
        $msg = 'Export Opportunity Customer Excel';
        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "MSG" => $msg,
                "URL" => $ps->getUrl()
        ));

        $dm->setHasil(array($otherAT));
        return $dm;
    }
    
    public function mainDelete() {
        
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Erems_Models_Master_OpportunityCustomer());
        $dm->setDao(new Erems_Models_Master_OpportunitycustomerDao());
        $dm->setIdProperty("opportunitycustomer_id");
        return $dm;
    }

    

    

    public function mainCreate() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $obj = new Erems_Models_Master_OpportunityCustomer();
        $v = new Erems_Models_Customer_OpportunityCustomerValidator();
        $v->setSes($this->getAppSession());
        $dm->setDao(new Erems_Models_Master_OpportunitycustomerDao());
        
        $dm->setValidator($v);
        $dm->setObject($obj);

        return $dm;
    }
    
    function uploadAction() {
        
        $app = new Erems_Box_Models_App_Models_Create($this);
        $msg = '???';
        $success = FALSE;
        $imageUpload = new Erems_Box_Models_App_ImageUpload("/public/app/erems/uploads/customer/", "customer_","jpg,bmp");
        $imageUpload->run();
        if(!$imageUpload->isSuccess()){
            $msg = $imageUpload->getErrorMsg();
        }else{
            $success = TRUE;
            $msg = $imageUpload->getImageName();
        }
        $app->setMsg($msg);
        $app->setSuccess($success);
        $app->run();
    }

    protected function getDefaultProcessor() {
        return new Erems_Models_App_Box_Processor();
    }

}

?>
