<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of UnitDocumentDao
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Master_UnitDocumentDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {
    
    public function getAll(Erems_Box_Models_App_Session $ses){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_unitdocument_read',$ses->getProject()->getId(),$ses->getPt()->getId());      
        return $hasil; 
    }
    
    public function getAllByUnitWOPL($params){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_unitdocument_read ',$params['unit_id'],$params['temp_id'], (isset($params['search_text']) ? $params['search_text'] : ''));
        return $hasil; 
    }
    
    public function getAllDocumentType(){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_documenttype_read');
      
        return $hasil; 
    }

    public function save(Erems_Models_Unit_UnitDocument $cs){
        $row = 0;
       
        if(!$cs->getAddBy()){
            return $row;
        }

        $row = $this->dbTable->SPUpdate('sp_unitdocument_create',
            $cs->getAddBy(),
            $cs->getUnit()->getId(),
            $cs->getDocumentType()->getId(),
            $cs->getFileName(),
            $cs->getDescription(),
            $cs->getPurchaseletter_id()
        );     

        return $row;        
    }
    
    public function update(Erems_Models_Unit_UnitDocument $cs){
        $row = 0;
        if($cs->getId()==0 || !$cs->getModiBy()){
            return $row;
        }
        
        $row = $this->dbTable->SPUpdate('sp_unitdocument_update',
            $cs->getModiBy(),
            $cs->getId(),
            $cs->getDocumentType()->getId(),
            $cs->getFileName(),
            $cs->getDescription(),
            $cs->getPurchaseletter_id()
        );
         
        return $row;        
    }
    
    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_unitdocument_destroy', $decan->getString(), $session->getUserId());
      
        return $row;
    }
    
    public function deleteOne($userId,$id) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_unitdocument_destroy', $id, $userId);
      
        return $row;
    }

    public function getAllDocumentUnitByFilter(Erems_Box_Models_App_HasilRequestRead $r, Erems_Box_Models_App_Session $ses){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_documentunit_read',
                    $ses->getProject()->getId(),
                    $ses->getPt()->getId(),
                    $r->getOthersValue("unit_number"),
                    Erems_Box_Tools::cleanInt($r->getOthersValue("cluster_cluster_id")),
                    Erems_Box_Tools::cleanInt($r->getOthersValue("block_block_id")),
                    Erems_Box_Tools::cleanInt($r->getOthersValue("unitstatus_unitstatus_id")),
                    $r->getPage(),
                    $r->getLimit()
                );
      
        return $hasil; 
    }

    // added by rico 26102021
    public function saveUnitInformation($params){
        $hasil = array();

        $user = $this->dbTable->SPExecute('sp_current_user',$params['user_id']);

        $hasil = $this->dbTable->SPExecute('sp_documentunit_create_info',
            $params['user_id'],
            $params['document_id'],
            $params['unit_unit_id'],
            $params['filename'],
            $params['type'],
            $params['description'],
            $user[0][0]['user_email'],
            $params['project_id'],
            $params['pt_id'],
            $params['alasan']
        );

        return $hasil;
    } 

    public function readUnitInformation($params){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_documentunit_read_info',
            $params['unit_id'],
            $params['project_id'],
            $params['pt_id']
        );

        return $hasil;
    }  

}
