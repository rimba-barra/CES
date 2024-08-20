<?php

class Erems_Models_Master_FacilitiesTypeDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole  {
    public function getAll(Erems_Box_Models_App_HasilRequestRead $r,Erems_Models_Master_FacilitiesType $ft){
        
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_facilitiestype_read',$r->getPage(),$r->getLimit(),$ft->getCode(),$ft->getName());
       
        return $hasil; 
    }
    
    
    public function getAllForMaster(Erems_Models_Master_FacilitiesType $ft){
        
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_facilitiestype_read',1,100,$ft->getCode(),$ft->getName());
       
        return $hasil; 
    }
    
    
    public function save(Erems_Models_Master_FacilitiesType $ft){
        $row = 0;
        if(!$ft->getAddBy()){
            return $row;
        }
     
        
        $row = $this->dbTable->SPUpdate('sp_facilitiestype_create',$ft->getCode(),$ft->getName(),$ft->getIcon(),$ft->getDescription(),$ft->getAddBy());
        return $row;
    }
    
    public function update(Erems_Models_Master_FacilitiesType $ft){
         $row = 0;
        if(!$ft->getAddBy()){
            return $row;
        }
        
        
        $row = $this->dbTable->SPUpdate('sp_facilitiestype_update',$ft->getId(),$ft->getCode(),$ft->getName(),$ft->getIcon(),$ft->getDescription(),$ft->getAddBy());
               
        return $row;
    }
    
    public function codeExist(Erems_Models_Master_FacilitiesType $ft){
        $resultCode = false;
        $hasil = $this->dbTable->SPExecute('sp_facilitiestypecodeexist_read',$ft->getCode());
        if(is_array($hasil[0])){
            if(count($hasil[0]) > 0){
               $oldItem = new Erems_Models_Master_FacilitiesType();
               $oldItem->setArrayTable($hasil[0][0]);
               
               if(intval($ft->getId()) > 0){
                   if($oldItem->getId() != $ft->getId()){
                       $resultCode = TRUE;
                   }
               }else{
                   $resultCode = TRUE;
               }
              
            }
        }
      
        
        
        return $resultCode;
    }
    
    public function directDelete(Erems_Box_Models_App_Decan $decan, Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_facilitiestype_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }    
}

?>
