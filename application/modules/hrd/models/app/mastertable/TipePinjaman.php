<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of TipePinjaman
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_App_Mastertable_TipePinjaman extends Box_Models_App_Masterdata_Masterdata  {
    public function getDao() {
        return new Hrd_Models_Pinjaman_TipeDao();
    }

    public function getTableClass() {
        return new Hrd_Models_Pinjaman_Tipe();
    }

    public function getTableClassName() {
        return "tipepinjaman";
    }

    public function prosesData(\Box_Models_App_AbDao $dao, \Box_Models_ObjectEmbedData $objectEmbedata, \Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAll($app->getRequest(),$objectEmbedata);
      
        return $hasil;
    }
    
    protected function getMethod($object){
        return $this->getDao()->getAllWOPL($object);
    }

//put your code here
}
