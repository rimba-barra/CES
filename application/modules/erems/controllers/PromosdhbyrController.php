<?php

require_once dirname(__DIR__) . '../library/apli/ApliController.php';
require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_PromosdhbyrController extends ApliController {

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
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('unitb', 'clusterb', 'blockb', 'productcategory', 'type', 'salesman', 'collector', 'customer', 'citraclub'), array());

        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();

        $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
        $pl->setArrayTable($params);
        $pl->getUnit()->setNumber($params["unit_unit_number"]);
        $pl->getCustomer()->setName($params["customer_name"]);
        $hasil = $dao->getPromoSdhByr30Persen($eremsReq,$sesBox, $pl,$params);
        
        
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
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('unitb', 'clusterb', 'blockb', 'productcategory', 'type', 'salesman', 'collector', 'customer', 'citraclub'), array());

        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();

        $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
        $pl->setArrayTable($params);
        $pl->getUnit()->setNumber($params["unit_unit_number"]);
        $pl->getCustomer()->setName($params["customer_name"]);
        $hasil = $dao->getPromoSdhByr30Persen($eremsReq,$sesBox, $pl,$params);
        
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

            $objPHPExcel->getProperties()->setTitle("PROMO / HADIAH (PEMBAYARAN 30%) EREMS");
            $objPHPExcel->getProperties()->setSubject("PROMO / HADIAH (PEMBAYARAN 30%) EREMS");
            $objPHPExcel->getProperties()->setDescription("PROMO / HADIAH (PEMBAYARAN 30%) EREMS");

            $objPHPExcel->setActiveSheetIndex(0);
            $objPHPExcel->getActiveSheet()->SetCellValue('A1', 'Kawasan');
            $objPHPExcel->getActiveSheet()->SetCellValue('B1', 'Unit Number');
            $objPHPExcel->getActiveSheet()->SetCellValue('C1', 'Type');
            $objPHPExcel->getActiveSheet()->SetCellValue('D1', 'Tgl. Pesanan');
            $objPHPExcel->getActiveSheet()->SetCellValue('E1', 'No. Pesanan');
            $objPHPExcel->getActiveSheet()->SetCellValue('F1', 'Harga Jual');
            $objPHPExcel->getActiveSheet()->SetCellValue('G1', 'Customer Name');
            $objPHPExcel->getActiveSheet()->SetCellValue('H1', 'Total Payment');
            $objPHPExcel->getActiveSheet()->SetCellValue('I1', 'Sales Name');
            $objPHPExcel->getActiveSheet()->SetCellValue('J1', 'Member Name');
            $objPHPExcel->getActiveSheet()->SetCellValue('K1', 'ACI');
            $objPHPExcel->getActiveSheet()->SetCellValue('L1', 'Tgl. Input');

            $objPHPExcel->getActiveSheet()->getStyle('A1:L1')->applyFromArray($style);

            foreach(range('A','L') as $columnID) {
                $objPHPExcel->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
            }

            $count = 2;
            foreach($hasil[1] as $row){
                $objPHPExcel->getActiveSheet()->SetCellValue('A'.$count, $row["cluster_cluster"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('B'.$count, $row["unit_unit_number"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('C'.$count, $row["type_name"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('D'.$count, date("d-m-Y",  strtotime($row["purchase_date"])));
                $objPHPExcel->getActiveSheet()->SetCellValue('E'.$count, $row["purchaseletter_no"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('F'.$count, number_format(doubleval($row["harga_total_jual"]),2,',','.'));
                $objPHPExcel->getActiveSheet()->SetCellValue('G'.$count, $row["customer_name"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('H'.$count, $row["total_payment"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('I'.$count, $row["salesman_employee_name"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('J'.$count, $row["clubcitra_member"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('K'.$count, ''/*$row["api_aci"]*/);
                $objPHPExcel->getActiveSheet()->SetCellValue('L'.$count, date("d-m-Y",  strtotime($row["Addon"])));

                $count++;
            }

            $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');

            $fileResult = 'List_promo_hadiah' . time() . '.xlsx';
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
