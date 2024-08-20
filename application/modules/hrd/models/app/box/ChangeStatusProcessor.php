<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ChangeStatusProcessor
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_App_Box_ChangeStatusProcessor extends Hrd_Models_App_Box_Processor {

    public function afterValidation($object) {

        $daoEm = new Hrd_Models_Master_EmployeeDao();
        $em = new Hrd_Models_Master_Employee();
        $em->setId($object->getEmployee()->getId());
        $hasilEm = $daoEm->getDetail($em);
        $hasilEm = Box_Tools::toObjectsb("employeeb", $hasilEm, TRUE);
        $ses = $this->getSession();

        if ($object instanceof Hrd_Models_Changestatus_Changestatus) {
            if ($object->getType() == Box_Config::CHANGESTATUSTYPE_PROMOSI) {
            
                $object->getOldGroup()->setId($hasilEm->getGroup()->getId());
                $object->getOldPosition()->setId($hasilEm->getPosition()->getId());

                //  var_dump($hasilEm);
            } else if ($object->getType() == Box_Config::CHANGESTATUSTYPE_ROTASI) {

                $object->getOldDepartment()->setId($hasilEm->getDepartment()->getId());
                $object->getOldPosition()->setId($hasilEm->getPosition()->getId());
                $object->getOldDivision()->setId($hasilEm->getDivision()->getId());
            } else if ($object->getType() == Box_Config::CHANGESTATUSTYPE_MUTASI) {
                $object->getOldProject()->setId($ses->getProject()->getId());
                $object->getOldDepartment()->setId($hasilEm->getDepartment()->getId());
                $object->getOldPosition()->setId($hasilEm->getPosition()->getId());
                $object->getOldGroup()->setId($hasilEm->getGroup()->getId());
            }
        }
        return $object;
    }

}
