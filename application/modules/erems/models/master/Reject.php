<?php

/**
 * Description of Approve
 *
 * @author tommytoban
 */
class Erems_Models_Master_Reject {
    private $flag;
    private $user;
    private $date;
    
    public function __construct() {
        $this->user = new Erems_Models_Master_User();
    }
    
    public function getFlag() {
        return (boolean)$this->flag;
    }

    public function getUser() {
        return $this->user;
    }

    public function getDate() {
        return $this->date;
    }

    public function setFlag($flag) {
        $this->flag = (boolean)$flag;
    }

    public function setUser(Erems_Models_Master_User $user) {
        $this->user = $user;
    }

    public function setDate($date) {
        $this->date = $date;
    }


}
