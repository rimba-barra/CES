<?php 

class Hrd_Models_Performancemanagement_CompetencyCategoryDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    public function save(Hrd_Models_Performancemanagement_CompetencyCategory $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_competencycategory_create',
            $d->getAddBy(),
            $d->code,
            $d->category,
            str_replace("'", '`', $d->description)
        );
        
        return $hasil;
    }

    public function update(Hrd_Models_Performancemanagement_CompetencyCategory $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_competencycategory_update', 
            $d->getAddBy(),
            $d->getId(),
            $d->code,
            $d->category,
            str_replace("'", '`', $d->description)
        );

        return $hasil;
    }

    public function getAllCat(Hrd_Models_Performancemanagement_CompetencyCategory $d) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute(
            'sp_competencycategory_read', 
            1, 
            9999,
            '',
            ''
        );

        return $hasil;
    }

    public function getAll(Box_Models_App_HasilRequestRead $r, Hrd_Models_Performancemanagement_CompetencyCategory $d) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute(
            'sp_competencycategory_read', 
            $r->getPage(), 
            $r->getLimit(),
            $d->code,
            $d->category
        );
// var_dump($this->dbTable); // ngecek sql server error
// var_dump($hasil); // ngecek sql server error
     
        return $hasil;
    }
    
    public function deleteOne($id,$userId) {
        $row = 0;
        $row = $this->dbTable->SPUpdate(
            'sp_competencycategory_destroy',
            $id,
            $userId
        );

        return $row;
    }
  
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate(
            'sp_competencycategory_destroy', 
            $decan->getString(), 
            $session->getUserId()
        );

        return $row;
    }

    public function codeExist(Hrd_Models_Performancemanagement_CompetencyCategory $d) {
        $hasil = array();

        $hasil = $this->dbTable->SPExecute(
            'sp_competencycategorycodeexist_read', 
            $d->code
        );

        return $hasil;
    }
}

?>