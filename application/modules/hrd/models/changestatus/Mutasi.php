<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Mutasi
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Changestatus_Mutasi extends Hrd_Models_Changestatus_Changestatus {
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "mutasi_";
        $this->setType(Box_Config::CHANGESTATUSTYPE_MUTASI);
    }
}
