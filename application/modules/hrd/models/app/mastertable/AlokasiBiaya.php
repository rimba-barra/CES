<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of AlokasiBiaya
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_App_Mastertable_AlokasiBiaya extends Box_Models_App_Masterdata_Masterdata   {
    public function getDao() {
        return new Hrd_Models_Master_AlokasiBiayaDao();
    }

    public function getTableClass() {
        return new Hrd_Models_Master_AlokasiBiaya();
    }

    public function getTableClassName() {
        return "alokasibiaya";
    }

    public function prosesData(\Box_Models_App_AbDao $dao, \Box_Models_ObjectEmbedData $objectEmbedata, \Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAll($app->getRequest(),$objectEmbedata);
      
        return $hasil;
    }
    
    protected function getMethod($object){
        return $this->getDao()->getAllWOPL($object);
    }
}
