<?php

/**
 * Description of SMS
 *
 * @author TOMMY-MIS
 */
class Master_Models_Project_Project extends Master_Box_Models_ObjectEmbedData implements Master_Box_Kouti_Remora {

    private $code;
    private $name;
    private $address;
    private $longName;
    private $projectManager;

    public function __construct() {
        parent::__construct();
        $this->embedPrefix = "project";
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x['project_id'])) {
            $this->setId($x['project_id']);
        }
        if (isset($x['code'])) {
            $this->setCode($x['code']);
        }
        if (isset($x['name'])) {
            $this->setName($x['name']);
        }
        if (isset($x['address'])) {
            $this->setAddress($x['address']);
        }
        if (isset($x['long_name'])) {
            $this->setLongName($x['long_name']);
        }
        if (isset($x['project_manager'])) {
            $this->setProjectManager($x['project_manager']);
        }
       

        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            'project_id' => $this->getId(),
            'code' => $this->getCode(),
            'name'=>$this->getName(),
            'address'=>$this->getAddress(),
            'long_name'=>$this->getLongName(),
            'project_manager'=>$this->getProjectManager()
            
        );

        return $x;
    }
    
    function getCode() {
        return $this->code;
    }

    function getName() {
        return $this->name;
    }

    function getAddress() {
        return $this->address;
    }

    function setCode($code) {
        $this->code = $code;
    }

    function setName($name) {
        $this->name = $name;
    }

    function setAddress($address) {
        $this->address = $address;
    }

    function getLongName() {
        return $this->longName;
    }

    function getProjectManager() {
        return $this->projectManager;
    }

    function setLongName($longName) {
        $this->longName = $longName;
    }

    function setProjectManager($projectManager) {
        $this->projectManager = $projectManager;
    }

      

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

}
