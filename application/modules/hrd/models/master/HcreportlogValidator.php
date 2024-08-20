<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of EmployeeValidator
 *
 * @author MIS
 */
class Hrd_Models_Master_HcreportlogValidator extends Box_Models_App_Validator {
    public function run(Hrd_Models_Master_Hcreportlog $d){
        $msg = "";
        $this->setStatus(TRUE);
        if($d->getIsmark() == 1)
        {
            if($d->getMarkmonth() == '' || $d->getMarkmonth() == '0')
            {
                $msg = "Periode month must be choosen";
                $this->setStatus(FALSE);
            }
            else if($d->getMarkyear() == '' || $d->getMarkyear() == '0')
            {
                $msg = "Periode year must be choosen";
                $this->setStatus(FALSE);
            }
        }        
        
        $this->setMsg($msg);
    }
}

?>
