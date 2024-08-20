<?php

/**
 * Description of AbsentProcessor
 *
 * @author MIS
 */
class Erems_Models_App_Box_ChangePriceProcessor extends Erems_Models_App_Box_Processor {

	private $purchasLetter;
	private $docStatus;

	public function setDocStatus($status) {
		$this->docStatus = intval($status);
	}

	public function daoProses($dao, $object, $modeCreate) {
		echo "hello";
		switch ($modeCreate) {
			case "setupsheet":
				return $dao->setupShift($object);
				break;
		}
	}

	public function afterFillData($changePrice) {
		/// insert new purchaseletter
		if (!in_array($this->docStatus, array(1, 2))) {
			$dao            = new Erems_Models_Unit_UnitDao();
			$purchaseletter = new Erems_Models_Purchaseletter_PurchaseLetterTransaction();
			$plDao          = new Erems_Models_Purchaseletter_PurchaseLetterDao();
			// $price       = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getProject()->getId(), $this->session->getPt()->getId())->getPriceCalculatorPHP();
			$price          = new Erems_Models_Purchaseletter_PriceCalculator();
			$unit           = new Erems_Models_Unit_UnitTran();

			$data    = $this->getData();
			$onePlDb = $plDao->getOne(intval($data["purchaseletter_id"]));

			if (isset($onePlDb[1][0])) {
				Erems_Box_Tools::setArrayTable($purchaseletter, $onePlDb[1][0]);
			}

			if ($purchaseletter->getUnit()->getId() > 0) {
				if (intval($data["pricetype_pricetype_id"]) == 0) {
					throw new Exception("Invalid new Price Type");
				}

				$purchaseletter->getPriceType()->setId($data["pricetype_pricetype_id"]);
				$purchaseletter->setDate($data["changeprice_date"]);

				$priceData        = new Erems_Models_Sales_PriceAlt();
				$priceAdminData   = new Erems_Models_Sales_PriceAdmin();
				$billingRulesTran = new Erems_Models_Sales_BillingRulesTran();

				/* fill price data */
				$prAr = array();
				foreach ($data as $k => $v) {
					if (strpos($k, "pricenew") > -1) {
						$prAr[str_replace("pricenew_", "", $k)] = $v;
					}
				}
				$priceData->setArrayTable($prAr);

				/* fill price admin */
				$prAr = array();
				foreach ($data as $k => $v) {
					if (strpos($k, "new_") > -1) {
						$prAr[str_replace("new_", "", $k)] = $v;
					}
				}
				$priceAdminData->setArrayTable($prAr);

				/* fill billing rules */
				$prAr = array();
				foreach ($data as $k => $v) {
					if (strpos($k, "billingrules") > -1) {
						$prAr[str_replace("billingrules_", "", $k)] = $v;
					}
				}
				$billingRulesTran->setArrayTable($prAr);

				$purchaseletter->setPrice($priceData);
				$purchaseletter->setPriceAdmin($priceAdminData);
				$purchaseletter->setBilling($billingRulesTran);

				$addOnParams = $data["addonparams"];

				// $unit->setArrayTable($unitDb[1][0]);
				$unit->setPropertyInfo($changePrice->getPropertyInfo());
				$price->setUnit($unit);
				$price->setPurchaseLetter($purchaseletter);

				$price->isEditTanahpermeter          = $addOnParams["isEditTanahpermeter"];
				$price->isEditTotaltanah             = $addOnParams["isEditTotaltanah"];
				$price->isEditKelebihantanahpermeter = $addOnParams["isEditKelebihantanahpermeter"];
				$price->isEditTotalkelebihantanah    = $addOnParams["isEditTotalkelebihantanah"];
				$price->isEditAmountPPNTanah         = $addOnParams["isEditAmountPPNTanah"];
				$price->isEditAmountPPNBangunan      = $addOnParams["isEditAmountPPNBangunan"];
				$price->isEditAmountPPNBM            = $addOnParams["isEditAmountPPNBM"];
				$price->isEditAmountPPH22            = $addOnParams["isEditAmountPPH22"];
				$price->isEditPersenPPNSubsididp     = $addOnParams["isEditPersenPPNSubsididp"];
				$price->isEditAmountPPNSubsididp     = $addOnParams["isEditAmountPPNSubsididp"];
				$price->isEditPersenPPNInterior      = $addOnParams["isEditPersenPPNInterior"];
				$price->isEditAmountPPNInterior      = $addOnParams["isEditAmountPPNInterior"];

				$price->process();

				// $purchaseletter->getUnit()->setStatus(Erems_Box_Config::UNITSTATUS_SOLD);
				$purchaseletter->setNomor(Erems_Box_Models_App_DocPrefixGenerator::get("PCHLR"));
				$purchaseletter->setRencanaSerahTerima($data["purchaseletter_rencana_serahterima"]);
				$purchaseletter->setRencanaSerahTerimaDate($data["purchaseletter_rencana_serahterima_date"]);

				foreach ($data["detail"] as $row) {
					$sch = new Erems_Models_Purchaseletter_Schedule();
					$sch->setArrayTable($row);
					$sch->setScheduleTypeId($this->getScheduleTypeId($row["scheduletype_scheduletype"]));

					$purchaseletter->addSchedule($sch);
				}

				$de = new Erems_Box_Delien_DelimiterEnhancer();
				$de->setDelimiterCandidate($purchaseletter);
				$de->generate();

				$this->purchasLetter = $purchaseletter;
			}
		}


		return $changePrice;
	}

	private function getScheduleTypeId($stName) {
		if ($stName == "TJ") {
			return Erems_Box_Config::SCHTYPE_TANDAJADI;
		} else if ($stName == "UM") {
			return Erems_Box_Config::SCHTYPE_UANGMUKA;
		} else if ($stName == "INH") {
			return Erems_Box_Config::SCHTYPE_INH;
		} else if ($stName == "KPR") {
			return Erems_Box_Config::SCHTYPE_KPR;
		} else if ($stName == "SIP") {
			return Erems_Box_Config::SCHTYPE_CASH;
		} else if ($stName == "PPNDTP") {
			return Erems_Box_Config::SCHTYPE_PPNDTP;
		}
	}

	public function daoUpdate($dao, $object) {
		$hasilApprove     = 0;
		$isApproveColl    = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getProject()->getId(), $this->session->getPt()->getId())->isCollectionApprove();
		$newNomorPl       = "";
		$enableSuffixPlNo = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getProject()->getId(), $this->session->getPt()->getId())->usePurchaseletterNumberTail();

		if ($enableSuffixPlNo) {
			$changePriceInfoA = $dao->getOneCPByCP($object);
			$changePriceA     = Erems_Box_Tools::toObjectRow($changePriceInfoA, new Erems_Models_Sales_Change_ChangePrice());

			$rev = new Erems_Models_Sales_Revision();
			$rev->setId($changePriceA->getRevision()->getId());
			$changePriceInfo = $dao->getOneCP($rev);
			$changePrice     = Erems_Box_Tools::toObjectRow($changePriceInfo, new Erems_Models_Sales_Change_ChangePrice(), array(new Erems_Models_Purchaseletter_PurchaseLetter()));

			$nomorPl    = $changePrice->getPurchaseletter()->getNomor();
			$newNomorPl = Erems_Models_Sales_Change_Tools::getSuffixPurchaseNumber($changePrice->getPurchaseletter()->getId(), $nomorPl, $dao);

		}

		if ($isApproveColl) {
			if (intval($this->docStatus) > 0) {
				$hasilApprove = $dao->approveCPColl($object, $this->docStatus,$newNomorPl);
			}
		} else {
			if (intval($this->docStatus) > 0) {
				$hasilApprove = $dao->approveCP($object, $this->docStatus,$newNomorPl);
			}
		}
		$others = NULL;

		return array("status" => $hasilApprove, "others" => $others);
	}

	public function daoSave($dao, $object) {
		$hasilSave = $dao->saveCP($object, $this->purchasLetter->getPrice(), $this->purchasLetter->getPriceAdmin(), $this->purchasLetter);

		$sendMail = false;
		$others   = array(
			"SEND_MAIL"   => FALSE,
			"SEND_STATUS" => FALSE,
			"SEND_OTHERS" => NULL // other information of send mail
		);

		$message = "";

		if ($hasilSave > 0) { // jika berhasil save data, maka cek param send mail
			$params   = new Erems_Models_Sales_Change_ChangePriceParams($this->getSession());
			$sendMail = intval($params->getSendMail());

			if ($sendMail > 0) {
				$others["SEND_MAIL"] = TRUE;
				try {
					$others["SEND_STATUS"] = TRUE;

					$object->setId($hasilSave);
					$approveUserId = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getAuthorizeUser($this->getSession()->getProject()->getId(), $this->getSession()->getPt()->getId(), "CHANGEPRICE_APPROVEUSER");



					$approveUserId = is_array($approveUserId)?intval($approveUserId[0]):$approveUserId;


					$cnEmail = $dao->getEmailCP($object, $approveUserId);

					//ambil email FC dan GM
					$gDao = new Erems_Models_Master_GeneralDao();
					$fcListParam = $gDao->getGlobalParameterSolo($this->getSession()->getProject()->getId(), $this->getSession()->getPt()->getId(),"SP_EMAIL_FC_LIST");

					$gmListParam = $gDao->getGlobalParameterSolo($this->getSession()->getProject()->getId(), $this->getSession()->getPt()->getId(),"SP_EMAIL_GM_LIST");

					//addby imaam on 20200915
					$useDataGM = FALSE;
					$dataProject = $gDao->getProjectDetail($this->getSession()->getProject()->getId());
					$dataCP = $dao->getOneCPByCP($object);
					if($dataProject['is_cpms'] == 1){
						if(($dataCP[1][0]['landsize'] != $dataCP[1][0]['landsize_new']) || ($dataCP[1][0]['buildingsize'] != $dataCP[1][0]['buildingsize_new']) || ($dataCP[1][0]['kelebihan'] != $dataCP[1][0]['kelebihan_new'])){
							$useDataGM = TRUE;
							$approveUserId = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getSession()->getProject()->getId(), $this->getSession()->getPt()->getId())->UserGMProject();
							$approveUserId = is_array($approveUserId)?intval($approveUserId[0]):$approveUserId;
							$mailGM = $gDao->getUsersInfo($approveUserId);
							$cnEmail[0][0]["user_email"] = $mailGM[0][0]['user_email'];
							$cnEmail[0][0]["user_fullname"] = $mailGM[0][0]['user_fullname'];
							$UserMM = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getAuthorizeUser($this->getSession()->getProject()->getId(), $this->getSession()->getPt()->getId(), "CHANGEPRICE_APPROVEUSER");
							$UserMM= is_array($UserMM)?intval($UserMM[0]):$UserMM;
							$UserTeknik = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->getSession()->getProject()->getId(), $this->getSession()->getPt()->getId())->UserTeknikProject();
							$UserTeknik= is_array($UserTeknik)?intval($UserTeknik[0]):$UserTeknik;
							$dataUser = $UserMM.'~'.$UserTeknik;
							$mailcc = $gDao->getUsersInfo($dataUser);
						}
					}
					$fcListParam = $fcListParam[0];
					 $gmListParam = $gmListParam[0];

					if(is_array($fcListParam)){
						if(count($fcListParam) > 0){
							$fcListParam = $fcListParam[0]["value"];

						}

					}

					if(is_array($gmListParam)){
						if(count($gmListParam) > 0){
							$gmListParam = $gmListParam[0]["value"];

						}

					}


					//end ambil email FC dan GM



					$players = array(
						'approve' => array(
							'email' => $cnEmail[0][0]["user_email"],
							'name' => $cnEmail[0][0]["user_fullname"]
						)
					);

					$others["SEND_OTHERS"] = $players;





				   // $message = '<html><body>';
					//$message .= '<p>Dear ' . $cnEmail[0][0]["user_fullname"] . '</p>';

					$messageHead = '<html><body><p>Dear ' . $cnEmail[0][0]["user_fullname"] . '</p>';


					$message = '<p> <br/>';
					$message .= '</p>';
					$message .= '<p>Berikut permohonan transaksi pada CES (Ciputra Enterprise System), <br/>';
					$message .= 'Mohon bantuan untuk persetujuannya.	<br/>';
					$message .= '</p>';
					$message .= '<p>';
					$message .= '<table>';
					$message .= '<tr><td>Persetujuan        </td><td>: Perubahan Harga </td></tr>';
					$message .= '<tr><td>Persetujuan No     </td><td>: ' . $cnEmail[0][0]["nomor_persetujuan"] . '</td></tr>';
					$message .= '<tr><td>Nomor Unit       </td><td>: ' . $cnEmail[0][0]["nomor_unit"] . '</td></tr>';
					$message .= '<tr><td>Nama Customer       </td><td>: ' . $cnEmail[0][0]["nama_customer"] . '</td></tr>';
					$message .= '<tr><td>Nama Pemohon       </td><td>: ' . $cnEmail[0][0]["nama_pemohon"] . '</td></tr>';
					$message .= '<tr><td>Nama Sales         </td><td>: ' . $cnEmail[0][0]["nama_salesman"] . '</td></tr>';
					$message .= '<tr><td>Tanggal permohonan </td><td>: ' . date("d-m-Y H:i:s") . '</td></tr>';
					$message .= '<tr><td>Proyek </td><td>: ' . $cnEmail[0][0]["nama_proyek"] . '</td></tr>';
					$message .= '</table>';
					$message .= '</p>';
					$message .= '<p>Deskripsi			:</p>';
					$message .= '<p> <br/>';
					$message .= '<p><br/><b>' . $cnEmail[0][0]["status_wo"] . '</b></p>';
					$message .= '<p> <br/>';
					$message .= '<br/>';
					$message .= '<br/>';
					$message .= '<a href="https://ces.ciputragroup.com/">Login disini untuk proses persetujuan</a><br/>';
					$message .= '<br/>';
					$message .= '<br/>';
					$message .= 'Terima Kasih,	</p>';
					$message .= '<p> &nbsp; </p>';
					$message .= '<p>' . $cnEmail[0][0]["nama_pemohon"] . ' </p>';
					$message .= "</body></html>";

					$finalMessage = $messageHead."".$message;






					$mail = new Erems_Box_Library_Email();
					$mail->getMail()->setFrom('ces@ciputra.co.id', "CES System");
					$mail->getMail()->setBodyHtml(nl2br($finalMessage));
					$mail->getMail()->addTo($players["approve"]["email"], $players["approve"]["name"]);
					if($useDataGM){
						foreach($mailcc[0] as $row){
							$mail->getMail()->addCc($row['user_email'],$row['user_fullname']);
						}
					}
					if(strlen($fcListParam) > 3){
						$fcListParam = explode(",", $fcListParam);
						foreach($fcListParam as $row){
							$mail->getMail()->addCc($row,$row);
						}

					}
					if(strlen($gmListParam) > 3){
						$gmListParam = explode(",", $gmListParam);
						foreach($gmListParam as $row){
							$mail->getMail()->addCc($row,$row);
						}

					}
				//    $mail->getMail()->addBcc("jerry.peter@ciputra.co.id", "Jerry Peter");
					$mail->getMail()->setSubject('Request for Change Price of Purchaseletter');
					$mail->getMail()->send();

					$statusSentMail = TRUE;
				} catch (Zend_Mail_Exception $e) {
					$statusSentMail = FALSE;
					$this->logError($message, $e->getMessage());
				}
			}
		}

		//addon 20180702
		/// collection user
		if ($hasilSave > 0) {
			$this->emailToCollectionUser($message);
		}


		return array("status" => $hasilSave, "others" => $others);
	}

	private function emailToCollectionUser($message) {


		$projectId = $this->session->getProject()->getId();
		$ptId = $this->session->getPt()->getId();

		$isCollectionApprove = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectId, $ptId)->isCollectionApprove();




		if ($isCollectionApprove) {

			$collApproveUser = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($projectId, $ptId)->getCollectionApproveUser();
			$collApproveUser = isset($collApproveUser["CHANGEPRICE_APPROVEUSER"]) ? $collApproveUser["CHANGEPRICE_APPROVEUSER"] : 0;

			if (is_array($collApproveUser)) {
				$collApproveUser = implode("~", $collApproveUser);
			} else {
				if (intval($collApproveUser) == 0) { /// jika user id tidak valid
					return FALSE;
				}
			}



			$userDao = new Erems_Models_Master_UserDao();
			$userInfo = $userDao->getUserByMultiId($collApproveUser);

			if (count($userInfo[0]) == 0) { /// jika tidak ada informasi user di database user
				return FALSE;
			}

			$userInfo = $userInfo[0];






			foreach ($userInfo as $user) {

				$receiver = array(
					"email" => $user["user_email"],
					"name" => $user["user_fullname"]
				);

				try {

					 $messageHead = '<html><body><p>Dear ' . $receiver["name"] . '</p>';
					 $finalMessage = $messageHead."".$message;



					$mail = new Erems_Box_Library_Email();
					$mail->getMail()->setFrom('ces@ciputra.co.id', "CES System");
					$mail->getMail()->setBodyHtml(nl2br($finalMessage));
					$mail->getMail()->addTo($receiver["email"], $receiver["name"]);
					$mail->getMail()->setSubject('Request for Change Price of Purchaseletter (Collection User Ver.)');
					$mail->getMail()->send();

					$statusSentMail = TRUE;
				} catch (Zend_Mail_Exception $e) {
					$statusSentMail = FALSE;
					$this->logError($message, $e->getMessage());
				}
			}
		}
	}

	private function logError($msg, $erMsg) {
		$file = 'erems_perubahan_log.txt';
		$file = APPLICATION_PATH . '/../public/app/erems/log/' . $file;
		$current = file_get_contents($file);
		$current .= "[" . date("d-m-Y H:i:s") . "][MSG] Email gagal terkirim \r\n";
		$current .= "[" . date("d-m-Y H:i:s") . "][HTML] " . $msg . "\r\n";
		$current .= "[" . date("d-m-Y H:i:s") . "][MAIL] " . $erMsg . "\r\n";
		file_put_contents($file, $current);
	}

}

?>
