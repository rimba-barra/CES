<?php

/**
 * Description of StatusChangeProcessor
 *
 * @author MIS
 */
class Hrd_Models_App_Box_StatusChangeProcessor extends Hrd_Models_App_Box_Processor {
    protected function afterFillData($object) {
        
        $data = $this->getData();
        
        /// fill new status information
        $ns = new Hrd_Models_Master_StatusInformation();
        $at = $ns->getArrayTable();
      
        foreach($at as $k=>$v){
            
            $key = 'new'.$ns->getEmbedPrefix().''.$k;
     
            if(array_key_exists($key,$data)){
                $at[$k] = $data[$key];
            }
        }
       
        $ns->setArrayTable($at);
        if($object instanceof Hrd_Models_Statuschange_StatusChange){
            $object->setNewStatus($ns);
        }
        
        return $object;
    }

}

?>
