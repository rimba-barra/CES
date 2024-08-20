<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of DosTamanDayu
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Library_DosTamanDayu {
    public function getTxt($hasil){
        //$fileName = "test_local.bat";
        $fileName = $hasil["file_name"];
        $penandataTangan  = $hasil["penandatangan"];
       
 

            $dataPayment = array(
                "note" => $hasil["note"],
                "terbilang" => Erems_Box_Library_Terbilang::terbilang($hasil["total_payment"], 3),
                "alamat"=>$hasil["customer_address"]
            );

            $alamatPrint = '\\pc-snip026\EPSON LQ\/';
            $alamatPrintLocal = "";
            $maxStr = 50;
            /// POTONG KALIMAT YANG PANJANG
            $noteAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['note']);
            $terbilangAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['terbilang']);
            $addressAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['alamat']);

            ///END POTONG KALIMAT YANG PANJANG

            $barisNote = 1;
            $barisTerbilang = 1;
            $barisMarginBotNote = 4;
            $barisMarginBotTerbilang = 2;
            $barisMarginBotAlamat = 1;

            $barisMarginBotNote = $barisMarginBotNote - count($noteAr) + 1;
            $barisMarginBotTerbilang = $barisMarginBotTerbilang - count($terbilangAr) + 1;
            $barisMarginBotAlamat = $barisMarginBotAlamat - count($terbilangAr) + 1;
            
            $previewRemoveTxt1= "";$previewRemoveTxt2= "";$previewRemoveTxt3= "";
            
           
            


            $txt = "echo.>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
			$txt .= "echo.>>testfile \n";
			$txt .= "echo.>>testfile \n";
            $txt .= "echo                           " . $hasil["customer_name"] . " >>testfile \n";
           // foreach ($addressAr as $aa) {
            //    $txt .= "echo                           " . $aa . " >>testfile \n";
            //}
           // for ($i = 0; $i < $barisMarginBotAlamat; $i++) {
           //     $txt .= "echo.>>testfile \n";
           //}
            foreach ($terbilangAr as $ta) {
                $txt .= "echo                           " . $ta . " >>testfile \n";
            }
            for ($i = 0; $i < $barisMarginBotTerbilang; $i++) {
                $txt .= "echo.>>testfile \n";
            }
            foreach ($noteAr as $no) {
                $txt .= "echo                           " . $no . " >>testfile \n";
            }
            for ($i = 0; $i < $barisMarginBotNote; $i++) {
                $txt .= "echo.>>testfile \n";
            }
			$txt .= "echo.>>testfile \n";
           // $txt .= "echo.>>testfile \n";
              //$txt .= "echo                    " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . "                                                                  " . Erems_Box_Tools::formatDate(date("d-m-Y")) . " >>testfile \n"; // model 2 ( ramping )
			 // $txt .= "echo                    " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . "                        " . Erems_Box_Tools::formatDate(date("d-m-Y")) . " >>testfile \n"; // model 1 ( lebar )
		       $txt .= "echo                    " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . "                                " . Erems_Box_Tools::formatDate(date("d-m-Y")) . " >>testfile \n"; // model 1b ( lebar )
		   // $txt .= "echo           " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . " >>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
           // $txt .= "echo                                                           " . $penandataTangan . " >>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            $txt .= "echo.>>testfile \n";
            //$txt .= "copy testfile \"\\\\pc-snip026\EPSON LQ\" \n";
            // $txt .= "copy testfile \"\\\\::1\Epson\" \n";
            // $txt .= "copy testfile \"\\\\localhost\EPSON LX-300+ \/II (Copy 1)\" \n";
            //$txt .= "copy testfile \"\\\\::1\Epsonku\" \n"; $previewRemoveTxt1 = "copy testfile \"\\\\::1\Epsonku\" \n"; 
            
            // FORMAT XP 
            /*
            $txt .= "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n"; $previewRemoveTxt1 = "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n";
            $txt .= "print testfile \n"; $previewRemoveTxt2 = "print testfile \n";
             
             */
            
            // FORMAT windows 7
			/*
            $txt .= "copy testfile \"\\\\::1\EPSON LX-310 KASIR\" \n"; $previewRemoveTxt1 = "copy testfile \"\\\\::1\EPSON LX-310 KASIR\" \n";
			*/
			
			// FORMAT WINDOWS 10
			$txt .= "copy testfile \"\\\\::1\EPSON LX-310 ESCP\" \n"; $previewRemoveTxt1 = "copy testfile \"\\\\::1\EPSON LX-310 ESCP\" \n";
            
            $txt .= "del testfile"; $previewRemoveTxt3 = "del testfile";


            $myfile = fopen(APPLICATION_PATH . '/../public/app/erems/uploads/pdf/kwitansipayment/' . $fileName, "w") or die("Unable to open file!");
            fwrite($myfile, $txt);
            fclose($myfile);



            $display["name"] = $hasil["customer_name"];
            $display["terbilang"] = $terbilangAr;
            $display["note"] = $noteAr;
            $tempText = "" . Erems_Box_Tools::toCurrency($hasil["total_payment"]);
            $display["date"] = Erems_Box_Tools::formatDate($hasil["payment_date"]);
            $display["amount"] = $tempText;
            
         
            //// membenarkan format text ke preview
            //$txt = str_replace(,"", $txt);
            $txt = str_replace($previewRemoveTxt3,"", $txt);
            $txt = str_replace($previewRemoveTxt2,"", $txt);
            $txt = str_replace($previewRemoveTxt1,"", $txt);
            $txt = str_replace("\n","<br/>", $txt);
            $txt = str_replace("echo.>>","", $txt);
            $txt = str_replace("echo.>","", $txt);
            $txt = str_replace("echo","", $txt);
            $txt = str_replace(">>","", $txt);
            $txt = str_replace("testfile","", $txt);
            $txt = str_replace(" ","&nbsp;", $txt);
            return $txt;
    }
}
