<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CsvReader
 *
 * @author TOMMY-MIS
 */
abstract  class Hrd_Models_Import_AbstractCsvReader {
    private $error;
    public function readFile($file){
        $fn = realpath($file);
        if (file_exists($fn)) {
            if (($handle = fopen($fn, "r")) !== FALSE) {
                while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                   // $num = count($data);
                    //  echo "<p> $num fields in line $row: <br /></p>\n";
                 //   $row++;
                  
                  
                 
                     //   $this->registerSingleLine($data[0], $data[1], $fd, $data[9], $data[10]);
                    $this->loopRow($data);
                    
                }
                fclose($handle);
            } else {
              
                $this->error = "Tidak bisa membuka file";
            }
        } else {
            $this->error = "Tidak ada file csv";
        }
    }
    
    public function getError(){
        return $this->error;
    }
    
    abstract function loopRow($rowArray);
}
