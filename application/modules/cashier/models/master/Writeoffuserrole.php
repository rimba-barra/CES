<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Writeoffuserrole extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

    private $project_id;
    private $pt_id;
    private $projectname;
    private $ptname;
    private $rolename;
    private $userfullname;
    private $roleid;
    private $userid;
    private $addon;
    private $addby;
    private $addbyname;
    private $userrole_id;
    private $modion;
    private $modiby;
    private $modibyname;
    
    

    public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->embedPrefix = 'writeoffuserrole_';
    }
    
    function getRolename() {
        return $this->rolename;
    }

    function getUserfullname() {
        return $this->userfullname;
    }

    function setRolename($rolename) {
        $this->rolename = $rolename;
    }

    function setUserfullname($userfullname) {
        $this->userfullname = $userfullname;
    }

        
    function getProject_id() {
        return $this->project_id;
    }
    
    function getPt_id() {
        return $this->pt_id;
    }
    
    function getModion() {
        return $this->modion;
    }

    function getModiby() {
        return $this->modiby;
    }

    function getModibyname() {
        return $this->modibyname;
    }

    function setModion($modion) {
        $this->modion = $modion;
    }

    function setModiby($modiby) {
        $this->modiby = $modiby;
    }

    function setModibyname($modibyname) {
        $this->modibyname = $modibyname;
    }

        
        function getAddbyname() {
        return $this->addbyname;
    }

    function setAddbyname($addbyname) {
        $this->addbyname = $addbyname;
    }
    function getUserrole_id() {
        return $this->userrole_id;
    }

    function setUserrole_id($userrole_id) {
        $this->userrole_id = $userrole_id;
    }

    
        function getRoleid() {
        return $this->roleid;
    }

    function getUserid() {
        return $this->userid;
    }

    function getAddon() {
        return $this->addon;
    }

    function getAddby() {
        return $this->addby;
    }

    function setProject_id($project_id) {
        $this->project_id = $project_id;
    }

    function setPt_id($pt_id) {
        $this->pt_id = $pt_id;
    }

    function setRoleid($roleid) {
        $this->roleid = $roleid;
    }

    function setUserid($userid) {
        $this->userid = $userid;
    }

    function setAddon($addon) {
        $this->addon = $addon;
    }

    function setAddby($addby) {
        $this->addby = $addby;
    }

    function getProjectname() {
        return $this->projectname;
    }

    function getPtname() {
        return $this->ptname;
    }

    function setProjectname($projectname) {
        $this->projectname = $projectname;
    }

    function setPtname($ptname) {
        $this->ptname = $ptname;
    }

        
        public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;


        if (isset($x['project_id'])) {
            $this->setProject_id($x['project_id']);
        }
        if (isset($x['projectname'])) {
            $this->setProjectname($x['projectname']);
        }
        if (isset($x['pt_id'])) {
            $this->setPt_id($x['pt_id']);
        }
        if (isset($x['ptname'])) {
            $this->setPtname($x['ptname']);
        }
        if (isset($x['userrole_id'])) {
            $this->setUserrole_id($x['userrole_id']);
        }
        if (isset($x['role_id'])) {
            $this->setRoleid($x['role_id']);
        }
        if (isset($x['user_id'])) {
            $this->setUserid($x['user_id']);
        }

        if (isset($x['addby'])) {
            $this->setAddby($x['addby']);
        }
        if (isset($x['addon'])) {
            $this->setAddon($x['addon']);
        }
        if (isset($x['addbyname'])) {
            $this->setAddbyname($x['addbyname']);
        }
        if (isset($x['modiby'])) {
            $this->setModiby($x['modiby']);
        }
        if (isset($x['modion'])) {
            $this->setModion($x['modion']);
        }
        if (isset($x['modibyname'])) {
            $this->setModibyname($x['modibyname']);
        }
        if (isset($x['rolename'])) {
            $this->setRolename($x['rolename']);
        }
        if (isset($x['userfullname'])) {
            $this->setUserfullname($x['userfullname']);
        }

        unset($x);
    }

    public function getArrayTable() {


        $x = array(
            "role_id" => $this->getRoleid(),
            "user_id" => $this->getUserid(),
            "userrole_id" => $this->getUserrole_id(),
            "addby" => $this->getAddby(),
            "addon" => $this->getAddon(),
            "addbyname" => $this->getAddbyname(),
            "modion" => $this->getModion(),
            "modiby" => $this->getModiby(),
            "modibyname" => $this->getModibyname(),
            "project_id" => $this->getProject_id(),
            "pt_id" => $this->getPt_id(),
            "projectname" => $this->getProjectname(),
            "ptname" => $this->getPtname(),
            "rolename" => $this->getRolename(),
            "userfullname" => $this->getUserfullname(),
        );

        return $x;
    }

    public function getProject() {
        return $this->project;
    }

    public function setProject(Cashier_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setProjectPt(Cashier_Box_Models_Master_Project $project, Cashier_Box_Models_Master_Pt $pt) {
        $this->project = $project;
        $this->pt = $pt;
    }

    public function getPt() {
        return $this->pt;
    }

    public function setPt(Cashier_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array($this->getProject(), $this->getPt());
    }

    public function getDCArray() {
        return $this->detail;
    }

    public function getDCResult() {
        return $this->dcResult;
    }

    public function setDCArray($delimiteredArray) {
        $this->dcResult = $delimiteredArray;
    }

}

?>
