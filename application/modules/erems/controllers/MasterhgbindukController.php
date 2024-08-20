<?php
ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);
require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';
class Erems_MasterhgbindukController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
		
        $post_data['mode_read'] = $this->getRequest()->getPost('mode_read');

        $post_data['start'] = '';
        $post_data['limit'] = '';
        $post_data['hgbinduk_id'] = '';
        $post_data['code'] = '';
        $post_data['hgbinduk'] = '';
                
        $model_masterhgbinduk = new Erems_Models_Masterhgbinduk();
                
        $post_data['popup_type'] = $this->getRequest()->getPost('popup_type');
        
        if($post_data['popup_type'] == 'excelmasterhgbinduk'){
            $result = $this->exportdata();
        } else {
            if ($post_data['mode_read'] == 'detail') {
                $post_data['hgbinduk_id'] = $this->getRequest()->getPost('hgbinduk_id');
                $post_data['is_hpl'] = $this->getRequest()->getPost('is_hpl');
                $result = $model_masterhgbinduk->masterhgbindukdetailRead($post_data);
            }
            else{
                $post_data['start'] = $this->getRequest()->getPost('start');
                $post_data['limit'] = $this->getRequest()->getPost('limit');
                $post_data['code'] = $this->getRequest()->getPost('code');
                $post_data['hgbinduk'] = $this->getRequest()->getPost('hgbinduk');
                $post_data['is_hpl'] = $this->getRequest()->getPost('is_hpl');
                $post_data['page'] = $this->getRequest()->getPost('page');
                $result = $model_masterhgbinduk->masterhgbindukRead($post_data);
            }
        }
        
        

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model_masterhgbinduk = new Erems_Models_Masterhgbinduk();
        $result = $model_masterhgbinduk->masterhgbindukCreate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterhgbinduk = new Erems_Models_Masterhgbinduk();
        $result = $mode_masterhgbinduk->masterhgbindukUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_masterhgbinduk = new Erems_Models_Masterhgbinduk();
        $result = $mode_masterhgbinduk->masterhgbindukDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    function exportdata(){
        $model = new Erems_Models_Masterhgbinduk();

        $result = $model->exportData();
        

        $resultdata = $result['data'][0];

        $result['success'] = false;

        $data = array();

        // Instantiate a new PHPExcel object 
        $objPHPExcel = new PHPExcel();  
        // Set the active Excel worksheet to sheet 0 
        $objPHPExcel->setActiveSheetIndex(0);  
        // Initialise the Excel row number 
        $rowCount = 1;  
        $column = 'A';

        if(count($resultdata) > 0){
            $objPHPExcel->getActiveSheet()->setCellValue('A'.$rowCount, 'HGB Induk Code');
            $objPHPExcel->getActiveSheet()->setCellValue('B'.$rowCount, 'HGB Induk No');
            $objPHPExcel->getActiveSheet()->setCellValue('C'.$rowCount, 'Desa');
            $objPHPExcel->getActiveSheet()->setCellValue('D'.$rowCount, 'HGB Induk Date');
            $objPHPExcel->getActiveSheet()->setCellValue('E'.$rowCount, 'HGB Induk GS');
            $objPHPExcel->getActiveSheet()->setCellValue('F'.$rowCount, 'HGB Induk GS Date');
            $objPHPExcel->getActiveSheet()->setCellValue('G'.$rowCount, 'HGB Induk Luas');

            $tes=array();
            $rowCount = 2;
            foreach ($resultdata as $rs)
            {
                    $column = 'A';
                    $objPHPExcel->getActiveSheet()->setCellValue('A'.$rowCount, $rs['code']);
                    $objPHPExcel->getActiveSheet()->setCellValue('B'.$rowCount, $rs['hgbinduk']);
                    $objPHPExcel->getActiveSheet()->setCellValue('C'.$rowCount, $rs['desa']);
                    $objPHPExcel->getActiveSheet()->setCellValue('D'.$rowCount, $rs['date']);
                    $objPHPExcel->getActiveSheet()->setCellValue('E'.$rowCount, $rs['gs']);
                    $objPHPExcel->getActiveSheet()->setCellValue('F'.$rowCount, $rs['gs_date']);
                    $objPHPExcel->getActiveSheet()->setCellValue('G'.$rowCount, $rs['luas']);


                    $rowCount++;
            }

            $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
//                die();
            $fileResult = 'HGB_INDUK_'.time().'.xlsx';
            $objWriter->save(APPLICATION_PATH . '/../public/app/erems/downloadfile/msexcel/' . $fileResult);
//                var_dump($objWriter);die();
            $url = 'app/erems/downloadfile/msexcel/' . $fileResult;

            $result['url'] = $url;
            $result['success'] = true;

        } else {
                $result['success'] = false;
        }
        return $result;
    }

}

?>
