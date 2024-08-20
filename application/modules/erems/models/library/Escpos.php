<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Escpos
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../../library/escpos/Escpos.php';

class Erems_Models_Library_Escpos {

    private $status;
    private $msg;

    public function __construct() {
        $this->status = FALSE;
        $this->msg = "Proses..";
    }

    public function run($dataPayment) {
        
        
        /// POTONG KALIMAT YANG PANJANG
        $text = $dataPayment['note'];
        $noteAr = array();
        $terbilangAr = array();
        $maxStr = 600;
        $count = 0;
        while(strlen($text) > 0){
            
            $noteAr[] = substr($text, 0,$maxStr);
            $text = str_replace($noteAr[$count],"",$text);
            $count++;
        }
        $count = 0;
        $text = $dataPayment['terbilang'];
        while(strlen($text) > 0){
            
            $terbilangAr[] = substr($text, 0,$maxStr);
            $text = str_replace($terbilangAr[$count],"",$text);
            $count++;
        }
        ///END POTONG KALIMAT YANG PANJANG
        

        try {



            //  $connector = new WindowsPrintConnector("Epson Share");
            // var_dump($_SERVER['REMOTE_ADDR']);
            // $connector = new NetworkPrintConnector("192.168.52.125","USB001");

            /*

              

             */


            $connector = $this->getConnector($_SERVER['REMOTE_ADDR']);
            $printer = new Escpos($connector);
         
            
            
            $printer->text("\n");
              $printer->text("\n");
              $printer->text("\n");
              $printer->text("\n");
              $printer->text("\n");
              $printer->text("\n");
              $printer->text("\n");
              $printer->text("\n");
              $printer->text("\n");
              $printer->text("                       ".$dataPayment["customer"]."\n");
              $printer->text("\n");
              $printer->text("\n");
              $printer->text("\n");
              $printer->text("\n");
              $printer->text("\n");
              foreach($terbilangAr as $t1){
                  $printer->text("                       ".$t1."\n");
                  $printer->text("\n");
              }
              
        
              $printer->text("\n");
              foreach($noteAr as $t2){
                  $printer->text("                       ".$t2."\n");
                  $printer->text("\n");
              }
              $printer->text("\n");
              $printer->text("\n");
              $printer->text("\n");
              $printer->text("                                                                ".$dataPayment["payment_date"]."\n");
              $printer->text("\n");
              $printer->text("              ".$dataPayment["total_payment"]."\n");
              $printer->text("\n");


              $printer->text("\n");
              $printer->text("\n");
              $printer->text("\n");
              $printer->text("\n");
              $printer->text("\n");
              $printer->text("\n");
              $printer->text("\n");
             
             
           
            $printer->cut();
            $printer->close();
            $this->status = TRUE;
            $this->msg = "SUCCESS PRINT";
        } catch (Exception $e) {
            $this->msg = "Couldn't print to this printer: " . $e->getMessage() . "\n";
        }
    }

    public function getConnector($remote) {
       
        switch ($remote) {
            case "192.168.52.125": 

               // return new WindowsPrintConnector("smb://Guest@192.168.52.125/Epson Sha");
                return new WindowsPrintConnector("smb://denny.susanto:cgd@180.250.89.85/EPSON LQ");
            //    return new WindowsPrintConnector("smb://MIS:tommyt0b4n@192.168.52.125/Epson Sha");
            case "180.250.89.85":
                return new WindowsPrintConnector("smb://denny.susanto:cgd@180.250.89.85/EPSON LQ");
               // return new WindowsPrintConnector("EPSON LQ");
                //
            case "::1":
                return new WindowsPrintConnector("smb://ASPNET:cgd@180.250.89.85/EPSON LQ");
            default:
                $this->msg = "No known printer at your location";
        }
    }

    public function getStatus() {
        return $this->status;
    }

    public function getMsg() {
        return $this->msg;
    }

}

?>
