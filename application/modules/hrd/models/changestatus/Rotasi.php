<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Rotasi
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Changestatus_Rotasi extends Hrd_Models_Changestatus_Changestatus {
    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "rotasi_";
        $this->setType(Box_Config::CHANGESTATUSTYPE_ROTASI);
    }
}
