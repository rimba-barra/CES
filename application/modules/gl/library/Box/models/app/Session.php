<?php

/**
 * Description of Session
 *
 * @author tommytoban
 */
class Gl_Box_Models_App_Session extends Gl_Box_Kouti_Session {

    private $user;
    private $project;
    private $pt;
    
    
    
    public function __construct() {
        $this->user = new Gl_Box_Models_Master_User();
        $this->project = new Gl_Box_Models_Master_Project();
        $this->pt = new Gl_Box_Models_Master_Pt();
    }
    
    public function getUser() {
        return $this->user;
    }

    public function setUser(Gl_Box_Models_Master_User $user) {
        $this->user = $user;
    }

    public function getProject() {
        return $this->project;
    }

    public function setProject(Gl_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function getPt() {
        return $this->pt;
    }

    public function setPt(Gl_Box_Models_Master_pt $pt) {
        $this->pt = $pt;
    }

    
    public function setSession($nama, $value) {
        parent::setSession($nama, $value);
        $nama = (string)$nama;
        $value = (int)$value;
        if($nama=='user'){
            $this->user->setId($value);
        }else if($nama=='pt'){
            $this->pt->setId($value);
        }else if($nama=='project'){
            $this->project->setId($value);
        }
    }

}

?>
