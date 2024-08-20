<?php

/**
 * Description of CoaConfigDao
 *
 * @author MIS
 */
class Cashier_Models_Master_TemplateDao extends Cashier_Box_Models_App_AbDaoCashier implements Cashier_Box_Models_App_BlackHole {
    
    public function save($cs,Cashier_Box_Models_App_HasilRequestRead $req){

        $row = 0;
        var_dump($req->getXmlData());
        if(!$cs->getAddBy()){
            return $row;
        }

              $row = $this->dbTable->SPUpdate('sp_coaconfig_create',
                      $cs->getAddBy(),
                      $cs->getProject()->getId(),
                      $cs->getPt()->getId(),
                      $cs->getCoaCode(),
                      $cs->getName(),
                      $cs->getDecription());
      
        return $row;
        
    }
    
    public function update(Cashier_Models_Master_BudgetCoa $cs, Cashier_Box_Models_App_HasilRequestRead $req){  
        
        
        $row = 0;
        if(!$cs->getId()){
            return $row;
        }
        
        try {
            
        $row = $this->dbTable->SPUpdate('sp_all_update',
                $req->getModeRead(),
                $req->getModule(),
                $cs->getProject()->getId(),
                $cs->getPt()->getId(),
                $cs->getAddBy(),
                $req->getXmlData()
                );
        
    
        } catch(Exception $e) { $this->dbTable->logErrorPhp($e); }
        return $row;
    }

    public function getByProjectPtWithPageSearch(Cashier_Models_Master_BudgetCoa $ct,  Cashier_Box_Models_App_HasilRequestRead $request){
        $hasil = array();
        $project = $ct->getProject()->getId();
        $pt = $ct->getPt()->getId();
        if($project==0 || $pt==0){
            return $hasil;
        }
        $ptId = (empty($request->getOthersValue("pt_id")))?$pt:$request->getOthersValue("pt_id");
        
        $hasil = $this->dbTable->SPExecute('sp_all_read',
                $request->getModeRead(),
                $request->getModule(),
                $ct->getProject()->getId(),
                intval($ptId),
                $request->getPage(),
                $request->getLimit(),
                $request->getXmlValue());
        return $hasil; 
    }
    
    
    
    public function getHasilGenerateCoa(Cashier_Models_Master_BudgetCoa $ct, Cashier_Box_Models_App_HasilRequestRead $request) {
        $hasil = array();
        $project = $ct->getProject()->getId();
        $pt = $ct->getPt()->getId();
        if($project==0 || $pt==0){
            return $hasil;
        }
      
        $hasil = $this->dbTable->SPExecute('sp_budgetcoagenerate_read',
                $ct->getProject()->getId(),
                intval($request->getOthersValue("pt_id"))
                );
       
        return $hasil; 
    }
    
    public function directDelete(Cashier_Box_Models_App_Decan $decan, Cashier_Box_Kouti_InterSession $session) {
        $row = 0;
        //$row = $this->dbTable->SPUpdate('sp_coa_config_destroy', $decan->getString(), $session->getUserId());
        
        return $row;
    } 
    
     public function deleteData($user, $budgetdeletedId, Cashier_Box_Models_App_HasilRequestRead $req ) {
        $row = 0;
        if(!$user) {
            return $row;
        }

        
        $row = $this->dbTable->SPUpdate('sp_all_destroy',
                $req->getModeRead(),
                $req->getModule(),
                intval($user),
                $budgetdeletedId);
        
        return $row;
    } 
    
    public function codeExist($ce, Cashier_Box_Models_App_HasilRequestRead $request, $ses ){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_validator_read',
                $request->getModeRead(),
                $request->getModule(),
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $ce);

        return $hasil;
    }
    
    public function getPt(Cashier_Box_Models_App_HasilRequestRead $request, $ses){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_all_read',
                $request->getModeRead(),
                $request->getModule(),
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                0, //getpage
                0, //getlimit
                $request->getXmlValue());
     
        return $hasil;
    }
    
   
    public function savetemplate(Cashier_Box_Models_App_HasilRequestRead $request, $ses) {
        
       $row = 0;
       

     
        try {
            
      
        
        $row = $this->dbTable->SPUpdate('sp_template_update',
               $request->getOthersValue('template_id'),
               $request->getOthersValue('json'),
                $ses->getUser()->getId()
                );
      
    
        } catch(Exception $e) { $this->dbTable->logErrorPhp($e); }
        return $row;
        
    }

        
    //[]
}

?>
