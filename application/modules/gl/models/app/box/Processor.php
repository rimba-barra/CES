<?php

/**
 * Description of Processor
 *
 * @author MIS
 */
class Gl_Models_App_Box_Processor extends Gl_Box_Models_App_Hermes_Processor {

    protected $validationStorage;

    /* added 22 Oct 2015 */
    protected $frontDetailFill;  /// set this true to fill detail before validation

    protected function createProcess(Gl_Box_Models_App_Controller $controller, Gl_Box_Models_App_Hermes_DataModel $dataModel, Gl_Box_Models_App_Models_Create $app) {
        $msg = "Invalid Request";
        $success = FALSE;


        $payment = $dataModel->getObject();


        $app->prosesData($payment);

        /* added 8 December 2014 */
        if ($payment instanceof Gl_Box_Models_Master_InterProjectPt) {
            $payment->setProject($app->getSession()->getProject());
            $payment->setPt($app->getSession()->getPt());
        }
        
        
        /* added 22 Oct 2015 */
        
        if ($this->frontDetailFill) {
            if ($payment instanceof Gl_Box_Models_App_Hermes_HasDetail) {
             
                $appData = $app->getData();

                $detail = $appData[$payment->getIndexArName()];

                foreach ($detail as $row) {
                  
                    $pd = $payment->getDetailObject();
                    $app->prosesDataMini($pd, $row);

                    $payment->addDetailObject($pd);
                }

                $de = new Gl_Box_Delien_DelimiterEnhancer();
                $de->setDelimiterCandidate($payment);
                $de->generate();
                
               
            }
            
          
        }



        $payment = $this->afterFillData($payment);

        $validator = $dataModel->getValidator();
        $validator->run($payment);

        $this->validationStorage = $validator->getStorage();


        


        if ($validator->getStatus()) {



            /*  Added 2 Oct 2014
             *  Run override method after validation
             */

            $payment = $this->afterValidation($payment);

            /**/


            if ($payment instanceof Gl_Box_Models_App_Hermes_Nomorable) {
                $payment->setNomor(Gl_Box_Models_App_DocPrefixGenerator::get($payment->getPrefixNumber()));
            }

            /* modified 22 Oct 2015 */
            /* isi detail jika belum isi detail sebelum validasi */
            if (!$this->frontDetailFill) {
                if ($payment instanceof Gl_Box_Models_App_Hermes_HasDetail) {
                    $appData = $app->getData();

                    $detail = $appData[$payment->getIndexArName()];

                    foreach ($detail as $row) {
                        $pd = $payment->getDetailObject();
                        $app->prosesDataMini($pd, $row);

                        $payment->addDetailObject($pd);
                    }

                    $de = new Gl_Box_Delien_DelimiterEnhancer();
                    $de->setDelimiterCandidate($payment);
                    $de->generate();
                }
            }


            /* added 22 April 2014 */
            if ($payment instanceof Gl_Box_Models_App_Hermes_HasRelation) {
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
                            $de = new Gl_Box_Delien_DelimiterEnhancer();
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
                if ($payment instanceof Gl_Box_Models_Master_InterProjectPt) {
                    $payment->setProject($app->getSession()->getProject());
                    $payment->setPt($app->getSession()->getPt());
                }
                if ($app instanceof Gl_Box_Models_App_Models_CreateExt) {
                    if ($app->getModeCreate()) {
                        $hasil = $this->daoProses($dao, $payment, $app->getModeCreate());
                    } else {
                        // $hasil = $dao->save($payment);
                        /* updated 1 oct 2014 */
                        $hasil = $this->daoSave($dao, $payment);
                    }
                }
            } else { // update current record
                if ($app instanceof Gl_Box_Models_App_Models_CreateExt) {
                    if ($app->getModeCreate()) {
                        $hasil = $this->daoProses($dao, $payment, $app->getModeCreate());
                    } else {
                        /* updated 1 oct 2014 */
                        $hasil = $this->daoUpdate($dao, $payment);
                        // $hasil = $dao->update($payment);
                    }
                }
            }



            if ($hasil == 0) {
                $msg = "[BPRERR01]Something problem when saving your data";
            } else {
                $msg = "SUCCESS";
                $success = TRUE;
            }
        } else {
            $msg = $validator->getMsg();
        }

        return array("msg" => $msg, "status" => $success);
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

    public function doRead(Gl_Box_Models_App_Hermes_AbstractController $controller) {
        //  $app = new Gl_Models_App_Box_HrdReadWorms($controller, $this->getSampleData());
        $app = $this->getReadModel($controller, $this->getSampleData());
        $this->session = $app->getSession();
        $this->request = $app->getRequest();
        $this->data = $app->getData();
        $this->switchModeRead($app, $controller);
        $app->run();
    }

    /* edited 14 Agustus 2014 */

    protected function switchModeRead(Gl_Box_Models_App_Models_ReadWorms $app, Gl_Box_Models_App_Controller $controller) {
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
                $masterClass = "Gl_Models_App_Mastertable_" . $masterKey;
                if (class_exists($masterClass)) {

                    $app->getMasterData(new $masterClass());
                }
            }
        }
    }

    /* ORIGINAL PROCESS */

    public function doCreate(Gl_Box_Models_App_Controller $controller) {

        $dataModel = NULL;

        $methodName = "mainCreate";

        //$modeName = "";


        $app = new Gl_Box_Models_App_Models_CreateExt($controller, $this->getSampleData("create_object"));
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





        //$app = new Gl_Box_Models_App_Models_Create($controller, $this->getSampleData("create_object"));



        $msg = "Invalid Request";
        $success = FALSE;
        if ($dataModel instanceof Gl_Box_Models_App_Hermes_DataModel) {
            if ($dataModel->getUseProcess()) {
                $hasil = $this->createProcess($controller, $dataModel, $app);
            } else {
                $hasil = $dataModel->getHasil();
            }


            $msg = $hasil["msg"];
            $success = $hasil["status"];
        }



        $app->setMsg($msg);
        $app->setSuccess($success);
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
        //   return new Gl_Box_Models_App_Models_ReadWorms($controller,$debugSampleData);

        return new Gl_Models_App_Box_GlReadWorms($controller, $debugSampleData);
    }

}

?>
