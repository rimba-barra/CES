<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of JenjangSekolahCsv
 *
 * @author TOMMY-MIS
 */
class Hrd_Models_Import_Csv_JenjangSekolahCsv extends Hrd_Models_Import_AbstractCsvReader{
    public function loopRow($rowArray) {
        var_dump($rowArray[0]);
    }

}
