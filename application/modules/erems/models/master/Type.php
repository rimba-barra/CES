<?php

/**
 * Description of Type
 *
 * @author MIS
 */
class Erems_Models_Master_Type extends Erems_Box_Models_ObjectEmbedData {

	private $code;
	private $name;
	private $clusterId;
	private $productCategoryId;
	protected $buildingClass;
	protected $salesGroup;
	protected $isCpms;
	protected $floorplan_leftaccess;
	protected $floorplan_rightaccess;
	protected $launching_start;
	protected $launching_end;

	public function __construct($embedPrefix = NULL) {
		parent::__construct();
		//   $this->embedPrefix = 'type_';
		$this->embedPrefix = $embedPrefix == NULL ? 'type_' : $embedPrefix;
	}

	public function getCode() {
		return $this->code;
	}

	public function setCode($code) {
		$this->code = $code;
	}

	public function getName() {
		return $this->name;
	}

	public function setName($name) {
		$this->name = $name;
	}

	public function getClusterId() {
		return $this->clusterId;
	}

	public function setClusterId($clusterId) {
		$this->clusterId = $clusterId;
	}

	public function getProductCategoryId() {
		return $this->productCategoryId;
	}

	public function setProductCategoryId($productCategoryId) {
		$this->productCategoryId = $productCategoryId;
	}

	public function getBuildingClass() {
		return $this->buildingClass;
	}

	public function setBuildingClass($buildingClass) {
		$this->buildingClass = $buildingClass;
	}

	public function getSalesGroup() {
		return $this->salesGroup;
	}

	public function setSalesGroup($salesGroup) {
		$this->salesGroup = $salesGroup;
	}

	public function getIsCpms() {
		return $this->isCpms;
	}

	public function setIsCpms($isCpms) {
		$this->isCpms = $isCpms;
	}
	
	public function getFloorplan_leftaccess() {
		return $this->floorplan_leftaccess;
	}

	public function setFloorplan_leftaccess($floorplan_leftaccess) {
		$this->floorplan_leftaccess = $floorplan_leftaccess;
	}
	
	public function getFloorplan_rightaccess() {
		return $this->floorplan_rightaccess;
	}

	public function setFloorplan_rightaccess($floorplan_rightaccess) {
		$this->floorplan_rightaccess = $floorplan_rightaccess;
	}
	
	public function getLaunchingStart() {
		return $this->launching_start;
	}

	public function setLaunchingStart($launching_start) {
		$this->launching_start = $launching_start;
	}
	
	public function getLaunchingEnd() {
		return $this->launching_end;
	}

	public function setLaunchingEnd($launching_end) {
		$this->launching_end = $launching_end;
	}

	
	public function setArrayTable($dataArray = NULL) {
		// $x = $dataArray;
		$x = $dataArray == NULL ? $this->arrayTable : $dataArray;

		if (isset($x['type_id'])) {
			$this->setId($x['type_id']);
		}
		if (isset($x['code'])) {
			$this->setCode($x['code']);
		}
		if (isset($x['productcategory_id'])) {
			$this->setProductCategoryId($x['productcategory_id']);
		}
		if (isset($x['cluster_id'])) {
			$this->setClusterId($x['cluster_id']);
		}
		if (isset($x['name'])) {
			$this->setName($x['name']);
		}
		if (isset($x['building_class'])) {
			$this->setBuildingClass($x['building_class']);
		}
		if (isset($x['salesgroup'])) {
			$this->setSalesGroup($x['salesgroup']);
		}
		if (isset($x['is_cpms'])) {
			$this->setIsCpms($x['is_cpms']);
		}
		if (isset($x['floorplan_leftaccess'])) {
			$this->setFloorplan_leftaccess($x['floorplan_leftaccess']);
		}
		if (isset($x['floorplan_rightaccess'])) {
			$this->setFloorplan_rightaccess($x['floorplan_rightaccess']);
		}
		if (isset($x['launching_start'])) {
			$this->setLaunchingStart($x['launching_start']);
		}
		if (isset($x['launching_end'])) {
			$this->setLaunchingEnd($x['launching_end']);
		}

		unset($x);
	}

	public function getArrayTable() {
		$x = array(
			"type_id"               => $this->getId(),
			"code"                  => $this->getCode(),
			"productcategory_id"    => $this->getProductCategoryId(),
			"cluster_id"            => $this->getClusterId(),
			"name"                  => $this->getName(),
			"building_class"        => $this->getBuildingClass(),
			"salesgroup"            => $this->getSalesGroup(),
			"is_cpms"               => $this->getIsCpms(),
			"floorplan_leftaccess"  => $this->getFloorplan_leftaccess(),
			"floorplan_rightaccess" => $this->getFloorplan_rightaccess(),
			"launching_start"       => $this->getLaunchingStart(),
			"launching_end"         => $this->getLaunchingEnd(),
		);

		return $x;
	}
}
?>