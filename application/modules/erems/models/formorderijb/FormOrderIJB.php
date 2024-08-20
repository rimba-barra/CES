<?php

/**
 * Description of FORM ORDER IJB
 *
 * @author RIZALDI-MIS
 */
class Erems_Models_Formorderijb_FormOrderIJB extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora, Erems_Box_Models_Master_InterProjectPt {

    private $project;
    private $pt;
    private $purchaseletter;
    private $formorderijbNo;
    private $formorderijbDate;
    private $customerName;
    private $customerAddress;
    private $customerCity;
    private $customerPhone;
    private $customerFax;
    private $customerEmail;
    private $biayaSplitz;
    private $landSizeType;
    private $isLunas;
    private $isSudahST;
    private $isBiayaSplitz;
    private $isTerbitshgb;
    private $shgbNo;
    private $shgbLuas;
    private $shgbKelurahan;
    private $isPbb;
    private $pbbTahun;
    private $pbbNjop;
    private $pbbluasTanah;
    private $pbbluasBangunan;
    private $isKtpSuami;
    private $isKtpIstri;
    private $isKsKKK;
    private $isAktaKawin;
    private $isNpwp;
    private $isGantiNama;
    private $isRetribusi;
    private $retirbusiPeriode;
    private $isSpt;
    private $isSppjb;
    private $note;
    private $pemberiName;
    private $pemberiJabatan;
    private $pemberiTelp;
    private $penerimaName;
    private $penerimaDate;
    private $kirimnotarisDate;
    private $kirimnotasiCPS;
    private $kirimnotarisPenerima;
    private $posisiberkasCsDate;
    private $posisiberkasbackofficeDate;
    private $posisiberkascekfinanceDate;
    private $posisiberkasambilsertifikatDate;
    private $posisiberkaskirimnotarisDate;
    private $tglKirimNotaris;
    private $namaNotaris;
    private $noHgbHpl;
    private $noIjbNoAkta;
    private $luasIjb;
    private $keterangan;
    private $catatan;
    private $deleted;
    
	private $pengalihanhakName;
    private $pengalihanhakAddress;
    private $pengalihanhakCity;
    private $pengalihanhakTelephone;
    private $pengalihanhakMobilephone;
    private $pengalihanhakKtp;
	private $pengalihanhakNpwpNo;
    private $pengalihanhakFax;
    private $pengalihanhakEmail;
	
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "formorderijb_";
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x['formorderijb_id'])) {
            $this->setId($x['formorderijb_id']);
        }
        if (isset($x['purchaseletter_purchaseletter_id'])) {
            $this->getPurchaseletter()->setId($x['purchaseletter_purchaseletter_id']);
        }
        if (isset($x['formorderijb_no'])) {
            $this->setFormorderijbNo($x['formorderijb_no']);
        }
        if (isset($x['formorderijb_date'])) {
            $this->setFormorderijbDate($x['formorderijb_date']);
        }
        if (isset($x['customer_name'])) {
            $this->setCustomerName($x['customer_name']);
        }
        if (isset($x['customer_address'])) {
            $this->setCustomerAddress($x['customer_address']);
        }
        if (isset($x['customer_city'])) {
            $this->setCustomerCity($x['customer_city']);
        }
        if (isset($x['customer_phone'])) {
            $this->setCustomerPhone($x['customer_phone']);
        }
        if (isset($x['customer_fax'])) {
            $this->setCustomerFax($x['customer_fax']);
        }
        if (isset($x['customer_email'])) {
            $this->setCustomerEmail($x['customer_email']);
        }
        if (isset($x['biaya_splitz'])) {
            $this->setBiayaSplitz($x['biaya_splitz']);
        }
        if (isset($x['land_size_type'])) {
            $this->setLandSizeType($x['land_size_type']);
        }
        if (isset($x['is_lunas'])) {
            $this->setIsLunas($x['is_lunas']);
        }
        if (isset($x['is_sudahserahterima'])) {
            $this->setIsSudahST($x['is_sudahserahterima']);
        }
        if (isset($x['is_biaya_splitzing'])) {
            $this->setIsBiayaSplitz($x['is_biaya_splitzing']);
        }
        if (isset($x['is_terbitshgb'])) {
            $this->setIsTerbitshgb($x['is_terbitshgb']);
        }
        if (isset($x['shgb_no'])) {
            $this->setShgbNo($x['shgb_no']);
        }
        if (isset($x['shgb_luas'])) {
            $this->setShgbLuas($x['shgb_luas']);
        }
        if (isset($x['shgb_kelurahan'])) {
            $this->setShgbKelurahan($x['shgb_kelurahan']);
        }
        if (isset($x['is_pbb'])) {
            $this->setIsPbb($x['is_pbb']);
        }
        if (isset($x['pbb_tahun'])) {
            $this->setPbbTahun($x['pbb_tahun']);
        }
        if (isset($x['pbb_njop'])) {
            $this->setPbbNjop($x['pbb_njop']);
        }
        if (isset($x['pbb_luastanah'])) {
            $this->setPbbluasTanah($x['pbb_luastanah']);
        }
        if (isset($x['pbb_luasbangunan'])) {
            $this->setPbbluasBangunan($x['pbb_luasbangunan']);
        }
        if (isset($x['is_ktpsuami'])) {
            $this->setIsKtpSuami($x['is_ktpsuami']);
        }
        if (isset($x['is_ktpistri'])) {
            $this->setIsKtpIstri($x['is_ktpistri']);
        }
        if (isset($x['is_kskkk'])) {
            $this->setIsKsKKK($x['is_kskkk']);
        }
        if (isset($x['is_aktakawin'])) {
            $this->setIsAktaKawin($x['is_aktakawin']);
        }
        if (isset($x['is_npwp'])) {
            $this->setIsNpwp($x['is_npwp']);
        }
        if (isset($x['is_gantinama'])) {
            $this->setIsGantiNama($x['is_gantinama']);
        }
        if (isset($x['is_retribusi'])) {
            $this->setIsRetribusi($x['is_retribusi']);
        }
        if (isset($x['retirbusi_periode'])) {
            $this->setRetirbusiPeriode($x['retirbusi_periode']);
        }
        if (isset($x['is_spt'])) {
            $this->setIsSpt($x['is_spt']);
        }
        if (isset($x['is_sppjb'])) {
            $this->setIsSppjb($x['is_sppjb']);
        }
        if (isset($x['note'])) {
            $this->setNote($x['note']);
        }
        if (isset($x['pemberi_name'])) {
            $this->setPemberiName($x['pemberi_name']);
        }
        if (isset($x['pemberi_jabatan'])) {
            $this->setPemberiJabatan($x['pemberi_jabatan']);
        }
        if (isset($x['pemberi_telp'])) {
            $this->setPemberiTelp($x['pemberi_telp']);
        }
        if (isset($x['penerima_name'])) {
            $this->setPenerimaName($x['penerima_name']);
        }
        if (isset($x['penerima_date'])) {
            $this->setPenerimaDate($x['penerima_date']);
        }
        if (isset($x['kirimnotaris_date'])) {
            $this->setKirimnotarisDate($x['kirimnotaris_date']);
        }
        if (isset($x['kirimnotaris_cps'])) {
            $this->setKirimnotasiCPS($x['kirimnotaris_cps']);
        }
        if (isset($x['kirimnotaris_penerima'])) {
            $this->setKirimnotarisPenerima($x['kirimnotaris_penerima']);
        }
        if (isset($x['posisiberkascs_date'])) {
            $this->setPosisiberkasCsDate($x['posisiberkascs_date']);
        }
        if (isset($x['posisiberkasbackoffice_date'])) {
            $this->setPosisiberkasbackofficeDate($x['posisiberkasbackoffice_date']);
        }
        if (isset($x['posisiberkascekfinance_date'])) {
            $this->setPosisiberkascekfinanceDate($x['posisiberkascekfinance_date']);
        }
        if (isset($x['posisiberkasambilsertifikat_date'])) {
            $this->setPosisiberkasambilsertifikatDate($x['posisiberkasambilsertifikat_date']);
        }
        if (isset($x['posisiberkaskirimnotaris_date'])) {
            $this->setPosisiberkaskirimnotarisDate($x['posisiberkaskirimnotaris_date']);
        }
        if (isset($x['tgl_kirim_notaris'])) {
            $this->setTglKirimNotaris($x['tgl_kirim_notaris']);
        }
        if (isset($x['nama_notaris'])) {
            $this->setNamaNotaris($x['nama_notaris']);
        }
        if (isset($x['no_hgb_hpl'])) {
            $this->setNoHgbHpl($x['no_hgb_hpl']);
        }
        if (isset($x['no_ijb_no_akta'])) {
            $this->setNoIjbNoAkta($x['no_ijb_no_akta']);
        }
        if (isset($x['luas_ijb'])) {
            $this->setLuasIjb($x['luas_ijb']);
        }
        if (isset($x['keterangan'])) {
            $this->setKeterangan($x['keterangan']);
        }
        if (isset($x['catatan'])) {
            $this->setCatatan($x['catatan']);
        }
		
		if (isset($x['pengalihanhak_name'])) {
            $this->setPengalihanhakName($x['pengalihanhak_name']);
        }
		if (isset($x['pengalihanhak_address'])) {
            $this->setPengalihanhakAddress($x['pengalihanhak_address']);
        }
		if (isset($x['pengalihanhak_city'])) {
            $this->setPengalihanhakCity($x['pengalihanhak_city']);
        }
		if (isset($x['pengalihanhak_telephone'])) {
            $this->setPengalihanhakTelephone($x['pengalihanhak_telephone']);
        }
		if (isset($x['pengalihanhak_mobilephone'])) {
            $this->setPengalihanhakMobilephone($x['pengalihanhak_mobilephone']);
        }
		if (isset($x['pengalihanhak_ktp'])) {
            $this->setPengalihanhakKtp($x['pengalihanhak_ktp']);
        }
		if (isset($x['pengalihanhak_npwp_no'])) {
            $this->setPengalihanhakNpwpNo($x['pengalihanhak_npwp_no']);
        }
		if (isset($x['pengalihanhak_fax'])) {
            $this->setPengalihanhakFax($x['pengalihanhak_fax']);
        }
		if (isset($x['pengalihanhak_email'])) {
            $this->setPengalihanhakEmail($x['pengalihanhak_email']);
        }
		
        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            'formorderijb_id' => $this->getId(),
            'purchaseletter_purchaseletter_id' => $this->getPurchaseletter()->getId(),
            'formorderijb_no' => $this->getFormorderijbNo(),
            'formorderijb_date' => $this->getFormorderijbDate(),
            'customer_name' => $this->getCustomerName(),
            'customer_address' => $this->getCustomerAddress(),
            'customer_city' => $this->getCustomerCity(),
            'customer_phone' => $this->getCustomerPhone(),
            'customer_fax' => $this->getCustomerFax(),
            'customer_email' => $this->getCustomerEmail(),
            'biaya_splitz' => $this->getBiayaSplitz(),
            'land_size_type' => $this->getLandSizeType(),
            'is_lunas' => $this->getIsLunas(),
            'is_sudahserahterima' => $this->getIsSudahST(),
            'is_biaya_splitzing' => $this->getIsBiayaSplitz(),
            'is_terbitshgb' => $this->getIsTerbitshgb(),
            'shgb_no' => $this->getShgbNo(),
            'shgb_luas' => $this->getShgbLuas(),
            'shgb_kelurahan' => $this->getShgbKelurahan(),
            'is_pbb' => $this->getIsPbb(),
            'pbb_tahun' => $this->getPbbTahun(),
            'pbb_njop' => $this->getPbbNjop(),
            'pbb_luastanah' => $this->getPbbluasTanah(),
            'pbb_luasbangunan' => $this->getPbbluasBangunan(),
            'is_ktpsuami' => $this->getIsKtpSuami(),
            'is_ktpistri' => $this->getIsKtpIstri(),
            'is_kskkk' => $this->getIsKsKKK(),
            'is_aktakawin' => $this->getIsAktaKawin(),
            'is_npwp' => $this->getIsNpwp(),
            'is_gantinama' => $this->getIsGantiNama(),
            'is_retribusi' => $this->getIsRetribusi(),
            'retirbusi_periode' => $this->getRetirbusiPeriode(),
            'is_spt' => $this->getIsSpt(),
            'is_sppjb' => $this->getIsSppjb(),
            'note' => $this->getNote(),
            'pemberi_name' => $this->getPemberiName(),
            'pemberi_jabatan' => $this->getPemberiJabatan(),
            'pemberi_telp' => $this->getPemberiTelp(),
            'penerima_name' => $this->getPenerimaName(),
            'penerima_date' => $this->getPenerimaDate(),
            'kirimnotaris_date' => $this->getKirimnotarisDate(),
            'kirimnotaris_cps' => $this->getKirimnotasiCPS(),
            'kirimnotaris_penerima' => $this->getKirimnotarisPenerima(),
            'posisiberkascs_date' => $this->getPosisiberkasCsDate(),
            'posisiberkasbackoffice_date' => $this->getPosisiberkasbackofficeDate(),
            'posisiberkascekfinance_date' => $this->getPosisiberkascekfinanceDate(),
            'posisiberkasambilsertifikat_date' => $this->getPosisiberkasambilsertifikatDate(),
            'posisiberkaskirimnotaris_date' => $this->getPosisiberkaskirimnotarisDate(),
            'tgl_kirim_notaris' => $this->getTglKirimNotaris(),
            'nama_notaris' => $this->getNamaNotaris(),
            'no_hgb_hpl' => $this->getNoHgbHpl(),
            'no_ijb_no_akta' => $this->getNoIjbNoAkta(),
            'luas_ijb' => $this->getLuasIjb(),
            'keterangan' => $this->getKeterangan(),
            'catatan' => $this->getCatatan(),
			
			'pengalihanhak_name' => $this->getPengalihanhakName(),
            'pengalihanhak_address' => $this->getPengalihanhakAddress(),
            'pengalihanhak_city' => $this->getPengalihanhakCity(),
            'pengalihanhak_telephone' => $this->getPengalihanhakTelephone(),
            'pengalihanhak_mobilephone' => $this->getPengalihanhakMobilephone(),
            'pengalihanhak_ktp' => $this->getPengalihanhakKtp(),
            'pengalihanhak_npwp_no' => $this->getPengalihanhakNpwpNo(),
			'pengalihanhak_fax' => $this->getPengalihanhakFax(),
            'pengalihanhak_email' => $this->getPengalihanhakEmail()
        );

        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

    function getPurchaseletter() {
        if (!$this->purchaseletter) {
            $this->purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetter();
        }
        return $this->purchaseletter;
    }
    
    function setPurchaseletter(Erems_Models_Purchaseletter_PurchaseLetter $purchaseletter) {
        $this->purchaseletter = $purchaseletter;
    }
    
    public function getProject() {
        if (!$this->project) {
            $this->project = new Erems_Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function getPt() {
        if (!$this->pt) {
            $this->pt = new Erems_Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setProject(\Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(\Erems_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    function getFormorderijbDate() {
        return $this->formorderijbDate;
    }

    function setFormorderijbDate($formorderijbDate) {
        $this->formorderijbDate = $formorderijbDate;
    }

    function getFormorderijbNo() {
        return $this->formorderijbNo;
    }

    function getCustomerName() {
        return $this->customerName;
    }

    function getCustomerAddress() {
        return $this->customerAddress;
    }

    function getCustomerCity() {
        return $this->customerCity;
    }

    function getCustomerPhone() {
        return $this->customerPhone;
    }

    function getCustomerFax() {
        return $this->customerFax;
    }

    function getCustomerEmail() {
        return $this->customerEmail;
    }

    function getBiayaSplitz() {
        return $this->biayaSplitz;
    }

    function getLandSizeType() {
        return $this->landSizeType;
    }

    function getIsLunas() {
        return $this->isLunas;
    }

    function getIsSudahST() {
        return $this->isSudahST;
    }

    function getIsBiayaSplitz() {
        return $this->isBiayaSplitz;
    }

    function getIsTerbitshgb() {
        return $this->isTerbitshgb;
    }

    function getShgbNo() {
        return $this->shgbNo;
    }

    function getShgbLuas() {
        return $this->shgbLuas;
    }

    function getShgbKelurahan() {
        return $this->shgbKelurahan;
    }

    function getIsPbb() {
        return $this->isPbb;
    }

    function getPbbTahun() {
        return $this->pbbTahun;
    }

    function getPbbNjop() {
        return $this->pbbNjop;
    }

    function getPbbluasTanah() {
        return $this->pbbluasTanah;
    }

    function getPbbluasBangunan() {
        return $this->pbbluasBangunan;
    }

    function getIsKtpSuami() {
        return $this->isKtpSuami;
    }

    function getIsKtpIstri() {
        return $this->isKtpIstri;
    }

    function getIsKsKKK() {
        return $this->isKsKKK;
    }

    function getIsAktaKawin() {
        return $this->isAktaKawin;
    }

    function getIsNpwp() {
        return $this->isNpwp;
    }

    function getIsGantiNama() {
        return $this->isGantiNama;
    }

    function getIsRetribusi() {
        return $this->isRetribusi;
    }

    function getRetirbusiPeriode() {
        return $this->retirbusiPeriode;
    }

    function getIsSpt() {
        return $this->isSpt;
    }

    function getIsSppjb() {
        return $this->isSppjb;
    }

    function getNote() {
        return $this->note;
    }

    function getPemberiName() {
        return $this->pemberiName;
    }

    function getPemberiJabatan() {
        return $this->pemberiJabatan;
    }

    function getPemberiTelp() {
        return $this->pemberiTelp;
    }

    function getPenerimaName() {
        return $this->penerimaName;
    }

    function getPenerimaDate() {
        return $this->penerimaDate;
    }

    function getKirimnotarisDate() {
        return $this->kirimnotarisDate;
    }

    function getKirimnotasiCPS() {
        return $this->kirimnotasiCPS;
    }

    function getKirimnotarisPenerima() {
        return $this->kirimnotarisPenerima;
    }

    function getPosisiberkasCsDate() {
        return $this->posisiberkasCsDate;
    }

    function getPosisiberkasbackofficeDate() {
        return $this->posisiberkasbackofficeDate;
    }

    function getPosisiberkascekfinanceDate() {
        return $this->posisiberkascekfinanceDate;
    }

    function getPosisiberkasambilsertifikatDate() {
        return $this->posisiberkasambilsertifikatDate;
    }

    function getPosisiberkaskirimnotarisDate() {
        return $this->posisiberkaskirimnotarisDate;
    }

    function getTglKirimNotaris() {
        return $this->tglKirimNotaris;
    }

    function getNamaNotaris() {
        return $this->namaNotaris;
    }

    function getNoHgbHpl() {
        return $this->noHgbHpl;
    }

    function getNoIjbNoAkta() {
        return $this->noIjbNoAkta;
    }

    function getLuasIjb() {
        return $this->luasIjb;
    }

    function getKeterangan() {
        return $this->keterangan;
    }

    function getCatatan() {
        return $this->catatan;
    }


    function getDeleted() {
        return $this->deleted;
    }

    function setFormorderijbNo($formorderijbNo) {
        $this->formorderijbNo = $formorderijbNo;
    }

    function setCustomerName($customerName) {
        $this->customerName = $customerName;
    }

    function setCustomerAddress($customerAddress) {
        $this->customerAddress = $customerAddress;
    }

    function setCustomerCity($customerCity) {
        $this->customerCity = $customerCity;
    }

    function setCustomerPhone($customerPhone) {
        $this->customerPhone = $customerPhone;
    }

    function setCustomerFax($customerFax) {
        $this->customerFax = $customerFax;
    }

    function setCustomerEmail($customerEmail) {
        $this->customerEmail = $customerEmail;
    }

    function setBiayaSplitz($biayaSplitz) {
        $this->biayaSplitz = $biayaSplitz;
    }

    function setLandSizeType($landSizeType) {
        $this->landSizeType = $landSizeType;
    }

    function setIsLunas($isLunas) {
        $this->isLunas = $isLunas;
    }

    function setIsSudahST($isSudahST) {
        $this->isSudahST = $isSudahST;
    }

    function setIsBiayaSplitz($isBiayaSplitz) {
        $this->isBiayaSplitz = $isBiayaSplitz;
    }

    function setIsTerbitshgb($isTerbitshgb) {
        $this->isTerbitshgb = $isTerbitshgb;
    }

    function setShgbNo($shgbNo) {
        $this->shgbNo = $shgbNo;
    }

    function setShgbLuas($shgbLuas) {
        $this->shgbLuas = $shgbLuas;
    }

    function setShgbKelurahan($shgbKelurahan) {
        $this->shgbKelurahan = $shgbKelurahan;
    }

    function setIsPbb($isPbb) {
        $this->isPbb = $isPbb;
    }

    function setPbbTahun($pbbTahun) {
        $this->pbbTahun = $pbbTahun;
    }

    function setPbbNjop($pbbNjop) {
        $this->pbbNjop = $pbbNjop;
    }

    function setPbbluasTanah($pbbluasTanah) {
        $this->pbbluasTanah = $pbbluasTanah;
    }

    function setPbbluasBangunan($pbbluasBangunan) {
        $this->pbbluasBangunan = $pbbluasBangunan;
    }

    function setIsKtpSuami($isKtpSuami) {
        $this->isKtpSuami = $isKtpSuami;
    }

    function setIsKtpIstri($isKtpIstri) {
        $this->isKtpIstri = $isKtpIstri;
    }

    function setIsKsKKK($isKsKKK) {
        $this->isKsKKK = $isKsKKK;
    }

    function setIsAktaKawin($isAktaKawin) {
        $this->isAktaKawin = $isAktaKawin;
    }

    function setIsNpwp($isNpwp) {
        $this->isNpwp = $isNpwp;
    }

    function setIsGantiNama($isGantiNama) {
        $this->isGantiNama = $isGantiNama;
    }

    function setIsRetribusi($isRetribusi) {
        $this->isRetribusi = $isRetribusi;
    }

    function setRetirbusiPeriode($retirbusiPeriode) {
        $this->retirbusiPeriode = $retirbusiPeriode;
    }

    function setIsSpt($isSpt) {
        $this->isSpt = $isSpt;
    }

    function setIsSppjb($isSppjb) {
        $this->isSppjb = $isSppjb;
    }

    function setNote($note) {
        $this->note = $note;
    }

    function setPemberiName($pemberiName) {
        $this->pemberiName = $pemberiName;
    }

    function setPemberiJabatan($pemberiJabatan) {
        $this->pemberiJabatan = $pemberiJabatan;
    }

    function setPemberiTelp($pemberiTelp) {
        $this->pemberiTelp = $pemberiTelp;
    }

    function setPenerimaName($penerimaName) {
        $this->penerimaName = $penerimaName;
    }

    function setPenerimaDate($penerimaDate) {
        $this->penerimaDate = $penerimaDate;
    }

    function setKirimnotarisDate($kirimnotarisDate) {
        $this->kirimnotarisDate = $kirimnotarisDate;
    }

    function setKirimnotasiCPS($kirimnotasiCPS) {
        $this->kirimnotasiCPS = $kirimnotasiCPS;
    }

    function setKirimnotarisPenerima($kirimnotarisPenerima) {
        $this->kirimnotarisPenerima = $kirimnotarisPenerima;
    }

    function setPosisiberkasCsDate($posisiberkasCsDate) {
        $this->posisiberkasCsDate = $posisiberkasCsDate;
    }

    function setPosisiberkasbackofficeDate($posisiberkasbackofficeDate) {
        $this->posisiberkasbackofficeDate = $posisiberkasbackofficeDate;
    }

    function setPosisiberkascekfinanceDate($posisiberkascekfinanceDate) {
        $this->posisiberkascekfinanceDate = $posisiberkascekfinanceDate;
    }

    function setPosisiberkasambilsertifikatDate($posisiberkasambilsertifikatDate) {
        $this->posisiberkasambilsertifikatDate = $posisiberkasambilsertifikatDate;
    }

    function setPosisiberkaskirimnotarisDate($posisiberkaskirimnotarisDate) {
        $this->posisiberkaskirimnotarisDate = $posisiberkaskirimnotarisDate;
    }

    function setTglKirimNotaris($tglKirimNotaris) {
        $this->tglKirimNotaris = $tglKirimNotaris;
    }

    function setNamaNotaris($namaNotaris) {
        $this->namaNotaris = $namaNotaris;
    }

    function setNoHgbHpl($noHgbHpl) {
        $this->noHgbHpl = $noHgbHpl;
    }

    function setNoIjbNoAkta($noIjbNoAkta) {
        $this->noIjbNoAkta = $noIjbNoAkta;
    }

    function setLuasIjb($luasIjb) {
        $this->luasIjb = $luasIjb;
    }

    function setKeterangan($keterangan) {
        $this->keterangan = $keterangan;
    }

    function setCatatan($catatan) {
        $this->catatan = $catatan;
    }

	
	function getPengalihanhakName() {
        return $this->pengalihanhakName;
    }
	function setPengalihanhakName($pengalihanhakName) {
		$this->pengalihanhakName = $pengalihanhakName;
    }
	function getPengalihanhakAddress() {
        return $this->pengalihanhakAddress;
    }
	function setPengalihanhakAddress($pengalihanhakAddress) {
        $this->pengalihanhakAddress = $pengalihanhakAddress;
    }
	function getPengalihanhakCity() {
        return $this->pengalihanhakCity;
    }
	function setPengalihanhakCity($pengalihanhakCity) {
        $this->pengalihanhakCity = $pengalihanhakCity;
    }
	function getPengalihanhakTelephone() {
        return $this->pengalihanhakTelephone;
    }
	function setPengalihanhakTelephone($pengalihanhakTelephone) {
        $this->pengalihanhakTelephone = $pengalihanhakTelephone;
    }
	function getPengalihanhakMobilephone() {
        return $this->pengalihanhakMobilephone;
    }
	function setPengalihanhakMobilephone($pengalihanhakMobilephone) {
        $this->pengalihanhakMobilephone = $pengalihanhakMobilephone;
    }
	function getPengalihanhakKtp() {
        return $this->pengalihanhakKtp;
    }
	function setPengalihanhakKtp($pengalihanhakKtp) {
        $this->pengalihanhakKtp = $pengalihanhakKtp;
    }
	function getPengalihanhakNpwpNo() {
        return $this->pengalihanhakNpwpNo;
    }
	function setPengalihanhakNpwpNo($pengalihanhakNpwpNo) {
        $this->pengalihanhakNpwpNo = $pengalihanhakNpwpNo;
    }
	function getPengalihanhakFax() {
        return $this->pengalihanhakFax;
    }
	function setPengalihanhakFax($pengalihanhakFax) {
        $this->pengalihanhakFax = $pengalihanhakFax;
    }
	function getPengalihanhakEmail() {
        return $this->pengalihanhakEmail;
    }
	function setPengalihanhakEmail($pengalihanhakEmail) {
        $this->pengalihanhakEmail = $pengalihanhakEmail;
    }
    
}
