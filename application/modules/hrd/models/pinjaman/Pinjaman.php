<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Pinjaman
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Pinjaman_Pinjaman extends Hrd_Models_Pinjaman_Transaksi {
    public function __construct() {
        parent::__construct();
        $this->setModule(Box_Config::PINJAMAN_MODULE_PINJAMAN);
    }
}
