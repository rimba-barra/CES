<?php

class Cashier_Models_Validator_MastercoaValidator extends Cashier_Box_Models_App_Validator {

    public $appRequest;
    public $session;
    public $action;
    private $object;

    function getObject() {
        return $this->object;
    }

    function setObject($object) {
        $this->object = $object;
    }

    public function run($pl) {
        $msg = "";
        $this->returnId = 0;
        $dao = $this->controller->getDao();
        $name = $dao->codeExist($pl, $this->appRequest);
        $idExist = 0;
        $val = '';
        $val2 = '';
        $val3 = '';
        if ($name) {

            if (count($name[0]) > 0) {
                $idExist = $name[0][0]['documentnumber_id'];
                $val = $name[0][0]['module_name'];
                $val2 = $name[0][0]['year'];
                $val3 = $name[0][0]['month'];
            }
        }

        if ($idExist && ($pl->getId() != $idExist)) {
            $msg = "Prefix Format " . $val . " | Periode " . $val2 . "/" . $val3 . "  already inserted.";
        } else {

            if ($this->action == 'update') {
                $update = $dao->update($pl, $this->appRequest);
            } else {
                $update = $dao->save($pl, $this->appRequest);
            }


            if ($update) {
                $msg = "SUCCESS";
                $this->setReturnId($update);
                $this->setStatus(TRUE);
            } else {
                $msg = "Unable to proccess data.";
            }
        }

        $this->setMsg($msg);
    }

}
