<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Project
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_App_Mastertable_Project extends Box_Models_App_Masterdata_Masterdata {
    public function getDao() {
        return new Hrd_Models_General_Dao();
    }

    public function getTableClass() {
        return new Box_Models_Master_Project();
    }

    public function getTableClassName() {
        return "project";
    }

    public function prosesData(\Box_Models_App_AbDao $dao, \Box_Models_ObjectEmbedData $objectEmbedata, \Box_Models_App_Models_ReadWorms $app) {
        
        
        $hasil = $dao->getAll($app->getRequest(),$objectEmbedata);
     
        return $hasil;
    }
    
	/*
    protected function getMethod($object){
        return $this->getDao()->getAllProjectWOPL();
    }
	*/
	
	 protected function getMethod($object) {
        $data = $this->getDao()->getAllProjectWOPL($object);
        $totalrow = $data[0][0]['totalRow'];
        $result = $data[1];
        $name = array();
        foreach ($result as $key => $row) {
            $name[$key] = $row['name'];
        }
        //print_r($return);
        array_multisort($name, SORT_ASC, $result);
        $return = array(array(array("totalRow" => $totalrow)), $result);
        return $return;
    }
}
