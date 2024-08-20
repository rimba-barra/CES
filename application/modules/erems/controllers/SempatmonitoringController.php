<?php

class Erems_SempatmonitoringController extends Erems_Models_App_Template_AbstractMasterController {
 
    public function _getMainDataModel() {
        $dao = new Erems_Models_Master_GeneralDao();
      //  $dao->setSession($this->getAppSession());
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('customer','unit','pricetype','clusterb'), array()));
        $dm->setObject(new Erems_Models_Purchaseletter_PurchaseLetter());
        $dm->setDao($dao);
        $dm->setValidator(new Erems_Models_Purchaseletter_Validator());
        $dm->setIdProperty("purchaseletter_id");
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

            $unitNumber = $data["unit_number"];
            $customerName = $data["customer_name"];
            
            $hasil = $dao->getSempatMonitoring($this->getAppRequest(),
                    $this->getAppSession()->getProject()->getId(),
                    $this->getAppSession()->getPt()->getId(),$customerName,$unitNumber);

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

        return $dm;
    }

    //add by rico 12-08-2021
    public function exportAction() {
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $session->report_path = APPLICATION_PATH . '/../public/app/erems/report/';
        $dao = new Erems_Models_Master_GeneralDao();

        $params = $this->getRequest()->getPost();

        $unitNumber = $params["unit_number"];
        $customerName = $params["customer_name"];
        
        $hasil = $dao->getSempatMonitoringExport($session->getCurrentProjectId(), $session->getCurrentPtId(), $customerName,$unitNumber, $params['page'], $params['limit']);

        $ps = null;
        if($hasil[0] != 0){
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
        $objPHPExcel->getActiveSheet()->SetCellValue('A1', 'Cluster');
        $objPHPExcel->getActiveSheet()->SetCellValue('B1', 'Unit Number');
        $objPHPExcel->getActiveSheet()->SetCellValue('C1', 'Price Type');
        $objPHPExcel->getActiveSheet()->SetCellValue('D1', 'Customer No');
        $objPHPExcel->getActiveSheet()->SetCellValue('E1', 'Purchase Date');
        $objPHPExcel->getActiveSheet()->SetCellValue('F1', 'Sales Price');

        $objPHPExcel->getActiveSheet()->getStyle('A1:F1')->applyFromArray($style);

        foreach(range('A','F') as $columnID) {
            $objPHPExcel->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
        }

        $count = 2;
        if(count($data) > 0){
            foreach ($data as $row) {
                $objPHPExcel->getActiveSheet()->SetCellValue('A' . $count, $row["cluster_code"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('B' . $count, $row["unit_unit_number"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('C' . $count, $row["pricetype_pricetype"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('D' . $count, $row["customer_name"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('E' . $count, ($row["purchase_date"] != "" ? date("d-m-Y", strtotime($row["purchase_date"])) : ""));
                $objPHPExcel->getActiveSheet()->SetCellValue('F' . $count, number_format($row["harga_total_jual"],0,'.','.'));
                $count++;
            }

            $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
            $fileResult = 'List_popup_sp4_monitoring_' . time() . '.xlsx';
            $objWriter->save(APPLICATION_PATH . '/../public/app/erems/downloadfile/msexcel/' . $fileResult);
            $url = 'app/erems/downloadfile/msexcel/' . $fileResult;

            $hasil = array("fileResult"=>$fileResult, "url"=>$url);
        }else{
            $hasil = null;
        }

        return $hasil;
    }
}

?>
