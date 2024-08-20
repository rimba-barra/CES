<?php

class Erems_Models_Library_DosCitraMaja implements Erems_Models_Payment_PrintBisaMulti{    

    public function getOptions() {
        return array(
			  array("value"=>13,"text"=>"Template Installment Payment JCC","selected"=>false,"user_id"=>0),
			  array("value"=>14,"text"=>"Template Installment Payment Fujitsu - PC","selected"=>false,"user_id"=>0),
			  array("value"=>1,"text"=>"Template Installment Payment PC Pak Eka","selected"=>false,"user_id"=>0),
			  array("value"=>2,"text"=>"Template Others Payment PC Pak Eka","selected"=>false,"user_id"=>0),
			  array("value"=>3,"text"=>"Template Installment Payment PC Ibu Sisil","selected"=>false,"user_id"=>0),
			  array("value"=>4,"text"=>"Template Others Payment PC Ibu Sisil","selected"=>false,"user_id"=>0),
			  array("value"=>5,"text"=>"Template Installment Payment PC Sany","selected"=>false,"user_id"=>0),
			  array("value"=>6,"text"=>"Template Others Payment PC Sany","selected"=>false,"user_id"=>0),
			  array("value"=>7,"text"=>"Template Installment Payment Kasirmaja3_op","selected"=>false,"user_id"=>0),
			  array("value"=>8,"text"=>"Template Others Payment Kasir","selected"=>false,"user_id"=>0),
			  array("value"=>11,"text"=>"Template Installment Payment PC Derra","selected"=>false,"user_id"=>0),
			  array("value"=>12,"text"=>"Template Others Payment PC Derra","selected"=>false,"user_id"=>0),
              array("value"=>9,"text"=>"Template Installment Payment PC Yuni","selected"=>false,"user_id"=>0),
              array("value"=>10,"text"=>"Template Others Payment PC Yuni","selected"=>false,"user_id"=>0)
        );
    }

    public function runMulti(\Erems_Box_Models_App_Session $ses, $dataPayments, $sortPaymentIds, $option) {
        if($option==1){
            return $this->getTxt1($dataPayments);
        }
		else if($option==2){
            return $this->getTxt2($dataPayments);
        }
		else if($option==3){
            return $this->getTxt3($dataPayments);
        }
		else if($option==4){
            return $this->getTxt4($dataPayments);
        }
		else if($option==5){
            return $this->getTxt5($dataPayments);
        }
		else if($option==6){
            return $this->getTxt6($dataPayments);
        }
		else if($option==7){
            return $this->getTxt7($dataPayments);
        }
		else if($option==8){
            return $this->getTxt8($dataPayments);
        }
		else if($option==9){
            return $this->getTxt9($dataPayments);
		}
		else if($option==10){
            return $this->getTxt10($dataPayments);
		}
        else if($option==11){
            return $this->getTxt11($dataPayments);
        }
        else if($option==12){
            return $this->getTxt12($dataPayments);
        }
        else if($option==13){
            return $this->getTxt13($dataPayments);
        }
		else if($option==14){
            return $this->getTxt14($dataPayments);
        }
    }


    
	public function getTxt1($hasil){
        
        //$fileName = "test_local.bat";
        $fileName = $hasil["file_name"];
        $penandataTangan  = $hasil["penandatangan"];
       
            // $cairDate = date("d-m-Y", strtotime($hasil["cair_date"]));

            $dataPayment = array(
                "note" => $hasil["note"],
                "terbilang" => Erems_Box_Library_Terbilang::terbilang($hasil["total_payment"], 3)
            );

            $alamatPrint = '\\pc-snip026\EPSON LQ\/';
            $alamatPrintLocal = "";
            $maxStr = 75;
            /// POTONG KALIMAT YANG PANJANG
            $noteAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['note']);
            $terbilangAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['terbilang']);

            ///END POTONG KALIMAT YANG PANJANG

            $barisNote = 1;
            $barisTerbilang = 1;
            $barisMarginBotNote = 2;
            $barisMarginBotTerbilang = 2;

            $barisMarginBotNote = $barisMarginBotNote - count($noteAr) + 1;
            $barisMarginBotTerbilang = $barisMarginBotTerbilang - count($terbilangAr);
            
            $previewRemoveTxt1= "";$previewRemoveTxt2= "";$previewRemoveTxt3= "";
            

            $txt = "echo.>testfile.txt \n";
			//date('d-m-Y', strtotime($hasil["purchaseletter_purchase_date"]))
			//$txt .= "echo                                                                                                                              " . date('d-m-Y', strtotime($hasil["purchaseletter_purchase_date"])) . " >>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
   
			//$txt .= "echo.>>testfile.txt \n";
            $txt .= "echo                                     " . $hasil["customer_name"] . " >>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
			
            foreach ($terbilangAr as $ta) {
                $txt .= "echo                                     " . $ta . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotTerbilang; $i++) {
                $txt .= "echo.>>testfile.txt \n";
            }
            foreach ($noteAr as $no) {
                $txt .= "echo                                     " . preg_replace('/\s+/', ' ',$no) . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotNote; $i++) {
                $txt .= "echo.>>testfile.txt \n";
            }
			

          
            $txt .= "echo                 " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . "                                                                                          " . Erems_Box_Tools::formatDate($hasil["payment_date"]) . "  >>testfile.txt \n";

 
 
          //  $txt .= "echo              " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
            //$txt .= "echo                                                            " . $penandataTangan . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            //$txt .= "copy testfile.txt \"\\\\pc-snip026\EPSON LQ\" \n";
            // $txt .= "copy testfile.txt \"\\\\::1\Epson\" \n";
            // $txt .= "copy testfile.txt \"\\\\localhost\EPSON LX-300+ \/II (Copy 1)\" \n";
            //$txt .= "copy testfile.txt \"\\\\::1\Epsonku\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\::1\Epsonku\" \n"; 
            
            // FORMAT XP 
            /*
            $txt .= "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n"; $previewRemoveTxt1 = "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n";
            $txt .= "print testfile.txt \n"; $previewRemoveTxt2 = "print testfile.txt \n";
             
             */
            
            // FORMAT windows 7
			/*
            $txt .= "copy testfile.txt \"\\\\::1\EPSON LX-310 KASIR\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\::1\EPSON LX-310 KASIR\" \n";
			*/
			
			// FORMAT WINDOWS 10
			//$txt .= "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n";
			  $txt .= "Notepad /p \"testfile.txt\" \n"; $previewRemoveTxt1 = "Notepad /p \"testfile.txt\" \n";
            
            $txt .= "del testfile.txt"; $previewRemoveTxt3 = "del testfile.txt";
			$txt .= "del ".$fileName; $previewRemoveTxt4 = "del ".$fileName;


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
			$txt = str_replace($previewRemoveTxt4,"", $txt);
            $txt = str_replace($previewRemoveTxt3,"", $txt);
            $txt = str_replace($previewRemoveTxt2,"", $txt);
            $txt = str_replace($previewRemoveTxt1,"", $txt);
            $txt = str_replace("\n","<br/>", $txt);
            $txt = str_replace("echo.>>","", $txt);
            $txt = str_replace("echo.>","", $txt);
            $txt = str_replace("echo","", $txt);
            $txt = str_replace(">>","", $txt);
            $txt = str_replace("testfile.txt","", $txt);
            $txt = str_replace(" ","&nbsp;", $txt);
            return $txt;
	}
	
	public function getTxt2($hasil){
        
        //$fileName = "test_local.bat";
        $fileName = $hasil["file_name"];
        $penandataTangan  = $hasil["penandatangan"];
       
            // $cairDate = date("d-m-Y", strtotime($hasil["cair_date"]));

            $dataPayment = array(
                "note" => $hasil["note"],
                "terbilang" => Erems_Box_Library_Terbilang::terbilang($hasil["total_payment"], 3)
            );

            $alamatPrint = '\\pc-snip026\EPSON LQ\/';
            $alamatPrintLocal = "";
            $maxStr = 57;
            /// POTONG KALIMAT YANG PANJANG
            $noteAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['note']);
            $terbilangAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['terbilang']);

            ///END POTONG KALIMAT YANG PANJANG

            $barisNote = 1;
            $barisTerbilang = 1;
            $barisMarginBotNote = 3;
            $barisMarginBotTerbilang = 2;

            $barisMarginBotNote = $barisMarginBotNote - count($noteAr) + 1;
            $barisMarginBotTerbilang = $barisMarginBotTerbilang - count($terbilangAr);
            
            $previewRemoveTxt1= "";$previewRemoveTxt2= "";$previewRemoveTxt3= "";
            

            $txt = "echo.>testfile.txt \n";
	
			//$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
   
			$txt .= "echo.>>testfile.txt \n";
            $txt .= "echo                                                                " . $hasil["customer_name"] . " >>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
			
			
            foreach ($terbilangAr as $ta) {
                $txt .= "echo                                                                " . $ta . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotTerbilang; $i++) {
                $txt .= "echo.>>testfile.txt \n";
            }
            foreach ($noteAr as $no) {
                $txt .= "echo                                                                " . preg_replace('/\s+/', ' ',$no) . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotNote; $i++) {
                $txt .= "echo.>>testfile.txt \n";
            }
			

          
            $txt .= "echo                                                                                                                 " .Erems_Box_Tools::formatDate($hasil["payment_date"]). ">>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n"; 
 
            $txt .= "echo                                               " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
            //$txt .= "echo                                                            " . $penandataTangan . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            //$txt .= "copy testfile.txt \"\\\\pc-snip026\EPSON LQ\" \n";
            // $txt .= "copy testfile.txt \"\\\\::1\Epson\" \n";
            // $txt .= "copy testfile.txt \"\\\\localhost\EPSON LX-300+ \/II (Copy 1)\" \n";
            //$txt .= "copy testfile.txt \"\\\\::1\Epsonku\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\::1\Epsonku\" \n"; 
            
            // FORMAT XP 
            /*
            $txt .= "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n"; $previewRemoveTxt1 = "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n";
            $txt .= "print testfile.txt \n"; $previewRemoveTxt2 = "print testfile.txt \n";
             
             */
            
            // FORMAT windows 7
			/*
            $txt .= "copy testfile.txt \"\\\\::1\EPSON LX-310 KASIR\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\::1\EPSON LX-310 KASIR\" \n";
			*/
			
			// FORMAT WINDOWS 10
			//$txt .= "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n";
			  $txt .= "Notepad /p \"testfile.txt\" \n"; $previewRemoveTxt1 = "Notepad /p \"testfile.txt\" \n";
            
            $txt .= "del testfile.txt"; $previewRemoveTxt3 = "del testfile.txt";
			$txt .= "del ".$fileName; $previewRemoveTxt4 = "del ".$fileName;


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
			$txt = str_replace($previewRemoveTxt4,"", $txt);
            $txt = str_replace($previewRemoveTxt3,"", $txt);
            $txt = str_replace($previewRemoveTxt2,"", $txt);
            $txt = str_replace($previewRemoveTxt1,"", $txt);
            $txt = str_replace("\n","<br/>", $txt);
            $txt = str_replace("echo.>>","", $txt);
            $txt = str_replace("echo.>","", $txt);
            $txt = str_replace("echo","", $txt);
            $txt = str_replace(">>","", $txt);
            $txt = str_replace("testfile.txt","", $txt);
            $txt = str_replace(" ","&nbsp;", $txt);
            return $txt;
	}

	public function getTxt3($hasil){
        
        //$fileName = "test_local.bat";
        $fileName = $hasil["file_name"];
        $penandataTangan  = $hasil["penandatangan"];
       
            // $cairDate = date("d-m-Y", strtotime($hasil["cair_date"]));

            $dataPayment = array(
                "note" => $hasil["note"],
                "terbilang" => Erems_Box_Library_Terbilang::terbilang($hasil["total_payment"], 3)
            );

            $alamatPrint = '\\pc-snip026\EPSON LQ\/';
            $alamatPrintLocal = "";
            $maxStr = 75;
            /// POTONG KALIMAT YANG PANJANG
            $noteAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['note']);
            $terbilangAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['terbilang']);

            ///END POTONG KALIMAT YANG PANJANG

            $barisNote = 1;
            $barisTerbilang = 1;
            $barisMarginBotNote = 2;
            $barisMarginBotTerbilang = 3;

            $barisMarginBotNote = $barisMarginBotNote - count($noteAr) + 1;
            $barisMarginBotTerbilang = $barisMarginBotTerbilang - count($terbilangAr);
            
            $previewRemoveTxt1= "";$previewRemoveTxt2= "";$previewRemoveTxt3= "";
            

            $txt = "echo.>testfile.txt \n";
	
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
   
			$txt .= "echo.>>testfile.txt \n";
            $txt .= "echo                           " . $hasil["customer_name"] . " >>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			
			
			
            foreach ($terbilangAr as $ta) {
                $txt .= "echo                           " . $ta . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotTerbilang; $i++) {
                $txt .= "echo.>>testfile.txt \n";
            }
            foreach ($noteAr as $no) {
                $txt .= "echo                           " . preg_replace('/\s+/', ' ',$no) . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotNote; $i++) {
                $txt .= "echo.>>testfile.txt \n";
            }
			

          
            $txt .= "echo              " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . "                                                                                " . Erems_Box_Tools::formatDate($hasil["payment_date"]) . "  >>testfile.txt \n";

 
 
          //  $txt .= "echo              " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
            //$txt .= "echo                                                            " . $penandataTangan . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            //$txt .= "copy testfile.txt \"\\\\pc-snip026\EPSON LQ\" \n";
            // $txt .= "copy testfile.txt \"\\\\::1\Epson\" \n";
            // $txt .= "copy testfile.txt \"\\\\localhost\EPSON LX-300+ \/II (Copy 1)\" \n";
            //$txt .= "copy testfile.txt \"\\\\::1\Epsonku\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\::1\Epsonku\" \n"; 
            
            // FORMAT XP 
            /*
            $txt .= "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n"; $previewRemoveTxt1 = "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n";
            $txt .= "print testfile.txt \n"; $previewRemoveTxt2 = "print testfile.txt \n";
             
             */
            
            // FORMAT windows 7
			/*
            $txt .= "copy testfile.txt \"\\\\::1\EPSON LX-310 KASIR\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\::1\EPSON LX-310 KASIR\" \n";
			*/
			
			// FORMAT WINDOWS 10
			//$txt .= "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n";
			  $txt .= "Notepad /p \"testfile.txt\" \n"; $previewRemoveTxt1 = "Notepad /p \"testfile.txt\" \n";
            
            $txt .= "del testfile.txt"; $previewRemoveTxt3 = "del testfile.txt";
			$txt .= "del ".$fileName; $previewRemoveTxt4 = "del ".$fileName;


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
			$txt = str_replace($previewRemoveTxt4,"", $txt);
            $txt = str_replace($previewRemoveTxt3,"", $txt);
            $txt = str_replace($previewRemoveTxt2,"", $txt);
            $txt = str_replace($previewRemoveTxt1,"", $txt);
            $txt = str_replace("\n","<br/>", $txt);
            $txt = str_replace("echo.>>","", $txt);
            $txt = str_replace("echo.>","", $txt);
            $txt = str_replace("echo","", $txt);
            $txt = str_replace(">>","", $txt);
            $txt = str_replace("testfile.txt","", $txt);
            $txt = str_replace(" ","&nbsp;", $txt);
            return $txt;
	}
	
	public function getTxt4($hasil){
        
        //$fileName = "test_local.bat";
        $fileName = $hasil["file_name"];
        $penandataTangan  = $hasil["penandatangan"];
       
            // $cairDate = date("d-m-Y", strtotime($hasil["cair_date"]));

            $dataPayment = array(
                "note" => $hasil["note"],
                "terbilang" => Erems_Box_Library_Terbilang::terbilang($hasil["total_payment"], 3)
            );

            $alamatPrint = '\\pc-snip026\EPSON LQ\/';
            $alamatPrintLocal = "";
            $maxStr = 60;
            /// POTONG KALIMAT YANG PANJANG
            $noteAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['note']);
            $terbilangAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['terbilang']);

            ///END POTONG KALIMAT YANG PANJANG

            $barisNote = 1;
            $barisTerbilang = 1;
            $barisMarginBotNote = 2;
            $barisMarginBotTerbilang = 2;

            $barisMarginBotNote = $barisMarginBotNote - count($noteAr) + 1;
            $barisMarginBotTerbilang = $barisMarginBotTerbilang - count($terbilangAr);
            
            $previewRemoveTxt1= "";$previewRemoveTxt2= "";$previewRemoveTxt3= "";
            

			//edited by Rizal 8 Maret 2019
             $txt = "echo.>testfile.txt \n";
	
			$txt .= "echo.>>testfile.txt \n";
			
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
			/*$txt .= "echo.>>testfile.txt \n"; */
			//endedited
			$txt .= "echo.>>testfile.txt \n";
   
			// $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo                                                     " . $hasil["customer_name"] . " >>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			
			
            foreach ($terbilangAr as $ta) {
                $txt .= "echo                                                     " . $ta . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotTerbilang; $i++) {
                $txt .= "echo.>>testfile.txt \n";
            }
			//$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
            foreach ($noteAr as $no) {
                $txt .= "echo                                                     " . preg_replace('/\s+/', ' ',$no) . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotNote; $i++) {
                $txt .= "echo.>>testfile.txt \n";
            }
			//$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo                                                                                                        " . Erems_Box_Tools::formatDate($hasil["payment_date"]). " >>testfile.txt \n\n\n";

			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
            $txt .= "echo                                               " . Erems_Box_Tools::toCurrency($hasil["total_payment"])  . "  >>testfile.txt \n";

 
 
          //  $txt .= "echo              " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
            //$txt .= "echo                                                            " . $penandataTangan . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            //$txt .= "copy testfile.txt \"\\\\pc-snip026\EPSON LQ\" \n";
            // $txt .= "copy testfile.txt \"\\\\::1\Epson\" \n";
            // $txt .= "copy testfile.txt \"\\\\localhost\EPSON LX-300+ \/II (Copy 1)\" \n";
            //$txt .= "copy testfile.txt \"\\\\::1\Epsonku\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\::1\Epsonku\" \n"; 
            
            // FORMAT XP 
            /*
            $txt .= "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n"; $previewRemoveTxt1 = "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n";
            $txt .= "print testfile.txt \n"; $previewRemoveTxt2 = "print testfile.txt \n";
             
             */
            
            // FORMAT windows 7
			/*
            $txt .= "copy testfile.txt \"\\\\::1\EPSON LX-310 KASIR\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\::1\EPSON LX-310 KASIR\" \n";
			*/
			
			// FORMAT WINDOWS 10
			//$txt .= "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n";
			  $txt .= "Notepad /p \"testfile.txt\" \n"; $previewRemoveTxt1 = "Notepad /p \"testfile.txt\" \n";
            
            $txt .= "del testfile.txt"; $previewRemoveTxt3 = "del testfile.txt";
			$txt .= "del ".$fileName; $previewRemoveTxt4 = "del ".$fileName;


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
			$txt = str_replace($previewRemoveTxt4,"", $txt);
            $txt = str_replace($previewRemoveTxt3,"", $txt);
            $txt = str_replace($previewRemoveTxt2,"", $txt);
            $txt = str_replace($previewRemoveTxt1,"", $txt);
            $txt = str_replace("\n","<br/>", $txt);
            $txt = str_replace("echo.>>","", $txt);
            $txt = str_replace("echo.>","", $txt);
            $txt = str_replace("echo","", $txt);
            $txt = str_replace(">>","", $txt);
            $txt = str_replace("testfile.txt","", $txt);
            $txt = str_replace(" ","&nbsp;", $txt);
            return $txt;
	}
	
	public function getTxt5($hasil){
        
        //$fileName = "test_local.bat";
        $fileName = $hasil["file_name"];
        $penandataTangan  = $hasil["penandatangan"];
       
            // $cairDate = date("d-m-Y", strtotime($hasil["cair_date"]));

            $dataPayment = array(
                "note" => $hasil["note"],
                "terbilang" => Erems_Box_Library_Terbilang::terbilang($hasil["total_payment"], 3)
            );

            $alamatPrint = '\\pc-snip026\EPSON LQ\/';
            $alamatPrintLocal = "";
            $maxStr = 60;
            /// POTONG KALIMAT YANG PANJANG
            $noteAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['note']);
            $terbilangAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['terbilang']);

            ///END POTONG KALIMAT YANG PANJANG

            $barisNote = 1;
            $barisTerbilang = 1;
            $barisMarginBotNote = 2;
            $barisMarginBotTerbilang = 2;

            $barisMarginBotNote = $barisMarginBotNote - count($noteAr) + 1;
            $barisMarginBotTerbilang = $barisMarginBotTerbilang - count($terbilangAr);
            
            $previewRemoveTxt1= "";$previewRemoveTxt2= "";$previewRemoveTxt3= "";
            

            $txt = "echo.>testfile.txt \n";
	
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
   
			$txt .= "echo.>>testfile.txt \n";
            $txt .= "echo                " . $hasil["customer_name"] . " >>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			
			
            foreach ($terbilangAr as $ta) {
                $txt .= "echo                " . $ta . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotTerbilang; $i++) {
                $txt .= "echo.>>testfile.txt \n";
            }
            foreach ($noteAr as $no) {
                $txt .= "echo                " . preg_replace('/\s+/', ' ',$no) . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotNote; $i++) {
                $txt .= "echo.>>testfile.txt \n ";
            }
			
			$txt .= "echo                " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . " >>testfile.txt\n ";
          
            $txt .= "echo                                       " . Erems_Box_Tools::formatDate($hasil["payment_date"]) . "  >>testfile.txt \n";

 
 
          //  $txt .= "echo              " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
            //$txt .= "echo                                                            " . $penandataTangan . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            //$txt .= "copy testfile.txt \"\\\\pc-snip026\EPSON LQ\" \n";
            // $txt .= "copy testfile.txt \"\\\\::1\Epson\" \n";
            // $txt .= "copy testfile.txt \"\\\\localhost\EPSON LX-300+ \/II (Copy 1)\" \n";
            //$txt .= "copy testfile.txt \"\\\\::1\Epsonku\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\::1\Epsonku\" \n"; 
            
            // FORMAT XP 
            /*
            $txt .= "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n"; $previewRemoveTxt1 = "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n";
            $txt .= "print testfile.txt \n"; $previewRemoveTxt2 = "print testfile.txt \n";
             
             */
            
            // FORMAT windows 7
			/*
            $txt .= "copy testfile.txt \"\\\\::1\EPSON LX-310 KASIR\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\::1\EPSON LX-310 KASIR\" \n";
			*/
			
			// FORMAT WINDOWS 10
			//$txt .= "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n";
			  $txt .= "Notepad /p \"testfile.txt\" \n"; $previewRemoveTxt1 = "Notepad /p \"testfile.txt\" \n";
            
            $txt .= "del testfile.txt"; $previewRemoveTxt3 = "del testfile.txt";
			$txt .= "del ".$fileName; $previewRemoveTxt4 = "del ".$fileName;


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
			$txt = str_replace($previewRemoveTxt4,"", $txt);
            $txt = str_replace($previewRemoveTxt3,"", $txt);
            $txt = str_replace($previewRemoveTxt2,"", $txt);
            $txt = str_replace($previewRemoveTxt1,"", $txt);
            $txt = str_replace("\n","<br/>", $txt);
            $txt = str_replace("echo.>>","", $txt);
            $txt = str_replace("echo.>","", $txt);
            $txt = str_replace("echo","", $txt);
            $txt = str_replace(">>","", $txt);
            $txt = str_replace("testfile.txt","", $txt);
            $txt = str_replace(" ","&nbsp;", $txt);
            return $txt;
	}
	
	public function getTxt6($hasil){
        
        //$fileName = "test_local.bat";
        $fileName = $hasil["file_name"];
        $penandataTangan  = $hasil["penandatangan"];
       
            // $cairDate = date("d-m-Y", strtotime($hasil["cair_date"]));

            $dataPayment = array(
                "note" => $hasil["note"],
                "terbilang" => Erems_Box_Library_Terbilang::terbilang($hasil["total_payment"], 3)
            );

            $alamatPrint = '\\pc-snip026\EPSON LQ\/';
            $alamatPrintLocal = "";
            $maxStr = 60;
            /// POTONG KALIMAT YANG PANJANG
            $noteAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['note']);
            $terbilangAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['terbilang']);

            ///END POTONG KALIMAT YANG PANJANG

            $barisNote = 1;
            $barisTerbilang = 1;
            $barisMarginBotNote = 2;
            $barisMarginBotTerbilang = 2;

            $barisMarginBotNote = $barisMarginBotNote - count($noteAr) + 1;
            $barisMarginBotTerbilang = $barisMarginBotTerbilang - count($terbilangAr);
            
            $previewRemoveTxt1= "";$previewRemoveTxt2= "";$previewRemoveTxt3= "";
            

            $txt = "echo.>testfile.txt \n";
	
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
   
			//$txt .= "echo.>>testfile.txt \n";
            $txt .= "echo                               " . $hasil["customer_name"] . " >>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
			
			
            foreach ($terbilangAr as $ta) {
                $txt .= "echo                               " . $ta . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotTerbilang; $i++) {
                $txt .= "echo.>>testfile.txt \n";
            }
            foreach ($noteAr as $no) {
                $txt .= "echo                               " . preg_replace('/\s+/', ' ',$no) . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotNote; $i++) {
                $txt .= "echo.>>testfile.txt \n ";
            }
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";

          
            $txt .= "echo                                                                 " . Erems_Box_Tools::formatDate($hasil["payment_date"]) . " >>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
 
 
			$txt .= "echo                     " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
            //$txt .= "echo                                                            " . $penandataTangan . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            //$txt .= "copy testfile.txt \"\\\\pc-snip026\EPSON LQ\" \n";
            // $txt .= "copy testfile.txt \"\\\\::1\Epson\" \n";
            // $txt .= "copy testfile.txt \"\\\\localhost\EPSON LX-300+ \/II (Copy 1)\" \n";
            //$txt .= "copy testfile.txt \"\\\\::1\Epsonku\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\::1\Epsonku\" \n"; 
            
            // FORMAT XP 
            /*
            $txt .= "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n"; $previewRemoveTxt1 = "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n";
            $txt .= "print testfile.txt \n"; $previewRemoveTxt2 = "print testfile.txt \n";
             
             */
            
            // FORMAT windows 7
			/*
            $txt .= "copy testfile.txt \"\\\\::1\EPSON LX-310 KASIR\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\::1\EPSON LX-310 KASIR\" \n";
			*/
			
			// FORMAT WINDOWS 10
			//$txt .= "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n";
			  $txt .= "Notepad /p \"testfile.txt\" \n"; $previewRemoveTxt1 = "Notepad /p \"testfile.txt\" \n";
            
            $txt .= "del testfile.txt"; $previewRemoveTxt3 = "del testfile.txt";
			$txt .= "del ".$fileName; $previewRemoveTxt4 = "del ".$fileName;


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
			$txt = str_replace($previewRemoveTxt4,"", $txt);
            $txt = str_replace($previewRemoveTxt3,"", $txt);
            $txt = str_replace($previewRemoveTxt2,"", $txt);
            $txt = str_replace($previewRemoveTxt1,"", $txt);
            $txt = str_replace("\n","<br/>", $txt);
            $txt = str_replace("echo.>>","", $txt);
            $txt = str_replace("echo.>","", $txt);
            $txt = str_replace("echo","", $txt);
            $txt = str_replace(">>","", $txt);
            $txt = str_replace("testfile.txt","", $txt);
            $txt = str_replace(" ","&nbsp;", $txt);
            return $txt;
	}

	public function getTxt7($hasil){
        
        //$fileName = "test_local.bat";
        $fileName = $hasil["file_name"];
        $penandataTangan  = $hasil["penandatangan"];
		//$tgl_sp  = $hasil["purchase_date"];
       
        //$tgl_sp = date("d-m-Y", strtotime($hasil["purchase_date"]));

            $dataPayment = array(
                "note" => $hasil["note"],
                "terbilang" => Erems_Box_Library_Terbilang::terbilang($hasil["total_payment"], 3)
            );

            $alamatPrint = '\\pc-snip026\EPSON LQ\/';
            $alamatPrintLocal = "";
            $maxStr = 75;
            /// POTONG KALIMAT YANG PANJANG
            $noteAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['note']);
            $terbilangAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['terbilang']);

            ///END POTONG KALIMAT YANG PANJANG

            $barisNote = 1;
            $barisTerbilang = 1;
            $barisMarginBotNote = 2;
            $barisMarginBotTerbilang = 3;

            $barisMarginBotNote = $barisMarginBotNote - count($noteAr) + 1;
            $barisMarginBotTerbilang = $barisMarginBotTerbilang - count($terbilangAr);
            
            $previewRemoveTxt1= "";$previewRemoveTxt2= "";$previewRemoveTxt3= "";
            

            $txt = "echo.>testfile.txt \n";
	
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo                           " . $hasil["purchase_date"] . " >>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
            $txt .= "echo                           " . $hasil["customer_name"] . " >>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			
			
			
            foreach ($terbilangAr as $ta) {
                $txt .= "echo                           " . $ta . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotTerbilang; $i++) {
                $txt .= "echo.>>testfile.txt \n";
            }
            foreach ($noteAr as $no) {
                $txt .= "echo                           " . preg_replace('/\s+/', ' ',$no) . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotNote; $i++) {
                $txt .= "echo.>>testfile.txt \n";
            }
			

          
            $txt .= "echo              " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . "                                                                                " . Erems_Box_Tools::formatDate($hasil["payment_date"]) . "  >>testfile.txt \n";

 
 
          //  $txt .= "echo              " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
            //$txt .= "echo                                                            " . $penandataTangan . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            //$txt .= "copy testfile.txt \"\\\\pc-snip026\EPSON LQ\" \n";
            // $txt .= "copy testfile.txt \"\\\\::1\Epson\" \n";
            // $txt .= "copy testfile.txt \"\\\\localhost\EPSON LX-300+ \/II (Copy 1)\" \n";
            //$txt .= "copy testfile.txt \"\\\\::1\Epsonku\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\::1\Epsonku\" \n"; 
            
            // FORMAT XP 
            /*
            $txt .= "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n"; $previewRemoveTxt1 = "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n";
            $txt .= "print testfile.txt \n"; $previewRemoveTxt2 = "print testfile.txt \n";
             
             */
            
            // FORMAT windows 7
			/*
            $txt .= "copy testfile.txt \"\\\\::1\EPSON LX-310 KASIR\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\::1\EPSON LX-310 KASIR\" \n";
			*/
			
			// FORMAT WINDOWS 10
			//$txt .= "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n";
			  $txt .= "Notepad /p \"testfile.txt\" \n"; $previewRemoveTxt1 = "Notepad /p \"testfile.txt\" \n";
            
            $txt .= "del testfile.txt"; $previewRemoveTxt3 = "del testfile.txt";
			$txt .= "del ".$fileName; $previewRemoveTxt4 = "del ".$fileName;


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
			$txt = str_replace($previewRemoveTxt4,"", $txt);
            $txt = str_replace($previewRemoveTxt3,"", $txt);
            $txt = str_replace($previewRemoveTxt2,"", $txt);
            $txt = str_replace($previewRemoveTxt1,"", $txt);
            $txt = str_replace("\n","<br/>", $txt);
            $txt = str_replace("echo.>>","", $txt);
            $txt = str_replace("echo.>","", $txt);
            $txt = str_replace("echo","", $txt);
            $txt = str_replace(">>","", $txt);
            $txt = str_replace("testfile.txt","", $txt);
            $txt = str_replace(" ","&nbsp;", $txt);
            return $txt;
	}
	
	public function getTxt8($hasil){
        
        //$fileName = "test_local.bat";
        $fileName = $hasil["file_name"];
        $penandataTangan  = $hasil["penandatangan"];
       
            // $cairDate = date("d-m-Y", strtotime($hasil["cair_date"]));

            $dataPayment = array(
                "note" => $hasil["note"],
                "terbilang" => Erems_Box_Library_Terbilang::terbilang($hasil["total_payment"], 3)
            );

            $alamatPrint = '\\pc-snip026\EPSON LQ\/';
            $alamatPrintLocal = "";
            $maxStr = 50;
            /// POTONG KALIMAT YANG PANJANG
            $noteAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['note']);
            $terbilangAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['terbilang']);

            ///END POTONG KALIMAT YANG PANJANG

            $barisNote = 1;
            $barisTerbilang = 1;
            $barisMarginBotNote = 2;
            $barisMarginBotTerbilang = 2;

            $barisMarginBotNote = $barisMarginBotNote - count($noteAr) + 1;
            $barisMarginBotTerbilang = $barisMarginBotTerbilang - count($terbilangAr);
            
            $previewRemoveTxt1= "";$previewRemoveTxt2= "";$previewRemoveTxt3= "";
            

			//edited by Rizal 8 Maret 2019
             $txt = "echo.>testfile.txt \n";
	
			$txt .= "echo.>>testfile.txt \n";
			
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
			/*$txt .= "echo.>>testfile.txt \n"; */
			//endedited
			//$txt .= "echo.>>testfile.txt \n";
   
			// $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo                              " . $hasil["customer_name"] . " >>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
			
			
            foreach ($terbilangAr as $ta) {
                $txt .= "echo                              " . $ta . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotTerbilang; $i++) {
                $txt .= "echo.>>testfile.txt \n";
            }
			//$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
            foreach ($noteAr as $no) {
                $txt .= "echo                              " . preg_replace('/\s+/', ' ',$no) . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotNote; $i++) {
                $txt .= "echo.>>testfile.txt \n";
            }
			//$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
			
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo                                                      " . Erems_Box_Tools::formatDate($hasil["payment_date"]). " >>testfile.txt \n\n\n";
			
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
            $txt .= "echo                      " . Erems_Box_Tools::toCurrency($hasil["total_payment"])  . "  >>testfile.txt \n";

 
 
          //  $txt .= "echo              " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
            //$txt .= "echo                                                            " . $penandataTangan . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            //$txt .= "copy testfile.txt \"\\\\pc-snip026\EPSON LQ\" \n";
            // $txt .= "copy testfile.txt \"\\\\::1\Epson\" \n";
            // $txt .= "copy testfile.txt \"\\\\localhost\EPSON LX-300+ \/II (Copy 1)\" \n";
            //$txt .= "copy testfile.txt \"\\\\::1\Epsonku\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\::1\Epsonku\" \n"; 
            
            // FORMAT XP 
            /*
            $txt .= "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n"; $previewRemoveTxt1 = "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n";
            $txt .= "print testfile.txt \n"; $previewRemoveTxt2 = "print testfile.txt \n";
             
             */
            
            // FORMAT windows 7
			/*
            $txt .= "copy testfile.txt \"\\\\::1\EPSON LX-310 KASIR\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\::1\EPSON LX-310 KASIR\" \n";
			*/
			
			// FORMAT WINDOWS 10
			//$txt .= "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n";
			  $txt .= "Notepad /p \"testfile.txt\" \n"; $previewRemoveTxt1 = "Notepad /p \"testfile.txt\" \n";
            
            $txt .= "del testfile.txt"; $previewRemoveTxt3 = "del testfile.txt";
			$txt .= "del ".$fileName; $previewRemoveTxt4 = "del ".$fileName;


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
			$txt = str_replace($previewRemoveTxt4,"", $txt);
            $txt = str_replace($previewRemoveTxt3,"", $txt);
            $txt = str_replace($previewRemoveTxt2,"", $txt);
            $txt = str_replace($previewRemoveTxt1,"", $txt);
            $txt = str_replace("\n","<br/>", $txt);
            $txt = str_replace("echo.>>","", $txt);
            $txt = str_replace("echo.>","", $txt);
            $txt = str_replace("echo","", $txt);
            $txt = str_replace(">>","", $txt);
            $txt = str_replace("testfile.txt","", $txt);
            $txt = str_replace(" ","&nbsp;", $txt);
            return $txt;
	}
	
public function getTxt9($hasil){
        
        //$fileName = "test_local.bat";
        $fileName = $hasil["file_name"];
        $penandataTangan  = $hasil["penandatangan"];
       
            // $cairDate = date("d-m-Y", strtotime($hasil["cair_date"]));

            $dataPayment = array(
                "note" => $hasil["note"],
                "terbilang" => Erems_Box_Library_Terbilang::terbilang($hasil["total_payment"], 3)
            );

            $alamatPrint = '\\pc-snip026\EPSON LQ\/';
            $alamatPrintLocal = "";
            $maxStr = 75;
            /// POTONG KALIMAT YANG PANJANG
            $noteAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['note']);
            $terbilangAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['terbilang']);

            ///END POTONG KALIMAT YANG PANJANG

            $barisNote = 1;
            $barisTerbilang = 1;
            $barisMarginBotNote = 2;
            $barisMarginBotTerbilang = 3;

            $barisMarginBotNote = $barisMarginBotNote - count($noteAr) + 1;
            $barisMarginBotTerbilang = $barisMarginBotTerbilang - count($terbilangAr);
            
            $previewRemoveTxt1= "";$previewRemoveTxt2= "";$previewRemoveTxt3= "";
            

            $txt = "echo.>testfile.txt \n";
	
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
            $txt .= "echo                  " . $hasil["customer_name"] . " >>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
			
            foreach ($terbilangAr as $ta) {
                $txt .= "echo                  " . $ta . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotTerbilang; $i++) {
                $txt .= "echo.>>testfile.txt \n";
            }
            foreach ($noteAr as $no) {
                $txt .= "echo                  " . preg_replace('/\s+/', ' ',$no) . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotNote; $i++) {
                $txt .= "echo.>>testfile.txt \n";
            }
			

          
            $txt .= "echo                 " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . "                                             " . Erems_Box_Tools::formatDate($hasil["payment_date"]) . "  >>testfile.txt \n";

 
 
          //  $txt .= "echo              " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
            //$txt .= "echo                                                            " . $penandataTangan . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            //$txt .= "copy testfile.txt \"\\\\pc-snip026\EPSON LQ\" \n";
            // $txt .= "copy testfile.txt \"\\\\::1\Epson\" \n";
            // $txt .= "copy testfile.txt \"\\\\localhost\EPSON LX-300+ \/II (Copy 1)\" \n";
            //$txt .= "copy testfile.txt \"\\\\::1\Epsonku\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\::1\Epsonku\" \n"; 
            
            // FORMAT XP 
            /*
            $txt .= "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n"; $previewRemoveTxt1 = "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n";
            $txt .= "print testfile.txt \n"; $previewRemoveTxt2 = "print testfile.txt \n";
             
             */
            
            // FORMAT windows 7
			/*
            $txt .= "copy testfile.txt \"\\\\::1\EPSON LX-310 KASIR\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\::1\EPSON LX-310 KASIR\" \n";
			*/
			
			// FORMAT WINDOWS 10
			//$txt .= "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n";
			  $txt .= "Notepad /p \"testfile.txt\" \n"; $previewRemoveTxt1 = "Notepad /p \"testfile.txt\" \n";
            
            $txt .= "del testfile.txt"; $previewRemoveTxt3 = "del testfile.txt";
			$txt .= "del ".$fileName; $previewRemoveTxt4 = "del ".$fileName;


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
			$txt = str_replace($previewRemoveTxt4,"", $txt);
            $txt = str_replace($previewRemoveTxt3,"", $txt);
            $txt = str_replace($previewRemoveTxt2,"", $txt);
            $txt = str_replace($previewRemoveTxt1,"", $txt);
            $txt = str_replace("\n","<br/>", $txt);
            $txt = str_replace("echo.>>","", $txt);
            $txt = str_replace("echo.>","", $txt);
            $txt = str_replace("echo","", $txt);
            $txt = str_replace(">>","", $txt);
            $txt = str_replace("testfile.txt","", $txt);
            $txt = str_replace(" ","&nbsp;", $txt);
            return $txt;
	}

public function getTxt10($hasil){
        
        //$fileName = "test_local.bat";
        $fileName = $hasil["file_name"];
        $penandataTangan  = $hasil["penandatangan"];
       
            // $cairDate = date("d-m-Y", strtotime($hasil["cair_date"]));

            $dataPayment = array(
                "note" => $hasil["note"],
                "terbilang" => Erems_Box_Library_Terbilang::terbilang($hasil["total_payment"], 3)
            );

            $alamatPrint = '\\pc-snip026\EPSON LQ\/';
            $alamatPrintLocal = "";
            $maxStr = 75;
            /// POTONG KALIMAT YANG PANJANG
            $noteAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['note']);
            $terbilangAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['terbilang']);

            ///END POTONG KALIMAT YANG PANJANG

            $barisNote = 1;
            $barisTerbilang = 1;
            $barisMarginBotNote = 2;
            $barisMarginBotTerbilang = 2;

            $barisMarginBotNote = $barisMarginBotNote - count($noteAr) + 1;
            $barisMarginBotTerbilang = $barisMarginBotTerbilang - count($terbilangAr);
            
            $previewRemoveTxt1= "";$previewRemoveTxt2= "";$previewRemoveTxt3= "";
            

            $txt = "echo.>testfile.txt \n";
	
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
            $txt .= "echo                  " . $hasil["customer_name"] . " >>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
			
            foreach ($terbilangAr as $ta) {
                $txt .= "echo                  " . $ta . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotTerbilang; $i++) {
                $txt .= "echo.>>testfile.txt \n";
            }
            foreach ($noteAr as $no) {
                $txt .= "echo                  " . preg_replace('/\s+/', ' ',$no) . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotNote; $i++) {
                $txt .= "echo.>>testfile.txt \n";
            }
			

          
            $txt .= "echo                 " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . "                                             " . Erems_Box_Tools::formatDate($hasil["payment_date"]) . "  >>testfile.txt \n";

 
 
          //  $txt .= "echo              " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
            //$txt .= "echo                                                            " . $penandataTangan . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            //$txt .= "copy testfile.txt \"\\\\pc-snip026\EPSON LQ\" \n";
            // $txt .= "copy testfile.txt \"\\\\::1\Epson\" \n";
            // $txt .= "copy testfile.txt \"\\\\localhost\EPSON LX-300+ \/II (Copy 1)\" \n";
            //$txt .= "copy testfile.txt \"\\\\::1\Epsonku\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\::1\Epsonku\" \n"; 
            
            // FORMAT XP 
            /*
            $txt .= "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n"; $previewRemoveTxt1 = "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n";
            $txt .= "print testfile.txt \n"; $previewRemoveTxt2 = "print testfile.txt \n";
             
             */
            
            // FORMAT windows 7
			/*
            $txt .= "copy testfile.txt \"\\\\::1\EPSON LX-310 KASIR\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\::1\EPSON LX-310 KASIR\" \n";
			*/
			
			// FORMAT WINDOWS 10
			//$txt .= "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n";
			  $txt .= "Notepad /p \"testfile.txt\" \n"; $previewRemoveTxt1 = "Notepad /p \"testfile.txt\" \n";
            
            $txt .= "del testfile.txt"; $previewRemoveTxt3 = "del testfile.txt";
			$txt .= "del ".$fileName; $previewRemoveTxt4 = "del ".$fileName;


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
			$txt = str_replace($previewRemoveTxt4,"", $txt);
            $txt = str_replace($previewRemoveTxt3,"", $txt);
            $txt = str_replace($previewRemoveTxt2,"", $txt);
            $txt = str_replace($previewRemoveTxt1,"", $txt);
            $txt = str_replace("\n","<br/>", $txt);
            $txt = str_replace("echo.>>","", $txt);
            $txt = str_replace("echo.>","", $txt);
            $txt = str_replace("echo","", $txt);
            $txt = str_replace(">>","", $txt);
            $txt = str_replace("testfile.txt","", $txt);
            $txt = str_replace(" ","&nbsp;", $txt);
            return $txt;
	}

public function getTxt11($hasil){
        
        //$fileName = "test_local.bat";
        $fileName = $hasil["file_name"];
        $penandataTangan  = $hasil["penandatangan"];
       
            // $cairDate = date("d-m-Y", strtotime($hasil["cair_date"]));

            $dataPayment = array(
                "note" => $hasil["note"],
                "terbilang" => Erems_Box_Library_Terbilang::terbilang($hasil["total_payment"], 3)
            );

            $alamatPrint = '\\pc-snip026\EPSON LQ\/';
            $alamatPrintLocal = "";
            $maxStr = 62;
            /// POTONG KALIMAT YANG PANJANG
            $noteAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['note']);
            $terbilangAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['terbilang']);

            ///END POTONG KALIMAT YANG PANJANG

            $barisNote = 1;
            $barisTerbilang = 1;
            $barisMarginBotNote = 2;
            $barisMarginBotTerbilang = 3;

            $barisMarginBotNote = $barisMarginBotNote - count($noteAr) + 1;
            $barisMarginBotTerbilang = $barisMarginBotTerbilang - count($terbilangAr);
            
            $previewRemoveTxt1= "";$previewRemoveTxt2= "";$previewRemoveTxt3= "";
            

            $txt = "echo.>testfile.txt \n";
    
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            //$txt .= "echo.>>testfile.txt \n";
            $txt .= "echo        " . $hasil["customer_name"] . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            //$txt .= "echo.>>testfile.txt \n";
            
            foreach ($terbilangAr as $ta) {
                $txt .= "echo        " . $ta . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotTerbilang; $i++) {
                $txt .= "echo.>>testfile.txt \n";
            }
            foreach ($noteAr as $no) {
                $txt .= "echo        " . preg_replace('/\s+/', ' ',$no) . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotNote; $i++) {
                $txt .= "echo.>>testfile.txt \n";
            }
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";

          
            $txt .= "echo                 " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . "                                             " . Erems_Box_Tools::formatDate($hasil["payment_date"]) . "  >>testfile.txt \n";

 
 
          //  $txt .= "echo              " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            //$txt .= "echo                                                            " . $penandataTangan . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            //$txt .= "copy testfile.txt \"\\\\pc-snip026\EPSON LQ\" \n";
            // $txt .= "copy testfile.txt \"\\\\::1\Epson\" \n";
            // $txt .= "copy testfile.txt \"\\\\localhost\EPSON LX-300+ \/II (Copy 1)\" \n";
            //$txt .= "copy testfile.txt \"\\\\::1\Epsonku\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\::1\Epsonku\" \n"; 
            
            // FORMAT XP 
            /*
            $txt .= "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n"; $previewRemoveTxt1 = "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n";
            $txt .= "print testfile.txt \n"; $previewRemoveTxt2 = "print testfile.txt \n";
             
             */
            
            // FORMAT windows 7
            /*
            $txt .= "copy testfile.txt \"\\\\::1\EPSON LX-310 KASIR\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\::1\EPSON LX-310 KASIR\" \n";
            */
            
            // FORMAT WINDOWS 10
            //$txt .= "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n";
              $txt .= "Notepad /p \"testfile.txt\" \n"; $previewRemoveTxt1 = "Notepad /p \"testfile.txt\" \n";
            
            $txt .= "del testfile.txt"; $previewRemoveTxt3 = "del testfile.txt";
            $txt .= "del ".$fileName; $previewRemoveTxt4 = "del ".$fileName;


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
            $txt = str_replace($previewRemoveTxt4,"", $txt);
            $txt = str_replace($previewRemoveTxt3,"", $txt);
            $txt = str_replace($previewRemoveTxt2,"", $txt);
            $txt = str_replace($previewRemoveTxt1,"", $txt);
            $txt = str_replace("\n","<br/>", $txt);
            $txt = str_replace("echo.>>","", $txt);
            $txt = str_replace("echo.>","", $txt);
            $txt = str_replace("echo","", $txt);
            $txt = str_replace(">>","", $txt);
            $txt = str_replace("testfile.txt","", $txt);
            $txt = str_replace(" ","&nbsp;", $txt);
            return $txt;
    }

public function getTxt12($hasil){
        
        //$fileName = "test_local.bat";
        $fileName = $hasil["file_name"];
        $penandataTangan  = $hasil["penandatangan"];
       
            // $cairDate = date("d-m-Y", strtotime($hasil["cair_date"]));

            $dataPayment = array(
                "note" => $hasil["note"],
                "terbilang" => Erems_Box_Library_Terbilang::terbilang($hasil["total_payment"], 3)
            );

            $alamatPrint = '\\pc-snip026\EPSON LQ\/';
            $alamatPrintLocal = "";
            $maxStr = 75;
            /// POTONG KALIMAT YANG PANJANG
            $noteAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['note']);
            $terbilangAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['terbilang']);

            ///END POTONG KALIMAT YANG PANJANG

            $barisNote = 1;
            $barisTerbilang = 1;
            $barisMarginBotNote = 2;
            $barisMarginBotTerbilang = 2;

            $barisMarginBotNote = $barisMarginBotNote - count($noteAr) + 1;
            $barisMarginBotTerbilang = $barisMarginBotTerbilang - count($terbilangAr);
            
            $previewRemoveTxt1= "";$previewRemoveTxt2= "";$previewRemoveTxt3= "";
            

            $txt = "echo.>testfile.txt \n";
    
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo                  " . $hasil["customer_name"] . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            //$txt .= "echo.>>testfile.txt \n";
            
            foreach ($terbilangAr as $ta) {
                $txt .= "echo                  " . $ta . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotTerbilang; $i++) {
                $txt .= "echo.>>testfile.txt \n";
            }
            foreach ($noteAr as $no) {
                $txt .= "echo                  " . preg_replace('/\s+/', ' ',$no) . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotNote; $i++) {
                $txt .= "echo.>>testfile.txt \n";
            }
            

          
            $txt .= "echo                 " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . "                                             " . Erems_Box_Tools::formatDate($hasil["payment_date"]) . "  >>testfile.txt \n";

 
 
          //  $txt .= "echo              " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            //$txt .= "echo                                                            " . $penandataTangan . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            //$txt .= "copy testfile.txt \"\\\\pc-snip026\EPSON LQ\" \n";
            // $txt .= "copy testfile.txt \"\\\\::1\Epson\" \n";
            // $txt .= "copy testfile.txt \"\\\\localhost\EPSON LX-300+ \/II (Copy 1)\" \n";
            //$txt .= "copy testfile.txt \"\\\\::1\Epsonku\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\::1\Epsonku\" \n"; 
            
            // FORMAT XP 
            /*
            $txt .= "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n"; $previewRemoveTxt1 = "net use lpt1 \\\\mkt02\EPSONLX- /Persistent:Yes \n";
            $txt .= "print testfile.txt \n"; $previewRemoveTxt2 = "print testfile.txt \n";
             
             */
            
            // FORMAT windows 7
            /*
            $txt .= "copy testfile.txt \"\\\\::1\EPSON LX-310 KASIR\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\::1\EPSON LX-310 KASIR\" \n";
            */
            
            // FORMAT WINDOWS 10
            //$txt .= "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n";
              $txt .= "Notepad /p \"testfile.txt\" \n"; $previewRemoveTxt1 = "Notepad /p \"testfile.txt\" \n";
            
            $txt .= "del testfile.txt"; $previewRemoveTxt3 = "del testfile.txt";
            $txt .= "del ".$fileName; $previewRemoveTxt4 = "del ".$fileName;


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
            $txt = str_replace($previewRemoveTxt4,"", $txt);
            $txt = str_replace($previewRemoveTxt3,"", $txt);
            $txt = str_replace($previewRemoveTxt2,"", $txt);
            $txt = str_replace($previewRemoveTxt1,"", $txt);
            $txt = str_replace("\n","<br/>", $txt);
            $txt = str_replace("echo.>>","", $txt);
            $txt = str_replace("echo.>","", $txt);
            $txt = str_replace("echo","", $txt);
            $txt = str_replace(">>","", $txt);
            $txt = str_replace("testfile.txt","", $txt);
            $txt = str_replace(" ","&nbsp;", $txt);
            return $txt;
    }
	
	public function getTxt13($hasil){
        
        //$fileName = "test_local.bat";
        $fileName = $hasil["file_name"];
        $penandataTangan  = $hasil["penandatangan"];
       
            // $cairDate = date("d-m-Y", strtotime($hasil["cair_date"]));

            $dataPayment = array(
                "note" => $hasil["note"],
                "terbilang" => Erems_Box_Library_Terbilang::terbilang($hasil["total_payment"], 3)
            );

            $alamatPrint = '\\pc-snip026\EPSON LQ\/';
            $alamatPrintLocal = "";
            $maxStr = 60;
            /// POTONG KALIMAT YANG PANJANG
            $noteAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['note']);
            $terbilangAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['terbilang']);

            ///END POTONG KALIMAT YANG PANJANG

            $barisNote = 1;
            $barisTerbilang = 1;
            $barisMarginBotNote = 2;
            $barisMarginBotTerbilang = 2;

            $barisMarginBotNote = $barisMarginBotNote - count($noteAr) + 1;
            $barisMarginBotTerbilang = $barisMarginBotTerbilang - count($terbilangAr);
            
            $previewRemoveTxt1= "";$previewRemoveTxt2= "";$previewRemoveTxt3= "";
            

            $txt = "echo.>testfile.txt \n";
	
			// $txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
   
			//$txt .= "echo.>>testfile.txt \n";
            $txt .= "echo                   " . $hasil["customer_name"] . " >>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
			
			
            foreach ($terbilangAr as $ta) {
                $txt .= "echo                   " . $ta . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotTerbilang; $i++) {
                $txt .= "echo.>>testfile.txt \n";
            }
            foreach ($noteAr as $no) {
                $txt .= "echo                   " . preg_replace('/\s+/', ' ',$no) . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotNote; $i++) {
                $txt .= "echo.>>testfile.txt \n ";
            }
			$txt .= "echo.>>testfile.txt \n";
            $txt .= "echo           " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . "                                           " . Erems_Box_Tools::formatDate($hasil["payment_date"]) . "  >>testfile.txt \n";

			// FORMAT WINDOWS 10
			//$txt .= "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n";
			  $txt .= "Notepad /p \"testfile.txt\" \n"; $previewRemoveTxt1 = "Notepad /p \"testfile.txt\" \n";
            
            $txt .= "del testfile.txt"; $previewRemoveTxt3 = "del testfile.txt";
			$txt .= "del ".$fileName; $previewRemoveTxt4 = "del ".$fileName;


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
			$txt = str_replace($previewRemoveTxt4,"", $txt);
            $txt = str_replace($previewRemoveTxt3,"", $txt);
            $txt = str_replace($previewRemoveTxt2,"", $txt);
            $txt = str_replace($previewRemoveTxt1,"", $txt);
            $txt = str_replace("\n","<br/>", $txt);
            $txt = str_replace("echo.>>","", $txt);
            $txt = str_replace("echo.>","", $txt);
            $txt = str_replace("echo","", $txt);
            $txt = str_replace(">>","", $txt);
            $txt = str_replace("testfile.txt","", $txt);
            $txt = str_replace(" ","&nbsp;", $txt);
            return $txt;
	}
	
	public function getTxt14($hasil){
        
        //$fileName = "test_local.bat";
        $fileName = $hasil["file_name"];
        $penandataTangan  = $hasil["penandatangan"];
       
            // $cairDate = date("d-m-Y", strtotime($hasil["cair_date"]));

            $dataPayment = array(
                "note" => $hasil["note"],
                "terbilang" => Erems_Box_Library_Terbilang::terbilang($hasil["total_payment"], 3)
            );

            $alamatPrint = '\\pc-snip026\EPSON LQ\/';
            $alamatPrintLocal = "";
            $maxStr = 60;
            /// POTONG KALIMAT YANG PANJANG
            $noteAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['note']);
            $terbilangAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['terbilang']);

            ///END POTONG KALIMAT YANG PANJANG

            $barisNote = 1;
            $barisTerbilang = 1;
            $barisMarginBotNote = 2;
            $barisMarginBotTerbilang = 2;

            $barisMarginBotNote = $barisMarginBotNote - count($noteAr) + 1;
            $barisMarginBotTerbilang = $barisMarginBotTerbilang - count($terbilangAr);
            
            $previewRemoveTxt1= "";$previewRemoveTxt2= "";$previewRemoveTxt3= "";
            

           // $txt = "echo.>testfile.txt \n";
	
			// $txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
   
			//$txt .= "echo.>>testfile.txt \n";
            $txt .= "echo  " . $hasil["customer_name"] . " >>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
			
			
            foreach ($terbilangAr as $ta) {
                $txt .= "echo    " . $ta . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotTerbilang; $i++) {
                $txt .= "echo.>>testfile.txt \n";
            }
            foreach ($noteAr as $no) {
                $txt .= "echo    " . preg_replace('/\s+/', ' ',$no) . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotNote; $i++) {
                $txt .= "echo.>>testfile.txt \n ";
            }
			//$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
            $txt .= "echo" . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . "                                           " . Erems_Box_Tools::formatDate($hasil["payment_date"]) . "  >>testfile.txt \n";

			// FORMAT WINDOWS 10
			//$txt .= "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n"; $previewRemoveTxt1 = "copy testfile.txt \"\\\\localhost\EPSON LX-310 ESCP\" \n";
			  $txt .= "Notepad /p \"testfile.txt\" \n"; $previewRemoveTxt1 = "Notepad /p \"testfile.txt\" \n";
            
            $txt .= "del testfile.txt"; $previewRemoveTxt3 = "del testfile.txt";
			$txt .= "del ".$fileName; $previewRemoveTxt4 = "del ".$fileName;


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
			$txt = str_replace($previewRemoveTxt4,"", $txt);
            $txt = str_replace($previewRemoveTxt3,"", $txt);
            $txt = str_replace($previewRemoveTxt2,"", $txt);
            $txt = str_replace($previewRemoveTxt1,"", $txt);
            $txt = str_replace("\n","<br/>", $txt);
            $txt = str_replace("echo.>>","", $txt);
            $txt = str_replace("echo.>","", $txt);
            $txt = str_replace("echo","", $txt);
            $txt = str_replace(">>","", $txt);
            $txt = str_replace("testfile.txt","", $txt);
            $txt = str_replace(" ","&nbsp;", $txt);
            return $txt;
	}

	}