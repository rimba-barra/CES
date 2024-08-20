<?php

class Cashier_Models_Transaction_JournaleliminasiDao extends Cashier_Box_Models_App_AbDaoCashier implements Cashier_Box_Models_App_BlackHole {

    public function save(Cashier_Models_Master_Journal $cs, Cashier_Box_Models_App_HasilRequestRead $req, $detailjournal, $subdetailjournal, $detailar, $detailescrow) {
        $row = 0;
        if (!$cs->getAddBy()) {
            return $row;
        }

        if(isset($subdetailjournal['remarks'])){
             $subdetailjournal['remarks'] = str_replace("'","''",$subdetailjournal['remarks']); //cleaning
        }

        if(isset($detailjournal['remarks'])){
            $detailjournal['remarks'] = str_replace("'","''",$detailjournal['remarks']); //cleaning
        }

        $unsetDetailforXml = array('detailcoa', 'detailar', 'subdetailcoa', 'id','detailescrow','deletedsubRows');
        $cleanAmount = Cashier_Box_Tools::unformatMoney($cs->getAmount());
        $cs->setAmount($cleanAmount);

        if (count($detailar) and count($subdetailjournal)) {  //jika ada AR dan detail dan subdetail // bayar angsuran
            
            //Validating Amounts

            $amounts = str_replace(",","",$subdetailjournal['amount']);
           // $amounts = rtrim($amounts, '.0000');
           // $amounts = rtrim($amounts, '.00');

            $row = $this->dbTable->SPUpdate('sp_journaleliminasi_with_ar_sub_create',
                    $cs->getAddBy(),
                    $req->getXmlDataUnset($unsetDetailforXml),
                    $detailjournal['journaldetail_id'], 
                    $detailjournal['indexdata'], 
                    $detailjournal['remarks'], 
                    $detailjournal['dataflow'], 
                    $detailjournal['amount'], 
                    $detailjournal['amountc'], 
                    $detailjournal['coa_coa_id'], 
                    $detailjournal['kelsub_kelsub_id'],
                    $subdetailjournal['subgl_subgl_id'],
                    '', //cashflowtypeid
                    $subdetailjournal['journalsubdetail_id'],
                    $subdetailjournal['indexsubdata'], 
                    $subdetailjournal['remarks'], 
                    $amounts,
                    $subdetailjournal['journaldetail_indexdata'],
                    $subdetailjournal['journaldetail_indexdata'],
                    $detailar['schedule_id'],
                    $detailar['scheduletype_id'],
                    $detailar['purchaseletter_id'],
                    $detailar['description'],
                    $detailar['termin'],
                    $detailar['duedate'],
                    $detailar['amount'],
                    $detailar['remaining_pay'], //payment
                    $detailar['final'], //remaining balance
                    $detailar['denda']
            );
        } 
        else if (count($detailescrow) and count($subdetailjournal)) {  //jika ada escrow dan detail dan subdetail / bayar kpr
            $row = $this->dbTable->SPUpdate('sp_journaleliminasi_create',
                    $cs->getAddBy(),
                    $req->getXmlDataUnset($unsetDetailforXml),
                    $detailjournal['journaldetail_id'], 
                    $detailjournal['indexdata'], 
                    $detailjournal['remarks'], 
                    $detailjournal['dataflow'], 
                    $detailjournal['amount'], 
                    $detailjournal['amountc'], 
                    $detailjournal['coa_coa_id'], 
                    $detailjournal['kelsub_kelsub_id'],
                    $subdetailjournal['journalsubdetail_id'],
                    $subdetailjournal['indexsubdata'], 
                    $subdetailjournal['remarks'], 
                    $subdetailjournal['amount'], 
                    $subdetailjournal['subgl_subgl_id'],
                    $subdetailjournal['journaldetail_journaldetail_id'], 
                    $subdetailjournal['journaldetail_indexdata'],
                    $detailar['schedule_id'],
                    $detailar['scheduletype_id'],
                    $detailar['purchaseletter_id'],
                    $detailar['description'],
                    $detailar['termin'],
                    $detailar['duedate'],
                    $detailar['amount'],
                    $detailar['remaining_pay'], //payment
                    $detailar['final'], //remaining balance
                    $detailar['denda']
            );
        } 
        else if (count($detailescrow)) { //jika ada ESCROW dan detail
            $row = $this->dbTable->SPUpdate('sp_journaleliminasi_with_escrow_create',
                    $cs->getAddBy(),
                    $req->getXmlDataUnset($unsetDetailforXml),
                    $detailjournal['journaldetail_id'], 
                    $detailjournal['indexdata'], 
                    $detailjournal['remarks'], 
                    $detailjournal['dataflow'], 
                    $detailjournal['amount'], 
                    $detailjournal['amountc'], 
                    $detailjournal['coa_coa_id'], 
                    $detailjournal['kelsub_kelsub_id'],
                    $detailescrow['purchaseletter_pencairankpr_id'],
                    $detailescrow['schedule_id'],
                    $detailescrow['scheduletype_id'],
                    $detailescrow['purchaseletter_id'],
                    $detailescrow['description'],
                    $detailescrow['termin'],
                    $detailescrow['duedate'],
                    $detailescrow['amount'],
                    $detailescrow['remaining_pay'], //payment
                    $detailescrow['final'], //remaining balance
                    $detailescrow['denda'],
                    $detailescrow['plafon_plafon_id'],
                    $detailescrow['pencairan_date']
                );
        }
        else if (count($detailar)) { //jika ada AR dan detail
            $row = $this->dbTable->SPUpdate('sp_journaleliminasi_with_ar_create',
                    $cs->getAddBy(),
                    $req->getXmlDataUnset($unsetDetailforXml),
                    $detailjournal['journaldetail_id'], 
                    $detailjournal['indexdata'], 
                    $detailjournal['remarks'], 
                    $detailjournal['dataflow'], 
                    $detailjournal['amount'], 
                    $detailjournal['amountc'], 
                    $detailjournal['coa_coa_id'], 
                    $detailjournal['kelsub_kelsub_id'],
                    $detailar['schedule_id'],
                    $detailar['scheduletype_id'],
                    $detailar['purchaseletter_id'],
                    $detailar['description'],
                    $detailar['termin'],
                    $detailar['duedate'],
                    $detailar['amount'],
                    $detailar['remaining_pay'], //payment
                    $detailar['final'], //remaining balance
                    $detailar['denda']
                );
        } else if (count($subdetailjournal)) { // /jika ada detail dan subdetail saja
            
            //Validating Amounts

            $amounts = str_replace(",","",$subdetailjournal['amount']);
           // $amounts = rtrim($amounts, '.0000');
          //  $amounts = rtrim($amounts, '.00');
            
            $row = $this->dbTable->SPUpdate('sp_journaleliminasi_create',
                    $cs->getAddBy(),
                    $req->getXmlDataUnset($unsetDetailforXml),
                    $detailjournal['journaldetail_id'], 
                    $detailjournal['indexdata'], 
                    $detailjournal['remarks'], 
                    $detailjournal['dataflow'], 
                    $detailjournal['amount'], 
                    $detailjournal['amountc'], 
                    $detailjournal['coa_coa_id'], 
                    $detailjournal['kelsub_kelsub_id'],
                    $subdetailjournal['subgl_subgl_id'],
                    '', //cashflowtypeid
                    $subdetailjournal['journalsubdetail_id'],
                    $subdetailjournal['indexsubdata'], 
                    $subdetailjournal['remarks'], 
                    $amounts,
                    $subdetailjournal['journaldetail_indexdata'],
                    $subdetailjournal['journaldetail_indexdata']
                );

        } else { // jika hanya detail

            $row = $this->dbTable->SPUpdate('sp_journaleliminasi_create', $cs->getAddBy(),
                    $req->getXmlDataUnset($unsetDetailforXml), 
                    $detailjournal['journaldetail_id'], 
                    $detailjournal['indexdata'],
                    $detailjournal['remarks'],
                    $detailjournal['dataflow'], 
                    $detailjournal['amount'], 
                    $detailjournal['amountc'], 
                    $detailjournal['coa_coa_id'], 
                    $detailjournal['kelsub_kelsub_id'],
                    $detailjournal['subgl_subgl_id'],
                    $detailjournal['cashflowtype_cashflowtype_id']
            );
        }

        return $row;
    }

    public function update(Cashier_Models_Master_Journal $cs, Cashier_Box_Models_App_HasilRequestRead $req, $detailjournal, $subdetailjournal, $detailar, $deletedDetail, $deletedSubDetail) {
        $row = 0;

        if (!$cs->getId()) {
            return $row;
        }

        if(isset($subdetailjournal['remarks'])){
             $subdetailjournal['remarks'] = str_replace("'","''",$subdetailjournal['remarks']); //cleaning
        }

        if(isset($detailjournal['remarks'])){
            $detailjournal['remarks'] = str_replace("'","''",$detailjournal['remarks']); //cleaning
        }

       $unsetDetailforXml = array('detailcoa', 'detailar', 'subdetailcoa', 'id','detailescrow','deletedsubRows'); 
         
        if (count($detailar)) { 
          $row = $this->dbTable->SPUpdate('sp_journaleliminasi_with_ar_sub_update', $cs->getAddBy(),
                    $req->getXmlDataUnset($unsetDetailforXml), 
                    $detailjournal['journaldetail_id'], 
                    $detailjournal['indexdata'],
                    $detailjournal['remarks'],
                    $detailjournal['dataflow'], 
                    $detailjournal['amount'], 
                    $detailjournal['amountc'], 
                    $detailjournal['coa_coa_id'], 
                    $detailjournal['kelsub_kelsub_id'],
                    $detailjournal['subgl_subgl_id'],
                    $detailjournal['cashflowtype_cashflowtype_id'],
                    $deletedDetail,
                    $deletedSubDetail,
                    (!empty($subdetailjournal)) ? $subdetailjournal['journalsubdetail_id'] : '~',
                    (!empty($subdetailjournal)) ? $subdetailjournal['indexsubdata'] : '',
                    (!empty($subdetailjournal)) ? $subdetailjournal['remarks'] : '',
                    (!empty($subdetailjournal)) ? $subdetailjournal['amount'] : '',
                    (!empty($subdetailjournal)) ? $subdetailjournal['subgl_subgl_id'] : '',
                    (!empty($subdetailjournal)) ? $subdetailjournal['journaldetail_journaldetail_id'] : '',
                    (!empty($subdetailjournal)) ? $subdetailjournal['journaldetail_indexdata'] : '',
                    (!empty($subdetailjournal)) ? $subdetailjournal['journaldetail_journaldetail_id'] : '',
                    (!empty($subdetailjournal)) ? $subdetailjournal['kelsub_kelsub_id'] : '',

                    count($detailar) ? $detailar['paymentdetail_id'] : '01', 
                    count($detailar) ? $detailar['schedule_id'] : '',
                    //count($detailar) ? $detailar['scheduletype_id'] : '',
                    // count($detailar) ? $detailar['purchaseletter_id'] : '',
                    count($detailar) ? $detailar['description'] : '',
                    // count($detailar) ? $detailar['termin'] : '',
                    count($detailar) ? $detailar['duedate'] : '', count($detailar) ? $detailar['amount'] : '', count($detailar) ? $detailar['remaining_pay'] : '', //payment
                    count($detailar) ? $detailar['final'] : '', //remaining balance
                    count($detailar) ? $detailar['denda'] : ''
            );
          }else{
                $row = $this->dbTable->SPUpdate('sp_journaleliminasi_update', $cs->getAddBy(),
                    $req->getXmlDataUnset($unsetDetailforXml), 
                    $detailjournal['journaldetail_id'], 
                    $detailjournal['indexdata'],
                    $detailjournal['remarks'],
                    $detailjournal['dataflow'], 
                    $detailjournal['amount'], 
                    $detailjournal['amountc'], 
                    $detailjournal['coa_coa_id'], 
                    $detailjournal['kelsub_kelsub_id'],
                    $detailjournal['subgl_subgl_id'],
                    $detailjournal['cashflowtype_cashflowtype_id'],
                    $deletedDetail,
                    $deletedSubDetail,
                    (!empty($subdetailjournal)) ? $subdetailjournal['journalsubdetail_id'] : '~',
                    (!empty($subdetailjournal)) ? $subdetailjournal['indexsubdata'] : '',
                    (!empty($subdetailjournal)) ? $subdetailjournal['remarks'] : '',
                    (!empty($subdetailjournal)) ? $subdetailjournal['amount'] : '',
                    (!empty($subdetailjournal)) ? $subdetailjournal['subgl_subgl_id'] : '',
                    (!empty($subdetailjournal)) ? $subdetailjournal['journaldetail_journaldetail_id'] : '',
                    (!empty($subdetailjournal)) ? $subdetailjournal['journaldetail_indexdata'] : '',
                    (!empty($subdetailjournal)) ? $subdetailjournal['journaldetail_journaldetail_id'] : '',
                    (!empty($subdetailjournal)) ? $subdetailjournal['kelsub_kelsub_id'] : ''
            );
          }

        //print_r($this->dbTable); die();

        return $row;
    }

    public function getByProjectPtWithPageSearch(Cashier_Models_Master_Journal $ct, Cashier_Box_Models_App_HasilRequestRead $request) {
        $hasil = array();
        $project = $ct->getProject()->getId();
        $pt = $ct->getPt()->getId();
        if ($project == 0 || $pt == 0) {
            return $hasil;
        }
        $ptId = (empty($request->getOthersValue("pt_id"))) ? $pt : $request->getOthersValue("pt_id");

        $xmlValue = $request->getXmlValue();

        if (strpos($xmlValue, 'pt_id') !== false){
            $xmlValue = $xmlValue; 
        }else{
            $xmlValue = str_replace("</root>","<pt_id>".$ptId."</pt_id></root>",$xmlValue);
        }

        $hasil = $this->dbTable->SPExecute('sp_all_read_v2', $request->getModeRead(), $request->getModule(), $ct->getProject()->getId(), intval($ptId), $request->getPage(), $request->getLimit(), $xmlValue);

        return $hasil;
    }

    public function getSubDetail(Cashier_Models_Transaction_Journalsubdetail $ct, Cashier_Box_Models_App_HasilRequestRead $request) {
        $hasil = array();
        $project = $ct->getProject()->getId();
        $pt = $ct->getPt()->getId();
        $ptId = (empty($request->getOthersValue("pt_id"))) ? $pt : $request->getOthersValue("pt_id");
        $hasil = $this->dbTable->SPExecute('sp_all_read_v2', $request->getModeRead(), $request->getModule(), $ct->getProject()->getId(), intval($ptId), $request->getPage(), $request->getLimit(), $request->getXmlValue());
        return $hasil;
    }

    public function getSubDetailPaging(Cashier_Models_Transaction_Journalsubdetail $ct, Cashier_Box_Models_App_HasilRequestRead $request) {
        $hasil = array();
        $project = $ct->getProject()->getId();
        $pt = $ct->getPt()->getId();
        $ptId = (empty($request->getOthersValue("pt_id"))) ? $pt : $request->getOthersValue("pt_id");
        $hasil = $this->dbTable->SPExecute('sp_all_read_v2', 'subdetailcoapaging', $request->getModule(), $ct->getProject()->getId(), intval($ptId), $request->getPage(), $request->getLimit(), $request->getXmlValue());
        return $hasil;
    }
    
    public function getAr(Cashier_Models_Transaction_Voucherardetail $ct, Cashier_Box_Models_App_HasilRequestRead $request) {
        $hasil = array();
        $project = $ct->getProject()->getId();
        $pt = $ct->getPt()->getId();
        $ptId = (empty($request->getOthersValue("pt_id"))) ? $pt : $request->getOthersValue("pt_id");
        $hasil = $this->dbTable->SPExecute('sp_all_read_v2', $request->getModeRead(), $request->getModule(), $ct->getProject()->getId(), intval($ptId), $request->getPage(), $request->getLimit(), $request->getXmlValue());
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

    public function deleteData($user, $budgetdeletedId, Cashier_Box_Models_App_HasilRequestRead $req) {
        $row = 0;

        if (!$user) {
            return $row;
        }
        $row = $this->dbTable->SPUpdate('sp_all_destroy', $req->getModeRead(), $req->getModule(), intval($user), $budgetdeletedId);

        return $row;
    }
    public function codeExist(Cashier_Models_Master_Journal $ft, Cashier_Box_Models_App_HasilRequestRead $request) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_validator_read', $request->getModeRead(), $request->getModule(), $ft->getProject()->getId(), $ft->getPt()->getId(), trim($ft->getPayment()->getReceiptNo()));

        return $hasil;
    }

    public function getPt(Cashier_Box_Models_App_HasilRequestRead $request, $ses) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_all_read_v2', $request->getModeRead(), $request->getModule(), $ses->getProject()->getId(), $ses->getPt()->getId(), 0, //getpage
                0, //getlimit
                $request->getXmlValue());

        return $hasil;
    }

    public function getAllNonLunas(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Unit_UnitTran $ut) {
        $hasil = array();
        $project = $r->getOthersValue('project_id');
        $pt = $r->getOthersValue('pt_id') == "999" ? $ut->getPt()->getId() : $r->getOthersValue('pt_id');
        $hasil = $this->dbTable->SPExecute('sp_angsuran_read', 
                intval($project),
                intval($pt),
                $r->getPage(),
                $r->getLimit(),
                $ut->getStatus()->getId(),
                $ut->getNumber(), $ut->getBlock()->getId(), $r->getOthersValue('purchaseletter_no'), $r->getOthersValue('customer_name'), 
                $r->getOthersValue('schedule_id'),    
                $ut->getAddBy(),
                $r->getOthersValue('unit_id'));
        return $hasil;
    }

    public function getUnitsub(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Unit_UnitTran $ut) {
        $hasil = array();
        $project = $r->getOthersValue('project_id');
        $pt = $r->getOthersValue('pt_id') == "999" ? $ut->getPt()->getId() : $r->getOthersValue('pt_id');
        $hasil = $this->dbTable->SPExecute('sp_unitsub_read', 
                intval($project),
                intval($pt),
                $r->getPage(),
                $r->getLimit(),
                $r->getOthersValue('coa_coa_id'),
                $r->getOthersValue('code')
            );
        return $hasil;
    }
    
    public function getSchemaEscrow(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Unit_UnitTran $ut) {
        $hasil = array();
        $project = $r->getOthersValue('project_id');
        $pt = $r->getOthersValue('pt_id') == "999" ? $ut->getPt()->getId() : $r->getOthersValue('pt_id');
        $hasil = $this->dbTable->SPExecute('sp_schemaescrow_read', 
                intval($project),
                intval($pt),
                $r->getPage(),
                $r->getLimit(),
                $ut->getStatus()->getId(),
                trim($ut->getNumber()), $r->getOthersValue('purchaseletter_no'), $r->getOthersValue('customer_name'), 
                $r->getOthersValue('schedule_id'),    
                $ut->getAddBy(),
                $r->getOthersValue('unit_id'));
        return $hasil;
    }
    
}

?>
