<?php

class Hrd_Models_Performancemanagement_LevelDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole  {
    
    public function save(Hrd_Models_Performancemanagement_Level $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_level_create',
            $d->getAddBy(),
            $d->code,
            str_replace("'", '`', $d->desc),
            str_replace("'", '`', $d->sample),
            $d->nameid,
            $d->catid
        );
        
        return $hasil;
    }

    public function update(Hrd_Models_Performancemanagement_Level $d) {
        $hasil = 0;
        // echo $d->catid; exit;
        $hasil = $this->dbTable->SPUpdate(
            'sp_level_update', 
            $d->getAddBy(),
            $d->getId(),
            $d->code,
            str_replace("'", '`', $d->desc),
            str_replace("'", '`', $d->sample),
            $d->nameid,
            $d->catid
        );
        // var_dump($this->dbTable);
        // var_dump($hasil);
        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Performancemanagement_Level $d) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute(
            'sp_level_read', 
            $r->getPage(), 
            $r->getLimit(),
            $d->code,
            $d->desc,
            $d->sample,
            $d->competencyname,
            $d->category
        );
// var_dump($this->dbTable); // ngecek sql server error
// var_dump($hasil); // ngecek sql server error

        return $hasil;
    }

    public function getLeveldata(Box_Models_App_HasilRequestRead $r, $compId) {
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute(
            'sp_levelformatrix_read',
            $compId
        );

        return $hasil;
    }
    
    public function getLevel(Hrd_Models_Performancemanagement_Level $d) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute(
            'sp_level_read', 
            1, 
            9999,
            '',
            '',
            '',
            '',
            ''
        );

        return $hasil;
    }

    public function deleteOne($id,$userId) {
        $row = 0;
        $row = $this->dbTable->SPUpdate(
            'sp_level_destroy',
            $id,
            $userId
        );

        return $row;
    }
  
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate(
            'sp_level_destroy', 
            $decan->getString(), 
            $session->getUserId()
        );

        return $row;
    }

    public function codeExist(Hrd_Models_Performancemanagement_Level $d) {
        $hasil = array();

        $hasil = $this->dbTable->SPExecute(
            'sp_levelcodeexist_read', 
            $d->code
        );

        return $hasil;
    }
}
