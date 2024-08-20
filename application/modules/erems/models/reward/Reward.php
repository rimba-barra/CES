<?php

class Erems_Models_Reward_Reward extends Erems_Box_Models_ObjectEmbedData implements Erems_Box_Kouti_Remora, Erems_Box_Models_Master_InterProjectPt {

    private $code;
    private $group_id;
    private $name;
    private $group_name;
    private $active;
    private $generate_notes;
    private $is_over_target;

    public function __construct($embedPrefix="reward_") {
        parent::__construct();
        $this->embedPrefix = $embedPrefix;
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x['reward_id'])) {
            $this->setid($x['reward_id']);
        }
        if (isset($x["code"])) {
            $this->setCode($x["code"]);
        }
        
        if (isset($x["group_id"])) {
            $this->setGroup_id($x["group_id"]);
        }
        if (isset($x["group_name"])) {
            $this->setGroup_name($x["group_name"]);
        }
        if (isset($x["name"])) {
            $this->setName($x["name"]);
        }
        if (isset($x["generate_notes"])) {
            $this->setGenerate_notes($x["generate_notes"]);
        }
        if (isset($x["is_over_target"])) {
            $this->setIs_over_target($x["is_over_target"]);
        }
        if (isset($x["Active"])) {
            $this->setActive($x["Active"]);
        } else {
            $this->setActive('0');
        }

        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            'reward_id'      => $this->getId(),
            "code"           => $this->getCode(),
            "group_id"       => $this->getGroup_id(),
            "name"           => $this->getName(),
            "group_name"     => $this->getGroup_name(),
            "Active"         => $this->getActive(),
            "generate_notes" => $this->getGenerate_notes(),
            "is_over_target" => $this->getIs_over_target()
        );

        return $x;
    }
    
    function getCode() {
        return $this->code;
    }

    function getGroup_id() {
        return $this->group_id;
    }

    function getName() {
        return $this->name;
    }
 
    function setCode($code) {
        $this->code = $code;
    }

    function setGroup_id($group_id) {
        $this->group_id = $group_id;
    }

    function setName($name) {
        $this->name = $name;
    }
    
    function getGroup_name() {
        return $this->group_name;
    }

    function setGroup_name($group_name) {
        $this->group_name = $group_name;
    }

    
    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

    public function getProject() {
        if (!$this->project) {
            $this->project = new Erems_Box_Models_Master_Project();
        }
        return $this->project;
    }

    public function getPt() {
        if (!$this->pt) {
            $this->pt = new Erems_Box_Models_Master_Pt();
        }
        return $this->pt;
    }

    public function setProject(Erems_Box_Models_Master_Project $project) {
        $this->project = $project;
    }

    public function setPt(Erems_Box_Models_Master_Pt $pt) {
        $this->pt = $pt;
    }
    
    function getActive() {
        return $this->active;
    }
    
    function setActive($active) {
        $this->active = $active;
    }
    
    public function getGenerate_notes() {
        return $this->generate_notes;
    }
    
    public function setGenerate_notes($generate_notes) {
        $this->generate_notes = $generate_notes;
    }
    
    public function getIs_over_target() {
        return $this->is_over_target;
    }
    
    public function setIs_over_target($is_over_target) {
        $this->is_over_target = $is_over_target;
    }

}
