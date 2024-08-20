<?php
class Gl_Models_Asset_AssetDao extends Gl_Box_Models_App_AbDao implements Gl_Box_Models_App_BlackHole,  Gl_Models_App_CodeChecked {
    
    public function getAll(Gl_Box_Models_App_HasilRequestRead $r,  Gl_Models_Asset_Asset $field){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_asset_read',                                           
                                            $field->getProject()->getId(),
                                            $field->getPt()->getId(),
                                            $field->getId(), 
                                            $field->account, 
                                            $field->name, 
                                            $field->note, 
                                            $r->getPage(), 
                                            $r->getLimit()    
                                      );       
        return $hasil;
    }
    
    public function save(Gl_Models_Asset_Asset $field) {
         $hasil = 0;
        $hasil = $this->dbTable->SPUpdate('sp_asset_create',                                           
                                            $field->getProject()->getId(),
                                            $field->getPt()->getId(),
                                            $field->getAddBy(),
                                            $field->account,
                                            $field->name,
                                            $field->note
                                        );     
                                  
        return $hasil;
    }

    public function update() {
    }
    
    public function codeExist($object) {
    }

    public function directDelete(Gl_Box_Models_App_Decan $decan, Gl_Box_Kouti_InterSession $session) {
    }    
}          