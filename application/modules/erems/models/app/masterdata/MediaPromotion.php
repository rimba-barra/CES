<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of MediaPromotion
 *
 * @author tommytoban
 */
class Erems_Models_App_Masterdata_MediaPromotion extends Erems_Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Erems_Models_Master_MediaPromotionDao();
    }

    public function getTableClass() {
        return new Erems_Models_Master_MediaPromotion();
    }

    public function getTableClassName() {
        return "mediapromotion";
    }

    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAll($objectEmbedata);
      
        return $hasil;
    }
    
  

    
}