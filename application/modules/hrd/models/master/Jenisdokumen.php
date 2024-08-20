<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Jenisdokumen
 *
 * @author MIS
 */
class Hrd_Models_Master_Jenisdokumen extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {

    private $index_no;
    private $code;
    private $description;

    /*
      public function __construct() {
      parent::__construct();
      $this->embedPrefix = "position_";
      }
     */

    public function __construct($prefix = NULL) {
        parent::__construct();
        $this->embedPrefix = $prefix ? $prefix : "jenisdokumen_";
    }
    function setIndex_no($index_no) {
        $this->index_no = intval($index_no);
    }

    function setCode($code) {
        $this->code = $code;
    }

    function setDescription($description) {
        $this->description = $description;
    }
    
    function getIndex_no() {
        return intval($this->index_no);
    }

    
    function getCode() {
        return $this->code;
    }

    function getDescription() {
        return $this->description;
    }

    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x['jenisdocument_id'])) {
            $this->setId($x['jenisdocument_id']);
        }
        if (isset($x['index_no'])) {
            $this->setIndex_no(intval($x['index_no']));
        }
        if (isset($x['code'])) {
            $this->setCode($x['code']);
        }
        if (isset($x['description'])) {
            $this->setDescription($x['description']);
        }

        unset($x);
    }

    public function getArrayTable() {
        $x = array(
            'jenisdocument_id' => $this->getId(),
            'index_no' => intval($this->getIndex_no()),
            'code' => $this->getCode(),
            'description' => $this->getDescription(),
        );

        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
    }

    public function grouped() {
        return array();
    }

}

?>
