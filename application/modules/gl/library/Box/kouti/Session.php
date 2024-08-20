<?php

class Gl_Box_Kouti_Session implements Gl_Box_Kouti_InterSession{
    private $userId;
    private $ptId;
    private $projectId;
    
    public function getUserId() {
        return $this->userId;
    }

    public function setUserId($userId) {
        $this->userId = $userId;
    }

    public function getPtId() {
        return $this->ptId;
    }

    public function setPtId($ptId) {
        $this->ptId = $ptId;
    }

    public function getProjectId() {
        return $this->projectId;
    }

    public function setProjectId($projectId) {
        $this->projectId = $projectId;
    }

    public function setSession($nama, $value) {
        $nama = (string)$nama;
        $value = (int)$value;
        if($nama=='user'){
            $this->setUserId($value);
        }else if($nama=='pt'){
            $this->setPtId($value);
        }else if($nama=='project'){
            $this->setProjectId($value);
        }
    }    
}
?>
