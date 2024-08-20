<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ParameterDao
 *
 * @author MIS
 */
class Hrd_Models_Master_ParameterDao extends Box_Models_App_AbDao {
    public function getList(Box_Models_App_Decan $decan,  Box_Models_App_Session $session){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_parameterb_read',
                $session->getProject()->getId(),$session->getPt()->getId(),$decan->getString());
        return $hasil;
    }
    
    
    public function getAllOld($projectId,$ptId){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_parameter_read','','','','',$projectId,$ptId,0,1000);
        return $hasil;
    }
    
    public function generate(Box_Models_App_Decan $decan,$userId,$projectId,$ptId){
        
        $dcResult = $decan->getDCResult();
        if(count($dcResult)==0){
            $dcResult = array("parameter_id"=>"","parametername"=>"","value"=>"","datatype"=>"","description"=>"");
        }
        
        
        $row = $this->dbTable->SPUpdate('sp_parameter_gen_create',
                $userId,
                $projectId,
                $ptId,
                $dcResult["parameter_id"],$dcResult["parametername"],
                $dcResult["value"],$dcResult["datatype"],
                $dcResult["description"]);
        
        
     
        var_dump($this->dbTable);
        return $row;
        //sp_parameter_generate
    }
}

?>
