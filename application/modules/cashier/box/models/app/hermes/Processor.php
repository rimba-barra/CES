<?php

/**
 * Description of ConcreateProcessor
 *
 * @author MIS
 */
class Cashier_Box_Models_App_Hermes_Processor {

    private $isDebug;
    protected $session;
    protected $request;
    protected $data;

    public function __construct($testingFlag = NULL) {
        if ($testingFlag != NULL) {
            $this->isDebug = (boolean) $testingFlag;
        }
    }

    public function setIsDebug($testingFlag) {
        $this->isDebug = (boolean) $testingFlag;
    }

    public function getSampleData($sampleName = "read_unit") {
        return $this->isDebug ? $sampleName : "";
    }

    /* READ FUNCTIONS */

    protected function switchModeRead(Cashier_Box_Models_App_Models_ReadWorms $app, Cashier_Box_Models_App_Controller $controller) {
        $modeRead = $app->getModeRead();
        $methodName = $modeRead . "Read";

        if (method_exists($controller, $methodName)) {


            $dataModel = $controller->$methodName();
            $app->registerDataList('pay', $dataModel->getDataList());
            $app->setRequestModel(TRUE);
            $app->prosesDao("pay", $dataModel->getHasil());
        } else {
            $masterKey = $this->isMasterRequest($modeRead);

            if ($masterKey) {
                $masterClass = "Hrd_Models_App_Mastertable_" . $masterKey;
                if (class_exists($masterClass)) {

                    $app->getMasterData(new $masterClass());
                }
            }
        }
    }

    protected function isMasterRequest($modeRead) {
        $master = explode("_", $modeRead);
        if (array_key_exists(1, $master) && $master[0] == "master") {
            $name = "";
            for ($i = 0; $i < count($master); $i++) {
                if ($i > 0) {
                    $name .=ucfirst($master[$i]);
                }
            }
            $master = $name;
        } else {
            $master = FALSE;
        }
        return $master;
    }

    public function getSession() {
        return $this->session;
    }

    public function getRequest() {
        return $this->request;
    }

    public function getData() {
        return $this->data;
    }

    public function doRead(Cashier_Box_Models_App_Hermes_AbstractController $controller) {
        $app = new Cashier_Box_Models_App_Models_ReadWorms($controller, $this->getSampleData());
        $this->session = $app->getSession();
        $this->request = $app->getRequest();
        $this->data = $app->getData();
        $this->switchModeRead($app, $controller);
        $app->run();
    }

    /* added 6 Mei 2014 */

    public function doDelete(Cashier_Box_Models_App_Hermes_AbstractController $controller) {
        $dataModel = NULL;
        $methodName = "mainDelete";
        if (method_exists($controller, $methodName)) {


            $dataModel = $controller->$methodName();
        }
        $app = new Cashier_Box_Models_App_Models_Delete($controller);
        $app->setIdProperty($dataModel->getIdProperty());
        $app->execute($dataModel->getDao());
        $app->run();
    }

    protected function createProcess(Cashier_Box_Models_App_Controller $controller, Cashier_Box_Models_App_Hermes_DataModel $dataModel, Cashier_Box_Models_App_Models_Create $app) {
        $msg = "Invalid Request";
        $success = FALSE;

        $payment = $dataModel->getObject();

        $app->prosesData($payment);

        $validator = $dataModel->getValidator();
        $validator->run($payment);

        if ($validator->getStatus()) {
            
            $this->createDocNumber($payment);


            if ($payment instanceof Cashier_Box_Models_App_Hermes_HasDetail) {
                $appData = $app->getData();
                $detail = $appData[$payment->getIndexArName()];

                foreach ($detail as $row) {
                    $pd = $payment->getDetailObject();
                    $app->prosesDataMini($pd, $row);

                    $payment->addDetailObject($pd);
                }

                $de = new Cashier_Box_Delien_DelimiterEnhancer();
                $de->setDelimiterCandidate($payment);
                $de->generate();
            }



            $dao = $dataModel->getDao();
            $payment->setAddBy($app->getSession()->getUser()->getId());
            $hasil = 0;
            if ($payment->getId() == 0) { /// insert new record
                $methodName = "confCreate";
                if (method_exists($controller, $methodName)) {
                    $controller->$methodName($payment, $app);
                }



                //  $hasil = $dao->save($payment);
            } else { // update current record
                $hasil = $dao->update($payment);
            }

            if ($hasil == 0) {
                $msg = "Something problem when saving your data";
            } else {
                $msg = "SUCCESS";
                $success = TRUE;
            }
        } else {
          
            $msg = $validator->getMsg();
        }

        return array("msg" => $msg, "status" => $success);
    }

    public function doCreate(Cashier_Box_Models_App_Controller $controller) {
        $dataModel = NULL;
        $methodName = "mainCreate";
        if (method_exists($controller, $methodName)) {


            $dataModel = $controller->$methodName();
        }

        $app = new Cashier_Box_Models_App_Models_Create($controller, $this->getSampleData("create_object"));
        $this->data = $app->getData();
        $msg = "Invalid Request";
        $success = FALSE;
        if ($dataModel instanceof Cashier_Box_Models_App_Hermes_DataModel) {
            $hasil = $this->createProcess($controller, $dataModel, $app);
            $msg = $hasil["msg"];
            $success = $hasil["status"];
        }

        $app->setMsg($msg);
        $app->setSuccess($success);


        $app->run();
    }

    protected function createDocNumber($payment) {
      
        if ($payment instanceof Cashier_Box_Models_App_Hermes_Nomorable) {
            $payment->setNomor(Cashier_Box_Models_App_DocPrefixGenerator::get($payment->getPrefixNumber()));
        }
    }

    /* end READ FUNCTIONS */
}

?>
