<?php
 
/**
 * Description of DosAerolinkBatam
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Library_DosCitraMajaNonLink implements Erems_Models_Payment_PrintBisaMulti{
    public function getTxt($hasil){
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
            $maxStr = 65;
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
			
			//$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
   
            $txt .= "echo                                  " . $hasil["customer_name"] . " >>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			
            foreach ($terbilangAr as $ta) {
                $txt .= "echo                                  " . $ta . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotTerbilang; $i++) {
                $txt .= "echo.>>testfile.txt \n";
            }
            foreach ($noteAr as $no) {
                $txt .= "echo                                  " . preg_replace('/\s+/', ' ',$no) . " >>testfile.txt \n";
            }
            for ($i = 0; $i < $barisMarginBotNote; $i++) {
                $txt .= "echo.>>testfile.txt \n";
            }
			$txt .= "echo.>>testfile.txt \n";
		//	$txt .= "echo.>>testfile.txt \n";
			
	// $txt .= "echo                                                                    " . Erems_Box_Tools::formatDate($hasil["payment_date"]) . " >>testfile.txt \n";

          
            $txt .= "echo                                                               " . Erems_Box_Tools::formatDate($hasil["payment_date"])  ."  >>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			//$txt .= "echo.>>testfile.txt \n";
 
			$txt .= "echo                          " . Erems_Box_Tools::toCurrency($hasil["total_payment"]) . " >>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
            $txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
			$txt .= "echo.>>testfile.txt \n";
            //$txt .= "echo                                                             " . $penandataTangan . " >>testfile.txt \n";
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
    
    public function getOptions() {
        return array(
			  array("value"=>1,"text"=>"Template","selected"=>false,"user_id"=>13375),
        );
    }

    public function runMulti(\Erems_Box_Models_App_Session $ses, $dataPayments, $sortPaymentIds, $option) {
        if($option==1){
            return $this->getTxt($dataPayments);
		}
    }

    
	
	

}
