<?php

/**
 * Description of PurchaseLetterDao
 *
 * @author MIS
 */
class Erems_Models_Purchaseletter_PurchaseLetterDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {

    public function getAllKrtPiutangFin(Erems_Box_Models_App_HasilRequestRead $r, Erems_Box_Models_App_Session $ses, Erems_Models_Purchaseletter_PurchaseLetter $pl,$clusterId,$unitId) {
        $hasil = array();

        /*
        $hasil = $this->dbTable->SPExecute('sp_purchaseletterb_read', 
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $r->getPage(),
                $r->getLimit(),
                $pl->getNomor(),
                $pl->getCustomer()->getName(),
                $pl->getUnit()->getNumber(),
                $r->getOthersValue('api_aci'));
        */

        $hasil = $this->dbTable->spToQuery2('sp_purchkrtpiutangfin_read', 
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $r->getPage(),
                $r->getLimit(),
                $pl->getNomor(),
                $pl->getCustomer()->getName(),
                $pl->getUnit()->getNumber(),'',$clusterId,$unitId);
     
        return $hasil;
    }
    
    public function getAll(Erems_Box_Models_App_HasilRequestRead $r, Erems_Box_Models_App_Session $ses, Erems_Models_Purchaseletter_PurchaseLetter $pl) {
        $hasil = array();

        /*
        //original
        $hasil = $this->dbTable->SPExecute('sp_purchaseletterb_read', 
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $r->getPage(),
                $r->getLimit(),
                $pl->getNomor(),
                $pl->getCustomer()->getName(),
                $pl->getUnit()->getNumber(),
                $r->getOthersValue('api_aci'));
        */
       
        if(!$pl->getIsDraft()){
            // $sp_update = 'sp_purchaseletterb_draft_read';
            $sp_update = 'sp_purchaseletterb_read';
        }
        else{
            // $sp_update = 'sp_purchaseletterb_read';
            $sp_update = 'sp_purchaseletterb_draft_read';
        }

        $hasil = $this->dbTable->spToQuery2($sp_update, 
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $r->getPage(),
                $r->getLimit(),
                $pl->getNomor(),
                $pl->getCustomer()->getName(),
                $pl->getUnit()->getNumber(),
                '', // salesman
                '1900-01-01', // range tanggal purchase awal
                '2999-12-31', // range tanggal purchase akhir
                $r->getOthersValue('unit_virtualaccount_bca'),
                $r->getOthersValue('unit_virtualaccount_mandiri'));
        
        // print_r($hasil);exit;
     
        return $hasil;
    }
    
    public function getAllXHariKebelakang(Erems_Box_Models_App_HasilRequestRead $r, Erems_Box_Models_App_Session $ses, Erems_Models_Purchaseletter_PurchaseLetter $pl,$paramsReq) {
        $hasil = array();

  

        $hasil = $this->dbTable->spToQuery2('sp_purchaseletterxharikebelakang_read', 
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $r->getPage(),
                $r->getLimit(),
                $pl->getNomor(),
                $pl->getCustomer()->getName(),
                $pl->getUnit()->getNumber(),
                intval($paramsReq["x_hari"]));
        
  
     
        return $hasil;
    }
    
    public function getAllHPPTanah(Erems_Box_Models_App_HasilRequestRead $r, Erems_Box_Models_App_Session $ses, Erems_Models_Purchaseletter_PurchaseLetter $pl,$paramsReq) {
        $hasil = array();

  

        $hasil = $this->dbTable->spToQuery2('sp_purchaseletterhpptanah_read', 
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $r->getPage(),
                $r->getLimit(),
                $pl->getUnit()->getNumber());
        
  
     
        return $hasil;
    }
    
    public function getAllBacklog(Erems_Box_Models_App_HasilRequestRead $r, Erems_Box_Models_App_Session $ses, Erems_Models_Purchaseletter_PurchaseLetter $pl,$paramsReq) {
        $hasil = array();

  

        $hasil = $this->dbTable->spToQuery2('sp_purchaseletterbacklog_read', 
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $r->getPage(),
                $r->getLimit(),
                $pl->getUnit()->getNumber());
        
  
     
        return $hasil;
    }
    
    public function getPromoSdhByr30Persen(Erems_Box_Models_App_HasilRequestRead $r, Erems_Box_Models_App_Session $ses, Erems_Models_Purchaseletter_PurchaseLetter $pl,$paramsReq) {
        $hasil = array();

  

        $hasil = $this->dbTable->spToQuery2('sp_purchasepromobyr30persen_read', 
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $r->getPage(),
                $r->getLimit(),
                $pl->getNomor(),
                $pl->getCustomer()->getName(),
                $pl->getUnit()->getNumber(),
                intval($paramsReq["persen_bayar"]));
        
  
     
        return $hasil;
    }
    
    public function getAllPersenBayarXHariKebelakang(Erems_Box_Models_App_HasilRequestRead $r, Erems_Box_Models_App_Session $ses, Erems_Models_Purchaseletter_PurchaseLetter $pl,$paramsReq) {
        $hasil = array();

  

        $hasil = $this->dbTable->spToQuery2('sp_purchaseletterpersenbayarxhariblkng_read', 
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $r->getPage(),
                $r->getLimit(),
                $pl->getNomor(),
                $pl->getCustomer()->getName(),
                $pl->getUnit()->getNumber(),
                intval($paramsReq["x_hari"]),
                doubleval($paramsReq["persen_bayar"]));
        
  
        
  
     
        return $hasil;
    }
    
    public function getAllPersenBayarBelumST(Erems_Box_Models_App_HasilRequestRead $r, Erems_Box_Models_App_Session $ses, Erems_Models_Purchaseletter_PurchaseLetter $pl,$paramsReq) {
        $hasil = array();

  

        $hasil = $this->dbTable->spToQuery2('sp_purchaseletterpersenbayarbelumst_read', 
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $r->getPage(),
                $r->getLimit(),
                $pl->getNomor(),
                $pl->getCustomer()->getName(),
                $pl->getUnit()->getNumber(),
                doubleval($paramsReq["persen_bayar"]));
        
  
        
  
     
        return $hasil;
    }

    public function getAllGeneralInformation(Erems_Box_Models_App_HasilRequestRead $r, Erems_Box_Models_App_Session $ses, Erems_Models_Purchaseletter_PurchaseLetter $pl,$salesmanName,$purchaseDateBot,$purchaseDateTop) {
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_purchaseletterb_read', $ses->getProject()->getId(), $ses->getPt()->getId(), $r->getPage(), $r->getLimit(), $pl->getNomor(), $pl->getCustomer()->getName(), $pl->getUnit()->getNumber(),$salesmanName,$purchaseDateBot,$purchaseDateTop);
     
        return $hasil;
    }

    public function getAllGeneralInformationByPage($page,$limit, Erems_Box_Models_App_Session $ses, Erems_Models_Purchaseletter_PurchaseLetter $pl,$salesmanName,$purchaseDateBot,$purchaseDateTop) {
        $hasil = array();
        
        $hasil = $this->dbTable->SPExecute('sp_purchaseletterb_read', $ses->getProject()->getId(), $ses->getPt()->getId(),$page,$limit, $pl->getNomor(), $pl->getCustomer()->getName(), $pl->getUnit()->getNumber(),$salesmanName,$purchaseDateBot,$purchaseDateTop);
     
        return $hasil;
    }

    /* marked 11 oct 2014
      public function getTotalPayment(Erems_Models_Purchaseletter_PurchaseLetter $purchaseLetter){
      $hasil = 0;
      return $hasil;
      }

     */

    public function getListKartuPiutang(Erems_Box_Models_App_HasilRequestRead $requestRead, Erems_Box_Models_App_Session $session = NULL) {
        $hasil = array();
        if ($session) {
            $hasil = $this->dbTable->SPExecute('sp_kartupiutang_read', $requestRead->getPage(),
                    $requestRead->getLimit(),
                    $session->getProject()->getId(),
                    $session->getPt()->getId(),
                    $requestRead->getOthersValue('cluster_id'), 
                    $requestRead->getOthersValue('block_id'), 
                    $requestRead->getOthersValue('position_id'),
                    $requestRead->getOthersValue('productcategory_id'),
                    $requestRead->getOthersValue('type_id'),
                    $requestRead->getOthersValue('purpose_id'), 
                    $requestRead->getOthersValue('side_id'), 
                    $requestRead->getOthersValue('unitstatus_id'),
                    $requestRead->getOthersValue('unit_number'),
                    $requestRead->getOthersValue('is_cancel'),
                    $requestRead->getOthersValue('customer_name')
            );
        } else {
            $hasil = $this->dbTable->SPExecute('sp_kartupiutang_read', $requestRead->getPage(), $requestRead->getLimit(), $requestRead->getOthersValue('cluster_id'), $requestRead->getOthersValue('block_id'), $requestRead->getOthersValue('position_id'), $requestRead->getOthersValue('productcategory_id'), $requestRead->getOthersValue('type_id'), $requestRead->getOthersValue('purpose_id'), $requestRead->getOthersValue('side_id'), $requestRead->getOthersValue('unitstatus_id')
            );
        }



        return $hasil;
    }
    public function getListKartuPiutangCashier(Erems_Box_Models_App_HasilRequestRead $requestRead, Erems_Box_Models_App_Session $session = NULL) {
        $hasil = array();
        if ($session) {
           
            $hasil = $this->dbTable->SPExecute('sp_kartupiutangcashier_read', $requestRead->getPage(),
                    $requestRead->getLimit(),
                    $session->getProject()->getId(),
                    $requestRead->getOthersValue('pt_pt_id'), 
                    $requestRead->getOthersValue('cluster_id'), 
                    $requestRead->getOthersValue('block_id'), 
                    $requestRead->getOthersValue('position_id'),
                    $requestRead->getOthersValue('productcategory_id'),
                    $requestRead->getOthersValue('type_id'),
                    $requestRead->getOthersValue('purpose_id'), 
                    $requestRead->getOthersValue('side_id'), 
                    $requestRead->getOthersValue('unitstatus_id'),
                    $requestRead->getOthersValue('unit_number'),
                    $requestRead->getOthersValue('is_cancel'),
                    $requestRead->getOthersValue('customer_name')
            );
        }



        return $hasil;
    }

    public function getKartuPiutang(Erems_Models_Purchaseletter_PurchaseLetter $purchaseLetter) {
        $hasil = array();
        $id = (int) $purchaseLetter->getId();
        if ($id == 0)
            return $hasil;
        $hasil = $this->dbTable->SPExecute('sp_kartupiutangdetail_read', $purchaseLetter->getId());
        return $hasil;
    }
    
    public function getKartuPiutang2($purchaseletterId) {
        $hasil = array();
    
        $hasil = $this->dbTable->SPExecute('sp_report_kartupiutang_pl',$purchaseletterId);
        return $hasil;
    }

    /*  getPaymentsByPLId
     *  get Payments by purchaseletter id
     *  @params purchaseletter
     */

    public function getPaymentsById(Erems_Models_Purchaseletter_PurchaseLetter $purchaseLetter) {
        $hasil = array();
        $id = (int) $purchaseLetter->getId();
        if ($id == 0)
            return $hasil;
        $hasil = $this->dbTable->SPExecute('sp_kartupiutangpayment_read', $id);

        return $hasil;
    }
    
    public function getScheduleDenda(Erems_Models_Purchaseletter_PurchaseLetter $purchaseLetter) {
        $hasil = array();
        $id = (int) $purchaseLetter->getId();
        if ($id == 0)
            return $hasil;
        $hasil = $this->dbTable->SPExecute('sp_scheduledenda_read', $id);
        return $hasil;
    }

    /*  getScheduleById
     *  get Schedule by purchaseletter id
     *  @params purchaseletter
     */

    public function getScheduleById(Erems_Models_Purchaseletter_PurchaseLetter $purchaseLetter) {
        $hasil = array();
        $id = (int) $purchaseLetter->getId();
        if ($id == 0)
            return $hasil;
        $hasil = $this->dbTable->SPExecute('sp_kartupiutangschedule_read', $id);
        return $hasil;
    }
    
    public function getScheduleNoNKPRById(Erems_Models_Purchaseletter_PurchaseLetter $purchaseLetter) {
        $hasil = array();
        $id = (int) $purchaseLetter->getId();
        if ($id == 0)
            return $hasil;
        $hasil = $this->dbTable->SPExecute('sp_kartupiutangschedulenonkpr_read', $id);
        return $hasil;
    }
    
    public function getScheduleMasihDenda(Erems_Box_Models_App_HasilRequestRead $r,$projectId,$ptId) {
        $hasil = array();
  
        $hasil = $this->dbTable->SPExecute('sp_popupdenda_read',$projectId,$ptId,$r->getPage(),$r->getLimit(),$r->getOthersValue("unit_unit_number"));
        return $hasil;
    }
    
    public function getScheduleByIdtanpaKPR(Erems_Models_Purchaseletter_PurchaseLetter $purchaseLetter) {
        $hasil = array();
        $id = (int) $purchaseLetter->getId();
        if ($id == 0)
            return $hasil;
        $hasil = $this->dbTable->SPExecute('sp_kartupiutangschedule_read', $id);
        if(is_array($hasil)){
           if(key_exists(1, $hasil)){
               if(is_array($hasil[1])){
                   foreach ($hasil[1] as $key => $tagihan){
                      if($tagihan["scheduletype_scheduletype_id"]==Erems_Box_Config::SCHTYPE_KPR){
                          unset($hasil[1][$key]);
                          $hasil[0][0]['totalRow'] = $hasil[0][0]['totalRow']-1;
                      }
                   }
               }
           } 
        }
      
        return $hasil;
    }

    public function getOneByUnit(Erems_Models_Unit_Unit $ut) {
        $hasil = array();
        if ($ut->getId() == 0) {
            return $hasil;
        }
        $hasil = $this->dbTable->SPExecute('sp_purchaseletterdetailbyunit_read', $ut->getId());

        return $hasil;
    }

    public function getOneChangePriceRequested(Erems_Models_Unit_Unit $ut) {
        $hasil = array();
        if ($ut->getId() == 0) {
            return $hasil;
        }
        $hasil = $this->dbTable->SPExecute('sp_purchaseletterbychangeprice_read', $ut->getId());

        return $hasil;
    }

    public function getOne($purchaseLetterId) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_purchaseletterdetail_v3_read', $purchaseLetterId);
        
        
        return $hasil;
    }
    
    public function getOne4Cashier($purchaseLetterId) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_purchaseletterdetail_cashier_read', $purchaseLetterId);
    
        
        return $hasil;
    }
    
    public function getGeneralInformation($purchaseLetterId) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_purchaseletterdetail_v4_read', $purchaseLetterId);
    
        
        return $hasil;
    }
    
    public function getOneForPrintout($purchaseLetterId) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_purchaseletterdetail_printout_read', $purchaseLetterId,
        Erems_Box_Config::SCHTYPE_UANGMUKA,  Erems_Box_Config::SCHTYPE_TANDAJADI);
    
        return $hasil;
    }

    public function save(Erems_Models_Purchaseletter_PurchaseLetterTransaction $pl) {
        $hasil = 0;
        
        

        $hasil = $this->saveintern($pl, $pl->getPrice(), $pl->getPriceAdmin());
        
        return $hasil;
    }

    public function getTotalPayment(Erems_Models_Purchaseletter_PurchaseLetter $purchaseLetter) {
        //
        $hasil = 0;
        if ($purchaseLetter->getId() == 0) {
            return $hasil;
        }
        $hasil = $this->dbTable->SPExecute('sp_purchaselettergetpayment_read', $purchaseLetter->getId());

        $hasil = $hasil[0][0]['total_payment'];

        return $hasil;
    }

    //public function update(Erems_Models_Purchaseletter_PurchaseLetterTransaction $pl,Erems_Box_Models_App_Decan $deletedDecan = NULL,Erems_Models_Master_CustomerProfile $customer) {
    public function update(Erems_Models_Purchaseletter_PurchaseLetterTransaction $pl,Erems_Box_Models_App_Decan $deletedDecan = NULL,Erems_Models_Master_CustomerProfile $customer, Erems_Models_Sales_Price $price, Erems_Models_Sales_PriceAdmin $pa, $hargaTotalJual, $hargaNetto) {
        $hasil = 0;
        
        $dcResult = $pl->getDCResult();
        
        $ds = '';

        if ($deletedDecan) {
            $ds = $deletedDecan->getString();
        }

        // echo 'sp_purchaseletterb_update'.'","'.$pl->getAddBy().'","'.$pl->getId().'","'.$pl->getNomor().'","'.date('Y-m-d', strtotime($pl->getDate())).'","'.$pl->getSalesman()->getId().'","'.$pl->getMemberName().'","'.$pl->getClubCitra()->getId().'","'.$pl->getSalesLocation()->getId().'","'.$pl->getMediaPromotion()->getId().'","'.$pl->getRencanaSerahTerima().'","'.date('Y-m-d', strtotime($pl->getRencanaSerahTerimaDate())).'","'.$pl->getCollector()->getId().'","'.$pl->getNotes().'","'.$pl->getKpp().'","'.$pl->getUpline()->getId().'","'.$pl->getIsUplineReferall().'","'.$pl->getCac()->getId().'","'.$pl->getIsCacReferall().'","'.$dcResult["schedule_id"].'","'.$dcResult["scheduletype_id"].'","'.$dcResult["termin"].'","'.$dcResult["duedate"].'","'.$dcResult["amount"].'","'.$dcResult["sourcemoney_sourcemoney_id"].'","'.$ds.'","'.$customer->getId().'","'.$customer->getAddress().'","'.$pl->getCityCityName().'","'.$customer->getZipCode().'","'.$customer->getHomePhone().'","'.$customer->getMobilePhone().'","'.$customer->getOfficePhone().'","'.$customer->getFax().'","'.$customer->getKtp()->getNomor().'","'.$customer->getNpwpNumber().'","'.$customer->getNpwpAddress().'","'.$customer->getEmail().'","'.$pl->getDownlineId().'","'.$pl->getKeteranganBayar().'","'.$pl->getKeterangan1().'","'.$pl->getKeterangan2().'","'.$pl->getKeterangan3().'","'.$pl->getHouseAdvisor().'","'.$pl->getManager().'","'.$pl->getHsKeuangan().'","'.$pl->getPromo().'","'.$pl->getIsAutoSms().'","'.$pl->getIsNotAllowedSendSP().'","'.$pl->getIsRepeatOrder().'","'.$pl->getUnit()->getStatus()->getId().'","'.$pl->getUnit()->getId().'","'.$pl->getPriceType()->getId().'","'.$pl->getBankKPR()->getId().'","'.$price->getPermeter().'","'.$price->getKelebihan().'","'.$price->getTanah().'","'.$price->getTotalKelebihan().'","'.$price->getBangunan().'","'.$price->getJualDasar().'","'.$price->getDiscountDasar().'","'.$price->getAfterDiscountDasar().'","'.$price->getDiscountTanah().'","'.$price->getAfterDiscountTanah().'","'.$price->getDiscountBangunan().'","'.$price->getAfterDiscountBangunan().'","'.$price->getNetto().'","'.$price->getPpnTanah().'","'.$price->getAfterPpnTanah().'","'.$price->getPpnBangunan().'","'.$price->getAfterPpnBangunan().'","'.$price->getPpnbm().'","'.$price->getAfterPpnbm().'","'.$price->getPph22().'","'.$price->getAfterPph22().'","'.$price->getBbnSertifikat().'","'.$price->getBphtb().'","'.$price->getBajb().'","'.$pa->getPrice().'","'.$pa->getSubsidi().'","'.$pa->getPMutu().'","'.$pa->getPaketTambahan().'","'.$price->getJual().'","'.$pa->getDiskon().'","'.$pa->getPriceDiskon().'","'.$pl->getTotal().'","'.$pl->getBilling()->getId().'","'.$pl->getBilling()->getTandaJadi()->getQuantity().'","'.$pl->getBilling()->getTandaJadi()->getAmount().'","'.$pl->getBilling()->getUangMuka()->getQuantity().'","'.$pl->getBilling()->getUangMuka()->getAmount().'","'.$pl->getBilling()->getAngsuran()->getQuantity().'","'.$pl->getBilling()->getAngsuran()->getAmount().'","'.$pl->getBiayaAsuransi().'","'.$pl->getRewardSales()->getId().'","'.$pl->getRewardCustomer()->getId().'","'.$pl->getRewardTambahan()->getId().'","'.$pl->getPurposeBuy()->getId().'","'.$pl->getHargaPembulatan().'","'.$pl->getIsDraft();
        // exit;

        // generate new purchaseletter number
        $isDraftBefore = $this->checkDraftBefore($pl->getId());
        if($isDraftBefore[0][0]['is_draft'] && !$pl->getIsDraft()){
            $this->generateNomorDokumen($pl);
        }

        $hasil = $this->dbTable->SPUpdate('sp_purchaseletterb_update',
            $pl->getAddBy(),
            $pl->getId(),
            $pl->getNomor(),
            date('Y-m-d', strtotime($pl->getDate())),
            $pl->getSalesman()->getId(),
            $pl->getMemberName(),
            $pl->getClubCitra()->getId(),
            $pl->getSalesLocation()->getId(),
            $pl->getMediaPromotion()->getId(),
            $pl->getRencanaSerahTerima(),
            date('Y-m-d', strtotime($pl->getRencanaSerahTerimaDate())),
            $pl->getCollector()->getId(),
            $pl->getNotes(),
            $pl->getKpp(),
            $pl->getUpline()->getId(),
            $pl->getIsUplineReferall(),
            $pl->getCac()->getId(),
            $pl->getIsCacReferall(),
            $dcResult["schedule_id"],
            $dcResult["scheduletype_id"],
            $dcResult["termin"],
            $dcResult["duedate"],
            $dcResult["amount"],
            $dcResult["sourcemoney_sourcemoney_id"],
            $ds,
            $customer->getId(),
            $customer->getAddress(),
            $pl->getCityCityName(),
            $customer->getZipCode(),
            $customer->getHomePhone(),
            $customer->getMobilePhone(),
            $customer->getOfficePhone(),
            $customer->getFax(),
            $customer->getKtp()->getNomor(),
            $customer->getNpwpNumber(),
            $customer->getNpwpAddress(),
            $customer->getEmail(),
            $pl->getDownlineId(),
            $pl->getKeteranganBayar(),
            $pl->getKeterangan1(),
            $pl->getKeterangan2(),
            $pl->getKeterangan3(),
            $pl->getHouseAdvisor(),
            $pl->getManager(),
            $pl->getHsKeuangan(),
            $pl->getPromo(),
            $pl->getIsAutoSms(),
            $pl->getIsNotAllowedSendSP(),
            $pl->getIsRepeatOrder(),
            $pl->getUnit()->getStatus()->getId(),
            $pl->getUnit()->getId(),
            $pl->getPriceType()->getId(),
            $pl->getBankKPR()->getId(),
            $price->getPermeter(),
            $price->getKelebihan(),
            $price->getTanah(),
            $price->getTotalKelebihan(),
            $price->getBangunan(),
            $price->getJualDasar(),
            $price->getDiscountDasar(),
            $price->getAfterDiscountDasar(),
            $price->getDiscountTanah(),
            $price->getAfterDiscountTanah(),
            $price->getDiscountBangunan(),
            $price->getAfterDiscountBangunan(),
            // $price->getNetto(),
            $hargaNetto,
            $price->getPpnTanah(),
            $price->getAfterPpnTanah(),
            $price->getPpnBangunan(),
            $price->getAfterPpnBangunan(),
            $price->getPpnbm(),
            $price->getAfterPpnbm(),
            $price->getPph22(),
            $price->getAfterPph22(),
            $price->getBbnSertifikat(),
            $price->getBphtb(),
            $price->getBajb(),
            $pa->getPrice(),
            $pa->getSubsidi(),
            $pa->getPMutu(),
            $pa->getPaketTambahan(),
            $price->getJual(),
            $pa->getDiskon(),
            $pa->getPriceDiskon(),
            // $pl->getTotal(),
            $hargaTotalJual,
            $pl->getBilling()->getId(),
            $pl->getBilling()->getTandaJadi()->getQuantity(),
            $pl->getBilling()->getTandaJadi()->getAmount(),
            $pl->getBilling()->getUangMuka()->getQuantity(),
            $pl->getBilling()->getUangMuka()->getAmount(),
            $pl->getBilling()->getAngsuran()->getQuantity(),
            $pl->getBilling()->getAngsuran()->getAmount(),
            $pl->getBiayaAsuransi(),
            $pl->getRewardSales()->getId(),
            $pl->getRewardCustomer()->getId(),
            $pl->getRewardTambahan()->getId(),
            $pl->getPurposeBuy()->getId(),
            $pl->getHargaPembulatan(),
            $pl->getIsDraft()
        );

        /*
        //original
        $hasil = $this->dbTable->SPUpdate('sp_purchaseletterb_update', $pl->getAddBy(), $pl->getId(), $pl->getNomor(), date('Y-m-d', strtotime($pl->getDate())), $pl->getSalesman()->getId(), $pl->getMemberName(), $pl->getClubCitra()->getId(), $pl->getSalesLocation()->getId(), $pl->getMediaPromotion()->getId(), $pl->getRencanaSerahTerima(), date('Y-m-d', strtotime($pl->getRencanaSerahTerimaDate())), $pl->getCollector()->getId(), 
                $pl->getNotes(),$pl->getKpp(),$pl->getUpline()->getId(),$pl->getIsUplineReferall(),
                $pl->getCac()->getId(),$pl->getIsCacReferall(),
                $dcResult["schedule_id"], $dcResult["scheduletype_id"], $dcResult["termin"], $dcResult["duedate"], $dcResult["amount"],$dcResult["sourcemoney_sourcemoney_id"],$ds,
                $customer->getId(),
                $customer->getAddress(),
                //edited by hadi 13/08/2019
                // $customer->getCity()->getId(),
                $pl->getCityCityName(),
                //end
                $customer->getZipCode(),
                $customer->getHomePhone(),
                $customer->getMobilePhone(),
                $customer->getOfficePhone(),
                $customer->getFax(),
                $customer->getKtp()->getNomor(),
                $customer->getNpwpNumber(),
                $customer->getNpwpAddress(),
                $customer->getEmail(),
                $pl->getDownlineId(),
                $pl->getKeteranganBayar(),
                $pl->getKeterangan1(),
                $pl->getKeterangan2(),
                $pl->getKeterangan3(),
                $pl->getHouseAdvisor(),
                $pl->getManager(),
                $pl->getHsKeuangan(),
                $pl->getPromo()
                //edited by Rizal 28 Feb 2019
                ,$pl->getIsAutoSms(),
                $pl->getIsNotAllowedSendSP(),
                //endedited
                 //add by iqbal 03 mei 2019
                $pl->getIsRepeatOrder()
                //end
        );
        */

        return $hasil;
    }
    
    public function getAllReschedule($purchaseLetterId) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_reschedule_read', $purchaseLetterId);
        return $hasil;
    }
    
    
    
    public function getReschScheduleById(Erems_Models_Purchaseletter_Reschedule $r) {
        $hasil = array();
        $id = (int) $r->getId();
        if ($id == 0)
            return $hasil;
        $hasil = $this->dbTable->SPExecute('sp_reschschedule_read', $id);
        return $hasil;
    }
    
    public function saveReschedule(Erems_Models_Purchaseletter_Reschedule $r) {
        $hasil = 0;

        
   
        $dcResult = $r->getDCResult();
          
        $hasil = $this->dbTable->SPUpdate('sp_reschedule_create', $r->getAddBy(),
                $r->getPurchaseletter()->getId(),
                $r->getReason(),
                $r->getIsApprove(),
                $r->getApproveDate(),
                $r->getRencanaSerahTerimaDate(),
                $r->getRencanaSerahTerimaMonth(),
                $dcResult["schedule_id"], $dcResult["scheduletype_id"],
                $dcResult["termin"], $dcResult["duedate"], $dcResult["amount"],
                $dcResult["sourcemoney_sourcemoney_id"],
                $dcResult["remaining_balance"]
        );
        
        

     

        return $hasil;
    }
    
    public function updateReschedule(Erems_Models_Purchaseletter_Reschedule $r,Erems_Box_Models_App_Decan $deletedDecan = NULL) {
        $hasil = 0;

        
   
        $dcResult = $r->getDCResult();
        
        if ($deletedDecan) {
            $ds = $deletedDecan->getString();
        }
        
        
       /* echo "<pre>";
        var_dump($dcResult);
        echo "</pre>";
        die();
       */
        
        $hasil = $this->dbTable->SPUpdate('sp_reschedule_update', $r->getAddBy(),
                $r->getId(),
                $r->getReason(),
                $r->getIsApprove(),
                $r->getApproveDate(),
                $r->getRencanaSerahTerimaDate(),
                $r->getRencanaSerahTerimaMonth(),
                $ds,
                $dcResult["schedule_id"], $dcResult["scheduletype_id"],
                $dcResult["termin"], $dcResult["duedate"], $dcResult["amount"],
                $dcResult["sourcemoney_sourcemoney_id"],
                $dcResult["remaining_balance"]
        );
        
      //  var_dump($this->dbTable);

     

        return $hasil;
    }

    private function saveintern(Erems_Models_Purchaseletter_PurchaseLetterTransaction $pl, Erems_Models_Sales_Price $price, Erems_Models_Sales_PriceAdmin $pa) {
        $hasil = 0;

        $dcResult = $pl->getDCResult();
        
        if($pl->getIsDraft()){
            $sp_update = 'sp_purchaseletterb_create_draft';
            $status_pl = 11;
            $pl_no = null;
        }
        else{
            $sp_update = 'sp_purchaseletterb_create';
            $status_pl = $pl->getUnit()->getStatus()->getId();
            $pl_no = $pl->getNomor();
        }

        // ECHO $sp_update. " '".$pl->getAddBy()."','".$pl->getUnit()->getStatus()->getId()."','".$pl->getNomor()."','".date('Y-m-d', strtotime($pl->getDate()))."','".$pl->getUnit()->getId()."','".$pl->getSalesman()->getId()."','".$pl->getCustomer()->getId()."','".$pl->getPriceType()->getId()."','".$pl->getBankKPR()->getId()."','".$price->getPermeter()."','".$price->getKelebihan()."','".$price->getTanah()."','".$price->getTotalKelebihan()."','".$price->getBangunan()."','".$price->getJualDasar()."','".$price->getDiscountDasar()."','".$price->getAfterDiscountDasar()."','".$price->getDiscountTanah()."','".$price->getAfterDiscountTanah()."','".$price->getDiscountBangunan()."','".$price->getAfterDiscountBangunan()."','".$price->getNetto()."','".$price->getPpnTanah()."','".$price->getAfterPpnTanah()."','".$price->getPpnBangunan()."','".$price->getAfterPpnBangunan()."','".$price->getPpnbm()."','".$price->getAfterPpnbm()."','".$price->getPph22()."','".$price->getAfterPph22()."','".$price->getBbnSertifikat()."','".$price->getBphtb()."','".$price->getBajb()."','".$pa->getPrice()."','".$pa->getSubsidi()."','".$pa->getPMutu()."','".$pa->getPaketTambahan()."','".$price->getJual()."','".$pa->getDiskon()."','".$pa->getPriceDiskon()."','".$pl->getTotal()."','".$dcResult['schedule_id']."','".$dcResult['scheduletype_id']."','".$dcResult['termin']."','".$dcResult['duedate']."','".$dcResult['amount']."','".$dcResult['sourcemoney_sourcemoney_id']."','".$pl->getBilling()->getId()."','".$pl->getBilling()->getTandaJadi()->getQuantity()."','".$pl->getBilling()->getTandaJadi()->getAmount()."','".$pl->getBilling()->getUangMuka()->getQuantity()."','".$pl->getBilling()->getUangMuka()->getAmount()."','".$pl->getBilling()->getAngsuran()->getQuantity()."','".$pl->getBilling()->getAngsuran()->getAmount()."','".$pl->getMemberName()."','".$pl->getClubCitra()->getId()."','".$pl->getSalesLocation()->getId()."','".$pl->getMediaPromotion()->getId()."','".$pl->getRencanaSerahTerima()."','".$pl->getRencanaSerahTerimaDate()."','".$pl->getCollector()->getId()."','".$pl->getNotes()."','".$pl->getKpp()."','".$pl->getUpline()->getId()."','".$pl->getIsUplineReferall()."','".$pl->getCac()->getId()."','".$pl->getIsCacReferall()."','".$pl->getDownlineId()."','".$pl->getKeteranganBayar()."','".$pl->getKeterangan1()."','".$pl->getKeterangan2()."','".$pl->getKeterangan3()."','".$pl->getHouseAdvisor()."','".$pl->getManager()."','".$pl->getHsKeuangan()."','".$pl->getBiayaAsuransi()."','".$pl->getPromo()."','".$pl->getRewardSales()->getId()."','".$pl->getRewardCustomer()->getId()."','".$pl->getRewardTambahan()->getId()."','".$pl->getPurposeBuy()->getId()."','".$pl->getHargaPembulatan()."','".$pl->getIsAutoSms()."','".$pl->getIsNotAllowedSendSP()."','".$pl->getIsRepeatOrder();
        // exit;
        
        $hasil = $this->dbTable->SPUpdate($sp_update, $pl->getAddBy(), $status_pl, $pl_no,date('Y-m-d', strtotime($pl->getDate())), $pl->getUnit()->getId(), $pl->getSalesman()->getId(), $pl->getCustomer()->getId(), $pl->getPriceType()->getId(), $pl->getBankKPR()->getId(), $price->getPermeter(), $price->getKelebihan(), $price->getTanah(), $price->getTotalKelebihan(), $price->getBangunan(), $price->getJualDasar(), $price->getDiscountDasar(), $price->getAfterDiscountDasar(), $price->getDiscountTanah(), $price->getAfterDiscountTanah(), $price->getDiscountBangunan(), $price->getAfterDiscountBangunan(), $price->getNetto(), $price->getPpnTanah(), $price->getAfterPpnTanah(), $price->getPpnBangunan(),
                $price->getAfterPpnBangunan(),$price->getPpnbm(),$price->getAfterPpnbm(),$price->getPph22(),$price->getAfterPph22(),
                $price->getBbnSertifikat(), $price->getBphtb(), $price->getBajb(), $pa->getPrice(), $pa->getSubsidi(), $pa->getPMutu(), $pa->getPaketTambahan(), $price->getJual(), $pa->getDiskon(), $pa->getPriceDiskon(), $pl->getTotal(), $dcResult["schedule_id"], $dcResult["scheduletype_id"], $dcResult["termin"], $dcResult["duedate"], $dcResult["amount"],$dcResult["sourcemoney_sourcemoney_id"], $pl->getBilling()->getId(), $pl->getBilling()->getTandaJadi()->getQuantity(), $pl->getBilling()->getTandaJadi()->getAmount(), $pl->getBilling()->getUangMuka()->getQuantity(), $pl->getBilling()->getUangMuka()->getAmount(), $pl->getBilling()->getAngsuran()->getQuantity(), $pl->getBilling()->getAngsuran()->getAmount(), $pl->getMemberName(), $pl->getClubCitra()->getId(), $pl->getSalesLocation()->getId(), $pl->getMediaPromotion()->getId(), $pl->getRencanaSerahTerima(), $pl->getRencanaSerahTerimaDate(),
                $pl->getCollector()->getId(), $pl->getNotes(),$pl->getKpp(),
                $pl->getUpline()->getId(),$pl->getIsUplineReferall(),$pl->getCac()->getId(),$pl->getIsCacReferall(),
                $pl->getDownlineId(),
                $pl->getKeteranganBayar(),
                $pl->getKeterangan1(),
                $pl->getKeterangan2(),
                $pl->getKeterangan3(),
                $pl->getHouseAdvisor(),
                $pl->getManager(),
                $pl->getHsKeuangan(),
                $pl->getBiayaAsuransi(),
                $pl->getPromo(),$pl->getRewardSales()->getId(),
                $pl->getRewardCustomer()->getId(),
                $pl->getRewardTambahan()->getId(),
                $pl->getPurposeBuy()->getId(),
                $pl->getHargaPembulatan()
                //edited by Rizal 28 Feb 2019
                ,$pl->getIsAutoSms(),
                $pl->getIsNotAllowedSendSP(),
                //endedited
                //add by iqbal 03 mei 2019
                $pl->getIsRepeatOrder()
                //end
                
        );
        

 
        

        return $hasil;
    }

    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;


        $ds = $decan->getString();
        $ids = explode("~", $ds);

        foreach ($ids as $id) {
            $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
            $pl->setId($id);
            $payment = doubleval($this->getTotalPayment($pl));
			
			
			
            if ($payment > 0) {
                $ds = str_replace($id, "", $ds);
            }
			
		
        }
		
		

        $row = $this->dbTable->SPUpdate('sp_purchaseletter_destroy', $ds, $session->getUserId(), Erems_Box_Config::UNITSTATUS_STOCK);
		
		
        return $row;
    }
    
    public function deletedReschedule($data, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_reschedule_destroy', $data, $session->getUserId());
        
        return $row;
    }
    
    
    public function approveReschedule(Erems_Models_Purchaseletter_Reschedule $r) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_reschedule_approve',$r->getModiBy(),$r->getId());
        
        return $row;
    }
    
    public function getEmailReschedule($rescheduleId,$approveUserId){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_rescheduleemail_read',$rescheduleId,$approveUserId);
       
        return $hasil;
    }
    
    public function setForApiAci($id,$session){
        $hasil = array();
      
        $hasil = $this->dbTable->SPExecute('sp_purchaseletter_setapiaci_update',$id,$session->getUserId());
        return $hasil;
    }
    
    public function setForApiAcis($id,$session){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_purchaseletterb_setapiaci_update',$id,$session->getUserId());
        return $hasil;
    }
    
    public function updateHppTanah(Erems_Models_Purchaseletter_PurchaseLetterTransaction $pl){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_hpptanah_update',$pl->getModiBy(),$pl->getId(),$pl->getHppTanahTanahMentah(),$pl->getHppTanahDevCost(),
                $pl->getHppTanahSkalaKota(),$pl->getHppTanahBunga(),$pl->getHppTanahBangunanaPermeter(),$pl->getHppTanahSkalaEco());
        return $hasil;
    }
    
    public function getAllPemutihan(Erems_Box_Models_App_HasilRequestRead $r,$projectId,$ptId,Erems_Models_Purchaseletter_PurchaseLetterTransaction $pl){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_pemutihan_read',$projectId,$ptId,$r->getPage(),$r->getLimit(),$pl->getNomor(),$pl->getCustomer()->getName(),$pl->getUnit()->getNumber());
        return $hasil;
    }
    
    public function getAllPemutihanSchedule($scheduleIds){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_pemutihanbysch_read',$scheduleIds);
        return $hasil;
    }
    
    
    public function getPemutihanLastNumber($projectId,$ptId,$tahun,$prefix){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_pemutihanlastnumber_read',$projectId,$ptId,$tahun,$prefix);
        return $hasil;
    }
    
    public function getSiapKomisi($projectId,$ptId,Erems_Box_Models_App_HasilRequestRead $r,Erems_Models_Purchaseletter_PurchaseLetter $pl){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_popupsiapkomisi_read',$projectId,$ptId,$r->getPage(),$r->getLimit(),$pl->getNomor(),$pl->getUnit()->getNumber(),$pl->getCustomer()->getName());
   
        return $hasil;
    }

    public function getCounterKurangBayar($projectId,$ptId){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_counterkurangbayar_read',$projectId,$ptId);
   
        return $hasil;
    }
    
    //edited by Rizal 18022019
    public function checkRealisasiPaymentCashier($pl) {
        $hasil = $this->dbTable->SPExecute('sp_purchaseletter_validaterealizpay_cashier',$pl);
        //var_dump($pl);
        $result = ($hasil[0][0]['RECORD_TOTAL']>0?FALSE:TRUE);
        return $result;
    }
    //endedited
    
    //edited by Rizal 1 Maret 2019
    public function InlineUpdate($param = array(),$userID) {
        $return['success'] = false;
        $table = 'th_purchaseletter';
        $id = 'purchaseletter_id';
        $id_value = $param['id'];
        $collumn = $param['collumn'];
        $collumn_value = $param['value'];

        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->dbTable->SPExecute('sp_inline_update', $table, $id, $id_value, $collumn, $collumn_value , $userID);
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                 var_dump($e->getMessage());
                var_dump($e); 
            }
        
          
        }
        return $return;
    }
    public function countNeedProcessCKCount($purchaseletter_id){
        $hasil = $this->dbTable->SPExecute('sp_changekavling_needprocess_count',$purchaseletter_id);
        //var_dump($pl);
        $result = ($hasil[0][0]['totalRow']>0?TRUE:FALSE);
        return $result;
    }
    //endedited
    
    
    //edited by Rizal 2 April 2019
    public function validationPaymentChangename($pl,$payment_type) {
        $hasil = $this->dbTable->SPExecute('sp_validation_payment_changename_read',$pl,$payment_type);
        //var_dump($pl);
        $result = $hasil[0][0]['status'];
        return $result;
    }
    public function validationPaymentChangenameSSP($pl,$payment_type) {
        // print_r($pl);exit;
        $hasil = $this->dbTable->SPExecute('sp_validation_payment_changenamessp_read',$pl,$payment_type);
        //var_dump($pl);
        $result = $hasil[0][0]['status'];
        return $result;
    }
    //endedited

    public function getOneDraft($purchaseLetterId) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_purchaseletterdetail_v3_draft_read', $purchaseLetterId);
        
        return $hasil;
    }

    public function checkDraftBefore($purchaseLetterId) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_purchaseletter_check_draft_before', $purchaseLetterId);
        
        return $hasil;
    }

    private function getNewNomor($paramsNomor) {
        $subj = new Erems_Models_Purchaseletter_NomorSubject();
        $subj->attach(new Erems_Models_Purchaseletternomor_Biasa());
        $subj->attach(new Erems_Models_Purchaseletternomor_Local());
        $subj->attach(new Erems_Models_Purchaseletternomor_CedarOff);
        $subj->attach(new Erems_Models_Purchaseletternomor_CedarOrc());
        $subj->attach(new Erems_Models_Purchaseletternomor_CedarRes());
        $subj->attach(new Erems_Models_Purchaseletternomor_BmwCilegon());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitraIndah());
        $subj->attach(new Erems_Models_Purchaseletternomor_Bizpark3Bekasi());
        $subj->attach(new Erems_Models_Purchaseletternomor_Palu());
        $subj->attach(new Erems_Models_Purchaseletternomor_WinangunManado());
        $subj->attach(new Erems_Models_Purchaseletternomor_WinangunJoManado());
        $subj->attach(new Erems_Models_Purchaseletternomor_LosariMakassar());
        $subj->attach(new Erems_Models_Purchaseletternomor_Medan());
        $subj->attach(new Erems_Models_Purchaseletternomor_Lampung());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandLampung());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitraGardenPekanbaru());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandPekanbaru());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandCibubur());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandTallasa());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitraGardenSidoarjo());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandGreenlake());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandAmbon());
        $subj->attach(new Erems_Models_Purchaseletternomor_TheTamanDayuSidoarjo());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitragranSemarang());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitrasunSemarang());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandPalembang());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandKendari());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitragranMutiaraYogyakarta());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitrasunGardenYogyakarta());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitraHarmoniSidoarjo());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralandDenpasar());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitraRaya());
        $subj->attach(new Erems_Models_Purchaseletternomor_BarsaCityYogya());
        $subj->attach(new Erems_Models_Purchaseletternomor_CitralakeSuites());
        $subj->setPurchaseParams($paramsNomor);
        return $subj->getPurchaseNomor();
    }

    private function generateNomorDokumen(Erems_Models_Purchaseletter_PurchaseLetterTransaction $purchaseletter){
        // GENERATE NOMOR DOKUMEN
        $daoCounter = new Erems_Models_Purchaseletter_CounterDao();
        
        $dao = new Erems_Models_Unit_UnitDao();
        $unitDb = $dao->getOne($purchaseletter->getUnit());

        $session = new Erems_Box_Models_App_Session();

        // $unitDb = $this->unitDb;
        // $purchaseletter = $this->purchaseletter;

        $counter = new Erems_Models_Purchaseletter_Counter();
        $counter->setYear(date("Y", strtotime($purchaseletter->getDate())));
        $counter->getProject()->setId($unitDb[1][0]["project_id"]);
        $counter->getPt()->setId($unitDb[1][0]["pt_id"]);

        //add by imaam on 02/09/2019
        $getIsPurchaseNomorResetByProject = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($session->getProject()->getId(), $session->getPt()->getId())->getIsPurchaseNomorResetByProject();
        if($getIsPurchaseNomorResetByProject){
            $pt_id = $this->getSession()->getPt()->getId();
        }else{
            $pt_id = $counter->getPt()->getId();
        }


        //$counter->getCluster()->setId($unitDb[1][0]["cluster_id"]);
        $isResetByCounter = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($unitDb[1][0]["project_id"], $pt_id)->getIsPurchaseNomorResetByCluster();
       
        // kalau reset hanya per tahun makan set cluster = 0 , jika pakai per tahun dan per cluster set cluster by unit
        $counter->getCluster()->setId($isResetByCounter == 1 ? $unitDb[1][0]["cluster_id"] : 0);
        if ($isResetByCounter < 0) { // tidak reset per tahun dan cluster
            $lastNumber = $daoCounter->getNewNumber($counter->getProject()->getId(), $pt_id, 0, 0);
        } else {
            $lastNumber = $daoCounter->getNewNumber($counter->getProject()->getId(), $pt_id, $counter->getCluster()->getId(), $counter->getYear());
        }
        $lastNumber = Erems_Box_Tools::toObjectRow($lastNumber, new Erems_Models_Purchaseletter_Counter());
        $counter->setId($lastNumber->getId());
        if (intval($lastNumber->getNextNumber()) == 0) {
            $lastNumber->setNextNumber(1);
        }
        $paramsNomor = array(
            "nomor" => $lastNumber->getNextNumber(),
            "project_id" => $counter->getProject()->getId(),
            "pt_id" => $counter->getPt()->getId(),
            "purchase_date" => $purchaseletter->getDate(),
            "cluster_code" => $unitDb[1][0]["cluster_code"],
            "productcategory_code" => $unitDb[1][0]["productcategory_productcategory"] == "BANGUNAN" ? "B" : "K",
            "block_code" => $unitDb[1][0]["block_code"]
        );
        $newNomor = NULL;
        $nomorUseGenco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($session->getProject()->getId(), $session->getPt()->getId())->isNomorUseGenco();

        if($nomorUseGenco){
            // $newNomor = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($session->getProject()->getId(), $session->getPt()->getId())->getPurchaseNomorTpl($paramsNomor);
            $newNomor = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getSession()->getProject()->getId(), $pt_id)->getPurchaseNomorTpl($paramsNomor);
        }else{
            $newNomor = $this->getNewNomor($paramsNomor);
        }
        $purchaseletter->setNomor($newNomor);
        if (strlen($purchaseletter->getNomor()) < 5) {
            echo "TIDAK ADA NOMOR PURCHASELETTER";

            die();
        }
        // /GENERATE NOMOR DOKUMEN
    }
}

?>
