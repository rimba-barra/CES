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
class Erems_Models_Master_CACDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {
    public function getAll(Erems_Box_Models_App_HasilRequestRead $request,Erems_Models_Master_CAC $cac){
        $hasil = array();
      
        $hasil = $this->dbTable->SPExecute('sp_cac_read',$cac->getProject()->getId(),$cac->getPt()->getId(),$request->getPage(),$request->getLimit(),$cac->getCode(),$cac->getName(),$cac->getEmail());
        return $hasil;
    }
    
    public function getAllWOPL(Erems_Models_Master_CAC $cac){
        $hasil = array();
      
        $hasil = $this->dbTable->SPExecute('sp_cac_read',$cac->getProject()->getId(),$cac->getPt()->getId(),1,99999,$cac->getCode(),$cac->getName(),$cac->getEmail());
        return $hasil;
    }
    
    public function getAllDropdown($projectid, $ptid){
        $res = $this->dbTable->SPExecute('sp_cac_read_dropdown', $projectid, $ptid);
        $hasil = array();
        if(isset($res[0]) && count($res[0])){
            $hasil = $res[0];
        }
        return $hasil;
    }
    
    public function save(Erems_Models_Master_CAC $cac){
        $hasil = 0;   
        $addre = str_replace("'", "''", $cac->getAddress());
        $npwp = str_replace("'", "''", $cac->getNpwpAddress());
        $ktp = str_replace("'", "''", $cac->getKtpAddress()); 
      
        $hasil = $this->dbTable->SPUpdate('sp_cac_create',$cac->getAddBy(),
                $cac->getProject()->getId(),
                $cac->getPt()->getId(),
                $cac->getCode(),
                $cac->getName(),
                $addre,$cac->getCity()->getId(),$cac->getHomePhone(),
                $cac->getHandPhone(),$cac->getKtpNo(),$cac->getKtpName(),
                $ktp,$cac->getBirthDate(),$cac->getBirthPlace(),
                $cac->getIsMarried(),$cac->getReligion()->getId(),$cac->getEducation(),
                $cac->getNotes(),$cac->getEmail(),$cac->getNpwp(),
                $cac->getUpline(),$npwp,
                $cac->getPersenRsLangsung(),$cac->getPersenReLangsung(),
                $cac->getPersenRsReferal(),$cac->getPersenReReferal(),
                $cac->getBank()->getId(),$cac->getNomorRekening()

                //added by anas 06072021
                , $cac->getUsername(), MD5($cac->getPass())
            );
    
        return $hasil;
    }
    
    public function codeExist(Erems_Models_Master_CAC $ft){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_caccodeexist_read',$ft->getCode());
        
        return $hasil;
    }
    
    //sp_projectfacilitiestcodeexist_read
    
    public function update(Erems_Models_Master_CAC $cac){
        $hasil = 0;
      
        $addre = str_replace("'", "''", $cac->getAddress());
        $npwp = str_replace("'", "''", $cac->getNpwpAddress());
       
        $ktp = str_replace("'", "''", $cac->getKtpAddress()); 
        
        $hasil = $this->dbTable->SPUpdate('sp_cac_update',$cac->getAddBy(),
                $cac->getId(),
                $cac->getCode(),
                $cac->getName(),
                $addre,$cac->getCity()->getId(),$cac->getHomePhone(),
                $cac->getHandPhone(),$cac->getKtpNo(),$cac->getKtpName(),
                $ktp,$cac->getBirthDate(),$cac->getBirthPlace(),
                $cac->getIsMarried(),$cac->getReligion()->getId(),$cac->getEducation(),
                $cac->getNotes(),$cac->getEmail(),$cac->getNpwp(),
                $cac->getUpline(),$npwp,
                $cac->getPersenRsLangsung(),$cac->getPersenReLangsung(),
                $cac->getPersenRsReferal(),$cac->getPersenReReferal(),
                $cac->getBank()->getId(),$cac->getNomorRekening()

                //added by anas 06072021
                , $cac->getUsername(), $cac->getPass() == "" ? null : MD5($cac->getPass())
            );
        
        //var_dump($this->dbTable);       
    
        return $hasil;
    }

    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_cac_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }
}
