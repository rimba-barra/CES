<?php

class Erems_MasterkaryawanController extends Erems_Models_App_Template_AbstractMasterController {
     public function _getMainDataModel() {
         $dao = new Erems_Models_Hrd_EmployeeDao();
      
        $validator = new Erems_Models_Hrd_EmployeeValidator();
        $validator->setSession($this->getAppSession());
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Erems_Box_Models_App_DataListCreator('', 'employee', array(), array()));
        $dm->setObject(new Erems_Models_Hrd_Employee());
        $dm->setDao($dao);
        $dm->setValidator($validator);
        $dm->setIdProperty("employee_id");
        // print_r($dm);exit;
                    // print_r($this->getAppSession());exit; 
        return $dm;
        
    }
    
    public function allRead() {
        $dm = $this->_getMainDataModel();
        if ($dm instanceof Erems_Box_Models_App_Hermes_DataModel) {
            $dataList = $dm->getDataList();
            $dao = $dm->getDao();
            $obj = $dm->getObject();
            $obj->setArrayTable($this->getAppData());
            
          
            $ses = $this->getAppSession();
            $obj->setProject($ses->getProject());
            $obj->setPt($ses->getPt());
        
            
            $hasil = $dao->getAllByPage($this->getAppRequest(),$obj);

            $dm->setDataList($dataList);
            $dm->setHasil($hasil);
        }

        return $dm;
    }

    public function uploadAction() {
        $status['success'] = false;
        $status['msg'] = 'false';
        require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';
        $dm = $this->_getMainDataModel();
        $project = $this->_helper->session->getCurrentProjectId();
        $pt = $this->_helper->session->getCurrentPtId();
        $userId = $this->_helper->session->getUserId();
        $ses = new Erems_Box_Models_App_Session();
        $ses->getProject()->setId($project);
        $ses->getPt()->setId($pt);
        if ($dm instanceof Erems_Box_Models_App_Hermes_DataModel) {
            $project = $this->_helper->session->getCurrentProjectId();
            $pt = $this->_helper->session->getCurrentPtId();
            $totalFile = count($_FILES);
            for($i=0;$i<$totalFile;$i++){
                $filesId = 'mkFileUpload_'.$i;
                $inputFileName = $_FILES[$filesId]['tmp_name'];
                $inputFileType = $_FILES[$filesId]['type'];
                $objPHPExcel = new PHPExcel();  
                //  Read your Excel workbook
                try {
                    $inputFileType = PHPExcel_IOFactory::identify($inputFileName);
                    $objReader = PHPExcel_IOFactory::createReader($inputFileType);
                    $objPHPExcel = $objReader->load($inputFileName);
                    $status['success'] = true;
                } catch(Exception $e) {
                    $status['success'] = false;
                    $status['msg'] = $e->getMessage();
                    echo json_encode($status);exit;
                    // die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
                }

                //  Get worksheet dimensions
                $sheet = $objPHPExcel->getSheet(0); 
                $highestRow = $sheet->getHighestRow(); 
                $highestColumn = $sheet->getHighestColumn();

                //  Loop through each row of the worksheet in turn
                for ($row = 2; $row <= $highestRow; $row++){ 
                    //  Read a row of data into an array
                    $rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row, NULL, TRUE, FALSE);
                    //  Insert row data array into your database of choice here
                    $dataList = $dm->getDataList();
                    $dao = $dm->getDao();
                    $obj = $dm->getObject();
                    $obj->setArrayTable($this->getAppData());

                    $obj->setProject($ses->getProject());
                    $obj->setPt($ses->getPt());
                    $obj->setAddBy($userId);
                    $obj->setName($rowData[0][0]);
                    $obj->setJabatanId(7);
                    $obj->setPhoneNumber($rowData[0][3]);
                    $obj->setNomorRekening(0);
                    $obj->setAlamat($rowData[0][2]);
                    $hasil = $dao->save($obj);

                    $status['msg'] = $hasil;
                    $dm->setDataList($dataList);
                    $dm->setHasil($hasil);
                }
            }
        }
        echo json_encode($status);exit;
        // print_r($hasil);exit;
        // return $dm;
    }  
}
?>