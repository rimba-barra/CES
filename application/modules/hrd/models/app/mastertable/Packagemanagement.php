<?php

/*
 * To change this license header, choose License Headers in Packagemanagement Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Packagemanagement
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_App_Mastertable_Packagemanagement extends Box_Models_App_Masterdata_Masterdata {

    public function getDao() {
        return new Hrd_Models_Master_Packagemanagement_PackagemanagementDao();
    }

    public function getTableClass() {
        return new Hrd_Models_Master_Packagemanagement_Packagemanagement();
    }

    public function getTableClassName() {
        return "packagemanagement";
    }

    public function prosesData(\Box_Models_App_AbDao $dao, \Box_Models_ObjectEmbedData $objectEmbedata, \Box_Models_App_Models_ReadWorms $app) {
        $hasil = $dao->getAll($app->getRequest(), $objectEmbedata);

        return $hasil;
    }

//    protected function getMethod($object) {
//        return $this->getDao()->getAllWoPL($object);
//    }
    
    protected function getMethod($object) {
        $data = $this->getDao()->getAllWoPL($object);
        $totalrow = $data[0][0]['totalRow'];
        $result = $data[1];
        $name = array();
        foreach ($result as $key => $row) {
            $name[$key] = $row['code'];
        }
        //print_r($return);
        array_multisort($name, SORT_ASC, $result);
        $return = array(array(array("totalRow" => $totalrow)), $result);
        return $return;
    }

}
