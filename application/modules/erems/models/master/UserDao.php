<?php

/**
 * Description of Dao
 *
 * @author MIS
 */
class Erems_Models_Master_UserDao extends Erems_Box_Models_App_AbDao {
    
    public function getUser($username){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_usergetinformation_read',$username);
        return $hasil; 
        
    }
    
    public function getUserById($id){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_usergetinformationbyid_read',$id);
        return $hasil; 
        
    }
    
    public function getUserByMultiId($ids){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_usergetinformationbyids_read',$ids);
        return $hasil; 
        
    }
    
    public function getUserOnline(){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_useronline_read');
        return $hasil; 
    }
	
	/* starr added by ahmad riadi */
	public function getdataCurrentuser($userid){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_current_user',$userid);
        return $hasil; 
    }
	/* end added by ahmad riadi */
}

?>
