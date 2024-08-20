<?php

/**
 * Description of CustomerDao
 *
 * @author MIS
 */
class Erems_Models_TownplanningImportDao extends Erems_Box_Models_App_AbDao {
    
    
 
    
    public function importexcel($dataimport,$projectId,$ptId,$userId,$overwrite){
        $row = 0;

//        var_dump($dataimport);        die();
       // print_r($cs->getArrayTable());
       // die();
        $type             = $dataimport[0];
        $cluster          = $dataimport[1];
        $block            = strtoupper($dataimport[2]);
        $productcategory  = strtoupper($dataimport[3]);
        $numbers          = $dataimport[4];
        $landsize         = $dataimport[5];
        $kelebihan        = $dataimport[6];
        $buildingsize     = $dataimport[7];
        $floorsize        = $dataimport[8];
        $floor            = $dataimport[9];
        $bedroom          = $dataimport[10];
        $bathroom         = $dataimport[11];
        $electricity      = $dataimport[12];
        $purposes         = $dataimport[13];
        $long             = $dataimport[14];
        $width            = $dataimport[15];
        $side             = $dataimport[16];
 
        $exist = $this->dbTable->SPExecute('sp_unitb_import_read',
                $userId,
                $projectId,
                $ptId,
                $type,
                $cluster,
                $block,
                $productcategory,
                $purposes,
                $side
                );
//        var_dump($exist[0][0]['result']);die();
        
        if ($exist[0][0]['result'] == 0) {
            $msg['data'] = $cluster.' '.$numbers;
            $msg['status'] = 1;
        } else {
            $hasil = $this->dbTable->SPExecute('sp_unitb_import_create',
                $userId,
                $projectId,
                $ptId,
                $type,
                $cluster,
                $block,
                $productcategory,
                $numbers,
                $landsize,
                $kelebihan,
                $buildingsize,
                $floorsize,
                $floor,
                $bedroom,
                $bathroom,
                $electricity,
                $purposes,
                $long,
                $width,
                $side,
                $overwrite
                );
        
            if ($hasil[0][0]['result'] > 0) {
                $msg['status'] = 0;
            }
        } 
                
        
        return $msg;
        
    }
     
}

?>
