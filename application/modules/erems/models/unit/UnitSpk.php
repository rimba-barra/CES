<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of UnitSpk
 *
 * @author MIS
 */
class Erems_Models_Unit_UnitSpk extends Erems_Models_Unit_Unit implements Erems_Box_Kouti_Remora{
    private $spkCount;
    private $spkActive;
    private $cluster;
    private $block;
    
    public function __construct($params=NULL) {
        parent::__construct($params);
        
        
    }
    
    public function getSpkCount() {
        return $this->spkCount;
    }

    public function setSpkCount($spkCount) {
        $this->spkCount = $spkCount;
    }

    public function getSpkActive() {
        return $this->spkActive;
    }

    public function setSpkActive($spkActive) {
        $this->spkActive = $spkActive;
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

    public function getBlock() {
        if(!$this->block){
            $this->block = new Erems_Models_Master_BlockB();
        }
        return $this->block;
    }

    public function setBlock(Erems_Models_Master_BlockB $block) {
        $this->block = $block;
    }

        
    public function getArrayTable() {
        $x =  parent::getArrayTable();
        $y = array(
            'eo_spkcount'=>$this->getSpkCount(),
            'eo_spkactive'=>$this->getSpkActive()
        );
        return array_merge($x,$y);
    }

    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray;
        if(isset ($x['eo_spkcount'])){
           $this->setSpkCount($x['eo_spkcount']);
        }
        if(isset ($x['eo_spkactive'])){
           $this->setSpkActive($x['eo_spkactive']);
        }
        
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getCluster(),$this->getBlock());
    }
    
    

}

?>
