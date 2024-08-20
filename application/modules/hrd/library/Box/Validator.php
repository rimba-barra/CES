<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Validator
 *
 * @author TOMMY-MIS
 */
class Box_Validator {
    public static function isBulanValid($bulan) {
        $bulan = (int) $bulan;
        if($bulan >= Box_Config::MIN_BULAN && $bulan <= Box_Config::MAX_BULAN){
            return TRUE;
        }
        return FALSE;
    }
    public static function isTahunValid($tahun) {
        $tahun = (int) $tahun;
        if($tahun >= Box_Config::MIN_TAHUN  && $tahun <= Box_Config::MAX_TAHUN){
            return TRUE;
        }
        return FALSE;
    }
}
