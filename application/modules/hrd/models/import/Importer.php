<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Importer
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Import_Importer {
    
    public function run(){
        $this->loadJenjangSekolah();
    }
    
    public function loadJenjangSekolah(){
        $csv = new Hrd_Models_Import_Csv_JenjangSekolahCsv();
        
        $csv->readFile(APPLICATION_PATH . '/../' . 'public/app/hrd/uploads/import/jenjangsekolah.csv');
        var_dump($csv->getError());
        
    }
}
