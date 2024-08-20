<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_TrainingbudgetadjustmentController extends Hrd_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'trainingbudgetadjustment', array(), array()));
        $dm->setObject(new Hrd_Models_Training_Trainingbudgetadjustment_Trainingbudgetadjustment());
        $dm->setDao(new Hrd_Models_Training_Trainingbudgetadjustment_Dao());
        $dm->setValidator(new Hrd_Models_Training_Trainingbudgetadjustment_Validator());
        $dm->setIdProperty("trainingbudgetadjustment_id");
        return $dm;
    }

    public function detailRead() {
        
        $em = new Hrd_Models_Training_Trainingbudgetadjustment_Trainingbudgetadjustment();
        // $em->setProjectKP($this->getAppSession()->getProject());
        // $em->setPtKP($this->getAppSession()->getPt());
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingbudgetadjustment_Dao();
        
        $allcaption = $dao->getAllWoPLKP($em);
        if(Box_Tools::adaRecord($allcaption)){
            $allcaption = Box_Tools::toObjectsb("trainingcaption", $allcaption,FALSE);
        }

        //EMPLOYEE
        $dm = new Box_Models_App_Hermes_DataModel();
        
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $masteremp   = new Hrd_Models_App_Mastertable_Employee();
        $allemp      = $masteremp->prosesDataWithSession($this->getAppSession(), TRUE);

        $em = new Hrd_Models_Training_Trainingbudgetprogram_Trainingbudgetprogram();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingbudgetprogram_Dao();
        
        $allbudgetprogram = $dao->getAllWoPL($em);
        if(Box_Tools::adaRecord($allbudgetprogram)){
            $allbudgetprogram = Box_Tools::toObjectsb("trainingbudgetprogram", $allbudgetprogram,FALSE);
        }
        
        return Box_Tools::instantRead(array(), array($allcaption,$allemp,$allbudgetprogram));

    }

    public function processapplyadjustmentRead(){
        $em = new Hrd_Models_Training_Trainingbudgetadjustment_Trainingbudgetadjustment();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingbudgetadjustment_Dao();

        $data = $this->getAppData();
        $trainingbudgetadjustment_id = explode('~', $data['trainingbudgetadjustment_id']);

        foreach($trainingbudgetadjustment_id as $key => $item){
            if($item){

                $hasil = $dao->applyAdjustment($em, $this->getAppSession(), $item);

            }
        }

        // return Box_Tools::instantRead(array("HASIL" => 1,), array());
        
        //updated by anas 28042022 | biar mengembalikan hasil sesuai dao       
        $arrayRespon = array("HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function changeperiodeRead(){
        $em = new Hrd_Models_Training_Trainingbudgetadjustment_Trainingbudgetadjustment();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingbudgetadjustment_Dao();

        $data = $this->getAppData();
        $periode = $data['periode'];

        $allbudgetprogram = $dao->getBudgetProgram($em,$periode);

        if(Box_Tools::adaRecord($allbudgetprogram)){
            $allbudgetprogram = Box_Tools::toObjectsb("trainingbudgetprogram", $allbudgetprogram,FALSE);
        }
        
        return Box_Tools::instantRead(array(), array($allbudgetprogram));
    }

    public function checkperiodebudgetdisabledRead(){

        $data = $this->getAppData();

        $periode = $data['periode'];
        
        $em = new Hrd_Models_Training_Trainingbudgetadjustment_Trainingbudgetadjustment();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingbudgetadjustment_Dao();

        $allbudgetprogram = $dao->getBudgetProgram($em,$periode);

        if($allbudgetprogram[0][0]['totalRow'] > 0){
            $flag_zero = 0;
        }else{
            $flag_zero = 1;
        }

        $arrayRespon = array("flag_zero" => $flag_zero);
        return Box_Tools::instantRead($arrayRespon);
    }

}

?>
