<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of NomorSelector
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Purchaseletter_NomorSelector {
    public static function getProcess($params){
        $str = $params["project_id"]."_".$params["pt_id"];
        $process = NULL;
        
        switch($str){
            case "1_1":$process = new Erems_Models_Purchaseletternomor_Biasa(); break;
            case "2020_2040":$process = new Erems_Models_Purchaseletternomor_BmwCilegon(); break;
            default: $process = new Erems_Models_Purchaseletternomor_Biasa(); break;
        }
        
        if($process instanceof Erems_Models_Purchaseletter_Nomorable){
            $process->setParams($params);
            return $process->getNomor();
        }
        
        return NULL;
        
        
    }
}
