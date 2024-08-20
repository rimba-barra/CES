<?php

class Hrd_Models_Performancemanagement_CompetencyNamesDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole  {
    
    public function save(Hrd_Models_Performancemanagement_CompetencyNames $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_competencynames_create',
            $d->getAddBy(),
            $d->code,
            $d->name,
            $d->catid,
            str_replace("'", '`', $d->desc),
            str_replace("'", '`', $d->interview),
            str_replace("'", '`', $d->tips),
            str_replace("'", '`', $d->media),
            $d->imgpath

        );
        // var_dump($this->dbTable); die();
        
        return $hasil;
    }

    public function update(Hrd_Models_Performancemanagement_CompetencyNames $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_competencynames_update', 
            $d->getAddBy(),
            $d->getId(),
            $d->code,
            $d->name,
            $d->catid,
            str_replace("'", '`', $d->desc),
            $d->interview,
            $d->tips,
            $d->media,
            $d->imgpath
        );

        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Performancemanagement_CompetencyNames $d) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute(
            'sp_competencynames_read', 
            $r->getPage(), 
            $r->getLimit(),
            $d->code,
            $d->name,
            $d->catid,
            $d->desc
        );

        return $hasil;
    }

    public function getAllName(Hrd_Models_Performancemanagement_CompetencyNames $d) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute(
            'sp_competencynames_read', 
            1, 
            9999,
            '',
            '',
            ''
        );

        return $hasil;
    }
    
    public function deleteOne($id,$userId) {
        $row = 0;
        $row = $this->dbTable->SPUpdate(
            'sp_competencynames_destroy',
            $id,
            $userId
        );

        return $row;
    }
  
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate(
            'sp_competencynames_destroy', 
            $decan->getString(), 
            $session->getUserId()
        );

        return $row;
    }

    public function codeExist(Hrd_Models_Performancemanagement_CompetencyNames $d) {
        $hasil = array();

        $hasil = $this->dbTable->SPExecute(
            'sp_competencynamescodeexist_read', 
            $d->code
        );

        return $hasil;
    }
}
