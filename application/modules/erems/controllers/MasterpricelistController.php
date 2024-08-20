<?php
class Erems_MasterpricelistController extends Zend_Controller_Action {

    function init() {
        $action = $this->getRequest()->getActionName();
        if($action != 'status'){
            $this->session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
            if($this->session->getUserId() == null)
                {
                    throw new Zend_Controller_Action_Exception('This page does not exist', 404);
                }
        }
    }

    function readAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $model = new Erems_Models_Master_Pricelist();

        $post_data['pricelist_id'] = $this->getRequest()->getPost('pricelist_id');
        $post_data['pricelist']    = $this->getRequest()->getPost('pricelist');
        $post_data['keterangan']   = $this->getRequest()->getPost('keterangan');
        $post_data['unit_id']      = $this->getRequest()->getPost('unit_id');
        $post_data['unit_number']  = $this->getRequest()->getPost('unit_number');
        $post_data['start']        = $this->getRequest()->getPost('start');
        $post_data['limit']        = $this->getRequest()->getPost('limit');
        $post_data['page']         = $this->getRequest()->getPost('page');
        $post_data['mode_read']    = $this->getRequest()->getPost('mode_read');
        $post_data['cluster_id']   = $this->getRequest()->getPost('cluster_id');
        $post_data['cluster']      = $this->getRequest()->getPost('cluster');
        $post_data['type_id']      = $this->getRequest()->getPost('type_id');

        $post_data['project_id'] = $this->session->getCurrentProjectId();
        $post_data['pt_id']      = $this->session->getCurrentPtId();

        $statusUnit = Erems_Box_Config::UNITSTATUS_STOCK.'~'.Erems_Box_Config::UNITSTATUS_AVAILABLE;

        if($post_data['mode_read'] == 'detailGenco'){
            return $this->gencoRead();
            exit;
        }

        switch ($post_data['mode_read']) {
            case 'unitlist':
                $result = $model->unitlistRead($post_data,$statusUnit);
                break;
            case 'unitdetail':
                $result = $model->unitOneRead($post_data);
                break;
            case 'koefisienAllRead':
                $resultQuery = $model->koefisienAllRead($post_data);
                $result      = $this->modelDataParser($resultQuery);
                break;
            case 'koefisienAllpricelistdetailRead':
                $resultQuery = $model->koefisienAllRead($post_data);
                $result = $this->modelDataParser($resultQuery);
                break;
            case 'pricelistdetail':
                $resultQuery = $model->pricelistReadOne($post_data);
                $result = $this->modelDataParser($resultQuery);
                break;
            case 'generateUnit':
                $result = $model->generateUnit($post_data,$statusUnit);
                break;
            case 'generateListCluster':
                $result = $model->generateListCluster($post_data,$statusUnit);
                break;
            case 'generateListType':
                $result = $model->generateListType($post_data,$statusUnit);
                break;
            case 'generateExcel':
                $result = $this->pricelistExportData($post_data,$statusUnit);
                break;
            case 'sendEmail':
                $post_data['sendtoemail'] = true;
                $result = $this->sendEmailWithAttachment($post_data);
                break;
            case 'copyData':
                $result = $this->copyData($post_data);
                break;
            case 'forminit':
                $result = $model->clusterlistRead($post_data);
                break;
            default:
                $result = $model->pricelistRead($post_data);
                break;
        }

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Erems_Models_Master_Pricelist();
        $result = $model->pricelistCreate($post_data);
        if($result['success'] == true && $post_data['pricelist_id'] == ''){
            $post_data['pricelist_id'] = $result['new_pricelist_id'];
            $this->pricelistExportData($post_data);
            $post_data['project_id'] = $this->session->getCurrentProjectId();
            $post_data['pt_id']   = $this->session->getCurrentPtId();

            // $resultEmail = $this->sendEmailWithAttachment($post_data); //yang baru.
            // if(!$resultEmail['statusSentMail']){
            //     $result['success'] = 'email_failed';
            // }
        }

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    // function updateAction() {
    //     $this->getResponse()->setHeader('Content-Type', 'application/json');

    //     $result = array('data' => array(), 'total' => 0, 'success' => false);

    //     $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

    //      $model = new Erems_Models_Master_Pricelist();
    //     $result = $model->pricelistUpdate($post_data);

    //     echo Zend_Json::encode($result);

    //     $this->_helper->viewRenderer->setNoRender(true);
    // }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $model = new Erems_Models_Master_Pricelist();
        $result = $model->pricelistDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    private function modelDataParser($resultQuery){

        $result = false;
        if(is_array($resultQuery) && isset($resultQuery['data'][0])){
            $getKeyModel = array();
            $model = array();

            $getKeyModel = array_keys($resultQuery['data'][0]);
            foreach ($getKeyModel as $value) {
                $arrpush['name'] = $value;
                $arrpush['mapping'] = $value;
                array_push($model, $arrpush);
            }

            $result['totalRow'] = $resultQuery['total'];
            $result['data'] = $resultQuery['data'];
            $result['model'] = $model;
        }

        return $result;
    }

    function pricelistExportData($param){
        ini_set("memory_limit", "-1");
        ini_set('max_execution_time', 0);
        require_once dirname(__DIR__) . '../library/phpexcel/PHPExcel/IOFactory.php';


        $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());
        $param['excelSH2'] = $genco->priceListExcelsh2();

        $model = new Erems_Models_Master_Pricelist();

        $result = $model->pricelistExportData($param);

        if(!is_array($result)){
            return $result; exit;
        }

        $resultdata      = $result['data'];
        $resultkoefisien = $result['dataKoefisien'];
        $result['success'] = false;

        $data = array();

        // Instantiate a new PHPExcel object
        $objPHPExcel = new PHPExcel();
        // Set the active Excel worksheet to sheet 0
        $objPHPExcel->setActiveSheetIndex(0);
        $objPHPExcel->getActiveSheet()->setTitle("Pricelist");
        // Initialise the Excel row number

        // styling excel
        $styleArrayBg = array(
            'fill' => array(
                'type'  => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '808080')
            ),
            'font' => array(
                'bold'  => true
            )
        );

        $blueBg = array(
            'fill' => array(
                'type'  => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '1f497d')
            ),
            'font' => array(
                'bold'  => true
            )
        );

        $bluedarkBg = array(
            'fill' => array(
                'type'  => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '002060')
            ),
            'font' => array(
                'bold'  => true
            )
        );

        $bluelightBg = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '00b0f0')
            ),
            'font' => array(
                'bold'  => true
            )
        );

        $greenBg = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '00b050')
            ),
            'font' => array(
                'bold'  => true
            )
        );

        $brownBg = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => 'c0504d')
            ),
            'font' => array(
                'bold'  => true
            )
        );

        $orangeBg = array(
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => 'f79646')
            ),
            'font' => array(
                'bold'  => true
            )
        );

        $greenlightBg = array(
            'fill' => array(
                'type'  => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array('rgb' => '92d050')
            ),
            'font' => array(
                'bold'  => true
            )
        );

        $styleArrayTitle = array(
            'font' => array(
                'bold'  => true,
                'size'  => 14,
                'color' => array('rgb' => 'ffffff')
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
            )
        );

        if($param['excelSH2'] == 1){
            $styleArrayTitle = array(
                'font' => array(
                    'bold'  => true,
                    'size'  => 11,
                    'color' => array('rgb' => 'ffffff')
                ),
                'alignment' => array(
                    'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                )
            );
        }

        function RBorder($objPHPExcel,$columnData,$rowCountData){
            $RStyle = array(
                'borders' => array(
                    'right' => array(
                        'style' => PHPExcel_Style_Border::BORDER_THIN
                    )
                )
            );
            return $objPHPExcel->getActiveSheet()->getStyle($columnData.$rowCountData)->applyFromArray($RStyle);
        }

        function BBorder($objPHPExcel,$lastRow){
            $RStyle = array(
                'borders' => array(
                    'bottom' => array(
                        'style' => PHPExcel_Style_Border::BORDER_THIN
                    )
                )
            );
            return $objPHPExcel->getActiveSheet()->getStyle($lastRow)->applyFromArray($RStyle);
        }

        function LBorder($objPHPExcel,$FirstCol){
            $RStyle = array(
                'borders' => array(
                    'left' => array(
                        'style' => PHPExcel_Style_Border::BORDER_THIN
                    )
                )
            );
            return $objPHPExcel->getActiveSheet()->getStyle($FirstCol)->applyFromArray($RStyle);
        }

        function formatCurrency($objPHPExcel,$columnData,$rowCountData){
            return $objPHPExcel->getActiveSheet()->getStyle($columnData.$rowCountData)->getNumberFormat()->setFormatCode('#,##0.00');
        }

        function formmatingValueMoney($value){
            return number_format((float)$value, 2, '.', '');
        }

        function number_to_alphabet($number) {
            $number = intval($number);
            if ($number <= 0) {
                return '';
            }
            $alphabet = '';
            while($number != 0) {
                $p = ($number - 1) % 26;
                $number = intval(($number - $p) / 26);
                $alphabet = chr(65 + $p) . $alphabet;
            }
            return $alphabet;
        }

        function alphabet_to_number($string) {
            $string = strtoupper($string);
            $length = strlen($string);
            $number = 0;
            $level = 1;
            while ($length >= $level ) {
                $char = $string[$length - $level];
                $c = ord($char) - 64;
                $number += $c * (26 ** ($level-1));
                $level++;
            }
            return $number;
        }

        $borderStyle = array(
                            'borders' => array(
                                'outline' => array(
                                    'style' => PHPExcel_Style_Border::BORDER_THIN,
                                    'color' => array('rgb' => 'FFFFFF'),
                                )
                            )
                        );

        $vertCenter = array(
                        'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                        'vertical'   => PHPExcel_Style_Alignment::VERTICAL_CENTER,
                        'rotation'   => 0,
                        'wrap'       => TRUE
                    );

        $rowCount = 2;
        $column   = 'A';

        $detailKoefisienHeader     = array();
        $detailKoefisienHeaderName = array();

        if(count($resultdata) > 0){
            //check juka sudah tidak open
            if($resultdata[0]['doc_status'] !== 'OPEN'){
                $url               = 'app/erems/downloadfile/msexcel/' . $resultdata[0]['file_name'];
                $result['url']     = $url;
                $result['success'] = true;
            }
            else{
                // added by rico 08112021
                $markup     = 0;
                $is_grossup = 0;
                foreach ($resultdata as $value) {
                    $markup += $value['markup'];
                    $is_grossup += $value['is_grossup'];

                    $mergeArr     = explode(",", $value['list_koefisien_id']);
                    $mergeArrName = explode("|", $value['pricelist_name']);
                    if($value['list_koefisien_id']){
                        $detailKoefisienHeader     = array_merge($detailKoefisienHeader, $mergeArr);
                        $detailKoefisienHeaderName = array_merge($detailKoefisienHeaderName, $mergeArrName);

                        $detailKoefisienHeader     = array_unique($detailKoefisienHeader);
                        $detailKoefisienHeaderName = array_unique($detailKoefisienHeaderName);
                    }
                }

                $detailKoefisienHeader     = array_values($detailKoefisienHeader);
                $detailKoefisienHeaderName = array_values($detailKoefisienHeaderName);


                if($param['excelSH2'] == 1){ /// SH2
                    $col1_start = $column;
                    $col1_end   = $column;

                    $header_1 = array(
                                    'Kawasan',
                                    'Unit Number',
                                    'Luas Tanah
(m)',
                                    'Luas Bangunan
(m)'
                                );

                    foreach($header_1 as $key => $val){
                        $cellMain = $column.(1).":".$column.(3);
                        $objPHPExcel->getActiveSheet()->mergeCells($cellMain);
                        $objPHPExcel->getActiveSheet()->setCellValue($column."1", $val);
                        $objPHPExcel->getActiveSheet()->getStyle($column."1")->getAlignment()->applyFromArray($vertCenter);
                        $objPHPExcel->getActiveSheet()->getStyle($column."1:".$column."3")->applyFromArray($borderStyle);

                        $col1_end = $column;
                        $column++;
                    }
                    $objPHPExcel->getActiveSheet()->getStyle($col1_start."1:".$col1_end."3")->applyFromArray($styleArrayBg);


                    ////// analisa tanah
                    $objPHPExcel->getActiveSheet()->setCellValue($column."1", "Analisa Tanah");
                    $objPHPExcel->getActiveSheet()->getStyle($column."1")->getAlignment()->applyFromArray($vertCenter);

                    $col2_start = $column;
                    $col2_end   = $column;
                    $header_2 = array(
                        array('name' => 'Harga Tanah Mentah/m2', 'satuan' => '(Rp.)'),
                        array('name' => 'Biaya Devcost/m2', 'satuan' => '(Rp.)'),
                        array('name' => 'HPP Tanah/m2', 'satuan' => '(Rp.)'),
                        array('name' => 'Total HPP Tanah', 'satuan' => '(Rp.)'),
                        array('name' => 'Harga Jual Tanah/m2', 'satuan' => '(Rp.)'),
                        array('name' => 'Total Harga Tanah', 'satuan' => '(Rp.)'),
                        array('name' => 'Gross Margin Tanah', 'satuan' => '(Rp.)'),
                        array('name' => 'Total Gross Margin Tanah', 'satuan' => '(%)')
                    );

                    foreach($header_2 as $key_2 => $val_2){
                        $objPHPExcel->getActiveSheet()->setCellValue($column.$rowCount, $val_2['name']);
                        $objPHPExcel->getActiveSheet()->setCellValue($column.($rowCount+1), $val_2['satuan']);
                        $objPHPExcel->getActiveSheet()->getStyle($col2_start."1:".$col2_end."3")->applyFromArray($borderStyle);

                        $col2_end = $column;
                        $column++;
                    }

                    $objPHPExcel->getActiveSheet()->getStyle($col2_start."1:".$col2_end."3")->getAlignment()->applyFromArray($vertCenter);
                    $objPHPExcel->getActiveSheet()->mergeCells($col2_start."1:".$col2_end."1");
                    $objPHPExcel->getActiveSheet()->getStyle($col2_start."1:".$col2_end."1")->applyFromArray($borderStyle);
                    $objPHPExcel->getActiveSheet()->getStyle($col2_start."1:".$col2_end."3")->applyFromArray($blueBg);

                    ////// analisa bangunan
                    $objPHPExcel->getActiveSheet()->setCellValue($column."1", "Analisa Bangunan");
                    $objPHPExcel->getActiveSheet()->getStyle($column."1")->getAlignment()->applyFromArray($vertCenter);

                    $col3_start = $column;
                    $col3_end   = $column;
                    $header_3 = array(
                        array('name' => 'HPP Bangunan/m2', 'satuan' => '(Rp.)'),
                        array('name' => 'Total HPP Bangunan', 'satuan' => '(Rp.)'),
                        array('name' => 'Harga Jual Bangunan/m2', 'satuan' => '(Rp.)'),
                        array('name' => 'Total Harga Bangunan', 'satuan' => '(Rp.)'),
                        array('name' => 'Total Gross Margin Bangunan', 'satuan' => '(Rp.)'),
                        array('name' => 'Gross Margin Bangunan', 'satuan' => '(%)')
                    );

                    foreach($header_3 as $key_3 => $val_3){
                        $objPHPExcel->getActiveSheet()->setCellValue($column.$rowCount, $val_3['name']);
                        $objPHPExcel->getActiveSheet()->setCellValue($column.($rowCount+1), $val_3['satuan']);
                        $objPHPExcel->getActiveSheet()->getStyle($col3_start."1:".$col3_end."3")->applyFromArray($borderStyle);

                        $col3_end = $column;
                        $column++;
                    }

                    $objPHPExcel->getActiveSheet()->getStyle($col3_start."1:".$col3_end."3")->getAlignment()->applyFromArray($vertCenter);
                    $objPHPExcel->getActiveSheet()->mergeCells($col3_start."1:".$col3_end."1");
                    $objPHPExcel->getActiveSheet()->getStyle($col3_start."1:".$col3_end."1")->applyFromArray($borderStyle);
                    $objPHPExcel->getActiveSheet()->getStyle($col3_start."1:".$col3_end."3")->applyFromArray($greenBg);

                    ////// analisa keseluruhan
                    $objPHPExcel->getActiveSheet()->setCellValue($column."1", "Analisa Keseluruhan");
                    $objPHPExcel->getActiveSheet()->getStyle($column."1")->getAlignment()->applyFromArray($vertCenter);

                    $col4_start = $column;
                    $col4_end   = $column;
                    $header_4 = array(
                        array('name' => 'Total HPP Tanah & Bangunan', 'satuan' => '(Rp.)'),
                        array('name' => 'Harga Cash Bottom', 'satuan' => '(Rp.)'),
                        array('name' => 'Harga Cash Bottom Gross Up', 'satuan' => '(%)'),
                        array('name' => 'Total Gross Margin', 'satuan' => '(Rp.)'),
                        array('name' => 'Gross Margin', 'satuan' => '(%)')
                    );

                    foreach($header_4 as $key_4 => $val_4){
                        $objPHPExcel->getActiveSheet()->setCellValue($column.$rowCount, $val_4['name']);
                        $objPHPExcel->getActiveSheet()->setCellValue($column.($rowCount+1), $val_4['satuan']);
                        $objPHPExcel->getActiveSheet()->getStyle($col4_start."1:".$col4_end."3")->applyFromArray($borderStyle);

                        $col4_end = $column;
                        $column++;
                    }

                    $objPHPExcel->getActiveSheet()->getStyle($col4_start."1:".$col4_end."3")->getAlignment()->applyFromArray($vertCenter);
                    $objPHPExcel->getActiveSheet()->mergeCells($col4_start."1:".$col4_end."1");
                    $objPHPExcel->getActiveSheet()->getStyle($col4_start."1:".$col4_end."1")->applyFromArray($borderStyle);
                    $objPHPExcel->getActiveSheet()->getStyle($col4_start."1:".$col4_end."3")->applyFromArray($brownBg);

                    /////// Pricelist before
                    $objPHPExcel->getActiveSheet()->setCellValue($column."1", "Cara Bayar (Pricelist Sebelumnya)");
                    $objPHPExcel->getActiveSheet()->getStyle($column."1")->getAlignment()->applyFromArray($vertCenter);

                    $col5_start = $column;
                    $col5_end   = $column;
                    foreach ($detailKoefisienHeaderName as $value) {
                        $objPHPExcel->getActiveSheet()->setCellValue($column.$rowCount, $value."-LAMA");
                        $a = $column;
                        $objPHPExcel->getActiveSheet()->setCellValue($column.($rowCount+1), "Netto (Rp.)");
                        $objPHPExcel->getActiveSheet()->getStyle($column.($rowCount+1))->applyFromArray($borderStyle);
                        $column++;
                        $b = $column;
                        $objPHPExcel->getActiveSheet()->setCellValue($column.($rowCount+1), "Gross (Rp.)");
                        $objPHPExcel->getActiveSheet()->getStyle($column.($rowCount+1))->applyFromArray($borderStyle);

                        $objPHPExcel->getActiveSheet()->mergeCells($a.$rowCount.":".$b.$rowCount);

                        $objPHPExcel->getActiveSheet()->getStyle($a.$rowCount.":".$b.$rowCount)->applyFromArray($borderStyle);

                        $col5_end = $column;
                        $column++;
                    }

                    $objPHPExcel->getActiveSheet()->getStyle($col5_start."1:".$col5_end."3")->getAlignment()->applyFromArray($vertCenter);
                    $objPHPExcel->getActiveSheet()->mergeCells($col5_start."1:".$col5_end."1");
                    $objPHPExcel->getActiveSheet()->getStyle($col5_start."1:".$col5_end."1")->applyFromArray($borderStyle);
                    $objPHPExcel->getActiveSheet()->getStyle($col5_start."1:".$col5_end."3")->applyFromArray($orangeBg);

                    /////// Pricelist Current
                    $objPHPExcel->getActiveSheet()->setCellValue($column."1", "Cara Bayar (Pricelist Baru)");
                    $objPHPExcel->getActiveSheet()->getStyle($column."1")->getAlignment()->applyFromArray($vertCenter);

                    $col6_start = $column;
                    $col6_end   = $column;
                    foreach ($detailKoefisienHeaderName as $value) {
                        $objPHPExcel->getActiveSheet()->setCellValue($column.$rowCount, $value."-BARU");
                        $a = $column;
                        $objPHPExcel->getActiveSheet()->setCellValue($column.($rowCount+1), "Netto (Rp.)");
                        $objPHPExcel->getActiveSheet()->getStyle($column.($rowCount+1))->applyFromArray($borderStyle);
                        $column++;
                        $b = $column;
                        $objPHPExcel->getActiveSheet()->setCellValue($column.($rowCount+1), "Gross (Rp.)");
                        $objPHPExcel->getActiveSheet()->getStyle($column.($rowCount+1))->applyFromArray($borderStyle);

                        $objPHPExcel->getActiveSheet()->mergeCells($a.$rowCount.":".$b.$rowCount);

                        $objPHPExcel->getActiveSheet()->getStyle($a.$rowCount.":".$b.$rowCount)->applyFromArray($borderStyle);

                        $col6_end = $column;
                        $column++;
                    }

                    $objPHPExcel->getActiveSheet()->getStyle($col6_start."1:".$col6_end."3")->getAlignment()->applyFromArray($vertCenter);
                    $objPHPExcel->getActiveSheet()->mergeCells($col6_start."1:".$col6_end."1");
                    $objPHPExcel->getActiveSheet()->getStyle($col6_start."1:".$col6_end."1")->applyFromArray($borderStyle);
                    $objPHPExcel->getActiveSheet()->getStyle($col6_start."1:".$col6_end."3")->applyFromArray($greenlightBg);
                }
                else{
                    // =============== start static header =====================
                    $mainheader = array(
                        'Kawasan',
                        'Unit Number',
                        'Luas Tanah',
                        'Luas Bangunan',
                        'Tanah Mentah/m2',//
                        'Harga Devcost/m2',//
                        'Harga Tanah HPP/m2',//
                        'Harga Tanah/m2',
                        'Total Harga Tanah',
                        'Total Margin Tanah',
                        'Total Margin Tanah Persen',
                        'Harga Bangunan HPP/m2',//
                        'Harga Bangunan/m2',
                        'Total Harga Bangunan',
                        'Total Margin Bangunan',
                        'Total Margin Bangunan Persen',
                        'Harga Cash Bottom',
                        'Harga Cash Bottom Gross Up', // added by rico 23092021
                        'Total HPP Tanah',//
                        'Total HPP Bangunan',//
                        'Total HPP Tanah & Bangunan',//
                        'Total Margin',//
                        '% Margin'//
                    );

                    foreach($mainheader as $headerStatis){
                        $objPHPExcel->getActiveSheet()->mergeCells($column.($rowCount).":".$column.'2');
                        $objPHPExcel->getActiveSheet()->setCellValue($column.$rowCount, $headerStatis);
                        $objPHPExcel->getActiveSheet()->getStyle($column.$rowCount)->getAlignment()->setWrapText(true);

                        $column++;
                    }

                    // =============== start dynamic header =====================
                    foreach ($detailKoefisienHeaderName as $value) {
                        $mergeHeader1 = $column;
                        $mergeHeader1++;

                        // $objPHPExcel->getActiveSheet()->mergeCells($column.($rowCount).":".$mergeHeader1.($rowCount));

                        // $objPHPExcel->getActiveSheet()->setCellValue($column.$rowCount, $value);

                        $objPHPExcel->getActiveSheet()->setCellValue($column.'1', $value);
                        $objPHPExcel->getActiveSheet()->setCellValue($column.'2', 'Netto');

                        $objPHPExcel->getActiveSheet()->setCellValue($mergeHeader1.'1', $value);
                        $objPHPExcel->getActiveSheet()->setCellValue($mergeHeader1.'2', 'Gross');

                        if($is_grossup > 0){
                            $mergeHeader2 = $mergeHeader1;
                            $mergeHeader2++;

                            $objPHPExcel->getActiveSheet()->mergeCells($column.(1).":".$mergeHeader2.(1));

                            $objPHPExcel->getActiveSheet()->setCellValue($mergeHeader2.'1', $value);
                            $objPHPExcel->getActiveSheet()->setCellValue($mergeHeader2.'2', 'Harga Gross Up');

                            $column = $mergeHeader2;
                            $column++;
                        }else{
                            $objPHPExcel->getActiveSheet()->mergeCells($column.(1).":".$mergeHeader1.(1));

                            $column = $mergeHeader1;
                            $column++;
                        }
                    }
                    $totalRowChar = chr(ord($column) - 1);
                    // $column++;

                    if($markup > 0){
                        $mh = $column;

                        $objPHPExcel->getActiveSheet()->setCellValue($column.'1', 'HARGA GROSS + MARKUP PRICELIST');
                        $objPHPExcel->getActiveSheet()->setCellValue($column.'2', 'Mark Up Pricelist');
                        $column++;
                        foreach ($detailKoefisienHeaderName as $value) {
                            $objPHPExcel->getActiveSheet()->setCellValue($column.'2', $value);
                            $column++;
                        }
                        // ended by rico 08112021

                        $objPHPExcel->getActiveSheet()->mergeCells($mh."1:".$objPHPExcel->getActiveSheet()->getHighestDataColumn()."1");

                    }
                }

                // ================== start isi data ============================
                $rowCountData = $param['excelSH2'] == 1 ? 4 : 3;
                foreach ($resultdata as $key => $value) {
                    // =========================== start isi data dynamic column ================================
                    $hargaFinalGross   = array();
                    $hargaFinalNetto   = array();
                    $hargaFinalGrossUp = array();
                    $hargaFinalMarkup  = array();

                    if($param['excelSH2'] == 1){ /// SH2
                        $hargaFinalGross_old = array();
                        $hargaFinalNetto_old = array();
                    }

                    if(strlen($value['list_koefisien_id']) > 1){
                        $listKoefisienIdValue = explode(",", $value['list_koefisien_id']);
                        $hargaFinalGrossArr   = explode('|', $value['harga_final_gross']);
                        $hargaFinalNettoArr   = explode('|', $value['harga_final_netto']);
                        $hargaFinalGrossupArr = explode('|', $value['harga_final_grossup']);
                        $hargaFinalMarkupArr  = explode('|', $value['harga_final_markup']);

                        if($param['excelSH2'] == 1){ /// SH2
                            $hargaFinalGross_oldArr = explode('|', $value['harga_final_gross_old']);
                            $hargaFinalNetto_oldArr = explode('|', $value['harga_final_netto_old']);
                        }

                        foreach ($listKoefisienIdValue as $keylist => $valuelist) {
                            $hargaFinalGross[$valuelist]   = $hargaFinalGrossArr[$keylist];
                            $hargaFinalNetto[$valuelist]   = $hargaFinalNettoArr[$keylist];
                            $hargaFinalGrossUp[$valuelist] = $hargaFinalGrossupArr[$keylist];
                            $hargaFinalMarkup[$valuelist]  = $hargaFinalMarkupArr[$keylist];

                            if($param['excelSH2'] == 1){ /// SH2
                                $hargaFinalGross_old[$valuelist] = $hargaFinalGross_oldArr[$keylist];
                                $hargaFinalNetto_old[$valuelist] = $hargaFinalNetto_oldArr[$keylist];
                            }
                        }

                        foreach ($detailKoefisienHeader as $key1 => $value1) {
                            if(!in_array($value1, $listKoefisienIdValue)){
                                $hargaFinalGross[$value1]   = 0;
                                $hargaFinalNetto[$value1]   = 0;
                                $hargaFinalGrossUp[$value1] = 0;
                                $hargaFinalMarkup[$value1]  = 0;

                                if($param['excelSH2'] == 1){ /// SH2
                                    $hargaFinalGross_old[$value1] = 0;
                                    $hargaFinalNetto_old[$value1] = 0;
                                }
                            }
                        }
                    }
                    else{
                        $listKoefisienIdValue = array($value['list_koefisien_id']);
                        foreach ($detailKoefisienHeader as $key1 => $value1) {
                            if($value1 == $value['list_koefisien_id']){
                                $hargaFinalGross[$value1]   = $value['harga_final_gross'];
                                $hargaFinalNetto[$value1]   = $value['harga_final_netto'];
                                $hargaFinalGrossUp[$value1] = $value['harga_final_grossup'];
                                $hargaFinalMarkup[$value1]  = $value['harga_final_markup'];

                                if($param['excelSH2'] == 1){ /// SH2
                                    $hargaFinalGross_old[$value1] = $value['harga_final_gross_old'];
                                    $hargaFinalNetto_old[$value1] = $value['harga_final_netto_old'];
                                }
                            }
                            else{
                                $hargaFinalGross[$value1]   = 0;
                                $hargaFinalNetto[$value1]   = 0;
                                $hargaFinalGrossUp[$value1] = 0;
                                $hargaFinalMarkup[$value1]  = 0;

                                if($param['excelSH2'] == 1){ /// SH2
                                    $hargaFinalGross_old[$value1] = 0;
                                    $hargaFinalNetto_old[$value1] = 0;
                                }
                            }
                        }
                    }

                    // ================== start isi data ============================
                    $columnData = 'A';
                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, $value['cluster']);
                    RBorder($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, $value['unit_number']);
                    RBorder($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, $value['land_size']);
                    RBorder($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, $value['building_size']);
                    RBorder($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($value['harga_tanah_mentah']));
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    RBorder($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($value['harga_tanah_devcost']));
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    RBorder($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($value['harga_tanah_hpp']));
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    RBorder($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    if($param['excelSH2'] == 1){
                        $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($value['total_tanah_hpp']));
                        formatCurrency($objPHPExcel,$columnData,$rowCountData);
                        RBorder($objPHPExcel,$columnData,$rowCountData);
                        $columnData++;
                    }

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($value['harga_tanahpermeter']));
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    RBorder($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($value['total_hargatanah']));
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    RBorder($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($value['harga_tanah_margin']));
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    RBorder($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($value['harga_tanah_margin_persen']));
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    RBorder($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($value['harga_bangunan_hpp']));
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    RBorder($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    if($param['excelSH2'] == 1){
                        $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($value['total_bangunan_hpp']));
                        formatCurrency($objPHPExcel,$columnData,$rowCountData);
                        RBorder($objPHPExcel,$columnData,$rowCountData);
                        $columnData++;
                    }

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($value['harga_bangunanpermeter']));
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    RBorder($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($value['total_hargabangunan']));
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    RBorder($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($value['harga_bangunan_margin']));
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    RBorder($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($value['harga_bangunan_margin_persen']));
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    RBorder($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($param['excelSH2'] == 1 ? $value['total_hpp'] : $value['harga_netto']));
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    RBorder($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($param['excelSH2'] == 1 ? $value['total_harga_jual'] : $value['harga_netto_grossup']));
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    RBorder($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($param['excelSH2'] == 1 ? $value['harga_netto_grossup'] : $value['total_tanah_hpp']));
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    RBorder($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($param['excelSH2'] == 1 ? $value['total_margin'] : $value['total_bangunan_hpp']));
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    RBorder($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($param['excelSH2'] == 1 ? $value['total_margin_persen'] : $value['total_hpp']));
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    RBorder($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    if($param['excelSH2'] != 1){
                        $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($value['total_margin']));
                        formatCurrency($objPHPExcel,$columnData,$rowCountData);
                        RBorder($objPHPExcel,$columnData,$rowCountData);
                        $columnData++;

                        $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($value['total_margin_persen']));
                        formatCurrency($objPHPExcel,$columnData,$rowCountData);
                        RBorder($objPHPExcel,$columnData,$rowCountData);
                        $columnData++;
                    }

                    //isi data dinamis pricelist koefisien
                    if($param['excelSH2'] == 1){
                        for($i = 0;$i < count($detailKoefisienHeader);$i++){
                            $valFinalNetto_old = 0;
                            $valFinalGross_old = 0;
                            if(in_array($detailKoefisienHeader[$i], $listKoefisienIdValue)){
                                $valFinalNetto_old = $hargaFinalNetto_old[$detailKoefisienHeader[$i]];
                                $valFinalGross_old = $hargaFinalGross_old[$detailKoefisienHeader[$i]];
                            }

                            $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($valFinalNetto_old));
                            formatCurrency($objPHPExcel,$columnData,$rowCountData);
                            RBorder($objPHPExcel,$columnData,$rowCountData);
                            $columnData++;

                            $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($valFinalGross_old));
                            formatCurrency($objPHPExcel,$columnData,$rowCountData);
                            RBorder($objPHPExcel,$columnData,$rowCountData);
                            $columnData++;
                        }

                        for($i = 0;$i < count($detailKoefisienHeader);$i++){
                            $valFinalNetto = 0;
                            $valFinalGross = 0;
                            if(in_array($detailKoefisienHeader[$i], $listKoefisienIdValue)){
                                $valFinalNetto = $hargaFinalNetto[$detailKoefisienHeader[$i]];
                                $valFinalGross = $hargaFinalGross[$detailKoefisienHeader[$i]];
                            }

                            $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($valFinalNetto));
                            formatCurrency($objPHPExcel,$columnData,$rowCountData);
                            RBorder($objPHPExcel,$columnData,$rowCountData);
                            $columnData++;

                            $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($valFinalGross));
                            formatCurrency($objPHPExcel,$columnData,$rowCountData);
                            RBorder($objPHPExcel,$columnData,$rowCountData);
                            $columnData++;
                        }
                    }
                    else{
                        for($i = 0;$i < count($detailKoefisienHeader);$i++){
                            if(in_array($detailKoefisienHeader[$i], $listKoefisienIdValue)){
                                $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($hargaFinalNetto[$detailKoefisienHeader[$i]]));
                                formatCurrency($objPHPExcel,$columnData,$rowCountData);
                                RBorder($objPHPExcel,$columnData,$rowCountData);
                                $columnData++;
                                $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($hargaFinalGross[$detailKoefisienHeader[$i]]));
                                formatCurrency($objPHPExcel,$columnData,$rowCountData);
                                RBorder($objPHPExcel,$columnData,$rowCountData);
                                $columnData++;

                                // added by rico 08112021
                                if($is_grossup > 0){
                                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($hargaFinalGrossUp[$detailKoefisienHeader[$i]]));
                                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                                    RBorder($objPHPExcel,$columnData,$rowCountData);
                                    $columnData++;
                                }
                            }
                            else{
                                $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, 0);
                                RBorder($objPHPExcel,$columnData,$rowCountData);
                                $columnData++;
                                $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, 0);
                                RBorder($objPHPExcel,$columnData,$rowCountData);
                                $columnData++;

                                // added by rico 08112021
                                if($is_grossup > 0){
                                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, 0);
                                    RBorder($objPHPExcel,$columnData,$rowCountData);
                                    $columnData++;
                                }
                            }
                        }

                        //// added by rico 08112021
                        if($value['markup'] > 0){
                            $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($value['markup']).'%');
                            formatCurrency($objPHPExcel,$columnData,$rowCountData);
                            RBorder($objPHPExcel,$columnData,$rowCountData);
                            $columnData++;

                            for($i = 0;$i < count($detailKoefisienHeader);$i++){
                                if(in_array($detailKoefisienHeader[$i], $listKoefisienIdValue)){
                                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, formmatingValueMoney($hargaFinalMarkup[$detailKoefisienHeader[$i]]));
                                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                                    RBorder($objPHPExcel,$columnData,$rowCountData);
                                    $columnData++;
                                }else{
                                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, 0);
                                    RBorder($objPHPExcel,$columnData,$rowCountData);
                                    $columnData++;
                                }
                            }
                        }
                        //// ended by rico 08112021
                    }

                    LBorder($objPHPExcel,'A3:A'.$rowCountData);
                    $rowCountData++;
                }

                $colsMax = alphabet_to_number($column);
                $colsMax--;
                $colsMax = number_to_alphabet($colsMax);

                if($param['excelSH2'] == 1){
                    $objPHPExcel->getActiveSheet()->getStyle('A1:'.$colsMax.'3')->applyFromArray($styleArrayTitle);
                }
                else{
                    $objPHPExcel->getActiveSheet()->getStyle('A1:'.$colsMax.'2')->applyFromArray($styleArrayTitle);
                    $objPHPExcel->getActiveSheet()->getStyle('A1:'.$colsMax.'2')->applyFromArray($styleArrayBg);
                }

                for($i = alphabet_to_number('A');$i <= alphabet_to_number($objPHPExcel->getActiveSheet()->getHighestDataColumn());$i++){
                    $objPHPExcel->getActiveSheet()->getColumnDimension(number_to_alphabet($i))->setAutoSize(true);
                }

                $objPHPExcel->getActiveSheet()->setShowGridlines(false);
                $lastColumn = chr(ord($columnData) - 1);
                $lastRow = $rowCountData-1;
                BBorder($objPHPExcel,'A'.$lastRow.':'.$colsMax.$lastRow);

                // ================== start sheet ke dua ========================
                // ================== start isi data ============================

                if($param['excelSH2'] == 1){
                    $secondheader = array(
                        array('name' => 'Cara Bayar'),
                        array('name' => 'Nama Pricelist'),
                        array('name' => 'Koefisien', 'satuan' => '(%)'),
                        array('name' => 'Biaya Asuransi', 'satuan' => '(Rp.)'),
                        array('name' => 'BPHTB', 'satuan' => '(Rp.)'),
                        array('name' => 'BBN', 'satuan' => '(Rp.)'),
                        array('name' => 'Biaya AJB', 'satuan' => '(Rp.)'),
                        array('name' => 'Biaya Administrasi', 'satuan' => '(Rp.)'),
                        array('name' => 'Margin Gross Up', 'satuan' => '(%)'),
                        array('name' => 'Diskon Pembayaran', 'satuan' => '(%)'),
                        array('name' => 'NPV Diskon Pembayaran', 'satuan' => '(%)'),
                        array('name' => 'Sisa NPV', 'satuan' => '(%)'),
                        array('name' => 'Collection Fee', 'satuan' => '(%)'),
                        array('name' => 'Program Penjualan', 'satuan' => '(%)')
                    );
                    $thirdheader = array('Tipe','Termin','Jumlah Pembayaran (%)','NPV (%)');
                }
                else{
                    $secondheader = array(
                        array('name' => 'Pricetype'),
                        array('name' => 'Pricelist name'),
                        array('name' => 'Koefisien'),
                        array('name' => 'Biaya Asuransi'),
                        array('name' => 'Biaya BPHTB'),
                        array('name' => 'Biaya BBN'),
                        array('name' => 'Biaya AJB'),
                        array('name' => 'Biaya Administrasi'),
                        array('name' => 'Gross Up'),
                        array('name' => 'Disc Pembayaran'),
                        array('name' => 'NPV Discount Pembayaran'),
                        array('name' => 'Sisa NPV'),
                        array('name' => 'Collection Fee'),
                        array('name' => 'Program Penjualan')
                    );
                    $thirdheader = array('Type','Termin','%','NPV');
                }

                $iterateSheet = 1;
                foreach ($resultkoefisien as $key => $value){
                    $pricelist_name = $value['pricelist_name'] . ($param['excelSH2'] == 1 ? '-BARU' : '') ;

                    $objPHPExcel->createSheet($iterateSheet);
                    $objPHPExcel->setActiveSheetIndex($iterateSheet);
                    $objPHPExcel->getActiveSheet()->setTitle(substr($pricelist_name, 0,30));

                    $column     = 'A';
                    $rowCount   = 1;
                    foreach($secondheader as $key_head => $val_head){

                        $rowCount = 1;
                        $objPHPExcel->getActiveSheet()->setCellValue($column.$rowCount, $val_head['name']);
                        if(isset($val_head['satuan'])){
                            $rowCount = $rowCount+1;
                            $objPHPExcel->getActiveSheet()->setCellValue($column.$rowCount, $val_head['satuan']);
                        }
                        else{
                            if($param['excelSH2'] == 1){
                                $objPHPExcel->getActiveSheet()->mergeCells($column."1:".$column."2");
                            }
                        }

                        if($param['excelSH2'] == 1){
                            $objPHPExcel->getActiveSheet()->getStyle($column."1")->getAlignment()->applyFromArray($vertCenter);
                            $objPHPExcel->getActiveSheet()->getStyle($column."1:".$column."2")->applyFromArray($borderStyle);
                            $objPHPExcel->getActiveSheet()->getStyle($column."1:".$column."2")->applyFromArray($styleArrayTitle);
                            $objPHPExcel->getActiveSheet()->getStyle($column."1:".$column."2")->applyFromArray($bluedarkBg);
                        }

                        $column++;
                    }

                    $columnData   = 'A';
                    $rowCountData = $rowCount+1;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, $value['pricetype']);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, $pricelist_name);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, $value['koefisien']);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, $value['biaya_asuransi']);
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, $value['biaya_bphtb']);
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, $value['biaya_bbn']);
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, $value['biaya_ajb']);
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, $value['biaya_administrasi']);
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    // added by rico 26102021
                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, $value['grossup']);
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, $value['disc_pembayaran']);
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, $value['npv_discount']);
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, $value['sisa_npv']);
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, $value['collection_fee']);
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);
                    $columnData++;

                    $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, $value['program_penjualan']);
                    formatCurrency($objPHPExcel,$columnData,$rowCountData);

                    //================================ start isi detail koefisien =================================
                    $param['koefisien_id'] = $value['koefisien_id'];
                    $resultDetailKoefisien = $model->pricelistExportDataDetailKoefisien($param);

                    if($resultDetailKoefisien['success']){
                        $columnData = 'A';
                        $rowCountData = $param['excelSH2'] == 1 ? 5 : 4;

                        foreach($thirdheader as $headerStatis){
                            $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, $headerStatis);
                            if($param['excelSH2'] == 1){
                                $objPHPExcel->getActiveSheet()->getStyle($columnData.$rowCountData)->getAlignment()->applyFromArray($vertCenter);
                                $objPHPExcel->getActiveSheet()->getStyle($columnData.$rowCountData)->applyFromArray($borderStyle);
                                $objPHPExcel->getActiveSheet()->getStyle($columnData.$rowCountData)->applyFromArray($styleArrayTitle);
                                $objPHPExcel->getActiveSheet()->getStyle($columnData.$rowCountData)->applyFromArray($bluelightBg);
                            }

                            $columnData++;
                        }

                        $rowCountData++;
                        $resultdataDetailKoefisien = $resultDetailKoefisien['data'];
                        foreach ($resultdataDetailKoefisien as $key1 => $value1) {
                            $columnData = 'A';

                            $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, $value1['scheduletype']);
                            $columnData++;

                            $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, $value1['termin']);
                            $columnData++;

                            $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, $value1['persentase_amount']);
                            $columnData++;

                            $objPHPExcel->getActiveSheet()->setCellValue($columnData.$rowCountData, $value1['persentase_npv']);

                            $rowCountData++;
                        }
                    }

                    foreach (range('A', $objPHPExcel->getActiveSheet()->getHighestDataColumn()) as $col) {
                        $objPHPExcel->getActiveSheet()->getColumnDimension($col)->setAutoSize(true);
                    }

                    $iterateSheet++;
                }
                $objPHPExcel->setActiveSheetIndex(0);
                // exit;
                $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');

                $dateReportCreate = strtotime($resultdata[0]['pricelist_date']);
                $fileNameEkstenstion = date('Y_m_d_H_i_s',$dateReportCreate);

                $fileResult = 'Pricelist_'.$fileNameEkstenstion.'_'.$resultdata[0]['pricelist_id_report'].'_'.$resultdata[0]['project_name'].'.xlsx';
                $objWriter->save(APPLICATION_PATH . '/../public/app/erems/downloadfile/msexcel/' . $fileResult);

                $url = 'app/erems/downloadfile/msexcel/' . $fileResult;

                $result['url'] = $url;
                $result['success'] = true;

                $param['file_name'] = $fileResult;
                $model->pricelistSaveExcelName($param);
            }
        }
        else {
            $result['success'] = false;
        }
        return $result;
    }

    function statusAction(){
        $model = new Erems_Models_Master_Pricelist();
        $sendStatus = false;

        // $check = end(explode('/', $_SERVER['REQUEST_URI']));
        $exp   = explode('/', $_SERVER['REQUEST_URI']);
        $indx  = count($exp) > 0 ? count($exp)-1 : 0;
        $check = $exp[$indx];

        $queryString = explode('&',base64_decode($check));

        $param = array();
        foreach ($queryString as $key => $value) {
            list($k,$v) = explode('=',$value);
            $param[$k] = $v;
        }

        if($param['status'] == 'REJECT'){
            $this->rejectAction($param);
            exit;
        }
        else{
            if($param['user'] == 'API' && $param['pass'] == 'API'){
                if($param['status'] == 'APPROVE'){
                    //nanti cek ke approval list
                    $param['status'] = 'OPEN';
                }
                $sendStatus = $model->pricelistSetStatusDocStatus($param);
            }

            if($sendStatus['success']){
                $param['sendtoemail']       = true;
                $param['approvallevelnext'] = true;
                $param['dataApproval']      = $sendStatus;
                $param['project_id']        = $sendStatus['data']['project_id'];
                $param['pt_id']             = $sendStatus['data']['pt_id'];
                if($sendStatus['data']['doc_status'] == 'OPEN'){
                    // $param['assign_approveby'] = $sendStatus['data']['approveby'];
                    $this->sendEmailWithAttachment($param);
                }
                echo '<script>alert("Berhasil Pricelist '.$sendStatus['data']['keterangan'].' sudah di APPROVE");close();</script>';//'.$param['status'].'
            }
            else{
                echo '<script>alert("Gagal, Pricelist sudah di approve / reject");close();</script>';
            }
        }
        exit;
    }

    function rejectAction($param){
        $sendStatus = false;
        $model = new Erems_Models_Master_Pricelist();
        if(isset($param['rejectNotes'])){
            $sendStatus = $model->pricelistSetStatusDocStatus($param);

            if($sendStatus['success']){
                echo '<script>alert("Berhasil Pricelist '.$sendStatus['data']['keterangan'].' sudah di '.$param['status'].'");close();</script>';
            }
            else{
                echo '<script>alert("Gagal, Pricelist sudah di approve / reject");close();</script>';
            }
            // session_destroy();
        }
        else{
            $sendStatus = $model->pricelistCheckStatusDoc($param);
            if($sendStatus['success']){
                $urlDataReject = 'user=API&pass=API&pricelist_id='.$param['pricelist_id'].'&approveid='.$param['approveid'].'&modules='.$param['modules'].'&time='.mktime().'&approveorder='.$param['approveorder'].'&approveemail='.$param['approveemail'].'&project_id='.$param['project_id'].'&pt_id='.$param['pt_id'].'&status=REJECT'.'&rejectNotes=';

                // $urlDataReject  = 'user=API&pass=API&pricelist_id='.$param['pricelist_id'].'&status=REJECT&approveid='.$param['approveid'].'&rejectNotes=';
                // $urlReject     = $_SERVER['HTTP_HOST'].'/webapps/public/'.$param['modules'];//$_SERVER['HTTP_REFERER'].'erems/masterpricelist/status/';
                $urlReject     = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].'/reroute.php/';

                echo '<p id="demo"></p>
                <script>
                    var txt;var redirectUrl = "";
                    var rejectNotes = prompt("Reject Notes:");
					if (rejectNotes == null || rejectNotes == "") {
                        close();
                    } else {
						close();
                        //txt = "'.$urlDataReject.'"+rejectNotes;
                        //txt = btoa(txt);
                        //redirectUrl = "'.$urlReject.'"+txt;
                        //// location.replace("'.$urlReject.'"+txt);
                        //location.replace(redirectUrl);
                    }
                    // document.getElementById("demo").innerHTML = redirectUrl;
                </script>';
            }
            else{
                echo '<script>alert("Gagal, Pricelist sudah di approve / reject");close();</script>';
            }
        }
        // session_destroy();
        exit;
    }

    function sendEmailWithAttachment($param){
        $result['success']        = false;
        $result['statusSentMail'] = false;

        $dataEmail = Erems_Box_Tools::emailPricelist($param);

        if($dataEmail['html']){
            $var = array(
                'title'     => "CES System - " . $dataEmail['data_email']['project_name'],
                'subject'   => 'Request Pricelist from '.$dataEmail['data_email']['project_name'],
                'content'   => $dataEmail['html'],
                'sender'    => $dataEmail['data_email']['email_sender'],
                'recipient' => $dataEmail['data_email']['email_recipient'],
            );

            $statusSentMail = Erems_Box_Tools::emailSend($var);
            if($statusSentMail){
                $result['success']        = true;
                $result['statusSentMail'] = true;
                $result['emailAddress']   = $dataEmail['data_email']['email_recipient']["email"];

                if(!$dataEmail['data_email']['is_sendmail']){
                    $model = new Erems_Models_Master_Pricelist();
                    $model->pricelistSendMailAccept($param);
                }
            }
            else{
                $result['message'] = "Email gagal terkirim.";
            }
        }
        return $result;
    }

    // function sendEmailWithAttachment($param){
    //     $result['success'] = false;
    //     $result['statusSentMail'] = FALSE;
    //     $model = new Erems_Models_Master_Pricelist();
    //     //// $base_url = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'];
    //     //// $base_url = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].'/webapps/Ciputra';// https://ces.ciputragroup.com/webapps/Ciputra/

    //     //// settingan localhost add by Erwin.S 20042021
    //     //// $base_url = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'].'/webapps';
    //     $base_url = 'http' . ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 's' : '') . '://' . $_SERVER['HTTP_HOST'] . str_replace('/public', '', str_replace('//', '/', dirname($_SERVER['SCRIPT_NAME'])));

    //     //check approval list, dan kirim ke yang paling atas
    //     $dataEmailApproval_arr = $model->pricelistCheckApproveList($param);
    //     $dataEmailApproval     = $dataEmailApproval_arr['data'];

    //     $Approvallevel = count($dataEmailApproval[3]);
    //     $MasterApproval = count($dataEmailApproval[2]);
    //     if($Approvallevel < $MasterApproval){
    //         $players = array(
    //             'approve' => array(
    //                 'email'         => $dataEmailApproval[2][$Approvallevel]['email'],
    //                 'name'          => $dataEmailApproval[2][$Approvallevel]['user_name'],
    //                 'user_id'       => $dataEmailApproval[2][$Approvallevel]['user_id'],
    //                 'approve_order' => $dataEmailApproval[2][$Approvallevel]['approve_order'],
    //                 'project_id'    => $dataEmailApproval[2][$Approvallevel]['project_id'],
    //                 'pt_id'         => $dataEmailApproval[2][$Approvallevel]['pt_id']
    //             )
    //         );
    //         $param['user_email_id'] = $players['approve']['user_id'];
    //         //check approval list, dan kirim ke yang paling atas

    //         $dataEmail             = $model->pricelistSendEmail($param);
    //         $data                  = $dataEmail['data'];
    //         $pricelist_date        = strtotime($data[0]['pricelist_date']);
    //         $dateReport            = date('d-m-Y',$pricelist_date);
    //         $pricelist_date_create = isset($data[0]['modion'])?strtotime($data[0]['modion']):strtotime($data[0]['addon']);
    //         $dateReportCreate      = date('d-m-Y',$pricelist_date_create);
    //         $username              = isset($data[0]['modi_user_name'])?$data[0]['modi_user_name']:$data[0]['user_name'];
    //         $modules               = 'erems/masterpricelist/status/';

    //         $urlData = 'user=API&pass=API&pricelist_id='.$param['pricelist_id'].'&approveid='.$players['approve']['user_id'].'&modules='.$modules.'&time='.mktime().'&approveorder='.$players['approve']['approve_order'].'&approveemail='.$players['approve']['email'].'&project_id='.$players['approve']['project_id'].'&pt_id='.$players['approve']['pt_id'];

    //         $urlDataApprove = $urlData.'&status=APPROVE';
    //         $urlDataReject  = $urlData.'&status=REJECT';

    //         $urlApprove     = $base_url.'/reroute.php/'.base64_encode($urlDataApprove);
    //         $urlReject      = $base_url.'/reroute.php/'.base64_encode($urlDataReject);

    //         $urlExcel                  = $base_url.'/public/app/erems/downloadfile/msexcel/';//$_SERVER['HTTP_REFERER'].'/app/erems/downloadfile/msexcel/';
    //         $fileNameEkstenstion       = $data[0]['file_name'];

    //         $fileResultRequest   = $fileNameEkstenstion;
    //         $urlPricelistRequest = $urlExcel.$fileResultRequest;

    //         $messageHead = '<p>Dear Bapak / Ibu,</p>';
    //         $message = '<p>Terdapat permohonan approval Pricelist baru yang dibuat oleh user dari EREMS APPLICATION di project '.$data[0]['project_name'].', mohon bantuan untuk followup permohonan berikut<br/>';
    //         $message .= '<p>';
    //         $message .= '<table>';
    //         $message .= '<tr><td>Keterangan</td><td>: '.$data[0]['keterangan'].' </td></tr>';
    //         $message .= '<tr><td>Pricelist Date</td><td>: ' . $dateReport . '</td></tr>';
    //         $message .= '<tr><td>Tanggal Pembuatan</td><td>: ' . $dateReportCreate . '</td></tr>';
    //         $message .= '<tr><td>Username Pembuat</td><td>: ' . $username . '</td></tr>';
    //         $message .= '</table>';
    //         $message .= '</p>';
    //         $message .= '<p>';
    //         $message .= '<table>';
    //         if(isset($dataBefore[0]['file_name'])){
    //             $fileNameEkstenstionBefore = $dataBefore[0]['file_name'];
    //             $fileResultBefore          = $fileNameEkstenstionBefore;
    //             $urlPricelistBefore        = $urlExcel.$fileResultBefore;
    //             $message .= '<tr><td>File Pricelist Sebelumnya</td><td>: <a href="'.$urlPricelistBefore.'" target="blank">Klik di sini</a></td></tr>';
    //         }
    //         $message .= '<tr><td>Permohonan File Pricelist Terbaru</td><td>: <a href="'.$urlPricelistRequest.'" target="blank">Klik di sini</a></td></tr>';
    //         $message .= '</table>';
    //         $message .= '</p>';
    //         $message .= '<p>Dan untuk APPROVE/REJECT permohonan pricelist terbaru silakan klik tombol dibawah ini.</p>';

    //         $message .= '
    //                     <div class="btn btn--flat btn--small" style="Margin-bottom: 20px;text-align: center;">
    //                         <![if !mso]><a style="border-radius: 4px;display: inline-block;font-size: 14px;font-weight: bold;line-height: 24px;padding: 12px 24px;text-align: center;text-decoration: none !important;transition: opacity 0.1s ease-in;color: #ffffff !important;background-color: #80bf2e;font-family: Ubuntu, sans-serif;" href="'.$urlApprove.'">Approve</a><![endif]>&emsp;&emsp;
    //                         <![if !mso]><a style="border-radius: 4px;display: inline-block;font-size: 14px;font-weight: bold;line-height: 24px;padding: 12px 24px;text-align: center;text-decoration: none !important;transition: opacity 0.1s ease-in;color: #ffffff !important;background-color: #80bf2e;font-family: Ubuntu, sans-serif;" href="'.$urlReject.'">Reject</a><![endif]></div>
    //                         <p> Regards,</p><p> EREMS APPLICATIONS </p>
    //                 ';

    //         $finalMessage = $messageHead.$message;
    //         // create view object
    //         $html = new Zend_View();
    //         $html->setScriptPath(APPLICATION_PATH . '/modules/erems/views/');
    //         // assign values
    //         $html->assign('content', $finalMessage);
    //         // create mail object
    //         $mail = new Zend_Mail('utf-8');
    //         // render view
    //         $bodyText = $html->render('email_template.phtml');

    //         try{
    //             $mail = new Erems_Box_Library_Email();
    //             // $mail->getMail()->setFrom('ces@ciputra.co.id', "CES System - ".$data[0]['project_name']);
    //             $mail->getMail()->setFrom('no.reply@ciputra.com', "CES System - ".$data[0]['project_name']);
    //             // $mail->getMail()->setBodyHtml(nl2br($finalMessage));
    //             $mail->getMail()->setBodyHtml($bodyText);
    //             $mail->getMail()->addTo($players["approve"]["email"], $players["approve"]["name"]);

    //             $mail->getMail()->setSubject('Request Pricelist from '.$data[0]['project_name']);
    //             $mail->getMail()->send();

    //             $result['statusSentMail'] = TRUE;
    //             $result['success'] = TRUE;
    //             $result['emailAddress'] = $players["approve"]["email"];
    //             if(!$data[0]['is_sendmail']){
    //                 $model->pricelistSendMailAccept($param);
    //             }
    //         }
    //         catch (Zend_Mail_Exception $e) {
    //             $result['statusSentMail'] = FALSE;
    //             $message = "Email gagal terkirim.";
    //         }
    //     }
    //     return $result;
    // }

    function gencoRead(){
         // cek semua fungsi yang digunakan keperluan masing Project
        $dir               = APPLICATION_PATH . '/../public/app/erems/projectlibs/';
        $prolibsFiles      = scandir($dir);
        $prolibsFound      = NULL;
        $className         = "Prolibs_" . $this->session->getCurrentProjectId() . "_" . $this->session->getCurrentPtId();
        $prolibsFileSearch = $className . ".js";

        if (count($prolibsFiles) > 0) {
            $prolibsFiles = preg_grep("/.js$/", $prolibsFiles);

            if (in_array($prolibsFileSearch, $prolibsFiles)) {
                $prolibsFound = $className;
            }
        }

        $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getCurrentProjectId(), $this->session->getCurrentPtId());

        $otherAT = array("data" => array(
            "NOPTKP"                    => $genco->NOPTKP(),
            "isUsePPN"                  => $genco->isUsePPN(),
            "pembulatan1000"            => $genco->pembulatan1000(),
            "USE_GROSSUP"               => $genco->GrossUpNetto(),
            "PROLIBFILE"                => $prolibsFound,
            "ppn_value"                 => $genco->ppnValueadditional(),
            "pembulatan_grossup"        => $genco->pembulatanGrossUpPriceList(),
            "pembulatan_grossup_persen" => $genco->pembulatanGrossUpPersenPriceList(),
            "pembulatan_tanah"          => $genco->pembulatanHargaTanahPriceList(),
            "is_grossup_netto"          => $genco->GrossUpNetto()
        ));

        echo Zend_Json::encode($otherAT);
        $this->_helper->viewRenderer->setNoRender(true);
    }

    function copyData($param){
        $model = new Erems_Models_Master_Pricelist();
        $data = $model->datapricelistRead($param);
        // data th_pricelist
        foreach ($data['data'][0] as $value) {
            $result1 = $model->pricelistrejectCreate($value);
                $return = $result1['data'];
            // data th_pricelistdetail
            foreach ($data['data'][1] as $value) {
                $result2 = $model->pricelistdetailrejectCreate($value, $result1['data']);
                $jumlah = 0;
                foreach ($data['data'][2] as $value) {
                    $result3 = $model->pricelistdetailkoefisienrejectCreate($value, $result1['data'], $result2['data']);
                }
            }
        }
        return $return;
    }
}
?>
