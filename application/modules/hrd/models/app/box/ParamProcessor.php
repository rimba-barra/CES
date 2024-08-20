<?php

/**
 * Description of ParamProcessor
 *
 * @author MIS
 */
class Hrd_Models_App_Box_ParamProcessor extends Hrd_Models_App_Box_Processor  {
    public function daoProses($dao, $object, $modeCreate) {
        
        switch($modeCreate){
            case "updatevariable":
                $object->toDetail(); /// add all variable to one array
                Hrd_Models_App_Tools::enchantDelimiter($object);
                return $dao->updateParameter($object);
                break;
           
        }
    }
}

?>
