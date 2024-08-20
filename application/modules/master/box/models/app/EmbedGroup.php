<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of EmbedGroup
 *
 * @author MIS
 */
class Master_Box_Models_App_EmbedGroup {
    private $member;
    public function __construct() {
        $this->member = array();
    }
    public function getMember() {
        return $this->member;
    }

    public function setMember($member) {
        $this->member = (array)$member;
    }
    
    public function getModel(){
        $member = $this->member;
        $hasil = array();
        foreach($member as $row){
            $ar = $row->getMappingArray(TRUE);
            $hasil = array_merge($hasil,$ar);
        }
        return $hasil;
    }
    
    


}

?>
