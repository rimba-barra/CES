<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Ccc
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Payroll_Costcontrol_Ccc extends Hrd_Models_Payroll_Costcontrol_CostControl{
    public function __construct() {
        parent::__construct("ccc_");
        $this->setParent(0);
        $this->setTipe(3);
    }
}
