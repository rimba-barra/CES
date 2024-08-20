<?php

class Cashier_Models_Validator_WriteofflimitValidator extends Cashier_Box_Models_App_Validator {

    public $appRequest;
    public $session;
    public $action;

    public function run(Cashier_Models_Master_Cheque $pl) {
        $msg = "";
        $this->returnId = 0;

        $dao = new Cashier_Models_Master_WriteofflimitDao();
        $name = $dao->codeExist($pl, $this->appRequest);

        $idExist = 0;
        $val = '';
        if ($name) {

            if (count($name[0]) > 0) {
                $idExist = $name[0][0]['cheque_id'];
                $val = $name[0][0]['cheque_no'];
            }
        }

        if ($idExist && ($pl->getId() != $idExist)) {
            $msg = "Cheque " . $val . " already inserted.";
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
