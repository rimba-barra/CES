<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Writeofflimit extends Cashier_Box_Models_ObjectEmbedData implements Cashier_Box_Kouti_Remora, Cashier_Box_Models_Master_InterProjectPt, Cashier_Box_Delien_DelimiterCandidate {

    private $project_id;
    private $pt_id;
    private $projectname;
    private $ptname;
    private $rolename;
    private $limittypename;
    private $roleid;
    private $writeoff_limit_type_id;
    private $addon;
    private $addby;
    private $addbyname;
    private $writeoff_limit_id;
    private $modion;
    private $modiby;
    private $modibyname;
    private $limit_percentage;
    private $limit_amount;
    private $send_email;
    
    

    public function __construct() {
        parent::__construct();
        $this->project = new Cashier_Box_Models_Master_Project();
        $this->pt = new Cashier_Box_Models_Master_Pt();
        $this->embedPrefix = 'writeofflimit_';
    }
    
    function getSend_email() {
        return $this->send_email;
    }

    function setSend_email($send_email) {
        $this->send_email = $send_email;
    }

        
    function getLimit_percentage() {
        return $this->limit_percentage;
    }

    function getLimit_amount() {
        return $this->limit_amount;
    }

    function setLimit_percentage($limit_percentage) {
        $this->limit_percentage = $limit_percentage;
    }

    function setLimit_amount($limit_amount) {
        $this->limit_amount = $limit_amount;
    }

        
    function getRolename() {
        return $this->rolename;
    }

    function getLimittypename() {
        return $this->limittypename;
    }

    function setRolename($rolename) {
        $this->rolename = $rolename;
    }

    function setLimittypename($limittypename) {
        $this->limittypename = $limittypename;
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
    function getWriteoff_limit_id() {
        return $this->writeoff_limit_id;
    }

    function setWriteoff_limit_id($writeoff_limit_id) {
        $this->writeoff_limit_id = $writeoff_limit_id;
    }

    
        function getRoleid() {
        return $this->roleid;
    }

    function getWriteoff_limit_type_id() {
        return $this->writeoff_limit_type_id;
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

    function setWriteoff_limit_type_id($writeoff_limit_type_id) {
        $this->writeoff_limit_type_id = $writeoff_limit_type_id;
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
        if (isset($x['writeoff_limit_id'])) {
            $this->setWriteoff_limit_id($x['writeoff_limit_id']);
        }
        if (isset($x['role_id'])) {
            $this->setRoleid($x['role_id']);
        }
        if (isset($x['writeoff_limit_type_id'])) {
            $this->setWriteoff_limit_type_id($x['writeoff_limit_type_id']);
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
        if (isset($x['limittypename'])) {
            $this->setLimittypename($x['limittypename']);
        }
        if (isset($x['limit_percentage'])) {
            $this->setLimit_percentage($x['limit_percentage']);
        }
        if (isset($x['limit_amount'])) {
            $this->setLimit_amount($x['limit_amount']);
        }
        if (isset($x['send_email'])) {
            $this->setSend_email($x['send_email']);
        }

        unset($x);
    }

    public function getArrayTable() {


        $x = array(
            "role_id" => $this->getRoleid(),
            "writeoff_limit_type_id" => $this->getWriteoff_limit_type_id(),
            "writeoff_limit_id" => $this->getWriteoff_limit_id(),
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
            "limittypename" => $this->getLimittypename(),
            "limit_percentage" => $this->getLimit_percentage(),
            "limit_amount" => $this->getLimit_amount(),
            "send_email" => $this->getSend_email(),
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
