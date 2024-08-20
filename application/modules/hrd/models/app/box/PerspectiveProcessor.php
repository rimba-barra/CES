<?php

class Hrd_Models_App_Box_PerspectiveProcessor extends Hrd_Models_App_Box_Processor {
	
    public function daoSave($dao, $object) {
        return $dao->save($object);
    }
}

?>