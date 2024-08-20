<?php

/**
 * Description of CitraClub
 *
 * @author MIS
 */
class Erems_Models_Master_CitraClub extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora,  Erems_Box_Models_Master_InterProjectPt {

    private $project;
    private $pt;
    private $code;
    private $name;
    private $description;

    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "citraclub_";
        $this->project = new Erems_Box_Models_Master_Project();
        $this->pt = new Erems_Box_Models_Master_Pt();
    }

    public function getProject() {
        return $this->project;
    }

    public function setProject(Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        return $this->pt;
    }

    public function setPt(Erems_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
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

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['citraclub_id'])) {
            $this->setId($x['citraclub_id']);
        }
        if (isset($x['code'])) {
            $this->setCode($x['code']);
        }
        if (isset($x['clubname'])) {
            $this->setName($x['clubname']);
        }
        if (isset($x['description'])) {
            $this->setDescription($x['description']);
        }
        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            "citraclub_id" => $this->getId(),
            "code" => $this->getCode(),
            "clubname"=>$this->getName(),
            "description"=>$this->getDescription()
            
        );

        return $x;
    }
    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getProject(),$this->getPt());
    }

}

?>
