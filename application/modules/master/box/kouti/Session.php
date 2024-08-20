<?php

class Master_Box_Kouti_Session implements Master_Box_Kouti_InterSession{
    private $userId;
    private $ptId;
    private $projectId;
    private $groupList;
    private $groupId;
    
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
    
    public function getGroupList() {
        return $this->groupList;
    }

    public function setGroupList($groupList) {
        $this->groupList = $groupList;
    }
    
    public function getGroupId() {
        return $this->groupId;
    }

    public function setGroupId($groupId) {
        $this->groupId = $groupId;
    }

    
    
    public function setSession($nama, $value) {
        $nama = (string)$nama;
        
        if($nama=='user'){
            $value = (int)$value;
            $this->setUserId($value);
        }else if($nama=='pt'){
            $value = (int)$value;
            $this->setPtId($value);
        }else if($nama=='project'){
            $value = (int)$value;
            $this->setProjectId($value);
        }else if($nama=='group_list'){
          
            $this->setGroupList($value);
        }else if($nama=='group'){
            $value = (int)$value;
            $this->setGroupId($value);
        }
    }    
}
?>
