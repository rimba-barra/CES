<?php

/**
 * Description of CreateExt
 * Enable switch mode create 
 * @author MIS
 */
class Master_Box_Models_App_Models_CreateExt extends Master_Box_Models_App_Models_Create {

    private static $REQUEST_MODE = "mode_create";
    private $modeCreate;
    private $isExt;

    public function __construct($controller, $debug = '') {
        parent::__construct($controller, $debug);
        $this->prosesModeCreate();
        
    }
    
   

    private function prosesModeCreate() {
        $data = parent::getData();
        if ($data) {
            if (array_key_exists(self::$REQUEST_MODE, $data)) {
                $this->modeCreate = $data[self::$REQUEST_MODE];
                $this->isExt = TRUE;
            }
        }
    }
   
    public function getData() {
        $d = parent::getData();
        if($this->isExt){
            if(array_key_exists("data", $d)){
               $d = $d["data"]; 
            }else{
                throw new Exception("Index 'data' is not provided in json request statement");
            }
            
        }
        return $d;
        
    }

   

    public function getModeCreate() {
        return $this->modeCreate;
    }

}

?>
