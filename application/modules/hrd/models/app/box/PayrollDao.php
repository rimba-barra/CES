<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PayrollDao
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_App_Box_PayrollDao extends Box_Models_App_AbDao{
    public function __construct() {
        $this->dbTable = new Hrd_Models_App_Box_PayrollDb();
     
    }
}
