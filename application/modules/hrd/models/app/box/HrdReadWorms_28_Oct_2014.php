<?php

/**
 * Description of HrdReadWorms
 *
 * @author MIS
 */
class Hrd_Models_App_Box_HrdReadWorms extends Box_Models_App_Models_ReadWorms {
    
    public function __construct($controller, $debug = '') {
        parent::__construct($controller, $debug);
    }
    
    public function prosesObjects($name, $dataDao) {


        if (key_exists($name, $this->dataList)) {
            $row = 0;
            $x = array();
            if (count($dataDao) > 0) {
               
                foreach ($dataDao as $row) {
                    
                    $x[] = $row->getArrayEmbed();
                }
                $row = count($dataDao);
            }

            $this->hasil->setTotalRow($row);
            $this->hasil->setData($x);
            if($this->requestModel){
                $this->hasil->setModel($this->generateExtJSMOdel());
            }
            
        }
    }
   
    
}

?>
