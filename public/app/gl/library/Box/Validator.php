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
class Gl_Box_Validator {
    public static function isBulanValid($bulan) {
        $bulan = (int) $bulan;
        if($bulan >= Gl_Box_Config::MIN_BULAN && $bulan <= Gl_Box_Config::MAX_BULAN){
            return TRUE;
        }
        return FALSE;
    }
    public static function isTahunValid($tahun) {
        $tahun = (int) $tahun;
        if($tahun >= Gl_Box_Config::MIN_TAHUN  && $tahun <= Gl_Box_Config::MAX_TAHUN){
            return TRUE;
        }
        return FALSE;
    }
}
