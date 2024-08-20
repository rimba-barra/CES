<?php

require_once dirname(__DIR__) . '../library/apli/ApliController.php';
require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_PopupindikatorpercepatanstController extends ApliController { 

    public function allRead() {
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $session->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

        $params = $this->getRequest()->getPost();

        $eremsReq = new Erems_Box_Models_App_HasilRequestRead(array());
        $start = $params["start"];
        $page = $start > 0 ? ($start/$params["limit"])+1:1;
        $eremsReq->setArrayForm($params);
        $eremsReq->setPage($page);
        $eremsReq->setLimit($params["limit"]);

        $sesBox = new Erems_Box_Models_App_Session();
        $sesBox->getProject()->setId($session->getCurrentProjectId());
        $sesBox->getPt()->setId($session->getCurrentPtId());

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('unitb', 'clusterb', 'blockb', 'productcategory', 'type', 'salesman', 'collector', 'customer', 'citraclub','pricetype'), array());

        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();

        $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
        $pl->setArrayTable($params);
        $pl->getUnit()->setNumber($params["unit_unit_number"]);
        $pl->getCustomer()->setName($params["customer_name"]);
        $hasil = $dao->getAllIndikatorpercepatanst($eremsReq,$sesBox, $pl,$params);
        
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        $dl = $dm->getDataList();
        $dl->setDataDao($hasil);

        $hasilData = Apli::prosesDao($dm->getDataList());

        return array(
            "model" => Apli::generateExtJSModel($dm->getDataList()),
            "data" => $hasilData["data"],
            "totalRow" => $hasilData["row"]
        );
    }

    public function initRead() {
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $session->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

        $params = $this->getRequest()->getPost();

        return array(
            "data"=> array()
        );
    }

    public function exportAction(){
        $session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $session->report_path = APPLICATION_PATH . '/../public/app/erems/report/';

        $params = $this->getRequest()->getPost();

        $eremsReq = new Erems_Box_Models_App_HasilRequestRead(array());
        $page     = $params["page"];
        $eremsReq->setArrayForm($params);
        $eremsReq->setPage($page);
        $eremsReq->setLimit($eremsReq->getLimit());

        $sesBox = new Erems_Box_Models_App_Session();
        $sesBox->getProject()->setId($session->getCurrentProjectId());
        $sesBox->getPt()->setId($session->getCurrentPtId());

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('unitb', 'clusterb', 'blockb', 'productcategory', 'type', 'salesman', 'collector', 'customer', 'citraclub','pricetype'), array());

        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();

        $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
        $pl->setArrayTable($params);
        $pl->getUnit()->setNumber($params["unit_unit_number"]);
        $pl->getCustomer()->setName($params["customer_name"]);

        
        $hasil = $dao->getAllIndikatorpercepatanstExport($eremsReq,$sesBox, $pl,$params);
        
        $dm->setDataList($dataList);
        $dm->setHasil($hasil);

        $dl = $dm->getDataList();
        $dl->setDataDao($hasil);

        $hasilData = Apli::prosesDao($dm->getDataList());

        // Instantiate a new PHPExcel object 
        $objPHPExcel = new PHPExcel();
        // Set the active Excel worksheet to sheet 0 
        $objPHPExcel->setActiveSheetIndex(0);
        // Initialise the Excel row number 
        $rowCount = 1;
        $column = 'B';

        if (count($hasil[1]) > 0) {
            $style = array(
                'alignment' => array(
                    'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                    'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER
                ),
                'font'  => array(
                    'bold'  => true
                )
            );

            
            $objPHPExcel->getProperties()->setCreator("MIS Kantor Pusat");

            $objPHPExcel->getProperties()->setTitle("INDIKATOR PERCEPATAN ST");
            $objPHPExcel->getProperties()->setSubject("INDIKATOR PERCEPATAN ST");
            $objPHPExcel->getProperties()->setDescription("INDIKATOR PERCEPATAN ST");

            $objPHPExcel->setActiveSheetIndex(0);
            $objPHPExcel->getActiveSheet()->SetCellValue('A1', 'Kawasan');
            $objPHPExcel->getActiveSheet()->SetCellValue('B1', 'Unit Number');
            $objPHPExcel->getActiveSheet()->SetCellValue('C1', 'Type');
            $objPHPExcel->getActiveSheet()->SetCellValue('D1', 'Tgl. Pesanan');
            $objPHPExcel->getActiveSheet()->SetCellValue('E1', 'No. Pesanan');
            $objPHPExcel->getActiveSheet()->SetCellValue('F1', 'Harga Jual');
            $objPHPExcel->getActiveSheet()->SetCellValue('G1', 'Customer Name');
            $objPHPExcel->getActiveSheet()->SetCellValue('H1', 'Cara Bayar');
            $objPHPExcel->getActiveSheet()->SetCellValue('I1', 'Total Payment');
            $objPHPExcel->getActiveSheet()->SetCellValue('J1', 'Bayar %');
            $objPHPExcel->getActiveSheet()->SetCellValue('K1', 'Tgl. Progress');
            $objPHPExcel->getActiveSheet()->SetCellValue('L1', 'Progress Bangunan');
            $objPHPExcel->getActiveSheet()->SetCellValue('M1', 'Rencana BAST');
            $objPHPExcel->getActiveSheet()->SetCellValue('N1', 'Akad Realisasi Date');

            $objPHPExcel->getActiveSheet()->getStyle('A1:N1')->applyFromArray($style);

            foreach(range('A','M') as $columnID) {
                $objPHPExcel->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
            }

            $count = 2;
            foreach($hasil[1] as $row){
                $last_progress_date = (empty($row["last_progress_date"])) ? '' : date("d-m-Y",  strtotime($row["last_progress_date"]));
                $realisation_serahterima_date = (empty($row["realisation_serahterima_date"])) ? '' : date("d-m-Y",  strtotime($row["realisation_serahterima_date"]));
                $akad_realisasiondate = (empty($row["akad_realisasiondate"])) ? '' : date("d-m-Y",  strtotime($row["akad_realisasiondate"]));

                $objPHPExcel->getActiveSheet()->SetCellValue('A'.$count, $row["cluster_cluster"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('B'.$count, $row["unit_unit_number"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('C'.$count, $row["type_name"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('D'.$count, date("d-m-Y",  strtotime($row["purchase_date"])));
                $objPHPExcel->getActiveSheet()->SetCellValue('E'.$count, $row["purchaseletter_no"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('F'.$count, number_format(doubleval($row["harga_total_jual"]),2,',','.'));
                $objPHPExcel->getActiveSheet()->SetCellValue('G'.$count, $row["customer_name"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('H'.$count, $row["pricetype_pricetype"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('I'.$count, number_format(doubleval($row["total_payment"]),2,',','.'));
                $objPHPExcel->getActiveSheet()->SetCellValue('J'.$count, number_format(doubleval($row["persen_bayar"]),2,',','.'));
                $objPHPExcel->getActiveSheet()->SetCellValue('K'.$count, $last_progress_date);
                $objPHPExcel->getActiveSheet()->SetCellValue('L'.$count, number_format(doubleval($row["unit_progress"]),2,',','.'));
                $objPHPExcel->getActiveSheet()->SetCellValue('M'.$count, $realisation_serahterima_date);
                $objPHPExcel->getActiveSheet()->SetCellValue('N'.$count, $akad_realisasiondate);

                $count++;
            }

            $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');

            $fileResult = 'List_indikator_percepatan_st_' . time() . '.xlsx';
            $objWriter->save(APPLICATION_PATH . '/../public/app/erems/downloadfile/msexcel/' . $fileResult);
            $url = 'app/erems/downloadfile/msexcel/' . $fileResult;

            $result['url'] = $url;
            $result['success'] = true;
        } else {
            $result['success'] = false;
        }

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }
}
