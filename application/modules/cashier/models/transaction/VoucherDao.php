<?php

//use Aws\ECRPublic\ECRPublicClient;

class Cashier_Models_Transaction_VoucherDao extends Cashier_Box_Models_App_AbDaoCashier implements Cashier_Box_Models_App_BlackHole {

    public function save(Cashier_Models_Master_Kasbank $cs, Cashier_Box_Models_App_HasilRequestRead $req, $detailvoucher, $subdetailvoucher, $detailar, $detailescrow, $detailother,$attachmentdetail,$detailnonlink) {
        $row = 0;
        if (!$cs->getAddBy()) {
            return $row;
        }

        $unsetDetailforXml = array('department_id', 'detailcoa', 'detailar', 'detailotherpayment', 'subdetailcoa', 'id', 'detailescrow', 'deletedsubRows', 'deletedOtherPaymentRows', 'deletedarpayment','attachmentdetail','detailnonlink');
        $cleanAmount = Cashier_Box_Tools::unformatMoney($cs->getAmount());
        $cs->setAmount($cleanAmount);
        if (count($detailar) and ( !empty($subdetailvoucher))) {  //jika ada AR dan detail dan subdetail // bayar angsuran
            $row = $this->dbTable->SPUpdate('sp_voucher_with_ar_sub_create', $cs->getAddBy(), $req->getXmlDataUnset($unsetDetailforXml), $detailvoucher['voucherdetail_id'], $detailvoucher['indexdata'], str_replace("'", "''", $detailvoucher['remarks']), $detailvoucher['cashflow_setupcashflow_id'], $detailvoucher['cashflowtype_cashflowtype_id'], $detailvoucher['amount'], $detailvoucher['coa_coa_id'], $detailvoucher['kelsub_kelsub_id'], $detailvoucher['subgl_subgl_id'], $subdetailvoucher['vouchersubdetail_id'], $subdetailvoucher['indexsubdata'], $subdetailvoucher['remarks'], $subdetailvoucher['amount'], $subdetailvoucher['subgl_subgl_id'], $subdetailvoucher['voucherdetail_voucherdetail_id'], $subdetailvoucher['voucherdetail_indexdata'], $detailar['schedule_id'],
                    // $detailar['scheduletype_id'],
                    // $detailar['purchaseletter_id'],
                    $detailar['description'],
                    //  $detailar['termin'],
                    $detailar['duedate'], $detailar['amount'], $detailar['remaining_pay'], //payment
                    $detailar['final'], //remaining balance
                    $detailar['denda']
                    ,$detailvoucher['exclude_kwitansi']
                    ,$detailvoucher['ppn_tipepajakdetail_id']
                    ,$detailvoucher['ppn_percentage']
                    ,$detailvoucher['pph_tipepajakdetail_id']
                    ,$detailvoucher['pph_percentage']
                    ,$detailvoucher['is_ppn']
                    ,$detailvoucher['is_pph']
                    ,$detailar['is_debitnote']
                    ,$detailar['debitnote']
                    ,count($attachmentdetail)?$attachmentdetail['filename']:'01',
                    count($attachmentdetail)?$attachmentdetail['path']:'',
                    count($attachmentdetail)?$attachmentdetail['description']:'',
                    count($attachmentdetail)?$attachmentdetail['filesize']:''
                    ,$detailvoucher['is_upload']
            );
        } else if (count($detailescrow) and ( !empty($subdetailvoucher))) {  //jika ada escrow dan detail dan subdetail / bayar kpr
           
            
            $row = $this->dbTable->SPUpdate('sp_voucher_with_escrow_sub_create', 
                    $cs->getAddBy(),
                    $req->getXmlDataUnset($unsetDetailforXml),
                    $detailvoucher['voucherdetail_id'],
                    $detailvoucher['indexdata'],
                    str_replace("'", "''", $detailvoucher['remarks']),
                    $detailvoucher['cashflow_setupcashflow_id'],
                    $detailvoucher['cashflowtype_cashflowtype_id'],
                    $detailvoucher['amount'],
                    $detailvoucher['coa_coa_id'],
                    $detailvoucher['kelsub_kelsub_id'],
                    $detailvoucher['subgl_subgl_id'],
                    $subdetailvoucher['vouchersubdetail_id'],
                    $subdetailvoucher['indexsubdata'],
                    $subdetailvoucher['remarks'],
                    $subdetailvoucher['amount'], 
                    $subdetailvoucher['subgl_subgl_id'], 
                    $subdetailvoucher['voucherdetail_voucherdetail_id'], 
                    $subdetailvoucher['voucherdetail_indexdata'],
                    $detailescrow['purchaseletter_pencairankpr_id'],
                    $detailescrow['schedule_schedule_id'], 
                    $detailescrow['scheduletype_id'],
                    $detailescrow['payment_payment_id'],
                    $detailescrow['description'],
                    $detailescrow['termin'],
                    $detailescrow['duedate'], 
                    $detailescrow['amount'], 
                    $detailescrow['remaining_pay'], //payment
                    $detailescrow['final'], //remaining balance
                    $detailescrow['denda'],
                    $detailescrow['plafon_plafon_id'],
                    $detailescrow['pencairan_date'],
                    $detailescrow['pengajuan_berkas_date']
                ,$detailvoucher['exclude_kwitansi']
                    ,$detailvoucher['ppn_tipepajakdetail_id']
                    ,$detailvoucher['ppn_percentage']
                    ,$detailvoucher['pph_tipepajakdetail_id']
                    ,$detailvoucher['pph_percentage']
                    ,$detailvoucher['is_ppn']
                    ,$detailvoucher['is_pph']
                    ,count($attachmentdetail)?$attachmentdetail['filename']:'01',
                    count($attachmentdetail)?$attachmentdetail['path']:'',
                    count($attachmentdetail)?$attachmentdetail['description']:'',
                    count($attachmentdetail)?$attachmentdetail['filesize']:''
                    ,$detailvoucher['is_upload']
//                    $detailescrow['schedule_id'],
//                    $detailescrow['scheduletype_id'],
//                    $detailescrow['purchaseletter_id'],
//                    $detailescrow['description'],
//                    $detailescrow['termin'],
//                    $detailescrow['duedate'],
//                    $detailescrow['amount'],
//                    $detailescrow['remaining_pay'], //payment
//                    $detailescrow['final'], //remaining balance
//                    $detailescrow['denda']
            );
        } else if (count($detailescrow)) { //jika ada ESCROW dan detail
            
          
            $row = $this->dbTable->SPUpdate('sp_voucher_with_escrow_create',
                    $cs->getAddBy(), $req->getXmlDataUnset($unsetDetailforXml),
                    $detailvoucher['voucherdetail_id'],
                    $detailvoucher['indexdata'],
                    str_replace("'", "''", $detailvoucher['remarks']),
                    $detailvoucher['cashflow_setupcashflow_id'],
                    $detailvoucher['cashflowtype_cashflowtype_id'],
                    $detailvoucher['amount'],
                    $detailvoucher['coa_coa_id'],
                    $detailvoucher['kelsub_kelsub_id'],
                    $detailvoucher['subgl_subgl_id'],
                    $detailescrow['purchaseletter_pencairankpr_id'],
                    $detailescrow['schedule_schedule_id'],
                    $detailescrow['scheduletype_id'],
                    $detailescrow['payment_payment_id'],
                    $detailescrow['description'],
                    $detailescrow['termin'],
                    $detailescrow['duedate'],
                    $detailescrow['amount'],
                    $detailescrow['remaining_pay'], //payment
                    $detailescrow['final'], //remaining balance
                    $detailescrow['denda'],
                    $detailescrow['plafon_plafon_id'],
                    $detailescrow['pencairan_date'],
                    $detailescrow['pengajuan_berkas_date']
                ,$detailvoucher['exclude_kwitansi']
                    ,$detailvoucher['ppn_tipepajakdetail_id']
                    ,$detailvoucher['ppn_percentage']
                    ,$detailvoucher['pph_tipepajakdetail_id']
                    ,$detailvoucher['pph_percentage']
                    ,$detailvoucher['is_ppn']
                    ,$detailvoucher['is_pph']
                    ,count($attachmentdetail)?$attachmentdetail['filename']:'01',
                    count($attachmentdetail)?$attachmentdetail['path']:'',
                    count($attachmentdetail)?$attachmentdetail['description']:'',
                    count($attachmentdetail)?$attachmentdetail['filesize']:''
                    ,$detailvoucher['is_upload']
            );
        } else if (count($detailar)) { //jika ada AR dan detail
//            var_dump($req->getXmlDataUnset($unsetDetailforXml));
//            die();
//            echo "a";
//            print_r($detailar);
//            die();
            $row = $this->dbTable->SPUpdate('sp_voucher_with_ar_create', $cs->getAddBy(), $req->getXmlDataUnset($unsetDetailforXml), $detailvoucher['voucherdetail_id'], $detailvoucher['indexdata'], str_replace("'", "''", $detailvoucher['remarks']), $detailvoucher['cashflow_setupcashflow_id'], $detailvoucher['cashflowtype_cashflowtype_id'], $detailvoucher['amount'], $detailvoucher['coa_coa_id'], $detailvoucher['kelsub_kelsub_id'], $detailvoucher['subgl_subgl_id'], $detailar['schedule_id'],
                    // $detailar['scheduletype_id'],
                    //$detailar['purchaseletter_id'],
                    $detailar['description'],
                    //$detailar['termin'],
                    $detailar['duedate'], $detailar['oppaid'], $detailar['remaining_pay'], //payment
                    $detailar['final'], //remaining balance
                    $detailar['denda']
                ,$detailvoucher['exclude_kwitansi']
                    ,$detailvoucher['ppn_tipepajakdetail_id']
                    ,$detailvoucher['ppn_percentage']
                    ,$detailvoucher['pph_tipepajakdetail_id']
                    ,$detailvoucher['pph_percentage']
                    ,$detailvoucher['is_ppn']
                    ,$detailvoucher['is_pph']
                    ,$detailar['is_debitnote']
                    ,$detailar['debitnote']
                    ,count($attachmentdetail)?$attachmentdetail['filename']:'01',
                    count($attachmentdetail)?$attachmentdetail['path']:'',
                    count($attachmentdetail)?$attachmentdetail['description']:'',
                    count($attachmentdetail)?$attachmentdetail['filesize']:''
                    ,$detailvoucher['is_upload']
            );
        } else if (count($detailother)) { //jika Other payment dan detail
            $row = $this->dbTable->SPUpdate('sp_voucher_with_otherpayment_create', $cs->getAddBy(), $req->getXmlDataUnset($unsetDetailforXml), $detailvoucher['voucherdetail_id'], $detailvoucher['indexdata'], str_replace("'", "''", $detailvoucher['remarks']), $detailvoucher['cashflow_setupcashflow_id'], $detailvoucher['cashflowtype_cashflowtype_id'], $detailvoucher['amount'], $detailvoucher['coa_coa_id'], $detailvoucher['kelsub_kelsub_id'], $detailvoucher['subgl_subgl_id'], $detailother['paymenttype_paymenttype_id'], $detailother['description'], $detailother['duedate'], $detailother['amount'], $detailother['remaining_pay'], //payment
                    $detailother['final'], //remaining balance
                    $detailother['denda']
                ,$detailvoucher['exclude_kwitansi']
                    ,$detailvoucher['ppn_tipepajakdetail_id']
                    ,$detailvoucher['ppn_percentage']
                    ,$detailvoucher['pph_tipepajakdetail_id']
                    ,$detailvoucher['pph_percentage']
                    ,$detailvoucher['is_ppn']
                    ,$detailvoucher['is_pph']
                    ,
                    (!isset($subdetailvoucher['vouchersubdetail_id'])?"":$subdetailvoucher['vouchersubdetail_id']),
                    (!isset($subdetailvoucher['indexsubdata'])?"":$subdetailvoucher['indexsubdata']),
                    (!isset($subdetailvoucher['remarks'])?"":$subdetailvoucher['remarks']),
                    (!isset($subdetailvoucher['amount'])?"":$subdetailvoucher['amount']), 
                    (!isset($subdetailvoucher['subgl_subgl_id'])?"":$subdetailvoucher['subgl_subgl_id']), 
                    (!isset($subdetailvoucher['voucherdetail_voucherdetail_id'])?"":$subdetailvoucher['voucherdetail_voucherdetail_id']), 
                    (!isset($subdetailvoucher['voucherdetail_indexdata'])?"":$subdetailvoucher['voucherdetail_indexdata'])
                    
                    ,count($attachmentdetail)?$attachmentdetail['filename']:'01',
                    count($attachmentdetail)?$attachmentdetail['path']:'',
                    count($attachmentdetail)?$attachmentdetail['description']:'',
                    count($attachmentdetail)?$attachmentdetail['filesize']:''
                    ,$detailvoucher['is_upload']
            );
        } else if ((!empty($subdetailvoucher))) { // /jika ada detail dan subdetail saja
            $row = $this->dbTable->SPUpdate('sp_voucher_create', $cs->getAddBy(), $req->getXmlDataUnset($unsetDetailforXml), $detailvoucher['voucherdetail_id'], $detailvoucher['indexdata'], str_replace("'", "''", $detailvoucher['remarks']), $detailvoucher['cashflow_setupcashflow_id'], $detailvoucher['cashflowtype_cashflowtype_id'], $detailvoucher['amount'], $detailvoucher['coa_coa_id'], $detailvoucher['kelsub_kelsub_id'], $detailvoucher['subgl_subgl_id'], $subdetailvoucher['vouchersubdetail_id'], $subdetailvoucher['indexsubdata'], $subdetailvoucher['remarks'], $subdetailvoucher['amount'], $subdetailvoucher['subgl_subgl_id'], $subdetailvoucher['voucherdetail_voucherdetail_id'], $subdetailvoucher['voucherdetail_indexdata'],'','','','','','','' 
                ,$detailvoucher['exclude_kwitansi']
                    ,$detailvoucher['ppn_tipepajakdetail_id']
                    ,$detailvoucher['ppn_percentage']
                    ,$detailvoucher['pph_tipepajakdetail_id']
                    ,$detailvoucher['pph_percentage']
                    ,$detailvoucher['is_ppn']
                    ,$detailvoucher['is_pph']
                    ,count($attachmentdetail)?$attachmentdetail['filename']:'01',
                    count($attachmentdetail)?$attachmentdetail['path']:'',
                    count($attachmentdetail)?$attachmentdetail['description']:'',
                    count($attachmentdetail)?$attachmentdetail['filesize']:''
                    ,count($detailnonlink)?$detailnonlink['paymenttype_id']:'01'
                    ,count($detailnonlink)?$detailnonlink['amount']:''
                    ,count($detailnonlink)?$detailnonlink['description']:'01'
                    ,$detailvoucher['is_upload']
                    ,$detailvoucher['coa_coa_id_cf']

            );
        } else { // jika hanya detail
            $row = $this->dbTable->SPUpdate('sp_voucher_create', $cs->getAddBy(), $req->getXmlDataUnset($unsetDetailforXml), $detailvoucher['voucherdetail_id'], $detailvoucher['indexdata'], str_replace("'", "''", $detailvoucher['remarks']), $detailvoucher['cashflow_setupcashflow_id'], $detailvoucher['cashflowtype_cashflowtype_id'], $detailvoucher['amount'], $detailvoucher['coa_coa_id'], $detailvoucher['kelsub_kelsub_id'], $detailvoucher['subgl_subgl_id'],'','','','','','','','','','','','','','' 
                ,$detailvoucher['exclude_kwitansi']
                    ,$detailvoucher['ppn_tipepajakdetail_id']
                    ,$detailvoucher['ppn_percentage']
                    ,$detailvoucher['pph_tipepajakdetail_id']
                    ,$detailvoucher['pph_percentage']
                    ,$detailvoucher['is_ppn']
                    ,$detailvoucher['is_pph']
                    ,count($attachmentdetail)?$attachmentdetail['filename']:'01',
                    count($attachmentdetail)?$attachmentdetail['path']:'',
                    count($attachmentdetail)?$attachmentdetail['description']:'',
                    count($attachmentdetail)?$attachmentdetail['filesize']:''
                    ,count($detailnonlink)?$detailnonlink['paymenttype_id']:'01'
                    ,count($detailnonlink)?$detailnonlink['amount']:''
                    ,count($detailnonlink)?$detailnonlink['description']:''
                    ,$detailvoucher['is_upload']
                    ,$detailvoucher['coa_coa_id_cf']
            );
        }
        return $row;
    }

    public function update(Cashier_Models_Master_Kasbank $cs, Cashier_Box_Models_App_HasilRequestRead $req, $detailvoucher, $subdetailvoucher, $detailar, $detailescrow, $detailother, $deletedDetail, $deletedSubDetail, $deletedOtherPaymentRows, $deletedarpayment, $deletedarpaymentesc,$attachmentdetail,$deletedattachment,$detailnonlink,$deletednonlink) {
        $row = 0;

        if (!$cs->getId()) {
            return $row;
        }

        //$unsetDetailforXml = array('detailcoa', 'detailar', 'subdetailcoa', 'id','detailescrow','deletedsubRows'); 
        //$unsetDetailforXml = array('detailcoa', 'detailar', 'detailotherpayment', 'subdetailcoa', 'id','detailescrow','deletedsubRows','deletedOtherPaymentRows');
        $unsetDetailforXml = array('department_id', 'detailcoa', 'detailar', 'detailotherpayment', 'subdetailcoa', 'id', 'detailescrow', 'deletedsubRows', 'deletedOtherPaymentRows', 'deletedarpayment', 'deletedarpaymentesc','attachmentdetail','deletedattachment','detailnonlink','deletednonlink');
        $row = $this->dbTable->SPUpdate('sp_voucher_update', $cs->getAddBy(), 
                $req->getXmlDataUnset($unsetDetailforXml), 
                $detailvoucher['voucherdetail_id'], 
                $detailvoucher['indexdata'], 
                str_replace("'", "''", $detailvoucher['remarks']),
                $detailvoucher['cashflow_setupcashflow_id'],
                $detailvoucher['cashflowtype_cashflowtype_id'],
                $detailvoucher['amount'],
                $detailvoucher['coa_coa_id'],
                $detailvoucher['kelsub_kelsub_id'],
                $detailvoucher['subgl_subgl_id'],
                (!empty($subdetailvoucher)) ? $subdetailvoucher['vouchersubdetail_id'] : '01',
                (!empty($subdetailvoucher)) ? $subdetailvoucher['indexsubdata'] : '',
                (!empty($subdetailvoucher)) ? $subdetailvoucher['remarks'] : '',
                (!empty($subdetailvoucher)) ? $subdetailvoucher['amount'] : '',
                (!empty($subdetailvoucher)) ? $subdetailvoucher['subgl_subgl_id'] : '',
                (!empty($subdetailvoucher)) ? $subdetailvoucher['voucherdetail_voucherdetail_id'] : '',
                (!empty($subdetailvoucher)) ? $subdetailvoucher['voucherdetail_indexdata'] : '',
                (!empty($subdetailvoucher)) ? $subdetailvoucher['voucherdetail_voucherdetail_id'] : '',
                (!empty($subdetailvoucher)) ? $subdetailvoucher['kelsub_kelsub_id'] : '',
                $deletedSubDetail, $deletedDetail, $deletedOtherPaymentRows, $deletedarpayment, 
                count($detailother) ? $detailother['paymentdetail_id'] : '01', count($detailother) ? $detailother['paymenttype_paymenttype_id'] : '', count($detailother) ? $detailother['description'] : '', count($detailother) ? $detailother['duedate'] : '', count($detailother) ? $detailother['amount'] : '', count($detailother) ? $detailother['remaining_pay'] : '', //payment
                count($detailother) ? $detailother['final'] : '', //remaining balance
                count($detailother) ? $detailother['denda'] : '', count($detailar) ? $detailar['paymentdetail_id'] : '01', count($detailar) ? $detailar['schedule_id'] : '',
                //count($detailar) ? $detailar['scheduletype_id'] : '',
                // count($detailar) ? $detailar['purchaseletter_id'] : '',
                count($detailar) ? $detailar['description'] : '',
                // count($detailar) ? $detailar['termin'] : '',
                count($detailar) ? $detailar['duedate'] : '', count($detailar) ? $detailar['amount'] : '', count($detailar) ? $detailar['remaining_pay'] : '', //payment
                count($detailar) ? $detailar['final'] : '', //remaining balance
                count($detailar) ? $detailar['denda'] : ''
                //Rizal 12 Agustus 2019
                ,count($detailescrow) ? $detailescrow['paymentdetail_id'] : '01'
                ,count($detailescrow) ? $detailescrow['pencairan_date'] : ''
                ,count($detailescrow) ? $detailescrow['pengajuan_berkas_date'] : ''
                //Rizal 07 Jan 2020
                ,$deletedarpaymentesc
               //
                ,$detailvoucher['exclude_kwitansi']
                    ,$detailvoucher['ppn_tipepajakdetail_id']
                    ,$detailvoucher['ppn_percentage']
                    ,$detailvoucher['pph_tipepajakdetail_id']
                    ,$detailvoucher['pph_percentage']
                    ,$detailvoucher['is_ppn']
                    ,$detailvoucher['is_pph']
                    ,$detailvoucher['kasbondept_id']
                    
                    ,(!isset($detailar['is_debitnote'])?0:$detailar['is_debitnote'])
                    ,(!isset($detailar['debitnote'])?0:$detailar['debitnote'])
                    ,count($attachmentdetail)?$attachmentdetail['attachment_id']:''
                    ,count($attachmentdetail)?$attachmentdetail['filename']:'01',
                    count($attachmentdetail)?$attachmentdetail['path']:'',
                    count($attachmentdetail)?$attachmentdetail['description']:'',
                    count($attachmentdetail)?$attachmentdetail['filesize']:''
                ,$deletedattachment
                    ,count($detailnonlink)?$detailnonlink['payment_id']:''
                    ,count($detailnonlink)?$detailnonlink['paymenttype_id']:'01'
                    ,count($detailnonlink)?$detailnonlink['amount']:''
                    ,count($detailnonlink)?$detailnonlink['description']:''
                ,$deletednonlink
                    ,$detailvoucher['is_upload']
                    ,$detailvoucher['coa_coa_id_cf']
        );
//        var_dump($this->dbTable);
        return $row;
    }

    public function getByProjectPtWithPageSearch(Cashier_Models_Master_Kasbank $ct, Cashier_Box_Models_App_HasilRequestRead $request, Cashier_Box_Kouti_InterSession $session) {
        $hasil = array();
       
        $project = $ct->getProject()->getId();
        $pt = $ct->getPt()->getId();
        if ($project == 0 || $pt == 0) {
            return $hasil;
        }
        $ptId = (empty($request->getOthersValue("pt_id"))) ? $pt : $request->getOthersValue("pt_id");
        $hasil = $this->dbTable->SPExecute('sp_voucher_read', $request->getModeRead(), $request->getModule(), $ct->getProject()->getId(), intval($ptId),
                $request->getPage(), $request->getLimit(), $request->getXmlValue(), 0, $session->getUser()->getId()
                );
       // var_dump($this->dbTable);
        return $hasil;
    }

    public function getReffvcr(Cashier_Models_Master_Kasbank $ct, Cashier_Box_Models_App_HasilRequestRead $request) {
        $hasil = array();
        $project = $ct->getProject()->getId();
        $pt = $ct->getPt()->getId();
        $ptId = (empty($request->getOthersValue("pt_id"))) ? $pt : $request->getOthersValue("pt_id");
        $sp_name = "sp_all_read_".$request->getModule()."_".$request->getModeRead();
        $hasil = $this->dbTable->SPExecute($sp_name, $request->getModeRead(), $request->getModule(), $ct->getProject()->getId(), intval($ptId), $request->getPage(), $request->getLimit(), $request->getXmlValue());
//        var_dump($this->dbTable);
        return $hasil;
    }
    public function getSubDetail(Cashier_Models_Transaction_Vouchersubdetail $ct, Cashier_Box_Models_App_HasilRequestRead $request) {
        $hasil = array();
        $project = $ct->getProject()->getId();
        $pt = $ct->getPt()->getId();
        $ptId = (empty($request->getOthersValue("pt_id"))) ? $pt : $request->getOthersValue("pt_id");
        $sp_name = "sp_all_read_".$request->getModule()."_".$request->getModeRead();
        $hasil = $this->dbTable->SPExecute($sp_name, $request->getModeRead(), $request->getModule(), $ct->getProject()->getId(), intval($ptId), $request->getPage(), $request->getLimit(), $request->getXmlValue());
        return $hasil;
    }

    public function getAr(Cashier_Models_Transaction_Voucherardetail $ct, Cashier_Box_Models_App_HasilRequestRead $request) {
        $hasil = array();
        $project = $ct->getProject()->getId();
        $pt = $ct->getPt()->getId();
        $ptId = (empty($request->getOthersValue("pt_id"))) ? $pt : $request->getOthersValue("pt_id");
        $sp_name = "sp_all_read_".$request->getModule()."_".$request->getModeRead();
        $hasil = $this->dbTable->SPExecute($sp_name, $request->getModeRead(), $request->getModule(), $ct->getProject()->getId(), intval($ptId), $request->getPage(), $request->getLimit(), $request->getXmlValue());
        return $hasil;
    }

    public function getOtherPayment(Cashier_Models_Transaction_Voucherotherpaymentdetail $ct, Cashier_Box_Models_App_HasilRequestRead $request) {
        $hasil = array();
        $project = $ct->getProject()->getId();
        $pt = $ct->getPt()->getId();
        $ptId = (empty($request->getOthersValue("pt_id"))) ? $pt : $request->getOthersValue("pt_id");
        $sp_name = "sp_all_read_".$request->getModule()."_".$request->getModeRead();
        $hasil = $this->dbTable->SPExecute($sp_name, $request->getModeRead(), $request->getModule(), $ct->getProject()->getId(), intval($ptId), $request->getPage(), $request->getLimit(), $request->getXmlValue());
        return $hasil;
    }
    
    public function getCashbonpayment(Cashier_Models_Transaction_Vouchercashbondetail $ct, Cashier_Box_Models_App_HasilRequestRead $request) {
        $hasil = array();
        $project = $ct->getProject()->getId();
        $pt = $ct->getPt()->getId();
        $sp_name = "sp_all_read_".$request->getModule()."_".$request->getModeRead();
        $ptId = (empty($request->getOthersValue("pt_id"))) ? $pt : $request->getOthersValue("pt_id");
        $hasil = $this->dbTable->SPExecute($sp_name, $request->getModeRead(), $request->getModule(), $ct->getProject()->getId(), intval($ptId), $request->getPage(), $request->getLimit(), $request->getXmlValue());
        return $hasil;
    }

    public function getHasilGenerateCoa(Cashier_Models_Master_BudgetCoa $ct, Cashier_Box_Models_App_HasilRequestRead $request) {
        $hasil = array();
        $project = $ct->getProject()->getId();
        $pt = $ct->getPt()->getId();
        if ($project == 0 || $pt == 0) {
            return $hasil;
        }
        $hasil = $this->dbTable->SPExecute('sp_budgetcoagenerate_read', $ct->getProject()->getId(), intval($request->getOthersValue("pt_id"))
        );
        return $hasil;
    }

    public function directDelete(Cashier_Box_Models_App_Decan $decan, Cashier_Box_Kouti_InterSession $session) {
        $row = 0;
        //$row = $this->dbTable->SPUpdate('sp_coa_config_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

    public function deleteData($user, $voucherDeletedId, Cashier_Box_Models_App_HasilRequestRead $req, $paymentid, $reason_delete) {
        $row = array();
        if (!$user) {
            return $row;
        }

        $row = $this->dbTable->SPUpdateArray('sp_voucher_destroy', $req->getModeRead(), $req->getModule(), intval($user), $voucherDeletedId, $paymentid, $reason_delete);

        return $row;
    }

    public function codeExist(Cashier_Models_Master_Kasbank $ft, Cashier_Box_Models_App_HasilRequestRead $request) {
        $hasil = 0;
        
        $requestdecode = json_decode($request->getOthersValue('data'));
        $hasil = $this->dbTable->SPExecute('sp_validator_read', $request->getModeRead(), $request->getModule(), $request->getDataArrayValue('project_project_id'), $request->getDataArrayValue('pt_pt_id'), trim($ft->getPayment()->getReceiptNo()) ? trim($ft->getPayment()->getReceiptNo()) : ' ', $ft->getId(),$requestdecode->purchaseletter_purchaseletter_id,($requestdecode->kasbank_reff_id?$requestdecode->kasbank_reff_id:0)
        );

        return $hasil;
    }

    public function codeExistVendor(Cashier_Models_Master_Vendor $ft, Cashier_Box_Models_App_HasilRequestRead $request) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_validator_read', 'vendorcreate', $request->getModule(), $request->getDataArrayValue('project_id'), $request->getDataArrayValue('pt_id'), $ft->getVendorname(), $ft->getMobilePhone(), $ft->getOfficePhone());

        return $hasil;
    }

    public function getPt(Cashier_Box_Models_App_HasilRequestRead $request, $ses) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_all_read', $request->getModeRead(), $request->getModule(), $ses->getProject()->getId(), $ses->getPt()->getId(), 0, //getpage
                0, //getlimit
                $request->getXmlValue());

        return $hasil;
    }

    public function getAllNonLunas(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Unit_UnitTran $ut, $tipeangsuran="") {
        $hasil = array();
        $project = $r->getOthersValue('project_id');
        $pt = $r->getOthersValue('pt_id') == "999" ? $ut->getPt()->getId() : $r->getOthersValue('pt_id');
        $hasil = $this->dbTable->SPExecute('sp_angsuran_read',
                intval($project),
                intval($pt),
                $r->getPage(),
                $r->getLimit(),
                $ut->getStatus()->getId(),
                $ut->getNumber(),
                $ut->getBlock()->getId(),
                $r->getOthersValue('purchaseletter_no'),
                $r->getOthersValue('customer_name'),
                $r->getOthersValue('schedule_id'),
                $ut->getAddBy(),
                $r->getOthersValue('unit_id'),
                $r->getOthersValue('paymentflag_id'),
                $tipeangsuran
                //Rizal 1 Okt 2019
                ,$r->getOthersValue('cluster_name')
                ,$ut->getVirtualaccount_no()
                //
                );
//                var_dump($this->dbTable);
        return $hasil;
    }

    public function getSchemaEscrow(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Unit_UnitTran $ut) {
        $hasil = array();
        $project = $r->getOthersValue('project_id');
        $pt = $r->getOthersValue('pt_id') == "999" ? $ut->getPt()->getId() : $r->getOthersValue('pt_id');
        $hasil = $this->dbTable->SPExecute('sp_schemaescrow_read', intval($project), intval($pt), $r->getPage(), $r->getLimit(), $ut->getStatus()->getId(), trim($ut->getNumber()), $r->getOthersValue('purchaseletter_no'), $r->getOthersValue('customer_name'), $r->getOthersValue('schedule_id'), $ut->getAddBy(), $r->getOthersValue('unit_id'), $r->getOthersValue('iskprparsial'));
//                var_dump($this->dbTable);
        return $hasil;
    }

    public function getCustomerList(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Master_Customer $ut, $ses) {
        $hasil = array();
        $project = $r->getOthersValue('project_id');
        $pt = $r->getOthersValue('pt_pt_id') == "999" ? $ut->getPt()->getId() : $r->getOthersValue('pt_pt_id');
        $hasil = $this->dbTable->SPExecute('sp_customer_read', intval($project), intval($pt), $r->getPage(), $r->getLimit(), $r->getOthersValue('name'), $r->getOthersValue('mobile_phone'), $ut->getAddBy());
        return $hasil;
    }

    public function getKomisiklaimList(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Master_Komisiklaim $ut, $ses) {
        $hasil = array();
        $project = $r->getOthersValue('project_id');
        $pt = $r->getOthersValue('pt_id');
        $hasil = $this->dbTable->SPExecute('sp_komisiklaim_read', intval($project), intval($pt), $r->getPage(), $r->getLimit(), $r->getOthersValue('unit_number'), $r->getOthersValue('sales_name'), $ut->getAddBy());
        return $hasil;
    }
	
	public function getKasbonklaimList(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Master_Komisiklaim $ut, $ses) {
        $hasil = array();
        $project = $r->getOthersValue('project_id');
        $pt = $r->getOthersValue('pt_id');
        $dept_id = $r->getOthersValue('department_id');
        $hasil = $this->dbTable->SPExecute('sp_kasbonklaim_read', intval($project), intval($pt), $r->getPage(), $r->getLimit(), $r->getOthersValue('cashbon_number'), $r->getOthersValue('description'), $dept_id, $ut->getAddBy());
        return $hasil;
    }


    public function getVendorList(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Master_Vendor $ut, $ses) {
        $hasil = array();
        $project = $r->getOthersValue('project_id');
        $pt = $r->getOthersValue('pt_pt_id');

        $hasil = $this->dbTable->SPExecute('sp_vendor_read', intval($project), intval($pt), $r->getPage(), $r->getLimit(), $r->getOthersValue('name'), $r->getOthersValue('mobile_phone'), $ut->getAddBy(),$r->getOthersValue('type_vendor'));
        return $hasil;
    }

    public function getSubgllist(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Master_SubLedger $ut, $ses) {
        $hasil = array();
        $project = $r->getOthersValue('project_id');
        $pt = $r->getOthersValue('pt_pt_id') == "999" ? $ut->getPt()->getId() : $r->getOthersValue('pt_pt_id');
        $hasil = $this->dbTable->SPExecute('sp_subgltemp_read', intval($project), $r->getOthersValue('pt_id'), 1, 25, $r->getOthersValue('kelsub_id'), $ut->getAddBy());
        return $hasil;
    }

    public function checkIsRealization(Cashier_Models_Master_Kasbank $ft, Cashier_Box_Models_App_HasilRequestRead $request) {
        $hasil = 0;
        // var_dump($ft->getRealization_date());



        $hasil = $this->dbTable->SPExecute('sp_validator_read', $request->getModeRead(), 'voucherRealization', $request->getDataArrayValue('project_id'), $request->getDataArrayValue('pt_id'), $ft->getId(), $ft->getPrefixcode() . $ft->getVoucherint(), $ft->getRealization_date());
        return $hasil;
    }

    public function checkNumVoucher(Cashier_Models_Master_Kasbank $ft, Cashier_Box_Models_App_HasilRequestRead $request) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_validator_read', $request->getModeRead(), 'voucherNum', $request->getDataArrayValue('project_id'), $request->getDataArrayValue('pt_id'), $request->getDataArrayValue('voucherprefix_voucherprefix_id'), $ft->getVoucherint(), $ft->getRealization_date());
        return $hasil;
    }

    public function prosesRealisasi(Cashier_Models_Master_Kasbank $ft, Cashier_Box_Models_App_HasilRequestRead $req) {

        $row = array();
        if (!$ft->getAddBy()) {
            return $row;
        }

        $row = $this->dbTable->SPUpdateArrayforReal('sp_realisasi_create', $ft->getAddBy(), $req->getXmlData()
        );
//        var_dump($this->dbTable);
        return $row;


//        $row = 0;;
//        if (!$ft->getAddBy()) {
//            return $row;
//        } 
//        
//        $row = $this->dbTable->SPUpdate('sp_realisasi_create',
//                $ft->getAddBy(),
//                $req->getXmlData()
//                   
//            );
//        
//         return $row;
    }

    public function prosesPayment(Cashier_Models_Master_Kasbank $ft, Cashier_Box_Models_App_HasilRequestRead $req) {

        $row = 0;
        if (!$ft->getAddBy()) {
            return $row;
        }

        $row = $this->dbTable->SPUpdate('sp_payment_create', $ft->getAddBy(), $req->getXmlData()
        );

        return $row;
    }

    public function prosesPosting($user, $kasbank, $payment) {

        $row = array();
        if (!$user) {
            return $row;
        }

        $row = $this->dbTable->SPUpdateArray('sp_posting_create', intval($user), $kasbank, $payment
        );
        return $row;
    }

    public function prosesUnPosting($user, $kasbank, $payment) {

        $row = array();
        if (!$user) {
            return $row;
        }

        $row = $this->dbTable->SPUpdateArray('sp_unposting_create', intval($user), $kasbank, $payment
        );
        return $row;
    }

    public function getUnitList(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Purchaseletter_PurchaseLetterTransaction $ut, $ses) {
        $hasil = array();
        $project = $r->getOthersValue('project_id');
        $pt = $r->getOthersValue('pt_pt_id');

        $hasil = $this->dbTable->SPExecute('sp_unitsold_read', intval($project), intval($pt), $r->getPage(), $r->getLimit(), $r->getOthersValue('name'), $r->getOthersValue('customer_name'), $r->getOthersValue('customer_phone'), $ut->getAddBy(), $r->getOthersValue('cluster_name'));
        return $hasil;
    }

    public function savevendor(Cashier_Models_Master_Vendor $ft, Cashier_Box_Models_App_HasilRequestRead $req) {

        $row = 0;
        ;
        if (!$ft->getAddBy()) {
            return $row;
        }

        $row = $this->dbTable->SPUpdate('sp_vendor_create', $ft->getAddBy(), $req->getXmlData()
        );

        return $row;
    }

    public function prosesSummary($user, $kasbank, $payment) {

        $row = array();
        if (!$user) {
            return $row;
        }

        $row = $this->dbTable->SPUpdateArrayforReal('sp_postingsummary_create', intval($user), $kasbank, $payment
        );
        return $row;
    }

    public function prosesPettycashloan(Cashier_Models_Master_Kasbank $ft, Cashier_Box_Models_App_HasilRequestRead $req) {
        $row = 0;
        if (!$ft->getAddBy()) {
            return $row;
        }

        $row = $this->dbTable->SPUpdate('sp_pettycashloan_create', $ft->getAddBy(), $req->getXmlData()
        );

        return $row;
    }
    
    public function getVoucherList(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Master_Vendor $ut, $ses) {
        $hasil = array();
        $project = $r->getOthersValue('project_id');
        $pt = $r->getOthersValue('pt_id');
    
        $hasil = $this->dbTable->SPExecute('sp_voucherrealized_read',
                intval($project),
                intval($pt),
                $r->getPage(),
                $r->getLimit(),
                $r->getOthersValue('voucher_no'),
                $r->getOthersValue('description'),
                $r->getOthersValue('from'),
                $r->getOthersValue('to'),
                $ut->getAddBy());
        return $hasil;
    }
    public function getdetailvoucher(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Master_Vendor $ut, $ses) {
        $hasil = array();
        $id = $r->getOthersValue('kasbank_id');
        $hasil = $this->dbTable->SPExecute('sp_detailvoucher_read',
                $id
                );
        return $hasil;
    }
    
     public function getKasbonlist(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Master_Vendor $ut, $ses) {
        $hasil = array();
        $project = $r->getOthersValue('project_id');
        $pt = $r->getOthersValue('pt_id');
    
        $hasil = $this->dbTable->SPExecute('sp_kasbonproject_read',
                intval($project),
                intval($pt),
                $r->getPage(),
                $r->getLimit(),
                $r->getOthersValue('voucher_no'),
                $r->getOthersValue('description'),
                $r->getOthersValue('from'),
                $r->getOthersValue('to'),
                $ut->getAddBy(),
                $r->getOthersValue('pt_id_cashbon')
                );
        return $hasil;
    }
    
     public function getSubgl(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Master_SubLedger $ut, $ses) {
        $hasil = array();
        $project = $r->getOthersValue('project_id');
        $pt = $r->getOthersValue('pt_id');
    
        $hasil = $this->dbTable->SPExecute('sp_subglcode_read',
                intval($project),
                intval($pt),
                $r->getPage(),
                $r->getLimit(),
                $r->getOthersValue('code'),
                $r->getOthersValue('description'),
                $r->getOthersValue('from'),
                $r->getOthersValue('to'),
                $ut->getAddBy(),
                $r->getOthersValue('kelsub_kelsub_id')
                );
        return $hasil;
    }

    public function iscoaexist($params) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_coa_checkexist_read',
                $params['coa'],
                $params['project_id'],
                $params['pt_id']
                );
        return $hasil;
    }
    public function checksubdetail($params) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_isexist_subdetail_voucher',
                $params['kasbank_id']
                );
//        var_dump($hasil);
        return $hasil;
    }
    public function checktemplate3rangkap($params) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_template_kwitansi3rangkap',
                $params['project_id'],
                $params['pt_id'],
                $params['is_preprinted'],
                ( isset($params['with_qr']) ) ? $params['with_qr'] : 0,
                ( isset($params['optionQr']) ) ? $params['optionQr'] : 0 );
        return $hasil;
    }
    public function getallsubdetail($params) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_getallsubdetail_kasbank',
                $params['kasbank_id']
                );
        return $hasil;
    }
    public function checkcoatampungan($params) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_isexist_coatampungan_voucher',
                $params['kasbank_id']
                );
        return $hasil;
    }
    public function checkkasbonrealisasi($params) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_isexist_kasbondeptunreal',
                $params['kasbank_id']
                );
        return $hasil;
    }
    public function getprefixdetail($params) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_get_prefixdetail',
                $params['prefix_id']
                );
        return $hasil;
    }
    public function getdescriptionkwitansi($params) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_get_kwitansiamount',
                $params['kasbank_id'],
                $params['is_voucher_sharing']
                );
        return $hasil;
    }
    public function checkescrowpaymentrealisasi($params) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_check_escrowpaymentrealisasi',
                $params['kasbank_id']
                );
        return $hasil;
    }
    public function updatedeletereason($params,$message,$pilihandelete) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_reasondelete_kasbank',
                $params,$message,$pilihandelete
                );
        return $hasil;
    }
    public function getmandatoryfield($params) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_get_mandatoryfield',
                $params['column'],
                $params['project_id'],
                $params['pt_id']
                );
        return $hasil;
    }
    public function checktemplatevoucher($params) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_template_voucher',
                $params['project_id'],
                $params['pt_id'],
                $params['dataflow'],
                $params['nonpre']
                );
        return $hasil;
    }
    public function getvoucherfdar($params) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_get_voucherfdar',
                $params['kasbank_id']
                );
        return $hasil;
    }
    public function getestimasidenda($params) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_estimasi_denda',
                $params['unit_id'],
                $params['schedule_id'],
                $params['realization_date'],
                $params['amount_payment']
                );
        return $hasil;
    }
    public function checkisexistar($params) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_isexist_ar',
                $params['kasbank_id']
                );
        return $hasil;
    }
    public function createcopyvoucher($params) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_copy_voucher',
                $params['kasbank_id'],
                $params['project_id'],
                $params['pt_id'],
                $params['user_id']
                );
        return $hasil;
    }
    public function createpindahvoucher($params) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_voucher_pindahpt',
                $params['kasbank_id'],
                $params['project_id'],
                $params['pt_id'],
                $params['user_id']
                );
        return $hasil;
    }
    public function writeoffdenda($params) {
        $hasil = array();
        $params['notes'] = str_replace("'", "`", $params['notes']);
        $hasil = $this->dbTable->SPExecute('sp_writeoff_denda',
                $params['schedule_id'],
                $params['purchaseletter_id'],
                $params['notes'],
                $params['user_id'],
                $params['amount']
                );
        return $hasil;
    }
    public function searchcheque($params) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_chequevcr_search',
                $params['project_id'],
                $params['pt_id'],
                $params['value'],
                $params['dataflow']
                );
        return $hasil;
    }
    public function checknullcashflow($params) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_checknullcashflow',
                $params['kasbank_id']
                );
        return $hasil;
    }
    public function maxRowProject(Cashier_Models_Master_Kasbank $ft, Cashier_Box_Models_App_HasilRequestRead $request,$countrow) {
        $hasil = 0;
        
        $requestdecode = json_decode($request->getOthersValue('data'));
        $hasil = $this->dbTable->SPExecute('sp_validator_read', 'all', 'checkmaxrowlimitvcr', $request->getDataArrayValue('project_project_id'), $request->getDataArrayValue('pt_pt_id'),$countrow,0,0
        );

        return $hasil;
    }
    public function updatenokwitansi($params) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_voucher_update_nokwitansi',
                $params['kasbank_id'],
                $params['receipt_no'],
                $params['user_id']
                );
        return $hasil;
    }
    public function validasiUpdateNoKwitansi(Cashier_Models_Master_Kasbank $ft, Cashier_Box_Models_App_HasilRequestRead $request,$countrow) {
        $hasil = 0;
        
        $requestdecode = json_decode($request->getOthersValue('data'));
        
        $hasil = $this->dbTable->SPExecute('sp_validator_read', 'all', 'validasiupdatenokwitansivcr', 0, 0,$requestdecode->kasbank_id,$requestdecode->payment_receipt_no,$requestdecode->dataflow
        );
//        var_dump($this->dbTable);

        return $hasil;
    }
    public function createsubaccount($params) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_subaccount_vcr_create',
                $params['project_id'],
                $params['pt_id'],
                $params['kelsub_id'],
                $params['code'],
                $params['description'],
                $params['user_id']
                );
        return $hasil;
    }
    public function createcetakslip($params) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_slipsetoran',
                $params['slip_id'],
                $params['kasbank_id'],
                $params['norek_customer'],
                $params['nama_customer'],
                $params['alamat_customer'],
                $params['nama_penyetor'],
                $params['norek_penyetor'],
                $params['alamat_penyetor'],
                $params['telp_penyetor'],
                $params['amount'],
                $params['mata_uang'],
                $params['nama_bank'],
                $params['nama_yang_dapat_dihubungi'],
                $params['user_id'],
                $params['delete']
                );
        return $hasil;
    }
    
    public function deletecetakslip($params) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_slipsetoran',
                $params['slip_id'],
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                $params['user_id'],
                $params['delete']
                );
        return $hasil;
    }
    public function uploadattachment($params) {
        $filesPath = $params['filespath']; // Field Name Path
        $module = 'voucher'; // vdrequest, cashbon, voucher, journal;
        $minio = new Cashier_Helpers_Minio();
        $result = $minio->upload($filesPath, $module);
        
        $valid = 1;
        $idheader = 1;
        $counter = 1;
        $message = 'SUCCESS';
        $return = array(
                    "msg" => $message,
                    "success" => $valid,
                    "data" => $result,
                    "total" => $counter,
                    "model" => array()
                );
        return $return;
    }
    public function getVoucherattachment(Cashier_Models_Transaction_Voucherattachment $ct, Cashier_Box_Models_App_HasilRequestRead $request) {
        $hasil = array();
        $project = $ct->getProject()->getId();
        $pt = $ct->getPt()->getId();

        $sp_name = "sp_all_read_".$request->getModule()."_".$request->getModeRead();

        $ptId = (empty($request->getOthersValue("pt_id"))) ? $pt : $request->getOthersValue("pt_id");
        $hasil = $this->dbTable->SPExecute($sp_name, $request->getModeRead(), $request->getModule(), $ct->getProject()->getId(), intval($ptId), $request->getPage(), $request->getLimit(), $request->getXmlValue());
//        var_dump($this->dbTable);
        return $hasil;
    }
    public function validasisubheader($params) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_validator_read', 'all', 'validasisubheader', 0, 0,$params['kasbank_id']
        );
//        var_dump($this->dbTable);

        return $hasil;
    }
    public function converttoangsuran($params) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_voucher_convert_angsuran',
                $params['kasbank_id'],
                $params['unit_id'],
                $params['purchaseletter_id']
                ,$params['paymentflag_id']
                );
        return $hasil;
    }
    public function getdetailupload($params) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_getdetailupload',
                $params['project_id'],
                $params['pt_id'],
                $params['kasbank_id'],
                $params['department_id'],
                $params['coa'],
                $params['sub'],
                $params['amount'],
                $params['cluster'],
                $params['user_id'],
                $params['cashflow']
                );
        return $hasil;
    }
    public function autogenerateschema($params) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_generateschema_auto', $params['purchaseletter_id']
        );
//        var_dump($this->dbTable);

        return $hasil;
    }
    public function checkIsBankApproval($project_id,$pt_id) {
        $hasil = $this->dbTable->SPExecute('sp_validator_read', 'bankapproval', 'bankapproval',$project_id, $pt_id, 0,0,0);
        return $hasil;
    }
    public function savevendorbank($params) {
        $hasil = 0;
        
        $hasil = $this->dbTable->SPExecute('sp_vendorbank_create', $params['vendor_id']
                , $params['bank_id']
                , $params['bank_account_name']
                , $params['bank_account_no']
                , $params['currency']
                , $params['remarks']
                , $params['user_id']
        );
//        var_dump($this->dbTable);

        return $hasil;
    }

    public function checkIsBankApproved($kasbank_id) {
        $hasil = $this->dbTable->SPExecute('sp_validator_read', 'bankapprovalstatus', 'bankapprovalstatus',0, 0, $kasbank_id,0,0);
        return $hasil;
    }

    public function getpersentaseppndtp($params)
    {
        $hasil = $this->dbTable->SPExecute('sp_getpercentage_ppndtp', $params['project_id'], $params['pt_id'], $params['harga_netto'], $params['purchaseletter_id']);
        return $hasil;
    }

    public function resetprint($params)
    {
        $hasil = $this->dbTable->SPExecute('sp_validator_read', $params['mode_read'], 'voucherresetprint',$params['project_id'], $params['pt_id'], $params['kasbank_id'], $params['user_id']);
        return $hasil;
    }

    public function checkvouchernorealisasi(Cashier_Models_Master_Kasbank $ft, Cashier_Box_Models_App_HasilRequestRead $request)
    {
        $hasil = $this->dbTable->SPExecute('sp_validator_read', $request->getModeRead(), 'voucherchecknorealisasi', $request->getDataArrayValue('project_id'), $request->getDataArrayValue('pt_id'), $ft->getPrefixcode(), $ft->getVoucherint());
        return $hasil;
    }

    public function checkLastCounter(Cashier_Models_Master_Kasbank $ft, Cashier_Box_Models_App_HasilRequestRead $request) {

        $hasil = $this->dbTable->SPExecute('sp_validator_read', $request->getModeRead(), 'voucherchecklastcounter', $request->getDataArrayValue('project_id'), $request->getDataArrayValue('pt_id'), $request->getDataArrayValue('voucherprefix_voucherprefix_id'), $ft->getVoucherint(), $ft->getRealization_date());
        // print_r($this->dbTable);die;
        return $hasil;
    }

    public function checkisexistvouhcerno(Cashier_Box_Models_App_HasilRequestRead $request, $kasbank, $payment) {

        $hasil = $this->dbTable->SPExecute('sp_validator_read', $request->getModeRead(), 'checkisexistvouhcerno', 0, 0, $kasbank, $payment);

        return $hasil;
    }

    public function kasbanklog($params) {
        $hasil = $this->dbTable->SPExecute('sp_validator_read', $params['mode_read'], $params['mode_read'], 0, 0, $params['kasbank_id']);
        return $hasil;
    }

    public function getvoucherstatus($params) { // ambil data untuk keperluan api
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_get_voucherstatus_api',
                $params['kasbank_id']
                );
        return $hasil;
    }

    public function checkkasbankreffids($params)
    {
        $hasil = $this->dbTable->SPExecute('sp_validator_read', $params['mode_read'], $params['mode_read'], 0, 0, $params['kasbank_id']);
        // print_r($this->dbTable);die;
        return $hasil;
    }

    public function kasbankmaker($params)
    {
        $hasil = $this->dbTable->SPExecute('sp_validator_read', $params['mode_read'], $params['mode_read'], $params['project_id'], $params['pt_id'], '');
        // print_r($this->dbTable);die;
        return $hasil;
    }

    public function checkblockunit($params)
    {
        $hasil = $this->dbTable->SPExecute('sp_validator_read', $params['mode_read'], $params['mode_read'], 0, 0, $params['unit_id']);
        // print_r($this->dbTable);die;
        return $hasil;
    }

    public function reportKwitansi3Rangkap($params)
    {
        $hasil = $this->dbTable->SPExecute('sp_report_kwitansi_multiprint',
         $params['kasbank_id'],
         $params['multi_kwitansi_date'],
         $params['multi_vendor'],
         $params['multi_description_kwitansi_ar'],
         $params['multi_amount'],
         $params['multi_totalamount'],
         $params['multi_terbilang'],
         $params['multi_format_totalamount'],
         $params['multi_dibayarkan_description'],
         $params['multi_userprint'],
         $params['multi_voucher_date'],
         $params['multi_description'],
         $params['multi_customer_name'],
         $params['multi_kasbank_date']
        );
        // print_r($this->dbTable);die;
        return $hasil;
    }

    public function reportKwitansi3RangkapSaveAttachment($params)
    {
        $hasil = $this->dbTable->SPExecute('sp_voucher_attachment_kwitansi',
            $params['project_id'],
            $params['pt_id'],
            $params['transaction_id'],
            $params['user_id'],
            $params['attachment']['name'],
            $params['path'],
            $params['description'],
            $params['attachment']['size']
        );

        return $hasil;
    }

    public function getDetailVoucherposting($kasbank_id)
    {
        $result = $this->dbTable->SPExecute('sp_api_read_voucherdetailposting',$kasbank_id);

        $return             = FALSE;
        $data               = array();
        $attachment         = array();
        $datasource         = 'OTHER';
        $uploaduniquenumber = 0;
        $project_id         = 0;
        $pt_id              = 0;
        $vid                = null;

        if ($result[0][0]['ROW'] > 0) {
            $datasource         = $result[1][0]['datasource'];
            $data               = $result[2];
            $attachment         = $result[3];
            $return             = TRUE;
            $uploaduniquenumber = $result[1][0]['uploaduniqueid'];
            $project_id         = $result[1][0]['project_id'];
            $pt_id              = $result[1][0]['pt_id'];
            $vid                = $result[1][0]['vid'];
        }

        $response = array(
            'return'             => $return,
            'project_id'         => $project_id,
            'pt_id'              => $pt_id,
            'vid'                => $vid,
            'datasource'         => $datasource,
            'uploaduniquenumber' => $uploaduniquenumber,
            'data'               => $data,
            'attachment'         => $attachment
        );
        
        return $response;
    }


    public function checkIsBankApprovalPaymentType($project_id,$pt_id) {
        $hasil = $this->dbTable->SPExecute('sp_validator_read', 'bankapprovalpaymenttype', 'bankapprovalpaymenttype',$project_id, $pt_id, 0,0,0);
        return $hasil;
    }

    public function sendEmailToFc($kasbank_id){
        $msg = '';
        $kasbank_ids = explode('~', $kasbank_id);

        for ($i=0; $i < sizeof($kasbank_ids); $i++) { 
            $hasil = $this->dbTable->SPExecute('sp_validator_read', 'bankapprovalsendemail', 'bankapprovalsendemail',0, 0, $kasbank_ids[$i],0,0);
            $header = $hasil[0];
            $detail = $hasil[1];
            $attachment = $hasil[2];
            $vendor_bankacc = $hasil[3];
            $vendor_note = $hasil[4];

            $approver_0_email = $header[0]['approver_0_email'];
            $approver_0_name = $header[0]['approver_0_name'];

            $url_a = ( isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ) ? 'https://' : 'http://';
            $url_a .= $_SERVER['SERVER_NAME'] . "/approval_fc/approve_by_email/".$header[0]['bank_approver_id'].'/'.$header[0]['kasbank_id'].'/'.$header[0]['approver_0'];

            $url_r = ( isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ) ? 'https://' : 'http://';
            $url_r .= $_SERVER['SERVER_NAME'] . "/approval_fc/reject_index/".$header[0]['bank_approver_id'].'/'.$header[0]['kasbank_id'].'/'.$header[0]['approver_0'];

            $param = [
                'header' => $header,
                'detail' => $detail,
                'attachment' => $attachment,
                'vendor_bankacc' => $vendor_bankacc,
                'vendor_note' => $vendor_note,
                // 'url_a' => "http://localhost/ces-bankpaymentapproval/approval_fc/approve_by_email/".$header[0]['bank_approver_id'].'/'.$header[0]['kasbank_id'].'/'.$header[0]['approver_0'],
                // 'url_a' => "https://bpa.ciputragroup.com:73/approval_fc/approve_by_email/".$header[0]['bank_approver_id'].'/'.$header[0]['kasbank_id'].'/'.$header[0]['approver_0'],
                'url_a' => $url_a,
                // 'url_r' => "http://localhost/ces-bankpaymentapproval/approval_fc/reject_index/".$header[0]['bank_approver_id'].'/'.$header[0]['kasbank_id'].'/'.$header[0]['approver_0'],
                // 'url_r' => "https://bpa.ciputragroup.com:73/approval_fc/reject_index/".$header[0]['bank_approver_id'].'/'.$header[0]['kasbank_id'].'/'.$header[0]['approver_0'],
                'url_r' => $url_r
            ];
            $templatemsg = new Cashier_Helpers_Templatemail;
            $message = $templatemsg->htmlbpameailfc($param);
            // echo json_encode($message);die;

            $mail =  new Cashier_Box_Library_Emailkasbank();
            $mail->setData()->setFrom('no.reply@ciputra.com', 'CES - Cashier');
            $mail->setData()->setBodyHtml($message);
            $mail->setData()->addTo($approver_0_email, $approver_0_name);
            // $mail->setData()->addCc();
            $mail->setData()->setSubject('Bank Payment Approval - Approval FC');   

            $mail->setData()->send();
        }
        // die;
        return $msg;
    }

    public function generateKwitansiNumber($params){
        $hasil = $this->dbTable->SPExecute('sp_validator_read', 'generatekwitansinumber', 'generatekwitansinumber',$params['project_id'], $params['pt_id'], $params['kasbank_date']);
        return $hasil;
    }

    public function checkPrintQr($params)
    {
        $hasil = $this->dbTable->SPExecute('sp_validator_read', $params['mode_read'], $params['mode_read'], 0, 0, $params['kasbank_id'], '');
        // print_r($this->dbTable);die;
        return $hasil;
    }

    public function checkTemplateInvoice($params){
        $hasil = $this->dbTable->SPExecute('sp_validator_read', $params['mode_read'], $params['mode_read'], $params['project_id'], $params['pt_id'], 'print_invoice');
        // print_r($this->dbTable);die;
        return $hasil;
    }

    public function checkRequestUnrealization($params){
        $hasil = $this->dbTable->SPExecute('sp_validator_read', $params['mode_read'], $params['mode_read'], $params['project_id'], $params['pt_id'], 'request_unrealization');
        // print_r($this->dbTable);die;
        return $hasil;
    }

    public function prosesRequestUnrealization($params){
        $hasil = $this->dbTable->SPExecute('sp_request_unrealisasi', $params['kasbank_id'], $params['user_id'], $params['reasonrequest'], $params['mode_request']);
        // print_r($hasil);die;
        // print_r($this->dbTable);die;
        return $hasil;
    }

    public function getUserDeletedVa($params){
        $hasil = $this->dbTable->SPExecute('sp_validator_read', $params['mode_read'], $params['mode_read'], $params['project_id'], $params['pt_id'], 'USER_DELETED_VA');
        // print_r($this->dbTable);die;
        return $hasil;
    }

    public function getcurrency($params)
    {
        $hasil = $this->dbTable->SPExecute('sp_validator_read', $params['mode_read'], $params['mode_read'], 0, 0, '');
        // print_r($this->dbTable);die;
        return $hasil;
    }

    public function checkPtCr($params){
        $hasil = $this->dbTable->SPExecute('sp_validator_read', $params['mode_read'], $params['mode_read'], $params['project_id'], $params['pt_id'], '');
        // print_r($this->dbTable);die;
        return $hasil;
    }

    public function resetprintkwitansi($params)
    {
        $hasil = $this->dbTable->SPExecute('sp_validator_read', $params['mode_read'], $params['mode_read'], $params['project_id'], $params['pt_id'], $params['kasbank_id'], $params['user_id']);
        return $hasil;
    }

    public function checkPtCGG($params)
    {
        $hasil = $this->dbTable->SPExecute('sp_validator_read', $params['mode_read'], $params['mode_read'], $params['project_id'], $params['pt_id'], '');
        return $hasil;
    }

    public function checklinkvoucher($params)
    {
        $hasil = $this->dbTable->SPExecute('sp_validator_read', $params['mode_read'], $params['mode_read'], $params['project_id'], $params['pt_id'], $params['kasbank_id']);
        return $hasil;
    }

    public function checknokwitansi($params)
    {
        $hasil = $this->dbTable->SPExecute('sp_validator_read', $params['mode_read'], $params['mode_read'], $params['project_id'], $params['pt_id'], $params['kasbank_id'] );
        return $hasil;
    }

    public function getDendaList(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Purchaseletter_PurchaseLetterTransaction $ut, $ses) {
        $hasil = array();
        $project = $r->getOthersValue('project_id');
        $pt = $r->getOthersValue('pt_pt_id');

        $hasil = $this->dbTable->SPExecute('sp_paymentdenda_read', intval($project), intval($pt), $r->getPage(), $r->getLimit(), $r->getOthersValue('name'));
        return $hasil;
    }

    public function prosespemutihan($params)
    {
        $hasil = $this->dbTable->SPExecute('sp_pemutihan_update', $params['payment_id'], $params['kasbank_id'], $params['total_payment'], $params['user_id'] );
        return $hasil;
    }

    public function getartype($params)
    {
        $hasil = $this->dbTable->SPExecute('sp_artype_read', 0, '');
        return $hasil;
    }

    public function checkvalidation($params)
    {
        $hasil = $this->dbTable->SPExecute('sp_voucher_validation_read', $params['kasbank_ids']);
        return $hasil;
    }

    public function usedcoaar($params)
    {
        $hasil = $this->dbTable->SPExecute('sp_validator_read', $params['mode_read'], 'voucher', $params['project_id'], $params['pt_id'], $params['name'] , $params['value'] );
        // print_r($this->dbTable);die;
        return $hasil;
    }

    public function getsubglbyvcrprefix($params)
    {
        $hasil = $this->dbTable->SPExecute('sp_validator_read', $params['mode_read'], 'voucher', 0, 0, $params['voucherprefix_voucherprefix_id']);
        return $hasil;
    }
}

?>
