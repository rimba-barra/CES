<?php

/**
 * Description of CoaConfigDao
 *
 * @author MIS
 */
class Cashier_Models_Master_CoaConfigDao extends Cashier_Box_Models_App_AbDaoCashier implements Cashier_Box_Models_App_BlackHole {

    public $session;
    public $template;
    public $amount;
    public $th_kasbank_id;
    public $unitId;
    public $scheduleId;
    public $purchaselleterKprId;
    public $paymenttype;

    public function save(Cashier_Models_Master_CoaConfig $cs, $dcResult) {

        $row = 0;

        if (!$cs->getAddBy()) {
            return $row;
        }

        if ($dcResult) {

            $row = $this->dbTable->SPUpdate('sp_coaconfig_create', $cs->getAddBy(), $cs->getProject()->getId(), $cs->getPt()->getId(), $cs->getCoaCode(), $cs->getName(), $cs->getDecription(), $dcResult["coa_id"], $dcResult["code"], $dcResult["coa_name"], $dcResult["persen"], $dcResult["description"], $dcResult["type"]);
        } else {
            $row = $this->dbTable->SPUpdate('sp_coaconfig_create', $cs->getAddBy(), $cs->getProject()->getId(), $cs->getPt()->getId(), $cs->getCoaCode(), $cs->getName(), $cs->getDecription());
        }


        return $row;
    }

    public function update(Cashier_Models_Master_CoaConfig $cs, $dcResult, $deletedRows, $data) {
        
      
        $row = 0;

        if (!$cs->getAddBy()) {
            return $row;
        }
        
        
     
        if ($dcResult) {
            $row = $this->dbTable->SPUpdate('sp_coaconfig_update', $cs->getId(), $cs->getAddBy(), 
                   $data["project_project_id"], 
                    $data["pt_pt_id"],
                    $cs->getCoaCode(), $cs->getName(), $cs->getDecription(), 
                    $deletedRows, 
                    $dcResult["coa_config_detail_id"],
                    $dcResult["coa_id"],
                    $dcResult["code"],
                    $dcResult["coa_name"],
                    $dcResult["persen"],
                    $dcResult["description"], 
                    $dcResult["type"],
                    $dcResult["cashflowtype_cashflowtype_id"],
                    $dcResult["kelsub_kelsub_id"],
                    $dcResult["cashflow_setupcashflow_id"],
                    $dcResult["status"]
                    ,$dcResult['cluster_id']
            );
        } else {
            $row = $this->dbTable->SPUpdate('sp_coaconfig_update', $cs->getId(), $cs->getAddBy(), $cs->getProject()->getId(), $cs->getPt()->getId(), $cs->getCoaCode(), $cs->getName(), $cs->getDecription(), $deletedRows);
            //$dcResult["coa_config_detail_id"]);
        }




        // $this->dbTable->printDbError();

        return $row;
    }

    public function getAll() {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_coa_config_read', $this->session->getProject()->getId(), $this->session->getPt()->getId());
        return $hasil;
    }

    public function getAllDetail($coaConfigId) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_coa_config_detail_read', $coaConfigId);

        return $hasil;
    }

    public function getDetailByTemplate(Cashier_Models_Master_CoaConfigDao $template, Cashier_Box_Models_App_HasilRequestRead $request, $paymenttype_id = NULL, $amount = NULL) {
        $hasil = array();
        
        if ($template->template == "1") { //1 untuk installpayment default template, lainnya mutiple template 
            if ($template->th_kasbank_id) {

                $hasil = $this->dbTable->SPExecute('sp_coa_template_read',
                        $template->template, $template->amount,
                        $template->th_kasbank_id,
                        $template->session->getProject()->getId());

//                if ($hasil) {
//                    //echo $hasil[1][0]["kasbankdetail_id"];
//                    for ($i = 0; $i < count($hasil[1]); $i++) {
//                        $hasil[1][$i]["coa_config_detail_id"] = $hasil[1][$i]["kasbankdetail_id"];
//                    }
//                }
            } else {
               
                $hasil = $this->dbTable->SPExecute('sp_coa_config_template_read', 
                        $template->template, 
                        $template->amount, 
                        $request->getOthersValue('pt_id'),
                        $this->unitId, 
                        $this->scheduleId,
                        $request->getOthersValue('paymenttype_id'),
                        $request->getOthersValue('receipt'));


//                if ($hasil) {
//                    //echo $hasil[1][0]["kasbankdetail_id"];
//                    for ($i = 0; $i < count($hasil[1]); $i++) {
//                        $hasil[1][$i]["coa_config_detail_id"] = "";
//                    }
//                }
            }
        } elseif ($template->template == "4") { //for pencairan kpr
            if ($template->th_kasbank_id) {
                $hasil = $this->dbTable->SPExecute('sp_coa_template_read', $template->template, $template->amount, $template->th_kasbank_id, $template->session->getProject()->getId());
            } else {
                $hasil = $this->dbTable->SPExecute('sp_coa_config_template_read', 
                        $template->template,
                        $template->amount,
                         $request->getOthersValue('pt_id'),
                        $this->unitId,
                        $this->purchaselleterKprId);
            }
          } elseif ($template->template == "6") { //for copy voucher
                $hasil = $this->dbTable->SPExecute('sp_coa_templatev2_read', $template->template, $template->amount, $template->th_kasbank_id, $template->session->getProject()->getId());
         
          } elseif ($template->template == "7") { //for kasbon
                $hasil = $this->dbTable->SPExecute('sp_coa_template_kasbon_read', $template->template, $template->amount, $template->th_kasbank_id, $template->session->getProject()->getId());
       
          } else { // others payment, nonlink payment, expense request disini semua, 5 other payment selain denda
            if ($template->th_kasbank_id) {

                $hasil = $this->dbTable->SPExecute('sp_coa_template_read', $template->template, $template->amount, $template->th_kasbank_id, $template->session->getProject()->getId());
//                if ($hasil) {
//                    //echo $hasil[1][0]["kasbankdetail_id"];
//                    for ($i = 0; $i < count($hasil[1]); $i++) {
//                        $hasil[1][$i]["coa_config_detail_id"] = $hasil[1][$i]["kasbankdetail_id"];
//                    }
//                }
            } else {
       
                //$hasil = $this->dbTable->SPExecute('sp_coa_config_multi_template_read', $template->template, $template->amount);
                
//                $hasil = $this->dbTable->SPExecute('sp_coa_config_template_read', 
//                        $template->template,
//                        $template->amount,
//                        $template->session->getProject()->getId(),
//                        $this->unitId,
//                        $this->paymenttype);
                
                $hasil = $this->dbTable->SPExecute('sp_coa_config_template_read', 
                        $template->template, 
                        $template->amount, 
                        $request->getOthersValue('pt_id'),
                        $this->unitId, 
                        $this->scheduleId,
                        $request->getOthersValue('paymenttype_id'),
                        $request->getOthersValue('receipt'));

            }
        }
        return $hasil;
    }

    //Untuk Jurnal Generate
  public function getDetailByJournalTemplateGen(Cashier_Models_Master_CoaConfigDao $template, Cashier_Box_Models_App_HasilRequestRead $request, $paymenttype_id = NULL, $amount = NULL) {
        $hasil = array();
        $merge = array();
        
        if ($template->template == "1") { //1 untuk installpayment default template, lainnya mutiple template 
            if ($template->th_kasbank_id) {

                $hasil = $this->dbTable->SPExecute('sp_coa_template_read',
                        $template->template, $template->amount,
                        $template->th_kasbank_id,
                        $template->session->getProject()->getId());

            } else {
                
                $total_row = 0;
                $details = array();
                $unit_ids = explode("~", $this->unitId);
                $amounts = explode("~", $template->amount);
                $scheduleIds = explode("~", $template->scheduleId);
                $idx=0;
                $idx_detail=1;
                //MULTI UNIT
                //LOOP DENGAN SP YANG SAMA
                foreach ($unit_ids as $unit_id) {
                        $hasil = $this->dbTable->SPExecute('sp_coa_config_template_read', 
                        $template->template, 
                        $amounts[$idx].'~',
                        //$template->amount, 
                        $request->getOthersValue('pt_id'),
                        $unit_id, 
                        $scheduleIds[$idx].'~',
                        //$this->scheduleId,
                        $request->getOthersValue('paymenttype_id'),
                        $request->getOthersValue('receipt'));

                        if($hasil[0][0]['totalRow'] > 0){
                             $total_row = $total_row + $hasil[0][0]['totalRow'];
                             foreach ($hasil[1] as $has) {
                                //ovveride idx
                                $has['coadetailtemp_id'] = $idx_detail;
                                $has['vouchercoadetail_id'] = $idx;
                                $has['indexdata'] = $idx_detail;
                                $has['unit_unit_id'] = $unit_id;
                                $details[] = $has;
                                $idx_detail = $idx_detail+1;
                             }
                        }
                        $idx = $idx+1;
                }

                $merge[0][0]['totalRow'] = $total_row;
                $merge[1] = $details;

                $hasil = $merge;

            }
        } elseif ($template->template == "4") { //for pencairan kpr
            if ($template->th_kasbank_id) {
                $hasil = $this->dbTable->SPExecute('sp_coa_template_read', $template->template, $template->amount, $template->th_kasbank_id, $template->session->getProject()->getId());
            } else {
                $hasil = $this->dbTable->SPExecute('sp_coa_config_template_read', 
                        $template->template,
                        $template->amount,
                         $request->getOthersValue('pt_id'),
                        $this->unitId,
                        $this->purchaselleterKprId);
            }
          } elseif ($template->template == "6") { //for copy voucher
                $hasil = $this->dbTable->SPExecute('sp_coa_templatev2_read', $template->template, $template->amount, $template->th_kasbank_id, $template->session->getProject()->getId());
         
          } elseif ($template->template == "7") { //for kasbon
                $hasil = $this->dbTable->SPExecute('sp_coa_template_kasbon_read', $template->template, $template->amount, $template->th_kasbank_id, $template->session->getProject()->getId());
       
          } else { // others payment, nonlink payment, expense request disini semua, 5 other payment selain denda
            if ($template->th_kasbank_id) {

                $hasil = $this->dbTable->SPExecute('sp_coa_template_read', $template->template, $template->amount, $template->th_kasbank_id, $template->session->getProject()->getId());

            } else {
       
                $hasil = $this->dbTable->SPExecute('sp_coa_config_template_read', 
                        $template->template, 
                        $template->amount, 
                        $request->getOthersValue('pt_id'),
                        $this->unitId, 
                        $this->scheduleId,
                        $request->getOthersValue('paymenttype_id'),
                        $request->getOthersValue('receipt'));

            }
        }
        return $hasil;
    }


    public function getDetailByJournalTemplate(Cashier_Models_Master_CoaConfigDao $template, $paymenttype_id = NULL, $amount = NULL) {
        $hasil = array();
        if ($template->template == "1") { //1 untuk installpayment default template, lainnya mutiple template 
            if ($template->th_kasbank_id) {

                $hasil = $this->dbTable->SPExecute('sp_coa_templatejournal_read', $template->template, $template->amount, $template->th_kasbank_id, $template->session->getProject()->getId());

                if ($hasil) {
                    //echo $hasil[1][0]["kasbankdetail_id"];
                    for ($i = 0; $i < count($hasil[1]); $i++) {
                        $hasil[1][$i]["coa_config_detail_id"] = $hasil[1][$i]["journaldetail_id"];
                    }
                }
            } else {
                $hasil = $this->dbTable->SPExecute('sp_coa_config_template_read', $template->template, $template->amount, $template->session->getProject()->getId(), $this->unitId, $this->scheduleId);


                if ($hasil) {
                    //echo $hasil[1][0]["kasbankdetail_id"];
                    for ($i = 0; $i < count($hasil[1]); $i++) {
                        $hasil[1][$i]["coa_config_detail_id"] = "";
                    }
                }
            }
        } elseif ($template->template == "4") { //for pencairan kpr
            if ($template->th_kasbank_id) {
                $hasil = $this->dbTable->SPExecute('sp_coa_template_read', $template->template, $template->amount, $template->th_kasbank_id, $template->session->getProject()->getId());
            } else {
                $hasil = $this->dbTable->SPExecute('sp_coa_config_template_read', 
                        $template->template,
                        $template->amount,
                        $template->session->getProject()->getId(),
                        $this->unitId,
                        $this->purchaselleterKprId);
            }
        } else { // others payment, nonlink payment, expense request disini semua, kalau pencairan kpr blm tau gan
            if ($template->th_kasbank_id) {

                $hasil = $this->dbTable->SPExecute('sp_coa_template_read', $template->template, $template->amount, $template->th_kasbank_id, $template->session->getProject()->getId());
                if ($hasil) {
                    //echo $hasil[1][0]["kasbankdetail_id"];
                    for ($i = 0; $i < count($hasil[1]); $i++) {
                        $hasil[1][$i]["coa_config_detail_id"] = $hasil[1][$i]["kasbankdetail_id"];
                    }
                }
            } else {
                $hasil = $this->dbTable->SPExecute('sp_coa_config_multi_template_read', $template->template, $template->amount);


                if ($hasil) {
                    for ($i = 0; $i < count($hasil[1]); $i++) {
                        $hasil[1][$i]["coa_config_detail_id"] = "";
                        for ($o = 0; $o < count($paymenttype_id); $o++) {
                            if ($hasil[1][$i]["paymenttype_id"] == $paymenttype_id[$o]) {
                                $hasil[1][$i]["amount"] = $hasil[1][$i]["persen"] * $amount[$o] / 100;
                            }
                        }
                    }
                }
            }
        }
        return $hasil;
    }


    public function getDetailByJournalTemplatePaging(Cashier_Models_Master_CoaConfigDao $template, $start=0, $limit=25, $paymenttype_id = NULL, $amount = NULL) {
        $hasil = array();
        if ($template->template == "1") { //1 untuk installpayment default template, lainnya mutiple template 
            if ($template->th_kasbank_id) {

                $hasil = $this->dbTable->SPExecute('sp_coa_templatejournalpaging_read', $template->template, $template->amount, $template->th_kasbank_id, $template->session->getProject()->getId(),$start,$limit);

                if ($hasil) {
                    //echo $hasil[1][0]["kasbankdetail_id"];
                    for ($i = 0; $i < count($hasil[1]); $i++) {
                        $hasil[1][$i]["coa_config_detail_id"] = $hasil[1][$i]["journaldetail_id"];
                    }
                }
            } else {
                $hasil = $this->dbTable->SPExecute('sp_coa_config_template_read', $template->template, $template->amount, $template->session->getProject()->getId(), $this->unitId, $this->scheduleId);


                if ($hasil) {
                    //echo $hasil[1][0]["kasbankdetail_id"];
                    for ($i = 0; $i < count($hasil[1]); $i++) {
                        $hasil[1][$i]["coa_config_detail_id"] = "";
                    }
                }
            }
        } elseif ($template->template == "4") { //for pencairan kpr
            if ($template->th_kasbank_id) {
                $hasil = $this->dbTable->SPExecute('sp_coa_template_read', $template->template, $template->amount, $template->th_kasbank_id, $template->session->getProject()->getId());
            } else {
                $hasil = $this->dbTable->SPExecute('sp_coa_config_template_read', 
                        $template->template,
                        $template->amount,
                        $template->session->getProject()->getId(),
                        $this->unitId,
                        $this->purchaselleterKprId);
            }
        } else { // others payment, nonlink payment, expense request disini semua, kalau pencairan kpr blm tau gan
            if ($template->th_kasbank_id) {

                $hasil = $this->dbTable->SPExecute('sp_coa_template_read', $template->template, $template->amount, $template->th_kasbank_id, $template->session->getProject()->getId());
                if ($hasil) {
                    //echo $hasil[1][0]["kasbankdetail_id"];
                    for ($i = 0; $i < count($hasil[1]); $i++) {
                        $hasil[1][$i]["coa_config_detail_id"] = $hasil[1][$i]["kasbankdetail_id"];
                    }
                }
            } else {
                $hasil = $this->dbTable->SPExecute('sp_coa_config_multi_template_read', $template->template, $template->amount);


                if ($hasil) {
                    for ($i = 0; $i < count($hasil[1]); $i++) {
                        $hasil[1][$i]["coa_config_detail_id"] = "";
                        for ($o = 0; $o < count($paymenttype_id); $o++) {
                            if ($hasil[1][$i]["paymenttype_id"] == $paymenttype_id[$o]) {
                                $hasil[1][$i]["amount"] = $hasil[1][$i]["persen"] * $amount[$o] / 100;
                            }
                        }
                    }
                }
            }
        }
        //print_r($this->dbTable); die();
        return $hasil;
    }

        public function getByProjectPtWithPageSearch($ct, Cashier_Box_Models_App_HasilRequestRead $request, $ses) {
        $hasil = array();
        $project = $ct->getProject()->getId();
        $pt = $ct->getPt()->getId();
        if ($project == 0 || $pt == 0) {
            return $hasil;
        }
        $ptId = (empty($request->getOthersValue("pt_id"))) ? $pt : $request->getOthersValue("pt_id");
        $hasil = $this->dbTable->SPExecute('sp_all_read', 
                $request->getModeRead(),
                $request->getModule(),
                $ct->getProject()->getId(),
                intval($ptId),
                $request->getPage(),
                $request->getLimit(),
                $request->getXmlValue(),
                $ses->getProject()->getId(),
                $ses->getUser()->getId());

        return $hasil;
    }

    public function directDelete(Cashier_Box_Models_App_Decan $decan, Cashier_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_coa_config_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }

    public function codeExist(Cashier_Models_Master_CoaConfig $ft) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_coanameexist_read', $ft->getName());

        return $hasil;
    }

    //[]
}

?>
