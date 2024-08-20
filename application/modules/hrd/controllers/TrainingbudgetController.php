<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_TrainingbudgetController extends Hrd_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'trainingbudget', array(), array()));
        $dm->setObject(new Hrd_Models_Training_Trainingbudget_Trainingbudget());
        $dm->setDao(new Hrd_Models_Training_Trainingbudget_Dao());
        $dm->setValidator(new Hrd_Models_Training_Trainingbudget_Validator());
        $dm->setIdProperty("trainingbudget_id");
        return $dm;
    }


    public function listcatRead() {


        $dm = new Box_Models_App_Hermes_DataModel();
        
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $masterbd   = new Hrd_Models_App_Mastertable_Banding();
        $allbd      = $masterbd->prosesDataWithSession($this->getAppSession(), TRUE);

        $masterdp   = new Hrd_Models_App_Mastertable_Department();
        $alldp      = $masterdp->prosesDataWithSession($this->getAppSession(), TRUE);

        $em = new Hrd_Models_Training_Trainingbudgetprogram_Trainingbudgetprogram();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingbudgetprogram_Dao();
        
        $allbudgetprogram = $dao->getAllWoPL($em);
        if(Box_Tools::adaRecord($allbudgetprogram)){
            $allbudgetprogram = Box_Tools::toObjectsb("trainingbudgetprogram", $allbudgetprogram,FALSE);
        }

        $dm->setHasil(array($allbd, $alldp,$allbudgetprogram));
        
        return $dm;
    }

    public function processapplybudgetRead() {
        $em = new Hrd_Models_Training_Trainingbudget_Trainingbudget();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingbudget_Dao();
        $this->setArrayTable($em, $this->getAppData());
        
        $hasil = $dao->processapplybudget($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData());
        
        $arrayRespon = array("HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function processapplybudgetv2Read(){
        $em = new Hrd_Models_Training_Trainingbudget_Trainingbudget();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingbudget_Dao();

        $data = $this->getAppData();
        $trainingbudget_id = explode('~', $data['trainingbudget_id']);
        
        foreach($trainingbudget_id as $key => $item){
            if($item){
                $hasil = $dao->processapplybudgetv2($em,$this->getAppRequest(), $this->getAppSession(), $item);

            }
        }

        $arrayRespon = array("HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function getperiodeRead() {
        // $em = new Hrd_Models_Training_Trainingbudget_Trainingbudget();
        // $em->setProject($this->getAppSession()->getProject());
        // $em->setPt($this->getAppSession()->getPt());
        // $dao = new Hrd_Models_Training_Trainingbudget_Dao();
        // $periode = $dao->getAllPeriode($em);
        
        // if(Box_Tools::adaRecord($periode)){
        //     $periode = Box_Tools::toObjectsb("trainingbudget", $periode,FALSE);
        // }
        
        // return Box_Tools::instantRead(array(), array($periode));
        // $dm = new Box_Models_App_Hermes_DataModel();
        // $dataList = new Box_Models_App_DataListCreator('', 'trainingperiode', array(),array());
        
        // $dm->setDataList($dataList);
        // $dm->setHasil($periode);
        // return $dm;

        // $data = $this->getAppData();
        // $dm = new Box_Models_App_Hermes_DataModel();
        
        // $dataList = new Box_Models_App_DataListCreator('', 'trainingperiode', array(),array());
        // $em = new Hrd_Models_Training_Trainingbudget_Trainingperiode();
        // $em->setProjectKP($this->getAppSession()->getProject());
        // $em->setPtKP($this->getAppSession()->getPt());
        // $dao = new Hrd_Models_Training_Trainingbudget_Dao();

        // $this->setArrayTable($em, $this->getAppData());
        // $periode = $dao->getAllPeriode($em);

        // $dm->setDataList($dataList);
        // $dm->setHasil($periode);

        // return $dm;

        $em = new Hrd_Models_Training_Trainingbudget_Trainingperiode();
        $em->setProjectKP($this->getAppSession()->getProject());
        $em->setPtKP($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingbudget_Dao();
        
        $periode = $dao->getAllPeriode($em);

        if(Box_Tools::adaRecord($periode)){
            $periode = Box_Tools::toObjectsb("trainingperiode", $periode,FALSE);
        }
        return Box_Tools::instantRead(array(), array($periode));

        //  $em = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        // $em->setProject($this->getAppSession()->getProject());
        // $em->setPt($this->getAppSession()->getPt());
        // $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        
        // $allname = $dao->getAllTrainingNameKP($em);
        // if(Box_Tools::adaRecord($allname)){
        //     $allname = Box_Tools::toObjectsb("trainingbudget", $allname,FALSE);
        // }
        
        // // print_r($allname);die();
        // return Box_Tools::instantRead(array(), array($allname));

    }

    public function getsaldoRead(){

        $data = $this->getAppData();

        $trainingbudgetprogram_id = $data['trainingbudgetprogram_id'];

        $em = new Hrd_Models_Training_Trainingbudgetprogram_Trainingbudgetprogram();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingbudgetprogram_Dao();
        $getlist = $dao->getTrainingBudgetProgramSingle($em,$trainingbudgetprogram_id);
        
        $data_getlist = $getlist[1][0];

        $budget_awal = $data_getlist['budget'];

        // $getall_budget = $dao->getAllTrainingBudget($em,$trainingbudgetprogram_id);
        // $total_all_budget = 0;
        // foreach($getall_budget[1] as $key => $item){
        //     if($item['apply_check'] > 0) //ambil yang sudah di apply saja
        //     {
        //         $total_all_budget += $item['budget'];                
        //     }
        // }

        // $grand_total_all_budget = $budget_awal - $total_all_budget;

        //updated by anas 08042022 - dipotong dari budget used, jadi gk perlu di jumlah lagi training budgetnya
        $grand_total_all_budget = $budget_awal - $data_getlist['budget_used'];


        if($grand_total_all_budget < 0){
            $alert_minus = 1;
        }else{
            $alert_minus = 0;
        }
        
        $arrayRespon = array("data_getlist" => $data_getlist, 
                'grand_total_all_budget' => $grand_total_all_budget, 
                'alert_minus' => $alert_minus);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function getcheckRead(){

        $data = $this->getAppData();

        $trainingbudgetprogram_id = $data['trainingbudgetprogram_id'];
        print_r($trainingbudgetprogram_id);die();
        $em = new Hrd_Models_Training_Trainingbudgetprogram_Trainingbudgetprogram();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingbudgetprogram_Dao();
        $getlist = $dao->getTrainingBudgetProgramSingle($em,$trainingbudgetprogram_id);
        
        $data_getlist = $getlist[1][0];

        $budget_awal = $data_getlist['budget'];

        $getall_budget = $dao->getAllTrainingBudget($em,$trainingbudgetprogram_id);
        $total_all_budget = 0;
        foreach($getall_budget[1] as $key => $item){
            $total_all_budget += $item['budget'];
        }

        $grand_total_all_budget = $budget_awal - $total_all_budget;

        if($grand_total_all_budget < 0){
            $alert_minus = 1;
        }else{
            $alert_minus = 0;
        }
        
        $arrayRespon = array("data_getlist" => $data_getlist, 
                'grand_total_all_budget' => $grand_total_all_budget, 
                'alert_minus' => $alert_minus);
        return Box_Tools::instantRead($arrayRespon);
    }

}

?>
