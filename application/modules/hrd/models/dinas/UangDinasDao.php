<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of UangDinasDao
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Dinas_UangDinasDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole{
    public function save(Hrd_Models_Dinas_UangDinas $d) {
        $hasil = 0;
        
      
        $dcr = $d->getDCResult();
       
        $hasil = $this->dbTable->SPUpdate('sp_uangdinas_create', 
                $d->getAddBy(),
                $d->getProject()->getId(),
                $d->getPt()->getId(),
                $d->getMasterSk()->getId(),
                $d->getIsDefault(),
                $d->getDescription(),
                $dcr["uangdinas_detail_id"],
                $dcr["negaratujuan_negaratujuan_id"],
                $dcr["group_group_id"],
                $dcr["description"],
                $dcr["currency_currency_id"],
                $dcr["uanghotel"],
                $dcr["uangmakan_pp_1m"],
                $dcr["uangmakan_pp_xm"],
                $dcr["uangmakan_pu_1m"],
                $dcr["uangmakan_pu_xm"],
                $dcr["uangsaku_pp_1m"],
                $dcr["uangsaku_pp_xm"],
                $dcr["uangsaku_pu_1m"],
                $dcr["uangsaku_pu_xm"],
                $dcr["standart_hotel"]
                
                );
        
         
        
        return $hasil;
    }

    public function update(Hrd_Models_Dinas_UangDinas $d,$deletedRows) {
        $hasil = 0;
        
         $dcr = $d->getDCResult();
         
         
         
         

        //   $d->setSelectedRelation("overtimes");

        $hasil = $this->dbTable->SPUpdate('sp_uangdinas_update', 
                $d->getAddBy(),
                $d->getId(),
                $d->getMasterSk()->getId(),
                $d->getIsDefault(),
                $d->getDescription(),
                $dcr["uangdinas_detail_id"],
                $dcr["negaratujuan_negaratujuan_id"],
                $dcr["group_group_id"],
                $dcr["description"],
                $dcr["currency_currency_id"],
                $dcr["uanghotel"],
                $dcr["uangmakan_pp_1m"],
                $dcr["uangmakan_pp_xm"],
                $dcr["uangmakan_pu_1m"],
                $dcr["uangmakan_pu_xm"],
                $dcr["uangsaku_pp_1m"],
                $dcr["uangsaku_pp_xm"],
                $dcr["uangsaku_pu_1m"],
                $dcr["uangsaku_pu_xm"],
                $deletedRows,
                $dcr["standart_hotel"]
                );
        
                //var_dump($this->dbTable);

        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Dinas_UangDinas $d) {
        $hasil = 0;
        
     //   var_dump($d->getProject()->getId(),$d->getPt()->getId());
        
        $hasil = $this->dbTable->SPExecute('sp_uangdinas_read',$d->getProject()->getId(),$d->getPt()->getId(),$r->getPage(), $r->getLimit());
     
       // var_dump($this->dbTable);
        return $hasil;
    }
    
    public function getDetailsWOPL($uangDinasId) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_uangdinasdetail_read',intval($uangDinasId));
     
        return $hasil;
    }
    
    public function getDetailsWOPLProjectPt($project,$pt) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_uangdinasdetail_read',0,1,99999,$project,$pt);
  
        return $hasil;
    }
    
    public function getDetailsWOPLProjectPtDefault($project,$pt) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_uangdinasdetail_read',0,1,99999,$project,$pt,1);
  
        return $hasil;
    }
    
    
    public function getAllWOPL(Hrd_Models_Dinas_UangDinas $d) {
        $hasil = 0;
    
        $hasil = $this->dbTable->SPExecute('sp_uangdinas_read',$d->getProject()->getId(),$d->getPt()->getId(),1,9999);
 
        return $hasil;
    }
    
    public function deleteOne($id,$userId) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_uangdinas_destroy',$id,$userId);

        return $row;
    }

  

    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;

        $row = $this->dbTable->SPUpdate('sp_uangdinas_destroy', $decan->getString(), $session->getUserId());

        return $row;
    }
}
