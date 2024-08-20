<?php

/**
 * Description of AbsentrecordController
 *
 * @author MIS
 */
class Hrd_ListperformancemanagementController extends Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {
        $dm         = new Box_Models_App_Hermes_DataModel();
        $dataList   = new Box_Models_App_DataListCreator('', 'listperformancemanagement', array(), array());
        $dao        = new Hrd_Models_ListperformancemanagementDao();
        $header     = new Hrd_Models_Master_Listperformancemanagement();

        $header->setArrayTable($this->getAppData());

        $hasil      = $dao->getAll($this->getAppRequest(), $this->getAppData());
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
    
        return $dm;
    }

    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_ReportProcessor();
    }

    public function getdefaultcomboboxRead() {
        $dm         = new Box_Models_App_Hermes_DataModel();
        $data       = $this->getAppData();
        $dao        = new Hrd_Models_ListperformancemanagementDao();

        $subholding = $dao->getSubholding($this->getAppSession()); // Subholding Combobox
        $document   = $dao->getDocument(); // Jenis Document Combobox
        $status     = $dao->getStatus(); // BSC Status Combobox

        $hasil = TRUE;

        $arrayRespon = array(
            "HASIL"         => $hasil,
            "subholding"    => $subholding[0] == 0 ? '': $subholding[1],
            "document"      => $document[0] == 0 ? '': $document[1],
            "status"        => $status[0] == 0 ? '': $status[1]
        );
        
        return Box_Tools::instantRead($arrayRespon);
    }

    public function getcomboboxRead() {
        $dm         = new Box_Models_App_Hermes_DataModel();
        $data       = $this->getAppData();
        $dao        = new Hrd_Models_ListperformancemanagementDao();

        $department = $dao->getDepartment($data['project_id'], $data['pt_id']); // Department Combobox
        $package    = $dao->getPackage($data['project_id'], $data['pt_id']); // Package Document Combobox

        $hasil = TRUE;

        $arrayRespon = array(
            "HASIL"         => $hasil,
            "department"    => $department[0] == 0 ? '': $department[1],
            "package"       => $package[0] == 0 ? '': $package[1]
        );

        return Box_Tools::instantRead($arrayRespon);
    }

    public function getstatuscomboboxRead() {
        $dm         = new Box_Models_App_Hermes_DataModel();
        $data       = $this->getAppData();
        $dao        = new Hrd_Models_ListperformancemanagementDao();

        $status = $dao->getStatusUpdate($this->getAppSession()); // Status Combobox

        $hasil = TRUE;

        $arrayRespon = array(
            "HASIL"  => $hasil,
            "status" => $status[0] == 0 ? '': $status[1],
        );
        
        return Box_Tools::instantRead($arrayRespon);
    }

    public function getAllProjectRead() {
        $dm         = new Box_Models_App_Hermes_DataModel();
        $dataList   = new Box_Models_App_DataListCreator('', 'project', array(), array());
        $dao        = new Hrd_Models_ListperformancemanagementDao();
        $data       = $this->getAppData();
        $hasil      = $dao->getProject($this->getAppSession(), $data['subholding_id']);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        return $dm;
    }

    public function getAllPTRead() {
        $dm         = new Box_Models_App_Hermes_DataModel();
        $dataList   = new Box_Models_App_DataListCreator('', 'pt', array(), array());
        $dao        = new Hrd_Models_ListperformancemanagementDao();
        $data       = $this->getAppData();
        $hasil      = $dao->getPT($this->getAppSession(), $data['subholding_id'], $data['project_id']);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);
        return $dm;
    }

    public function updatestatusRead() {
        $dao   = new Hrd_Models_ListperformancemanagementDao();
        $data  = $this->getAppData();
        $hasil = $dao->setUpdateStatus($this->getAppSession(), $data);

        return Box_Tools::instantRead($hasil);
    }

    public function deletepmRead() {
        $dao   = new Hrd_Models_ListperformancemanagementDao();
        $data  = $this->getAppData();
        $hasil = $dao->deletePM($this->getAppSession(), $data);

        return Box_Tools::instantRead($hasil);
    }
}

?>
