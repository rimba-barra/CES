<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Params
 *
 * @author MIS
 */
class Erems_Models_Purchaseletter_Params extends Erems_Models_Parameter_Parameter {
    private $kprDesc;
    private $cashDesc;
    private $inhouseDesc;
    private $biayaBalikNama;
    private $biayaPerolehanHak;
    private $biayaAktaJualBeli;
    private $statusProject;
    private $rescheduleSendMail;
    private $enableEditNumber;
    private $superUserGroupId;
    
    
    public function fill(\Erems_Models_Master_Parameter $parameter) {
        switch($parameter->getName()){
            case Erems_Box_GlobalParams::PURCHASELETTER_CASH_DESC:
               $this->setCashDesc($parameter->getValue());
                break;
            case Erems_Box_GlobalParams::PURCHASELETTER_INHOUSE_DESC:
                $this->setInhouseDesc($parameter->getValue());
                break;
            case Erems_Box_GlobalParams::PURCHASELETTER_KPR_DESC:
                $this->setKprDesc($parameter->getValue());
                break;
            case Erems_Box_GlobalParams::PURCHASELETTER_BIAYA_AKTAJUALBELI:
                $this->setBiayaAktaJualBeli($parameter->getValue());
                break;
            case Erems_Box_GlobalParams::PURCHASELETTER_BIAYA_BALIKNAMA:
                $this->setBiayaBalikNama($parameter->getValue());
                break;
            case Erems_Box_GlobalParams::PURCHASELETTER_BIAYA_PEROLEHANHAK:
                $this->setBiayaPerolehanHak($parameter->getValue());
                break;
            case Erems_Box_GlobalParams::PURCHASELETTER_STATUS_PROJECT:
                $this->setStatusProject($parameter->getValue());
                break;
            case Erems_Box_GlobalParams::RESCHEDULE_SENDMAIL:
                $this->setRescheduleSendMail($parameter->getValue());
                break;
            case Erems_Box_GlobalParams::PURCHASELETTER_ENABLE_EDITNUMBER:
                $this->setEnableEditNumber($parameter->getValue());
                break;
            case Erems_Box_GlobalParams::PURCHASELETTER_SUPERUSER_GROUPID:
                $this->setSuperUserGroupId($parameter->getValue());
                break;
            
        }
    }

    public function getParams() {
        return array(Erems_Box_GlobalParams::PURCHASELETTER_CASH_DESC,
            Erems_Box_GlobalParams::PURCHASELETTER_INHOUSE_DESC,Erems_Box_GlobalParams::PURCHASELETTER_KPR_DESC,
            Erems_Box_GlobalParams::PURCHASELETTER_BIAYA_AKTAJUALBELI,
            Erems_Box_GlobalParams::PURCHASELETTER_BIAYA_BALIKNAMA,
            Erems_Box_GlobalParams::PURCHASELETTER_BIAYA_PEROLEHANHAK,
            Erems_Box_GlobalParams::PURCHASELETTER_STATUS_PROJECT,
            Erems_Box_GlobalParams::RESCHEDULE_SENDMAIL,
            Erems_Box_GlobalParams::PURCHASELETTER_ENABLE_EDITNUMBER,
            Erems_Box_GlobalParams::PURCHASELETTER_SUPERUSER_GROUPID);
    }   
    
    public function getKprDesc() {
        return $this->kprDesc;
    }

    public function setKprDesc($kprDesc) {
        $this->kprDesc = $kprDesc;
    }

    public function getCashDesc() {
        return $this->cashDesc;
    }

    public function setCashDesc($cashDesc) {
        $this->cashDesc = $cashDesc;
    }

    public function getInhouseDesc() {
        return $this->inhouseDesc;
    }

    public function setInhouseDesc($inhouseDesc) {
        $this->inhouseDesc = $inhouseDesc;
    }
    
    public function getBiayaBalikNama() {
        return $this->biayaBalikNama;
    }

    public function setBiayaBalikNama($biayaBalikNama) {
        $this->biayaBalikNama = $biayaBalikNama;
    }

    public function getBiayaPerolehanHak() {
        return $this->biayaPerolehanHak;
    }

    public function setBiayaPerolehanHak($biayaPerolehanHak) {
        $this->biayaPerolehanHak = $biayaPerolehanHak;
    }

    public function getBiayaAktaJualBeli() {
        return $this->biayaAktaJualBeli;
    }

    public function setBiayaAktaJualBeli($biayaAktaJualBeli) {
        $this->biayaAktaJualBeli = $biayaAktaJualBeli;
    }
    
    public function getStatusProject() {
        return $this->statusProject;
    }

    public function setStatusProject($statusProject) {
        $this->statusProject = $statusProject;
    }
    
    public function getRescheduleSendMail() {
        return $this->rescheduleSendMail;
    }

    public function setRescheduleSendMail($rescheduleSendMail) {
        $this->rescheduleSendMail = $rescheduleSendMail;
    }
    
    public function getEnableEditNumber() {
        return $this->enableEditNumber;
    }

    public function setEnableEditNumber($enableEditNumber) {
        $this->enableEditNumber = $enableEditNumber;
    }
    
    public function getSuperUserGroupId() {
        return $this->superUserGroupId;
    }

    public function setSuperUserGroupId($superUserGroupId) {
        $this->superUserGroupId = $superUserGroupId;
    }












}

?>
