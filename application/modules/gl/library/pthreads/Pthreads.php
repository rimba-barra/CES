<?php
/*

Pthreads, digunakan untuk melakukan mutiproses secara bersamaan.
Dalam hal ini melakukan query bersamaan untuk memaksimalkan kinerja processor.
Proses yang ingin dieksekusi dimasukan dalam $stack[]

*/
ini_set('max_execution_time', 1000000);
    
class Pthreads extends Thread {

    public function __construct($query) {
        $this->query = $query;
    }

    public function run() {
        
        date_default_timezone_set("Asia/Bangkok");
        
        require  'db_config.php';
        
        if ($this->query) {
            $resultqc = 1;
            //var_dump("START ".date("H:i:s"));
            $qc = $database->query(
                $this->query 
            );  
            // var_dump($this->query);
            $resultqc = $qc->fetchAll();
            //var_dump("END ".date("H:i:s"));

        }

        return $resultqc;
    }
}

?>