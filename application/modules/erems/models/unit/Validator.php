<?php

/**
 * Description of Validator
 *
 * @author MIS
 */
class Erems_Models_Unit_Validator extends Erems_Box_Models_App_Validator {

	public $session;
	public $paramData;

	public $genco; // added by rico 08032023

	public function run(Erems_Models_Unit_UnitTran $unit) {
		$msg = "";

		/// cek ada pakai virutal account mandiri
		$vaMandiriActive = FALSE;
		$vaManadiriCek = FALSE;
		$vaMandiriErrorMsg = "";
		$pgDao = new Erems_Models_Master_GeneralDao();
		$pgHasil = $pgDao->getGlobalParameterSolo($this->session->getProject()->getId(), $unit->getPt()->getId(), "VA_MANDIRI_FORMAT");
		if (is_array($pgHasil)) {
			if (count($pgHasil) > 0) {
				if (is_array($pgHasil[0])) {
					if (count($pgHasil[0]) > 0) {
						if (strlen($pgHasil[0][0]["value"]) > 5) {
							$vaMandiriActive = TRUE;
						}
					}
				}
			}
		}
		if ($vaMandiriActive) {
			$unitProcs = new Erems_Models_App_Box_UnitProcessor();
			$numbers = $unitProcs->createMultiNumber($this->paramData, $unit->getNumber());
			$numbers = implode("~", $numbers);
			$uDao = new Erems_Models_Unit_UnitDao();
			$vaCek = $uDao->vaMandiriCheck($this->session->getProject()->getId(), $unit->getPt()->getId(), $unit, $numbers);

			$hasilvaCek = intval($vaCek[0][0]["hasil"]);
			$vaMandiriErrorMsg = $vaCek[0][0]["pesan_error"];


			if (strlen($vaMandiriErrorMsg) > 5) {
				$vaMandiriErrorMsgAr = explode(".", $vaMandiriErrorMsg);
				$vaMandiriErrorMsg = implode(" <br/> ", $vaMandiriErrorMsgAr);
			}

			$vaManadiriCek = $hasilvaCek > 0 ? TRUE : FALSE;
		}

		// end cek ada pakai virutal account mandiri

		// add by dika 20221019 menambah validasi lantai
		$maxJumlahLantai = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($this->session->getProject()->getId(),$this->session->getPt()->getId())->maxJumlahLantai();


//		if ($unit->getBuildingSize() > 0) {
		if ($unit->getBuildingSize() > 0 && $unit->getProductCategory()->getCode() == Erems_Box_Config::PRODUCTCATEGORYCODE_KAVLING) {
			$msg = "Invalid building size";
		} else if ($unit->getCluster()->getId() == 0) {
			$msg = "Invalid cluster";
		} else if (strlen($unit->getNumber()) == 0) {
			$msg = "Invalid unit number";
		} else if ($unit->getPt()->getId() == 0 && $this->genco == 0) {
			$msg = "Invalid Pt";
//        } else if ($unit->getProductCategory()->getId() == 0) {                       // modiby fatkur modion 18.07.19
//            $msg = "Invalid Product Category";
//        } else if ($unit->getType()->getId() == 0) {
//            $msg = "Invalid Type";
		} else if ($unit->getBlock()->getId() == 0) {
			$msg = "Invalid Block";
		} else if ($unit->getPosition()->getId() == 0 && $unit->getIsFasum() == 0) {
			$msg = "Invalid Position";
		} else if ($unit->getSide()->getId() == 0 && $unit->getIsFasum() == 0) {
			$msg = "Invalid Side";
		} else if ($unit->getPurpose()->getId() == 0 && $unit->getIsFasum() == 0) {
			$msg = "Invalid Purpose";
		} else if ($vaMandiriActive && !$vaManadiriCek) {
			$msg = "VA Mandiri tidak bisa digenerate. " . $vaMandiriErrorMsg;
		} else if ($unit->getProductCategory()->getCode() == Erems_Box_Config::PRODUCTCATEGORYCODE_BANGUNAN && $unit->getPropertyInfo()->getFloor() <= 0) {
			$msg = "Jumlah lantai harus lebih dari 0";
		}else if($unit->getProductCategory()->getCode() == Erems_Box_Config::PRODUCTCATEGORYCODE_KAVLING && $unit->getPropertyInfo()->getFloor() > 0){
            $msg = "Jumlah lantai untuk kategori kavling tidak bisa lebih dari 0";
        } else if ($unit->getPropertyInfo()->getFloor() > $maxJumlahLantai) {
			$msg = "Jumlah lantai tidak bisa lebih besar dari " . $maxJumlahLantai;
		} else {

			/// cek nomor unit sudah terdaftar atau belum
			if ($unit->getId() == 0) {
				$unit->setProject($this->session->getProject());
				$dao = new Erems_Models_Unit_UnitDao();
				$checkUnit = $dao->checkUnitNumber($unit);

				if (count($checkUnit[0]) > 0) {
					$msg = "Unit number : " . $unit->getNumber() . " already exist.";
				} else {
					$this->setStatus(TRUE);
				}
			} else {
				$this->setStatus(TRUE);
			}
		}
		$this->setMsg($msg);
	}

}

?>
