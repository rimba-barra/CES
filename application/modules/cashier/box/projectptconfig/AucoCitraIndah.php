<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of AucoCitraIndah
 *
 * @author Semy
 */
class Cashier_Box_Projectptconfig_AucoCitraIndah {
    public function getConfig($name) {
        $c = array(
            "VOUCHER_POSTINGUSER" => array(1474),
            "VOUCHER_REALIZATIONUSER" => array(1474),
            "VOUCHER_PAYMENTUSER" => array(1474),
            "VOUCHER_DELETEUSER" => array(1474),
          
        );
        
        return $c[$name];
    }
}
