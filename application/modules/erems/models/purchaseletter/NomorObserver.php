<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of NomorObserver
 *
 * @author TOMMY-MIS
 */
abstract  class Erems_Models_Purchaseletter_NomorObserver implements Erems_Box_Observer_InterfaceObserver{
    private $projectId;
    private $ptId;
    private $nomor;


   
    
    public function getProjectId() {
        return $this->projectId;
    }

    public function getPtId() {
        return $this->ptId;
    }

    public function setProjectId($projectId) {
        $this->projectId = $projectId;
    }

    public function setPtId($ptId) {
        $this->ptId = $ptId;
    }
    
    public function getNomor() {
        return $this->nomor;
    }

    protected function setNomor($nomor) {
        $this->nomor = $nomor;
    }





}
