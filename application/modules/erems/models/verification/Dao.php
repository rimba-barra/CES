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
class Erems_Models_Verification_Dao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole{
   
    public function getAll(Erems_Box_Models_App_HasilRequestRead $r,Erems_Models_Verification_Verification $v){
        $hasil = array();
             
        $hasil = $this->dbTable->SPExecute('sp_verification_read',
                $v->getProject()->getId(),
               // $v->getPt()->getId(), edited by iqbal 07 mei 2019
                $r->getPage(),
                $r->getLimit(),
                $r->getOthersValue("unit_number"),
                $r->getOthersValue("sort_by"),
                $r->getOthersValue("sort_type")
                );
        
        return $hasil;
    }
    
    public function getUnitDetail($unitId){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_verificationunitdetail_read',$unitId);
        
        return $hasil;
    }
    
    public function getByUnit(Erems_Models_Verification_Verification $v, $param=array()){
        $is_approve = isset($param['is_approve']) ? $param['is_approve'] : '';

        $hasil = $this->dbTable->SPExecute('sp_verificationgetbyunit_read',
            $v->getProject()->getId(),
            $v->getPt()->getId(),
            $v->getUnit()->getId(),
            $is_approve
        );
        
        return $hasil;
    }
    
    public function approve($id,$user){
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_verificationapprove_update',$id,$user);
        return $hasil;
    }
    
    public function save(Erems_Models_Verification_Verification $v){
        $hasil = 0;
      
        $hasil = $this->dbTable->SPUpdate('sp_verification_create',
                $v->getAddBy(),
                $v->getProject()->getId(),
                $v->getPt()->getId(),
                $v->getDate(),
                $v->getNumber(),
                $v->getNote(),
                $v->getSubmitBy(),
                $v->getApproveBy(),
                $v->getUnit()->getId(),
                $v->getDiskonHargaDasarJenis(),
                $v->getDiskonHargaDasarNilai(),
                $v->getDiskonHargaTanahJenis(),
                $v->getDiskonHargaTanahNilai(),
                $v->getDiskonHargaBangunanJenis(),
                $v->getDiskonHargaBangunanNilai()
                );
       
        return $hasil;
    }
    
    public function codeExist(Erems_Models_Master_BlockTran $ft){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_verificationcodeexist_read',$ft->getCode(),$ft->getCluster()->getId());
        
        return $hasil;
    }
    
    //sp_projectfacilitiestcodeexist_read
    
    public function update(Erems_Models_Verification_Verification $v){
        $hasil = 0;
      
        $hasil = $this->dbTable->SPUpdate('sp_verification_update',$v->getAddBy(),
                $v->getId(),
                $v->getDate(),
                $v->getNumber(),
                $v->getNote(),
                $v->getSubmitBy(),
                $v->getApproveBy(),
                $v->getUnit()->getId(),
                $v->getDiskonHargaDasarJenis(),
                $v->getDiskonHargaDasarNilai(),
                $v->getDiskonHargaTanahJenis(),
                $v->getDiskonHargaTanahNilai(),
                $v->getDiskonHargaBangunanJenis(),
                $v->getDiskonHargaBangunanNilai()
                );
        
              
              //  var_dump($this->dbTable);
        return $hasil;
    }

    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_verification_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

    public function getProjectName($project_id){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_projectdetail_read', $project_id);

        return $hasil;
    }
}
