<?php
/**
 * Description of WingedController
 *
 * @author MIS
 */
abstract class Box_Models_App_Hermes_WingedController extends Box_Models_App_Hermes_AbstractController {
    
    
    public function mainCreate(){
        
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setDao($this->getMainDao());
        $dm->setValidator($this->getMainValidator());
        $dm->setObject($this->getMainObject());
       
        return $dm;
    }
    
    
    public function mainDelete(){
        $dm = new Box_Models_App_Hermes_DataModel();
        $dm->setObject($this->getMainObject());
        $dm->setDao($this->getMainDao());
        $dm->setIdProperty($this->getMainFieldID());
        return $dm;
    }
    
    public function deleteRead(){
        $dm = new Box_Models_App_Hermes_DataModel();
        
        $dm->setDirectResult(TRUE);
        $dm->setRequiredDataList(FALSE);
        $dm->setRequiredModel(FALSE);
        
        $creator = new Box_Models_App_Creator();
        
        $success = FALSE;

        $dao = $this->getMainDao();
      
        $params = $this->getAppData();
        
        $de = new Box_Delien_DelimiterEnhancer();
        $decan = new Box_Models_App_Decan(array(intval($params['id'])));
        $de->setDelimiterCandidate($decan);
        $de->generate();
        
        $success = $dao->directDelete($decan,$this->getAppSession());
        
        
        
        
        $otherAT = array(array(
                "SUCCESS"=>$success
        ));

        $dm->setHasil(array($otherAT));
        
        return $dm;
    }
    
    protected function getDefaultProcessor() {
        return new Hrd_Models_App_Box_Processor();
    }
    
    abstract protected function getMainDao();
    
    abstract protected function getMainObject();
    
    abstract protected function getMainValidator();
    
    /*@return string*/
    abstract protected function getMainFieldID();
    
}

?>
