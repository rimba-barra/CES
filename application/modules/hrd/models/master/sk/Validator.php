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
class Hrd_Models_Master_Sk_Validator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Master_Sk_MasterSK $d){
        $msg = "";
        $ok = "";
        $habis = "";
        $habis = date('d/m/Y',strtotime($d->getTanggalhabis()));
        if($habis == '01/01/1970'){
            $habis = '01/01/9999';
        }

        $awal = "";
        $awal = date('d/m/Y',strtotime($d->getTanggal()));

        if(strlen($d->getName()) < 1){
        	$msg = "Document Name minimal 1 karakter";
        	$ok = 0;
        }elseif(strlen($d->getNomor()) < 1){
            $msg = "Number minimal 1 karakter";
            $ok = 0;
        }elseif($d->getActive() == 0){
            if($d->getTanggalhabis() > date('Y-m-d')){
                $msg = "Document End Date harus lebih besar dari hari ini, jika sudah tidak aktif";
                $ok = 0;
            }elseif($d->getMastersk_id_source()){
                $msg = "Document ini tidak dapat di edit, karena berasal dari share document";
                $ok = 0;
            }else{
                $ok = 1;
            }
        }elseif($d->getMastersk_id_source()){
            $msg = "Document ini tidak dapat di edit, karena berasal dari share document";
            $ok = 0;
        }else{
            $ok = 1;
        }

        // elseif($d->getTanggalhabis()){
        //     $habis = date('d/m/Y',strtotime($d->getTanggalhabis()));
        //     if($habis == '01/01/1970'){
        //         $habis = '01/01/9999';
        //     }
        //     if($habis > date('d/m/Y',strtotime($d->getTanggal()))){
        //         $msg = "End Date harus lebih besar dari From Date";
        //         $ok = 0;
        //     }else{
        //         $ok = 1;
        //     }
        // }

        if($ok == 1){
            $this->setStatus(TRUE);
        }else{
        	$this->setMsg($msg);
        }
    }
}
