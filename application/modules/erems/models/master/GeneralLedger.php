<?php


/**
 * Description of SalesLocation
 *
 * @author tommytoban
 */
class Erems_Models_Master_GeneralLedger extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora,Erems_Box_Models_Master_InterProjectPt{
    private $coa;
    private $name;
    private $project;
    private $pt;
    private $type;
    
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "glcoa_";
        $this->project = new Erems_Box_Models_Master_Project();
        $this->pt = new Erems_Box_Models_Master_Pt();
    }
    
    
    function getCoa() {
        return $this->coa;
    }

    function getName() {
        return $this->name;
    }


    function setCoa($coa) {
        $this->coa = $coa;
    }

    function setName($name) {
        $this->name = $name;
    }


    
    public function getProject() {
        return $this->project;
    }

    public function getPt() {
        return $this->pt;
    }

   

    public function setProject(Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(Erems_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
    
    function getType() {
        return $this->type;
    }

    function setType($type) {
        $this->type = $type;
    }

        
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['coa_id'])) {
            $this->setId($x['coa_id']);
        }
        if (isset($x['coa'])) {
            $this->setCoa($x['coa']);
        }
        if (isset($x['name'])) {
            $this->setName($x['name']);
        }
        if (isset($x['type'])) {
            $this->setType($x['type']);
        }
       
        
        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            "coa_id" => $this->getId(),
            "coa"=>$this->getCoa(),
            "name"=>$this->getName(),
            "type"=>$this->getType()
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
