<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_TrainingbudgetprogramController extends Hrd_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'trainingbudgetprogram', array(), array()));
        $dm->setObject(new Hrd_Models_Training_Trainingbudgetprogram_Trainingbudgetprogram());
        $dm->setDao(new Hrd_Models_Training_Trainingbudgetprogram_Dao());
        $dm->setValidator(new Hrd_Models_Training_Trainingbudgetprogram_Validator());
        $dm->setIdProperty("trainingbudgetprogram_id");
        return $dm;
    }

    public function detailRead() {
        
        $em = new Hrd_Models_Training_Trainingbudgetprogram_Trainingbudgetprogram();
        // $em->setProjectKP($this->getAppSession()->getProject());
        // $em->setPtKP($this->getAppSession()->getPt());
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingbudgetprogram_Dao();
        
        $allcaption = $dao->getAllWoPLKP($em);

        if(Box_Tools::adaRecord($allcaption)){
            $allcaption = Box_Tools::toObjectsb("trainingcaption", $allcaption,FALSE);
        }
        
        return Box_Tools::instantRead(array(), array($allcaption));

    }

     public function getcheckRead(){

        $data = $this->getAppData();

        $trainingbudgetprogram_id = $data['trainingbudgetprogram_id'];
        
        $em = new Hrd_Models_Training_Trainingbudgetprogram_Trainingbudgetprogram();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingbudgetprogram_Dao();

        $getall_budget = $dao->getAllTrainingBudget($em,$trainingbudgetprogram_id);

        if($getall_budget[0]){
            $ada_record = $getall_budget[0][0]['totalRow'];
        }else{
            $ada_record = 0;
        }
        
        $arrayRespon = array("ada_record" => $ada_record);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function getcheckadjRead(){

        $data = $this->getAppData();

        $trainingbudgetprogram_id = $data['trainingbudgetprogram_id'];
        
        $em = new Hrd_Models_Training_Trainingbudgetprogram_Trainingbudgetprogram();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingbudgetprogram_Dao();

        $getall_budget = $dao->getAllTrainingBudgetAdj($em,$trainingbudgetprogram_id);

        if($getall_budget[0]){
            $ada_record = $getall_budget[0][0]['totalRow'];
        }else{
            $ada_record = 0;
        }
        
        $arrayRespon = array("ada_record" => $ada_record);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function checkperiodebudgetRead(){

        $data = $this->getAppData();

        $periode = $data['periode'];
        $trainingcaption_id = $data['trainingcaption_id'];
        
        $em = new Hrd_Models_Training_Trainingbudgetprogram_Trainingbudgetprogram();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingbudgetprogram_Dao();

        $allcaption = $dao->getAllPeriodeBudget($em,$periode,$trainingcaption_id);

        if($allcaption[0][0]['totalRow'] > 0){
            $flag_zero = 0;
        }else{
            $flag_zero = 1;
        }

        if(Box_Tools::adaRecord($allcaption)){
            $allcaption = Box_Tools::toObjectsb("trainingcaption", $allcaption,FALSE);
        }
        
        return Box_Tools::instantRead(array(), array($allcaption));
    }

    public function checkperiodebudgetdisabledRead(){

        $data = $this->getAppData();

        $periode = $data['periode'];
        $trainingcaption_id = $data['trainingcaption_id'];
        
        $em = new Hrd_Models_Training_Trainingbudgetprogram_Trainingbudgetprogram();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingbudgetprogram_Dao();

        $allcaption = $dao->getAllPeriodeBudget($em,$periode,$trainingcaption_id);

        if($allcaption[0][0]['totalRow'] > 0){
            $flag_zero = 0;
        }else{
            $flag_zero = 1;
        }

        $arrayRespon = array("flag_zero" => $flag_zero);
        return Box_Tools::instantRead($arrayRespon);
    }

}

?>
