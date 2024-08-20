<?php

/**
 * Description of ClusterTran
 *
 * @author MIS
 */
class Cashier_Models_Master_Currency extends Cashier_Box_Models_ObjectEmbedData {

    private $currency_id;
    private $currency_name;
    private $description;


    public function __construct() {
        parent::__construct();
        $this->embedPrefix = 'currency_';
    }
    function getCurrency_id() {
        return $this->currency_id;
    }

    function getCurrency_name() {
        return $this->currency_name;
    }

    function getDescription() {
        return $this->description;
    }

    function setCurrency_id($currency_id) {
        $this->currency_id = $currency_id;
    }

    function setCurrency_name($currency_name) {
        $this->currency_name = $currency_name;
    }

    function setDescription($description) {
        $this->description = $description;
    }

            public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray == NULL ? $this->arrayTable : $dataArray;
        if (isset($x['currency_id'])) { $this->setCurrency_id($x['currency_id']); }
        if (isset($x['currency_name'])) { $this->setCurrency_name($x['currency_name']); }
        if (isset($x['description'])) { $this->setDescription($x['description']); }

        unset($x);
    }

    public function getArrayTable() {


        $x = array(
            'currency_id' => $this->getCurrency_id(),
            'currency_name' => $this->getCurrency_name(),
            'description' => mb_convert_encoding($this->getDescription(),'HTML-ENTITIES','utf-8'),

        );

        return $x;
    }

    public function fillData($data) {
        $this->setArrayTable($data);
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
