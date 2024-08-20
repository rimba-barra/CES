<?php
class Erems_PurchaseletterController extends Erems_Box_Models_App_Hermes_AbstractController {

	protected function testingFlag() {
		return FALSE;
	}

	public function flashprintRead() {
		$params = $this->getAppData();
		$hasil = FALSE;
		$pesan = "Sedang proses...";
		$isSendEmail = TRUE;
		$unitId = isset($params["unit_id"]) ? $params["unit_id"] : 0;
		$menit = 30;

		if ($unitId > 0) {
			$gDao = new Erems_Models_Master_GeneralDao();

			//cek jika sudah ada request untuk unit ini
			$tokenExist = $gDao->getFlashWebToken($unitId);
			if (count($tokenExist[1]) > 0) {
				$tokenExist = $tokenExist[1][0];
			}
			else {
				$tokenExist = NULL;
			}

			if ($tokenExist) {
				$expireTime = new DateTime($tokenExist["expire_time"]);
				$now        = new DateTime($tokenExist["currentdate"]);// cek jika sudah lebih dari 30 menit
				$interval   = $now->diff($expireTime);
				$jam        = $interval->format('%R%h');
				$totalMenit = $interval->format('%R%i');
				$totalMenit = ($jam * 60) + $totalMenit;
			}

			// jika sudah expire atau belum ada request
			if (($tokenExist && $totalMenit < 0 ) || !$tokenExist) {
				$token     = sha1(time());

				if ($isSendEmail) {
					$superUserPurchase = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getAuthorizeUser($this->getAppSession()->getProject()->getId(), $this->getAppSession()->getPt()->getId(), "PURCHASELETTER_SUPERUSER");

					if (is_array($superUserPurchase)) {
						if (array_key_exists("mm", $superUserPurchase)) {
							$userId = intval($superUserPurchase["mm"]);
						}
						else {
							$userId = intval($superUserPurchase[0]);
						}
					}
					else {
						$userId = intval($superUserPurchase);
					}

					$dao      = new Erems_Models_Master_UserDao();
					$userInfo = $dao->getUserById($userId);

					$email = $userInfo[0][0]["user_email"];
					$name  = $userInfo[0][0]["user_fullname"];

					$purchaseletterInfoFinal = array(
						"nomor_unit"    => "",
						"nama_customer" => ""
					);

					$purchaseletterDao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
					$pUnit             = new Erems_Models_Unit_Unit();
					$pUnit->setId($unitId);

					$purchaseletterInfo = $purchaseletterDao->getOneByUnit($pUnit);
					if (is_array($purchaseletterInfo)) {
						if (count($purchaseletterInfo) > 1) {
							if (is_array($purchaseletterInfo[1])) {
								if (count($purchaseletterInfo[1]) > 0) {
									$purchaseletterInfoFinal["nomor_unit"]    = $purchaseletterInfo[1][0]["unit_unit_number"];
									$purchaseletterInfoFinal["nama_customer"] = $purchaseletterInfo[1][0]["customer_name"];
								}
							}
						}
					}

					$modules = 'erems/bypass/status/';
		            $urlData = 'user=API&pass=API&modules=' . $modules . '&mode_read=approve_purchaseletter_flashprint&token=' . $token;

					$url = 'http' . ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') ? 's' : '') . '://' . $_SERVER['HTTP_HOST'] . str_replace('/public', '', str_replace('//', '/', dirname($_SERVER['SCRIPT_NAME']))) . '/reroute.php/' . base64_encode($urlData);

					$emailSend = Erems_Models_App_Box_PurchaseletterProcessor::flashprintEmailB($email, $name, $menit, $token, $purchaseletterInfoFinal, $url);
					$hasil     = $emailSend["STATUS"];

					if(empty($email)){
						$pesan = "Email kosong, tidak bisa kirim email.";
					}
					else if (!$hasil) {
						$pesan = "Terjadi kesalahan ketika mengirim email ke : " . $email;
					}
					else{
						$saveToken = $gDao->saveFlashWebToken($this->getAppSession()->getUser()->getId(), $unitId, $token, $menit);
					}
				}
			}
			else {
				$approved = intval($tokenExist["approved"]);
				if ($approved > 0) { /// jika sudah diapprove
					$hasil = 2;
					$pesan = "Approved!";
				}
				else {
					$pesan = "Request flash print untuk unit ini sudah terdaftar. Batas waktu : " . $totalMenit . " menit lagi untuk di approve.";
				}
			}
			//end cek jika
		}
		else {
			$pesan = "Unit tidak valid.";
		}

		$arrayRespon = array(
			"HASIL" => $hasil,
			"MSG"   => $pesan
		);

		return Erems_Box_Tools::instantRead($arrayRespon, array());
	}

	public function unitdetailRead() {
		$req    = $this->getAppRequest();
		$ses    = $this->getAppSession();
		$params = $this->getAppData();

		$dao        = new Erems_Models_Unit_UnitDao();
		$unitfilter = new Erems_Models_Unit_Unit();

		$unitfilter->setId(intval($params["unit_id"]));
		$unitDetail = $dao->getOne($unitfilter);

		$daoPL = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$pricelist           = $daoPL->getPriceList($req, $ses);
		$pricelist_koefisien = $daoPL->getPriceListKoefisien($req, $ses);

		$arrayRespon = array(
			"DETAIL"              => $unitDetail,
			'pricelist'           => $pricelist,
			'pricelist_koefisien' => $pricelist_koefisien
		);

		return Erems_Box_Tools::instantRead($arrayRespon, array());
	}

	public function scheduleadvanceinitRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$creator = new Erems_Box_Models_App_Creator();

		$mc = new Erems_Models_App_Masterdata_ScheduleType();
		$ac = $mc->prosesDataWithSession($this->getAppSession(), TRUE);

		$dm->setHasil(array($ac));

		return $dm;
	}

	public function cekapprovalverificationRead() {
		$ses    = $this->getAppSession();
		$params = $this->getAppData();

		$dao = new Erems_Models_Verification_Dao();
		$v   = new Erems_Models_Verification_Verification();
		$v->getUnit()->setId(intval($params["unit_id"]));
		$v->setProject($ses->getProject());
		$v->setPt($ses->getPt());
		$record = $dao->getByUnit($v, array('is_approve' => 1));

		$verified = FALSE;
		$data     = NULL;
		if (count($record[0]) > 0) {
			$verified = (boolean) $record[0][0]["is_approve"];
			$data     = $record[0][0];
		}

		$arrayRespon = array(
			"DISCOUNT_VERIFIED" => $verified,
			"DATA"              => $data
		);
		return Erems_Box_Tools::instantRead($arrayRespon, array());
	}

	public function allRead() {
		$ses       = $this->getAppSession();
		$req       = $this->getAppRequest();
		$params    = $this->getAppData();
		$projectid = $ses->getProject()->getId();
		$ptid      = $ses->getPt()->getId();
		$genco     = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectid, $ptid);

		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('unitb', 'clusterb', 'blockb', 'productcategory', 'type', 'salesman', 'collector', 'customer', 'citraclub', 'pricetype', 'pengalihanhak'), array('deletedRows'));

		$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$pl  = new Erems_Models_Purchaseletter_PurchaseLetter();
		$this->setArrayTable($pl, $params);
		$hasil = $dao->getAll($req, $ses, $pl);

		$checkCanSPTDraft  = $genco->checkCanSPTDraft();
		$checkDataCustomer = $genco->checkDataCustomer();

		array_push($hasil, $checkCanSPTDraft, $checkDataCustomer);
		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function approverescheduleRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);


		$data = $this->getAppData();
		$res = new Erems_Models_Purchaseletter_Reschedule();
		$res->setArrayTable($data);
		$res->setModiBy($this->getAppSession()->getUser()->getId());

		$dao   = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$hasil = $dao->approveReschedule($res);

		$otherAT = array(array(
			"STATUS" => $hasil,
			"MSG"    => '...'
		));

		$dm->setHasil(array($otherAT));

		return $dm;
	}

	public function deleterescheduleRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$param          = $this->getAppData();
		$data           = $param['data'];
		$isUsedApproval = $param['is_used_verification'];

		$dao   = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$hasil = $dao->deletedReschedule($data, $isUsedApproval, $this->getAppSession());

		$otherAT = array(array(
			"DATA" => $hasil,
			"MSG"  => '...'
		));

		$dm->setHasil(array($otherAT));

		return $dm;
	}

	public function paymentschemeRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$data     = $this->getAppData();
		$template = $data["template"];
		$ps       = new Erems_Models_Purchaseletter_PaymentScheme($template);

		$ps->process($data);

		$otherAT = array(array(
			"PRINTOUT" => TRUE,
			"MSG"      => 'Payment Scheme',
			"URL"      => $ps->getUrl()
		));

		$dm->setHasil(array($otherAT));

		return $dm;
	}

	public function printoutRead() {
		$ses       = $this->getAppSession();
		$params    = $this->getAppData();
		$projectid = $ses->getProject()->getId();
		$ptid      = $ses->getPt()->getId();

		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectid, $ptid);
		$paramsRequestResult = Erems_Box_Tools::globalParamsExistNew($ses, "PURCHASELETTER");

		$pl = new Erems_Models_Purchaseletter_PurchaseLetter();
		$pl->setArrayTable($params);
		$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();

		if($pl->getIsDraft() == 'true'){
			$hasil    = $dao->getOneForPrintoutDraft($pl->getId());
			$hasilSch = $dao->getScheduleDraftById($pl);
		}
		else{
			$hasil    = $dao->getOneForPrintout($pl->getId());
			$hasilSch = $dao->getScheduleById($pl);
		}

		$hasil    = $hasil[1][0];
		$hasilSch = $hasilSch[1];

		$umSch                = array();
		$fixSch               = array();
		$tempSisaAngsuranCode = "";

		foreach ($hasilSch as $k => $sch) {
			if ($sch['scheduletype_scheduletype_id'] == Erems_Box_Config::SCHTYPE_TANDAJADI) {
				if (!key_exists(Erems_Box_Config::SCHTYPE_TANDAJADI, $fixSch)) {
					$fixSch[Erems_Box_Config::SCHTYPE_TANDAJADI] = array();
				}
				$fixSch[Erems_Box_Config::SCHTYPE_TANDAJADI][] = $sch;
			}
			else if ($sch['scheduletype_scheduletype_id'] == Erems_Box_Config::SCHTYPE_UANGMUKA) {
				if (!key_exists(Erems_Box_Config::SCHTYPE_UANGMUKA, $fixSch)) {
					$fixSch[Erems_Box_Config::SCHTYPE_UANGMUKA] = array();
				}
				$fixSch[Erems_Box_Config::SCHTYPE_UANGMUKA][] = $sch;
			} else {
				if (!key_exists(1987, $fixSch)) {
					$fixSch[1987] = array();
				}
				$fixSch[1987][] = $sch;
			}
		}

		$p = new Erems_Box_Library_MyWordParser();

		$p->useTable = $genco->getPrintoutPLMT();

		$p->addLoopingField(array('duedate', 'amount', 'count', 'code', 'codenourut'), count($fixSch[1987]));
		$p->addLoopingField(array('tjdate', 'tjamount', 'tjnourut'), count($fixSch[Erems_Box_Config::SCHTYPE_TANDAJADI]));
		$p->addLoopingField(array('umdate', 'umamount', 'umcount', 'umnourut'), count($fixSch[Erems_Box_Config::SCHTYPE_UANGMUKA]));

		$data  = $hasil;
		$count = array(1, 1, 1);

		$totalAngsuran  = 0.0;
		$totalUangMuka  = 0.0;
		$totalTandaJadi = 0.0;
		$totalAngsuran2 = 0.0;

		$no_urut = 1;
		foreach ($fixSch as $k => $schGroup) {
			foreach ($schGroup as $sch) {
				if ($k == Erems_Box_Config::SCHTYPE_TANDAJADI) {
					$data['tjnourut' . $count[0]]     = $no_urut;
					$data['tjdate' . $count[0]]   = Erems_Box_Tools::formatDate($sch['duedate'], 'd M Y');
					$data['tjamount' . $count[0]] = Erems_Box_Tools::toCurrency($sch['amount']);
					$totalTandaJadi               += $sch['amount'];
					$count[0] ++;
				} else if ($k == Erems_Box_Config::SCHTYPE_UANGMUKA) {
					$data['umnourut' . $count[1]] = $no_urut;
					$data['umcount' . $count[1]]  = $count[1];
					$data['umdate' . $count[1]]   = Erems_Box_Tools::formatDate($sch['duedate'], 'd M Y');
					$data['umamount' . $count[1]] = Erems_Box_Tools::toCurrency($sch['amount']);
					$makstglUM                    = Erems_Box_Tools::formatDate($sch['duedate'], 'd M Y');
					$totalUangMuka                += $sch['amount'];
					$count[1] ++;
				} else {
					$data['codenourut' . $count[2]] = $no_urut;
					$data['count' . $count[2]]      = $count[2];
					$data['duedate' . $count[2]]    = $genco->getDueDateSchedulePrintout(Erems_Box_Tools::formatDate($sch['duedate'], 'd M Y'), $sch);
					$data['amount' . $count[2]]     = Erems_Box_Tools::toCurrency($sch['amount']);
					$data['code' . $count[2]]       = $sch['scheduletype_scheduletype'];
					$tempSisaAngsuranCode           = $sch['scheduletype_scheduletype'];
					$totalAngsuran                  += $sch['amount'];
					$totalAngsuran2                 += $sch['amount'];
					$count[2] ++;
				}
				$no_urut++;
			}
		}

		// untuk cetakan citraland ambon
		$data['kosong']               = " ";
		$totalRowForAmbonScheduleList = 1;
		$countTandaJadi               = $count[0] - 1;
		$countUangMuka                = $count[1] - 1;
		$countAngsuran                = $count[2] - 1;

		$data['premi_note'] = "";
		if ($countUangMuka >= 12) {
			$data['premi_note'] = "Biaya premi asuransi jiwa untuk proteksi pembayaran Uang Muka dari PT Asuransi Ciputra Indonesia (CiputraLife)";
		}

		$data["count_uangmuka"]     = $countUangMuka;
		$data["count_angsuran"]     = $countAngsuran;
		$data["unit_floor_size"]    = $data["unit_floor_size"] + 0;
		$data["unit_building_size"] = $data["unit_building_size"] + 0;
		$data["unit_land_size"]     = $data["unit_land_size"] + 0;
		$data["jenis_biaya_include"] = str_replace('\n ', '                                                                                                                                       ', $data["jenis_biaya_include"]);
		$data["jenis_biaya_exclude"] = str_replace('\n ', '                                                                                                                                       ', $data["jenis_biaya_exclude"]);
        $data["jenis_biaya_include_skhp"] = str_replace('\n ', '                                                                                                                                       ', $data["jenis_biaya_include_skhp"]);
		$data["jenis_biaya_exclude_skhp"] = str_replace('\n ', '                                                                                                                                       ', $data["jenis_biaya_exclude_skhp"]);
        $data["promosh2"] = str_replace('\n ', '                                                                                                                                       ', $data["promosh2"]);



		if ($totalTandaJadi > 0) {
			$data['schlistd' . $totalRowForAmbonScheduleList] = "Membayar uang tanda jadi sebesar";
			$data['schlistb' . $totalRowForAmbonScheduleList] = Erems_Box_Tools::toCurrency($totalTandaJadi);
			if ($countTandaJadi > 1) {
				$data['schlistc' . $totalRowForAmbonScheduleList] = "Dicicil " . $countTandaJadi . " x Setiap Tanggal " . date("d", strtotime($data['tjdate1'])) . " mulai dari Bulan " . date("m", strtotime($data['tjdate1'])) . " " . date("Y", strtotime($data['tjdate1'])) . " – " . date("m", strtotime($data['tjdate' . $countTandaJadi])) . " " . date("Y", strtotime($data['tjdate' . $countTandaJadi])) . " @Rp. " . $data['tjamount' . $countTandaJadi];
			}
			else {
				$data['schlistc' . $totalRowForAmbonScheduleList] = $data['tjdate1'];
			}
			$totalRowForAmbonScheduleList++;
		}

		if ($totalUangMuka > 0) {
			$data['schlistd' . $totalRowForAmbonScheduleList] = "Membayar uang muka sebesar";
			$data['schlistb' . $totalRowForAmbonScheduleList] = Erems_Box_Tools::toCurrency($totalUangMuka);
			if ($countUangMuka > 1) {
				$data['schlistc' . $totalRowForAmbonScheduleList] = "Dicicil " . $countUangMuka . " x Setiap Tanggal " . date("d", strtotime($data['umdate1'])) . " mulai dari Bulan " . date("m", strtotime($data['umdate1'])) . " " . date("Y", strtotime($data['umdate1'])) . " – " . date("m", strtotime($data['umdate' . $countUangMuka])) . " " . date("Y", strtotime($data['umdate' . $countUangMuka])) . " @Rp. " . $data['umamount' . $countUangMuka];
			}
			else {
				$data['schlistc' . $totalRowForAmbonScheduleList] = $data['umdate1'];
			}

			$totalRowForAmbonScheduleList++;
		}

		if ($totalAngsuran > 0) {
			$data['schlistd' . $totalRowForAmbonScheduleList] = "Membayar sisa harga sebesar";
			$data['schlistb' . $totalRowForAmbonScheduleList] = Erems_Box_Tools::toCurrency($totalAngsuran);
			if ($countAngsuran > 1) {
				$data['schlistc' . $totalRowForAmbonScheduleList] = "Dicicil " . $countAngsuran . " x Setiap Tanggal " . date("d", strtotime($data['duedate1'])) . " mulai dari Bulan " . date("m", strtotime($data['duedate1'])) . " " . date("Y", strtotime($data['duedate1'])) . " – " . date("m", strtotime($data['duedate' . $countAngsuran])) . " " . date("Y", strtotime($data['duedate' . $countAngsuran])) . " @Rp. " . $data['amount' . $countAngsuran];
			} else {
				$data['schlistc' . $totalRowForAmbonScheduleList] = $data['duedate1'];
			}
			$totalRowForAmbonScheduleList++;
		}

		$p->addLoopingField(array('schlistd', 'schlistb', 'schlistc'), $totalRowForAmbonScheduleList - 1);

		// end untuk cetakan citraland ambon
		//example
		//Start of simplecountwords

		$count         = array(1, 1, 1);
		$totalAngsuran = 0.0;
		$tmpamount2_   = 0.0;
		$countx        = 0;
		$init          = 0;
		$idx           = 0;

		foreach ($fixSch as $k => $schGroup) {
			foreach ($schGroup as $sch) {
				if ($k !== Erems_Box_Config::SCHTYPE_TANDAJADI && $k !== Erems_Box_Config::SCHTYPE_UANGMUKA) {
					$data['count2_' . $count[2]]   = $count[2];
					$data['duedate2_' . $count[2]] = $sch['duedate'];
					$data['amount2_' . $count[2]]  = $sch['amount'];
					$data['code2_' . $count[2]]    = $sch['scheduletype_scheduletype'];
					$tempSisaAngsuranCode          = $sch['scheduletype_scheduletype'];

					if ($init == 0) {
						$countx      = $countx + 1;
						$tmpamount2_ = $data['amount2_' . $count[2]];
						$init        = 1;
					} else {
						if ($tmpamount2_ == $data['amount2_' . $count[2]]) {
							$countx                      = $countx + 1;
							$tmpamount2_                 = $data['amount2_' . $count[2]];
							$data['count2_' . $count[2]] = $countx;
						}
						else {
							$data['simplecount'][$idx]['payment_from']  = $init;
							$data['simplecount'][$idx]['payment_until'] = $count[2] - 1;
							$data['simplecount'][$idx]['amount']        = $tmpamount2_;
							$data['simplecount'][$idx]['total']         = $countx;
							$data['simplecount'][$idx]['duedate_until'] = Erems_Box_Tools::formatDate($data['duedate2_' . ($count[2] - 1)], 'd M Y');
							$data['simplecount'][$idx]['duedate_from']  = Erems_Box_Tools::formatDate($data['duedate2_' . ($count[2] - $countx)], 'd M Y');

							$finaldate = $data['duedate2_' . $count[2]];
							$idx++;
							$init = $count[2];
							$tmpamount2_ = $data['amount2_' . $count[2]];
							$countx = 1;
						}
					}

					$totalAngsuran += $sch['amount2_'];
					$count[2] ++;
				}

				//end
				$data['simplecount'][$idx]['payment_until'] = $count[2] - 1;
				$data['simplecount'][$idx]['amount'] = $tmpamount2_;
				$data['simplecount'][$idx]['total'] = $countx;
				$data['simplecount'][$idx]['duedate_until'] = Erems_Box_Tools::formatDate($finaldate, 'd M Y');
				//end
			}
		}

		//------ generate words
		$br = "

                    ";
		$words = " ";
		$cnt = $count[2] - 1;
		if ($cnt > 1) {
			$words .= "Yang akan diatur sebagai berikut :" . $br;
			$words .= "Diangsur " . $cnt . " x  " . $br;
		}
		foreach ($data['simplecount'] as $dsc) {
			$c_amount = Erems_Box_Tools::toCurrency($dsc['amount']);
			if (array_key_exists('payment_from', $dsc)) {
				$words .= "Angs. " . $dsc['payment_from'] . " s/d " . $dsc['payment_until'] . " @ Rp " . $c_amount . ",-/bln Mulai " . $dsc['duedate_from'] . " s/d  " . $dsc['duedate_until'] . "  " . $br;
			}
			else {
				if ($cnt > 1) {
					if ($dsc['duedate_until'] == "01 Jan 1970") { //if nilai schedule INH sama semua
						$duedate2_1 = Erems_Box_Tools::formatDate($data['duedate2_1'], 'd M Y'); //angs 1
						$dsc['duedate_until'] = Erems_Box_Tools::formatDate($sch['duedate'], 'd M Y');
						$words .= "Angs. 1-" . $dsc['payment_until'] . " @ Rp " . $c_amount . ",-/bln Angs. 1 dibayar tgl " . $duedate2_1 . " - Angs. " . $dsc['payment_until'] . " dibayar tgl " . $dsc['duedate_until'];
					}
					else {
						$words .= "Angs. " . $dsc['payment_until'] . " @ Rp " . $c_amount . ",-/bln dibayar tgl " . $dsc['duedate_until'];
					}
				}
				else {
					$words .= "";
				}
			}
		}
		$words .= " ";
		$data["simplecountwords"] = $words;
		//End of simplecountwords

		$data["total_um"]     = Erems_Box_Tools::toCurrency($totalUangMuka);
		$data["last_um_date"] = $makstglUM;

		$data["uangmukacount"]   = $count[1] - 1;
		$data["amountcount"]     = $count[2] - 1; /// sisa cicilan time
		$data["amountdateawal"]  = $data['duedate1'];
		$data["amountdateakhir"] = isset($data['duedate' . ($count[2] - 1)]) ? $data['duedate' . ($count[2] - 1)] : $data["amountdateawal"];

		$angsuranPerBulan     = doubleval($data['total_angsuran']) / $count[2];
		$angsuranPerBulanText = Erems_Box_Tools::toCurrency($angsuranPerBulan);

		$data["total_ppn"]          = doubleval($data["price_harga_ppntanah"]) + doubleval($data["price_harga_ppnbangunan"]);
		$data["total_ppn2"]         = doubleval($data["price_harga_ppntanah"]) + doubleval($data["price_harga_ppnbangunan"]) + doubleval($data["price_ppnbm"]);
		$data["total_ppn2asuransi"] = doubleval($data["total_ppn2"]) + doubleval($data["biaya_asuransi"]);

		$data["total_ppn"]          = Erems_Box_Tools::toCurrency($data["total_ppn"]);
		$data["total_ppn2"]         = Erems_Box_Tools::toCurrency($data["total_ppn2"]);
		$data["total_ppn2asuransi"] = Erems_Box_Tools::toCurrency($data["total_ppn2asuransi"]);

		$data["total_diskon"] = doubleval($data["price_harga_dischargadasar"]) + doubleval($data["price_harga_dischargatanah"]) + doubleval($data["price_harga_dischargabangunan"]) + doubleval($data["harga_salesdisc"]);

		$currencyList = array('price_harga_jual', 'price_harga_netto', 'price_harga_ppntanah');

		foreach ($currencyList as $field) {
			$data[$field] = Erems_Box_Tools::toCurrency($data[$field]);
		}

		$data['purchase_date'] = Erems_Box_Tools::formatDate($data['purchase_date']);


		// building/land size int
		$data['unit_building_size_int'] = intval($hasil['unit_building_size']);
		$data['unit_land_size_int']     = intval($hasil['unit_land_size']);
		$data['unit_floor_size_int']    = intval($hasil['unit_floor_size']);

		/// terbilang

		$data['terbilanglt']  = Erems_Box_Library_Terbilang::terbilang($hasil['unit_land_size'], 3);
		$data['terbilanglb']  = Erems_Box_Library_Terbilang::terbilang($hasil['unit_building_size'], 3);
		$data['terbilangtot'] = Erems_Box_Library_Terbilang::terbilang(ceil($hasil['harga_total_jual']), 3);
		$data['terbilangtjt'] = Erems_Box_Library_Terbilang::terbilang($hasil['tanggal_jatuh_tempo'], 3);
		$data['terbilangtla'] = Erems_Box_Library_Terbilang::terbilang($hasil['total_lama_angsuran'], 3);

		$data['total_angsuran']   = Erems_Box_Tools::toCurrency($data['total_angsuran']);
		$data['angsuranperbulan'] = Erems_Box_Tools::toCurrency($hasil['angsuran_per_bulan']);
		$data['terbilangapb']     = Erems_Box_Library_Terbilang::terbilang($hasil['angsuran_per_bulan'], 3);
		$data['aagd']             = Erems_Box_Tools::formatDate($hasil['awal_angsuran'], 'd M Y');
		$data['bagd']             = Erems_Box_Tools::formatDate($hasil['akhir_angsuran'], 'd M Y');

		$tempulz = $hasil["unit_land_size"] + 0;
		$tempubz = $hasil["unit_building_size"] + 0;
		$tempufz = $hasil["unit_floor_size"] + 0;

		$data['terbilangluasfloor'] = Erems_Box_Library_TerbilangB::terbilangUSelessZero($tempufz, 3, "");

		$globalParams                   = new Erems_Box_GlobalParamsNew();
		$data['msignname']              = strtoupper($paramsRequestResult["parameters"][$globalParams->PURCHASELETTER_PRINTOUT_MARKETINGSIGNNAME]);
		$data['fsignname']              = strtoupper($paramsRequestResult["parameters"][$globalParams->PURCHASELETTER_PRINTOUT_FINANCESIGNNAME]);
		$data["total"]                  = Erems_Box_Tools::toCurrency($hasil["harga_total_jual"]);
		$data['pt_name']                = $hasil["pt_name"];
		$data["customer_name"]          = strtoupper($hasil["customer_name"]);
		$data["salesman_employee_name"] = strtoupper($hasil["salesman_employee_name"]);
		$data["pt_rekening"]            = strtoupper($hasil["pt_rekening"]);
		$data["kodeangsuran"]           = $tempSisaAngsuranCode;

		//add for tallasa makasar
		$data["ajbbbn"]                  = Erems_Box_Tools::toCurrency($data["price_harga_bbnsertifikat"] + $data["price_harga_bajb"]);
		$data["ajbbphtbpnbpasuransi"]    = Erems_Box_Tools::toCurrency($data["price_harga_bajb"] + $data["price_harga_bphtb"] + $data["harga_paket_tambahan"] + doubleval($data["biaya_asuransi"]));
		$data["ajbbphtbpnbpbbnasuransi"] = Erems_Box_Tools::toCurrency(doubleval($data["price_harga_bajb"]) + doubleval($data["price_harga_bphtb"]) + doubleval($data["price_harga_bbnsertifikat"]) + doubleval($data["harga_paket_tambahan"]) + doubleval($data["biaya_asuransi"]));

		// add for palembang 29-01-2019
		$data["bphtbbbnbajb"] = Erems_Box_Tools::toCurrency($data["price_harga_bajb"] + $data["price_harga_bbnsertifikat"] + $data["price_harga_bphtb"]);

		// add for palu
		$data["ajbbphtbpnbp"]          = Erems_Box_Tools::toCurrency($data["price_harga_bajb"] + $data["price_harga_bphtb"] + $data["harga_paket_tambahan"]);
		$data["ajbbbnbphtbpnbp"]       = Erems_Box_Tools::toCurrency($data["price_harga_bajb"] + $data["price_harga_bbnsertifikat"] + $data["price_harga_bphtb"] + $data["harga_paket_tambahan"]);
		$data["price_harga_jualdasar"] = Erems_Box_Tools::toCurrency($data["price_harga_jualdasar"]);
		$data["harga_total_jual"]      = Erems_Box_Tools::toCurrency($data["harga_total_jual"]);
		$data["price_paket_tambahan"]  = Erems_Box_Tools::toCurrency($data["harga_paket_tambahan"] + 0);
		$data["price_asuransi"]        = Erems_Box_Tools::toCurrency($data["biaya_asuransi"] + 0);
		$data["price_administrasi"]    = Erems_Box_Tools::toCurrency($data["harga_administrasi"] + 0);
		$data["ajbbbnbphtbpnbppmutu"]  = Erems_Box_Tools::toCurrency($data["price_harga_bajb"] + $data["price_harga_bbnsertifikat"] + $data["price_harga_bphtb"] + $data["harga_paket_tambahan"] + $data["harga_pmutu"]);

		// add for medan
		$data["ajbhtp"] = Erems_Box_Tools::toCurrency($data["price_harga_bajb"] + $data["harga_paket_tambahan"]);

		// modiby imaam 20190322
		$data["biayalain"] = Erems_Box_Tools::toCurrency($data["price_harga_lain_lain"]);

		$data["billingrules_tandajadi"]    = Erems_Box_Tools::toCurrency($totalTandaJadi);
		$data["billingrules_uangmuka"]     = Erems_Box_Tools::toCurrency($totalUangMuka);
		$data["billingrules_angsuran"]     = Erems_Box_Tools::toCurrency($totalAngsuran2);
		// $data["price_harga_bphtb"]         = Erems_Box_Tools::toCurrency($data["price_harga_bphtb"]);
		$data["price_harga_bphtb"]         = Erems_Box_Tools::toCurrency(str_replace(",","",$data["price_harga_bphtb"]));
		$data["price_harga_bajb"]          = Erems_Box_Tools::toCurrency($data["price_harga_bajb"]);
		$data["price_harga_bbnsertifikat"] = Erems_Box_Tools::toCurrency($data["price_harga_bbnsertifikat"]);

		//spesial Tallasa Makassar
		$data["ketentuan_dua"] = "";
		if (strtoupper($data["pricetype_pricetype"]) == "KPR") {
			$data["ketentuan_dua"] = "KPR akad mulai " . $data["amountdateawal"];
		} else {
			$data["ketentuan_dua"] = $data["pricetype_pricetype"] . "  " . $data["amountcount"] . " kali Mulai " . $data["amountdateawal"] . "  s/d " . $data["amountdateakhir"];
		}

		/// simple
		$data["salem_name"]       = $data["salesman_employee_name"];
		$data["unit_electricity"] = intval($data["unit_electricity"]);
		$data["keterangan_bayar"] = $data["keterangan_bayar"];

		// addon 20180920
		$data["bulantahunserahterima"] = date("m Y", strtotime($data["rencana_serahterima_date"]));
		$tempBulantahunserahterima     = explode(" ", $data["bulantahunserahterima"]);
		$tempBulantahunserahterima     = Erems_Box_Tools::indoMonthText(intval($tempBulantahunserahterima[0])) . " " . $tempBulantahunserahterima[1];
		$data["bulantahunserahterima"] = $tempBulantahunserahterima;
		$data["customer_home_phone"]   = strlen($data["customer_home_phone"]) <= 0 ? "                        " : $data["customer_home_phone"];

		// addon 20180711
		$daoTotalRev = new Erems_Models_Sales_Change_Dao();

		// addon 20190611
		$data["purchase_date2"]          = $data["purchase_date2"];
		$data["purchase_date_hari"]      = $data["purchase_date_hari"];
		$data["purchase_date_tanggal"]   = $data["purchase_date_tanggal"];
		$data["purchase_date_bulanname"] = $data["purchase_date_bulanname"];
		$data["purchase_date_tahun"]     = $data["purchase_date_tahun"];

		$hasilTotalRev        = $daoTotalRev->getTotalRevisi($data["purchaseletter_id"]);
		$hasilTotalRev        = $hasilTotalRev[1][0]["total_revisi"];
		$data["total_revisi"] = $hasilTotalRev > 0 ? "Revisi ke - " . $hasilTotalRev : "";

		// Template SPT daftar Tagihan Ke Samping ( Horizontal )
		if ($genco->getIsSPTHorizontalSchedule()) {
			$maxRecord = 80;
			//reset
			for ($i = 1; $i <= $maxRecord; $i++) {
				$data["no" . $i]       = NULL;
				$data["tgltagih" . $i] = NULL;
				$data["niltagih" . $i] = NULL;

				/// versi sederhana
				$data["n" . $i]  = NULL;
				$data["tg" . $i] = NULL;
				$data["nt" . $i] = NULL;
				$data["r" . $i]  = NULL; // rp
				## Add by RH 08/06/2020 ##
				$data["st" . $i] = NULL;
				## END Add by RH 08/06/2020 ##
			}

			$count   = 1;
			$is80    = FALSE; // jika tagihanan mencapai >= 80 record
			$total80 = 0;
			$tgl80   = 0;

			// fill schedule
			foreach ($fixSch as $k => $schGroup) {
				foreach ($schGroup as $sch) {
					$data["no" . $count]       = $count;
					$data["tgltagih" . $count] = Erems_Box_Tools::formatDate($sch['duedate'], 'd M Y') . " Rp";
					$data["niltagih" . $count] = Erems_Box_Tools::toCurrency($sch['amount']);

					/// versi sederhana
					$data["n" . $count]  = $count;
					$data["tg" . $count] = Erems_Box_Tools::formatDate($sch['duedate'], 'd M Y');

					if ($sch["scheduletype_scheduletype"] == "KPR" && !in_array($projectid, $genco->getProjectIdShowST())) {
						$data["tg" . $count] = "KPR";
					}

                    if ($sch["scheduletype_scheduletype"] == "PPNDTP") {

						$data["tg" . $count] = $genco->textSchedulePpndtpPurchaseletter();

					}

					$data["nt" . $count] = Erems_Box_Tools::toCurrency($sch['amount']);
					$data["r" . $count]  = "Rp.";

					## Add by RH 08/06/2020 ##
					$data["st" . $count] = $sch["scheduletype_scheduletype"];
					## END Add by RH 08/06/2020 ##

					if ($count >= $maxRecord) {
						$is80    = TRUE;
						$total80 += $sch['amount'];
						$tgl80   = $sch['duedate'];
					}

					$count++;
				}
			}

			if ($is80) {
				$data["no80"]       = "s/d";
				$data["tgltagih80"] = Erems_Box_Tools::formatDate($tgl80, 'd M Y') . " Rp";
				$data["niltagih80"] = Erems_Box_Tools::toCurrency($total80);
				$data["r80"]        = "Rp.";
				/// versi sederhana
				$data["no80"] = "s/d";
				$data["tg80"] = Erems_Box_Tools::formatDate($tgl80, 'd M Y');
				$data["nt80"] = Erems_Box_Tools::toCurrency($total80);
			}
		}

		// request SH1 on 2018-12-19
		$tempVABCA                       = $data["virtualaccount_bca"];
		$tempVAMandiri                   = $data["virtualaccount_mandiri"];
		$data["virtualaccount_bca"]      = strlen($tempVABCA) <= 0 ? " " : "BCA Virtual Acc ( BCA VA) : " . $tempVABCA;
		$data["virtualaccount_mandiri"]  = strlen($tempVAMandiri) <= 0 ? " " : "Mandiri Virtual Acc (MVA) : " . $tempVAMandiri;
		$data["virtualaccount_bcab"]     = strlen($tempVABCA) <= 0 ? " " : "Nomor Virtual Account BCA : " . $tempVABCA;
		$data["virtualaccount_mandirib"] = strlen($tempVAMandiri) <= 0 ? " " : "Nomor Virtual Account BANK MANDIRI : " . $tempVAMandiri;


		$fileBangunan  = $genco->getTemplatePurchaseletterBangunanPrint();
		$fileKavling   = $genco->getTemplatePurchaseletterKavlingPrint();

		$fileSrc = $data['productcategory_productcategory_id'] == Erems_Box_Config::PRODUCTCATEGORY_BANGUNGAN ? $fileBangunan : $fileKavling;
		$fileSrc = intval($hasil["ppatk_badanhukum"]) == 1 ? $genco->getTemplatePurchaseletterBadanUsahaPrint() : $fileSrc;

		$paramsTemplate = array("file" => $params["template"], "data" => $data);
		$fileSrc        = $genco->getFinalTemplatePurchaseletter($paramsTemplate);

		// SPT NEW Concept
		$sptPrintoutCentralized        = new Erems_Models_Purchaseletter_SptPrintoutCentralized();
		$processSptPrintoutCentralized = $sptPrintoutCentralized->process($ses, $genco, $p, $paramsTemplate, $fileSrc, $data);
		$fileSrc                       = $processSptPrintoutCentralized["fileSrc"];
		$data                          = $processSptPrintoutCentralized["data"];
		//end SPT NEW Concept

		$msg = "";
		if ($fileSrc) {
			$finalFile = 'SP_' . str_replace('/', '', $hasil['purchaseletter_no']) . '.docx';
			$finalFile = str_replace(' ', '', $finalFile);

			$ok = $p->printDoc($fileSrc, $finalFile, $data);

			if (!$ok) {
				$msg = "ERR : " . $p->error;
			}
		}
		else {
			$msg = "ERR : Tidak ada file template cetakan";
		}

		$pathUrl = $p->getUrl();

		if ($genco->getFormatFileSPTv2() == "pdf") {
			$wpdf = new Erems_Box_Library_WordToPdf();
			$wpdf->convert($pathUrl);

			$pathUrl = str_replace(".docx", ".pdf", $pathUrl);
		}

		$otherAT = array(array(
			"PRINTOUT" => TRUE,
			"MSG"      => $msg,
			"URL"      => $pathUrl
		));

		$dm->setHasil(array($otherAT));

		return $dm;
	}

	public function detailRead() {
		$ses       = $this->getAppSession();
		$project   = $ses->getProject();
		$projectid = $project->getId();
		$pt        = $ses->getPt();
		$ptid      = $pt->getId();

		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$params = $this->getAppData();

		$purchaseDao            = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$dataChangeNameValid    = false;
		$dataChangeNameErrorMsg = "Biaya Admin Ganti Nama Belum Lunas.";

		$purchaseletter_id = 0;

		if (array_key_exists("purchaseletter_id", $params)) {
			$purchaseletter_id = intval($params["purchaseletter_id"]);

			if (array_key_exists("is_draft", $params)) {
				$dataPurchase = $purchaseDao->getOneDraft($purchaseletter_id);
			}
			else {
				$dataPurchase = $purchaseDao->getOne($purchaseletter_id);
			}

			$dataPurchase   = Erems_Box_Tools::toObjectRow($dataPurchase, new Erems_Models_Purchaseletter_PurchaseLetter(), array(new Erems_Models_Unit_UnitTran()));
			$changeNameDao  = new Erems_Models_Sales_Change_Dao();
			$dataChangeName = $changeNameDao->getAllFilterD($projectid, $ptid, $dataPurchase->getId(), "", "");
			$dataChangeName = Erems_Box_Tools::toObjectResult($dataChangeName, new Erems_Models_Sales_Change_ChangeName());
			$prjdtl         = $changeNameDao->getProjectDetail($projectid);

			if (count($dataChangeName) == 0) {
				$dataChangeNameValid = true;
			}
			else {
				$payDao  = new Erems_Models_Payment_Dao();
				$payment = new Erems_Models_Payment_Payment();
				$payment->setFlag(Erems_Box_Config::PAYMENTFLAG_OTHERS);
				$dataPayOther = $payDao->getOtherPaymentByPaymentType($projectid, $ptid, 1, 5, $dataPurchase->getId(), "GANTI NAMA~ADM GANTI NAMA");
				$dataPayOther = Erems_Box_Tools::toObjectResult($dataPayOther, $payment);

				//rizal 2 April 2019
				$validPaymentCNSSP = $purchaseDao->validationPaymentChangenameSSP($dataPurchase->getId(), "SSP");
				if (count($dataPayOther) > 0) {
					// $validPaymentCN = $purchaseDao->validationPaymentChangename($dataPurchase->getId(), "GANTI NAMA~BIAYA GANTI NAMA~BY GANTI NAMA~ADMINISTRASI GANTI NAMA");
					$validPaymentCN = $purchaseDao->validationPaymentChangename($dataPurchase->getId(), "GANTI NAMA~ADM GANTI NAMA");
					if ($validPaymentCN) {
						if ($prjdtl['subholding_id'] == '2') {
							if ($validPaymentCNSSP) {
								$dataChangeNameValid = true;
							}
							else {
								$dataChangeNameErrorMsg = "Biaya SSP Belum Lunas.";
							}
						}
						else {
							$dataChangeNameValid = true;
						}
					}
				}
			}
		}

		$otherAT = array(array(
			"PT_NAME"                    => isset($dataPurchase) ? $dataPurchase->getPtName() : $pt->getName(),
			"DATACHANGENAME"             => $dataChangeNameValid,
			"DATACHANGENAME_ERR_MSG"     => $dataChangeNameErrorMsg,
			"JENIS_BIAYA_PURCHASELETTER" => $purchaseDao->getJenisBiaya($purchaseletter_id),
		));

		$dm->setHasil(array($otherAT));

		return $dm;
	}

	public function browsedetailRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$creator = new Erems_Box_Models_App_Creator();

		$b = new Erems_Models_App_Masterdata_Block();
		$ab = $b->prosesDataWithSession($this->getAppSession(), TRUE);

		$dm->setHasil(array($ab));

		return $dm;
	}

	public function checkauthorizeRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$data = $this->getAppData();

		$tglPurchase = $data["purchase_date"];

		// get closing paramater
		$paramsRequestResultNew = Erems_Box_Tools::globalParamsExistNew($this->getAppSession(), "GLOBAL");
		$tanggalClosing         = intval($paramsRequestResultNew["parameters"]["GLOBAL_TANGGAL_CLOSING"]);
		$validasiTanggalClosing = Erems_Box_Tools::validasiTanggalPurchase($tglPurchase, $tanggalClosing);

		$otherAT = array(array(
			"ISAUTHORIZEDUSER"   => $this->getAppSession()->getUser()->getId() == Erems_Box_AuthorizeConfig::PURCHASELETTER_SUPERUSER ? TRUE : FALSE,
			"VALIDASITGLCLOSING" => $validasiTanggalClosing
		));

		$dm->setHasil(array($otherAT));

		return $dm;
	}

	public function scheduleRead() {
		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'schedule', array('scheduletype', 'sourcemoney'));
		$dao      = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$pl       = new Erems_Models_Purchaseletter_PurchaseLetter();
		$pl->setArrayTable($this->getAppData());

		if($pl->getIsDraft() == 'true'){
			$hasil = $dao->getScheduleDraftById($pl);
		}
		else{
			$hasil = $dao->getScheduleById($pl);
		}

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function rescheduleschRead() {
		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'schedule', array('scheduletype', 'sourcemoney'));
		$data     = $this->getAppData();
		$dao      = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$tipe     = $data['data_type'];
		if ($tipe == 'reschedule') {
			$pl = new Erems_Models_Purchaseletter_Reschedule();
			$pl->setArrayTable($data);
			$hasil = $dao->getReschScheduleById($pl);
		} else {
			$pl = new Erems_Models_Purchaseletter_PurchaseLetter();
			$pl->setArrayTable($data);
			$hasil = $dao->getScheduleById($pl);
		}

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function rescheduleRead() {
		$req      = $this->getAppRequest();
		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'reschedule', array('purchaseletter'), array('detail', 'deletedRows'));
		$dao      = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$pl       = new Erems_Models_Purchaseletter_PurchaseLetter();
		$pl->setArrayTable($this->getAppData());

		$hasil = $dao->getAllReschedule($req, $pl);

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function authloginRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$data = $this->getAppData();

		$auth = new Erems_Box_Models_Auth_Auth();

		$result = $auth->ldapLogin($data["a"], $data["b"]);
		$loginSuccess = false;
		$msg = "Login Error";
		if ($result) {
			$dao = new Erems_Models_Master_UserDao();
			$userInfo = $dao->getUser($data["a"]);
			if (array_key_exists(0, $userInfo)) {
				if (array_key_exists(0, $userInfo[0])) {
					if (array_key_exists('user_id', $userInfo[0][0])) {
						$userId = $userInfo[0][0]['user_id'];
						if ($userId == Erems_Box_AuthorizeConfig::PURCHASELETTER_SUPERUSER) {
							$loginSuccess = TRUE;
							$msg = "Success";
						}
						else {
							$msg = "Not Authorized User";
						}
					}
				}
			}
		}
		else {
			$msg = "Invalid username or password";
		}

		$otherAT = array(array(
			"LOGINSUCCESS" => $loginSuccess,
			"LOGINMSG"     => $msg
		));

		$dm->setHasil(array($otherAT));

		return $dm;
	}

	public function mainDelete() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setObject(new Erems_Models_Purchaseletter_PurchaseLetter());
		$dm->setDao(new Erems_Models_Purchaseletter_PurchaseLetterDao());
		$dm->setIdProperty("purchaseletter_id");
		return $dm;
	}

	public function maindetailRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'purchaselettertransaction', array('customerprofile', 'unittran', 'unitstatus', 'clusterb', 'blockb', 'productcategory', 'type', 'salesman', 'citraclub', 'mediapromotion', 'salesgroup', 'saleslocation', 'collector', 'price', 'billingrulestran', 'bank', 'pricetype', 'city', 'payment', 'cac', 'aftersales', 'buktipemilik', 'rewardsales', 'rewardcustomer', 'rewardtambahan', array('employee', 'upline_')), array('detail', 'deletedRows', 'addonparams'));
		$pl = new Erems_Models_Purchaseletter_PurchaseLetter();
		$pl->setArrayTable($this->getAppData());
		$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();

		if ($pl->getIsDraft()) {
			$hasil = $dao->getOneDraft($pl->getId());
		}
		else {
			$hasil = $dao->getOne($pl->getId());
		}

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function schtypeRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'scheduletype', array(), array());

		$dao = new Erems_Models_Master_GeneralDao();
		$hasil = $dao->getAllScheduleType();

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function customerlistRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'customerprofile', array());

		$dao = new Erems_Models_Master_CustomerDao();
		$hasil = $dao->getAllByFilter($this->getAppRequest(), $this->getAppSession());

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function priceRead() {
		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'pricealt', array('unit', 'pricetype'));
		$dao      = new Erems_Models_Unit_UnitDao();
		$unit     = new Erems_Models_Unit_Unit();
		$unit->setArrayTable($this->getAppData());
		$hasil = $dao->getPrice($unit->getId());

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function unitlistRead() {
		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'unitb', array('unitstatus', 'clusterb', 'blockb', 'productcategory', 'type'));
		$data     = $this->getAppData();
		$dao      = new Erems_Models_Unit_UnitDao();
		$unitTran = new Erems_Models_Unit_UnitTran();

		$unitTran->setArrayTable($data);
		$unitTran->setProject($this->getAppSession()->getProject());
		$unitTran->setPt($this->getAppSession()->getPt());
		$unitTran->getStatus()->setId(Erems_Box_Config::UNITSTATUS_STOCK);
		$unitTran->setIsReadySell(1);
		$unitTran->getBlock()->setId(Erems_Box_Tools::cleanComboData($data, 'block_id'));
		$hasil = $dao->getAllWoP2($this->getAppRequest(), $unitTran);
		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function selectedunitRead() {
		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'unittran', array('unitstatus', 'clusterb', 'blockb', 'productcategory', 'type'));
		$dao      = new Erems_Models_Unit_UnitDao();
		$unit     = new Erems_Models_Unit_Unit();
		$unit->setArrayTable($this->getAppData());
		$hasil = $dao->getOne($unit);

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function selectedcustomerRead() {
		$dm       = new Erems_Box_Models_App_Hermes_DataModel();
		$dataList = new Erems_Box_Models_App_DataListCreator('', 'customerprofile', array('city'));
		$dao      = new Erems_Models_Master_CustomerDao();
		$hasil    = $dao->getById($this->getAppRequest());

		$dm->setDataList($dataList);
		$dm->setHasil($hasil);

		return $dm;
	}

	public function mainCreate() {
		$ses       = $this->getAppSession();
		$projectid = $ses->getProject()->getId();
		$ptid      = $ses->getPt()->getId();
		$dm        = new Erems_Box_Models_App_Hermes_DataModel();

		$validator = new Erems_Models_Purchaseletter_Validator();
		$validator->setSession($this->getAppSession());
		$validator->params = $this->getAppData();

		$obj = new Erems_Models_Purchaseletter_PurchaseLetterTransaction();
		$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$dao->appData($this->getAppData());

		$dm->setDao($dao);
		$dm->setValidator($validator);
		$dm->setObject($obj);

		if(Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectid, $ptid)->syncSFPurchaseletter()){ /// sync SF
			$this->syncSF();
		}

		return $dm;
	}

	public function rescheduleCreate() {
		$dm        = new Erems_Box_Models_App_Hermes_DataModel();
		$validator = new Erems_Models_Purchaseletter_RescheduleValidator();
		$obj       = new Erems_Models_Purchaseletter_Reschedule();
		$dm->setDao(new Erems_Models_Purchaseletter_PurchaseLetterDao());
		$dm->setValidator($validator);
		$dm->setObject($obj);

		return $dm;
	}

	public function updaterescheduleCreate() {
		$dm        = new Erems_Box_Models_App_Hermes_DataModel();
		$validator = new Erems_Models_Purchaseletter_RescheduleValidator();
		$obj       = new Erems_Models_Purchaseletter_Reschedule();
		$dm->setDao(new Erems_Models_Purchaseletter_PurchaseLetterDao());
		$dm->setValidator($validator);
		$dm->setObject($obj);

		return $dm;
	}

	protected function getDefaultProcessor() {
		return new Erems_Models_App_Box_PurchaseletterProcessor();
	}

	public function apiaciRead() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		$data = $this->getAppData();
		$dao  = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$dao->setForApiAci($data['purchaseletter_id'], $this->getAppSession());
		return Box_Tools::instantRead(array("HASIL" => 1,), array());
	}

	public function apiacisRead() {
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		$data = $this->getAppData();
		$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$dao->setForApiAcis($data['purchaseletter_id'], $this->getAppSession());
		return Box_Tools::instantRead(array("HASIL" => 1,), array());
	}

	//edited by Rizal 18022019
	public function checkrealisasicashierRead() {
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);
		$this->getResponse()->setHeader('Content-Type', 'application/json');
		$data = $this->getAppData();
		$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();

		$hasil = $dao->checkRealisasiPaymentCashier($data['purchaseletter_id']);

		$otherAT = array(array(
			"ISALLOWED" => $hasil,
			"MSG"       => "Ada tagihan schedule belum terealisasi sepenuhnya pada cashier",
		));

		$dm->setHasil(array($otherAT));

		return $dm;
	}

	//endedited
	//edited by Rizal 1 Maret 2019
	public function inlineEditRead() {
		$params = $this->getAppData();
		$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$result = $dao->InlineUpdate($params, $this->getAppSession()->getUser()->getId());
		echo Zend_Json::encode($result);
		die();
	}

	// added by rico 02012023
	public function saveAlasanRead() {
		$params = $this->getAppData();
		$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$result = $dao->saveAlasan($params, $this->getAppSession()->getUser()->getId());
		echo Zend_Json::encode($result);
		die();
	}

	public function customerdetailRead() {
        $data = $this->getAppData();

        $hasil = array();
        if(isset($data["customer_id"])){
	        $dao = new Erems_Models_Master_CustomerDao();

	        $result = $dao->getById($this->getAppRequest());
	        if(isset($result[1]) && count($result[1]) > 0){
	        	$hasil = $result[1][0];
	        }
        }
        echo Zend_Json::encode($hasil);
        die();
    }

    //addby imaam on 20200818
    public function othersconfigRead() {
    	$ses       = $this->getAppSession();
		$projectid = $ses->getProject()->getId();
		$ptid      = $ses->getPt()->getId();
		$userid    = $ses->getUser()->getId();

        $dm = new Erems_Box_Models_App_Hermes_DataModel();
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);

        $genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectid, $ptid);

		$userkpraccdate = $genco->userkprduedate();

		///// add by Erwin 04/06/2021
		///// Tahan Batal By User
		$model_app          = new Erems_Models_Approvallevel();
		$result_tahan_batal = $model_app->getAllRead(array('modul' => 'tahan_batal'));

		$arr_tahanbatal = array();
		if($result_tahan_batal['success']){
			$arr_tahanbatal = array_filter($result_tahan_batal['data'], function($ar) {
			   return $ar['user_id'] == $this->getAppSession()->getUser()->getId();
			});
		}

		$dir               = APPLICATION_PATH . '/../public/app/erems/projectlibs/';
		$prolibsFiles      = scandir($dir);
		$prolibsFound      = NULL;
		$className         = "Prolibs_" . $projectid . "_" . $ptid;
		$prolibsFileSearch = $className . ".js";

		if (count($prolibsFiles) > 0) {
			$prolibsFiles = preg_grep("/.js$/", $prolibsFiles);

			if (in_array($prolibsFileSearch, $prolibsFiles)) {
				$prolibsFound = $className;
			}
		}

		// $prefixcjs        = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectid, $ptid)->getCalculatorJs();
		$prefixcjs        = 'Calculator';
		$filecalculatorJs = APPLICATION_PATH . '/../public/app/erems/library/' . $prefixcjs . ".js";
		$calculatorJs     = !file_exists($filecalculatorJs) ? 0 : $prefixcjs;

		// $prefixpjs            = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectid, $ptid)->getPurchaseletterJs();
		$prefixpjs            = 'Purchaseletter';
		$filepurchaseletterJs = APPLICATION_PATH . '/../public/app/erems/library/' . $prefixpjs . ".js";
		$purchaseletterJs     = !file_exists($filepurchaseletterJs) ? 0 : $prefixpjs;

		$isRescheduleApproveUser = FALSE;
		$isRescheduleApproveUser = Erems_Box_Tools::integerOrArray($userid, Erems_Box_Projectptconfig_ProjectPtConfigSelector::getAuthorizeUser($projectid, $ptid, "PURCHASELETTER_SUPERUSER"));
		$param_generate_notes    = $genco->generateNotespurchaselatter();

		$paramsRequestResult = Erems_Box_Tools::globalParamsExistNew($ses, "PURCHASELETTER");
		$isAuthorizerUser    = FALSE;
		if ($genco->getAucoMode() == 0) {
			$superUserPurchase = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getAuthorizeUser($projectid, $ptid, "PURCHASELETTER_SUPERUSER");
			$isAuthorizerUser  = Erems_Box_Tools::integerOrArray($userid, $superUserPurchase) ? TRUE : FALSE;
		}
		else {
			$isAuthorizerUser = intval($paramsRequestResult["parameters"]['PURCHASELETTER_SUPERUSER_GROUPID']) == $ses->getGroupId() ? TRUE : FALSE;
			$paramsRequestResult["parameters"]['PURCHASELETTER_SUPERUSER_GROUPID'] = 0; // set ke nol alasan sekuriti
		}

		$plrevision_supervisor = $genco->getPurchaseletterRevision();
		$is_plrevision = FALSE;
		if (is_array($plrevision_supervisor) && in_array($userid, $plrevision_supervisor)) {
			$is_plrevision = TRUE;
		}
		else if($userid == $plrevision_supervisor) {
			$is_plrevision = TRUE;
		}

		$pl_disable_printspt = $genco->disablePrintSPT();
		$disable_printspt = FALSE;
		if (is_array($pl_disable_printspt) && in_array($userid, $pl_disable_printspt)) {
			$disable_printspt = TRUE;
		}
		else if($userid == $pl_disable_printspt){
			$disable_printspt = TRUE;
		}


		$templatePayScheme = array();
		$tempTemplatePayScheme = $genco->getTplSPTPaymentScheme();
		if (!is_array($tempTemplatePayScheme)) {
			$templatePayScheme[] = array("value" => $tempTemplatePayScheme, "text" => "Payment Scheme");
		}
		else {
			$templatePayScheme = $tempTemplatePayScheme;
		}

		if ($genco->isPurchasePrintoutCentralized()) {
			$templatePrintout = Erems_Models_Purchaseletter_SptPrintoutCentralized::getTemplate();
		}
		else {
			$templatePrintout = $genco->getPurchPrintoutTemplate();
		}

        $otherAT = array(array(
			"PROJECT_ID"                          => $projectid,
			"PT_ID"                               => $ptid,
			"PROLIBFILE"                          => $prolibsFound,
			"CALCULATORJS"                        => $calculatorJs,
			"PURCHASELETTERJS"                    => $purchaseletterJs,
			"RESCHEDULEAPPROVEUSER"               => $isRescheduleApproveUser,
			"GROUPUSER"                           => $ses->getGrouplist()[$ses->getGroupId()],
			"PARAM_GENERATE_NOTES"                => $param_generate_notes,
			"checkDataCustomer"                   => $genco->checkDataCustomer(),
			"checkCanSPTDraft"                    => $genco->checkCanSPTDraft(),
			"userkpraccdate"                      => in_array($userid, $userkpraccdate),
			"surveyConfig"                        => $genco->activateSurveyFeatures(),
			"verification_approval"               => $genco->validasish3b(),
			"visibleInsentifPajak"                => $genco->visibleInsentifPajak(),
			"visibleTahanBatal"                   => count($arr_tahanbatal) > 0 ? true : false,
			"getPurcheletterSendWa"               => $genco->getPurcheletterSendWa(),
			"getPurcheletterSendWaText"           => $genco->getPurcheletterSendWaText(),
			"printoutsptmrt"                      => $genco->printoutsptmrt(),
			"visibleVida"                         => $genco->visibleVida(),
			"visibleFest40"                       => $genco->visibleFest40(),
			"activePricesource"                   => $genco->purchaselatterActivePricesource(),
			"typeCalculaterounding"               => $genco->typeCalculaterounding(),
			"visibleExtendSchedule"               => $genco->showExtendSchedule(),
			"getPurcheletterSurveyOnline"         => $genco->getPurcheletterSurveyOnline(),
			"rencanaST_enddate"                   => $genco->rencanaST_enddate(),
			"hargaNettoKomisi"                    => $genco->getNettoKomisi(),
			"filePaymentScheme"                   => $genco->getPaymentSchemeFileName(),
			"ShowMoreCustomerOnGrid"              => $genco->ShowMoreCustomerOnGrid(), // added by Erwin.St 27072022
			"ppn_value"                           => $genco->ppnValueadditional(), // added by Erwin.St 27072022
			"visibleBlokir"                       => $genco->visibleBlokir(),
			"visibleDiscKaryawan"                 => $genco->visibleDiscKaryawan(),
			"showPromoPurchaseletter"             => $genco->showPromoPurchaseletter(),
			"useJenisBiayaPurchaseletter"         => $genco->useJenisBiayaPurchaseletter(),
			"purchaseletterRencanaSerahTerimaNew" => $genco->purchaseletterRencanaSerahTerimaNew(),
			"showKuasaCustomerPurchaseletter"     => $genco->showKuasaCustomerPurchaseletter(),
			"disablePromoPurchaseletter"          => $genco->disablePromoPurchaseletter(),
			"GLOBALPARAMSEXIST"                   => $paramsRequestResult["status"],
			"GLOBALPARAMSMSG"                     => $paramsRequestResult["msg"],
			"GLOBALPARAMSPARAMS"                  => $paramsRequestResult["parameters"],
			"ISAUTHORIZEDUSER"                    => $isAuthorizerUser,
			"PLREVISION_SUPERVISOR"               => $is_plrevision,
			"DISABLE_PRINTSPT"                    => $disable_printspt,
			"SOURCEMONEY_DEFAULT"                 => Erems_Box_Config::SOURCEMONEY_DEFAULT,
			"SCHEDULE_PEMBULATAN"                 => $genco->getSchedulePembulatan(),
			"ISSUPERVISOR"                        => $ses->getGroupId() == $genco->getUserGroupPurchaseletterSupervisor(),
			"TEMPLATEPRINTOUTPAYSCHEME"           => $templatePayScheme,
			"TEMPLATEPRINTOUT"                    => $templatePrintout,
			"TEMPLATEPRINTOUTSPTDRAFT"            => $genco->getPurchPrintoutTemplateSPTDraft(),
			"TEMPLATEPRINTOUTMRT"                 => $genco->getPurchPrintoutTemplatemrt(),
			"IS_SH1"                              => $genco->activateSh1Features(),
			"SHOW_REWARD"                         => $genco->isPurchaseletterShowReward(),
			"APPROVENOW_RSCH"                     => $genco->useApproveNowReschedule(),
			"IS_FLASHPRINT"                       => $genco->useFlashPrintPurchaseletter(),
			"IS_PURCHASEPRINTKTPSIM"              => $genco->isPurchasePrintKtpSim(),
			"USE_RUMUSBIAYAPROLIBSPURCHASELETTER" => $genco->useRumusBiayaProlibsPurchaseletter(),
			"isSH2"                               => $genco->isSH2()
		));

        $dm->setHasil(array($otherAT));

        return $dm;
    }

	public function checkpaymentdraftRead() {
        $data = $this->getAppData();

        $hasil = true;
        if(isset($data["idDeleted"])){
			$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
			$result = $dao->checkpaymentdraft($data["idDeleted"]);
			foreach ($result[1] as $value) {
				if($value['amount'] != $value['remaining_balance']){
					$hasil = false;
					break;
				}
			}
        }
        echo Zend_Json::encode($hasil);
        die();
    }

	public function deletedraftRead() {
        $data = $this->getAppData();
        $hasil = array();
        if(isset($data["idDeleted"])){
			$dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
			$hasil = $dao->deletedraft($data["idDeleted"]);
        }
        echo Zend_Json::encode($hasil);
        die();
    }

    public function morecustomerlistRead() {

        $dao = new Erems_Models_Master_CustomerDao();
        $hasil = $dao->getMoreCustomer($this->getAppRequest(), $this->getAppSession());
        echo Zend_Json::encode($hasil);
        die();
    }

	//addby anas 05012021
    public function surveyRead() {
        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $hasil = $dao->updateSurvey($this->getAppRequest(), $this->getAppSession());
        echo Zend_Json::encode($hasil);
        die();
	}


    //addby fatkur 29012021
    public function verificationapprovalRead() {
        $dao = new Erems_Models_Approvalverification();
        $hasil = $dao->getapprovalRead($this->getAppRequest(), $this->getAppSession());
        echo Zend_Json::encode($hasil);
        die();
    }


	//addby RH 22022021
    public function schemescheduleRead() {
        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $hasil = $dao->getSchemeSchedule($this->getAppRequest(), $this->getAppSession());
		echo Zend_Json::encode($hasil);
        die();
	}

	////// add by Erwin 04/06/2021
	public function tahanbataldetailRead() {
        $data = $this->getAppData();

        $hasil = array('success' => false);
        if(isset($data["mode"])){
	        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        	if($data["mode"] == 'detail'){
		        $hasil = $dao->getTahanBatal($data);
        	}
        	else if($data["mode"] == 'save'){
        		$hasil = $dao->updateTahanBatal($data, $this->getAppSession()->getUser()->getId());
        	}
        }
        echo Zend_Json::encode($hasil);
        die();
    }

    ////// add by Erwin 29/07/2021
    public function pricelistkoefisiendetailRead() {
	    $hasil = array('success' => false);
	    $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$hasil = $dao->getPriceListKoefisiendetail($this->getAppRequest(), $this->getAppSession());
		echo Zend_Json::encode($hasil);
        die();
    }

    //addby fatkur 13092021
    public function ceknonppnRead() {
    	$data = $this->getAppData();
        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $hasil = $dao->ceknonppn($data);
        echo Zend_Json::encode($hasil);
        die();
    }

	public function voucherPendingRead() {
		$data = $this->getAppData();
		$dao = new Erems_Models_Sales_Change_Dao();
		$hasil = $dao->getVoucherPending($data['purchaseletter_id']);
		// echo Zend_Json::encode($hasil['data'][0]);
		echo Zend_Json::encode($hasil[0]);
		die();
	}
    public function customerRead(){
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$params = $this->getAppData();
        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();

		$hasil = $dao->getOne($params['purchaseletter_id']);

		$check = count($dao->checkSurvey($params['purchaseletter_id'], $hasil[1][0]['customer_id']));

		$otherAT = array(array(
				"hasil"=> $hasil,
				"check"=> $check
		));

        $dm->setHasil(array($otherAT));

        return $dm;
    }

    public function savecustomerRead(){
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$params = $this->getAppData();
		$json = json_decode($params["data"],true);

		$data = array(
			"purchaseletter" => $json[0],
			"phone" => end($json)
		);

        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $hasil = $dao->saveCustomer($data);

        $dm->setHasil($hasil);

        return $dm;
    }

    public function surveyDeleteRead(){
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$params = $this->getAppData();
		$purchaseletter_id = $params['purchaseletter_id'];
		$customer_id = $params['customer_id'];

        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $hasil = $dao->deleteSurvey($purchaseletter_id, $customer_id, $this->getAppSession()->getUser()->getId());

        $dm->setHasil($hasil);

        return $dm;
    }

    public function savehargaKomisiRead(){
		$dm = new Erems_Box_Models_App_Hermes_DataModel();
		$dm->setDirectResult(TRUE);
		$dm->setRequiredDataList(FALSE);
		$dm->setRequiredModel(FALSE);

		$params = $this->getAppData();
		$json = json_decode($params["data"],true);

		$data = array(
			"purchaseletter" => $json[0],
			"harga_netto" => $json[1],
			"harga_netto_komisi" => end($json),
			"user_id" => $this->getAppSession()->getUser()->getId()
		);

        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        $hasil = $dao->saveHargaKomisi($data);

        $dm->setHasil($hasil);

        return $dm;
    }

    public function regeneratevaRead(){
		$dao   = new Erems_Models_Purchaseletter_PurchaseLetterDao();
		$hasil = $dao->regenerateVA($this->getAppData());
        echo Zend_Json::encode($hasil);
        die();
    }

    public function syncSF(){
    	$errors = array();
		try {
			$dao   = new Erems_Models_Purchaseletter_PurchaseLetterDao();
			$appData = $this->getAppData();

			if(!$appData['is_draft'] && !$appData['purchaseletter_id']){

		    	$hasil = array('success' => false, 'msg' => 'Syncronize data sales force is failed.');

				$ses       = $this->getAppSession();
				$projectid = $ses->getProject()->getId();
				$ptid      = $ses->getPt()->getId();

				$unit_id     = $appData['unit_unit_id'];
				$salesman_id = $appData['salesman_employee_id'];

		    	$mainTools = new Main_Box_Tools();
				$config    = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectid, $ptid)->configSFPurchaseletter();

				$paramToken = array(
					'grant_type'    => 'password',
					'client_id'     => $config['credential']['client_id'],
					'client_secret' => $config['credential']['client_secret'],
					'username'      => $config['credential']['username'],
					'password'      => $config['credential']['password']
				);
				$curlToken = $mainTools->curl($config['urltoken'], 'POST', http_build_query($paramToken));
				$arrToken  = Zend_Json::decode($curlToken);
				$tokenAuth = $arrToken['token_type'] . ' ' . $arrToken['access_token'];

				////////////////////////////////////////////////////////
				$url_get    = $arrToken['instance_url'] . '/' . $config['credential']['url_get']. '/?erems_unit_id='. $unit_id. '&salesman_id='.$salesman_id;
				$method_get = 'GET';

				$paramGetSF = json_encode(array());
				$getSF      = $mainTools->curl($url_get, $method_get, $paramGetSF, $tokenAuth);
				$arrSF      = Zend_Json::decode($getSF);

				$paramLog = array(
					'unit_id'    => $appData['unit_unit_id'],
					'url_post'   => json_encode(array('url' => $url_get)),
					'method_url' => $method_get,
					'param_ins'  => $paramGetSF,
					'status'     => $arrSF['code'] == '200' ? 1 : 0,
					'response'   => base64_encode($getSF)
				);
				$dao->api_salesforce_oppty_cust_logs($paramLog, $this->getAppSession());
				/////////////////////////////////////////////////////////
				if(isset($arrSF['data']) && count($arrSF['data']) > 0){
					$url_post   = $arrToken['instance_url'] . '/' . $config['credential']['url_post'];
					$method_url = 'POST';

					foreach($arrSF['data'] as $key => $val){
						$paramIns = array(
							// 'oppty_sf_id'         => $val['oppty_id'],
							'oppty_sf_id'         => $arrSF['data']['oppty_id'],
							'erems_unit_id'       => $unit_id,
							'harga_netto'         => $appData['price_harga_neto'],
							'harga_bruto'         => $appData['price_harga_jual'],
							'unit_atas_nama'      => $appData['customer_name'],
							'email_kepemilikan'   => $appData['customer_email'],
							'phone_kepemilikan'   => $appData['customer_mobile_phone'],
							'cara_bayar'          => $appData['pricetype_pricetype'],
							'reservasi'           => 'no',
							'booking_fee'         => 'no',
							'presentasi_personal' => 'no'
						);

					}

						$paramIns = http_build_query($paramIns);

						$header[] = "Authorization: Bearer ".$tokenAuth;
						$header[] = "Content-Type: application/json";

						$curl = curl_init();

						curl_setopt_array($curl, array(
						  CURLOPT_URL => $url_post.'?'.$paramIns,
						  CURLOPT_RETURNTRANSFER => true,
						  CURLOPT_ENCODING => '',
						  CURLOPT_MAXREDIRS => 10,
						  CURLOPT_TIMEOUT => 0,
						  CURLOPT_FOLLOWLOCATION => true,
						  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
						  CURLOPT_CUSTOMREQUEST => $method_url,
						  CURLOPT_POSTFIELDS =>$paramIns,
						  CURLOPT_HTTPHEADER => $header,
						));

						$response = curl_exec($curl);

						$insSF    = $mainTools->curl($url_post, $method_url, $paramIns, $tokenAuth);
						$arrInsSF = Zend_Json::decode($insSF);

						$paramLog = array(
							'unit_id'    => $appData['unit_unit_id'],
							'url_post'   => json_encode(array('url' => $url_post)),
							'method_url' => $method_url,
							'param_ins'  => $paramIns,
							'status'     => $arrInsSF['code'] == '200' ? 1 : 0,
							'response'   => base64_encode($insSF)
						);
						$dao->api_salesforce_oppty_cust_logs($paramLog, $this->getAppSession());
					}
				}
			}
		catch (Zend_Rest_Client_Exception $e) {
			$errors[] = '[' . $e->getCode() . ']:' . $e->getMessage();
		}
		catch (Exception $e) {
			$errors[] = '[' . $e->getCode() . ']:' . $e->getMessage();
		}

		return $errors;
    }

	public function assetDropdownRead() {
		$ses       = $this->getAppSession();
		$projectid = $ses->getProject()->getId();
		$ptid      = $ses->getPt()->getId();

		$dao_cac            = new Erems_Models_Master_CACDao();
		$dao_employee       = new Erems_Models_Hrd_EmployeeDao();
		$dao_saleslocation  = new Erems_Models_Master_SalesLocationDao();
		$dao_mediapromotion = new Erems_Models_Master_MediaPromotionDao();
		$dao_bank           = new Erems_Models_Master_BankDao();
		$dao_billingrules   = new Erems_Models_Sales_BillingRulesDao();
		$dao_salesgroup     = new Erems_Models_Master_SalesgroupDao();
		$dao_citraclub      = new Erems_Models_Master_CitraClubDao();
		$dao_reward         = new Erems_Models_Reward_RewardDao();
		$dao_general        = new Erems_Models_Master_GeneralDao();
		$dao_purposebuy     = new Erems_Models_Master_PurposeBuyDao();
		$dao_mim            = new Erems_Models_Masterim();

		$masterim       = $dao_mim->masterimDropdownRead();
		$masterimdetail = $dao_mim->masterimdetailDropdownRead(array('internalmemo_id' => 0));

		$all_masterim            = $masterim['success'] ? $masterim['data'] : array();
		$all_masterimdetail      = $masterimdetail['success'] ? $masterimdetail['data'] : array();
		$all_bank                = $dao_bank->getAllDropdown();
		$all_billingrules        = $dao_billingrules->getAllDropdown($projectid, $ptid);
		$all_billingrulesballoon = $dao_billingrules->getAllBallonDropdown($projectid, $ptid);
		$all_citraclub           = $dao_citraclub->getAllDropdown($projectid, $ptid);
		$all_cac                 = $dao_cac->getAllDropdown($projectid, $ptid);
		$all_employee            = $dao_employee->getAllDropdown($projectid, $ptid, 0, Erems_Box_Config::POSITION_CODE_UPLINE);
		$all_collector           = $dao_employee->getAllDropdown($projectid, $ptid, Erems_Box_Config::POSITION_ID_COLLECTOR);
		$all_salesman            = $dao_employee->getAllDropdown($projectid, $ptid, Erems_Box_Config::POSITION_ID_SALESMAN);
		$all_city                = $dao_general->getAllCityDropdown();
		$all_downline            = $dao_general->getAllDownlineDropdown($projectid, $ptid);
		$all_sourcemoney         = $dao_general->getAllSourceMoneyDropdown();
		$all_mediapromotion      = $dao_mediapromotion->getAllDropdown();
		$all_purposebuy          = $dao_purposebuy->getAllWOPLDropdown();
		$all_rewardsales         = $dao_reward->getAllWOPLDropdown($projectid, $ptid, 0);
		$all_rewardcustomer      = $dao_reward->getAllWOPLDropdown($projectid, $ptid, 2);
		$all_rewardtambahan      = $dao_reward->getAllWOPLDropdown($projectid, $ptid, 1);
		$all_salesgroup          = $dao_salesgroup->getAllDropdown();
		$all_saleslocation       = $dao_saleslocation->getAllDropdown($projectid, $ptid);

		echo Zend_Json::encode(Erems_Box_Tools::utf8ize(
			array(
				'data_bank'                => $all_bank,
				'data_billingrules'        => $all_billingrules,
				'data_billingrulesballoon' => $all_billingrulesballoon,
				'data_cac'                 => $all_cac,
				'data_citraclub'           => $all_citraclub,
				'data_city'                => $all_city,
				'data_collector'           => $all_collector,
				'data_employee'            => $all_employee,
				'data_salesman'            => $all_salesman,
				'data_salesgroup'          => $all_salesgroup,
				'data_saleslocation'       => $all_saleslocation,
				'data_mediapromotion'      => $all_mediapromotion,
				'data_sourcemoney'         => $all_sourcemoney,
				'data_downline'            => $all_downline,
				'data_purposebuy'          => $all_purposebuy,
				'data_masterim'            => $all_masterim,
				'data_masterimdetail'      => $all_masterimdetail,
				'data_rewardsales'         => $all_rewardsales,
				'data_rewardcustomer'      => $all_rewardcustomer,
				'data_rewardtambahan'      => $all_rewardtambahan,
			)
		));
		exit;
	}
}
?>
