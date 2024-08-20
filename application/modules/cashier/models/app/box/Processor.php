<?php

/**
 * Description of Processor
 *
 * @author MIS
 */
class Cashier_Models_App_Box_Processor extends Cashier_Box_Models_App_Hermes_Processor {

    protected function createProcess(Cashier_Box_Models_App_Controller $controller, Cashier_Box_Models_App_Hermes_DataModel $dataModel, Cashier_Box_Models_App_Models_Create $app) {
        $msg = "Invalid Request";
        $success = FALSE;


        $payment = $dataModel->getObject();


        $app->prosesData($payment);



        $payment = $this->afterFillData($payment);

        

        $validator = $dataModel->getValidator();
        $validator->run($payment);

        $others = NULL;

        

        if ($validator->getStatus()) {



            /*  Added 2 Oct 2014
             *  Run override method after validation
             */

            $payment = $this->afterValidation($payment);

            /**/


          /*  if ($payment instanceof Cashier_Box_Models_App_Hermes_Nomorable) {
                $payment->setNomor(Cashier_Box_Models_App_DocPrefixGenerator::get($payment->getPrefixNumber()));
            }
           
           */
            
            $this->createDocNumber($payment);

          
            
            
            if ($payment instanceof Cashier_Box_Models_App_Hermes_HasDetail) {
                $appData = $app->getData();

                $detail = $appData[$payment->getIndexArName()];
                if (is_array($detail)) {
                    foreach ($detail as $row) {
                        $pd = $payment->getDetailObject();
                        $app->prosesDataMini($pd, $row);

                        $payment->addDetailObject($pd);
                    }
                }


                $de = new Cashier_Box_Delien_DelimiterEnhancer();
                $de->setDelimiterCandidate($payment);
                $de->generate();
            }

            /* added 18 February 2015 */
            /* automate add delimitered string for deleted detail */
            if ($payment instanceof Cashier_Box_Models_App_Hermes_DestroyedDetail) {
                $data = $app->getData();
                $f = $payment->getDeletedFieldName();
                if (key_exists($f, $data)) {
                    $de = new Cashier_Box_Delien_DelimiterEnhancer();
                    $decan = new Cashier_Box_Models_App_Decan(explode(",", $data[$f]));
                    $de->setDelimiterCandidate($decan);
                    $de->generate();
                    $payment->setDeletedDecanString($decan->getString());
                }
            }

            /* added 22 April 2014 */
            if ($payment instanceof Cashier_Box_Models_App_Hermes_HasRelation) {
                $appData = $app->getData();

                foreach ($payment->getIndexNames() as $index) {

                    if (array_key_exists($index, $appData)) {

                        $detail = (array) $appData[$index];
                        if (count($detail) > 0) {

                            foreach ($detail as $row) {
                                $pd = $payment->getRelationObject($index);
                                $pd->setArrayTable($row);

                                $payment->addRelationObject($pd, $index);
                            }
                            $payment->setSelectedRelation($index);
                            $de = new Cashier_Box_Delien_DelimiterEnhancer();
                            $de->setDelimiterCandidate($payment);
                            $de->generate();
                        }
                    }
                }
            }

            $payment->setAddBy($app->getSession()->getUser()->getId());

            $dao = $dataModel->getDao();

            $hasil = 0;




            if ($payment->getId() == 0) { /// insert new record
                $methodName = "confCreate";
                if (method_exists($controller, $methodName)) {
                    $controller->$methodName($payment, $app);
                }

                /* added 14 Mei 2014 */
                if ($payment instanceof Cashier_Box_Models_Master_InterProjectPt) {
                    $payment->setProject($app->getSession()->getProject());
                    $payment->setPt($app->getSession()->getPt());
                }
                if ($app instanceof Cashier_Box_Models_App_Models_CreateExt) {
                    if ($app->getModeCreate()) {
                        $hasil = $this->daoProses($dao, $payment, $app->getModeCreate());
                    } else {
                        // $hasil = $dao->save($payment);
                        /* updated 1 oct 2014 */
                        $hasil = $this->daoSave($dao, $payment);
                        if (is_array($hasil)) {
                            $others = $hasil["others"];
                            $hasil = $hasil["status"];
                        }
                    }
                }
            } else { // update current record
                if ($app instanceof Cashier_Box_Models_App_Models_CreateExt) {
                    if ($app->getModeCreate()) {
                        $hasil = $this->daoProses($dao, $payment, $app->getModeCreate());
                    } else {
                        /* updated 1 oct 2014 */
                        //$hasil = $this->daoUpdate($dao, $payment); /// mark 16 Dec
                        $hasil = $this->daoUpdate($dao, $payment); /// add 16 Dec
                        if (is_array($hasil)) {
                            $others = $hasil["others"];
                            $hasil = $hasil["status"];
                        }
                        // $hasil = $dao->update($payment);
                    }
                }
            }



            if ($hasil == 0) {
                $msg = "[BPRERR01]Something problem when saving your data";
            } else {
                $msg = "SUCCESS";
                $success = TRUE;
                $others = $hasil;
            }
        } else {
            
            $msg = $validator->getMsg();
        }

        return array("msg" => $msg, "status" => $success, "others" => $others);
    }

    public function daoProses($dao, $object, $modeCreate) {
        return $dao->save($object);
    }

    public function daoUpdate($dao, $object) {
        return $dao->update($object);
    }

    public function daoSave($dao, $object) {
        return $dao->save($object);
    }

    /* override 14 Agustus 2014 */

    public function doRead(Cashier_Box_Models_App_Hermes_AbstractController $controller) {
        //  $app = new Hrd_Models_App_Cashier_Box_HrdReadWorms($controller, $this->getSampleData());
        $app = $this->getReadModel($controller, $this->getSampleData());
        $this->session = $app->getSession();
        $this->request = $app->getRequest();
        $this->data = $app->getData();
        $this->switchModeRead($app, $controller);
        $app->run();
    }

    /* edited 14 Agustus 2014 */

    protected function switchModeRead(Cashier_Box_Models_App_Models_ReadWorms $app, Cashier_Box_Models_App_Controller $controller) {
        $modeRead = $app->getModeRead();
        $methodName = $modeRead . "Read";

        if (method_exists($controller, $methodName)) {


            $dataModel = $controller->$methodName();
            if ($dataModel->getRequiredDataList()) {
                $app->registerDataList('pay', $dataModel->getDataList());
            }

            if ($dataModel->getRequiredModel()) {
                $app->setRequestModel(TRUE);
            }


            $app->setStoredObject($dataModel->getStoredObject());
            if ($dataModel->getDirectResult()) {
                $app->prosesObjects("pay", $dataModel->getHasil());
            } else {
                $app->prosesDao("pay", $dataModel->getHasil());
            }
        } else {
            $masterKey = $this->isMasterRequest($modeRead);

            if ($masterKey) {
                $masterClass = "Hrd_Models_App_Mastertable_" . $masterKey;
                if (class_exists($masterClass)) {

                    $app->getMasterData(new $masterClass());
                }
            } else {
                // "Request for old controller";
                if ($controller instanceof Cashier_Box_Summoner) {
                    $x = $controller->getOldController($controller->getRequest(), $controller->getResponse());
                    $x->readAction();
                    $controller->getHelper("viewRenderer")->setNoRender(true);
                    die();
                }
            }
        }
    }

    /* ORIGINAL PROCESS */

    public function doCreate(Cashier_Box_Models_App_Controller $controller) {

        $dataModel = NULL;

        $methodName = "mainCreate";

        //$modeName = "";


        $app = new Cashier_Box_Models_App_Models_CreateExt($controller, $this->getSampleData("create_object"));
        /// added 4 juni
        $this->session = $app->getSession();

        $this->app = $app;

        $this->data = $app->getData();

        if ($app->getModeCreate()) {
            $methodName = $app->getModeCreate() . "Create";
            $dataModel = $controller->$methodName();
        } else if (method_exists($controller, $methodName)) {
            $dataModel = $controller->$methodName();
        }





        //$app = new Cashier_Box_Models_App_Models_Create($controller, $this->getSampleData("create_object"));



        $msg = "Invalid Request";
        $success = FALSE;
        $others = NULL;
        if ($dataModel instanceof Cashier_Box_Models_App_Hermes_DataModel) {
            $hasil = $this->createProcess($controller, $dataModel, $app);

            $msg = $hasil["msg"];
            $success = $hasil["status"];

            $others = key_exists("others", $hasil) ? $hasil["others"] : NULL;
        }



        $app->setMsg($msg);
        $app->setSuccess($success);
        $app->setOthers($others);
        $app->run();
    }

    protected function afterFillData($object) {
        return $object;
    }

    protected function afterValidation($object) {
        return $object;
    }

    /* @added 14 Agustus 2014 */

    protected function getReadModel($controller, $debugSampleData) {
        //   return new Cashier_Box_Models_App_Models_ReadWorms($controller,$debugSampleData);

        return new Cashier_Models_App_Box_CashierReadWorms($controller, $debugSampleData);
    }

}

?>
