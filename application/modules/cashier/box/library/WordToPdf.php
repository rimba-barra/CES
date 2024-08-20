<?php

/**
 * Description of MyWordParser
 *
 * @author MIS
 */
class Erems_Box_Library_WordToPdf {

    private $srcFolder;
    private $dstFolder;
    private $data;
    
    

    public function __construct() {

    }
    
    public function convert($input){
        $thisPath = dirname(__FILE__);
        $rootPath = str_replace("application\\modules\\erems\box\\library","",$thisPath);
        $rootPath = $rootPath."\\";
        $publicfolder = $rootPath."public\\";
        $input = str_replace('/', '\\', $publicfolder.$input );
        $output = $rootPath."public\\app\\erems\\print";
        $command  = $rootPath."application\\modules\\erems\\box\\library\\converttopdf\\convertToPdf.bat ".$input." ".$output;
        if(exec($command)){
            return true;
        }else{
            return false;
        }
      
    }
    
}

?>
