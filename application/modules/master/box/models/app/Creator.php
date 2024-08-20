<?php

/**
 * Description of Creator
 *
 * @author MIS
 */
class Master_Box_Models_App_Creator {

    public function create($className = "", $params = "") {
        switch ($className) {
            case 'city':
                return new Master_Models_Master_City();
                break;
             case 'citytype':
                return new Master_Models_Master_Citytype();
                break;
             case 'cluster':
                return new Cashier_Models_Master_Cluster();
                break;
            case 'country':
                return new Master_Models_Master_Country();
                break;
            case 'project':
                return new Master_Box_Models_Master_Project();
                break;
            case 'pt':
                return new Master_Box_Models_Master_Pt();
                break;
            case 'provinsi':
                return new Master_Models_Master_Provinsi();
                break;
            default:
                return NULL;
                break;
        }
    }

}

?>
