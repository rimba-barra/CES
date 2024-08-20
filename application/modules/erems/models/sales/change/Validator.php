<?php

/**
 * Description of Validator
 *
 * @author tommytoban
 */
class Erems_Models_Sales_Change_Validator extends Erems_Box_Models_App_Validator {
    /* added 28 Sept 2014 */

    private $changeType;
    private $validasiTanggalClosing;
    private $session;
    public $requestParam;

    public function setSession($session) {
        $this->session = $session;
    }

    public function run(Erems_Models_Sales_Change $c) {

        // var_dump($c->getArrayTable());
        $paramsRequestResultNew = Erems_Box_Tools::globalParamsExistNew($this->session, "GLOBAL");
        $tanggalClosing = intval($paramsRequestResultNew["parameters"]["GLOBAL_TANGGAL_CLOSING"]);
        $this->validasiTanggalClosing = Erems_Box_Tools::validasiTanggalPurchase($c->getDate(), $tanggalClosing);


        if ($this->changeType == "CK") {
            $this->runChangeKavling($c);
        } else if ($this->changeType == "CP") {
            $this->runChangePrice($c);
        } else if ($this->changeType == "CN") {
            $this->runChangeName($c);
        } else if ($this->changeType == "CPAPPROVE") {
            $this->runApproveChangePrice($c);
        } else if ($this->changeType == "CNAPPROVE") {
            $this->runApproveChangeName($c);
        } else if ($this->changeType == "CKAPPROVE") {
            $this->runApproveChangeKavling($c);
        }
    }

    public function setType($type) {
        $this->changeType = $type;
    }

    public function runChangeName(Erems_Models_Sales_Change_ChangeName $cn) {
        $msg = "Validation run";
        
        
        //rizal 4 April 2019
        $salesdao = new Erems_Models_Sales_Change_Dao();
        $prjdtl = $salesdao->getProjectDetail($this->session->getProject()->getId());
        //
        
        // check tanggal first purchasedate
        $selisihHariFirstDate = $this->getSelisihFirstPurchaseDate($cn->getPurchaseletter()->getId(), $cn->getDate());


        if ($cn->getPurchaseletter()->getId() == 0) {
            $msg = "Please insert purchaseletter first";
        } else if (strtotime(date($cn->getDate())) - strtotime(date("Y-m-d")) > 0) {
            $msg = "Tanggal perubahan tidak boleh lebih dari " . date("d-m-Y");
        } else if (!$this->validasiTanggalClosing["HASIL"]) {
            $msg = "[Change Date] " . $this->validasiTanggalClosing["MSG"];
        } else if ($cn->getCustomerNew()->getId() == 0) {
            $msg = "Please insert new customer";
        }
        else if ($cn->getReason()->getId() == 0) {
            $msg = "Please insert reason";
        } else if (!$cn->getDate()) {
            $msg = "Please insert change name date";
        } else if ($selisihHariFirstDate["SELISIH"] < 0) {
            $msg = "Tanggal perubahan tidak boleh lebih kecil dari tanggal : " . $selisihHariFirstDate["FIRSTPLDATE"];
        } 
        
        else if ($cn->getIsSatuKK()==false && $cn->getNoDocPengalihanHak()=='' && $prjdtl['subholding_id']=='2') {
            $msg = "Please insert No Doc Pengalihan Hak";
        } else if ($cn->getCaraPembayaranPPH()=='' && $prjdtl['subholding_id']=='2') {
            $msg = "Silahkan pilih Cara Pembayaran PPH";
        }else if ($cn->getCaraPembayaranPPH()=='sendiri' && $cn->getNomorSetorPajak()=='' && $prjdtl['subholding_id']=='2') {
            $msg = "Silahkan isi No Setor Pajak";
        }else if ($cn->getCaraPembayaranPPH()=='project' && $cn->getNominalPembayaranPPH()=='' && $prjdtl['subholding_id']=='2') {
            $msg = "Silahkan isi nominal pembayaran pph";
        } 
        else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }

    public function runChangePrice(Erems_Models_Sales_Change_ChangePrice $cp) {
        $msg = "Validation run";


        $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getProject()->getId(),$this->session->getPt()->getId());

        $selisihHariFirstDate = $this->getSelisihFirstPurchaseDate($cp->getPurchaseletter()->getId(), $cp->getDate());

        $paramsRequestResult = Erems_Box_Tools::globalParamsExistPurchaseletter($this->session);
        $isAppartmentProject = FALSE;
        if(is_array($paramsRequestResult)){
            $params = $paramsRequestResult["parameters"];
            $statusProject = $params[Erems_Box_GlobalParams::PURCHASELETTER_STATUS_PROJECT];
            if ($statusProject == Erems_Box_Config::STATUS_PROJECT_PERUMAHAN) {
                
            }else{
                $isAppartmentProject = TRUE;
            }
        } 
        

        if ($cp->getPurchaseletter()->getId() == 0) {
            $msg = "Please insert purchaseletter first";
        } else if (!$cp->getDate()) {
            $msg = "Please insert change price date";
        } else if (strtotime(date($cp->getDate())) - strtotime(date("Y-m-d")) > 0) {
            $msg = "Tanggal perubahan tidak boleh lebih dari " . date("d-m-Y");
        } else if (!$this->validasiTanggalClosing["HASIL"]) {
            $msg = $this->validasiTanggalClosing["MSG"];
        } else if (!$cp->getUnitType()->getId()) {
            $msg = "Please insert new Unit Type";
        } else if (!$cp->getPropertyInfo()->getLandSize() && !$isAppartmentProject) {
            $msg = "Please insert new Land Size";
        } else if (!$cp->getPriceType()->getId()) {
            $msg = "Please insert new Price Type";
        } else if ($selisihHariFirstDate["SELISIH"] < 0) {
            $msg = "Tanggal perubahan tidak boleh lebih kecil dari tanggal : " . $selisihHariFirstDate["FIRSTPLDATE"];
        } else if (abs($cp->getHargaPembulatanNew()) > $genco->getMaxPembulatan()){
                    $msg = "Harga pembulatan Maksimal Tidak boleh lebih dari +- ".$genco->getMaxPembulatan();
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }

    private function runApproveChangePrice(Erems_Models_Sales_Change_ChangePrice $cp) {
        $msg = "Validation run";



        $paramsRequestResultNew = Erems_Box_Tools::globalParamsExistNew($this->session, "GLOBAL");

        $tanggalClosing = intval($paramsRequestResultNew["parameters"]["GLOBAL_TANGGAL_CLOSING"]);

        $validasiTanggalClosing = Erems_Box_Tools::validasiTanggalPurchase($cp->getDate(), $tanggalClosing);



        if ($cp->getId() == 0) {
            $msg = "Invalid change price record";
        } else if (!$validasiTanggalClosing["HASIL"]) {
            $msg = $validasiTanggalClosing["MSG"];
        } else {

            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }

    private function runApproveChangeKavling(Erems_Models_Sales_Change_ChangeKavling $cp) {
        $msg = "Validation run";

        $cp->setDate($this->requestParam["plnew_purchase_date"]);

        $paramsRequestResultNew = Erems_Box_Tools::globalParamsExistNew($this->session, "GLOBAL");

        $tanggalClosing = intval($paramsRequestResultNew["parameters"]["GLOBAL_TANGGAL_CLOSING"]);

        $validasiTanggalClosing = Erems_Box_Tools::validasiTanggalPurchase($cp->getDate(), $tanggalClosing);




        if ($cp->getId() == 0) {
            $msg = "Invalid change kavling record";
        } else if (!$validasiTanggalClosing["HASIL"]) {
            $msg = $validasiTanggalClosing["MSG"];
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }

    private function runApproveChangeName(Erems_Models_Sales_Change_ChangeName $cn) {
        $msg = "Validation run";

        $paramsRequestResultNew = Erems_Box_Tools::globalParamsExistNew($this->session, "GLOBAL");

        $tanggalClosing = intval($paramsRequestResultNew["parameters"]["GLOBAL_TANGGAL_CLOSING"]);

        $validasiTanggalClosing = Erems_Box_Tools::validasiTanggalPurchase($cn->getDate(), $tanggalClosing);

        //   var_dump($validasiTanggalClosing);


        if ($cn->getId() == 0) {
            $msg = "Invalid change name record";
        } else if (!$validasiTanggalClosing["HASIL"]) {
            $msg = $validasiTanggalClosing["MSG"];
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }

    public function runChangeKavling(Erems_Models_Sales_Change_ChangeKavling $ck) {
        $msg = "Validation run";

        $selisihHariFirstDate = $this->getSelisihFirstPurchaseDate($ck->getPurchaseletter()->getId(), $ck->getNewPurchaseLetter()->getDate());

        $paramsRequestResultNew = Erems_Box_Tools::globalParamsExistNew($this->session, "GLOBAL");
        $tanggalClosing = intval($paramsRequestResultNew["parameters"]["GLOBAL_TANGGAL_CLOSING"]);
        $this->validasiTanggalClosing = Erems_Box_Tools::validasiTanggalPurchase($ck->getNewPurchaseLetter()->getDate(), $tanggalClosing);
		
        //edited by Rizal 1 Maret 2019
        $isidleSamePLID = $this->getNeedProcessCKcount($ck->getPurchaseletter()->getId());
        //endedited
        if ($ck->getPurchaseletter()->getId() == 0) {
            $msg = "Please insert purchaseletter first";
        } else if (strtotime(date($ck->getDate())) - strtotime(date("Y-m-d")) > 0) {
            $msg = "Tanggal perubahan tidak boleh lebih dari " . date("d-m-Y");
        } else if (!$this->validasiTanggalClosing["HASIL"]) {
            $msg = $this->validasiTanggalClosing["MSG"];
        } else if (strlen($ck->getNote()) < 5) {
            $msg = "Change kavling notes minimal 5 karakter.";
        } else if ($selisihHariFirstDate["SELISIH"] < 0) {
            $msg = "Tanggal perubahan tidak boleh lebih kecil dari tanggal : " . $selisihHariFirstDate["FIRSTPLDATE"];
        } else if ($ck->getReason()->getId() == 0) {
            $msg = "Silahkan input reason change.";
        }else if($isidleSamePLID) {
            $msg = "Masih ada pindah kavling di unit yang sama belum di proses.";
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }

    public function runChangeNameInfoPrint(Erems_Models_Sales_Change_ChangeName $cn) {
        $msg = "Validation info print run";


        $dao = new Erems_Models_Sales_Change_Dao();
        $checkNomor = $dao->checkNomorAdendumCN($cn->getAdendumNomor(), $this->session->getProject()->getId(), $this->session->getPt()->getId());


        $checkNomorId = 0;
        if (count($checkNomor[0]) > 0) {
            $checkNomorId = intval($checkNomor[0][0]["changename_id"]);
        }


        if (strlen($cn->getAdendumNomor()) > 200) {
            $msg = "Nomor adendum harus di bawah 200 karakter.";
        } else if (($checkNomorId > 0) && ($checkNomorId <> $cn->getId())) {
            $msg = "Nomor Adendum sudah terdaftar. Silahkan menggunakan nomor adendum lain.";
        } else if (strlen($cn->getPersetujuanNama()) > 200) {
            $msg = "Nama persetujuan harus di bawah 200 karakter.";
        } else if (strlen($cn->getPersetujuanRelasi()) > 50) {
            $msg = "Persetujuan status harus di bawah 50 karakter.";
        } else {
            $msg = "[SUKSES] Validation info print run";
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }

    private function getSelisihFirstPurchaseDate($purchaseletterId, $tglPerubahan) {
        $plDao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $plData = $plDao->getOne($purchaseletterId);
        $pl = new Erems_Models_Purchaseletter_PurchaseLetterTransaction();
        $pl->setArrayTable($plData[1][0]);

        // var_dump($pl->getArrayTable());

        $firsPurchaseDate = new DateTime(date("Y-m-d", strtotime($pl->getFirstPurchaseDate())));
        $changeDate = new DateTime(date("Y-m-d", strtotime($tglPerubahan)));
        $selisihHariFirstDate = $firsPurchaseDate->diff($changeDate);
        $selisihHariFirstDate = intval($selisihHariFirstDate->format('%R%a'));
		
        return array(
            "SELISIH" => $selisihHariFirstDate,
            "FIRSTPLDATE" => date("d-m-Y", strtotime($pl->getFirstPurchaseDate()))
        );
    }
    
    private function getNeedProcessCKcount($purchaseletterId){
        $plDao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $plData = $plDao->countNeedProcessCKCount($purchaseletterId);
        
        return $plData;
    }

}

?>
