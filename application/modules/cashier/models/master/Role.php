<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Role extends Cashier_Box_Models_ObjectEmbedData {

    private $roleid;
    private $role;
    private $description;

    
   public function __construct($embedPrefix = NULL) {

        parent::__construct();
        $this->embedPrefix = $embedPrefix == NULL ? 'role_' : $embedPrefix;
    }
    
    function getRoleid() {
        return $this->roleid;
    }

    function getRole() {
        return $this->role;
    }

    function getDescription() {
        return $this->description;
    }

    function setRoleid($roleid) {
        $this->roleid = $roleid;
    }

    function setRole($role) {
        $this->role = $role;
    }

    function setDescription($description) {
        $this->description = $description;
    }

                
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;

        if (isset($x['role_id'])) {
            $this->setRoleid($x['role_id']);
        }
        if (isset($x['role'])) {
            $this->setRole($x['role']);
        }
        if (isset($x['description'])) {
            $this->setDescription($x['description']);
        }

        unset($x);
    }

    public function getArrayTable() {

        $x = array();
        $x['role_id'] = $this->getRoleid();
        $x['role'] = $this->getRole();
        $x['description'] = $this->getDescription();

        return $x;
    }



}

?>
