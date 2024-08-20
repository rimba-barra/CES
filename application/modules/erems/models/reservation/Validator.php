<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Validator
 *
 * @author David-MIS
 */
class Erems_Models_Reservation_Validator extends Erems_Box_Models_App_Validator {

   public function setSession(Erems_Box_Models_App_Session $ses){
        $this->session = $ses;
   }

   public function run(Erems_Models_Reservation_Reservation $pl){
        $msg = "";
        
        $dao = new Erems_Models_Reservation_Dao();

        if($pl->getUnitId()==0){
            $msg = "Invalid Unit";
        }else if(!$this->checkIsAValidDate($pl->getReservationDate())){
            $msg = "Invalid date";
        }else if(!$this->checkIsAValidDate($pl->getReservationDateUntil())){
            $msg = "Invalid date until";
        }else if(strlen($pl->getCustomerName()) < 3){
            $msg = "Customer Name minimun 3 charaters";
        }else{
            $this->setStatus(TRUE);
        }
        $this->setMsg($msg);
    }

    private function checkIsAValidDate($myDateString){
        return (bool)strtotime($myDateString);
    }

}
