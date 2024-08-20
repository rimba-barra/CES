<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Tcpdf
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../../library/tcpdf/tcpdf.php';

class Erems_Models_Library_TcpdfBmwCilegon {

    private $fileName;

    public function run(Erems_Box_Models_App_Session $ses, $dataPayments, $sortPaymentIds) {

        $fileName = 'payment_' . $ses->getProject()->getId() . '_' . $ses->getPt()->getId() . '.pdf';

        $this->fileName = $fileName;

        $maxStr = 80; // adobe reader xi
        $maxStr = 70; // adobe reader x
        $lineHeight = Erems_Box_KwitansiSpasiManager::$params[$ses->getProject()->getId() . '_' . $ses->getPt()->getId()]["ln_lineheight"];
        $jumlahLineSpaceNote = Erems_Box_KwitansiSpasiManager::$params[$ses->getProject()->getId() . '_' . $ses->getPt()->getId()]["ln_note"];
        $jumlahLineSpaceTerbilang = Erems_Box_KwitansiSpasiManager::$params[$ses->getProject()->getId() . '_' . $ses->getPt()->getId()]["ln_terbilang"];
        $faktorSpaceNote = Erems_Box_KwitansiSpasiManager::$params[$ses->getProject()->getId() . '_' . $ses->getPt()->getId()]["ln_note_add"];
        $faktorSpaceTerbilang = Erems_Box_KwitansiSpasiManager::$params[$ses->getProject()->getId() . '_' . $ses->getPt()->getId()]["ln_terbilang_add"];
        $penguranganLine = 0.30; // jumlah pengurangan line tiap halaman


        $custom_layout = array(260, 140);

      
        $pdf = new TCPDF('P', 'mm', 'A42', true, 'UTF-8', false);
      
        $pdf->SetAuthor('MIS');
        $pdf->SetTitle('Payment');
        $pdf->SetAutoPageBreak(true, 0);
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);
        


        
        $paymentIdsAr = explode("~", $sortPaymentIds);

        $currentStartLine = Erems_Box_KwitansiSpasiManager::$params[$ses->getProject()->getId() . '_' . $ses->getPt()->getId()]["top_newline"];
        $currentPage = 0;
        $textTab = Erems_Box_KwitansiSpasiManager::$params[$ses->getProject()->getId() . '_' . $ses->getPt()->getId()]["tab"];
        $tanggalTab = Erems_Box_KwitansiSpasiManager::$params[$ses->getProject()->getId() . '_' . $ses->getPt()->getId()]["tab_tanggal"];
        $jumlahTab = Erems_Box_KwitansiSpasiManager::$params[$ses->getProject()->getId() . '_' . $ses->getPt()->getId()]["tab_total"];
        $cnline = Erems_Box_KwitansiSpasiManager::$params[$ses->getProject()->getId() . '_' . $ses->getPt()->getId()]["customer_newline"];
        $dateLine = Erems_Box_KwitansiSpasiManager::$params[$ses->getProject()->getId() . '_' . $ses->getPt()->getId()]["date_newline"];
        $noteLine = Erems_Box_KwitansiSpasiManager::$params[$ses->getProject()->getId() . '_' . $ses->getPt()->getId()]["note_newline"];

        
        
/// sort hasil print
        foreach ($paymentIdsAr as $payId) {
            if (intval($payId) > 0) {
                foreach ($dataPayments as $dataPayment) {
                    if ($dataPayment["id"] == $payId) {
                        

                        $pdf->AddPage();

                        $customer = $dataPayment['customer'];

                        /// potong kalimat;
                        $terbilangAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['terbilang']);


                        /// potong kalimat;


                        

                        $noteAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['note']);


                        $date = $dataPayment['date'];
                        $amount = $dataPayment['amount'];
                        
                        //$nominaldanTanggal = $amount."                                                                                  ".$date;
                        
                        $finalSpaceString = "";
                        $jumlahSpace = 120;
               
                        for($i=0;$i<$jumlahSpace-strlen($amount);$i++){
                            $finalSpaceString .=" ";
                        }
                        $nominaldanTanggal = $amount."".$finalSpaceString."".$date;
                        
                        
                        $jumlahLineSpaceNote = $jumlahLineSpaceNote - count($noteAr) - 1;
                        $jumlahLineSpaceTerbilang = $jumlahLineSpaceTerbilang - count($terbilangAr) - 1;

                    
                        
                        // $pdf->SetFont('courier', '', 10);
                        $pdf->SetFontSize(10);
                        $pdf->Write($currentStartLine, " \n");
                        $pdf->Write(1, $textTab . $customer . " \n");
                        $pdf->Write($cnline, " \n");
                      
                        foreach ($terbilangAr as $t) {
                            
                            $pdf->Write(1, $textTab . $t . " \n");
                            
                        }
                       
                        if(intval($jumlahLineSpaceTerbilang) > 0){
                           $pdf->Write($faktorSpaceTerbilang + ($jumlahLineSpaceTerbilang * $lineHeight), " \n"); 
                        }
                        
                        foreach ($noteAr as $n) {
                            $pdf->Write(1, $textTab . $n . " \n");
                        }
                        
                       
                        $pdf->Write($faktorSpaceNote + ($jumlahLineSpaceNote * $lineHeight), " \n");
                         
                         

                        $pdf->Write($noteLine, $jumlahTab . $nominaldanTanggal . " \n");
                       // $pdf->Write($dateLine, $jumlahTab . $amount . " \n");
                        $pdf->Write(18, " \n");
                        //$pdf->Write(1,"-------------------------------------------------------------------------------- \n");
                        $pdf->Write(1, " \n");

                        /// reset line
                        $jumlahLineSpaceNote = 5;
                        $jumlahLineSpaceTerbilang = 5;
                        $currentStartLine -= $penguranganLine;
                        $currentPage++;
                    }
                }
            }
        }

       
        $pdf->Output(APPLICATION_PATH . '/../public/app/erems/uploads/pdf/kwitansipayment/' . $fileName, 'F');
    }

    public function getFileName() {
        return $this->fileName;
    }

    private function getSpasi() {
        return "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }

}

?>
