<?php

ini_set("memory_limit", "-1");
ini_set('max_execution_time', 0);

/**
 * Description of UnitDao
 *
 * @author tommytoban
 */
class Erems_Models_Unit_UnitDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {

	public function checkUnitNumber(Erems_Models_Unit_UnitTran $ut) {
		$hasil = array();


		$hasil = $this->dbTable->SPExecute('sp_unitnumberexist_read', $ut->getProject()->getId(),
				$ut->getPt()->getId(), $ut->getNumber(), $ut->getCluster()->getId());
		return $hasil;
	}

	public function getByProjectPt(Erems_Models_Unit_UnitTran $ut) {
		$hasil = array();
		$project = $ut->getProject()->getId();
		$pt = $ut->getPt()->getId();
		if ($project == 0 || $pt == 0) {
			return $hasil;
		}
		$hasil = $this->dbTable->SPExecute('sp_unitb_read', $project, $pt);
		return $hasil;
	}

	public function getHistory($unitId, Erems_Box_Models_App_HasilRequestRead $request) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_unit_history_read', $unitId, $request->getPage(), $request->getLimit());

		return $hasil;
	}

	public function getByProjectPtWitPage(Erems_Models_Unit_UnitTran $ut, Erems_Box_Models_App_HasilRequestRead $request) {
		$hasil = array();
		$project = $ut->getProject()->getId();
		$pt = $ut->getPt()->getId();
		if ($project == 0 || $pt == 0) {
			return $hasil;
		}

		$hasil = $this->dbTable->SPExecute('sp_unitc_read', $project, $pt, $request->getPage(), $request->getLimit(), $request->getOthersValue("unit_number"),
				Erems_Box_Tools::cleanInt($request->getOthersValue("cluster_cluster_id")),
				Erems_Box_Tools::cleanInt($request->getOthersValue("unitstatus_unitstatus_id")),
				$ut->getId(),
				Erems_Box_Tools::cleanInt($request->getOthersValue("block_block_id")),
				$request->getOthersValue("virtualaccount_bca"),
				$request->getOthersValue("virtualaccount_mandiri"),
				$request->getOthersValue("sort_by"),
				$request->getOthersValue("sort_type")
		);


		return $hasil;
	}

	public function getHoldBookingUnit(Erems_Models_Unit_UnitTran $ut, Erems_Box_Models_App_HasilRequestRead $request) {
		$hasil = array();
		$project = $ut->getProject()->getId();
		$pt = $ut->getPt()->getId();
		if ($project == 0 || $pt == 0) {
			return $hasil;
		}

		$hasil = $this->dbTable->SPExecute('sp_unitholdbooking_read', $project, $pt, $request->getPage(), $request->getLimit(), $request->getOthersValue("unit_number"));


		return $hasil;
	}

	public function getByProjectPtWitPageBlmSiapJual(Erems_Models_Unit_UnitTran $ut, Erems_Box_Models_App_HasilRequestRead $request) {
		$hasil = array();
		$project = $ut->getProject()->getId();
		$pt = $ut->getPt()->getId();
		if ($project == 0 || $pt == 0) {
			return $hasil;
		}

		$hasil = $this->dbTable->SPExecute('sp_popupunitbelumsiapjual_read', $project, $pt, $request->getPage(), $request->getLimit(), $request->getOthersValue("unit_number"),
				Erems_Box_Tools::cleanInt($request->getOthersValue("cluster_cluster_id")),
				Erems_Box_Tools::cleanInt($request->getOthersValue("unitstatus_unitstatus_id")),
				$ut->getId(),
				Erems_Box_Tools::cleanInt($request->getOthersValue("block_block_id"))
		);


		return $hasil;
	}

	public function getByProjectPtWitPage2(Erems_Models_Unit_UnitTran $ut, Erems_Box_Models_App_HasilRequestRead $request) {
		$hasil = array();
		$project = $ut->getProject()->getId();
		$pt = $ut->getPt()->getId();
		if ($project == 0 || $pt == 0) {
			return $hasil;
		}

		$genco = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($project, $pt);
		$f = $genco->activateSh1Features("townplanning_is_legal");

		if ($f) {
			$hasil = $this->dbTable->SPExecute('sp_unitd2_read', $project, $pt, $request->getPage(), $request->getLimit(), $request->getOthersValue("unit_number"),
					Erems_Box_Tools::cleanInt($request->getOthersValue("cluster_cluster_id")),
					Erems_Box_Tools::cleanInt($request->getOthersValue("unitstatus_unitstatus_id")),
					$ut->getId(),
					Erems_Box_Tools::cleanInt($request->getOthersValue("block_block_id")),
					$ut->getIsReadyStock(),
					Erems_Box_Tools::cleanInt($request->getOthersValue("type_type_id")),
					Erems_Box_Tools::cleanInt($request->getOthersValue("position_position_id")),
					Erems_Box_Tools::cleanInt($request->getOthersValue("side_side_id"))
			);
		} else {
			//is_legal not mandatory
			$hasil = $this->dbTable->SPExecute('sp_unitd_read', $project, $pt, $request->getPage(), $request->getLimit(), $request->getOthersValue("unit_number"),
					Erems_Box_Tools::cleanInt($request->getOthersValue("cluster_cluster_id")),
					Erems_Box_Tools::cleanInt($request->getOthersValue("unitstatus_unitstatus_id")),
					$ut->getId(),
					Erems_Box_Tools::cleanInt($request->getOthersValue("block_block_id")),
					$ut->getIsReadyStock(),
					Erems_Box_Tools::cleanInt($request->getOthersValue("type_type_id")),
					Erems_Box_Tools::cleanInt($request->getOthersValue("position_position_id")),
					Erems_Box_Tools::cleanInt($request->getOthersValue("side_side_id"))
			);
		}

		return $hasil;
	}

	public function getBySpk($project, $pt, $spkId, Erems_Box_Models_App_HasilRequestRead $request) {
		$hasil = array();

		if ($project == 0 || $pt == 0) {
			return $hasil;
		}

		$hasil = $this->dbTable->SPExecute('sp_unitc_byspk_read', $project, $pt,
				$request->getPage(), $request->getLimit(), $spkId);
		return $hasil;
	}

	/*
	  public function getByProjectPtNotinSPK(Erems_Models_Unit_UnitTran $ut,  Erems_Box_Models_App_HasilRequestRead $request){
	  $hasil = array();



	  if($project==0 || $pt==0){
	  return $hasil;
	  }

	  return $hasil;

	  $hasil = $this->dbTable->SPExecute('sp_unitc_notin_spk_read',$project,$pt,$request->getPage(),$request->getLimit(),$request->getOthersValue("unit_number"),
	  Erems_Box_Tools::cleanInt($request->getOthersValue("cluster_cluster_id")),
	  Erems_Box_Tools::cleanInt($request->getOthersValue("unitstatus_unitstatus_id")),
	  $ut->getId(),
	  Erems_Box_Tools::cleanInt($request->getOthersValue("block_block_id"))
	  );

	  //  var_dump($this->dbTable);

	  return $hasil;
	  }

	 */

	public function getByProjectPtNotinSPK(Erems_Models_Unit_UnitTran $ut, Erems_Box_Models_App_HasilRequestRead $request, $project, $pt) {
		$hasil = array();



		if ($project == 0 || $pt == 0) {
			return $hasil;
		}



		$hasil = $this->dbTable->SPExecute('sp_unitc_notin_spk_read', $project, $pt, $request->getPage(),
				$request->getLimit()
		);

		/*
		  $hasil = $this->dbTable->SPExecute('sp_unitc_notin_spk_read',$project,$pt,$request->getPage(),$request->getLimit(),
		  $request->getOthersValue("unit_number"),
		  $request->getOthersValue("cluster_cluster_id"),
		  $request->getOthersValue("unitstatus_unitstatus_id"),
		  $ut->getId(),
		  $request->getOthersValue("block_block_id")
		  );

		 */

		//  var_dump($this->dbTable);

		return $hasil;
	}

	public function getByProjectPtNotinSPKWOPL(Erems_Models_Unit_UnitTran $ut, Erems_Box_Models_App_HasilRequestRead $request) {
		$hasil = array();
		$project = $ut->getProject()->getId();
		$pt = $ut->getPt()->getId();
		if ($project == 0 || $pt == 0) {
			return $hasil;
		}

		$hasil = $this->dbTable->SPExecute('sp_unitc_notin_spk_read', $project, $pt, 1, 99999, $request->getOthersValue("unit_number"),
				Erems_Box_Tools::cleanInt($request->getOthersValue("cluster_cluster_id")),
				Erems_Box_Tools::cleanInt($request->getOthersValue("unitstatus_unitstatus_id")),
				$ut->getId(),
				Erems_Box_Tools::cleanInt($request->getOthersValue("block_block_id"))
		);
		return $hasil;
	}

	public function getAll(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Unit_UnitTran $ut) {
		$hasil = array();
		$project = $ut->getProject()->getId();
		$pt = $ut->getPt()->getId();
		if ($project == 0 || $pt == 0) {
			return $hasil;
		}

		$hasil = $this->dbTable->SPExecute('sp_unitb_read', $project, $pt, $r->getPage(), $r->getLimit(), $ut->getStatus()->getId(),
				$ut->getNumber(), $ut->getBlock()->getId(),
				$r->getOthersValue('purchaseletter_no'),
				$r->getOthersValue('customer_name'));




		return $hasil;
	}

	
	public function getAllLunas(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Unit_UnitTran $ut) {
		$hasil = array();
		$project = $ut->getProject()->getId();
		$pt = $ut->getPt()->getId();
		if ($project == 0 || $pt == 0) {
			return $hasil;
		}

		$sp_name = '';
		if ($r->getOthersValue("is_draft") == 'true' or $r->getOthersValue("is_draft") == 1) {
			$sp_name = 'sp_unitb_nonlunas_draft_read';
		} else {
			$sp_name = 'sp_unitb_nonlunas_read';
		}

		$hasil = $this->dbTable->SPExecute('sp_unitb_lunas_read', $project, $pt, $r->getPage(), $r->getLimit(), $ut->getStatus()->getId(),
				$ut->getNumber(), $ut->getBlock()->getId(),
				$r->getOthersValue('purchaseletter_no'),
				$r->getOthersValue('customer_name'),
				$r->getOthersValue('unit_id'));




		return $hasil;
	}
	
	/* yang belum lunas saja */

	public function getAllNonLunas(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Unit_UnitTran $ut) {
		$hasil = array();
		$project = $ut->getProject()->getId();
		$pt = $ut->getPt()->getId();
		if ($project == 0 || $pt == 0) {
			return $hasil;
		}

		$sp_name = '';
		if ($r->getOthersValue("is_draft") == 'true' or $r->getOthersValue("is_draft") == 1) {
			$sp_name = 'sp_unitb_nonlunas_draft_read';
		} else {
			$sp_name = 'sp_unitb_nonlunas_read';
		}

		$hasil = $this->dbTable->SPExecute($sp_name, $project, $pt, $r->getPage(), $r->getLimit(), $ut->getStatus()->getId(),
				$ut->getNumber(), $ut->getBlock()->getId(),
				$r->getOthersValue('purchaseletter_no'),
				$r->getOthersValue('customer_name'),
				$r->getOthersValue('unit_id'));




		return $hasil;
	}

	public function getAllV2(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Unit_UnitTran $ut) {
		$hasil = array();
		$project = $ut->getProject()->getId();
		$pt = $ut->getPt()->getId();
		if ($project == 0 || $pt == 0) {
			return $hasil;
		}

		$hasil = $this->dbTable->SPExecute('sp_unitb_v2_read', $project, $pt, $r->getPage(), $r->getLimit(), $ut->getStatus()->getId(),
				$ut->getNumber(), $ut->getBlock()->getId(),
				$r->getOthersValue('purchaseletter_no'),
				$r->getOthersValue('customer_name'));




		return $hasil;
	}

	/* get all without purchaseletter */

	public function getAllWoP(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Unit_UnitTran $ut) {
		$hasil = array();

		$project = $ut->getProject()->getId();
		$pt = $ut->getPt()->getId();
		if ($project == 0 || $pt == 0) {
			return $hasil;
		}

		$hasil = $this->dbTable->SPExecute('sp_unitbsimple_read', $project, $pt, $r->getPage(), $r->getLimit(), $ut->getStatus()->getId(),
				$ut->getNumber(), $ut->getBlock()->getId(), $r->getOthersValue('purchaseletter_no'), $r->getOthersValue('customer_name'));

		return $hasil;
	}

	public function getAllWoP2(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Unit_UnitTran $ut) {
		$hasil = array();
		$project = $ut->getProject()->getId();
		$pt = $ut->getPt()->getId();
		if ($project == 0 || $pt == 0) {
			return $hasil;
		}

		$hasil = $this->dbTable->SPExecute('sp_unitbsimpleb_read', $project, $pt, $r->getPage(), $r->getLimit(), $ut->getStatus()->getId(),
				$ut->getNumber(), $ut->getBlock()->getId(), $ut->getIsReadySell());

		return $hasil;
	}

	public function getOne(Erems_Models_Unit_Unit $unit) {
		$hasil = array();
		$unitId = (int) $unit->getId();
		if ($unitId == 0) {
			return $hasil;
		}
		$hasil = $this->dbTable->SPExecute('sp_unit_one_read', $unitId);
		return $hasil;
	}

	public function getOneUnit($unit_id) {
		$hasil = array();
		$hasil = $this->dbTable->SPExecute('sp_unit_one_read', $unit_id);
		return $hasil;
	}

	public function getOneWithSpkInfo(Erems_Models_Unit_Unit $unit) {
		$hasil = array();
		$unitId = (int) $unit->getId();
		if ($unitId == 0) {
			return $hasil;
		}
		$hasil = $this->dbTable->SPExecute('sp_unit_one_withspkcount_read', $unitId);

		return $hasil;
	}

	public function getAllSpkCount(Erems_Models_Unit_UnitTran $ut) {
		$hasil = array();
		$project = $ut->getProject()->getId();
		$pt = $ut->getPt()->getId();
		if ($project == 0 || $pt == 0) {
			return $hasil;
		}
		$hasil = $this->dbTable->SPExecute('sp_unitspk_read', $project, $pt);

		return $hasil;
	}

	public function getPurchaseLetterInfo(Erems_Models_Unit_Unit $ut) {
		$hasil = array();
		if ($ut->getId() == 0) {
			return $hasil;
		}
		$hasil = $this->dbTable->SPExecute('sp_unitpurchaseletter_read', $ut->getId());

		return $hasil;
	}

	public function getNonPurchaseLetterInfo(Erems_Models_Unit_Unit $ut) {
		$hasil = array();
		if ($ut->getId() == 0) {
			return $hasil;
		}
		$hasil = $this->dbTable->SPExecute('sp_unitnonpurchaseletter_read', $ut->getId());

		return $hasil;
	}

	public function getUnitConstructionList(Erems_Box_Models_App_HasilRequestRead $r, $project, $pt) {
		$hasil = array();
		$clusterId = intval($r->getOthersValue("cluster_id"));
		$clusterId = $clusterId == 999 ? 0 : $clusterId;
		$blockId = intval($r->getOthersValue("block_id"));
		$blockId = $blockId == 999 ? 0 : $blockId;
		$spkId = intval($r->getOthersValue("spk_id"));
		$spkId = $spkId == 999 ? 0 : $spkId;
		
		$order_bangun = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($project, $pt)->VisibleOrderBangun();

		$hasil = $this->dbTable->spToQuery2('sp_unitconstruction_read', $r->getPage(), $r->getLimit(),
				$clusterId, $blockId, $spkId, $r->getOthersValue("unit_number"),
				$project, $pt, $order_bangun);
		return $hasil;
	}

	public function getPrice($unitId) {
		$unitId = (int) $unitId;
		$hasil = array();
		if ($unitId > 0){
			$hasil = $this->dbTable->SPExecute('sp_unitprice_read', $unitId);
		}
		return $hasil;
	}

	public function getAllUnitStatus(Erems_Models_Unit_Status $status) {
		$hasil = array();
		$session = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
		$hasil = $this->dbTable->SPExecute('sp_unitstatus_read', $session->project);
		return $hasil;
	}

	public function save(Erems_Models_Unit_UnitTran $unit, Erems_Models_Unit_Header $header) {
		$hasil = 0;


		$dcResult = $header->getDCResult();

		$hasil = $this->dbTable->SPUpdate('sp_unitb_create', $unit->getAddBy(), $unit->getProject()->getId(),
				$unit->getPt()->getId(), $unit->getStatus()->getId(), $unit->getCluster()->getId(),
				$unit->getProductCategory()->getId(), $unit->getType()->getId(),
				$unit->getBlock()->getId(), $unit->getPosition()->getId(),
				$unit->getSide()->getId(), $unit->getPurpose()->getId(),
				$dcResult["unit_id"],
				$dcResult["unit_number"], $dcResult["land_size"],
				$dcResult["building_size"], $dcResult["floor_size"],
				$dcResult["floor"],
				$dcResult["bedroom"], $dcResult["bathroom"],
				$dcResult["electricity"],
				$dcResult["width"], $dcResult["long"],
				$dcResult["kelebihan"],
				$dcResult["depan"], $dcResult["belakang"],
				$dcResult["samping"], $dcResult["konsepdasar"],
				$dcResult["is_hookcalculated"], $dcResult["is_tamancalculated"],
				"", "", $unit->getLebarJalan(), $unit->getGambarRumah(), $unit->getIsReadyStock(),
				$unit->getTanahCode()->getId(),
				$unit->getIsFasum(), $unit->getGambar(), $unit->getNotes_siapstock(),$unit->getOrientasi()
		);




		return $hasil;
	}

	public function update(Erems_Models_Unit_UnitTran $unit) {
		$hasil = 0;

		$hasil = $this->updateIntern($unit, $unit->getPropertyInfo(), $unit->getUnitHistory());

		return $hasil;
	}

	private function updateIntern(Erems_Models_Unit_UnitTran $unit, Erems_Models_Unit_PropertyInfo $pi, Erems_Models_Unit_UnitHistory $uh) {
		$hasil = 0;

		$hasil = $this->dbTable->SPUpdate('sp_unitb_update', $unit->getAddBy(), $unit->getId(),
				$unit->getPt()->getId(), $unit->getCluster()->getId(),
				$unit->getProductCategory()->getId(), $unit->getType()->getId(),
				$unit->getBlock()->getId(), $unit->getPosition()->getId(),
				$unit->getSide()->getId(), $unit->getPurpose()->getId(),
				$unit->getNumber(), $pi->getLandSize(),
				$pi->getBuildingSize(), $pi->getFloorSize(),
				$pi->getFloor(), $pi->getBedRoom(), $pi->getBathRoom(),
				$pi->getElectricity(), $pi->getWidth(),
				$pi->getLong(), $pi->getKelebihanTanah(), $pi->getDepan(),
				$pi->getBelakang(), $pi->getSamping(), $pi->getKonsepdasar(),
				$pi->getIsHookCalculated(), $pi->getIsTamanCalculated(),
				$uh->getInstruksiOrder(), $uh->getPersonInCharge(), $uh->getDescription(), $unit->getLebarJalan(), $unit->getGambarRumah(), $unit->getIsReadyStock(),
				$unit->getTanahCode()->getId(),
				$unit->getIsFasum(), $unit->getGambar(), $unit->getNotes_siapstock(),$unit->getOrientasi()
		);
		
		return $hasil;
	}

	public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
		$row = 0;

		$row = $this->dbTable->SPUpdate('sp_unitb_destroy', $decan->getString(), $session->getUser()->getId());
		return $row;
	}

	/* semy 01 08 2017 */

	public function getAllNonLunasV2(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Unit_UnitTran $ut) {
		$hasil = array();
		$project = $ut->getProject()->getId();
		$pt = $ut->getPt()->getId();
		if ($project == 0 || $pt == 0) {
			return $hasil;
		}

		$hasil = $this->dbTable->SPExecute('sp_unitb_nonlunasv2_read', $project, $pt, $r->getPage(), $r->getLimit(), $ut->getStatus()->getId(),
				$ut->getNumber(), $ut->getBlock()->getId(),
				$r->getOthersValue('purchaseletter_no'),
				$r->getOthersValue('customer_name'));




		return $hasil;
	}

	public function vaMandiriCheck($projectId, $ptId, Erems_Models_Unit_UnitTran $unit, $numbers) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_va_mandiri_check', $projectId, $ptId, $unit->getCluster()->getId(), $unit->getBlock()->getId(), $numbers);



		return $hasil;
	}

	public function checkdelete($numbers) {
		$hasil = array();

		$hasil = $this->dbTable->SPExecute('sp_unitcheckdelete_read', $numbers);

		return $hasil;
	}

	public function getAllPriceList1(Erems_Box_Models_App_HasilRequestRead $r, Erems_Models_Unit_UnitTran $ut, $statusUnit = null) {
		$hasil = array();
		$project = $ut->getProject()->getId();
		$pt = $ut->getPt()->getId();
		if ($project == 0 || $pt == 0) {
			return $hasil;
		}

		$hasil = $this->dbTable->SPExecute('sp_unitbsimpleb_pricelist_read', $project, $pt, $r->getPage(), $r->getLimit(), $ut->getStatus()->getId(),
				$ut->getNumber(), $ut->getBlock()->getId(), $ut->getIsReadySell(), $statusUnit);

		return $hasil;
	}

	//added by anas 09072021
    public function updateSurvey(Erems_Box_Models_App_HasilRequestRead $r,  Erems_Box_Models_App_Session $ses){
        $hasil = array();    

        $hasil = $this->dbTable->SPExecute('sp_unit_survey_update',
                $r->getOthersValue("unit_id"),
                $r->getOthersValue("nilai_survey"),
                $r->getOthersValue("nilai_survey_nps"),
                $r->getOthersValue("modiby")
                );

        $return['total'] = $hasil[0]; //karena pakai SPExecute   
        $return['success'] = $hasil[0]>0;
        return $return; 
        
    }

    public function updateOrderBangun(Erems_Box_Models_App_HasilRequestRead $r,  Erems_Box_Models_App_Session $ses){
        $hasil = $this->dbTable->SPExecute('sp_unit_order_bangun_update',
            $r->getOthersValue("unit_id"),
            $r->getOthersValue("is_order_bangun"),
            $r->getOthersValue("notes"),
            $ses->getUser()->getId()
        );

		$return['total']   = $hasil[0]; //karena pakai SPExecute   
		$return['success'] = $hasil[0]>0;

        return $return; 
        
    }

}

?>
