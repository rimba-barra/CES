<?php

class Erems_PopupkavlingsiapstController extends Erems_Models_App_Template_AbstractMasterController {
 
    public function _getMainDataModel() {
        $dao = new Erems_Models_Master_GeneralDao();
      //  $dao->setSession($this->getAppSession());
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Erems_Box_Models_App_DataListCreator('', 'unit', array('clusterb','customerprofile','purchaselettertransaction','bank','contractor','spk','salesman'), array()));
        $dm->setObject(new Erems_Models_Purchaseletter_Schedule());
        $dm->setDao($dao);
        $dm->setValidator(new Erems_Models_Purchaseletter_Validator());
        $dm->setIdProperty("unit_id");
        return $dm;
        
        //EXEC erems.dbo.sp_warningjatuhtempo_read  '', '', '', '', '', '', '', 1, 108, 2090, 0, 25
        
    } 
    
     public function allRead() {
        $dm = $this->_getMainDataModel();
        if ($dm instanceof Erems_Box_Models_App_Hermes_DataModel) {
            $dataList = $dm->getDataList();
            $dao = $dm->getDao();
            $obj = $dm->getObject();
            $data = $this->getAppData();
            $obj->setArrayTable($data);
            if($obj instanceof Erems_Box_Models_Master_InterProjectPt){
                $ses = $this->getAppSession();
                $obj->setProject($ses->getProject());
                $obj->setPt($ses->getPt());
            }
            
            
            $clusterId = 0;
            $blockId = 0;
            $unitNumber = $data["unit_number"];
            $customerName = $data["customer_name"];
            
            $hasil = $dao->getPopupbangunansiapst($this->getAppRequest(),
                    $this->getAppSession()->getProject()->getId(),
                    $this->getAppSession()->getPt()->getId(),$customerName,$unitNumber,  Erems_Box_Config::PRODUCTCATEGORYCODE_KAVLING);

            $dm->setDataList($dataList);
            $dm->setHasil($hasil);
        }

        return $dm;
    }
    
     
    
    public function detailRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $creator = new Erems_Box_Models_App_Creator();

        //===== MASTERDATA == //
       // $masterPL = new Erems_Models_App_Masterdata_Cluster();
       // $allPL = $masterPL->prosesDataWithSession($this->getAppSession(), TRUE);
        
        $kDao = new Erems_Models_Hrd_EmployeeDao();
        $filterEmployee = new Erems_Models_Hrd_Employee();
        $filterEmployee->setJabatanId(Erems_Box_Config::POSITION_ID_UPLINE);
        $filterEmployee->setProject($this->getAppSession()->getProject());
        $filterEmployee->setPt($this->getAppSession()->getPt());
        
        $upline = $kDao->getAllWOPL($filterEmployee);
        $upline = Erems_Box_Tools::toObjectResult($upline,new Erems_Models_Hrd_Employee());
        
        // bank 
        $masterBank = new Erems_Models_App_Masterdata_Bank();
        $allBank = $masterBank->prosesDataWithSession($this->getAppSession(), TRUE);

        $dm->setHasil(array($upline,$allBank));


        return $dm;
    }

    //add by rico 12-08-2021
    public function exportAction() {
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $session->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

        $params = $this->getRequest()->getPost();

        $clusterId = 0;
        $blockId = 0;
        $unitNumber = $params["unit_number"];
        $customerName = $params["customer_name"];
        $dao = new Erems_Models_Master_GeneralDao();

        $hasil = $dao->getPopupbangunansiapstExport($session->getCurrentProjectId(), $session->getCurrentPtId(), $customerName,$unitNumber,  Erems_Box_Config::PRODUCTCATEGORYCODE_KAVLING, $params['page'], $params['limit']);

        $ps = null;
        if(count($hasil[1]) > 0){
            $ps = $this->excel($hasil[1]);
        }

        echo Zend_Json::encode($ps);
        
        $this->_helper->viewRenderer->setNoRender(true);
    }

    private function excel($data){
        require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';

        $objPHPExcel = new PHPExcel();

        $style = array(
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER
            ),
            'font'  => array(
                'bold'  => true
            )
        );

        $objPHPExcel->setActiveSheetIndex(0);
        $objPHPExcel->getActiveSheet()->SetCellValue('A1', 'Unit Number');
        $objPHPExcel->getActiveSheet()->SetCellValue('B1', 'Cluster Code');
        $objPHPExcel->getActiveSheet()->SetCellValue('C1', 'Customer Name');
        $objPHPExcel->getActiveSheet()->SetCellValue('D1', 'Purchaseletter No');
        $objPHPExcel->getActiveSheet()->SetCellValue('E1', 'Bank Name');
        $objPHPExcel->getActiveSheet()->SetCellValue('F1', 'SPK No');
        $objPHPExcel->getActiveSheet()->SetCellValue('G1', 'Contractor');
        $objPHPExcel->getActiveSheet()->SetCellValue('H1', 'Salesman');
        $objPHPExcel->getActiveSheet()->SetCellValue('I1', 'Rencana Serah Terima');

        $objPHPExcel->getActiveSheet()->getStyle('A1:I1')->applyFromArray($style);

        foreach(range('A','I') as $columnID) {
            $objPHPExcel->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
        }

        $count = 2;
        if(count($data) > 0){
            foreach ($data as $row) {
                $objPHPExcel->getActiveSheet()->SetCellValue('A' . $count, $row["unit_number"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('B' . $count, $row["cluster_code"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('C' . $count, $row["customer_name"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('D' . $count, $row["purchaseletter_purchaseletter_no"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('E' . $count, $row["bank_bank_name"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('F' . $count, $row["spk_spk_no"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('G' . $count, $row["contractor_contractorname"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('H' . $count, $row["salesman_employee_name"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('I' . $count, ($row["purchaseletter_rencana_serahterima_date"] != "" ? date("d-m-Y", strtotime($row["purchaseletter_rencana_serahterima_date"])) : ""));
                $count++;
            }
        }

        $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
        $fileResult = 'List_popup_kavling_siap_st_' . time() . '.xlsx';
        $objWriter->save(APPLICATION_PATH . '/../public/app/erems/downloadfile/msexcel/' . $fileResult);
        $url = 'app/erems/downloadfile/msexcel/' . $fileResult;

        return array("fileResult"=>$fileResult, "url"=>$url);
    }
}

?>
