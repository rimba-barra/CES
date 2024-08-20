<?php 

class Hrd_Models_Performancemanagement_ApprovallevelDao extends Box_Models_App_AbDao implements Box_Models_App_BlackHole {

    /*public function save(Hrd_Models_Performancemanagement_Approvallevel $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_approvallevel_create',
            $d->getAddBy(),
            $d->code,
            $d->approvallevel,
            str_replace("'", '`', $d->description)
        );
        
        return $hasil;
    }

    public function update(Hrd_Models_Performancemanagement_Approvallevel $d) {
        $hasil = 0;
        $hasil = $this->dbTable->SPUpdate(
            'sp_approvallevel_update', 
            $d->getAddBy(),
            $d->getId(),
            $d->code,
            $d->approvallevel,
            str_replace("'", '`', $d->description)
        );

        return $hasil;
    }*/

    /*public function getAllCat(Hrd_Models_Performancemanagement_Approvallevel $d) {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute(
            'sp_approvallevel_read', 
            1, 
            9999,
            '',
            ''
        );

        return $hasil;
    }*/

    public function getApprovallevel() {
        $hasil = 0;        
        $hasil = $this->dbTable->SPExecute(
            'sp_approvallevel_read', 
            1, 
            9999,
            0
        );
// var_dump($this->dbTable); // ngecek sql server error
// var_dump($hasil); // ngecek sql server error
     
        return $hasil;
    }
    
    /*public function deleteOne($id,$userId) {
        $row = 0;
        $row = $this->dbTable->SPUpdate(
            'sp_approvallevel_destroy',
            $id,
            $userId
        );

        return $row;
    }*/
  
    public function directDelete(\Box_Models_App_Decan $decan, \Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate(
            'sp_approvallevel_destroy', 
            $decan->getString(), 
            $session->getUserId()
        );

        return $row;
    }

    /*public function codeExist(Hrd_Models_Performancemanagement_Approvallevel $d) {
        $hasil = array();

        $hasil = $this->dbTable->SPExecute(
            'sp_approvallevelcodeexist_read', 
            $d->code
        );

        return $hasil;
    }*/
}

?>