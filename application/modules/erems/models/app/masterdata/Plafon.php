<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Plafon
 *
 * @author MIS
 */
class Erems_Models_App_Masterdata_Plafon extends Erems_Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Erems_Models_Construction_PlafonDao();
    }

    public function getTableClass() {
        return new Erems_Models_Construction_Plafon();
    }

    public function getTableClassName() {
        return "plafon";
    }

    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAll($objectEmbedata);
      
        return $hasil; 
    }    //put your code here
    
    protected function getMethod($object){
        
        return $this->getDao()->getAllSimple();
    }
}

?>
