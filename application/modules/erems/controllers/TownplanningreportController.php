<?php

class Erems_TownplanningreportController extends Erems_Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function initRead() {

        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $ses->report_path = APPLICATION_PATH . '/../public/app/erems/report/';
		/* start edited by ahmad riadi 06-02-2017 */
		//$ses->report_path = APPLICATION_PATH . '/../public/app/erems/reportjs/';
		/* end edited by ahmad riadi 06-02-2017 */

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);


        $msg = '';

        
        $mc = new Erems_Models_App_Masterdata_Cluster();
        $ac = $mc->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $mt = new Erems_Models_App_Masterdata_Type();
        $mt->setSes($this->getAppSession());
        $at = $mt->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $masterPC = new Erems_Models_App_Masterdata_ProductCategory();
        $allPC = $masterPC->prosesDataWithSession($this->getAppSession(), TRUE);
		
		  /* start added by ahmad riadi 28-12-2016 */
        $masterunitstatus = new Erems_Models_App_Masterdata_UnitStatus();
        $allunitstatus = $masterunitstatus->prosesDataWithSession($this->getAppSession(), TRUE);
        /* end added by ahmad riadi 28-12-2016 */  

        // $dao = new Erems_Models_Payment_Dao();

        $hasil = array();

        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "DATA" => $hasil,
                
                "MSG" => $msg
        ));

        $dm->setHasil(array($otherAT,$ac,$at,$allPC,$allunitstatus));


        return $dm;
    }

    public function printoutRead() {




        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $msg = '';



        

        // $dao = new Erems_Models_Payment_Dao();
        $ses = $this->getAppSession();
        $payment = new Erems_Models_Payment_Payment();
        $payment->setArrayTable($this->getAppData());
        $data = $this->getAppData();
        
        $appDao = new Erems_Models_Master_AppDao();
        $pt = new Erems_Box_Models_Master_Pt();
        $project = new Erems_Box_Models_Master_Project();
        $ptInfo = $appDao->getPt($ses->getPt()->getId());
        $pt->setArrayTable($ptInfo[0][0]);
        $projectInfo = $appDao->getProject($ses->getProject()->getId());
        $project->setArrayTable($projectInfo[0][0]);
        
      
        
        $hasil = array(
            'pt_id' => $ses->getPt()->getId(),
            'project_id' => $ses->getProject()->getId(),
            'Project' => $project->getName(),
            'Pt' => $pt->getName(),
        );

        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "DATA" => $hasil,
                "MSG" => $msg
        ));




        $dm->setHasil(array($otherAT));


        return $dm;
    }

    public function selectedsoldunitRead() {



        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('customerprofile', 'city', 'unittran', 'unitstatus', 'clusterb', 'blockb', 'productcategory', 'type', 'salesman', 'citraclub', 'mediapromotion', 'saleslocation', 'collector', 'price', 'billingrulestran', 'bank', 'pricetype'));

        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $hasil = array();
        /// check purchaseletter by unit id

        $unit = new Erems_Models_Unit_Unit();
        $unit->setArrayTable($this->getAppData());
        $pHasil = $dao->getOneByUnit($unit);

        if (count($pHasil[1]) > 0) {
            $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
            $pl->setArrayTable($pHasil[1][0]);

            $hasil = $dao->getOne($pl->getId());
        }



        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    protected function getDefaultProcessor() {
        return new Erems_Models_App_Box_Processor();
    }

}

?>
