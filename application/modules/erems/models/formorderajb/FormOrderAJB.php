<?php

/**
 * Description of SMS
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Formorderajb_FormOrderAJB extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora, Erems_Box_Models_Master_InterProjectPt {

    private $project;
    private $pt;
    private $purchaseletter;
    private $nomor;
    private $date;
    private $biayaAjbBbn;
    private $biayaBphtb;
    private $isLunas;
    private $isTerbangun;
    private $isBphtb;
    private $isPbb;
    private $isSudahTerima;
    private $isBiayaAjbBbn;
    private $isSkbSsp;
    private $pbbTahun;
    private $pbbNjop;
    private $pbbLuasTanah;
    private $pbbLuasBangunan;
    private $isTerbitSHGB;
    private $shgbNomor;
    private $shgbLuas;
    private $shgbKelurahan;
    private $isKhususHPL;
    private $terbitgsNo;
    private $terbitgsLuas;
    private $isKtpSuami;
    private $isKtpIstri;
    private $isKskkk;
    private $isAktaKawin;
    private $isNpwp;
    private $isGantiNama;
    private $isAktaKelahiran;
    private $isRetribusi;
    private $retribusiPeriode;
    private $isSpt;
    private $isSppjb;
    private $isBajb;
    private $isImb;
    private $isKprSpk;
    private $kprSpkNote;
    private $isSpTransferCustomer;
    private $isKetDireksi;
    private $note;
    private $pemberiName;
    private $pemberiJabatan;
    private $pemberiTelp;
    private $penerimaName;
    private $penerimaDate;
    private $kirimNotarisDate;
    private $kirimNotarisCp3;
    private $kirimNotarisPenerima;
    private $posisiBerkas;
    private $posisiBerkasCSDate;
    private $posisiBerkasBackOfficeDate;
    private $posisiBerkasCekFinanceDate;
    private $posisiBerkasAmbilSertifikatDate;
    private $posisiBerkasKirimNotarisDate;
	
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
        $this->embedPrefix = "formorderajb_";
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x['formorderajb_id'])) {
            $this->setId($x['formorderajb_id']);
        }
        if (isset($x['purchaseletter_purchaseletter_id'])) {
            $this->getPurchaseletter()->setId($x['purchaseletter_purchaseletter_id']);
        }
        if (isset($x['formorderajb_no'])) {
            $this->setNomor($x['formorderajb_no']);
        }
        if (isset($x['formorderajb_date'])) {
            $this->setDate($x['formorderajb_date']);
        }
        if (isset($x['biaya_ajbbbn'])) {
            $this->setBiayaAjbBbn($x['biaya_ajbbbn']);
        }
        if (isset($x['biaya_bphtb'])) {
            $this->setBiayaBphtb($x['biaya_bphtb']);
        }
        if (isset($x['is_lunas'])) {
            $this->setIsLunas($x['is_lunas']);
        }
        if (isset($x['is_terbangun'])) {
            $this->setIsTerbangun($x['is_terbangun']);
        }
        if (isset($x['is_bphtb'])) {
            $this->setIsBphtb($x['is_bphtb']);
        }
        if (isset($x['is_pbb'])) {
            $this->setIsPbb($x['is_pbb']);
        }
        if (isset($x['is_sudahserahterima'])) {
            $this->setIsSudahTerima($x['is_sudahserahterima']);
        }
        if (isset($x['is_biayaajbbbn'])) {
            $this->setIsBiayaAjbBbn($x['is_biayaajbbbn']);
        }
        if (isset($x['is_skbssp'])) {
            $this->setIsSkbSsp($x['is_skbssp']);
        }
        if (isset($x['pbb_tahun'])) {
            $this->setPbbTahun($x['pbb_tahun']);
        }
        if (isset($x['pbb_njop'])) {
            $this->setPbbNjop($x['pbb_njop']);
        }
        if (isset($x['pbb_luastanah'])) {
            $this->setPbbLuasTanah($x['pbb_luastanah']);
        }
        if (isset($x['pbb_luasbangunan'])) {
            $this->setPbbLuasBangunan($x['pbb_luasbangunan']);
        }
        if (isset($x['is_terbitshgb'])) {
            $this->setIsTerbitSHGB($x['is_terbitshgb']);
        }
        if (isset($x['shgb_no'])) {
            $this->setShgbNomor($x['shgb_no']);
        }
        if (isset($x['shgb_luas'])) {
            $this->setShgbLuas($x['shgb_luas']);
        }
        if (isset($x['shgb_kelurahan'])) {
            $this->setShgbKelurahan($x['shgb_kelurahan']);
        }
        if (isset($x['is_khususHPL'])) {
            $this->setIsKhususHPL($x['is_khususHPL']);
        }
        if (isset($x['terbitgs_no'])) {
            $this->setTerbitgsNo($x['terbitgs_no']);
        }
        if (isset($x['terbitgs_luas'])) {
            $this->setTerbitgsLuas($x['terbitgs_luas']);
        }
        if (isset($x['is_ktpsuami'])) {
            $this->setIsKtpSuami($x['is_ktpsuami']);
        }
        if (isset($x['is_ktpistri'])) {
            $this->setIsKtpIstri($x['is_ktpistri']);
        }
        if (isset($x['is_kskkk'])) {
            $this->setIsKskkk($x['is_kskkk']);
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
        if (isset($x['is_aktakelahiran'])) {
            $this->setIsAktaKelahiran($x['is_aktakelahiran']);
        }
        if (isset($x['is_retribusi'])) {
            $this->setIsRetribusi($x['is_retribusi']);
        }
        if (isset($x['retirbusi_periode'])) {
            $this->setRetribusiPeriode($x['retirbusi_periode']);
        }
        if (isset($x['is_spt'])) {
            $this->setIsSpt($x['is_spt']);
        }
        if (isset($x['is_sppjb'])) {
            $this->setIsSppjb($x['is_sppjb']);
        }
        if (isset($x['is_bajb'])) {
            $this->setIsBajb($x['is_bajb']);
        }
        if (isset($x['is_imb'])) {
            $this->setIsImb($x['is_imb']);
        }
        if (isset($x['is_kprspk'])) {
            $this->setIsKprSpk($x['is_kprspk']);
        }
        if (isset($x['kprspk_note'])) {
            $this->setKprSpkNote($x['kprspk_note']);
        }
        if (isset($x['is_sptransfercustomer'])) {
            $this->setIsSpTransferCustomer($x['is_sptransfercustomer']);
        }
        if (isset($x['is_ketdireksi'])) {
            $this->setIsKetDireksi($x['is_ketdireksi']);
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
            $this->setKirimNotarisDate($x['kirimnotaris_date']);
        }
        if (isset($x['kirimnotaris_cp3'])) {
            $this->setKirimNotarisCp3($x['kirimnotaris_cp3']);
        }
        if (isset($x['kirimnotaris_penerima'])) {
            $this->setKirimNotarisPenerima($x['kirimnotaris_penerima']);
        }
        if (isset($x['posisi_berkasa'])) {
            $this->setPosisiBerkas($x['posisi_berkasa']);
        }
        if (isset($x['posisiberkascs_date'])) {
            $this->setPosisiBerkasCSDate($x['posisiberkascs_date']);
        }
        if (isset($x['posisiberkasbackoffice_date'])) {
            $this->setPosisiBerkasBackOfficeDate($x['posisiberkasbackoffice_date']);
        }
        if (isset($x['posisiberkascekfinance_date'])) {
            $this->setPosisiBerkasCekFinanceDate($x['posisiberkascekfinance_date']);
        }
        if (isset($x['posisiberkasambilsertifikat_date'])) {
            $this->setPosisiBerkasAmbilSertifikatDate($x['posisiberkasambilsertifikat_date']);
        }
        if (isset($x['posisiberkaskirimnotaris_date'])) {
            $this->setPosisiBerkasKirimNotarisDate($x['posisiberkaskirimnotaris_date']);
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
            'formorderajb_id' => $this->getId(),
            'purchaseletter_purchaseletter_id' => $this->getPurchaseletter()->getId(),
            'formorderajb_no' => $this->getNomor(),
            'formorderajb_date' => $this->getDate(),
            'biaya_ajbbbn' => $this->getBiayaAjbBbn(),
            'biaya_bphtb' => $this->getBiayaBphtb(),
            'is_lunas' => $this->getIsLunas(),
            'is_terbangun' => $this->getIsTerbangun(),
            'is_bphtb' => $this->getIsBphtb(),
            'is_pbb' => $this->getIsPbb(),
            'is_sudahserahterima' => $this->getIsSudahTerima(),
            'is_biayaajbbbn' => $this->getIsBiayaAjbBbn(),
            'is_skbssp' => $this->getIsSkbSsp(),
            'pbb_tahun' => $this->getPbbTahun(),
            'pbb_njop' => $this->getPbbNjop(),
            'pbb_luastanah' => $this->getPbbLuasTanah(),
            'pbb_luasbangunan' => $this->getPbbLuasBangunan(),
            'is_terbitshgb' => $this->getIsTerbitSHGB(),
            'shgb_no' => $this->getShgbNomor(),
            'shgb_luas' => $this->getShgbLuas(),
            'shgb_kelurahan' => $this->getShgbKelurahan(),
            'is_khususHPL' => $this->getIsKhususHPL(),
            'terbitgs_no' => $this->getTerbitgsNo(),
            'terbitgs_luas' => $this->getTerbitgsLuas(),
            'is_ktpsuami' => $this->getIsKtpSuami(),
            'is_ktpistri' => $this->getIsKtpIstri(),
            'is_kskkk' => $this->getIsKskkk(),
            'is_aktakawin' => $this->getIsAktaKawin(),
            'is_npwp' => $this->getIsNpwp(),
            'is_gantinama' => $this->getIsGantiNama(),
            'is_aktakelahiran' => $this->getIsAktaKelahiran(),
            'is_retribusi' => $this->getIsRetribusi(),
            'retirbusi_periode' => $this->getRetribusiPeriode(),
            'is_spt' => $this->getIsSpt(),
            'is_sppjb' => $this->getIsSppjb(),
            'is_bajb' => $this->getIsBajb(),
            'is_imb' => $this->getIsImb(),
            'is_kprspk' => $this->getIsKprSpk(),
            'kprspk_note' => $this->getKprSpkNote(),
            'is_sptransfercustomer' => $this->getIsSpTransferCustomer(),
            'is_ketdireksi' => $this->getIsKetDireksi(),
            'note' => $this->getNote(),
            'pemberi_name' => $this->getPemberiName(),
            'pemberi_jabatan' => $this->getPemberiJabatan(),
            'pemberi_telp' => $this->getPemberiTelp(),
            'penerima_name' => $this->getPenerimaName(),
            'penerima_date' => $this->getPenerimaDate(),
            'kirimnotaris_date' => $this->getKirimNotarisDate(),
            'kirimnotaris_cp3' => $this->getKirimNotarisCp3(),
            'kirimnotaris_penerima' => $this->getKirimNotarisPenerima(),
            'posisi_berkasa' => $this->getPosisiBerkas(),
            'posisiberkascs_date' => $this->getPosisiBerkasCSDate(),
            'posisiberkasbackoffice_date' => $this->getPosisiBerkasBackOfficeDate(),
            'posisiberkascekfinance_date' => $this->getPosisiBerkasCekFinanceDate(),
            'posisiberkasambilsertifikat_date' => $this->getPosisiBerkasAmbilSertifikatDate(),
            'posisiberkaskirimnotaris_date' => $this->getPosisiBerkasKirimNotarisDate(),
			
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

    function getPurchaseletter() {
        if (!$this->purchaseletter) {
            $this->purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetter();
        }
        return $this->purchaseletter;
    }

    function getNomor() {
        return $this->nomor;
    }

    function getDate() {
        return $this->date;
    }

    function getBiayaAjbBbn() {
        return $this->biayaAjbBbn;
    }

    function getBiayaBphtb() {
        return $this->biayaBphtb;
    }

    function getIsLunas() {
        return $this->isLunas;
    }

    function getIsTerbangun() {
        return $this->isTerbangun;
    }

    function getIsBphtb() {
        return $this->isBphtb;
    }

    function getIsPbb() {
        return $this->isPbb;
    }

    function getIsSudahTerima() {
        return $this->isSudahTerima;
    }

    function getIsBiayaAjbBbn() {
        return $this->isBiayaAjbBbn;
    }

    function getIsSkbSsp() {
        return $this->isSkbSsp;
    }

    function getPbbTahun() {
        return intval($this->pbbTahun);
    }

    function getPbbNjop() {
        return $this->pbbNjop;
    }

    function getPbbLuasTanah() {
        return floatval($this->pbbLuasTanah);
    }

    function getPbbLuasBangunan() {
        return floatval($this->pbbLuasBangunan);
    }

    function getIsTerbitSHGB() {
        return $this->isTerbitSHGB;
    }

    function getShgbNomor() {
        return $this->shgbNomor;
    }

    function getShgbLuas() {
        return floatval($this->shgbLuas);
    }

    function getShgbKelurahan() {
        return $this->shgbKelurahan;
    }

    function getIsKhususHPL() {
        return $this->isKhususHPL;
    }

    function getTerbitgsNo() {
        return $this->terbitgsNo;
    }

    function getTerbitgsLuas() {
        return floatval($this->terbitgsLuas);
    }

    function getIsKtpSuami() {
        return $this->isKtpSuami;
    }

    function getIsKtpIstri() {
        return $this->isKtpIstri;
    }

    function getIsKskkk() {
        return $this->isKskkk;
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

    function getIsAktaKelahiran() {
        return $this->isAktaKelahiran;
    }

    function getIsRetribusi() {
        return $this->isRetribusi;
    }

    function getRetribusiPeriode() {
        return $this->retribusiPeriode;
    }

    function getIsSpt() {
        return $this->isSpt;
    }

    function getIsSppjb() {
        return $this->isSppjb;
    }

    function getIsBajb() {
        return $this->isBajb;
    }

    function getIsImb() {
        return $this->isImb;
    }

    function getIsKprSpk() {
        return $this->isKprSpk;
    }

    function getKprSpkNote() {
        return $this->kprSpkNote;
    }

    function getIsSpTransferCustomer() {
        return $this->isSpTransferCustomer;
    }

    function getIsKetDireksi() {
        return $this->isKetDireksi;
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

    function getKirimNotarisDate() {
        return $this->kirimNotarisDate;
    }

    function getKirimNotarisCp3() {
        return $this->kirimNotarisCp3;
    }

    function getKirimNotarisPenerima() {
        return $this->kirimNotarisPenerima;
    }

    function getPosisiBerkas() {
        return $this->posisiBerkas;
    }

    function getPosisiBerkasCSDate() {
        return $this->posisiBerkasCSDate;
    }

    function getPosisiBerkasBackOfficeDate() {
        return $this->posisiBerkasBackOfficeDate;
    }

    function getPosisiBerkasCekFinanceDate() {
        return $this->posisiBerkasCekFinanceDate;
    }

    function getPosisiBerkasAmbilSertifikatDate() {
        return $this->posisiBerkasAmbilSertifikatDate;
    }

    function getPosisiBerkasKirimNotarisDate() {
        return $this->posisiBerkasKirimNotarisDate;
    }

    function setPurchaseletter(Erems_Models_Purchaseletter_PurchaseLetter $purchaseletter) {
        $this->purchaseletter = $purchaseletter;
    }

    function setNomor($nomor) {
        $this->nomor = $nomor;
    }

    function setDate($date) {
        $this->date = $date;
    }

    function setBiayaAjbBbn($biayaAjbBbn) {
        $this->biayaAjbBbn = $biayaAjbBbn;
    }

    function setBiayaBphtb($biayaBphtb) {
        $this->biayaBphtb = $biayaBphtb;
    }

    function setIsLunas($isLunas) {
        $this->isLunas = $isLunas;
    }

    function setIsTerbangun($isTerbangun) {
        $this->isTerbangun = $isTerbangun;
    }

    function setIsBphtb($isBphtb) {
        $this->isBphtb = $isBphtb;
    }

    function setIsPbb($isPbb) {
        $this->isPbb = $isPbb;
    }

    function setIsSudahTerima($isSudahTerima) {
        $this->isSudahTerima = $isSudahTerima;
    }

    function setIsBiayaAjbBbn($isBiayaAjbBbn) {
        $this->isBiayaAjbBbn = $isBiayaAjbBbn;
    }

    function setIsSkbSsp($isSkbSsp) {
        $this->isSkbSsp = $isSkbSsp;
    }

    function setPbbTahun($pbbTahun) {
        $this->pbbTahun = $pbbTahun;
    }

    function setPbbNjop($pbbNjop) {
        $this->pbbNjop = $pbbNjop;
    }

    function setPbbLuasTanah($pbbLuasTanah) {
        $this->pbbLuasTanah = $pbbLuasTanah;
    }

    function setPbbLuasBangunan($pbbLuasBangunan) {
        $this->pbbLuasBangunan = $pbbLuasBangunan;
    }

    function setIsTerbitSHGB($isTerbitSHGB) {
        $this->isTerbitSHGB = $isTerbitSHGB;
    }

    function setShgbNomor($shgbNomor) {
        $this->shgbNomor = $shgbNomor;
    }

    function setShgbLuas($shgbLuas) {
        $this->shgbLuas = $shgbLuas;
    }

    function setShgbKelurahan($shgbKelurahan) {
        $this->shgbKelurahan = $shgbKelurahan;
    }

    function setIsKhususHPL($isKhususHPL) {
        $this->isKhususHPL = $isKhususHPL;
    }

    function setTerbitgsNo($terbitgsNo) {
        $this->terbitgsNo = $terbitgsNo;
    }

    function setTerbitgsLuas($terbitgsLuas) {
        $this->terbitgsLuas = $terbitgsLuas;
    }

    function setIsKtpSuami($isKtpSuami) {
        $this->isKtpSuami = $isKtpSuami;
    }

    function setIsKtpIstri($isKtpIstri) {
        $this->isKtpIstri = $isKtpIstri;
    }

    function setIsKskkk($isKskkk) {
        $this->isKskkk = $isKskkk;
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

    function setIsAktaKelahiran($isAktaKelahiran) {
        $this->isAktaKelahiran = $isAktaKelahiran;
    }

    function setIsRetribusi($isRetribusi) {
        $this->isRetribusi = $isRetribusi;
    }

    function setRetribusiPeriode($retribusiPeriode) {
        $this->retribusiPeriode = $retribusiPeriode;
    }

    function setIsSpt($isSpt) {
        $this->isSpt = $isSpt;
    }

    function setIsSppjb($isSppjb) {
        $this->isSppjb = $isSppjb;
    }

    function setIsBajb($isBajb) {
        $this->isBajb = $isBajb;
    }

    function setIsImb($isImb) {
        $this->isImb = $isImb;
    }

    function setIsKprSpk($isKprSpk) {
        $this->isKprSpk = $isKprSpk;
    }

    function setKprSpkNote($kprSpkNote) {
        $this->kprSpkNote = $kprSpkNote;
    }

    function setIsSpTransferCustomer($isSpTransferCustomer) {
        $this->isSpTransferCustomer = $isSpTransferCustomer;
    }

    function setIsKetDireksi($isKetDireksi) {
        $this->isKetDireksi = $isKetDireksi;
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

    function setKirimNotarisDate($kirimNotarisDate) {
        $this->kirimNotarisDate = $kirimNotarisDate;
    }

    function setKirimNotarisCp3($kirimNotarisCp3) {
        $this->kirimNotarisCp3 = $kirimNotarisCp3;
    }

    function setKirimNotarisPenerima($kirimNotarisPenerima) {
        $this->kirimNotarisPenerima = $kirimNotarisPenerima;
    }

    function setPosisiBerkas($posisiBerkas) {
        $this->posisiBerkas = $posisiBerkas;
    }

    function setPosisiBerkasCSDate($posisiBerkasCSDate) {
        $this->posisiBerkasCSDate = $posisiBerkasCSDate;
    }

    function setPosisiBerkasBackOfficeDate($posisiBerkasBackOfficeDate) {
        $this->posisiBerkasBackOfficeDate = $posisiBerkasBackOfficeDate;
    }

    function setPosisiBerkasCekFinanceDate($posisiBerkasCekFinanceDate) {
        $this->posisiBerkasCekFinanceDate = $posisiBerkasCekFinanceDate;
    }

    function setPosisiBerkasAmbilSertifikatDate($posisiBerkasAmbilSertifikatDate) {
        $this->posisiBerkasAmbilSertifikatDate = $posisiBerkasAmbilSertifikatDate;
    }

    function setPosisiBerkasKirimNotarisDate($posisiBerkasKirimNotarisDate) {
        $this->posisiBerkasKirimNotarisDate = $posisiBerkasKirimNotarisDate;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
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

    public function getDatefields() {
        return array("formorderajb_date");
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
