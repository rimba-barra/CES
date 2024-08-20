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
class Hrd_Models_Worklocationprojectpt_Validator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Worklocationprojectpt_Worklocationprojectpt $d){
        $msg = "";
        if($d->getWorklocationId() < 1){
            $msg = "Pilih Work Location";
        }elseif($d->getProjectptId() < 1){
            $msg = "Pilih Project Pt";
        }else{
            $this->setStatus(TRUE);
            
        }
        $this->setMsg($msg);

    }
}
