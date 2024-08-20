<?php

class Erems_Models_Reward_RewardValidator extends Erems_Box_Models_App_Validator {

    public function run(Erems_Models_Reward_Reward $hs) {
        $msg = "";




        if (strlen($hs->getCode()) < 3) {
            $msg = "Code minimal 3 karakter";
        } else if (intval($hs->getGroup_id()) < 0) {
            $msg = "Group Reward tidak valid";
        } else {
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }

}
