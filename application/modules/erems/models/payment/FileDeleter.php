<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of FileDeleter
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Payment_FileDeleter {

    public static function run($projectId, $ptId,$folder="/pdf/kwitansipayment/") {
     //   $path = APPLICATION_PATH . '/../public/app/erems/uploads/pdf/kwitansipayment/';
        $path = APPLICATION_PATH . '/../public/app/erems/uploads'.$folder;
        $files = scandir($path);
        if (count($files) > 0) {
            foreach ($files as $file) {
                $filename = $path . "" . $file;
                
                if (file_exists($filename)) {

                    if (date('Ymd') != date('Ymd', filemtime($filename))) {
                        if (strpos($filename, '.pdf') !== false) {
                            unlink($filename);
                        }
                    } else {
                        
                    }
                }
            }
        }
    }

}
