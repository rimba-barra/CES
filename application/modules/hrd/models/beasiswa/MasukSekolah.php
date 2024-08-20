<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of MasukSekolah
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Beasiswa_MasukSekolah extends Hrd_Models_Beasiswa_Transaksi{
    //put your code here
    
    public function __construct() {
        parent::__construct();
        $this->module = Box_Config::BEASISWA_MODULE_MASUKSEKOLAH;
    }
}
