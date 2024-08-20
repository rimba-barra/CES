<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ModuleTools
 *
 * @author TOMMY-MIS
 */
class Gl_Box_ModuleTools {

    public static function lamaKerja(Hrd_Models_Master_Employee $em,$date) {


        $datetime1 = new DateTime($em->getHireDate());

        $datetime2 = new DateTime($date ? $date : date("Y-m-d"));
        $interval = $datetime1->diff($datetime2);
        // return (int)$interval->format('%a');
        return array(
            "y"=>$interval->y,
            "m"=>$interval->m,
            "d"=>$interval->d
        );
    }

}
