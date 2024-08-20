<?php


/**
 * Description of MediaPromotionDao
 *
 * @author tommytoban
 */
class Erems_Models_Master_MediaPromotionDao extends Erems_Box_Models_App_AbDao{
   public function getAll(Erems_Models_Master_MediaPromotion $mp){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_mediapromotionb_read');
      
        return $hasil; 
    }

   public function getAllDropdown(){
        $res = $this->dbTable->SPExecute('sp_mediapromotionb_read_dropdown');
        $hasil = array();
        if(isset($res[0]) && count($res[0])){
            $hasil = $res[0];
        }
        return $hasil; 
    }
}
