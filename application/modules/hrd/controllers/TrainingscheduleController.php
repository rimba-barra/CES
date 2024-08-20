<?php

/**
 * Description of DepartmentController
 *
 * @author MIS
 */
class Hrd_TrainingscheduleController extends Hrd_Models_App_Template_AbstractMasterController {

    public function _getMainDataModel() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Box_Models_App_DataListCreator('', 'trainingschedule', array(), array()));
        $dm->setObject(new Hrd_Models_Training_Trainingschedule_Trainingschedule());
        $dm->setDao(new Hrd_Models_Training_Trainingschedule_Dao());
        $dm->setValidator(new Hrd_Models_Training_Trainingschedule_Validator());
        $dm->setIdProperty("trainingschedule_id");
        return $dm;
    }

    public function detailRead() {
        
        $em = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        
        $allname = $dao->getAllTrainingNameKP($em);
        if(Box_Tools::adaRecord($allname)){
            $allname = Box_Tools::toObjectsb("trainingname", $allname,FALSE);
        }

        $em = new Hrd_Models_Training_Trainingbudgetprogram_Trainingbudgetprogram();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingbudgetprogram_Dao();
        
        $allbudgetprogram = $dao->getAllWoPL($em);
        if(Box_Tools::adaRecord($allbudgetprogram)){
            $allbudgetprogram = Box_Tools::toObjectsb("trainingbudgetprogram", $allbudgetprogram,FALSE);
        }
        
        return Box_Tools::instantRead(array(), array($allname,$allbudgetprogram));

    }

    public function employeelistRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'monitoringmatrixemployee', array(), array());
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $employee = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $this->setArrayTable($employee, $this->getAppData());       
        $hasil = $dao->getEmployeelist($this->getAppRequest(), $this->getAppSession(), $this->getAppData());
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function parameterRead() {
        
        $m_banding      = new Hrd_Models_App_Mastertable_Banding();
        $data_banding   = $m_banding->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $project        = new Hrd_Models_App_Mastertable_Projectsh();
        $allproject     = $project->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $masterpt       = new Hrd_Models_App_Mastertable_Pt();
        $allpt          = $masterpt->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $hasil = TRUE;

        $arrayRespon = array(
            "HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon, array($data_banding, $allproject, $allpt));
    }

    public function generatedateRead() {
        
        $em = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $date = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $this->setArrayTable($date, $this->getAppData());
        // $hasil = $dao->getgeneratedate($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData());
        // $alldate = $dao->getdate($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData(), $hasil);
        
        // $arrayRespon = array("HASIL" => $hasil, "DATE" => $alldate);
        $arrayRespon = array("HASIL" => $hasil);

        return Box_Tools::instantRead($arrayRespon);
        // return Box_Tools::instantRead(array(), array($generatedate));

    }

    public function trainingdateRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingscheduledate', array(),array());
        $em = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $data = $this->getAppData();
        $date = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $this->setArrayTable($date, $this->getAppData());
        
        $hasil = $dao->getgeneratedate($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData());
        $alldate = $dao->getdate($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData(), $data["trainingschedule_id"]);
        $dm->setDataList($dataList);
        $dm->setHasil($alldate);
        return $dm;
    }

    public function trainingdate_existRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingscheduledate', array(),array());
        $em = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $data = $this->getAppData();
        $date = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $this->setArrayTable($date, $this->getAppData());
        $alldate = $dao->getdate($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData(), $data["trainingschedule_id"]);
        $dm->setDataList($dataList);
        $dm->setHasil($alldate);
        return $dm;
    }

    public function deldateRead() {
        $hasil = FALSE;
        $params = $this->getAppData();
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $ses = $this->getAppSession();
        $msg = "...";
        $data = $this->getAppData();
        $hasil = $dao->delDate($data["ids"],$this->getAppSession(),$data["trainingschedule_id"]);


        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingscheduledate', array(),array());
        $em = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $date = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $this->setArrayTable($date, $this->getAppData());
        $alldate = $dao->getdate($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData(), $data["trainingschedule_id"]);
        $dm->setDataList($dataList);
        $dm->setHasil($alldate);
        return $dm;
    }

    //SHARE PROJECT PT

    public function gettrainingscheduleRead(){

        $em = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $hasil = $dao->gettrainingschedule($em, $this->getAppSession(), $this->getAppData());

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingschedule', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        
        return $dm;
    }

    public function getprojectptaccessRead(){

        $dao_projectpt = new Hrd_Models_Master_Projectpt_Dao();
        $projectptFilter = new Hrd_Models_Master_Projectpt_ProjectPt();
        $projectptFilter->setUserid($this->getAppSession()->getUserId());
        $projectptFilter->setGroupid($this->getAppSession()->getGroupId());
        $hasil_projectpt = $dao_projectpt->getAllWoPL($projectptFilter);

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'projectpt', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil_projectpt);
        
        return $dm;
    }

    public function sharetrainingscheduleRead(){

        $em = new Hrd_Models_Training_Trainingname_Trainingname();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        
        $hasil = $dao->sharetrainingname($em, $this->getAppSession(), $this->getAppData());

        // $em = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        // $em->setProject($this->getAppSession()->getProject());
        // $em->setPt($this->getAppSession()->getPt());
        // $dao = new Hrd_Models_Training_Trainingschedule_Dao();

        // $hasil = $dao->sharetrainingschedule($em, $this->getAppSession(), $this->getAppData());

        return Box_Tools::instantRead(array("HASIL" => 1,), array());
    }

    //employee

    public function saveheaderRead() {
        
        $em = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $date = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $this->setArrayTable($date, $this->getAppData());
        
        $hasil = $dao->saveheader($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData());
        $arrayRespon = array("HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon);

    }

    public function selectemployeeRead() {
        $hasil = FALSE;
        $params = $this->getAppData();
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $ses = $this->getAppSession();
        $msg = "...";
        $data = $this->getAppData();
        
        $hasil = $dao->selectemployee($data["ids"],$this->getAppSession(),$data["trainingschedule_id"]);

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingscheduleemployee', array(),array());
        $em = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $emp = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $this->setArrayTable($emp, $this->getAppData());
        $allemp = $dao->getemp($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData(), $data["trainingschedule_id"]);
        $dm->setDataList($dataList);
        $dm->setHasil($allemp);
        return $dm;
    }

    public function trainingemp_existRead(){
        $data = $this->getAppData();
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingscheduleemployee', array(),array());
        $em = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $emp = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $this->setArrayTable($emp, $this->getAppData());
        $allemp = $dao->getemp($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData(), $data["trainingschedule_id"]);
        $dm->setDataList($dataList);
        $dm->setHasil($allemp);
        return $dm;
    }

    public function delempRead() {
        $hasil = FALSE;
        $params = $this->getAppData();
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $ses = $this->getAppSession();
        $msg = "...";
        $data = $this->getAppData();
        
        $hasil = $dao->delemp($data["ids"],$this->getAppSession(),$data["trainingschedule_id"]);

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingscheduleemployee', array(),array());
        $em = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $emp = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $this->setArrayTable($emp, $this->getAppData());
        $allemp = $dao->getemp($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData(), $data["trainingschedule_id"]);
        $dm->setDataList($dataList);
        $dm->setHasil($allemp);
        return $dm;
    }

    public function invitedempRead() {
        $hasil = FALSE;
        $params = $this->getAppData();
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $ses = $this->getAppSession();
        $msg = "...";
        $data = $this->getAppData();
        $hasil = $dao->invitedemp($data["e_name"],$data["e_email"],$data["e_id"],$data["ids"],$this->getAppSession(),$data["trainingschedule_id"],$data["periode"]);

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingscheduleemployee', array(),array());
        $em = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $emp = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $this->setArrayTable($emp, $this->getAppData());
        $allemp = $dao->getemp($em,$this->getAppRequest(), $this->getAppSession(), $this->getAppData(), $data["trainingschedule_id"]);
        $dm->setDataList($dataList);
        $dm->setHasil($allemp);
        
        return $dm;
    }

    //BANDING
    public function getbandingRead(){

        $em = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $hasil = $dao->getbanding($em, $this->getAppSession(), $this->getAppData());

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'banding', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function processbandingtrainingscheduleRead(){

        $em = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();

        $hasil = $dao->processbandingtrainingschedule($em, $this->getAppRequest(), $this->getAppSession(), $this->getAppData());

        return Box_Tools::instantRead(array("HASIL" => 1,"ID"=>$hasil), array());
    }

    public function processdeletebandingtrainingscheduleRead(){

        $em = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();

        $hasil = $dao->processdeletebandingtrainingschedule($em, $this->getAppSession(), $this->getAppData());

        return Box_Tools::instantRead(array("HASIL" => 1,"ID"=>$hasil), array());
    }

    public function getbandingexistRead(){

        $em = new Hrd_Models_Training_Trainingschedule_Trainingschedule();
        $em->setProject($this->getAppSession()->getProject());
        $em->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Training_Trainingschedule_Dao();
        $hasil = $dao->getbandingexist($em, $this->getAppSession(), $this->getAppData());

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'banding', array(),array());
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
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

    //added by anas 04042022
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
        //     $total_all_budget += $item['budget'];
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

}

?>
