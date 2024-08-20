<?php

require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';
class Erems_FakturpajakController extends Zend_Controller_Action {

  function readAction() {

    $this->getResponse()->setHeader('Content-Type', 'application/json');

    $result = array('data' => array(), 'total' => 0, 'success' => false);

    $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
    $ses->report_path = APPLICATION_PATH.'/../public/app/erems/report/';

    $model_fakturpajak = new Erems_Models_Fakturpajak();

    $post_data['start'] = 0;
    $post_data['limit'] = $this->getRequest()->getPost('limit');
    $post_data['page']  = $this->getRequest()->getPost('page');
    
    $post_data['paymentflag_id']    = $this->getRequest()->getPost('paymentflag_id');
    $post_data['payment_startdate'] = $this->getRequest()->getPost('payment_startdate');
    $post_data['payment_enddate']   = $this->getRequest()->getPost('payment_enddate');
    $post_data['cluster_id']        = $this->getRequest()->getPost('cluster_id');
    $post_data['block_id']          = $this->getRequest()->getPost('block_id');
    $post_data['unit_number']       = $this->getRequest()->getPost('unit_number');

    $result = $model_fakturpajak->fakturpajakRead($post_data);


    echo Zend_Json::encode($result);

    $this->_helper->viewRenderer->setNoRender(true);
  }

  function createAction() {

    $this->getResponse()->setHeader('Content-Type', 'application/json');

    $result = array('data' => array(), 'total' => 0, 'success' => false);

    $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

    $model_fakturpajak = new Erems_Models_Fakturpajak();
    $result = $model_fakturpajak->fakturpajakCreate($post_data);

    echo Zend_Json::encode($result);

    $this->_helper->viewRenderer->setNoRender(true);
  }

  function updateAction() {
    $this->getResponse()->setHeader('Content-Type', 'application/json');

    $result = array('data' => array(), 'total' => 0, 'success' => false);

    $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

    $mode_fakturpajak = new Erems_Models_Fakturpajak();
    $result = $mode_fakturpajak->fakturpajakUpdate($post_data);

    echo Zend_Json::encode($result);

    $this->_helper->viewRenderer->setNoRender(true);
  }

  function deleteAction() {
    $this->getResponse()->setHeader('Content-Type', 'application/json');

    $result = array('data' => array(), 'total' => 0, 'success' => false);

    $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

    $mode_fakturpajak = new Erems_Models_Fakturpajak();
    $result = $mode_fakturpajak->fakturpajakDelete($post_data);

    echo Zend_Json::encode($result);

    $this->_helper->viewRenderer->setNoRender(true);
  }

  function ptdetailAction() {

    $this->getResponse()->setHeader('Content-Type', 'application/json');

    $result = array('data' => array(), 'total' => 0, 'success' => false);

    $model_fakturpajak = new Erems_Models_Fakturpajak();

    $post_data['start'] = $this->getRequest()->getPost('start');
    $post_data['limit'] = $this->getRequest()->getPost('limit');

    $post_data['pt_id'] = $this->getRequest()->getPost('pt_id');
    $post_data['pt_name'] = $this->getRequest()->getPost('pt_name');
    $result = $model_fakturpajak->ptdetailRead($post_data);

    echo Zend_Json::encode($result);

    $this->_helper->viewRenderer->setNoRender(true);
  }

  function printAction(){
    $report_fn = 'Fakturpajakexport.mrt';

    echo ($report_fn && file_exists($this->_helper->session->report_path.$report_fn)) ? $report_fn : 'ERROR';

    $this->_helper->viewRenderer->setNoRender(true);
  }

        //add by semy 11-08-2017
  function saveexcelallAction() {
    $this->getResponse()->setHeader('Content-Type', 'application/json');

    $result = array('data' => array(), 'total' => 0, 'success' => false);

    $model_fakturpajak = new Erems_Models_Fakturpajak();

    $post_data['start'] = 0;
    $post_data['limit'] = $this->getRequest()->getPost('limit');
    $post_data['page'] = $this->getRequest()->getPost('page');

    $post_data['paymentflag_id'] = $this->getRequest()->getPost('paymentflag_id');
    $post_data['payment_startdate'] = $this->getRequest()->getPost('payment_startdate');
    $post_data['payment_enddate'] = $this->getRequest()->getPost('payment_enddate');
    $post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
    $post_data['block_id'] = $this->getRequest()->getPost('block_id');
    $post_data['unit_number'] = $this->getRequest()->getPost('unit_number');

    $result = $model_fakturpajak->fakturpajakRead($post_data);

    $objPHPExcel = new PHPExcel();
    $objPHPExcel->setActiveSheetIndex(0);

    $row = 1;
    $objPHPExcel->getActiveSheet()->setCellValue('A'.$row, 'Cluster')
    ->setCellValue('B'.$row, 'Block Name')
    ->setCellValue('C'.$row, 'Unit No.')
    ->setCellValue('D'.$row, 'Payment No')
    ->setCellValue('E'.$row, 'Payment Flag')
    ->setCellValue('F'.$row, 'Payment Date')
    // ->setCellValue('G'.$row, 'Valid Date')
    ->setCellValue('G'.$row, 'Payment Amount')
    ->setCellValue('H'.$row, 'Customer Name')
    ->setCellValue('I'.$row, 'Note')
    ->setCellValue('J'.$row, 'Faktur Pajak No');

    $rowCount = 2;
    foreach($result['data'] as $row){
      $objPHPExcel->getActiveSheet()->setCellValue('A'.$rowCount,  $row['cluster'])
      ->setCellValue('B'.$rowCount,  $row['block'])
      ->setCellValue('C'.$rowCount,  $row['unit_number'])
      ->setCellValue('D'.$rowCount,  $row['payment_no'])
      ->setCellValue('E'.$rowCount,  $row['paymentflag'])
      ->setCellValue('F'.$rowCount,  $row['payment_date'])
      // ->setCellValue('G'.$rowCount,  $row['valid_date'])
      ->setCellValue('G'.$rowCount,  $row['payment'])
      ->setCellValue('H'.$rowCount,  $row['customer_name'])
      ->setCellValue('I'.$rowCount,  $row['notes'])
      ->setCellValue('J'.$rowCount,  $row['fakturpajak_no']);
      $rowCount++;
    }
    $fileResult = 'List_fakturpajak_' . time() . '.csv';
    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment; filename="'.$fileResult.'"');
    header('Cache-Control: max-age=0');
    $write = new PHPExcel_Writer_CSV($objPHPExcel);
    $write->save(APPLICATION_PATH . '/../public/app/erems/uploads/fakturpajak/' . $fileResult);

    $msg = "Export Faktur Pajak CSV";
    $result = array(
      "PRINTOUT" => TRUE,
      "MSG" => $msg,
      "URL" => "app/erems/uploads/fakturpajak/".$fileResult
    );

    echo Zend_Json::encode($result);

    $this->_helper->viewRenderer->setNoRender(true);
  }
     //semy  
}

?>