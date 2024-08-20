<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_AllclaimController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'allclaim', array(), array());
        $dao = new Hrd_Models_AllclaimDao();
        $header = new Hrd_Models_Master_Allclaim();
        $header->setArrayTable($this->getAppData());
        $hasil = $dao->getAll($this->getAppRequest(), $header, $this->getAppSession());
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_ReportProcessor();
    }

    public function getcomboboxRead() {
        $dm = new Box_Models_App_Hermes_DataModel();

        //get data education
        $dme = new Hrd_Models_Master_Global_EducationDao();
        $de = $dme->getAll();

        //get data employee status
        // $genDao = new Hrd_Models_Master_GeneralDao();
        // $allStatus = $genDao->getAllEmployeeStatus();

        //get data banding
        $m_banding = new Hrd_Models_App_Mastertable_Banding();
        $data_banding = $m_banding->prosesDataWithSession($this->getAppSession(), TRUE);

        $hasil = TRUE;

        $arrayRespon = array(
            "HASIL" => $hasil,
            "educations" => $de, 
            // "empstatus" => $allStatus
        );
        return Box_Tools::instantRead($arrayRespon, array($data_banding));

    }

    public function getAllSubholdingRead() {
        // $setup = new Hrd_Models_General_Setup();
        // $result = $setup->get_subholding();
        // $resultsubholding = array("data" => $result);
        // $hasil = TRUE;

        // $arrayRespon = array(
        //     "HASIL" => $hasil);
        // return Box_Tools::instantRead($arrayRespon, array($resultsubholding));

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'trainingallsubholding', array(), array());
        $dao = new Hrd_Models_General_Dao();

        $dm->setDataList($dataList);
        // $dm->setHasil($dao->getAllSubholding($this->getAppSession()));
        $dm->setHasil($dao->getAllSubholdingClaim($this->getAppSession()));

        return $dm;
    }

    public function getAllProjectRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'project', array(), array());
        $dao = new Hrd_Models_General_Dao();

        $data = $this->getAppData();
        $dm->setDataList($dataList);
        // $dm->setHasil($dao->getAllProjectbySH($data['subholding_id'], $this->getAppSession()));
        $dm->setHasil($dao->getAllProjectbySHClaim($data['subholding_id'], $this->getAppSession()));

        return $dm;
    }

    public function getAllPTRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'pt', array(), array());
        $dao = new Hrd_Models_General_Dao();

        $data = $this->getAppData();
        $dm->setDataList($dataList);
        // $dm->setHasil($dao->getAllPTbyProject($data['subholding_id'], $data['project_id'], $this->getAppSession()));
        $dm->setHasil($dao->getAllPTbyProjectClaim($data['subholding_id'], $data['project_id'], $this->getAppSession()));
        return $dm;
    }

    public function getAllJenisClaimRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'jenispengobatan', array(), array());
        $dao = new Hrd_Models_Pengobatan_TypeDao();
        $d = new Hrd_Models_Pengobatan_Type();

        $dm->setDataList($dataList);
        $dm->setHasil($dao->getAllWOPL($d));

        return $dm;
    }

    public function getAllYearPlafonRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'plafonpengobatan', array(), array());
        $dao = new Hrd_Models_Pengobatan_Dao();
        $d = new Hrd_Models_Pengobatan_Plafon();

        $dm->setDataList($dataList);
        $dm->setHasil($dao->getYears($this->getAppSession()));

        return $dm;
    }


    // public function getDepartementRead() {

    //     $dm = new Box_Models_App_Hermes_DataModel();
    //     $dataList = new Box_Models_App_DataListCreator('', 'department', array(), array());
    //     $dao = new Hrd_Models_Master_DepartmentDao();

    //     $data = $this->getAppData();
    //     $dm->setDataList($dataList);
    //     $dm->setHasil($dao->getAllDepartementbyProjectPt($data));
    //     return $dm;
    // }

    //  public function getAllPositionRead() {

    //     $dm = new Box_Models_App_Hermes_DataModel();
    //     $dataList = new Box_Models_App_DataListCreator('', 'position', array(), array());
    //     $dao = new Hrd_Models_Master_PositionDao();

    //     $data = $this->getAppData();
    //     $dm->setDataList($dataList);
    //     $dm->setHasil($dao->getAllPositionBySH($data['subholding_id']));

    //     return $dm;
    // }

    // public function getGolonganRead() {

    //     $dm = new Box_Models_App_Hermes_DataModel();
    //     $dataList = new Box_Models_App_DataListCreator('', 'group', array(), array());
    //     $dao = new Hrd_Models_Master_GroupDao();

    //     $data = $this->getAppData();
    //     $dm->setDataList($dataList);
    //     $dm->setHasil($dao->getAllGroup($data['project_id'], $data['pt_id']));
    //     return $dm;

    //     // $groupData = new Hrd_Models_Master_Group();

    //     // $groupData->setProject($data['project_id']);
    //     // $groupData->setPt($data['pt_id']);

    //     // $dao = new Hrd_Models_Master_GroupDao();
    //     // $hasil = $dao->getAll($this->getAppRequest(), $groupData);
    
    //     // $allCategories = array();
    //     // foreach ($hasil[1] as $record){
    
    //     //     $category = new Hrd_Models_Master_Group();
    //     //     $category->setArrayTable($record);
    //     //     $allCategories[] = $category;
    //     // }
        
    //     // $hasil = TRUE;

    //     // $arrayRespon = array(
    //     //     "HASIL" => $hasil);
    //     // return Box_Tools::instantRead($arrayRespon, array($resultsubholding));
    // }

    public function exportlistRead() {

        $dm = new Box_Models_App_Hermes_DataModel();
        $dataList = new Box_Models_App_DataListCreator('', 'allclaim', array(), array());
        $dao = new Hrd_Models_AllclaimDao();
        $hasil = $dao->getAllExportList();
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function exportRead() {
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $dao = new Hrd_Models_AllclaimDao();
        $obj = new Hrd_Models_Report_Exportallclaim();     
        
        $params = $this->getAppData();
        $result = $dao->getAllClaimExport(json_decode($params['data'], TRUE), $this->getAppSession());
        $return = $obj->create_excel_allclaim($result);
        

        $otherAT = array(array(
            "PRINTOUT" => TRUE,
            "MSG" => $return,
            "URL" => $return['directdata']
        ));

        $dm->setHasil(array($otherAT));
        return $dm;
    }


}

?>
