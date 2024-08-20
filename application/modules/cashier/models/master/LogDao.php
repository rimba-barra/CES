<?php

/**
 * Description of CoaConfigDao
 *
 * @author MIS
 */
class Cashier_Models_Master_LogDao extends Cashier_Box_Models_App_AbDaoCashier implements Cashier_Box_Models_App_BlackHole {

    public function getByProjectPtWithPageSearch(Cashier_Models_Master_Log $ct,  Cashier_Box_Models_App_HasilRequestRead $request){
        $hasil = array();
        
        // $project = $ct->getProject()->getId();
        // $pt = $ct->getPt()->getId();
        // $userlog = Cashier_Box_GlobalParams::$userlog;
        // $project = 0;
        // if (in_array( $ct->getUser(),$userlog)) {
        //      $project = 0;
        // } else {
        //      $project = $ct->getProject()->getId();
        // }
        // $ptId = (empty($request->getOthersValue("pt_id")))?$pt:$request->getOthersValue("pt_id");
        
        $project_id = $request->getOthersValue("project_id");
        $pt_id = $request->getOthersValue("pt_pt_id");
       
        $hasil = $this->dbTable->SPExecute('sp_all_read',
                $request->getModeRead(),
                $request->getModule(),
                $project_id,
                intval($pt_id),
                $request->getPage(),
                $request->getLimit(),
                $request->getXmlValue());
                
        return $hasil; 
    }
    
  
    public function directDelete(Cashier_Box_Models_App_Decan $decan, Cashier_Box_Kouti_InterSession $session) {
        $row = 0;
        //$row = $this->dbTable->SPUpdate('sp_coa_config_destroy', $decan->getString(), $session->getUserId());
        
        return $row;
    } 
    
  

    

        
    //[]
}

?>
