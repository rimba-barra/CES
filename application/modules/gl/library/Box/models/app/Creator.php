<?php

/**
 * Description of Creator
 *
 * @author MIS
 */
class Gl_Box_Models_App_Creator {
    public function create($className="",$params=""){
        switch($className){          
            case 'assetdata': // harus sama dengan yang di model, di asset
                return new Gl_Models_Asset_Asset();
                break;
            
            default:
                return NULL;
               break;
        }
    }
}

?>
