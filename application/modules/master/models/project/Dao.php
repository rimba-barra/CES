<?php

class Master_Models_Project_Dao extends Master_Models_App_AbDao{ 

 
    function getAll(Master_Box_Models_App_HasilRequestRead $r, Master_Models_Project_Project $p) {

        
        $hasil = $this->dbTable->SPExecute('sp_projectb_read',$r->getPage(),$r->getLimit(),$p->getId(),$p->getCode(),$p->getName());
        
        return $hasil;
    }
    
    function getOne($id) {

        
        $hasil = $this->dbTable->SPExecute('sp_projectb_read',1,1,$id,'','');
        
        return $hasil;
    }
    
    function update(Master_Models_Project_Project $p) {
       
     
        
        $hasil = $this->dbTable->SPExecute('sp_projectb_update',$p->getAddBy(),$p->getId(),$p->getCode(),$p->getName(),$p->getLongName(),$p->getProjectManager(),$p->getAddress());
        
        return $hasil;
    }
    
    function save(Master_Models_Project_Project $p) {
      
        
        $hasil = $this->dbTable->SPExecute('sp_projectb_create',$p->getAddBy(),$p->getCode(),$p->getName(),$p->getLongName(),$p->getProjectManager(),$p->getAddress());
        
        return $hasil;
    }
    
    function dataExist(Master_Models_Project_Project $p) {
      
        
        $hasil = $this->dbTable->SPExecute('sp_projectexist_read',$p->getName());
        
        return $hasil;
    }
 

}

?>