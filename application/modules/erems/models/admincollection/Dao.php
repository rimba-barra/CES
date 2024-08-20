<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Dao
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Admincollection_Dao extends Erems_Box_Models_App_AbDao{
    public function getPencairanKPR($purchaseletterId){
        $hasil = array();
      
        $hasil = $this->dbTable->SPExecute('sp_plpencairankpr_read',0,$purchaseletterId,0,0);
		
        return $hasil;
    }

    public function updateProgressPersenPencairanKPR($admin,$decan){
        $hasil = 0;
        $dcResult = $decan->getDCResult();

        $hasil = $this->dbTable->SPUpdate('sp_cairkprprogresspersen_update',$admin,
                $dcResult["purchaseletter_pencairankpr_id"],
                $dcResult["persen_progress"],
                $dcResult["plafon_id"],
				$dcResult["duedate_escrow"] //duedate escrow
                );
		//print_r($this->dbTable); die();
		
        return $hasil;
    }
    
    public function readPlafon($project_id,$pt_id,$plafon_id){
        $hasil = $this->dbTable->SPExecute('sp_batasplafonh_read',$project_id,$pt_id,$plafon_id);
        return $hasil;
    }

    public function updateProgressPersenPencairanKPR_OLD($admin,$decan){
        $hasil = 0;
        $dcResult = $decan->getDCResult();
        $hasil = $this->dbTable->SPUpdate('sp_cairkprprogresspersen_update',$admin,
                $dcResult["purchaseletter_pencairankpr_id"],
                $dcResult["persen_progress"]
                );
          
        return $hasil;
    }
    
}
