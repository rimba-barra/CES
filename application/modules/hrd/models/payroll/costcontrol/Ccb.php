<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Ccb
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Payroll_Costcontrol_Ccb extends Hrd_Models_Payroll_Costcontrol_CostControl{
    public function __construct() {
        parent::__construct("ccb_");
        $this->setParent(0);
        $this->setTipe(2);
    }
}
