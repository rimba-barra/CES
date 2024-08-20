<?php

class Cashier_Models_Transaction_PrintPdfSelector {

    public static function getLib($projectId, $ptId) {
        
        $project_pt = $projectId.'pt'.$ptId;
        $fileTemplate = APPLICATION_PATH . '/modules/cashier/models/library/'.$project_pt.'/'.$project_pt.'.php';
        
        if(!file_exists($fileTemplate)) {
            //jika file  project belum ada
            $pdf = new Cashier_Models_Library_TemplatepaymentPdf();
        }
        else {
          
            $className = 'Cashier_Models_Library_'.$project_pt.'_'.$project_pt;
            
            if(class_exists($className)){
                $object = new $className();
                $pdf = $object;
                
            } 
            else {   
                //jika class not declare
                $pdf = new Cashier_Models_Library_TemplatepaymentPdf();
            }
        }
        return $pdf;
    }

}
