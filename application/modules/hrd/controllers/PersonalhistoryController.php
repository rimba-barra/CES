<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_PersonalhistoryController extends Box_Models_App_Hermes_WingedBController {

    protected function testingFlag() {
        return FALSE;
    }

    public function parameterRead() {

        $ma = new Hrd_Models_App_Mastertable_Department();
        $aa = $ma->prosesDataWithSession($this->getAppSession(), TRUE);






        $hasil = TRUE;

        $arrayRespon = array(
            "HASIL" => $hasil);
        return Box_Tools::instantRead($arrayRespon, array($aa));
    }

    public function tandakasihRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'tandakasihtran', array(), array());
        $dao = new Hrd_Models_Tandakasih_Dao();
        $data = $this->getAppData();


        $hasil = $dao->getAllByEmployeeWOPL(intval($data["employee_id"]), $this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function personaldataRead() {
        $params = $this->getAppData();
        $emId = $params["employee_id"];
        $em = new Hrd_Models_Master_Employee();
        $em->setId($emId);
        $daoPersonal = new Hrd_Models_Master_EmployeeDao();
        $personal = $daoPersonal->getDetail($em);

        /// children
        $dao = new Hrd_Models_Master_RelationDao();
        $child = new Hrd_Models_Master_Child();


        $children = $dao->getAll($this->getAppRequest(), $em->getId(), $child);


        $arrayRespon = array(
            "PERSONAL" => $personal[1][0],
            "CHILDREN" => $children[1],
            "HASIL" => TRUE);
        return Box_Tools::instantRead($arrayRespon);
    }

    public function absentcutiRead() {
        $params = $this->getAppData();
        $emId = intval($params["employee_id"]);
        $year = intval($params["year"]);



        $dao = new Hrd_Models_General_Dao();
        $hasil = $dao->getAbsentCuti($emId, $year, $this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());

        $hasilJatahCuti = $dao->getRekapJatahCutiPerKaryawan($emId);



        $arrayRespon = array(
            "DATA" => count($hasil[0]) == 0 ? FALSE : $hasil[0],
            "DATA_JATAHCUTI" => count($hasilJatahCuti[0]) == 0 ? FALSE : $hasilJatahCuti[0],
            "HASIL" => TRUE);
        return Box_Tools::instantRead($arrayRespon);
    }
    
    public function dinasRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'dinastran', array('group','position'), array());
        $dao = new Hrd_Models_Dinas_TransaksiDao();
        $enti = new Hrd_Models_Dinas_Transaksi();
        $data = $this->getAppData();
        $enti->getEmployee()->setId($data["employee_id"]);
       // $enti->setArrayTable($this->getAppData());
        $enti->setProject($this->getAppSession()->getProject());
        $enti->setPt($this->getAppSession()->getPt());

        $dm->setDataList($dataList);
        $dm->setHasil($dao->getAllByEmployeeWOPL($enti));
        return $dm;
    }

    public function karirpromosiRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'promosi', array('employee', 'group', array('group', 'newgroup_'), 'position', array('position', 'newposition_'), 'department'));

        $params = $this->getAppData();
        $emId = intval($params["employee_id"]);


        $promosiFilter = new Hrd_Models_Changestatus_Promosi();
        $promosiFilter->setProject($this->getAppSession()->getProject());
        $promosiFilter->setPt($this->getAppSession()->getPt());
        $promosiFilter->getEmployee()->setId($emId);


        $dao = new Hrd_Models_Changestatus_Dao();
        $hasil = $dao->getByEmployeeWOPL($promosiFilter);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function karirmutasiRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'mutasi', array('employee', 'group', array('group', 'newgroup_'), 'position', array('position', 'newposition_'), 'department', array('department', 'newdepartment_')));

        $params = $this->getAppData();
        $emId = intval($params["employee_id"]);


        $mutasiFilter = new Hrd_Models_Changestatus_Mutasi();
        $mutasiFilter->setProject($this->getAppSession()->getProject());
        $mutasiFilter->setPt($this->getAppSession()->getPt());
        $mutasiFilter->getEmployee()->setId($emId);


        $dao = new Hrd_Models_Changestatus_Dao();
        $hasil = $dao->getByEmployeeWOPL($mutasiFilter);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function trainingRead() {
       $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingdetail', array('trainingtran','scheduletraining','programtraining'),array());
        $dao = new Hrd_Models_Training_TrainingDao();
        $data = $this->getAppData();
        $emId = intval($data["employee_id"]);
        $hasil = $dao->getDetailByEmployee($emId);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    public function spRead() {
       $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'sanction', array('employee','sanctiontype','division','group'),array());
        $sanc = new Hrd_Models_Sanction_Sanction();
        $data = $this->getAppData();
        $sanc->getEmployee()->setId($data["employee_id"]);
        $sanc->setProject($this->getAppSession()->getProject());
        $sanc->setPt($this->getAppSession()->getPt());
        $dao = new Hrd_Models_Sanction_Dao();
        $hasil = $dao->getAllByEmployeeWOPL($sanc);
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function karirrotasiRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'rotasi', array('employee', 'group', array('group', 'newgroup_'), 'position', array('position', 'newposition_'), 'department', array('department', 'newdepartment_')));

        $params = $this->getAppData();
        $emId = intval($params["employee_id"]);


        $rotasiFilter = new Hrd_Models_Changestatus_Rotasi();
        $rotasiFilter->setProject($this->getAppSession()->getProject());
        $rotasiFilter->setPt($this->getAppSession()->getPt());
        $rotasiFilter->getEmployee()->setId($emId);


        $dao = new Hrd_Models_Changestatus_Dao();
        $hasil = $dao->getByEmployeeWOPL($rotasiFilter);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function karirstatusRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'statuschange', array('employeestatus', array('statusinformation', 'newstatusinformation_'), array('statusinformation', 'oldstatusinformation_')));


        $params = $this->getAppData();
        $emId = intval($params["employee_id"]);

        $st = new Hrd_Models_Statuschange_StatusChange();
        $st->getEmployee()->setId($emId);
        $dao = new Hrd_Models_Statuschange_Dao();

        $hasil = $dao->getAllWOPL($st);



        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function obatjenisklaimRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'claim', array('jenispengobatan'));
        
        $params = $this->getAppData();
        $emId = intval($params["employee_id"]);
        $year = intval($params["year"]);
        
        $dao = new Hrd_Models_Claim_ClaimDao();
        $ob = new Hrd_Models_Claim_Claim();
        $ob->setYear($year);
        $ob->getEmployee()->setId($emId);
        $ob->setProject($this->getAppSession()->getProject());
        $ob->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllWOPL($ob);
        
        $tempJenis = array();
        $jenises = array();
        /// filter by jenis klaim
        foreach($hasil[1] as $row){
            if(!in_array($row["jenispengobatan_jenispengobatan_id"], $tempJenis)){
                $tempJenis[] = $row["jenispengobatan_jenispengobatan_id"];
                $jenises[] = $row;
            }
            
            
        }
        
        $hasil[1] = $jenises;
        
     
        
        /// /filter by jenis klaim

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }
    
    

    public function obattanggalklaimRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'claim', array('jenispengobatan','group'));
        
        $params = $this->getAppData();
        $emId = intval($params["employee_id"]);
        $year = intval($params["year"]);
        
        $dao = new Hrd_Models_Claim_ClaimDao();
        $ob = new Hrd_Models_Claim_Claim();
        $ob->setYear($year);
        $ob->getEmployee()->setId($emId);
        $ob->setProject($this->getAppSession()->getProject());
        $ob->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAllWOPL($ob);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_LeaveProcessor();
    }

    protected function getMainDao() {
        return new Hrd_Models_Leave_LeaveEntitlementDao();
    }

    protected function getMainFieldID() {
        return "leaveentitlements_id";
    }

    protected function getMainObject() {
        return new Hrd_Models_Leave_LeaveEntitlement();
    }

    protected function getMainValidator() {
        return new Hrd_Models_Leave_LeaveEntitlementValidator();
    }

}

?>
