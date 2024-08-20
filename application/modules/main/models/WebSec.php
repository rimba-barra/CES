<?php

/**
 * Description of WebSec
 *
 * @author TOMMY-MIS
 */
class Main_Models_WebSec extends Zend_Db_Table_Abstract{
    protected $_name = 'sec_user';

     public function updateUserPassword($tokenId,$code,$module,$password) {
        $hasil = 0;

        $hasil = $this->execSP('sp_user_password_update',$tokenId,$code,$module,$password);
       
        
        return $hasil;
    }
    
    public function getFlashWebToken2($module,$token,$id) {
        $hasil = 0;

        $hasil = $this->execSP('sp_flashwebtoken2_read', $module,$token,$id);


        return $hasil;
    }
    
    
}
