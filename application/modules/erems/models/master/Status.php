<?php
/**
 * Description of Status
 *
 * @author MIS
 */
class Erems_Models_Master_Status{
    private $name;
    private $date;
    private $note;
    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getDate() {
        return $this->date;
    }

    public function setDate($date) {
        $this->date = $date;
    }

    public function getNote() {
        return $this->note;
    }

    public function setNote($note) {
        $this->note = $note;
    }


}

?>
