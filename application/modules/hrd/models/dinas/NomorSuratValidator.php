<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of NomorSuratValidator
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Dinas_NomorSuratValidator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Dinas_NomorSurat $d) {
        $msg = "";
        
        $dao = new Hrd_Models_Dinas_NomorSuratDao();
        $codeExist = $dao->codeExist($d);
        
        


        if (strlen($d->getInfiks()) < 5) {
            $msg = "Mininum 5 characters";
        }else if(Box_Tools::codeExist($codeExist,$d,"nomorsuratdinas_id")){
            $msg = "Nomor surat untuk tahun ".$d->getTahun()." dan bulan".$d->getBulan()." sudah ada";
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}
