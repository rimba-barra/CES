<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ContractorValidator
 *
 * @author MIS
 */
class Erems_Models_Master_ContractorValidator extends Erems_Box_Models_App_Validator{
    
    private $ses;
    
    public function getSes() {
        return $this->ses;
    }

    public function setSes($ses) {
        $this->ses = $ses;
    }

        
    public function run(Erems_Models_Master_Contractor $pl){


        $msg = "";
        
        $dao = new Erems_Models_Master_ContractorDao();

        $codeExist = $dao->codeExist($pl,$this->ses);
        $npwpExist = $dao->npwpExist($pl,$this->ses);

     
        
        
       
        $idExist = 0;
        $idnpwpExist = 0;
        if($codeExist){
            if(count($codeExist[0]) > 0){
               
                $idExist = $codeExist[0][0]['contractor_id'];
            }
        }

        if($npwpExist){
            if(count($npwpExist[0]) > 0){
                $idnpwpExist = $npwpExist[0][0]['contractor_id'];
            }
        }

        $npwpLen_var = preg_replace('[^\s]', '', $pl->getNpwp());
        $npwpLen_var = preg_replace('/\s+/', '', $npwpLen_var);
        $npwpLen = strlen($npwpLen_var);
       // echo $npwpLen;exit;
        
        if(strlen($pl->getCode())<2){
            $msg = "Code Kontraktor minimum 2 character";
        } else if(strlen($pl->getCode())>5){
            $msg = "Code Kontraktor maksimal 5";
        } else if(strlen($pl->getName())<2){
            $msg = "Nama Kontraktor minimum 2 character";
        } else if(strlen($pl->getName())>30){
            $msg = "Nama Kontraktor maximum 30 character";
        } else if($npwpLen < 20){
            $msg = "Nomor NPWP tidak valid";
        } else if(strlen($pl->getPic())<2){
            $msg = "Nomor Kontak Person minimum 2 character";
        } else if(strlen($pl->getPic())>30){
            $msg = "Nomor Kontak Person maximum 30 character";
        } else if($idExist && ($pl->getId() != $idExist)){
            $msg = "Code Kontraktor sudah diambil";    
        } else if($idnpwpExist && ($pl->getId() != $idnpwpExist)){
            $msg = "NPWP sudah ada di database";
        } else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>
