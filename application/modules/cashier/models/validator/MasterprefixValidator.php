<?php

class Cashier_Models_Validator_MasterprefixValidator extends Cashier_Box_Models_App_Validator {

    public $appRequest;
    public $session;
    public $action;

    public function run(Cashier_Models_Master_Documentnumber $pl) {
        $msg = "";
        $this->returnId = 0;

        $dao = new Cashier_Models_Master_DocumentnumberDao();
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
