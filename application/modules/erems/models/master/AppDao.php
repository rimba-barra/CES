<?php

/**
 * Description of AppDao
 *
 * @author MIS
 */
class Erems_Models_Master_AppDao extends Erems_Box_Models_App_AbDao {
    public function getPt($ptId){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_app_pt',$ptId);
        return $hasil; 
    }
    public function getProject($projectId){
       $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_app_project',$projectId);
        return $hasil;  
    }
    
    public function getAllPaymentMethod(){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_paymentmethodb_read');
        return $hasil;   
    }
    
    public function getAllPaymentType(){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_paymenttypeb_read');
       
        return $hasil;   
    }
    
    public function getAllCity(){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_city_read');
        return $hasil;   
    }
	
	//added by david
    public function getGlobalParam($projectId,$ptId,$paramName){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_global_parameter_read',$projectId,$ptId,$paramName);
        return $hasil;   
    }
    //end by david
}

?>
