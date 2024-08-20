<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of TypeValidator
 *
 * @author MIS
 */
class Hrd_Models_Pengobatan_TypeValidator extends Box_Models_App_Validator  {
    public function run(Hrd_Models_Pengobatan_Type $d){
        $msg = "";
        
        $dao = new Hrd_Models_Pengobatan_TypeDao();
        $codeExist = $dao->codeExist($d);
        $codeJenisLama = "";
        $tidakBolehGantiCode = array("SALIN1","SALIN2","HAMIL","LENSA");
        
        if($d->getId() > 0){
           $newFilter = new Hrd_Models_Pengobatan_Type();
           $allJenis = $dao->getAllWOPL($newFilter);
           $allJenis = Box_Tools::toObjectResult($allJenis,new Hrd_Models_Pengobatan_Type());
           foreach($allJenis as $jenis){
              if($jenis->getId()==$d->getId()){
                  $codeJenisLama = $jenis->getCode();
              }
           }
        }
        
        if(strlen($d->getCode()) < 1){
            $msg = "Code minimum 1 characters.";
        }else if(Box_Tools::codeExist($codeExist,$d,"jenispengobatan_id")){
            $msg = "Code already exist.";
        }else if($d->getId() > 0 && in_array($codeJenisLama, $tidakBolehGantiCode) && $codeJenisLama != $d->getCode()){
            $msg = "Code for this data can not be changed.";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);
    }
}

?>
