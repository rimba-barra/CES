<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of UnitB
 *
 * @author tommytoban
 */
class Erems_Models_Master_UnitB extends Erems_Models_Master_Unit {
    public $cluster;
    
    public function __construct() {
        parent::__construct();
        
    }
    
    public function getCluster() {
        return $this->cluster;
    }

    public function setCluster(Erems_Models_Master_Cluster $cluster) {
        $this->cluster = $cluster;
    }


}

?>
