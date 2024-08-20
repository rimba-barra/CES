<?php

/**
 * Description of KomisiTran
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Komisi_KomisiTran extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora, Erems_Box_Models_Master_InterProjectPt {

    private $project;
	private $pt;
	private $purchaseletter;
	private $komisitran_no;
	private $komisitran_date;
	private $komisi;
	private $harganetto_klaim;
	private $komisi_ybs;
	private $komisinilai_ybs;
	private $komisippn_ybs;
	private $komisidpp_ybs;
	private $komisipph_ybs;
	private $komisipphpt_ybs;
	private $komisibayar_ybs;
	private $komisi_sales_co;
	private $komisinilai_sales_co;
	private $komisippn_sales_co;
	private $komisidpp_sales_co;
	private $komisipph_sales_co;
	private $komisipphpt_sales_co;
	private $komisibayar_sales_co;
	private $komisi_head_sales;
	private $komisinilai_head_sales;
	private $komisippn_head_sales;
	private $komisidpp_head_sales;
	private $komisipph_head_sales;
	private $komisipphpt_head_sales;
	private $komisibayar_head_sales;
	private $komisi_head_adm;
	private $komisinilai_head_adm;
	private $komisippn_head_adm;
	private $komisidpp_head_adm;
	private $komisipph_head_adm;
	private $komisipphpt_head_adm;
	private $komisibayar_head_adm;
	private $komisi_team;
	private $komisinilai_team;
	private $komisippn_team;
	private $komisidpp_team;
	private $komisipph_team;
	private $komisipphpt_team;
	private $komisibayar_team;
	private $komisi_kas;
	private $komisinilai_kas;
	private $komisippn_kas;
	private $komisidpp_kas;
	private $komisipph_kas;
	private $komisipphpt_kas;
	private $komisibayar_kas;
	private $komisi_manager_marketing;
	private $komisinilai_manager_marketing;
	private $komisippn_manager_marketing;
	private $komisidpp_manager_marketing;
	private $komisipph_manager_marketing;
	private $komisipphpt_manager_marketing;
	private $komisibayar_manager_marketing;
	## Add by RH 21/11/2019 ##
	private $komisi_manager_marketing2;
	private $komisinilai_manager_marketing2;
	private $komisippn_manager_marketing2;
	private $komisidpp_manager_marketing2;
	private $komisipph_manager_marketing2;
	private $komisipphpt_manager_marketing2;
	private $komisibayar_manager_marketing2;
	private $komisi_gm_sales_marketing;
	private $komisinilai_gm_sales_marketing;
	private $komisippn_gm_sales_marketing;
	private $komisidpp_gm_sales_marketing;
	private $komisipph_gm_sales_marketing;
	private $komisipphpt_gm_sales_marketing;
	private $komisibayar_gm_sales_marketing;
	private $komisi_assdir_sales_marketing;
	private $komisinilai_assdir_sales_marketing;
	private $komisippn_assdir_sales_marketing;
	private $komisidpp_assdir_sales_marketing;
	private $komisipph_assdir_sales_marketing;
	private $komisipphpt_assdir_sales_marketing;
	private $komisibayar_assdir_sales_marketing;
	private $komisi_support_proyek;
	private $komisinilai_support_proyek;
	private $komisippn_support_proyek;
	private $komisidpp_support_proyek;
	private $komisipph_support_proyek;
	private $komisipphpt_support_proyek;
	private $komisibayar_support_proyek;
	private $komisi_support1;
	private $komisinilai_support1;
	private $komisippn_support1;
	private $komisidpp_support1;
	private $komisipph_support1;
	private $komisipphpt_support1;
	private $komisibayar_support1;
	private $komisi_gm_sales_marketing1;
	private $komisinilai_gm_sales_marketing1;
	private $komisippn_gm_sales_marketing1;
	private $komisidpp_gm_sales_marketing1;
	private $komisipph_gm_sales_marketing1;
	private $komisipphpt_gm_sales_marketing1;
	private $komisibayar_gm_sales_marketing1;
	## END Add by RH 21/11/2019 ##
	private $total_komisipersen;
	private $total_komisinilai;
	private $total_komisippn;
	private $total_komisidpp;
	private $total_komisipph;
	private $total_komisipphpt;
	private $total_komisibayar;
	private $pl_payment_date_terakhir;
	private $pl_persen_payment;
	private $pl_total_payment;

	public function __construct() {
        parent::__construct();
        $this->embedPrefix = "komisitran_";
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x["komisitran_id"])) {
            $this->setid($x["komisitran_id"]);
        }

		if (isset($x["purchaseletter_purchaseletter_id"])) { $this->getPurchaseletter()->setId($x["purchaseletter_purchaseletter_id"]);}
		if (isset($x["komisitran_no"])) { $this->setKomisitran_no($x["komisitran_no"]);}
		if (isset($x["komisitran_date"])) { $this->setKomisitran_date($x["komisitran_date"]);}
		if (isset($x["komisi_komisi_id"])) { $this->getKomisi()->setId($x["komisi_komisi_id"]);}
		if (isset($x["harganetto_klaim"])) { $this->setHarganetto_klaim($x["harganetto_klaim"]);}
		if (isset($x["komisi_ybs"])) { $this->setKomisi_ybs($x["komisi_ybs"]);}
		if (isset($x["komisinilai_ybs"])) { $this->setKomisinilai_ybs($x["komisinilai_ybs"]);}
		if (isset($x["komisippn_ybs"])) { $this->setKomisippn_ybs($x["komisippn_ybs"]);}
		if (isset($x["komisidpp_ybs"])) { $this->setKomisidpp_ybs($x["komisidpp_ybs"]);}
		if (isset($x["komisipph_ybs"])) { $this->setKomisipph_ybs($x["komisipph_ybs"]);}
		if (isset($x["komisipphpt_ybs"])) { $this->setKomisipphpt_ybs($x["komisipphpt_ybs"]);}
		if (isset($x["komisibayar_ybs"])) { $this->setKomisibayar_ybs($x["komisibayar_ybs"]);}
		if (isset($x["komisi_sales_co"])) { $this->setKomisi_sales_co($x["komisi_sales_co"]);}
		if (isset($x["komisinilai_sales_co"])) { $this->setKomisinilai_sales_co($x["komisinilai_sales_co"]);}
		if (isset($x["komisippn_sales_co"])) { $this->setKomisippn_sales_co($x["komisippn_sales_co"]);}
		if (isset($x["komisidpp_sales_co"])) { $this->setKomisidpp_sales_co($x["komisidpp_sales_co"]);}
		if (isset($x["komisipph_sales_co"])) { $this->setKomisipph_sales_co($x["komisipph_sales_co"]);}
		if (isset($x["komisipphpt_sales_co"])) { $this->setKomisipphpt_sales_co($x["komisipphpt_sales_co"]);}
		if (isset($x["komisibayar_sales_co"])) { $this->setKomisibayar_sales_co($x["komisibayar_sales_co"]);}
		if (isset($x["komisi_head_sales"])) { $this->setKomisi_head_sales($x["komisi_head_sales"]);}
		if (isset($x["komisinilai_head_sales"])) { $this->setKomisinilai_head_sales($x["komisinilai_head_sales"]);}
		if (isset($x["komisippn_head_sales"])) { $this->setKomisippn_head_sales($x["komisippn_head_sales"]);}
		if (isset($x["komisidpp_head_sales"])) { $this->setKomisidpp_head_sales($x["komisidpp_head_sales"]);}
		if (isset($x["komisipph_head_sales"])) { $this->setKomisipph_head_sales($x["komisipph_head_sales"]);}
		if (isset($x["komisipphpt_head_sales"])) { $this->setKomisipphpt_head_sales($x["komisipphpt_head_sales"]);}
		if (isset($x["komisibayar_head_sales"])) { $this->setKomisibayar_head_sales($x["komisibayar_head_sales"]);}
		if (isset($x["komisi_head_adm"])) { $this->setKomisi_head_adm($x["komisi_head_adm"]);}
		if (isset($x["komisinilai_head_adm"])) { $this->setKomisinilai_head_adm($x["komisinilai_head_adm"]);}
		if (isset($x["komisippn_head_adm"])) { $this->setKomisippn_head_adm($x["komisippn_head_adm"]);}
		if (isset($x["komisidpp_head_adm"])) { $this->setKomisidpp_head_adm($x["komisidpp_head_adm"]);}
		if (isset($x["komisipph_head_adm"])) { $this->setKomisipph_head_adm($x["komisipph_head_adm"]);}
		if (isset($x["komisipphpt_head_adm"])) { $this->setKomisipphpt_head_adm($x["komisipphpt_head_adm"]);}
		if (isset($x["komisibayar_head_adm"])) { $this->setKomisibayar_head_adm($x["komisibayar_head_adm"]);}
		if (isset($x["komisi_team"])) { $this->setKomisi_team($x["komisi_team"]);}
		if (isset($x["komisinilai_team"])) { $this->setKomisinilai_team($x["komisinilai_team"]);}
		if (isset($x["komisippn_team"])) { $this->setKomisippn_team($x["komisippn_team"]);}
		if (isset($x["komisidpp_team"])) { $this->setKomisidpp_team($x["komisidpp_team"]);}
		if (isset($x["komisipph_team"])) { $this->setKomisipph_team($x["komisipph_team"]);}
		if (isset($x["komisipphpt_team"])) { $this->setKomisipphpt_team($x["komisipphpt_team"]);}
		if (isset($x["komisibayar_team"])) { $this->setKomisibayar_team($x["komisibayar_team"]);}
		if (isset($x["komisi_kas"])) { $this->setKomisi_kas($x["komisi_kas"]);}
		if (isset($x["komisinilai_kas"])) { $this->setKomisinilai_kas($x["komisinilai_kas"]);}
		if (isset($x["komisippn_kas"])) { $this->setKomisippn_kas($x["komisippn_kas"]);}
		if (isset($x["komisidpp_kas"])) { $this->setKomisidpp_kas($x["komisidpp_kas"]);}
		if (isset($x["komisipph_kas"])) { $this->setKomisipph_kas($x["komisipph_kas"]);}
		if (isset($x["komisipphpt_kas"])) { $this->setKomisipphpt_kas($x["komisipphpt_kas"]);}
		if (isset($x["komisibayar_kas"])) { $this->setKomisibayar_kas($x["komisibayar_kas"]);}
		if (isset($x["komisi_manager_marketing"])) { $this->setKomisi_manager_marketing($x["komisi_manager_marketing"]);}
		if (isset($x["komisinilai_manager_marketing"])) { $this->setKomisinilai_manager_marketing($x["komisinilai_manager_marketing"]);}
		if (isset($x["komisippn_manager_marketing"])) { $this->setKomisippn_manager_marketing($x["komisippn_manager_marketing"]);}
		if (isset($x["komisidpp_manager_marketing"])) { $this->setKomisidpp_manager_marketing($x["komisidpp_manager_marketing"]);}
		if (isset($x["komisipph_manager_marketing"])) { $this->setKomisipph_manager_marketing($x["komisipph_manager_marketing"]);}
		if (isset($x["komisipphpt_manager_marketing"])) { $this->setKomisipphpt_manager_marketing($x["komisipphpt_manager_marketing"]);}
		if (isset($x["komisibayar_manager_marketing"])) { $this->setKomisibayar_manager_marketing($x["komisibayar_manager_marketing"]);}		
		## Add by RH 21/11/2019 ##
		if (isset($x["komisi_manager_marketing2"])) { $this->setKomisi_manager_marketing2($x["komisi_manager_marketing2"]);}
		if (isset($x["komisinilai_manager_marketing2"])) { $this->setKomisinilai_manager_marketing2($x["komisinilai_manager_marketing2"]);}
		if (isset($x["komisippn_manager_marketing2"])) { $this->setKomisippn_manager_marketing2($x["komisippn_manager_marketing2"]);}
		if (isset($x["komisidpp_manager_marketing2"])) { $this->setKomisidpp_manager_marketing2($x["komisidpp_manager_marketing2"]);}
		if (isset($x["komisipph_manager_marketing2"])) { $this->setKomisipph_manager_marketing2($x["komisipph_manager_marketing2"]);}
		if (isset($x["komisipphpt_manager_marketing2"])) { $this->setKomisipphpt_manager_marketing2($x["komisipphpt_manager_marketing2"]);}
		if (isset($x["komisibayar_manager_marketing2"])) { $this->setKomisibayar_manager_marketing2($x["komisibayar_manager_marketing2"]);}		
		if (isset($x["komisi_gm_sales_marketing"])) { $this->setKomisi_gm_sales_marketing($x["komisi_gm_sales_marketing"]);}
		if (isset($x["komisinilai_gm_sales_marketing"])) { $this->setKomisinilai_gm_sales_marketing($x["komisinilai_gm_sales_marketing"]);}
		if (isset($x["komisippn_gm_sales_marketing"])) { $this->setKomisippn_gm_sales_marketing($x["komisippn_gm_sales_marketing"]);}
		if (isset($x["komisidpp_gm_sales_marketing"])) { $this->setKomisidpp_gm_sales_marketing($x["komisidpp_gm_sales_marketing"]);}
		if (isset($x["komisipph_gm_sales_marketing"])) { $this->setKomisipph_gm_sales_marketing($x["komisipph_gm_sales_marketing"]);}
		if (isset($x["komisipphpt_gm_sales_marketing"])) { $this->setKomisipphpt_gm_sales_marketing($x["komisipphpt_gm_sales_marketing"]);}
		if (isset($x["komisibayar_gm_sales_marketing"])) { $this->setKomisibayar_gm_sales_marketing($x["komisibayar_gm_sales_marketing"]);}		
		if (isset($x["komisi_assdir_sales_marketing"])) { $this->setKomisi_assdir_sales_marketing($x["komisi_assdir_sales_marketing"]);}
		if (isset($x["komisinilai_assdir_sales_marketing"])) { $this->setKomisinilai_assdir_sales_marketing($x["komisinilai_assdir_sales_marketing"]);}
		if (isset($x["komisippn_assdir_sales_marketing"])) { $this->setKomisippn_assdir_sales_marketing($x["komisippn_assdir_sales_marketing"]);}
		if (isset($x["komisidpp_assdir_sales_marketing"])) { $this->setKomisidpp_assdir_sales_marketing($x["komisidpp_assdir_sales_marketing"]);}
		if (isset($x["komisipph_assdir_sales_marketing"])) { $this->setKomisipph_assdir_sales_marketing($x["komisipph_assdir_sales_marketing"]);}
		if (isset($x["komisipphpt_assdir_sales_marketing"])) { $this->setKomisipphpt_assdir_sales_marketing($x["komisipphpt_assdir_sales_marketing"]);}
		if (isset($x["komisibayar_assdir_sales_marketing"])) { $this->setKomisibayar_assdir_sales_marketing($x["komisibayar_assdir_sales_marketing"]);}		
		if (isset($x["komisi_support_proyek"])) { $this->setKomisi_support_proyek($x["komisi_support_proyek"]);}
		if (isset($x["komisinilai_support_proyek"])) { $this->setKomisinilai_support_proyek($x["komisinilai_support_proyek"]);}
		if (isset($x["komisippn_support_proyek"])) { $this->setKomisippn_support_proyek($x["komisippn_support_proyek"]);}
		if (isset($x["komisidpp_support_proyek"])) { $this->setKomisidpp_support_proyek($x["komisidpp_support_proyek"]);}
		if (isset($x["komisipph_support_proyek"])) { $this->setKomisipph_support_proyek($x["komisipph_support_proyek"]);}
		if (isset($x["komisipphpt_support_proyek"])) { $this->setKomisipphpt_support_proyek($x["komisipphpt_support_proyek"]);}
		if (isset($x["komisibayar_support_proyek"])) { $this->setKomisibayar_support_proyek($x["komisibayar_support_proyek"]);}		
		if (isset($x["komisi_support1"])) { $this->setKomisi_support1($x["komisi_support1"]);}
		if (isset($x["komisinilai_support1"])) { $this->setKomisinilai_support1($x["komisinilai_support1"]);}
		if (isset($x["komisippn_support1"])) { $this->setKomisippn_support1($x["komisippn_support1"]);}
		if (isset($x["komisidpp_support1"])) { $this->setKomisidpp_support1($x["komisidpp_support1"]);}
		if (isset($x["komisipph_support1"])) { $this->setKomisipph_support1($x["komisipph_support1"]);}
		if (isset($x["komisipphpt_support1"])) { $this->setKomisipphpt_support1($x["komisipphpt_support1"]);}
		if (isset($x["komisibayar_support1"])) { $this->setKomisibayar_support1($x["komisibayar_support1"]);}		
		if (isset($x["komisi_gm_sales_marketing1"])) { $this->setKomisi_gm_sales_marketing1($x["komisi_gm_sales_marketing1"]);}
		if (isset($x["komisinilai_gm_sales_marketing1"])) { $this->setKomisinilai_gm_sales_marketing1($x["komisinilai_gm_sales_marketing1"]);}
		if (isset($x["komisippn_gm_sales_marketing1"])) { $this->setKomisippn_gm_sales_marketing1($x["komisippn_gm_sales_marketing1"]);}
		if (isset($x["komisidpp_gm_sales_marketing1"])) { $this->setKomisidpp_gm_sales_marketing1($x["komisidpp_gm_sales_marketing1"]);}
		if (isset($x["komisipph_gm_sales_marketing1"])) { $this->setKomisipph_gm_sales_marketing1($x["komisipph_gm_sales_marketing1"]);}
		if (isset($x["komisipphpt_gm_sales_marketing1"])) { $this->setKomisipphpt_gm_sales_marketing1($x["komisipphpt_gm_sales_marketing1"]);}
		if (isset($x["komisibayar_gm_sales_marketing1"])) { $this->setKomisibayar_gm_sales_marketing1($x["komisibayar_gm_sales_marketing1"]);}
		## END Add by RH 21/11/2019 ##
		if (isset($x["total_komisipersen"])) { $this->setTotal_komisipersen($x["total_komisipersen"]);}
		if (isset($x["total_komisinilai"])) { $this->setTotal_komisinilai($x["total_komisinilai"]);}
		if (isset($x["total_komisippn"])) { $this->setTotal_komisippn($x["total_komisippn"]);}
		if (isset($x["total_komisidpp"])) { $this->setTotal_komisidpp($x["total_komisidpp"]);}
		if (isset($x["total_komisipph"])) { $this->setTotal_komisipph($x["total_komisipph"]);}
		if (isset($x["total_komisipphpt"])) { $this->setTotal_komisipphpt($x["total_komisipphpt"]);}
		if (isset($x["total_komisibayar"])) { $this->setTotal_komisibayar($x["total_komisibayar"]);}
		if (isset($x["pl_payment_date_terakhir"])) { $this->setPl_payment_date_terakhir($x["pl_payment_date_terakhir"]);}
		if (isset($x["pl_persen_payment"])) { $this->setPl_persen_payment($x["pl_persen_payment"]);}
		if (isset($x["pl_total_payment"])) { $this->setPl_total_payment($x["pl_total_payment"]);}


        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            "komisitran_id" => $this->getId(),
			"purchaseletter_purchaseletter_id" => $this->getPurchaseletter()->getId(),
			"komisitran_no" => $this->getKomisitran_no(),
			"komisitran_date" => $this->getKomisitran_date(),
			"komisi_komisi_id" => $this->getKomisi()->getId(),
			"harganetto_klaim" => $this->getHarganetto_klaim(),
			"komisi_ybs" => $this->getKomisi_ybs(),
			"komisinilai_ybs" => $this->getKomisinilai_ybs(),
			"komisippn_ybs" => $this->getKomisippn_ybs(),
			"komisidpp_ybs" => $this->getKomisidpp_ybs(),
			"komisipph_ybs" => $this->getKomisipph_ybs(),
			"komisipphpt_ybs" => $this->getKomisipphpt_ybs(),
			"komisibayar_ybs" => $this->getKomisibayar_ybs(),
			"komisi_sales_co" => $this->getKomisi_sales_co(),
			"komisinilai_sales_co" => $this->getKomisinilai_sales_co(),
			"komisippn_sales_co" => $this->getKomisippn_sales_co(),
			"komisidpp_sales_co" => $this->getKomisidpp_sales_co(),
			"komisipph_sales_co" => $this->getKomisipph_sales_co(),
			"komisipphpt_sales_co" => $this->getKomisipphpt_sales_co(),
			"komisibayar_sales_co" => $this->getKomisibayar_sales_co(),
			"komisi_head_sales" => $this->getKomisi_head_sales(),
			"komisinilai_head_sales" => $this->getKomisinilai_head_sales(),
			"komisippn_head_sales" => $this->getKomisippn_head_sales(),
			"komisidpp_head_sales" => $this->getKomisidpp_head_sales(),
			"komisipph_head_sales" => $this->getKomisipph_head_sales(),
			"komisipphpt_head_sales" => $this->getKomisipphpt_head_sales(),
			"komisibayar_head_sales" => $this->getKomisibayar_head_sales(),
			"komisi_head_adm" => $this->getKomisi_head_adm(),
			"komisinilai_head_adm" => $this->getKomisinilai_head_adm(),
			"komisippn_head_adm" => $this->getKomisippn_head_adm(),
			"komisidpp_head_adm" => $this->getKomisidpp_head_adm(),
			"komisipph_head_adm" => $this->getKomisipph_head_adm(),
			"komisipphpt_head_adm" => $this->getKomisipphpt_head_adm(),
			"komisibayar_head_adm" => $this->getKomisibayar_head_adm(),
			"komisi_team" => $this->getKomisi_team(),
			"komisinilai_team" => $this->getKomisinilai_team(),
			"komisippn_team" => $this->getKomisippn_team(),
			"komisidpp_team" => $this->getKomisidpp_team(),
			"komisipph_team" => $this->getKomisipph_team(),
			"komisipphpt_team" => $this->getKomisipphpt_team(),
			"komisibayar_team" => $this->getKomisibayar_team(),
			"komisi_kas" => $this->getKomisi_kas(),
			"komisinilai_kas" => $this->getKomisinilai_kas(),
			"komisippn_kas" => $this->getKomisippn_kas(),
			"komisidpp_kas" => $this->getKomisidpp_kas(),
			"komisipph_kas" => $this->getKomisipph_kas(),
			"komisipphpt_kas" => $this->getKomisipphpt_kas(),
			"komisibayar_kas" => $this->getKomisibayar_kas(),
			"komisi_manager_marketing" => $this->getKomisi_manager_marketing(),
			"komisinilai_manager_marketing" => $this->getKomisinilai_manager_marketing(),
			"komisippn_manager_marketing" => $this->getKomisippn_manager_marketing(),
			"komisidpp_manager_marketing" => $this->getKomisidpp_manager_marketing(),
			"komisipph_manager_marketing" => $this->getKomisipph_manager_marketing(),
			"komisipphpt_manager_marketing" => $this->getKomisipphpt_manager_marketing(),
			"komisibayar_manager_marketing" => $this->getKomisibayar_manager_marketing(),
			## Add by RH 21/11/2019 ##
			"komisi_manager_marketing2" => $this->getKomisi_manager_marketing2(),
			"komisinilai_manager_marketing2" => $this->getKomisinilai_manager_marketing2(),
			"komisippn_manager_marketing2" => $this->getKomisippn_manager_marketing2(),
			"komisidpp_manager_marketing2" => $this->getKomisidpp_manager_marketing2(),
			"komisipph_manager_marketing2" => $this->getKomisipph_manager_marketing2(),
			"komisipphpt_manager_marketing2" => $this->getKomisipphpt_manager_marketing2(),
			"komisibayar_manager_marketing2" => $this->getKomisibayar_manager_marketing2(),
			"komisi_gm_sales_marketing" => $this->getKomisi_gm_sales_marketing(),
			"komisinilai_gm_sales_marketing" => $this->getKomisinilai_gm_sales_marketing(),
			"komisippn_gm_sales_marketing" => $this->getKomisippn_gm_sales_marketing(),
			"komisidpp_gm_sales_marketing" => $this->getKomisidpp_gm_sales_marketing(),
			"komisipph_gm_sales_marketing" => $this->getKomisipph_gm_sales_marketing(),
			"komisipphpt_gm_sales_marketing" => $this->getKomisipphpt_gm_sales_marketing(),
			"komisibayar_gm_sales_marketing" => $this->getKomisibayar_gm_sales_marketing(),
			"komisi_assdir_sales_marketing" => $this->getKomisi_assdir_sales_marketing(),
			"komisinilai_assdir_sales_marketing" => $this->getKomisinilai_assdir_sales_marketing(),
			"komisippn_assdir_sales_marketing" => $this->getKomisippn_assdir_sales_marketing(),
			"komisidpp_assdir_sales_marketing" => $this->getKomisidpp_assdir_sales_marketing(),
			"komisipph_assdir_sales_marketing" => $this->getKomisipph_assdir_sales_marketing(),
			"komisipphpt_assdir_sales_marketing" => $this->getKomisipphpt_assdir_sales_marketing(),
			"komisibayar_assdir_sales_marketing" => $this->getKomisibayar_assdir_sales_marketing(),
			"komisi_support_proyek" => $this->getKomisi_support_proyek(),
			"komisinilai_support_proyek" => $this->getKomisinilai_support_proyek(),
			"komisippn_support_proyek" => $this->getKomisippn_support_proyek(),
			"komisidpp_support_proyek" => $this->getKomisidpp_support_proyek(),
			"komisipph_support_proyek" => $this->getKomisipph_support_proyek(),
			"komisipphpt_support_proyek" => $this->getKomisipphpt_support_proyek(),
			"komisibayar_support_proyek" => $this->getKomisibayar_support_proyek(),
			"komisi_support1" => $this->getKomisi_support1(),
			"komisinilai_support1" => $this->getKomisinilai_support1(),
			"komisippn_support1" => $this->getKomisippn_support1(),
			"komisidpp_support1" => $this->getKomisidpp_support1(),
			"komisipph_support1" => $this->getKomisipph_support1(),
			"komisipphpt_support1" => $this->getKomisipphpt_support1(),
			"komisibayar_support1" => $this->getKomisibayar_support1(),
			"komisi_gm_sales_marketing1" => $this->getKomisi_gm_sales_marketing1(),
			"komisinilai_gm_sales_marketing1" => $this->getKomisinilai_gm_sales_marketing1(),
			"komisippn_gm_sales_marketing1" => $this->getKomisippn_gm_sales_marketing1(),
			"komisidpp_gm_sales_marketing1" => $this->getKomisidpp_gm_sales_marketing1(),
			"komisipph_gm_sales_marketing1" => $this->getKomisipph_gm_sales_marketing1(),
			"komisipphpt_gm_sales_marketing1" => $this->getKomisipphpt_gm_sales_marketing1(),
			"komisibayar_gm_sales_marketing1" => $this->getKomisibayar_gm_sales_marketing1(),
			## END Add by RH 21/11/2019 ##			
			"total_komisipersen" => $this->getTotal_komisipersen(),
			"total_komisinilai" => $this->getTotal_komisinilai(),
			"total_komisippn" => $this->getTotal_komisippn(),
			"total_komisidpp" => $this->getTotal_komisidpp(),
			"total_komisipph" => $this->getTotal_komisipph(),
			"total_komisipphpt" => $this->getTotal_komisipphpt(),
			"total_komisibayar" => $this->getTotal_komisibayar(),
			"pl_payment_date_terakhir" => $this->getPl_payment_date_terakhir(),
			"pl_persen_payment" => $this->getPl_persen_payment(),
			"pl_total_payment" => $this->getPl_total_payment()
		);

        return $x;
    }

    function getPurchaseletter() {
        if(!$this->purchaseletter){
            $this->purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetter();
        }
        return $this->purchaseletter;
    }

    function getKomisitran_no() {
        return $this->komisitran_no;
    }

    function getKomisitran_date() {
        return $this->komisitran_date;
    }

    function getKomisi() {
        if(!$this->komisi){
            $this->komisi = new Erems_Models_Komisi_Master_MasterKomisi();
        }
        return $this->komisi;
    }

    function getHarganetto_klaim() {
        return $this->harganetto_klaim;
    }

    function getKomisi_ybs() {
        return $this->komisi_ybs;
    }

    function getKomisinilai_ybs() {
        return $this->komisinilai_ybs;
    }

    function getKomisippn_ybs() {
        return $this->komisippn_ybs;
    }

    function getKomisidpp_ybs() {
        return $this->komisidpp_ybs;
    }

    function getKomisipph_ybs() {
        return $this->komisipph_ybs;
    }
	
    function getKomisipphpt_ybs() {
        return $this->komisipphpt_ybs;
    }

    function getKomisibayar_ybs() {
        return $this->komisibayar_ybs;
    }

    function getKomisi_sales_co() {
        return $this->komisi_sales_co;
    }

    function getKomisinilai_sales_co() {
        return $this->komisinilai_sales_co;
    }

    function getKomisippn_sales_co() {
        return $this->komisippn_sales_co;
    }

    function getKomisidpp_sales_co() {
        return $this->komisidpp_sales_co;
    }

    function getKomisipph_sales_co() {
        return $this->komisipph_sales_co;
    }

    function getKomisipphpt_sales_co() {
        return $this->komisipphpt_sales_co;
    }

    function getKomisibayar_sales_co() {
        return $this->komisibayar_sales_co;
    }

    function getKomisi_head_sales() {
        return $this->komisi_head_sales;
    }

    function getKomisinilai_head_sales() {
        return $this->komisinilai_head_sales;
    }

    function getKomisippn_head_sales() {
        return $this->komisippn_head_sales;
    }

    function getKomisidpp_head_sales() {
        return $this->komisidpp_head_sales;
    }

    function getKomisipph_head_sales() {
        return $this->komisipph_head_sales;
    }

    function getKomisipphpt_head_sales() {
        return $this->komisipphpt_head_sales;
    }

    function getKomisibayar_head_sales() {
        return $this->komisibayar_head_sales;
    }

    function getKomisi_head_adm() {
        return $this->komisi_head_adm;
    }

    function getKomisinilai_head_adm() {
        return $this->komisinilai_head_adm;
    }

    function getKomisippn_head_adm() {
        return $this->komisippn_head_adm;
    }

    function getKomisidpp_head_adm() {
        return $this->komisidpp_head_adm;
    }

    function getKomisipph_head_adm() {
        return $this->komisipph_head_adm;
    }
    function getKomisipphpt_head_adm() {
        return $this->komisipphpt_head_adm;
    }

    function getKomisibayar_head_adm() {
        return $this->komisibayar_head_adm;
    }

    function getKomisi_team() {
        return $this->komisi_team;
    }

    function getKomisinilai_team() {
        return $this->komisinilai_team;
    }

    function getKomisippn_team() {
        return $this->komisippn_team;
    }

    function getKomisidpp_team() {
        return $this->komisidpp_team;
    }

    function getKomisipph_team() {
        return $this->komisipph_team;
    }

    function getKomisipphpt_team() {
        return $this->komisipphpt_team;
    }

    function getKomisibayar_team() {
        return $this->komisibayar_team;
    }

    function getKomisi_kas() {
        return $this->komisi_kas;
    }

    function getKomisinilai_kas() {
        return $this->komisinilai_kas;
    }

    function getKomisippn_kas() {
        return $this->komisippn_kas;
    }

    function getKomisidpp_kas() {
        return $this->komisidpp_kas;
    }

    function getKomisipph_kas() {
        return $this->komisipph_kas;
    }

    function getKomisipphpt_kas() {
        return $this->komisipphpt_kas;
    }

    function getKomisibayar_kas() {
        return $this->komisibayar_kas;
    }

    function getKomisi_manager_marketing() {
        return $this->komisi_manager_marketing;
    }

    function getKomisinilai_manager_marketing() {
        return $this->komisinilai_manager_marketing;
    }

    function getKomisippn_manager_marketing() {
        return $this->komisippn_manager_marketing;
    }

    function getKomisidpp_manager_marketing() {
        return $this->komisidpp_manager_marketing;
    }

    function getKomisipph_manager_marketing() {
        return $this->komisipph_manager_marketing;
    }
    function getKomisipphpt_manager_marketing() {
        return $this->komisipphpt_manager_marketing;
    }

    function getKomisibayar_manager_marketing() {
        return $this->komisibayar_manager_marketing;
    }
	
	function getKomisi_manager_marketing2() {
		return $this->komisi_manager_marketing2;
	}

	function getKomisinilai_manager_marketing2() {
		return $this->komisinilai_manager_marketing2;
	}

	function getKomisippn_manager_marketing2() {
		return $this->komisippn_manager_marketing2;
	}

	function getKomisidpp_manager_marketing2() {
		return $this->komisidpp_manager_marketing2;
	}

	function getKomisipph_manager_marketing2() {
		return $this->komisipph_manager_marketing2;
	}

	function getKomisipphpt_manager_marketing2() {
		return $this->komisipphpt_manager_marketing2;
	}

	function getKomisibayar_manager_marketing2() {
		return $this->komisibayar_manager_marketing2;
	}

	function getKomisi_gm_sales_marketing() {
		return $this->komisi_gm_sales_marketing;
	}

	function getKomisinilai_gm_sales_marketing() {
		return $this->komisinilai_gm_sales_marketing;
	}

	function getKomisippn_gm_sales_marketing() {
		return $this->komisippn_gm_sales_marketing;
	}

	function getKomisidpp_gm_sales_marketing() {
		return $this->komisidpp_gm_sales_marketing;
	}

	function getKomisipph_gm_sales_marketing() {
		return $this->komisipph_gm_sales_marketing;
	}

	function getKomisipphpt_gm_sales_marketing() {
		return $this->komisipphpt_gm_sales_marketing;
	}

	function getKomisibayar_gm_sales_marketing() {
		return $this->komisibayar_gm_sales_marketing;
	}

	function getKomisi_assdir_sales_marketing() {
		return $this->komisi_assdir_sales_marketing;
	}

	function getKomisinilai_assdir_sales_marketing() {
		return $this->komisinilai_assdir_sales_marketing;
	}

	function getKomisippn_assdir_sales_marketing() {
		return $this->komisippn_assdir_sales_marketing;
	}

	function getKomisidpp_assdir_sales_marketing() {
		return $this->komisidpp_assdir_sales_marketing;
	}

	function getKomisipph_assdir_sales_marketing() {
		return $this->komisipph_assdir_sales_marketing;
	}

	function getKomisipphpt_assdir_sales_marketing() {
		return $this->komisipphpt_assdir_sales_marketing;
	}

	function getKomisibayar_assdir_sales_marketing() {
		return $this->komisibayar_assdir_sales_marketing;
	}

	function getKomisi_support_proyek() {
		return $this->komisi_support_proyek;
	}

	function getKomisinilai_support_proyek() {
		return $this->komisinilai_support_proyek;
	}

	function getKomisippn_support_proyek() {
		return $this->komisippn_support_proyek;
	}

	function getKomisidpp_support_proyek() {
		return $this->komisidpp_support_proyek;
	}

	function getKomisipph_support_proyek() {
		return $this->komisipph_support_proyek;
	}

	function getKomisipphpt_support_proyek() {
		return $this->komisipphpt_support_proyek;
	}

	function getKomisibayar_support_proyek() {
		return $this->komisibayar_support_proyek;
	}

	function getKomisi_support1() {
		return $this->komisi_support1;
	}

	function getKomisinilai_support1() {
		return $this->komisinilai_support1;
	}

	function getKomisippn_support1() {
		return $this->komisippn_support1;
	}

	function getKomisidpp_support1() {
		return $this->komisidpp_support1;
	}

	function getKomisipph_support1() {
		return $this->komisipph_support1;
	}

	function getKomisipphpt_support1() {
		return $this->komisipphpt_support1;
	}

	function getKomisibayar_support1() {
		return $this->komisibayar_support1;
	}

	function getKomisi_gm_sales_marketing1() {
		return $this->komisi_gm_sales_marketing1;
	}

	function getKomisinilai_gm_sales_marketing1() {
		return $this->komisinilai_gm_sales_marketing1;
	}

	function getKomisippn_gm_sales_marketing1() {
		return $this->komisippn_gm_sales_marketing1;
	}

	function getKomisidpp_gm_sales_marketing1() {
		return $this->komisidpp_gm_sales_marketing1;
	}

	function getKomisipph_gm_sales_marketing1() {
		return $this->komisipph_gm_sales_marketing1;
	}

	function getKomisipphpt_gm_sales_marketing1() {
		return $this->komisipphpt_gm_sales_marketing1;
	}

	function getKomisibayar_gm_sales_marketing1() {
		return $this->komisibayar_gm_sales_marketing1;
	}

    function getTotal_komisipersen() {
        return $this->total_komisipersen;
    }

    function getTotal_komisinilai() {
        return $this->total_komisinilai;
    }

    function getTotal_komisippn() {
        return $this->total_komisippn;
    }

    function getTotal_komisidpp() {
        return $this->total_komisidpp;
    }

    function getTotal_komisipph() {
        return $this->total_komisipph;
    }
	
    function getTotal_komisipphpt() {
        return $this->total_komisipphpt;
    }

    function getTotal_komisibayar() {
        return $this->total_komisibayar;
    }

    function setPurchaseletter(Erems_Models_Purchaseletter_PurchaseLetter $purchaseletter) {
        $this->purchaseletter = $purchaseletter;
    }

    function setKomisitran_no($komisitran_no) {
        $this->komisitran_no = $komisitran_no;
    }

    function setKomisitran_date($komisitran_date) {
        $this->komisitran_date = $komisitran_date;
    }

    function setKomisi(Erems_Models_Komisi_Master_MasterKomisi $komisi) {
        $this->komisi = $komisi;
    }

    function setHarganetto_klaim($harganetto_klaim) {
        $this->harganetto_klaim = $harganetto_klaim;
    }

    function setKomisi_ybs($komisi_ybs) {
        $this->komisi_ybs = $komisi_ybs;
    }

    function setKomisinilai_ybs($komisinilai_ybs) {
        $this->komisinilai_ybs = $komisinilai_ybs;
    }

    function setKomisippn_ybs($komisippn_ybs) {
        $this->komisippn_ybs = $komisippn_ybs;
    }

    function setKomisidpp_ybs($komisidpp_ybs) {
        $this->komisidpp_ybs = $komisidpp_ybs;
    }

    function setKomisipph_ybs($komisipph_ybs) {
        $this->komisipph_ybs = $komisipph_ybs;
    }

	function setKomisipphpt_ybs($komisipphpt_ybs) {
        $this->komisipphpt_ybs = $komisipphpt_ybs;
    }

    function setKomisibayar_ybs($komisibayar_ybs) {
        $this->komisibayar_ybs = $komisibayar_ybs;
    }

    function setKomisi_sales_co($komisi_sales_co) {
        $this->komisi_sales_co = $komisi_sales_co;
    }

    function setKomisinilai_sales_co($komisinilai_sales_co) {
        $this->komisinilai_sales_co = $komisinilai_sales_co;
    }

    function setKomisippn_sales_co($komisippn_sales_co) {
        $this->komisippn_sales_co = $komisippn_sales_co;
    }

    function setKomisidpp_sales_co($komisidpp_sales_co) {
        $this->komisidpp_sales_co = $komisidpp_sales_co;
    }

    function setKomisipph_sales_co($komisipph_sales_co) {
        $this->komisipph_sales_co = $komisipph_sales_co;
    }

    function setKomisipphpt_sales_co($komisipphpt_sales_co) {
        $this->komisipphpt_sales_co = $komisipphpt_sales_co;
    }

    function setKomisibayar_sales_co($komisibayar_sales_co) {
        $this->komisibayar_sales_co = $komisibayar_sales_co;
    }

    function setKomisi_head_sales($komisi_head_sales) {
        $this->komisi_head_sales = $komisi_head_sales;
    }

    function setKomisinilai_head_sales($komisinilai_head_sales) {
        $this->komisinilai_head_sales = $komisinilai_head_sales;
    }

    function setKomisippn_head_sales($komisippn_head_sales) {
        $this->komisippn_head_sales = $komisippn_head_sales;
    }

    function setKomisidpp_head_sales($komisidpp_head_sales) {
        $this->komisidpp_head_sales = $komisidpp_head_sales;
    }

    function setKomisipph_head_sales($komisipph_head_sales) {
        $this->komisipph_head_sales = $komisipph_head_sales;
    }

    function setKomisipphpt_head_sales($komisipphpt_head_sales) {
        $this->komisipphpt_head_sales = $komisipphpt_head_sales;
    }

    function setKomisibayar_head_sales($komisibayar_head_sales) {
        $this->komisibayar_head_sales = $komisibayar_head_sales;
    }

    function setKomisi_head_adm($komisi_head_adm) {
        $this->komisi_head_adm = $komisi_head_adm;
    }

    function setKomisinilai_head_adm($komisinilai_head_adm) {
        $this->komisinilai_head_adm = $komisinilai_head_adm;
    }

    function setKomisippn_head_adm($komisippn_head_adm) {
        $this->komisippn_head_adm = $komisippn_head_adm;
    }

    function setKomisidpp_head_adm($komisidpp_head_adm) {
        $this->komisidpp_head_adm = $komisidpp_head_adm;
    }

    function setKomisipph_head_adm($komisipph_head_adm) {
        $this->komisipph_head_adm = $komisipph_head_adm;
    }

    function setKomisipphpt_head_adm($komisipphpt_head_adm) {
        $this->komisipphpt_head_adm = $komisipphpt_head_adm;
    }

    function setKomisibayar_head_adm($komisibayar_head_adm) {
        $this->komisibayar_head_adm = $komisibayar_head_adm;
    }

    function setKomisi_team($komisi_team) {
        $this->komisi_team = $komisi_team;
    }

    function setKomisinilai_team($komisinilai_team) {
        $this->komisinilai_team = $komisinilai_team;
    }

    function setKomisippn_team($komisippn_team) {
        $this->komisippn_team = $komisippn_team;
    }

    function setKomisidpp_team($komisidpp_team) {
        $this->komisidpp_team = $komisidpp_team;
    }

    function setKomisipph_team($komisipph_team) {
        $this->komisipph_team = $komisipph_team;
    }

    function setKomisipphpt_team($komisipphpt_team) {
        $this->komisipphpt_team = $komisipphpt_team;
    }

    function setKomisibayar_team($komisibayar_team) {
        $this->komisibayar_team = $komisibayar_team;
    }

    function setKomisi_kas($komisi_kas) {
        $this->komisi_kas = $komisi_kas;
    }

    function setKomisinilai_kas($komisinilai_kas) {
        $this->komisinilai_kas = $komisinilai_kas;
    }

    function setKomisippn_kas($komisippn_kas) {
        $this->komisippn_kas = $komisippn_kas;
    }

    function setKomisidpp_kas($komisidpp_kas) {
        $this->komisidpp_kas = $komisidpp_kas;
    }

    function setKomisipph_kas($komisipph_kas) {
        $this->komisipph_kas = $komisipph_kas;
    }

    function setKomisipphpt_kas($komisipphpt_kas) {
        $this->komisipphpt_kas = $komisipphpt_kas;
    }

    function setKomisibayar_kas($komisibayar_kas) {
        $this->komisibayar_kas = $komisibayar_kas;
    }

    function setKomisi_manager_marketing($komisi_manager_marketing) {
        $this->komisi_manager_marketing = $komisi_manager_marketing;
    }

    function setKomisinilai_manager_marketing($komisinilai_manager_marketing) {
        $this->komisinilai_manager_marketing = $komisinilai_manager_marketing;
    }

    function setKomisippn_manager_marketing($komisippn_manager_marketing) {
        $this->komisippn_manager_marketing = $komisippn_manager_marketing;
    }

    function setKomisidpp_manager_marketing($komisidpp_manager_marketing) {
        $this->komisidpp_manager_marketing = $komisidpp_manager_marketing;
    }

    function setKomisipph_manager_marketing($komisipph_manager_marketing) {
        $this->komisipph_manager_marketing = $komisipph_manager_marketing;
    }

    function setKomisipphpt_manager_marketing($komisipphpt_manager_marketing) {
        $this->komisipphpt_manager_marketing = $komisipphpt_manager_marketing;
    }

    function setKomisibayar_manager_marketing($komisibayar_manager_marketing) {
        $this->komisibayar_manager_marketing = $komisibayar_manager_marketing;
    }
	
	function setKomisi_manager_marketing2($komisi_manager_marketing2) {
		$this->komisi_manager_marketing2 = $komisi_manager_marketing2;
	}

	function setKomisinilai_manager_marketing2($komisinilai_manager_marketing2) {
		$this->komisinilai_manager_marketing2 = $komisinilai_manager_marketing2;
	}

	function setKomisippn_manager_marketing2($komisippn_manager_marketing2) {
		$this->komisippn_manager_marketing2 = $komisippn_manager_marketing2;
	}

	function setKomisidpp_manager_marketing2($komisidpp_manager_marketing2) {
		$this->komisidpp_manager_marketing2 = $komisidpp_manager_marketing2;
	}

	function setKomisipph_manager_marketing2($komisipph_manager_marketing2) {
		$this->komisipph_manager_marketing2 = $komisipph_manager_marketing2;
	}

	function setKomisipphpt_manager_marketing2($komisipphpt_manager_marketing2) {
		$this->komisipphpt_manager_marketing2 = $komisipphpt_manager_marketing2;
	}

	function setKomisibayar_manager_marketing2($komisibayar_manager_marketing2) {
		$this->komisibayar_manager_marketing2 = $komisibayar_manager_marketing2;
	}

	function setKomisi_gm_sales_marketing($komisi_gm_sales_marketing) {
		$this->komisi_gm_sales_marketing = $komisi_gm_sales_marketing;
	}

	function setKomisinilai_gm_sales_marketing($komisinilai_gm_sales_marketing) {
		$this->komisinilai_gm_sales_marketing = $komisinilai_gm_sales_marketing;
	}

	function setKomisippn_gm_sales_marketing($komisippn_gm_sales_marketing) {
		$this->komisippn_gm_sales_marketing = $komisippn_gm_sales_marketing;
	}

	function setKomisidpp_gm_sales_marketing($komisidpp_gm_sales_marketing) {
		$this->komisidpp_gm_sales_marketing = $komisidpp_gm_sales_marketing;
	}

	function setKomisipph_gm_sales_marketing($komisipph_gm_sales_marketing) {
		$this->komisipph_gm_sales_marketing = $komisipph_gm_sales_marketing;
	}

	function setKomisipphpt_gm_sales_marketing($komisipphpt_gm_sales_marketing) {
		$this->komisipphpt_gm_sales_marketing = $komisipphpt_gm_sales_marketing;
	}

	function setKomisibayar_gm_sales_marketing($komisibayar_gm_sales_marketing) {
		$this->komisibayar_gm_sales_marketing = $komisibayar_gm_sales_marketing;
	}

	function setKomisi_assdir_sales_marketing($komisi_assdir_sales_marketing) {
		$this->komisi_assdir_sales_marketing = $komisi_assdir_sales_marketing;
	}

	function setKomisinilai_assdir_sales_marketing($komisinilai_assdir_sales_marketing) {
		$this->komisinilai_assdir_sales_marketing = $komisinilai_assdir_sales_marketing;
	}

	function setKomisippn_assdir_sales_marketing($komisippn_assdir_sales_marketing) {
		$this->komisippn_assdir_sales_marketing = $komisippn_assdir_sales_marketing;
	}

	function setKomisidpp_assdir_sales_marketing($komisidpp_assdir_sales_marketing) {
		$this->komisidpp_assdir_sales_marketing = $komisidpp_assdir_sales_marketing;
	}

	function setKomisipph_assdir_sales_marketing($komisipph_assdir_sales_marketing) {
		$this->komisipph_assdir_sales_marketing = $komisipph_assdir_sales_marketing;
	}

	function setKomisipphpt_assdir_sales_marketing($komisipphpt_assdir_sales_marketing) {
		$this->komisipphpt_assdir_sales_marketing = $komisipphpt_assdir_sales_marketing;
	}

	function setKomisibayar_assdir_sales_marketing($komisibayar_assdir_sales_marketing) {
		$this->komisibayar_assdir_sales_marketing = $komisibayar_assdir_sales_marketing;
	}

	function setKomisi_support_proyek($komisi_support_proyek) {
		$this->komisi_support_proyek = $komisi_support_proyek;
	}

	function setKomisinilai_support_proyek($komisinilai_support_proyek) {
		$this->komisinilai_support_proyek = $komisinilai_support_proyek;
	}

	function setKomisippn_support_proyek($komisippn_support_proyek) {
		$this->komisippn_support_proyek = $komisippn_support_proyek;
	}

	function setKomisidpp_support_proyek($komisidpp_support_proyek) {
		$this->komisidpp_support_proyek = $komisidpp_support_proyek;
	}

	function setKomisipph_support_proyek($komisipph_support_proyek) {
		$this->komisipph_support_proyek = $komisipph_support_proyek;
	}

	function setKomisipphpt_support_proyek($komisipphpt_support_proyek) {
		$this->komisipphpt_support_proyek = $komisipphpt_support_proyek;
	}

	function setKomisibayar_support_proyek($komisibayar_support_proyek) {
		$this->komisibayar_support_proyek = $komisibayar_support_proyek;
	}

	function setKomisi_support1($komisi_support1) {
		$this->komisi_support1 = $komisi_support1;
	}

	function setKomisinilai_support1($komisinilai_support1) {
		$this->komisinilai_support1 = $komisinilai_support1;
	}

	function setKomisippn_support1($komisippn_support1) {
		$this->komisippn_support1 = $komisippn_support1;
	}

	function setKomisidpp_support1($komisidpp_support1) {
		$this->komisidpp_support1 = $komisidpp_support1;
	}

	function setKomisipph_support1($komisipph_support1) {
		$this->komisipph_support1 = $komisipph_support1;
	}

	function setKomisipphpt_support1($komisipphpt_support1) {
		$this->komisipphpt_support1 = $komisipphpt_support1;
	}

	function setKomisibayar_support1($komisibayar_support1) {
		$this->komisibayar_support1 = $komisibayar_support1;
	}

	function setKomisi_gm_sales_marketing1($komisi_gm_sales_marketing1) {
		$this->komisi_gm_sales_marketing1 = $komisi_gm_sales_marketing1;
	}

	function setKomisinilai_gm_sales_marketing1($komisinilai_gm_sales_marketing1) {
		$this->komisinilai_gm_sales_marketing1 = $komisinilai_gm_sales_marketing1;
	}

	function setKomisippn_gm_sales_marketing1($komisippn_gm_sales_marketing1) {
		$this->komisippn_gm_sales_marketing1 = $komisippn_gm_sales_marketing1;
	}

	function setKomisidpp_gm_sales_marketing1($komisidpp_gm_sales_marketing1) {
		$this->komisidpp_gm_sales_marketing1 = $komisidpp_gm_sales_marketing1;
	}

	function setKomisipph_gm_sales_marketing1($komisipph_gm_sales_marketing1) {
		$this->komisipph_gm_sales_marketing1 = $komisipph_gm_sales_marketing1;
	}

	function setKomisipphpt_gm_sales_marketing1($komisipphpt_gm_sales_marketing1) {
		$this->komisipphpt_gm_sales_marketing1 = $komisipphpt_gm_sales_marketing1;
	}

	function setKomisibayar_gm_sales_marketing1($komisibayar_gm_sales_marketing1) {
		$this->komisibayar_gm_sales_marketing1 = $komisibayar_gm_sales_marketing1;
	}

    function setTotal_komisipersen($total_komisipersen) {
        $this->total_komisipersen = $total_komisipersen;
    }

    function setTotal_komisinilai($total_komisinilai) {
        $this->total_komisinilai = $total_komisinilai;
    }

    function setTotal_komisippn($total_komisippn) {
        $this->total_komisippn = $total_komisippn;
    }

    function setTotal_komisidpp($total_komisidpp) {
        $this->total_komisidpp = $total_komisidpp;
    }

    function setTotal_komisipph($total_komisipph) {
        $this->total_komisipph = $total_komisipph;
    }

    function setTotal_komisipphpt($total_komisipphpt) {
        $this->total_komisipphpt = $total_komisipphpt;
    }

    function setTotal_komisibayar($total_komisibayar) {
        $this->total_komisibayar = $total_komisibayar;
    }
    
    function getPl_payment_date_terakhir() {
        return $this->pl_payment_date_terakhir;
    }

    function getPl_persen_payment() {
        return $this->pl_persen_payment;
    }

    function getPl_total_payment() {
        return $this->pl_total_payment;
    }

    function setPl_payment_date_terakhir($pl_payment_date_terakhir) {
        $this->pl_payment_date_terakhir = $pl_payment_date_terakhir;
    }

    function setPl_persen_payment($pl_persen_payment) {
        $this->pl_persen_payment = $pl_persen_payment;
    }

    function setPl_total_payment($pl_total_payment) {
        $this->pl_total_payment = $pl_total_payment;
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

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }
    
    

}
