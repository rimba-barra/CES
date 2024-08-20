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
class Box_Dao {

    public static function getAllShiftTypes($projectId,$ptId) {
        /* get all shifttype */
        $shifTypes = NULL;
        $daost = new Hrd_Models_Master_ShiftTypeDao();
        $stFilter = new Hrd_Models_Master_ShiftType();
        $stFilter->getProject()->setId($projectId);
        $stFilter->getPt()->setId($ptId);
        $shifTypes = $daost->getAllWOPL($stFilter);

        $shifTypes = Box_Tools::toObjectsb("shifttype", $shifTypes, FALSE);
        return $shifTypes;
    }

}
