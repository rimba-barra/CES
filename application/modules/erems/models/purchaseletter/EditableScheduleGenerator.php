<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of EditableScheduleGenerator
 *
 * @author MIS
 */
class Erems_Models_Purchaseletter_EditableScheduleGenerator extends Erems_Models_Purchaseletter_ScheduleGenerator {
    private $editedSchedules;
    
    
    
    protected function buildRow(Erems_Models_Sales_Rule $rule, $scheduleTypeId) {
        if (!is_array($this->result))
            $this->result = array();
      
      
        
        for ($i = 0; $i < $rule->getQuantity(); $i++) {
            $this->count++;
            $sch = new Erems_Models_Purchaseletter_Schedule();
            $sch->setId(0);
           
            $sch->setDueDate($this->getDueDate($this->count));
            $sch->setScheduleTypeId($scheduleTypeId);
         //   $sch->setAmount($rule->getAmount() / $rule->getQuantity());
            $sch->setAmount($this->getAmountFromList($i + 1, $scheduleTypeId));
            $sch->setTermin($i + 1);
            $this->result[] = $sch;
            unset($sch);
        }
        
        
    }
    
    /* get amount from list schedule */
    private function getAmountFromList($termin,$scheduleTypeId){
        $amount = 0;
        foreach($this->editedSchedules as $sch){
            if($this->getScheduleTypeId($sch["scheduletype_scheduletype"])==$scheduleTypeId && $termin== $sch["termin"]){
                $amount = $sch["amount"];
            }
        }
        return $amount;
    }
    
    private function getScheduleTypeId($stName){
        if($stName=="TJ"){
            return Erems_Box_Config::SCHTYPE_TANDAJADI;
        }else if($stName=="UM"){
            return Erems_Box_Config::SCHTYPE_UANGMUKA;
        }else{
            return $this->priceTypeId;
        }
    }


    public function getEditedSchedules() {
        return $this->editedSchedules;
    }

    public function setEditedSchedules($editedSchedules) {
        $this->editedSchedules = $editedSchedules;
    }


}

?>
