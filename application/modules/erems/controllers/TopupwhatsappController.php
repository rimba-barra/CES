<?php

require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';
class Erems_TopupwhatsappController extends Erems_Box_Models_App_Hermes_AbstractController {

    protected function testingFlag() {
        return FALSE;
    }

    public function allRead() {

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dataList = new Erems_Box_Models_App_DataListCreator('', 'topupwhatsapp', array(), array('detail','deletedRows'));
        
        $dao = new Erems_Models_Master_TopupwhatsappDao();
        $obj = new Erems_Models_Topupwhatsapp();
        $obj->setArrayTable($this->getAppData());
        $obj->setProject($this->getAppSession()->getProject());
        $obj->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getAll($this->getAppRequest(),$obj);

        $dm->setDataList($dataList);
        $dm->setHasil($hasil);


        return $dm;
    }

    public function getgencoRead(){
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $hasil = array(array(
            0 =>in_array($this->getAppSession()->getUserId(), Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId())->approveTopupWhatsapp()) ? 1 : 0
        ));        

        $dm->setHasil($hasil);

        return $dm;
    }
    
    function uploadAction() {
        $app = new Erems_Box_Models_App_Models_Create($this);
        $msg = '???';
        $success = FALSE;
        $imageUpload = new Erems_Box_Models_App_ImageUpload("/public/app/erems/uploads/topupwhatsapp/", "cf_","jpg,bmp");
        $imageUpload->run();
        if(!$imageUpload->isSuccess()){
            $msg = $imageUpload->getErrorMsg();
        }else{
            $success = TRUE;
            $msg = $imageUpload->getImageName();
        }
        $app->setMsg($msg);
        $app->setSuccess($success);
        $app->run();
    }

    public function mainCreate() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $v = new Erems_Models_Master_TopupwhatsappValidator();
        $v->setSes($this->getAppSession());
        $dm->setDao(new Erems_Models_Master_TopupwhatsappDao());
        $dm->setValidator($v);
        $dm->setObject(new Erems_Models_Topupwhatsapp());

        return $dm;
    }
    
    public function mainDelete() {
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setObject(new Erems_Models_Topupwhatsapp());
        $dm->setDao(new Erems_Models_Master_TopupwhatsappDao());
        $dm->setIdProperty("whatsapp_topup_id");
        return $dm;
    }

    public function approve_rejectRead(){
        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $params = $this->getAppData();

        $data = array(
            "id" => $params['id'],
            "type" => $params['type'],
            "user_id" => $this->getAppSession()->getUserId(),
        );

        $dao = new Erems_Models_Master_TopupwhatsappDao();
        $hasil = $dao->approve_reject($data);

        $dm->setHasil($hasil);

        return $dm;
    }

    public function checksaldoRead() {
        //SEND Whatsapp
        $dao = new Erems_Models_Master_TopupwhatsappDao();
        $wpFilter = new Erems_Models_Topupwhatsapp();
        $wpFilter->setProject($this->getAppSession()->getProject());
        $wpFilter->setPt($this->getAppSession()->getPt());
        $hasil = $dao->getSaldo($wpFilter);

        $arrayRespon = array(
            "HASIL" => $hasil[0][0],
        );
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

    function exportRead() {
        $params = $this->getAppData();

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $model = new Erems_Models_Master_TopupwhatsappDao();
        $obj = new Erems_Models_Topupwhatsapp();
        $obj->setArrayTable($this->getAppData());
        $obj->setProject($this->getAppSession()->getProject());
        $obj->setPt($this->getAppSession()->getPt());
        $obj->setUserFullname($params['user_fullname']);

        $result     = $model->getAllExcel($this->getAppRequest(), $obj);
        $resultdata = $result[1];
        
        $result['success'] = false;

        /// Add by Erwin.S 15042021
        $col_date    = array('topup_date','approve_date','reject_date','Addon');
        $col_decimal = array('nominal','saldo','remaining_saldo','biaya');

        if (count($resultdata) > 0) {
            // Instantiate a new PHPExcel object 
            $objPHPExcel = new PHPExcel();
            // Set the active Excel worksheet to sheet 0 
            $objPHPExcel->setActiveSheetIndex(0);
            // Initialise the Excel row number 
            $rowCount = 1;
            $column = 'A';

            foreach ($resultdata[0] as $field => $value) {
                $objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, ucwords(str_replace('_', ' ', $field)));
                /// Add by Erwin.S 15042021
                $objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->getFont()->setBold(true);
                $objPHPExcel->getActiveSheet()->getStyle($column . $rowCount)->getFont()->setSize(13);
                $column++;
            }

            $rowCount = 2;
            foreach ($resultdata as $rs) {
                $column = 'A';
                foreach ($rs as $field => $value) {
                    
                    /// Add by Erwin.S 15042021
                    if(!empty($value)){
                        if(in_array($field, $col_date)){
                            $value = date("d/m/Y", strtotime($value));  
                        }else if(in_array($field, $col_decimal)){
                            $value = number_format($value);
                            // $value = doubleval($value);
                        }
                    }

                    $objPHPExcel->getActiveSheet()->setCellValue($column . $rowCount, $value);
                    $column++;
                }
                $rowCount++;
            }

            $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');

            $fileResult = 'List_topupwhatsapp' . time() . '.xlsx';
            $objWriter->save(APPLICATION_PATH . '/../public/app/erems/downloadfile/msexcel/' . $fileResult);
            $url = 'app/erems/downloadfile/msexcel/' . $fileResult;

            $result['url'] = $url;
            $result['success'] = true;

            $arrayRespon = array(
                "url" => $url,
                "success" => true,
            );
        } else {
            $arrayRespon = array(
                "success" => false,
            );
        }
        return Erems_Box_Tools::instantRead($arrayRespon, array());
    }

    // public function detailRead() {
    //     $dm = new Erems_Box_Models_App_Hermes_DataModel();
    //     $dm->setDirectResult(TRUE);
    //     $dm->setRequiredDataList(FALSE);
    //     $dm->setRequiredModel(FALSE);

        
    //     $masterf = new Erems_Models_App_Masterdata_FacilitiesType();
    //     $allf = $masterf->prosesDataWithSession($this->getAppSession(), TRUE);

    //     $mc = new Erems_Models_App_Masterdata_Cluster();
    //     $allC = $mc->prosesDataWithSession($this->getAppSession(), TRUE);


    //     $dm->setHasil(array($allf,$allC));


    //     return $dm;
    // }
    
    // public function imagelistRead(){
    //     $dm = new Erems_Box_Models_App_Hermes_DataModel();
    //     $dataList = new Erems_Box_Models_App_DataListCreator('', 'topupwhatsappimage', array(),array());
        
    //     $dao = new Erems_Models_Master_TopupwhatsappDao();
    //     $cf = new Erems_Models_Master_TopupwhatsappImage();
    //     $cf->setArrayTable($this->getAppData());
    //     $hasil = $dao->getImages($cf);
    //     $dm->setDataList($dataList);
    //     $dm->setHasil($hasil);


    //     return $dm;
    // }

    protected function getDefaultProcessor() {
        return new Erems_Models_App_Box_Processor();
    }

}

?>