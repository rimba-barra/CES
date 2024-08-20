<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Validator
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Jobdesc_Validator extends Box_Models_App_Validator {

    public function run(Hrd_Models_Jobdesc_Jobdesc $d) {
        $msg = "";

        if ($d->getPosition()->getId() == 0) {
            $msg = "Jabatan tidak valid";
        } else if (strlen($d->getDescription()) < 5) {
            $msg = "Deskripsi minimal 5 karakter";
        } else {

            $this->setStatus(TRUE);
        }


        $this->setMsg($msg);
    }

}
