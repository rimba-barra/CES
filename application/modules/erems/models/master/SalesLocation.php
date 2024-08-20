<?php


/**
 * Description of SalesLocation
 *
 * @author tommytoban
 */
class Erems_Models_Master_SalesLocation extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora,Erems_Box_Models_Master_InterProjectPt{
    private $code;
    private $name;
    private $description;
    private $project;
    private $pt;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "saleslocation_";
        $this->project = new Erems_Box_Models_Master_Project();
        $this->pt = new Erems_Box_Models_Master_Pt();
    }
    
    
    public function getCode() {
        return $this->code;
    }

    public function getName() {
        return $this->name;
    }

    public function getDescription() {
        return $this->description;
    }

    public function getProject() {
        return $this->project;
    }

    public function getPt() {
        return $this->pt;
    }

    public function setCode($code) {
        $this->code = $code;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function setProject(Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(Erems_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['saleslocation_id'])) {
            $this->setId($x['saleslocation_id']);
        }
        if (isset($x['code'])) {
            $this->setCode($x['code']);
        }
        if (isset($x['saleslocation'])) {
            $this->setName($x['saleslocation']);
        }
        if (isset($x['description'])) {
            $this->setDescription($x['description']);
        }
        
        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            "saleslocation_id" => $this->getId(),
            "code"=>$this->getCode(),
            "saleslocation"=>$this->getName(),
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
