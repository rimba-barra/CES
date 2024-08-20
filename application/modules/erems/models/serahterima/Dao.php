<?php

/**
 * Description of Dao
 *
 * @author RIZALDI-MIS
 */
class Erems_Models_Serahterima_Dao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {
   
    
    public function getAll(Erems_Box_Models_App_HasilRequestRead $r,  Erems_Box_Models_App_Session $session = NULL){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_serahterima_read',
                $session->getProject()->getId(),$session->getPt()->getId(),$r->getPage(),$r->getLimit(),$r->getOthersValue("unit_number"),
                $r->getOthersValue("customer_name")
                );
        return $hasil;
    }
    
    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;


        $ds = $decan->getString();
        $ids = explode("~", $ds);
	

        $row = $this->dbTable->SPUpdate('sp_serahterima_destroy', $ds, $session->getUserId());
		
		
        return $row;
    }
    public function getOne($id){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_serahterimadetail_read',
                $id
                );
        return $hasil;
    }
    
   
    
    public function save(Erems_Models_Serahterima_Serahterima $fi){
        $hasil = 0;
       
        $hasil = $this->dbTable->SPUpdate('sp_serahterima_create',
                $fi->getAddBy(),
                $fi->getProject()->getId(),
                $fi->getPt()->getId(),
                $fi->getPurchaseletter()->getId(),
                $fi->getSerahterimaDate(),
                $fi->getRencanaSerahTerimaDate()
                );
      
       
        /*
       
        $hasil = $this->dbTable->SPUpdate('sp_blockb_create',$pc->getAddBy(),$pc->getProject()->getId(),
                $pc->getPt()->getId(),$pc->getCode(),$pc->getName(),$pc->getCluster()->getId(),$pc->getDescription());
        */
     
        return $hasil;
    }
    
    
    
    
    public function dataExistbyUnit(Erems_Box_Models_Master_Project $projectId,Erems_Box_Models_Master_Pt $ptId,$id){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_serahterimaexistbyunit_read',$projectId->getId(),$ptId->getId(),$id);
        
        return $hasil;
    }
    
    public function update(Erems_Models_Serahterima_Serahterima $fi){
        $hasil = 0;
        
        if($fi->getId()==0){
            return 0;
        }
      
        $hasil = $this->dbTable->SPUpdate('sp_serahterima_update',$fi->getAddBy(),
                $fi->getId(),
                $fi->getPurchaseletter()->getId(),
                $fi->getSerahterimaDate(),
                $fi->getRencanaSerahTerimaDate()
                );
     
              
               //var_dump($this->dbTable);
        return $hasil;
    }

    

}
