<?php

require_once dirname(__DIR__) . '../library/apli/ApliCashierController.php';

class Cashier_MastercoaController extends ApliCashierController {

    public function init() {

        //DECLARE CLASS MODEL AND OBJECT & VALIDATOR, COMMENT VALIDATOR IF DONT WANT USE VALIDATOR FILE
        $dao = new Cashier_Models_Dao_MastercoaDao();
        $object = new Cashier_Models_Master_Coa();
        $primary_key = "coa_id";
        
        //VALIDATOR, IF DONT USE VALIDATOR COMMENT THIS
        $validator = new Cashier_Models_Validator_DefaultValidator();
        $this->setValidator($validator);
        $unique_column_table = "coa";
        $validator->setObject($object);
        $validator->controller = $this;
        $validator->setUnique($unique_column_table);
        $validator->setPrimarykey($primary_key);

        //FILL
        $this->setDao(new $dao);
        $this->setObject($object);
        $this->setModel("coa"); //hanya 1 main model utama
        $this->setSubmodel(array("kelsub", "pt","project")); //harus array
        $this->setSubarray(array("deletedRows")); //harus array
        $this->setPropertyId($primary_key); //property id, primary key table
    }

}
