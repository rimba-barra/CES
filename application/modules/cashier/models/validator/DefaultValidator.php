<?php

class Cashier_Models_Validator_DefaultValidator extends Cashier_Box_Models_App_Validator {

    public $appRequest;
    public $session;
    public $action;

   

        public function run($pl) {
        $msg = "";
        $this->returnId = 0;
        $dao = $this->controller->getDao();
        $name = $dao->codeExist($pl, $this->appRequest, $this->getUnique());
        $idExist = 0;
        $unique_val = "";
        
        if ($name) {
            if (count($name[0]) > 0) {
                $idExist = $name[0][0][$this->getPrimarykey()];
                $unique_val = $name[0][0][$this->getUnique()];
            }
        }
        
    

        if ($idExist && ($pl->getId() != $idExist)) {
            $msg = $this->getUnique(). " " .$unique_val ." already inserted.";
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
