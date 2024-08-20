<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CACDao
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Master_SalesgroupDao extends Erems_Box_Models_App_AbDao {
	public function getAll(Erems_Models_Master_Salesgroup $sg){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_salesgroup_read');
      
        return $hasil; 
    }
	public function getAllDropdown(){
        $res = $this->dbTable->SPExecute('sp_salesgroup_read_dropdown');
        $hasil = array();
        if(isset($res[0]) && count($res[0])){
            $hasil = $res[0];
        }
        return $hasil; 
    }
}