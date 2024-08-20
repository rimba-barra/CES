<?php

/**
 * Description of StatusSpk
 *
 * @author MIS
 */
class Erems_Models_Spk_StatusSpk extends Erems_Models_Master_Status implements Erems_Box_Kouti_ObjectTable {
    
    public function getArrayTable() {
        $x = array(
            'status'=>$this->getName(),
            'status_note'=>$this->getNote(),
            'status_change_date'=>$this->getDate()
        );
        return $x;
    }

    public function setArrayTable($x) {
        if(isset ($x['status'])){
           $this->setName($x['status']); 
        }
        if(isset ($x['status_note'])){
           $this->setNote($x['status_note']); 
        }
        if(isset ($x['status_change_date'])){
           $this->setDate($x['status_change_date']); 
        }
        unset($x);
    }    
}

?>
