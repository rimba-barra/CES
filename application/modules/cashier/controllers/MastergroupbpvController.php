<?php

require_once dirname(__DIR__) . '../library/apli/ApliCashierController.php';

class Cashier_MastergroupbpvController extends ApliCashierController {
    
     public function init() {

        //DECLARE CLASS MODEL AND OBJECT & VALIDATOR, COMMENT VALIDATOR IF DONT WANT USE VALIDATOR FILE
        $dao = new Cashier_Models_Dao_MasterprefixDao();
        $object = new Cashier_Models_Master_Prefix();
        $primary_key = "prefix_id";
        
        //VALIDATOR, IF DONT USE VALIDATOR COMMENT THIS
        $validator = new Cashier_Models_Validator_DefaultValidator();
        $this->setValidator($validator);
        $unique_column_table = "prefix";
        $validator->setObject($object);
        $validator->controller = $this;
        $validator->setUnique($unique_column_table);
        $validator->setPrimarykey($primary_key);

        //FILL
        $this->setDao(new $dao);
        $this->setObject($object);
        $this->setModel("prefix"); //hanya 1 main model utama
        $this->setSubmodel(array("pt","project")); //harus array
        $this->setSubarray(array("deletedRows")); //harus array
        $this->setPropertyId($primary_key); //property id, primary key table
    }

    

    public function detailRead() {

        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $dao = $this->getDao();
        $userHasil = $dao->getCustomRead('user', $request, $session);
        $projectHasil = $dao->getCustomRead('project', $request, $session);
        $userModel = Apli::generateExtJSModelDirect('user');
        $projectModel = Apli::generateExtJSModelDirect('project');

        return array(
            "data" => array(
                "user" => array(
                    "model" => $userModel,
                    "data" => $userHasil[0]
                ),
                "project" => array(
                    "model" => $projectModel,
                    "data" => $projectHasil[0]
                ),
                "ptid" => $session->getPt()->getId()
            ),
        );
    }

   
}
