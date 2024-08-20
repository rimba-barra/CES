<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Tcpdf
 *
 * @author Semy
 */
require_once dirname(__DIR__) . '../../library/tcpdf/tcpdf.php';

class Erems_Models_Library_TemplateCitralandBagyaMedan implements Erems_Models_Payment_PrintBisaMulti{

    private $fileName;
    private $params = array(
        "top_rowcount" => 2, // jumlah baris yang di tambahkan paling atas
        "customer_newline" => 3, // jumlah baris yang di tambahkan setelah customer
        "ln_note" => 2, // ln_note_add + (ln_terbilang * ln_lineheight) -- new line setelah note
        "tab" => "                                          ", // jumlah spasi,
        "tab_tanggal" => "                                                                                                                  ", // spasi tanggal
        "tab_total" => "         ", // spasi total pembayaran in angka
        "ln_lineheight" => 4,
        "ln_terbilang_add" => 2,
        "ln_terbilang" => 5, // ln_terbilang_add + (ln_terbilang * ln_lineheight) -- new line setelah terbilang
        "ln_note_add" => 12,
        "ln_note" => 2, // ln_note_add + (ln_terbilang * ln_lineheight) -- new line setelah note
        "date_newline" => 1,
        "note_newline" => 2
    );
    // add by IH on 17-01-2019
    public function getOptions() {
        return array(
            array("value"=>1,"text"=>"Template 1 ( Vivi ) ","selected"=>true,"user_id"=>1321),
            array("value"=>2,"text"=>"Template 2 ( Vienna )","selected"=>false,"user_id"=>1320),
			array("value"=>3,"text"=>"Template 2 ( Mellani )","selected"=>false,"user_id"=>7810)
        );
    }

    public function runMulti(\Erems_Box_Models_App_Session $ses, $dataPayments, $sortPaymentIds, $option) {
        if($option==1){
            $this->runTemplateSatu($ses, $dataPayments, $sortPaymentIds);
        }else if($option==2){
            $this->runTemplateDua($ses, $dataPayments, $sortPaymentIds);
        }else if($option==3){
            $this->runTemplateTiga($ses, $dataPayments, $sortPaymentIds);
        }
    }
    public function runTemplateSatu(Erems_Box_Models_App_Session $ses, $dataPayments, $sortPaymentIds) {

        $fileName = 'payment_' . $ses->getProject()->getId() . '_' . $ses->getPt()->getId() . '.pdf';
        $filePath = APPLICATION_PATH . '/../public/app/erems/uploads/pdf/kwitansipayment/' . $fileName;
        if (file_exists($filePath)) {
            unlink($filePath);
        }

        $this->fileName = $fileName;

        $maxStr = 80; // adobe reader xi
        $maxStr = 70; // adobe reader x
        $lineHeight = $this->params["ln_lineheight"];
        $jumlahLineSpaceNote = $this->params["ln_note"];
        $jumlahLineSpaceTerbilang = $this->params["ln_terbilang"];
        $faktorSpaceNote = $this->params["ln_note_add"];
        $faktorSpaceTerbilang = $this->params["ln_terbilang_add"];

        $penguranganLine = 0.30; // jumlah pengurangan line tiap halaman


        $custom_layout = array(260, 140);


        $pdf = new TCPDF('P', 'mm', 'A42', true, 'UTF-8', false);



        $pdf->SetAuthor('MIS');
        $pdf->SetTitle('Payment');
        $pdf->SetAutoPageBreak(true, 0);
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);

        $paymentIdsAr = explode("~", $sortPaymentIds);
        $currentStartLine = 0; // tidak dipakai
        $topRowCount = $this->params["top_rowcount"];
        $currentPage = 0;
        $textTab = $this->params["tab"];
        $tanggalTab = $this->params["tab_tanggal"];
        $jumlahTab = $this->params["tab_total"];
        $cnline = $this->params["customer_newline"];
        $dateLine = $this->params["date_newline"];
        $noteLine = $this->params["note_newline"];

/// sort hasil print
        
        $heightAwal = 50;
        
        
        foreach ($paymentIdsAr as $payId) {
            if (intval($payId) > 0) {
                foreach ($dataPayments as $dataPayment) {
                    if ($dataPayment["id"] == $payId) {
                        $pdf->AddPage();

                        $noteAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['note']);
                         $terbilangAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['terbilang']);

                        $html = '<table width="550">
  <tr>
    <td>&nbsp;</td>
    <td colspan="2" height="75">&nbsp;</td>
  </tr>   
  <tr>
    <td width="120">&nbsp;</td>
    <td height="50" colspan="2" valign="bottom">' . $dataPayment['customer'] . '</td>
  </tr>';
                        
                        for ($i = 0; $i < count($terbilangAr); $i++) {
                            $height = "";
                            if($i==count($terbilangAr)-1){
                                $height = $i==0?$heightAwal:$heightAwal-(10*$i);
                                $height = 'height="'.$height.'"';
                            }
                            $html .='<tr>'
                                    . '<td width="100">&nbsp;</td>
                                    '
                                    . '<td colspan="2" '.$height.'>'. $terbilangAr[$i]. '</td>'
                                    . '</tr>';
                        }
                        for ($i = 0; $i < count($noteAr); $i++) {
                            $height = "";
                            if($i==count($noteAr)-1){
                                $height = $i==0?$heightAwal:$heightAwal-(10*$i);
                                $height = 'height="'.($height-5).'"';
                            }
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>
                                    '
                                    . '<td colspan="2" '.$height.'>'. $noteAr[$i]. '</td>'
                                    . '</tr>';
                        }




                        $html .='<tr>
    <td width="100">&nbsp;</td>
    <td width="300">&nbsp;</td>
        <td width="150" height="30">&nbsp;</td>
  </tr>';
                        
  $html .=' <tr>
    <td width="100">&nbsp;</td>
    <td width="300">' . $dataPayment['amount'] . '</td>
    <td>'.$dataPayment['date'] . '</td>
  </tr>';
 
  
$html .='</table>';
                        
                        $pdf->writeHTML($html, true, false, true, false, '');
                    }
                }
            }
        }


        $pdf->Output($filePath, 'F');
    }
    public function runTemplateDua(Erems_Box_Models_App_Session $ses, $dataPayments, $sortPaymentIds) {

        $fileName = 'payment_' . $ses->getProject()->getId() . '_' . $ses->getPt()->getId() . '.pdf';
        $filePath = APPLICATION_PATH . '/../public/app/erems/uploads/pdf/kwitansipayment/' . $fileName;
        if (file_exists($filePath)) {
            unlink($filePath);
        }

        $this->fileName = $fileName;

        $maxStr = 80; // adobe reader xi
        $maxStr = 70; // adobe reader x
        $lineHeight = $this->params["ln_lineheight"];
        $jumlahLineSpaceNote = $this->params["ln_note"];
        $jumlahLineSpaceTerbilang = $this->params["ln_terbilang"];
        $faktorSpaceNote = $this->params["ln_note_add"];
        $faktorSpaceTerbilang = $this->params["ln_terbilang_add"];

        $penguranganLine = 0.30; // jumlah pengurangan line tiap halaman


        $custom_layout = array(260, 140);


        $pdf = new TCPDF('P', 'mm', 'A42', true, 'UTF-8', false);



        $pdf->SetAuthor('MIS');
        $pdf->SetTitle('Payment');
        $pdf->SetAutoPageBreak(true, 0);
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);

        $paymentIdsAr = explode("~", $sortPaymentIds);
        $currentStartLine = 0; // tidak dipakai
        $topRowCount = $this->params["top_rowcount"];
        $currentPage = 0;
        $textTab = $this->params["tab"];
        $tanggalTab = $this->params["tab_tanggal"];
        $jumlahTab = $this->params["tab_total"];
        $cnline = $this->params["customer_newline"];
        $dateLine = $this->params["date_newline"];
        $noteLine = $this->params["note_newline"];

/// sort hasil print
        
        $heightAwal = 50;
        
        
        foreach ($paymentIdsAr as $payId) {
            if (intval($payId) > 0) {
                foreach ($dataPayments as $dataPayment) {
                    if ($dataPayment["id"] == $payId) {
                        $pdf->AddPage();

                        $noteAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['note']);
                         $terbilangAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['terbilang']);

                        $html = '<table width="550">
  <tr>
    <td>&nbsp;</td>
    <td colspan="2" height="75">&nbsp;</td>
  </tr>   
  <tr>
    <td width="120">&nbsp;</td>
    <td height="50" colspan="2" valign="bottom">' . $dataPayment['customer'] . '</td>
  </tr>';
                        
                        for ($i = 0; $i < count($terbilangAr); $i++) {
                            $height = "";
                            if($i==count($terbilangAr)-1){
                                $height = $i==0?$heightAwal:$heightAwal-(10*$i);
                                $height = 'height="'.$height.'"';
                            }
                            $html .='<tr>'
                                    . '<td width="100">&nbsp;</td>
                                    '
                                    . '<td colspan="2" '.$height.'>'. $terbilangAr[$i]. '</td>'
                                    . '</tr>';
                        }
                        for ($i = 0; $i < count($noteAr); $i++) {
                            $height = "";
                            if($i==count($noteAr)-1){
                                $height = $i==0?$heightAwal:$heightAwal-(10*$i);
                                $height = 'height="'.($height-5).'"';
                            }
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>
                                    '
                                    . '<td colspan="2" '.$height.'>'. $noteAr[$i]. '</td>'
                                    . '</tr>';
                        }




                        $html .='<tr>
    <td width="100">&nbsp;</td>
    <td width="300">&nbsp;</td>
        <td width="150" height="30">&nbsp;</td>
  </tr>';
                        
  $html .=' <tr>
    <td width="100">&nbsp;</td>
    <td width="300">' . $dataPayment['amount'] . '</td>
    <td>'.$dataPayment['date'] . '</td>
  </tr>';
 
  
$html .='</table>';
                        
                        $pdf->writeHTML($html, true, false, true, false, '');
                    }
                }
            }
        }


        $pdf->Output($filePath, 'F');
    }
    public function runTemplateTiga(Erems_Box_Models_App_Session $ses, $dataPayments, $sortPaymentIds) {

        $fileName = 'payment_' . $ses->getProject()->getId() . '_' . $ses->getPt()->getId() . '.pdf';
        $filePath = APPLICATION_PATH . '/../public/app/erems/uploads/pdf/kwitansipayment/' . $fileName;
        if (file_exists($filePath)) {
            unlink($filePath);
        }

        $this->fileName = $fileName;

        $maxStr = 80; // adobe reader xi
        $maxStr = 70; // adobe reader x
        $lineHeight = $this->params["ln_lineheight"];
        $jumlahLineSpaceNote = $this->params["ln_note"];
        $jumlahLineSpaceTerbilang = $this->params["ln_terbilang"];
        $faktorSpaceNote = $this->params["ln_note_add"];
        $faktorSpaceTerbilang = $this->params["ln_terbilang_add"];

        $penguranganLine = 0.30; // jumlah pengurangan line tiap halaman


        $custom_layout = array(260, 140);


        $pdf = new TCPDF('P', 'mm', 'A42', true, 'UTF-8', false);



        $pdf->SetAuthor('MIS');
        $pdf->SetTitle('Payment');
        $pdf->SetAutoPageBreak(true, 0);
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);

        $paymentIdsAr = explode("~", $sortPaymentIds);
        $currentStartLine = 0; // tidak dipakai
        $topRowCount = $this->params["top_rowcount"];
        $currentPage = 0;
        $textTab = $this->params["tab"];
        $tanggalTab = $this->params["tab_tanggal"];
        $jumlahTab = $this->params["tab_total"];
        $cnline = $this->params["customer_newline"];
        $dateLine = $this->params["date_newline"];
        $noteLine = $this->params["note_newline"];

/// sort hasil print
        
        $heightAwal = 50;
        
        
        foreach ($paymentIdsAr as $payId) {
            if (intval($payId) > 0) {
                foreach ($dataPayments as $dataPayment) {
                    if ($dataPayment["id"] == $payId) {
                        $pdf->AddPage();

                        $noteAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['note']);
                         $terbilangAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['terbilang']);

                        $html = '<table width="550">
  <tr>
    <td>&nbsp;</td>
    <td colspan="2" height="75">&nbsp;</td>
  </tr>   
  <tr>
    <td width="120">&nbsp;</td>
    <td height="50" colspan="2" valign="bottom">' . $dataPayment['customer'] . '</td>
  </tr>';
                        
                        for ($i = 0; $i < count($terbilangAr); $i++) {
                            $height = "";
                            if($i==count($terbilangAr)-1){
                                $height = $i==0?$heightAwal:$heightAwal-(10*$i);
                                $height = 'height="'.$height.'"';
                            }
                            $html .='<tr>'
                                    . '<td width="100">&nbsp;</td>
                                    '
                                    . '<td colspan="2" '.$height.'>'. $terbilangAr[$i]. '</td>'
                                    . '</tr>';
                        }
                        for ($i = 0; $i < count($noteAr); $i++) {
                            $height = "";
                            if($i==count($noteAr)-1){
                                $height = $i==0?$heightAwal:$heightAwal-(10*$i);
                                $height = 'height="'.($height-5).'"';
                            }
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>
                                    '
                                    . '<td colspan="2" '.$height.'>'. $noteAr[$i]. '</td>'
                                    . '</tr>';
                        }




                        $html .='<tr>
    <td width="100">&nbsp;</td>
    <td width="300">&nbsp;</td>
        <td width="150" height="30">&nbsp;</td>
  </tr>';
                        
  $html .=' <tr>
    <td width="100">&nbsp;</td>
    <td width="300">' . $dataPayment['amount'] . '</td>
    <td>'.$dataPayment['date'] . '</td>
  </tr>';
 
  
$html .='</table>';
                        
                        $pdf->writeHTML($html, true, false, true, false, '');
                    }
                }
            }
        }


        $pdf->Output($filePath, 'F');
    }

    public function getFileName() {
        return $this->fileName;
    }

    private function getSpasi() {
        return "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }

    /*
      public function run(Erems_Box_Models_App_Session $ses, $dataPayments, $sortPaymentIds) {

      $fileName = 'payment_' . $ses->getProject()->getId() . '_' . $ses->getPt()->getId() . '.pdf';

      $this->fileName = $fileName;

      $maxStr = 80; // adobe reader xi
      $maxStr = 70; // adobe reader x
      $lineHeight = $this->params["ln_lineheight"];
      $jumlahLineSpaceNote = $this->params["ln_note"];
      $jumlahLineSpaceTerbilang = $this->params["ln_terbilang"];
      $faktorSpaceNote = $this->params["ln_note_add"];
      $faktorSpaceTerbilang = $this->params["ln_terbilang_add"];

      $penguranganLine = 0.30; // jumlah pengurangan line tiap halaman


      $custom_layout = array(260, 140);


      $pdf = new TCPDF('P', 'mm', 'A42', true, 'UTF-8', false);



      $pdf->SetAuthor('MIS');
      $pdf->SetTitle('Payment');
      $pdf->SetAutoPageBreak(true, 0);
      $pdf->setPrintHeader(false);
      $pdf->setPrintFooter(false);

      $paymentIdsAr = explode("~", $sortPaymentIds);
      $currentStartLine = 0; // tidak dipakai
      $topRowCount = $this->params["top_rowcount"];
      $currentPage = 0;
      $textTab = $this->params["tab"];
      $tanggalTab = $this->params["tab_tanggal"];
      $jumlahTab = $this->params["tab_total"];
      $cnline = $this->params["customer_newline"];
      $dateLine = $this->params["date_newline"];
      $noteLine = $this->params["note_newline"];

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

      // $fontname = $pdf->addTTFfont(‘/path-to-font/DejaVuSans.ttf’, ‘TrueTypeUnicode’, “, 32);
      $fontname = TCPDF_FONTS::addTTFfont(APPLICATION_PATH . '/../public/app/erems/fonts/tahoma.ttf', 'TrueTypeUnicode', '', 96);

      // use the font
      $pdf->SetFont($fontname, '', 14, '', false);

      //$pdf->SetFont('courier', '', 10);
      $pdf->SetFontSize(12);


      for ($i = 0; $i < $topRowCount; $i++) {
      $pdf->Write(1, " \n");
      }
      $pdf->Write(1, $textTab . $customer . " \n");
      for ($i = 0; $i < $cnline; $i++) {
      $pdf->Write(1, " \n");
      }
      //  $pdf->Write($cnline, " \n");

      foreach ($terbilangAr as $t) {

      $pdf->Write(1, $textTab . $t . " \n");
      }

      $totalLineAfterTerbilang = 0;
      $totalLineAfterTerbilang = 4-count($terbilangAr);

      for ($i = 0; $i < $totalLineAfterTerbilang; $i++) {
      $pdf->Write(1, " \n");
      }

      foreach ($noteAr as $n) {
      $pdf->Write(1, $textTab . $n . " \n");
      }
      $totalLineAfterNote = 0;
      $totalLineAfterNote = 4-count($noteAr);

      for ($i = 0; $i < $totalLineAfterNote; $i++) {
      $pdf->Write(1, " \n");
      }

      //$pdf->Write(0.5,"    \n"); --> khusus $noteAr 3
      // $pdf->Write(0.1,"    \n");  // ---> khusus $noteAr 2
      $pdf->Write(count($noteAr)==3?0.5:0.1,"    \n");

      $pdf->Write($noteLine, $tanggalTab . $date . " \n");
      $pdf->Write($dateLine, $jumlahTab . $amount . " \n");
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
     */
}

?>
