<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Dao
 *
 * @author TOMMY-MIS
 */
class Gl_Box_Dao {

    public static function getAllShiftTypes() {
        /* get all shifttype */
        $shifTypes = NULL;
        $daost = new Gl_Models_Master_ShiftTypeDao();
        $shifTypes = $daost->getAllWOPL();

        $shifTypes = Gl_Box_Tools::toObjectsb("shifttype", $shifTypes, FALSE);
        return $shifTypes;
    }

}
