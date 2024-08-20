<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Jenisdokumen
 *
 * @author MIS
 */
class Hrd_Models_Intranet_Configmysql extends Box_Models_ObjectEmbedData implements Box_Kouti_Remora {

    function getConfigdata($config) {      
        $paramconfig = $this->getfileConfig($config);
        if($paramconfig !==0){
           /* start local host */
            $data['host'] = $paramconfig['intranet_host'];
            $data['user'] = $paramconfig['intranet_username'];
            $data['password'] = $paramconfig['intranet_password'];
            $data['port'] = $paramconfig['intranet_port'];
            $data['database_sec'] = $paramconfig['database_sec'];
            $data['database_master'] = $paramconfig['database_master'];
            $data['database'] = $paramconfig['intranet_database'];
        /* end local host */

        /* start intranet test host */
//        $data['host'] = '172.16.10.16';
//        $data['user'] = 'root';
//        $data['password'] = 'sepuluhenambelas';
//        $data['port'] = 3306;
//        $data['database'] = 'dbintranet';
        /* end intranet test host */

        /* start intranet ces host */
//        $data['host'] = '13.76.184.138';
//        $data['user'] = 'cdadmin';
//        $data['password'] = 'w3bd3v.cipdev';
//        $data['port'] = 6715;
//        $data['database'] = 'dbintranet';
        /* end intranet ces host */

        // print_r($data);
            
        }else{
            $data['host'] = null;
            $data['user'] = null;
            $data['password'] = null;
            $data['port'] = null;
            $data['database_sec'] = null;
            $data['database_master'] = null;
            $data['database'] = null;
        }
       
        return $data;
    }

    function getfileConfig($config) {
        $base = substr(getcwd(), 0, -6) . 'application/modules/hrd/configs/' . $config . '.ini'; //get common config
        $checkfile = file_exists($base); //check file exist or not yet
        if ($checkfile > 0) {
            $file_contents = fopen($base, "r"); //read file file .ini
            $dataconfig = array();
            while (!feof($file_contents)) { //loop all text in main.ini
                $line_of_text = fgets($file_contents); //loop one line from file .ini
                /* start db intranet config */
                if (stripos($line_of_text, "dbintranet.host") !== false) {
                    $string = preg_replace('/\s+/', '', $line_of_text); //remove space
                    $dataconfig['intranet_host'] = str_replace("dbintranet.host=", "", $string); //remove text
                }
                if (stripos($line_of_text, "dbintranet.username") !== false) {
                    $string = preg_replace('/\s+/', '', $line_of_text); //remove space
                    $dataconfig['intranet_username'] = str_replace("dbintranet.username=", "", $string); //remove text
                }
                if (stripos($line_of_text, "dbintranet.password") !== false) {
                    $string = preg_replace('/\s+/', '', $line_of_text); //remove space
                    $dataconfig['intranet_password'] = str_replace("dbintranet.password=", "", $string); //remove text
                }
                if (stripos($line_of_text, "dbintranet.dbname") !== false) {
                    $string = preg_replace('/\s+/', '', $line_of_text); //remove space
                    $dataconfig['intranet_database'] = str_replace("dbintranet.dbname=", "", $string); //remove text
                }
                if (stripos($line_of_text, "dbintranet.port") !== false) {
                    $string = preg_replace('/\s+/', '', $line_of_text); //remove space
                    $dataconfig['intranet_port'] = str_replace("dbintranet.port=", "", $string); //remove text
                }
                /* end db intranet config */
                if (stripos($line_of_text, "dbwebsec.dbname") !== false) {
                    $string = preg_replace('/\s+/', '', $line_of_text); //remove space
                    $dataconfig['database_sec'] = str_replace("dbwebsec.dbname=", "", $string); //remove text
                }
                if (stripos($line_of_text, "dbmaster.dbname") !== false) {
                    $string = preg_replace('/\s+/', '', $line_of_text); //remove space
                    $dataconfig['database_master'] = str_replace("dbmaster.dbname=", "", $string); //remove text
                }
            }
            return $dataconfig;  //set configuration from file .ini     
            fclose($file_contents);
        }else{
            return 0;
        }
    }

    function getConfigdataArt($config) {      
        $paramconfig = $this->getfileConfigArt($config);
        if($paramconfig !==0){
           /* start local host */
            $data['host'] = $paramconfig['intranet_art_host'];
            $data['user'] = $paramconfig['intranet_art_username'];
            $data['password'] = $paramconfig['intranet_art_password'];
            $data['port'] = $paramconfig['intranet_art_port'];
            $data['database'] = $paramconfig['intranet_art_database'];
            $data['database_master'] = $paramconfig['master_art_database'];
        /* end local host */
        }else{
            $data['host'] = null;
            $data['user'] = null;
            $data['password'] = null;
            $data['port'] = null;
            $data['database'] = null;
            $data['database_master'] = null;
        }
       
        return $data;
    }

    function getfileConfigArt($config) {
        $base = substr(getcwd(), 0, -6) . 'application/modules/hrd/configs/' . $config . '.ini'; //get common config
        $checkfile = file_exists($base); //check file exist or not yet
        if ($checkfile > 0) {
            $file_contents = fopen($base, "r"); //read file file .ini
            $dataconfig = array();
            while (!feof($file_contents)) { //loop all text in main.ini
                $line_of_text = fgets($file_contents); //loop one line from file .ini
                /* start db intranet config */
                if (stripos($line_of_text, "db-intranet_art.host") !== false) {
                    $string = preg_replace('/\s+/', '', $line_of_text); //remove space
                    $dataconfig['intranet_art_host'] = str_replace("db-intranet_art.host=", "", $string); //remove text
                }
                if (stripos($line_of_text, "db-intranet_art.username") !== false) {
                    $string = preg_replace('/\s+/', '', $line_of_text); //remove space
                    $dataconfig['intranet_art_username'] = str_replace("db-intranet_art.username=", "", $string); //remove text
                }
                if (stripos($line_of_text, "db-intranet_art.password") !== false) {
                    $string = preg_replace('/\s+/', '', $line_of_text); //remove space
                    $dataconfig['intranet_art_password'] = str_replace("db-intranet_art.password=", "", $string); //remove text
                }
                if (stripos($line_of_text, "db-intranet_art.dbname") !== false) {
                    $string = preg_replace('/\s+/', '', $line_of_text); //remove space
                    $dataconfig['intranet_art_database'] = str_replace("db-intranet_art.dbname=", "", $string); //remove text
                }
                if (stripos($line_of_text, "db-intranet_art.port") !== false) {
                    $string = preg_replace('/\s+/', '', $line_of_text); //remove space
                    $dataconfig['intranet_art_port'] = str_replace("db-intranet_art.port=", "", $string); //remove text
                }
                /* end db intranet config */
                if (stripos($line_of_text, "db-master_site.dbname") !== false) {
                    $string = preg_replace('/\s+/', '', $line_of_text); //remove space
                    $dataconfig['master_art_database'] = str_replace("db-master_site.dbname=", "", $string); //remove text
                }
            }
            return $dataconfig;  //set configuration from file .ini     
            fclose($file_contents);
        }else{
            return 0;
        }
    }

    public function fillData($data) {
        
    }

    public function grouped() {
        
    }

}

?>
