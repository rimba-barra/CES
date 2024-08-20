<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of DocumentType
 *
 * @author TOMMY-MIS
 */
class Erems_Models_App_Masterdata_DocumentType extends Erems_Box_Models_App_Masterdata_Masterdata{
    
    public function getDao() {
        return new Erems_Models_Master_CustomerDocumentDao();
    }

    public function getTableClass() {
        return new Erems_Models_Master_DocumentType();
    }

    public function getTableClassName() {
        return "documenttype";
    }

    public function prosesData(\Erems_Box_Models_App_AbDao $dao, \Erems_Box_Models_ObjectEmbedData $objectEmbedata, \Erems_Box_Models_App_Models_ReadWorms $app) {
        return NULL;
    }
    
    protected function getMethod($object){
        return $this->getDao()->getAllDocumentType();
    }

}
