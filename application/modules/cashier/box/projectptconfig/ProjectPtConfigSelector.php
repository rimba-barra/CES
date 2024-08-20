<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Cashier_Box_Projectptconfig_ProjectPtConfigSelector {

    public static function getAuthorizeUser($projectId, $ptId) {
        $config = NULL;
        if ($projectId == 5 && $ptId == 38) {
            $config = new Cashier_Box_Projectptconfig_AucoCitraIndah();
        } else {
            return NULL;
        }
        return $config;
    }

    public static function getGeneralConfig($projectId, $ptId) {
        $config = NULL;
        if ($projectId == 5 && $ptId == 38) {
            $config = new Cashier_Box_Projectptconfig_GencoCitraIndah();
        }
		else if ($projectId == 11105 && $ptId == 22294) {
            $config = new Cashier_Box_Projectptconfig_GencoCitraTestSurabaya();
        }
		else {
            $config = new Cashier_Box_Projectptconfig_Genco();
        }
        return $config;
    }

}
