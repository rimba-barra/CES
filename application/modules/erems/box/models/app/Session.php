<?php

/**
 * Description of Session
 *
 * @author tommytoban
 */
class Erems_Box_Models_App_Session extends Erems_Box_Kouti_Session {

    private $user;
    private $project;
    private $pt;
    public $controllerId;
    public $controllerName;
    public $appsId;
    
    public function __construct() {
        $this->user = new Erems_Box_Models_Master_User();
        $this->project = new Erems_Box_Models_Master_Project();
        $this->pt = new Erems_Box_Models_Master_Pt();
    }

    public function getUser() {
        return $this->user;
    }

    public function setUser(Erems_Box_Models_Master_User $user) {
        $this->user = $user;
    }

    public function getProject() {
        return $this->project;
    }

    public function setProject(Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        return $this->pt;
    }

    public function setPt(Erems_Box_Models_Master_pt $pt) {
        $this->pt = $pt;
    }
     
    public function setSession($nama, $value) {
        parent::setSession($nama, $value);
        $nama = (string) $nama;
        $value = (int) $value;
        if (Erems_Box_Config::IS_PROJECTPT_CONSTANT) {
            if ($nama == 'user') {
                $this->user->setId($value);
            } else if ($nama == 'pt') {
                $this->pt->setId(Erems_Box_Config::DEBUG_PT_ID);
            } else if ($nama == 'project') {
                $this->project->setId(Erems_Box_Config::DEBUG_PROJECT_ID);
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
