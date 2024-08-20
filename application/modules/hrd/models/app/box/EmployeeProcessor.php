<?php

/**
 * Description of EmployeeProcessor
 *
 * @author MIS
 */
class Hrd_Models_App_Box_EmployeeProcessor extends Hrd_Models_App_Box_Processor {

    protected function afterFillData($object) {

        $this->checkRelation($object);

        return $object;
    }

    private function checkRelation(Hrd_Models_Master_EmployeePersonal $em) {

        if ($em->getSpouse()->getName()) {

            $em->addRelation($em->getSpouse());
        }
        if ($em->getFather()->getName()) {
            $em->addRelation($em->getFather());
        }
        if ($em->getMother()->getName()) {
            $em->addRelation($em->getMother());
        }
    }
    
    
    public function daoSave_old($dao, $object) {
        $save = $dao->save($object);
        
 
        
        $isDebug = FALSE;
        $intranet = new Hrd_Models_Intranet_Intranet();
        $intranet->userAdmin = $object->getAddBy();
        $intranet->projectId = $this->getSession()->getProject()->getId();
        $intranet->run($object);
        
      
        if($isDebug){
            var_dump($intranet->errorMsg);
        }
        
        return $save;
    }
 
    /* edited by ahmad riadi 02-10-2017 */
    public function daoSave($dao, $object) {
        $save = $dao->save($object);                
        $isDebug = FALSE;
        $uacdefault = new Hrd_Models_Intranet_Employee();
        $uacdefault->Authorizeuser(intval($object->getId()));
        if ($isDebug) {
            var_dump($uacdefault->errorMsg);
        }      
        return $save;
    }	


    /* edited by ahmad riadi 29-09-2017 */	

     public function daoUpdate($dao, $object) {
        $isDebug = FALSE;
        $uacdefault = new Hrd_Models_Intranet_Employee();
        $uacdefault->Authorizeuser(intval($object->getId()));
        if ($isDebug) {
            var_dump($uacdefault->errorMsg);
        }
        return $dao->update($object);
    }	
    
    

    public function daoUpdate_old($dao, $object) {
        $isDebug = FALSE;
        $intranet = new Hrd_Models_Intranet_Intranet();
        $intranet->userAdmin = $object->getAddBy();
        $intranet->projectId = $this->getSession()->getProject()->getId();
        $intranet->run($object);
        
      
        if($isDebug){
            var_dump($intranet->errorMsg);
        }

        //die();
        return $dao->update($object);
    }


}

?>
