<?php

/**
 * Description of Session
 *
 * @author tommytoban
 */
class Cashier_Box_Models_App_Session extends Cashier_Box_Kouti_Session {

    private $user;
    private $project;
    private $pt;
    
    public function __construct() {
        $this->user = new Cashier_Box_Models_Master_User();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
    }

    public function getUser() {
        return $this->user;
    }

    public function setUser(Cashier_Box_Models_Master_User $user) {
        $this->user = $user;
    }

    public function getProject() {
        return $this->project;
    }

    public function setProject(Cashier_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        return $this->pt;
    }

    public function setPt(Cashier_Box_Models_Master_pt $pt) {
        $this->pt = $pt;
    }
     
    public function setSession($nama, $value) {
        parent::setSession($nama, $value);
        $nama = (string) $nama;
        $value = (int) $value;
        if (Cashier_Box_Config::IS_PROJECTPT_CONSTANT) {
            if ($nama == 'user') {
                $this->user->setId($value);
            } else if ($nama == 'pt') {
                $this->pt->setId(Cashier_Box_Config::DEBUG_PT_ID);
            } else if ($nama == 'project') {
                $this->project->setId(Cashier_Box_Config::DEBUG_PROJECT_ID);
            }
        } else {
            if ($nama == 'user') {
                $this->user->setId($value);
            } else if ($nama == 'pt') {
                $this->pt->setId($value);
            } else if ($nama == 'project') {
                $this->project->setId($value);
            }
        }

       
    }

}

?>
