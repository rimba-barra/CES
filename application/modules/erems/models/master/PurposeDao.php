<?php

/**
 * Description of BlockDao
 *
 * @author MIS
 */
class Erems_Models_Master_PurposeDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {
    
    private $ses;
    
    public function setSession(Erems_Box_Models_App_Session $ses=NULL){
       $this->ses = $ses; 
    }
   
    
    public function getAll(Erems_Box_Models_App_HasilRequestRead $request,Erems_Models_Master_Purpose $pc){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_purposeb_read',$this->ses->getProject()->getId(),$this->ses->getPt()->getId(),$request->getPage(),$request->getLimit(),$pc->getCode(),$pc->getName(),$pc->getDescription());
        return $hasil;
    }
    
    public function save(Erems_Models_Master_Purpose $pc){
        $hasil = 0;
      
       
          
       
       
        $hasil = $this->dbTable->SPUpdate('sp_purposeb_create',$pc->getAddBy(),$pc->getProject()->getId(),
                $pc->getPt()->getId(),$pc->getCode(),$pc->getName(),$pc->getDescription());
        
     
        return $hasil;
    }
    
    public function codeExist(Erems_Models_Master_Purpose $ft,$projectId,$ptId){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_purposecodeexist_read',$ft->getCode(),$projectId,$ptId);
        
        return $hasil;
    }
    
    //sp_projectfacilitiestcodeexist_read
    
    public function update(Erems_Models_Master_Purpose $pc){
        $hasil = 0;
      
        $hasil = $this->dbTable->SPUpdate('sp_purposeb_update',$pc->getAddBy(),$pc->getId(),$pc->getCode(),
                $pc->getName(),$pc->getDescription());
        
              
    
        return $hasil;
    }

    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_purposeb_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

    // edited by Rico 23082022
    public function InlineUpdate($param = array(),$userID) {
        $return['success'] = false;
        $table = 'm_purpose';
        $id = 'purpose_id';
        $id_value = $param['id'];
        $collumn = $param['collumn'];
        $collumn_value = $param['value'];

        if (is_array($param) && count($param)) {
            try {
                $affectedRow = $this->dbTable->SPExecute('sp_inline_update', $table, $id, $id_value, $collumn, $collumn_value , $userID);
                $return['success'] = (bool) $affectedRow;
            } catch (Exception $e) {
                 var_dump($e->getMessage());
                var_dump($e); 
            }
        
          
        }
        return $return;
    }
}

?>
