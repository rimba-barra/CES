<?php

/**
 * Description of BadanusahaDao
 *
 * @author MIS
 */
class Erems_Models_Master_CityDao extends Erems_Box_Models_App_AbDao {    
    public function getAll(Erems_Box_Models_App_HasilRequestRead $requestRead){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_city_read');   
        return $hasil; 
    }
     public function getAllWOR(){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_city_read');   
        return $hasil; 
    }
    public function getCitydependentprovince(Erems_Models_Master_City $param){
        $hasil = array();       
        $hasil = $this->dbTable->SPExecute('sp_citydependentprovince_read',$param->getProvinceid());
        return $hasil; 
    }
     
    
    
}

?>
