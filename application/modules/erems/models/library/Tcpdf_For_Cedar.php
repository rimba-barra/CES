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

class Erems_Models_Library_Tcpdf {

    private $fileName;

    public function run(Erems_Box_Models_App_Session $ses, $dataPayments, $sortPaymentIds) {

        $fileName = 'payment_' . $ses->getProject()->getId() . '_' . $ses->getPt()->getId() . '.pdf';

        $this->fileName = $fileName;

        $maxStr = 80; // adobe reader xi
        $maxStr = 70; // adobe reader x
        $lineHeight = 4;
        $jumlahLineSpaceNote = 5;
        $jumlahLineSpaceTerbilang = 5;
        
        $penguranganLine = 0.30; // jumlah pengurangan line tiap halaman


        $custom_layout = array(260, 140);

        //$pdf = new TCPDF('P', 'cm',$custom_layout, true, 'UTF-8', false);
        //   $pdf = new TCPDF('P', 'mm',$custom_layout, true, 'UTF-8', false);
        //$pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);
        $pdf = new TCPDF('P', 'mm', 'A42', true, 'UTF-8', false);
        $pdf->SetAuthor('MIS');
        $pdf->SetTitle('Payment');
        $pdf->SetAutoPageBreak(true, 0);
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);


        // Set some content to print
        /*   $html = <<<EOD
          <h1>Welcome to <a href="http://www.tcpdf.org" style="text-decoration:none;background-color:#CC0000;color:black;">&nbsp;<span style="color:black;">TC</span><span style="color:white;">PDF</span>&nbsp;</a>!</h1>
          <i>This is the first example of TCPDF library.</i>
          <p>This text is printed using the <i>writeHTMLCell()</i> method but you can also use: <i>Multicell(), writeHTML(), Write(), Cell() and Text()</i>.</p>
          <p>Please check the source code documentation and other examples for further information.</p>
          <p style="color:#CC0000;">TO IMPROVE AND EXPAND TCPDF I NEED YOUR SUPPORT, PLEASE <a href="http://sourceforge.net/donate/index.php?group_id=128076">MAKE A DONATION!</a></p>
          EOD; */
        /* $html =<<<EOD
          <div>".$dataPayment['customer']."</div>
          <div>".$dataPayment['terbilang']."</div>
          <div>".$dataPayment['note']."</div>
          <div>".$dataPayment['date']."</div>
          <div>".$dataPayment['amount']."</div>"EOD;

         */
        $paymentIdsAr = explode("~", $sortPaymentIds);

        $currentStartLine = 32;
        $currentPage = 0;
        
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

                        $jumlahLineSpaceNote = $jumlahLineSpaceNote - count($noteAr) - 1;
                        $jumlahLineSpaceTerbilang = $jumlahLineSpaceTerbilang - count($terbilangAr) - 1;


                        // $pdf->SetFont('courier', '', 10);
                        $pdf->SetFontSize(10);
                        $pdf->Write($currentStartLine, " \n");
                        $pdf->Write(1, "                 " . $customer . " \n");
                        $pdf->Write(16, " \n");
                        foreach ($terbilangAr as $t) {
                            $pdf->Write(1, "                 " . $t . " \n");
                        }
                        $pdf->Write(2 + ($jumlahLineSpaceTerbilang * $lineHeight), " \n");
                        foreach ($noteAr as $n) {
                            $pdf->Write(1, "                 " . $n . " \n");
                        }
                        $pdf->Write(12 + ($jumlahLineSpaceNote * $lineHeight), " \n");

                        $pdf->Write(3, "                                                                                                             " . $date . " \n");
                        $pdf->Write(1, " " . $amount . " \n");
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

        /*
        foreach ($dataPayments as $dataPayment) {


            $pdf->AddPage();

            $customer = $dataPayment['customer'];

            /// potong kalimat;
            $terbilangAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['terbilang']);


            /// potong kalimat;




            $noteAr = Erems_Box_Tools::potongKalimat($maxStr, $dataPayment['note']);


            $date = $dataPayment['date'];
            $amount = $dataPayment['amount'];

            $jumlahLineSpaceNote = $jumlahLineSpaceNote - count($noteAr) - 1;
            $jumlahLineSpaceTerbilang = $jumlahLineSpaceTerbilang - count($terbilangAr) - 1;


            // $pdf->SetFont('courier', '', 10);
            $pdf->SetFontSize(10);
            $pdf->Write(32, " \n");
            $pdf->Write(1, "                 " . $customer . " \n");
            $pdf->Write(16, " \n");
            foreach ($terbilangAr as $t) {
                $pdf->Write(1, "                 " . $t . " \n");
            }
            $pdf->Write(2 + ($jumlahLineSpaceTerbilang * $lineHeight), " \n");
            foreach ($noteAr as $n) {
                $pdf->Write(1, "                 " . $n . " \n");
            }
            $pdf->Write(12 + ($jumlahLineSpaceNote * $lineHeight), " \n");

            $pdf->Write(3, "                                                                                                             " . $date . " \n");
            $pdf->Write(1, " " . $amount . " \n");
            $pdf->Write(18, " \n");
            //$pdf->Write(1,"-------------------------------------------------------------------------------- \n");
            $pdf->Write(1, " \n");

            /// reset line
            $jumlahLineSpaceNote = 5;
            $jumlahLineSpaceTerbilang = 5;
        }
         
         */


        // $pdf->writeHTML($html,0);
// ---------------------------------------------------------
// Close and output PDF document
// This method has several options, check the source code documentation for more information.
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
