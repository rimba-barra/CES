<?php
/**
 * Description of BlockTran
 *
 * @author MIS
 */
class Erems_Models_Master_BlockTran extends Erems_Models_Master_BlockB implements Erems_Box_Kouti_Remora,  Erems_Box_Models_Master_InterProjectPt{
    private $project;
    private $pt;
    private $cluster;
    private $description;
    private $icon;
    
    public function __construct($embedPrefix=NULL) {
        parent::__construct($embedPrefix);
        $this->project = new Erems_Box_Models_Master_Project();
        $this->pt = new Erems_Box_Models_Master_Pt();
        $this->cluster = new Erems_Models_Master_ClusterB();
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

    public function getCluster() {
        if(!$this->cluster){
            $this->cluster = new Erems_Models_Master_ClusterB();
        }
        return $this->cluster;
    }

    public function setCluster(Erems_Models_Master_ClusterB $cluster) {
        $this->cluster = $cluster;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }

    public function getIcon() {
        return $this->icon;
    }

    public function setIcon($icon) {
        $this->icon = $icon;
    }
    
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['description'])){
           $this->setDescription($x['description']); 
        }
        if(isset ($x['icon'])){
           $this->setIcon($x['icon']); 
        }
        if(isset ($x['Addon'])){
           $this->setAddOn($x['Addon']); 
        }
        if(isset ($x['Modion'])){
           $this->setModiOn($x['Modion']); 
        }
        if(isset ($x['cluster_cluster_id'])){
           $this->getCluster()->setId($x['cluster_cluster_id']); 
        }
        
        unset($x);
        
    }
    
    public function getArrayTable() {
        parent::getArrayTable();
        $x = parent::getArrayTable();
        $y = array(
            "description"=>$this->getDescription(),
            "icon"=>$this->getIcon(),
            "Addon"=>$this->getAddOn(),
            "Modion"=>$this->getModiOn(),
            "cluster_cluster_id"=>$this->getCluster()->getId()
        );
        $x = array_merge($x,$y);
        return $x;
    }
    
    

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getProject(),$this->getPt(),$this->getCluster());
    }
    
    protected function getDatefields() {
        $x = parent::getDatefields();
        return array_merge($x,array("Modion","Addon"));
    }



}

?>
