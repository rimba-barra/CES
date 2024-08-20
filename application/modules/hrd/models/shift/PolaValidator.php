<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PolaValidator
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Shift_PolaValidator extends Box_Models_App_Validator{
    public function run(Hrd_Models_Shift_Pola $d) {
        $msg = "";
        
        $dao = new Hrd_Models_Shift_PolaDao();
        $codee = $dao->codeExist($d);
        
        


        if (strlen($d->getCode()) < 1) {
            $msg = "Kode pola shift minimal 1 karakter";
        }else if (strlen($d->getDescription()) < 5) {
            $msg = "Keterangan pola shift minimal 5 karakter";
        }else if (Box_Tools::codeExist($codee,$d, "polashift_id")) {
            $msg = "Kode ini sudah terpakai";
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }
}
