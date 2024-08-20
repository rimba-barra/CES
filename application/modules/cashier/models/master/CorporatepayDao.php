<?php

/**
 * Description of CoaConfigDao
 *
 * @author MIS
 */

require_once dirname(__DIR__) . '../../library/phpexcel/PHPExcel.php';

class Cashier_Models_Master_CorporatepayDao extends Cashier_Box_Models_App_AbDaoCashier implements Cashier_Box_Models_App_BlackHole {


    public function save(Cashier_Models_Master_Corporatepay $cs, Cashier_Box_Models_App_HasilRequestRead $req, $corporatepaydetail) {

        $row = 0;

        if (!$cs->getAddBy()) {
            return $row;
        }

        $row = $this->dbTable->SPUpdate('sp_corporatepay',
            $cs->getCorporatepay_id(),
            $cs->getDebitsource_id(),
            $cs->getTransferdate(),
            $cs->getAddBy(),
            $corporatepaydetail['corporatepaydetail_id'],
            $corporatepaydetail['kasbank_id'],
            $corporatepaydetail['vid'],
            $corporatepaydetail['voucher_no'],
            $corporatepaydetail['vendor_id'],
            $corporatepaydetail['vendor_name'],
            $corporatepaydetail['vendor_bankacc_id'],
            $corporatepaydetail['vendor_bank_name'],
            $corporatepaydetail['vendor_bank_account_name'],
            $corporatepaydetail['vendor_bank_account_no'],
            $corporatepaydetail['vendor_bank_currency'],
            $corporatepaydetail['description'],
            $corporatepaydetail['amount'],
            $corporatepaydetail['emails'],
            $corporatepaydetail['beneficiary_address'],
            $corporatepaydetail['short_description']
        );
//        var_dump($this->dbTable);
        return $row;
    }
    public function directDelete(Cashier_Box_Models_App_Decan $decan, Cashier_Box_Kouti_InterSession $session) {
        $row = 0;
        //$row = $this->dbTable->SPUpdate('sp_coa_config_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }
    public function getByProjectPtWithPageSearch(Cashier_Models_Master_Corporatepay $ct, Cashier_Box_Models_App_HasilRequestRead $request, $ses) {
        $hasil = array();
        $project = $ct->getProject()->getId();
        $pt = $ct->getPt()->getId();
        if ($project == 0 || $pt == 0) {
            return $hasil;
        }
        $ptId = (empty($request->getOthersValue("pt_id"))) ? $pt : $request->getOthersValue("pt_id");

        $hasil = $this->dbTable->SPExecute('sp_all_read', $request->getModeRead(), $request->getModule(), $request->getOthersValue("project_id"), intval($ptId), $request->getPage(), $request->getLimit(), $request->getXmlValue(), $ses->getProject()->getId(), $ses->getUser()->getId());
//        var_dump($this->dbTable);

        return $hasil;
    }

    public function getByProjectPtWithPageSearchDetail(Cashier_Models_Master_Corporatepaydetail $ct, Cashier_Box_Models_App_HasilRequestRead $request, $ses) {
        $hasil = array();
        $project = $ct->getProject()->getId();
        $pt = $ct->getPt()->getId();
        if ($project == 0 || $pt == 0) {
            return $hasil;
        }
        $ptId = (empty($request->getOthersValue("pt_id"))) ? $pt : $request->getOthersValue("pt_id");

        $hasil = $this->dbTable->SPExecute('sp_all_read', $request->getModeRead(), $request->getModule(), $request->getOthersValue("project_id"), intval($ptId), $request->getPage(), $request->getLimit(), $request->getXmlValue(), $ses->getProject()->getId(), $ses->getUser()->getId());
//        var_dump($this->dbTable);

        return $hasil;
    }

    public function deleteData($user, $deletedId, Cashier_Box_Models_App_HasilRequestRead $req) {
        $row = 0;
        if (!$user) {
            return $row;
        }

        $row = $this->dbTable->SPUpdate('sp_corporatepay_destroy', 
            $deletedId,intval($user)
        );
//        var_dump($this->dbTable);
        return $row;
    }

    // SEFTIAN ALFREDO 03/11/21
    public function exportData($params){
        $csv = new PHPExcel();
        $this->_schema = "cashier.dbo";
        $sheet = 0 ;
        $totalamount = 0;
        $sheetname = "Corporate Payable";
        $finaldata = [];

        $header = $this->dbTable->SPExecute('sp_view_th_corporatepay', $params['corporatepay_id']);
        $detail = $this->dbTable->SPExecute('sp_view_td_corporatepaydetail', $params['corporatepay_id']);
        $corporatepay = [
            'header' => $header[0],
            'detail' => $detail[0]
        ];
        $cFilename = $header[0][0]['filename'];

        $addDownload = $this->dbTable->SPExecute('sp_corporatepay_download', $params['corporatepay_id']);
        if ( $addDownload == '0' ) {
            exit;
        }

        for ( $i = 0; $i < sizeof($detail[0]); $i++) { 
            $totalamount = $totalamount + $detail[0][$i]['amount'];
        }

        // BUAT ISI DATA
        $data_header = [
            'P',
            date('Ymd', strtotime($header[0][0]['filedate'])),
            $header[0][0]['acc_no'],
            sizeof($detail[0]),
            number_format((float)$totalamount, 2, '.', ''),
            /*'',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',*/
        ];
        array_push($finaldata, $data_header);


        for ( $i = 0; $i < sizeof($detail[0]); $i++) { 
            $subData = [];
            
            $method = '';
            $bank_code = '';
            if ( $header[0][0]['bank_id'] == $detail[0][$i]['bank_id'] ) {
                $method = 'IBU';
            }else{
                if ( $detail[0][$i]['amount'] <= 500000000 ) {
                    $method = 'LBU';
                    $bank_code = ($detail[0][$i]['bank_code'] ? $detail[0][$i]['bank_code'] : '');
                }else{
                    $method = 'RBU';
                    $bank_code = ($detail[0][$i]['bank_code'] ? $detail[0][$i]['bank_code'] : '');
                }
            }

            $notification_flag = 'N';
            $beneficiary_emails = '';

            if ( $detail[0][$i]['emails'] != ""  ) {
                $notification_flag = 'Y';
                $beneficiary_emails = $detail[0][$i]['emails'];
            }

            $subData[] = ($detail[0][$i]['vendor_bank_account_no'] ? $detail[0][$i]['vendor_bank_account_no'] : '');
            $subData[] = ($detail[0][$i]['vendor_bank_account_name'] ? $detail[0][$i]['vendor_bank_account_name'] : '');
            $subData[] = ($detail[0][$i]['beneficiary_address'] ? $detail[0][$i]['beneficiary_address'] : '');
            $subData[] = '';
            $subData[] = '';
            $subData[] = ($detail[0][$i]['vendor_bank_currency'] ? $detail[0][$i]['vendor_bank_currency'] : '');
            $subData[] = number_format((float)$detail[0][$i]['amount'], 2, '.', '');
            $subData[] = $this->cleanString($detail[0][$i]['short_description']);
            $subData[] = '';
            $subData[] = $method;
            $subData[] = $bank_code;
            $subData[] = ($detail[0][$i]['bank_name'] ? $detail[0][$i]['bank_name'] : '');
            $subData[] = '';
            $subData[] = '';
            $subData[] = '';
            $subData[] = '';
            $subData[] = $notification_flag; // notification flag (Y/N)
            $subData[] = $beneficiary_emails; // email address (IF Y)
            $subData[] = '';
            $subData[] = '';
            $subData[] = '';
            $subData[] = '';
            $subData[] = '';
            $subData[] = '';
            $subData[] = '';
            $subData[] = '';
            $subData[] = '';
            $subData[] = '';
            $subData[] = '';
            $subData[] = '';
            $subData[] = '';
            $subData[] = '';
            $subData[] = '';
            $subData[] = '';
            $subData[] = '';
            $subData[] = '';
            $subData[] = '';
            $subData[] = 'OUR';
            $subData[] = '';
            $subData[] = $this->cleanString($detail[0][$i]['description']);

            array_push($finaldata, $subData);
        }

        $final = $finaldata;

        if($sheet>0){
            if($csv->getActiveSheetIndex()!==$sheet){
                $csv->createSheet($sheet);
            }
        }


        $csv->setActiveSheetIndex($sheet);
        $csv->getActiveSheet()->fromArray($final);
        $csv->getActiveSheet()->setTitle($sheetname);

        $filename = "Corporate_Payable_{$cFilename}";
        $filename = $this->cleanString($filename).".csv";
        $path = 'app/gl/uploads/'.$filename;
        $newFilePath = APPLICATION_PATH . '/../public/app/gl/uploads/'.$filename;
        $params['url'] = $path;
        $params['corporatepay'] = $corporatepay;

        //READY TO WRITE
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        // header('Content-Type: application/vnd.ms-excel'); 
        header('Content-Disposition: attachment;filename="' . $filename . '"');
        header('Cache-Control: max-age=0'); //no cache

        // $objWriter = PHPExcel_IOFactory::createWriter($csv, 'Excel2007');
        $objWriter = PHPExcel_IOFactory::createWriter($csv, 'CSV');  
        $objWriter->setEnclosure(false);
        $objWriter->save($newFilePath); 


        return $params;
    }

    public function closeData($params, $user) {
        $row = 0;

        if (!$user) {
            return $row;
        }

        $row = $this->dbTable->SPExecute('sp_corporatepay_close', $params['corporatepay_id'], intval($user) );
        return $row;
    }
    
    public function cleanString($string) {
        // Replaces all spaces with hyphens.
        // $string = str_replace(' ', '_', $string); 
        $string = preg_replace('/[,]/', '-', $string); // Removes special chars.

        // Replaces multiple hyphens with single one.
        // return preg_replace('/-+/', '_', $string); 
        return $string;
    }
}

?>
