<?php

require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';

class Erems_PopupjatuhtempofilterController extends Erems_Models_App_Template_AbstractMasterController {
 
    public function _getMainDataModel() {
        $dao = new Erems_Models_Master_GeneralDao();
      //  $dao->setSession($this->getAppSession());
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDataList(new Erems_Box_Models_App_DataListCreator('', 'schedule', array('customerprofile','clusterb','unit','blockb','purchaselettertransaction','sourcemoney','pricetype','type','billingrulestran','scheduletype','salesman'), array()));
        $dm->setObject(new Erems_Models_Purchaseletter_Schedule());
        $dm->setDao($dao);
        $dm->setValidator(new Erems_Models_Purchaseletter_Validator());
        $dm->setIdProperty("schedule_id");
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
            
            $scheduletypeId = $data["scheduletype"];
          
            $clusterId = 0;
            $blockId = 0;
            $unitNumber = $data["unit_number"];
            $customerName = $data["customer_name"];
            
            $hasil = $dao->getPopupJatuhTempoFilter($this->getAppRequest(),
                    $this->getAppSession()->getProject()->getId(),
                    $this->getAppSession()->getPt()->getId(),
                    $clusterId,$blockId,$customerName,$unitNumber,$data["today_plus"],$scheduletypeId);

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
    //addd by semy 21-6-2017
     public function saveexcelpageRead() {
        $dm = $this->_getMainDataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
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
            
            $params = $this->getAppData();
            $clusterId = 0;
            $blockId = 0;
           
            $unitNumber = $data["unit_number"];
            $customerName = $data["customer_name"];
            
            $hasil = $dao->getPopupJatuhTempoPage($this->getAppRequest(),
                    $this->getAppSession()->getProject()->getId(),
                    $this->getAppSession()->getPt()->getId(),
                    $clusterId,$blockId,$customerName,$unitNumber,$data["today_plus"],$params["page"],25,$scheduletypeId);

            $dm->setDataList($dataList);
            
        $ps = new Erems_Models_Jatuhtempo_ExportExcel($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
        $ps->process($hasil[1]);

        $msg = 'Export Excel Page';
        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "MSG" => $msg,
                "URL" => $ps->getUrl()
        ));

        $dm->setHasil(array($otherAT));
             return $dm;
        }        
     }
   
     public function saveexcelallRead() {

         $dm = $this->_getMainDataModel();
          $dm->setDirectResult(TRUE);
            $dm->setRequiredDataList(FALSE);
            $dm->setRequiredModel(FALSE);
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
           
            
            $params = $this->getAppData();
            $clusterId = 0;
            $blockId = 0;
            $unitNumber = $data["unit_number"];
            $customerName = $data["customer_name"];
            
            $hasil = $dao->getPopupJatuhTempoAll($this->getAppRequest(),
                    $this->getAppSession()->getProject()->getId(),
                    $this->getAppSession()->getPt()->getId(),
                    $clusterId,$blockId,$customerName,$unitNumber,$data["today_plus"]);

            $dm->setDataList($dataList);
            
        $ps = new Erems_Models_Jatuhtempo_ExportExcel($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
        $ps->process($hasil[1]);


        $msg = 'Export Excel Page';
        $otherAT = array(array(
                "PRINTOUT" => TRUE,
                "MSG" => $msg,
                "URL" => $ps->getUrl()
        ));

        $dm->setHasil(array($otherAT));
             return $dm;
        }    
    }
     
     
     public function saveexcelselectedRead() {
        $params = $this->getAppData();
        $data = json_decode($params["data"],true);
        $ps = new Erems_Models_Jatuhtempo_ExportExcel($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId());
        $ps->process($data);
        $msg = 'Export Excel All';
        $otherAT = array(
                "PRINTOUT" => TRUE,
                "MSG" => $msg,
                "URL" => $ps->getUrl()
        );
        return Erems_Box_Tools::instantRead($otherAT, array());  
     }
     
    public function processinitRead() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        $creator = new Erems_Box_Models_App_Creator();
        $mpm = new Erems_Models_App_Masterdata_ScheduleType();
        $apm = $mpm->prosesDataWithSession($this->getAppSession(), TRUE);
        $dm->setHasil(array($apm));
        return $dm;      
          
    }

    public function exportAction(){
        $session        = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
        $project_id     = $session->getCurrentProjectId();
        $pt_id          = $session->getCurrentPtId();

        $dm             = $this->_getMainDataModel();
        $dao            = $dm->getDao();
        $requestRead    = new Erems_Box_Models_App_HasilRequestRead(array());
        $hasil          = $dao->getPopupJatuhTempoFilter($requestRead,$project_id, $pt_id, 0, 0, $this->getRequest()->getPost('customer_name'), $this->getRequest()->getPost('unit_number'), $this->getRequest()->getPost("today_plus"), $this->getRequest()->getPost('scheduletype'));

        $data = array();
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
                )
            );

            
            $objPHPExcel->getProperties()->setCreator("MIS Kantor Pusat");

            $objPHPExcel->getProperties()->setTitle("JATUH TEMPO EREMS");
            $objPHPExcel->getProperties()->setSubject("JATUH TEMPO EREMS");
            $objPHPExcel->getProperties()->setDescription("JATUH TEMPO EREMS");


            // Add some data
            //echo date('H:i:s') . " Add some data\n";
            $objPHPExcel->setActiveSheetIndex(0);
            $objPHPExcel->getActiveSheet()->SetCellValue('A1', 'Due Date');
            $objPHPExcel->getActiveSheet()->SetCellValue('B1', 'Rest');
            //added by anas 14102021
            $objPHPExcel->getActiveSheet()->SetCellValue('C1', 'Denda');
            $objPHPExcel->getActiveSheet()->SetCellValue('D1', 'Type');
            $objPHPExcel->getActiveSheet()->SetCellValue('E1', 'Source Money');
            $objPHPExcel->getActiveSheet()->SetCellValue('F1', 'Cluster');
            $objPHPExcel->getActiveSheet()->SetCellValue('G1', 'Unit Number');
            $objPHPExcel->getActiveSheet()->SetCellValue('H1', 'Price Type');
            $objPHPExcel->getActiveSheet()->SetCellValue('I1', 'Customer Name');
            $objPHPExcel->getActiveSheet()->SetCellValue('J1', 'Purchase Date');
            $objPHPExcel->getActiveSheet()->SetCellValue('K1', 'Sales Price');
            $objPHPExcel->getActiveSheet()->SetCellValue('L1', 'Down Payment');
            $objPHPExcel->getActiveSheet()->SetCellValue('M1', 'Sales Name');
            $objPHPExcel->getActiveSheet()->SetCellValue('N1', 'Customer Phone Number');
            $objPHPExcel->getActiveSheet()->SetCellValue('O1', 'Lama Tunggakan');

            $objPHPExcel->getActiveSheet()->getStyle('A1:O1')->applyFromArray($style);

            foreach(range('A','N') as $columnID) {
                $objPHPExcel->getActiveSheet()->getColumnDimension($columnID)->setAutoSize(true);
            }

            $count = 2;
            foreach($hasil[1] as $row){
                $objPHPExcel->getActiveSheet()->SetCellValue('A'.$count, date("d-m-Y",  strtotime($row["duedate"])));
                $objPHPExcel->getActiveSheet()->SetCellValue('B'.$count,  number_format(doubleval($row["remaining_balance"]),2,',','.'));
                //added by anas 14102021
                $objPHPExcel->getActiveSheet()->SetCellValue('C'.$count,  number_format(doubleval($row["denda"]),2,',','.'));
                $objPHPExcel->getActiveSheet()->SetCellValue('D'.$count, $row["type_code"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('E'.$count, $row["sourcemoney_sourcemoney"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('F'.$count, $row["cluster_code"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('G'.$count, $row["unit_unit_number"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('H'.$count, $row["pricetype_pricetype"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('I'.$count, $row["customer_name"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('J'.$count, date("d-m-Y",  strtotime($row["purchaseletter_purchase_date"])));
                $objPHPExcel->getActiveSheet()->SetCellValue('K'.$count, number_format(doubleval($row["purchaseletter_harga_total_jual"]),2,',','.'));
                $objPHPExcel->getActiveSheet()->SetCellValue('L'.$count, number_format(doubleval($row["billingrules_uangmuka"]),2,',','.'));
                $objPHPExcel->getActiveSheet()->SetCellValue('M'.$count, $row["salesman_employee_name"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('N'.$count, $row["customer_mobile_phone"]);
                $objPHPExcel->getActiveSheet()->SetCellValue('O'.$count, $row["lama_tunggakan"]);

                $count++;
            }

            $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');

            $fileResult = 'List_jatuh tempo (60 hari)_' . time() . '.xlsx';
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
//ended semy
?>
