<?php

/**
 * Description of Dao
 *
 * @author tommytoban
 */
class Cashier_Models_Sales_Change_Dao extends Cashier_Box_Models_App_AbDao implements Cashier_Box_Models_App_BlackHole {

    private $changeType;

    public function setType($t) {
        $this->changeType = $t;
    }

    public function save(Cashier_Models_Sales_Change $c) {
        $hasil = 0;
        if ($this->changeType == "CP") {
            if ($c instanceof Cashier_Models_Sales_Change_ChangePrice) {

                $hasil = $this->saveCP($c, $c->getPrice(), $c->getPriceAdmin(), $c->getPurchaseletter());
            }
        }
        return $hasil;
    }

    public function saveCN(Cashier_Models_Sales_Change_ChangeName $cn) {
        $hasil = 0;

        $hasil = $this->dbTable->SPUpdate('sp_changename_create', $cn->getAddBy(), $cn->getPurchaseletter()->getId(), $cn->getCustomerNew()->getId(), $cn->getDate(), $cn->getReason()->getId(), $cn->getNote(), $cn->getAdminFee(), Cashier_Box_Config::REVISIONTYPE_CHANGENAME);

        return $hasil;
    }
    
    public function updateInfoPrintCN(Cashier_Models_Sales_Change_ChangeName $cn) {
        $hasil = 0;

        $hasil = $this->dbTable->SPUpdate('sp_changenameinfoprint_update', $cn->getModiBy(),$cn->getId(),$cn->getAdendumNomor(),$cn->getPersetujuanNama(),$cn->getPersetujuanRelasi());

        return $hasil;
    }
    
    public function checkNomorAdendumCN($nomorAdendum,$projectId,$ptId) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_changenamechecknoadendum_read',$nomorAdendum,$projectId,$ptId);

        return $hasil;
    }
    
    public function getNomorAkhirAdendumCN($projectId,$ptId,$counterStart,$counterLen) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_changenamelastadendumno_read',$projectId,$ptId,$counterStart,$counterLen);

        return $hasil;
    }

    public function getRevision(Cashier_Models_Purchaseletter_PurchaseLetter $p, $revisionTypeId) {
        $hasil = 0;

        $hasil = $this->dbTable->SPExecute('sp_checkrevisi_read', $p->getId(), intval($revisionTypeId));

        return $hasil;
    }

    ///

    public function directDelete(\Cashier_Box_Models_App_Decan $decan, \Cashier_Box_Kouti_InterSession $session) {
        $row = 0;



        if ($this->changeType == "CP") {
            $row = $this->dbTable->SPUpdate('sp_changeprice_destroy', $decan->getString(), $session->getUserId());
        } else if ($this->changeType == "CN") {
            $row = $this->dbTable->SPUpdate('sp_changename_destroy', $decan->getString(), $session->getUserId());
        } else if ($this->changeType == "CK") {
            $row = $this->dbTable->SPUpdate('sp_changekavling_destroy', $decan->getString(), $session->getUserId());
        }

        return $row;
    }

    public function saveCP(Cashier_Models_Sales_Change_ChangePrice $cp, Cashier_Models_Sales_Price $price, Cashier_Models_Sales_PriceAdmin $pAdmin, Cashier_Models_Purchaseletter_PurchaseLetterTransaction $pl) {
        $hasil = 0;
        $dcResult = $pl->getDCResult();
        

        $hasil = $this->dbTable->SPUpdate("sp_changeprice_create", $cp->getAddBy(), $cp->getPurchaseletter()->getId(), $cp->getUnitType()->getId(), $cp->getPropertyInfo()->getLandSize(), $cp->getPropertyInfo()->getBuildingSize(), $cp->getPropertyInfo()->getKelebihanTanah(), $cp->getDate(), $cp->getPriceType()->getId(), $price->getPermeter(), $price->getKelebihan(), $price->getTanah(), $price->getTotalKelebihan(), $price->getBangunan(), $price->getJualDasar(), $price->getDiscountDasar(), $price->getAfterDiscountDasar(), $price->getDiscountTanah(), $price->getAfterDiscountTanah(), $price->getDiscountBangunan(), $price->getAfterDiscountBangunan(), $price->getNetto(), $price->getPpnTanah(), $price->getAfterPpnTanah(), $price->getPpnBangunan(), $price->getAfterPpnBangunan(), $price->getPpnbm(), $price->getAfterPpnbm(), $price->getPph22(), $price->getAfterPph22(), $price->getBbnSertifikat(), $price->getBphtb(), $price->getBajb(), $price->getJual(), $pAdmin->getDiskon(), $pAdmin->getPriceDiskon(), $pAdmin->getPrice(), $pAdmin->getSubsidi(), $pAdmin->getPMutu(), $pAdmin->getPaketTambahan(), $pl->getTotal(), Cashier_Box_Config::REVISIONTYPE_CHANGEPRICE, $cp->getBankKPR()->getId(), $dcResult["schedule_id"], $dcResult["scheduletype_id"], $dcResult["duedate"], $dcResult["amount"], $dcResult["sourcemoney_sourcemoney_id"], $dcResult["remaining_balance"], '', '', '', '', $dcResult["termin"],'','','0','',$pAdmin->getAsuransi(),$cp->getNote(),$cp->getNotesNew());


        return $hasil;
    }

    public function approveCP(Cashier_Models_Sales_Change_ChangePrice $cp, $docStatus) {
        $hasil = 0;

  

        $hasil = $this->dbTable->SPUpdate("sp_changeprice_approve", $cp->getAddBy(), $cp->getId(), Cashier_Box_Config::REVISIONTYPE_CHANGEPRICE, $docStatus,$cp->getDate());


        return $hasil;
    }
    public function approveCPColl(Cashier_Models_Sales_Change_ChangePrice $cp, $docStatus) {
        $hasil = 0;

  

        $hasil = $this->dbTable->SPUpdate("sp_changepricewithcoll_approve", $cp->getAddBy(), $cp->getId(), Cashier_Box_Config::REVISIONTYPE_CHANGEPRICE, $docStatus,$cp->getDate());

        return $hasil;
    }

    public function saveCK(Cashier_Models_Sales_Change_ChangeKavling $ck) {
        $hasil = 0;




        $hasil = $this->saveinternCK($ck, $ck->getNewPurchaseLetter(), $ck->getNewPurchaseLetter()->getPrice(), $ck->getNewPurchaseLetter()->getPriceAdmin());

        return $hasil;
    }

    public function approveCN(Cashier_Models_Sales_Change_ChangeName $cp, $docStatus) {
        $hasil = 0;


        $hasil = $this->dbTable->SPUpdate("sp_changename_approve", $cp->getAddBy(), $cp->getId(), Cashier_Box_Config::REVISIONTYPE_CHANGENAME, $docStatus,$cp->getDate());


        return $hasil;
    }
    
    public function approveCNColl(Cashier_Models_Sales_Change_ChangeName $cp, $docStatus) {
        $hasil = 0;


        $hasil = $this->dbTable->SPUpdate("sp_changenamewithcoll_approve", $cp->getAddBy(), $cp->getId(), Cashier_Box_Config::REVISIONTYPE_CHANGENAME, $docStatus,$cp->getDate());

      

        return $hasil;
    }

    public function approveCK(Cashier_Models_Sales_Change_ChangeKavling $cp, $docStatus, $newNumber) {
        $hasil = 0;



        $hasil = $this->dbTable->SPUpdate("sp_pindahkavling_approve", $cp->getAddBy(), $cp->getId(), Cashier_Box_Config::REVISIONTYPE_CHANGEKAVLING, $docStatus, Cashier_Box_Config::UNITSTATUS_SOLD, Cashier_Box_Config::UNITSTATUS_STOCK, $newNumber,$cp->getDate());
        // var_dump($this->dbTable);
        // var_dump($this->dbTable);
        return $hasil;
    }
    
    public function approveCKColl(Cashier_Models_Sales_Change_ChangeKavling $cp, $docStatus, $newNumber) {
        $hasil = 0;



        $hasil = $this->dbTable->SPUpdate("sp_pindahkavlingwithcoll_approve", $cp->getAddBy(), $cp->getId(), Cashier_Box_Config::REVISIONTYPE_CHANGEKAVLING, $docStatus, Cashier_Box_Config::UNITSTATUS_SOLD, Cashier_Box_Config::UNITSTATUS_STOCK, $newNumber,$cp->getDate());
       // var_dump($hasil);
        return $hasil;
    }

    /* Mark by tommy 20170826

      private function saveinternCK(Cashier_Models_Sales_Change_ChangeKavling $ck,Cashier_Models_Purchaseletter_PurchaseLetterTransaction $pl,  Cashier_Models_Sales_Price $price,  Cashier_Models_Sales_PriceAdmin $pa){
      $hasil = 0;

      $dcResult = $pl->getDCResult();



      if(doubleval($pl->getTotal())==0){
      return $hasil;
      }



      $hasil = $this->dbTable->SPUpdate('sp_pindahkavlingb_create',
      $ck->getAddBy(),
      $ck->getProject()->getId(),
      $ck->getPt()->getId(),
      $ck->getPurchaseletter()->getId(),
      $pl->getUnit()->getId(),
      $pl->getPriceType()->getId(),
      $pl->getNomor(),
      $pl->getDate(),
      Cashier_Box_Config::REVISIONTYPE_CHANGEKAVLING,
      doubleval($pl->getRemainingBalance()),
      doubleval($price->getPermeter()),
      doubleval($price->getTanah()),
      doubleval($price->getKelebihan()),
      doubleval($price->getTotalKelebihan()),
      doubleval($price->getBangunan()),
      doubleval($price->getDiscountBangunan()),
      doubleval($price->getAfterDiscountBangunan()),
      doubleval($price->getPpnTanah()),
      doubleval($price->getAfterPpnTanah()),
      doubleval($price->getPpnBangunan()),
      doubleval($price->getAfterPpnBangunan()),
      doubleval($pa->getPrice()),
      doubleval($pa->getPaketTambahan()),
      doubleval($pa->getDiskon()),
      doubleval($pa->getPriceDiskon()),
      doubleval($price->getJualDasar()),
      doubleval($price->getDiscountDasar()),
      doubleval($price->getAfterDiscountDasar()),
      doubleval($price->getNetto()),
      doubleval($price->getBphtb()),
      doubleval($price->getBbnSertifikat()),
      doubleval($price->getBajb()),
      doubleval($price->getJual()),
      doubleval($pa->getSubsidi()),
      doubleval($pa->getPMutu()),
      doubleval($pl->getTotal()),
      intval($ck->getReason()->getId()),
      $ck->getNote(),
      Cashier_Box_Config::UNITSTATUS_SOLD,
      Cashier_Box_Config::UNITSTATUS_STOCK,
      intval($pl->getBilling()->getId()),
      doubleval($pl->getBilling()->getTandaJadi()->getQuantity()),
      doubleval($pl->getBilling()->getTandaJadi()->getAmount()),
      doubleval($pl->getBilling()->getUangMuka()->getQuantity()),
      doubleval($pl->getBilling()->getUangMuka()->getAmount()),
      doubleval($pl->getBilling()->getAngsuran()->getQuantity()),
      doubleval($pl->getBilling()->getAngsuran()->getAmount()),
      intval($pl->getBankKPR()->getId()),
      intval($pl->getCollector()->getId()),
      intval($pl->getRencanaSerahTerima()),
      $pl->getRencanaSerahTerimaDate(),
      $dcResult["schedule_id"],
      $dcResult["scheduletype_id"],
      $dcResult["duedate"],
      $dcResult["amount"],
      $dcResult["termin"],
      $dcResult["remaining_balance"],
      $dcResult["sourcemoney_sourcemoney_id"],
      doubleval($price->getDiscountTanah()),
      doubleval($price->getAfterDiscountTanah()),
      Cashier_Box_Config::UNITSTATUS_HOLD,
      //semy 31/07/1993
      doubleval($price->getPpnbm()), //persen
      doubleval($price->getPph22()), //persen
      doubleval($price->getAfterPph22()), //harga
      doubleval($price->getAfterPpnbm()) //harga
      //semy
      );

      return $hasil;
      }
     */

    private function saveinternCK(Cashier_Models_Sales_Change_ChangeKavling $ck, Cashier_Models_Purchaseletter_PurchaseLetterTransaction $pl, Cashier_Models_Sales_Price $price, Cashier_Models_Sales_PriceAdmin $pa) {
        $hasil = 0;

        $dcResult = $pl->getDCResult();



        if (doubleval($pl->getTotal()) == 0) {
            return $hasil;
        }
        
     
        
    

        $hasil = $this->dbTable->SPUpdate('sp_pindahkavlingb_create', $ck->getAddBy(), $ck->getProject()->getId(), $ck->getPt()->getId(), $ck->getPurchaseletter()->getId(), $pl->getUnit()->getId(), $pl->getPriceType()->getId(), $pl->getNomor(), $pl->getDate(), Cashier_Box_Config::REVISIONTYPE_CHANGEKAVLING, doubleval($pl->getRemainingBalance()), doubleval($price->getPermeter()), doubleval($price->getTanah()), doubleval($price->getKelebihan()), doubleval($price->getTotalKelebihan()), doubleval($price->getBangunan()), doubleval($price->getDiscountBangunan()), doubleval($price->getAfterDiscountBangunan()), doubleval($price->getPpnTanah()), doubleval($price->getAfterPpnTanah()), doubleval($price->getPpnBangunan()), doubleval($price->getAfterPpnBangunan()), doubleval($pa->getPrice()), doubleval($pa->getPaketTambahan()), doubleval($pa->getDiskon()), doubleval($pa->getPriceDiskon()), doubleval($price->getJualDasar()), doubleval($price->getDiscountDasar()), doubleval($price->getAfterDiscountDasar()), doubleval($price->getNetto()), doubleval($price->getBphtb()), doubleval($price->getBbnSertifikat()), doubleval($price->getBajb()), doubleval($price->getJual()), doubleval($pa->getSubsidi()), doubleval($pa->getPMutu()), doubleval($pl->getTotal()), intval($ck->getReason()->getId()), $ck->getNote(), Cashier_Box_Config::UNITSTATUS_SOLD, Cashier_Box_Config::UNITSTATUS_STOCK, intval($pl->getBilling()->getId()), doubleval($pl->getBilling()->getTandaJadi()->getQuantity()), doubleval($pl->getBilling()->getTandaJadi()->getAmount()), doubleval($pl->getBilling()->getUangMuka()->getQuantity()), doubleval($pl->getBilling()->getUangMuka()->getAmount()), doubleval($pl->getBilling()->getAngsuran()->getQuantity()), doubleval($pl->getBilling()->getAngsuran()->getAmount()), intval($pl->getBankKPR()->getId()), intval($pl->getCollector()->getId()), intval($pl->getRencanaSerahTerima()), $pl->getRencanaSerahTerimaDate(), $dcResult["schedule_id"], $dcResult["scheduletype_id"], $dcResult["duedate"], $dcResult["amount"], $dcResult["termin"], $dcResult["remaining_balance"], $dcResult["sourcemoney_sourcemoney_id"], doubleval($price->getDiscountTanah()), doubleval($price->getAfterDiscountTanah()), Cashier_Box_Config::UNITSTATUS_HOLD,
                //semy 31/07/1993
                doubleval($price->getPpnbm()), //persen
                doubleval($price->getPph22()), //persen
                doubleval($price->getAfterPph22()), //harga
                doubleval($price->getAfterPpnbm()), //harga
                $pl->getNotes()
                //semy
        );

        return $hasil;
    }

    /*
      private function saveinternCK(Cashier_Models_Sales_Change_ChangeKavling $ck,Cashier_Models_Purchaseletter_PurchaseLetterTransaction $pl,  Cashier_Models_Sales_Price $price,  Cashier_Models_Sales_PriceAdmin $pa){
      $hasil = 0;

      $dcResult = $pl->getDCResult();



      if(doubleval($pl->getTotal())==0){
      return $hasil;
      }







      $hasil = $this->dbTable->SPUpdate('sp_pindahkavlingb_create',
      $ck->getAddBy(),
      $ck->getProject()->getId(),
      $ck->getPt()->getId(),
      $ck->getPurchaseletter()->getId(),
      $pl->getUnit()->getId(),
      $pl->getPriceType()->getId(),
      $pl->getNomor(),
      $pl->getDate(),
      Cashier_Box_Config::REVISIONTYPE_CHANGEKAVLING,
      doubleval($pl->getRemainingBalance()),
      doubleval($price->getPermeter()),
      doubleval($price->getTanah()),
      doubleval($price->getKelebihan()),
      doubleval($price->getTotalKelebihan()),
      doubleval($price->getBangunan()),
      doubleval($price->getDiscountBangunan()),
      doubleval($price->getAfterDiscountBangunan()),
      doubleval($price->getPpnTanah()),
      doubleval($price->getAfterPpnTanah()),
      doubleval($price->getPpnBangunan()),
      doubleval($price->getAfterPpnBangunan()),
      doubleval($pa->getPrice()),
      doubleval($pa->getPaketTambahan()),
      doubleval($pa->getDiskon()),
      doubleval($pa->getPriceDiskon()),
      doubleval($price->getJualDasar()),
      doubleval($price->getDiscountDasar()),
      doubleval($price->getAfterDiscountDasar()),
      doubleval($price->getNetto()),
      doubleval($price->getBphtb()),
      doubleval($price->getBbnSertifikat()),
      doubleval($price->getBajb()),
      doubleval($price->getJual()),
      doubleval($pa->getSubsidi()),
      doubleval($pa->getPMutu()),
      doubleval($pl->getTotal()),
      intval($ck->getReason()->getId()),
      $ck->getNote(),
      Cashier_Box_Config::UNITSTATUS_SOLD,
      Cashier_Box_Config::UNITSTATUS_STOCK,
      intval($pl->getBilling()->getId()),
      doubleval($pl->getBilling()->getTandaJadi()->getQuantity()),
      doubleval($pl->getBilling()->getTandaJadi()->getAmount()),
      doubleval($pl->getBilling()->getUangMuka()->getQuantity()),
      doubleval($pl->getBilling()->getUangMuka()->getAmount()),
      doubleval($pl->getBilling()->getAngsuran()->getQuantity()),
      doubleval($pl->getBilling()->getAngsuran()->getAmount()),
      intval($pl->getBankKPR()->getId()),
      intval($pl->getCollector()->getId()),
      intval($pl->getRencanaSerahTerima()),
      $pl->getRencanaSerahTerimaDate(),
      $dcResult["schedule_id"],
      $dcResult["scheduletype_id"],
      $dcResult["duedate"],
      $dcResult["amount"],
      $dcResult["termin"]);

      //$dcResult["schedule_id"], $dcResult["scheduletype_id"], $dcResult["termin"], $dcResult["duedate"], $dcResult["amount"],$dcResult["sourcemoney_sourcemoney_id"]






      return $hasil;
      }

     */

    public function getEmailCN(Cashier_Models_Sales_Change_ChangeName $cn, $approveUserId) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_changenameemail_read', $cn->getId(), $approveUserId);

        return $hasil;
    }

    public function getEmailCK(Cashier_Models_Sales_Change_ChangeKavling $ck, $approveUserId) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_changekavlingemail_read', $ck->getId(), $approveUserId);

        return $hasil;
    }

    public function getEmailCP(Cashier_Models_Sales_Change_ChangePrice $cp, $approveUserId) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_changepriceemail_read', $cp->getId(), $approveUserId);

        return $hasil;
    }

    public function getOneCN(Cashier_Models_Sales_Change_ChangeName $cn) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_changenamedetail_read', $cn->getId());

        return $hasil;
    }

    public function getOneForPrintout(Cashier_Models_Sales_Change_ChangeName $cn) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_changenameprintout_read', $cn->getId());

        return $hasil;
    }

    public function getOneCK(Cashier_Models_Sales_Change_ChangeKavling $ck) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_pindahkavlingdetail_read', $ck->getId());

        return $hasil;
    }

    public function oneForPrintout(Cashier_Models_Sales_Change_ChangeKavling $ck) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_pindahkavlingprintout_read', $ck->getId());

        return $hasil;
    }

    public function getOneCP(Cashier_Models_Sales_Revision $prv) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_changepricedetail_read', $prv->getId());
        // var_dump($hasil);
        return $hasil;
    }

    public function getScheduleChangePrice($revisiId) {
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_changepriceschedule_read', $revisiId);
        return $hasil;
    }

    public function getOnePrintout(Cashier_Models_Sales_Revision $prv) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_changepriceprintout_read', $prv->getId());

        return $hasil;
    }

    //sp_changepriceprintout_read



    public function getAll(Cashier_Models_Unit_UnitTran $unit, Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Sales_Change_ChangeName $cn) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_changename_read', $unit->getPt()->getId(), $unit->getProject()->getId(), $r->getPage(), $r->getLimit(), $cn->getPurchaseletter()->getNomor());

        return $hasil;
    }


    public function getAllFillter(Cashier_Models_Unit_UnitTran $unit, Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Sales_Change_ChangeName $cn, Cashier_Box_Kouti_Session $ses, $unitNumber, $customerName) {
      
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_changename_read', $unit->getPt()->getId(), $unit->getProject()->getId(), $r->getPage(), $r->getLimit(), $cn->getPurchaseletter()->getNomor(), $unitNumber, $customerName, 0, 999999999999);

        return $hasil;

    }
    
    public function getAllFillterHariKebelakang(Cashier_Models_Unit_UnitTran $unit, Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Sales_Change_ChangeName $cn, Cashier_Box_Kouti_Session $ses, $unitNumber, $customerName,$xhari) {
      
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_changenameharikebelakang_read', $unit->getPt()->getId(), $unit->getProject()->getId(), $r->getPage(), $r->getLimit(), $cn->getPurchaseletter()->getNomor(), $unitNumber, $customerName, 0, 999999999999,intval($xhari));

        return $hasil;

    }

    //remarked

    public function getAllFillterOld(Cashier_Models_Unit_UnitTran $unit, Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Sales_Change_ChangeName $cn, $unitNumber, $customerName) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_changename_read', $unit->getPt()->getId(), $unit->getProject()->getId(), $r->getPage(), $r->getLimit(), $cn->getPurchaseletter()->getNomor(), $unitNumber, $customerName);

        return $hasil;
    }

    public function getAllFilterB($projectId, $ptId, $purchaseNomor, $unitNumber, $customerName, $feeBot = 0, $feeTop = 99999999) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_changename_read', $ptId, $projectId, 1, 25, $purchaseNomor, $unitNumber, $customerName, $feeBot, $feeTop);

        return $hasil;
    }

    public function getAllCK(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Sales_Change_ChangeKavling $ck) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_changekavling_read', $ck->getProject()->getId(), $ck->getPt()->getId(), $r->getPage(), $r->getLimit());

        return $hasil;
    }

    public function getAllCKFilter(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Sales_Change_ChangeKavling $ck, Cashier_Box_Kouti_Session $ses) {
//        $hasil = array();
       $hasil = $this->dbTable->spToQuery('sp_changekavling_read', $ck->getProject()->getId(), $ck->getPt()->getId(), $r->getPage(), $r->getLimit(), $r->getOthersValue("purchaseletter_no"), $r->getOthersValue("unit_number"), $r->getOthersValue("customer_name"));
        
        return $hasil;
    }
    
    public function getAllCKFilterXhariBelakang(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Sales_Change_ChangeKavling $ck, Cashier_Box_Kouti_Session $ses,$xhari) {
       $hasil = $this->dbTable->spToQuery('sp_changekavlingxharibelakang_read', $ck->getProject()->getId(), $ck->getPt()->getId(), $r->getPage(), $r->getLimit(), $r->getOthersValue("purchaseletter_no"), $r->getOthersValue("unit_number"), $r->getOthersValue("customer_name"),intval($xhari));
        
        return $hasil;
    }

    public function getAllCP(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Sales_Change_ChangePrice $cp, Cashier_Box_Kouti_Session $ses) {
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_changeprice_read', $r->getPage(), $r->getLimit(), $ses->getProject()->getId(), $ses->getPt()->getId(), $r->getOthersValue("cluster_id"), $r->getOthersValue("block_id"), $r->getOthersValue("unit_number"), $r->getOthersValue("customer_name"));

        return $hasil;
    }

    public function getAllCPFilter(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Sales_Change_ChangePrice $cp, Cashier_Box_Kouti_Session $ses) {
        $hasil = array();

        if($r->getOthersValue("block_id")==""){$block_id=0;}else{$block_id=$r->getOthersValue("block_id");}
        if($r->getOthersValue("cluster_id")==""){$cluster_id=0;}else{$cluster_id=$r->getOthersValue("cluster_id");};

          $hasil = $this->dbTable->spToQuery('sp_changeprice_read',$r->getPage(),$r->getLimit(),$ses->getProject()->getId(),$ses->getPt()->getId(),
          $cluster_id,$block_id,$r->getOthersValue("unit_number"),$r->getOthersValue("customer_name"),$r->getOthersValue("purchaseletter_no"));

        return $hasil;
    }
    
    public function getAllCPFilterxHariBelakang(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Box_Kouti_Session $ses,$xhari) {
        $hasil = array();

        if($r->getOthersValue("block_id")==""){$block_id=0;}else{$block_id=$r->getOthersValue("block_id");}
        if($r->getOthersValue("cluster_id")==""){$cluster_id=0;}else{$cluster_id=$r->getOthersValue("cluster_id");};

          $hasil = $this->dbTable->spToQuery('sp_changepricexharibelakang_read',$r->getPage(),$r->getLimit(),$ses->getProject()->getId(),$ses->getPt()->getId(),
          $cluster_id,$block_id,$r->getOthersValue("unit_number"),$r->getOthersValue("customer_name"),$r->getOthersValue("purchaseletter_no"),$xhari);

        return $hasil;
    }

    // mark on 2017 09 14
      public function getAllCPFilterOld(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Sales_Change_ChangePrice $cp,  Cashier_Box_Kouti_Session $ses){
      $hasil = array();


      $hasil = $this->dbTable->SPExecute('sp_changeprice_read',$r->getPage(),$r->getLimit(),$ses->getProject()->getId(),$ses->getPt()->getId(),
      $r->getOthersValue("cluster_id"),$r->getOthersValue("block_id"),$r->getOthersValue("unit_number"),$r->getOthersValue("customer_name"),$r->getOthersValue("purchaseletter_no"));

      return $hasil;
      }
     
     

    public function getAllSoldUnitCP(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Unit_UnitTran $ut) {
        $hasil = array();
        $project = $ut->getProject()->getId();
        $pt = $ut->getPt()->getId();
        if ($project == 0 || $pt == 0) {
            return $hasil;
        }

        $hasil = $this->dbTable->SPExecute('sp_unitb_forchangeprice_read', $project, $pt, $r->getPage(), $r->getLimit(), $ut->getStatus()->getId(), $ut->getNumber(), $ut->getBlock()->getId(), $r->getOthersValue('purchaseletter_no'), $r->getOthersValue('customer_name'));




        return $hasil;
    }

    public function getAllUnitCN(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Unit_UnitTran $ut) {
        $hasil = array();
        $project = $ut->getProject()->getId();
        $pt = $ut->getPt()->getId();
        if ($project == 0 || $pt == 0) {
            return $hasil;
        }

        $hasil = $this->dbTable->SPExecute('sp_unitb_forchangename_read', $project, $pt, $r->getPage(), $r->getLimit(), $ut->getStatus()->getId(), $ut->getNumber(), $ut->getBlock()->getId(), $r->getOthersValue('purchaseletter_no'), $r->getOthersValue('customer_name'));




        return $hasil;
    }

    public function getAllUnitCK(Cashier_Box_Models_App_HasilRequestRead $r, Cashier_Models_Unit_UnitTran $ut) {
        $hasil = array();
        $project = $ut->getProject()->getId();
        $pt = $ut->getPt()->getId();
        if ($project == 0 || $pt == 0) {
            return $hasil;
        }

        $hasil = $this->dbTable->SPExecute('sp_unitb_forchangekavling_read', $project, $pt, $r->getPage(), $r->getLimit(), $ut->getStatus()->getId(), $ut->getNumber(), $ut->getBlock()->getId(), $r->getOthersValue('purchaseletter_no'), $r->getOthersValue('customer_name'));




        return $hasil;
    }

    public function oneScheduleByPL($plID) {
        $hasil = array();
        $hasil = $this->dbTable->execSP2('sp_purchasegetschedule_read', $plID);

        return $hasil;
    }

}

?>
