<?php


/**
 * Description of Tcpdf
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../../library/tcpdf/tcpdf.php';

class Erems_Models_Library_TcpdfCitralandGamaCityMedan implements Erems_Models_Payment_PrintBisaMulti{

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
    public $tipe = 1; // 1 untuk installment , 2 untuk others

    public function run(Erems_Box_Models_App_Session $ses, $dataPayments, $sortPaymentIds) {

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


        $custom_layout = array(216, 330); //folio

		//$pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);
        $pdf = new TCPDF('P', 'mm', $custom_layout, true, 'UTF-8', false);



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
						
		        $pdf->SetFontSize(11);

                     //   $noteAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['note']);
                       //  $terbilangAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['terbilang']);

                        
                        $html = '<table>
  <tr>
    <td>&nbsp;</td>
    <td colspan="2" height="92">&nbsp;</td>
  </tr>   
  <tr>
    <td width="120">&nbsp;</td>
    <td colspan="2" height="21" width="300">' . $dataPayment['customer'] .'</td>
  </tr>';
                        
                       
                           
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>'
                                    . '<td colspan="2" height="22"  width="460" ><font size="9">'. $dataPayment['terbilang']. '</font></td>'
                                    . '</tr>';
                        
                        
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>'
                                    . '<td colspan="2" height="35" width="460">'. $dataPayment['note']. '</td>'
                                   . '</tr>';
                        




                        $html .='<tr>
    <td width="40">&nbsp;</td>
    <td width="360">&nbsp;</td>
        <td height="25">&nbsp;&nbsp;'.$dataPayment['date'] . '</td>
  </tr>';
                        
  $html .=' <tr>
    <td width="30">&nbsp;</td>
    <td width="380" height="30"><p style="font-size:13px; font-weight:bold">' . $dataPayment['amount'] . '</p></td>
        <td>&nbsp;</td>
  </tr>';
  
                       
  $html .=' <tr>
    <td width="60">&nbsp;</td>
    <td width="330" height="100" style="font-size: small;"></td>
		<td><br>&nbsp;</td>
        <!--<td><br><br><br> '.ucwords(strtoupper($dataPayment['user'])).'</td>-->
  </tr>';
                       

  /*
  $html .=' <tr>
    <td width="80">&nbsp;</td>
    <td width="390">&nbsp;<br/>	</td>
        <td>'.$dataPayment['user'].'</td>
  </tr>';
 */
  
  //kwitansi ke2
  $html .='
  <tr>
    <td >&nbsp;</td>
    <td colspan="2" height="105">&nbsp;</td>
  </tr>   
  <tr>
    <td width="120">&nbsp;</td>
    <td colspan="2" height="21" width="300">' . $dataPayment['customer'] .'</td>
  </tr>';
                        
                       
                           
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>'
                                    . '<td colspan="2" height="20"  width="460" ><font size="9">'. $dataPayment['terbilang']. '</font></td>'
                                    . '</tr>';
                        
                        
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>'
                                    . '<td colspan="2" height="35" width="460">'. $dataPayment['note']. '</td>'
                                   . '</tr>';
                        




                        $html .='<tr>
    <td width="40">&nbsp;</td>
    <td width="360">&nbsp;</td>
        <td height="10">&nbsp;&nbsp;'.$dataPayment['date'] . '</td>
  </tr>';
                        
  $html .=' <tr>
    <td width="30">&nbsp;</td>
    <td width="380" height="40" style="font-size:13px; font-weight:bold"><br><br>' . $dataPayment['amount'] . '</td>
        <td>&nbsp;</td>
  </tr>';
  
    $html .=' <tr>
    <td width="60">&nbsp;</td>
    <td width="330" height="75" style="font-size: small;"></td>
        <!--<td>'.ucwords(strtoupper($dataPayment['user'])).'</td>-->
  </tr>';
           
  
                 
  
   //kwitansi ke3
  $html .='
  <tr>
    <td>&nbsp;</td>
    <td colspan="2" height="120">&nbsp;</td>
  </tr>   
  <tr>
    <td width="120">&nbsp;</td>
    <td colspan="2" height="17" width="300">' . $dataPayment['customer'] .'</td>
  </tr>';
                        
                       
                           
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>'
                                    . '<td colspan="2" height="20"  width="460" ><font size="9">'. $dataPayment['terbilang']. '</font></td>'
                                    . '</tr>';
                        
                        
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>'
                                    . '<td colspan="2" height="35" width="460">'. $dataPayment['note']. '</td>'
                                   . '</tr>';
                        




                        $html .='<tr>
    <td width="40">&nbsp;</td>
    <td width="360">&nbsp;</td>
        <td height="25">&nbsp;&nbsp;'.$dataPayment['date']. '</td>
  </tr>';
                        
  $html .=' <tr>
    <td width="30">&nbsp;</td>
    <td width="380" height="10" style="font-size:13px; font-weight:bold"><br>' . $dataPayment['amount'] . '</td>
        <td>&nbsp;</td>
  </tr>';
  
   $html .=' <tr>
    <td width="60">&nbsp;</td>
    <td width="330"  style="font-size: small;"></td>
        <!--<td>'.ucwords(strtoupper($dataPayment['user'])).'</td>-->
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

	//=== add by TB on 17-01-2019
	public function getOptions() {
        return array(
            array("value"=>1,"text"=>"Template 1 ( Vivi ) ","selected"=>true),
            array("value"=>2,"text"=>"Template 2 ( Vienna )","selected"=>false),
			array("value"=>3,"text"=>"Template 2 ( Mellani )","selected"=>false)
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


        $custom_layout = array(216, 330); //folio

		//$pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);
        $pdf = new TCPDF('P', 'mm', $custom_layout, true, 'UTF-8', false);



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
						
		        $pdf->SetFontSize(11);

                     //   $noteAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['note']);
                       //  $terbilangAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['terbilang']);

                        
                        $html = '<table>
  <tr>
    <td>&nbsp;</td>
    <td colspan="2" height="92">&nbsp;</td>
  </tr>   
  <tr>
    <td width="120">&nbsp;</td>
    <td colspan="2" height="21" width="300">' . $dataPayment['customer'] .'</td>
  </tr>';
                        
                       
                           
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>'
                                    . '<td colspan="2" height="22"  width="460" ><font size="9">'. $dataPayment['terbilang']. '</font></td>'
                                    . '</tr>';
                        
                        
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>'
                                    . '<td colspan="2" height="35" width="460">'. $dataPayment['note']. '</td>'
                                   . '</tr>';
                        




                        $html .='<tr>
    <td width="40">&nbsp;</td>
    <td width="360">&nbsp;</td>
        <td height="25">&nbsp;&nbsp;'.$dataPayment['date'] . '</td>
  </tr>';
                        
  $html .=' <tr>
    <td width="30">&nbsp;</td>
    <td width="380" height="30"><p style="font-size:13px; font-weight:bold">' . $dataPayment['amount'] . '</p></td>
        <td>&nbsp;</td>
  </tr>';
  
                       
  $html .=' <tr>
    <td width="60">&nbsp;</td>
    <td width="330" height="100" style="font-size: small;"></td>
		<td><br>&nbsp;</td>
        <!--<td><br><br><br> '.ucwords(strtoupper($dataPayment['user'])).'</td>-->
  </tr>';
                       

  /*
  $html .=' <tr>
    <td width="80">&nbsp;</td>
    <td width="390">&nbsp;<br/>	</td>
        <td>'.$dataPayment['user'].'</td>
  </tr>';
 */
  
  //kwitansi ke2
  $html .='
  <tr>
    <td >&nbsp;</td>
    <td colspan="2" height="105">&nbsp;</td>
  </tr>   
  <tr>
    <td width="120">&nbsp;</td>
    <td colspan="2" height="21" width="300">' . $dataPayment['customer'] .'</td>
  </tr>';
                        
                       
                           
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>'
                                    . '<td colspan="2" height="20"  width="460" ><font size="9">'. $dataPayment['terbilang']. '</font></td>'
                                    . '</tr>';
                        
                        
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>'
                                    . '<td colspan="2" height="35" width="460">'. $dataPayment['note']. '</td>'
                                   . '</tr>';
                        




                        $html .='<tr>
    <td width="40">&nbsp;</td>
    <td width="360">&nbsp;</td>
        <td height="10">&nbsp;&nbsp;'.$dataPayment['date'] . '</td>
  </tr>';
                        
  $html .=' <tr>
    <td width="30">&nbsp;</td>
    <td width="380" height="40" style="font-size:13px; font-weight:bold"><br><br>' . $dataPayment['amount'] . '</td>
        <td>&nbsp;</td>
  </tr>';
  
    $html .=' <tr>
    <td width="60">&nbsp;</td>
    <td width="330" height="75" style="font-size: small;"></td>
        <!--<td>'.ucwords(strtoupper($dataPayment['user'])).'</td>-->
  </tr>';
           
  
                 
  
   //kwitansi ke3
  $html .='
  <tr>
    <td>&nbsp;</td>
    <td colspan="2" height="120">&nbsp;</td>
  </tr>   
  <tr>
    <td width="120">&nbsp;</td>
    <td colspan="2" height="17" width="300">' . $dataPayment['customer'] .'</td>
  </tr>';
                        
                       
                           
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>'
                                    . '<td colspan="2" height="20"  width="460" ><font size="9">'. $dataPayment['terbilang']. '</font></td>'
                                    . '</tr>';
                        
                        
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>'
                                    . '<td colspan="2" height="35" width="460">'. $dataPayment['note']. '</td>'
                                   . '</tr>';
                        




                        $html .='<tr>
    <td width="40">&nbsp;</td>
    <td width="360">&nbsp;</td>
        <td height="25">&nbsp;&nbsp;'.$dataPayment['date']. '</td>
  </tr>';
                        
  $html .=' <tr>
    <td width="30">&nbsp;</td>
    <td width="380" height="10" style="font-size:13px; font-weight:bold"><br>' . $dataPayment['amount'] . '</td>
        <td>&nbsp;</td>
  </tr>';
  
   $html .=' <tr>
    <td width="60">&nbsp;</td>
    <td width="330"  style="font-size: small;"></td>
        <!--<td>'.ucwords(strtoupper($dataPayment['user'])).'</td>-->
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


        $custom_layout = array(216, 330); //folio

		//$pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);
        $pdf = new TCPDF('P', 'mm', $custom_layout, true, 'UTF-8', false);



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
						
		        $pdf->SetFontSize(11);

                     //   $noteAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['note']);
                       //  $terbilangAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['terbilang']);

                        
                        $html = '<table>
  <tr>
    <td>&nbsp;</td>
    <td colspan="2" height="63">&nbsp;</td>
  </tr>   
  <tr>
    <td width="130">&nbsp;</td>
    <td colspan="2" height="21" width="300">' . $dataPayment['customer'] .'</td>
  </tr>';
                        
                       
                           
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>'
                                    . '<td colspan="2" height="15"  width="460" ><font size="9">'. $dataPayment['terbilang']. '</font></td>'
                                    . '</tr>';
                        
                        
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>'
                                    . '<td colspan="2" height="28" width="460">'. $dataPayment['note']. '</td>'
                                   . '</tr>';
                        




                        $html .='<tr>
    <td width="40">&nbsp;</td>
    <td width="360">&nbsp;</td>
        <td height="5">&nbsp;&nbsp;'.$dataPayment['date'] . '</td>
  </tr>';
                        
  $html .=' <tr>
    <td width="50">&nbsp;</td>
    <td width="380" height="30"><p style="font-size:13px; font-weight:bold">' . $dataPayment['amount'] . '</p></td>
        <td>&nbsp;</td>
  </tr>';
  
                       
  $html .=' <tr>
    <td width="60">&nbsp;</td>
    <td width="330" height="100" style="font-size: small;"></td>
		<td><br>&nbsp;</td>
        <!--<td><br><br><br> '.ucwords(strtoupper($dataPayment['user'])).'</td>-->
  </tr>';
                       

  /*
  $html .=' <tr>
    <td width="80">&nbsp;</td>
    <td width="390">&nbsp;<br/>	</td>
        <td>'.$dataPayment['user'].'</td>
  </tr>';
 */
  
  //kwitansi ke2
  $html .='
  <tr>
    <td >&nbsp;</td>
    <td colspan="2" height="78">&nbsp;</td>
  </tr>   
  <tr>
    <td width="130">&nbsp;</td>
    <td colspan="2" height="21" width="300">' . $dataPayment['customer'] .'</td>
  </tr>';
                        
                       
                           
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>'
                                    . '<td colspan="2" height="20"  width="460" ><font size="9">'. $dataPayment['terbilang']. '</font></td>'
                                    . '</tr>';
                        
                        
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>'
                                    . '<td colspan="2" height="25" width="460">'. $dataPayment['note']. '</td>'
                                   . '</tr>';
                        




                        // $html .='<tr>
    // <td width="40">&nbsp;</td>
    // <td width="360">&nbsp;</td>
        // <td height="10">&nbsp;&nbsp;'.$dataPayment['date'] . '</td>
  // </tr>';
                        
  $html .=' <tr>
    <td width="50">&nbsp;</td>
    <td width="380" height="40" style="font-size:13px; font-weight:bold"><br><br>' . $dataPayment['amount'] . '</td>
        <td>&nbsp;&nbsp;'.$dataPayment['date'] . '</td>
  </tr>';
  
    $html .=' <tr>
    <td width="60">&nbsp;</td>
    <td width="330" height="75" style="font-size: small;"></td>
        <!--<td>'.ucwords(strtoupper($dataPayment['user'])).'</td>-->
  </tr>';
           
  
                 
  
   //kwitansi ke3
  $html .='
  <tr>
    <td>&nbsp;</td>
    <td colspan="2" height="115">&nbsp;</td>
  </tr>   
  <tr>
    <td width="130">&nbsp;</td>
    <td colspan="2" height="17" width="300">' . $dataPayment['customer'] .'</td>
  </tr>';
                        
                       
                           
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>'
                                    . '<td colspan="2" height="20"  width="460" ><font size="9">'. $dataPayment['terbilang']. '</font></td>'
                                    . '</tr>';
                        
                        
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>'
                                    . '<td colspan="2" height="25" width="460">'. $dataPayment['note']. '</td>'
                                   . '</tr>';
                        




                        $html .='<tr>
    <td width="40">&nbsp;</td>
    <td width="360">&nbsp;</td>
        <td height="15">&nbsp;&nbsp;'.$dataPayment['date']. '</td>
  </tr>';
                        
  $html .=' <tr>
    <td width="50">&nbsp;</td>
    <td width="380" height="40" style="font-size:13px; font-weight:bold"><br>' . $dataPayment['amount'] . '</td>
        <td>&nbsp;</td>
  </tr>';
  
   $html .=' <tr>
    <td width="60">&nbsp;</td>
    <td width="330"  style="font-size: small;"></td>
        <!--<td>'.ucwords(strtoupper($dataPayment['user'])).'</td>-->
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


        $custom_layout = array(216, 330); //folio

		//$pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);
        $pdf = new TCPDF('P', 'mm', $custom_layout, true, 'UTF-8', false);



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
						
		        $pdf->SetFontSize(11);

                     //   $noteAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['note']);
                       //  $terbilangAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['terbilang']);

                        
                        $html = '<table>
  <tr>
    <td>&nbsp;</td>
    <td colspan="2" height="45">&nbsp;</td>
  </tr>   
  <tr>
    <td width="130">&nbsp;</td>
    <td colspan="2" height="21" width="300">' . $dataPayment['customer'] .'</td>
  </tr>';
                        
                       
                           
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>'
                                    . '<td colspan="2" height="15"  width="460" ><font size="9">'. $dataPayment['terbilang']. '</font></td>'
                                    . '</tr>';
                        
                        
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>'
                                    . '<td colspan="2" height="28" width="460">'. $dataPayment['note']. '</td>'
                                   . '</tr>';
                        




                        $html .='<tr>
    <td width="40">&nbsp;</td>
    <td width="360">&nbsp;</td>
        <td height="5">&nbsp;&nbsp;'.$dataPayment['date'] . '</td>
  </tr>';
                        
  $html .=' <tr>
    <td width="50">&nbsp;</td>
    <td width="380" height="30"><p style="font-size:13px; font-weight:bold">' . $dataPayment['amount'] . '</p></td>
        <td>&nbsp;</td>
  </tr>';
  
                       
  $html .=' <tr>
    <td width="60">&nbsp;</td>
    <td width="330" height="100" style="font-size: small;"></td>
		<td><br>&nbsp;</td>
        <!--<td><br><br><br> '.ucwords(strtoupper($dataPayment['user'])).'</td>-->
  </tr>';
                       

  /*
  $html .=' <tr>
    <td width="80">&nbsp;</td>
    <td width="390">&nbsp;<br/>	</td>
        <td>'.$dataPayment['user'].'</td>
  </tr>';
 */
  
  //kwitansi ke2
  $html .='
  <tr>
    <td >&nbsp;</td>
    <td colspan="2" height="73">&nbsp;</td>
  </tr>   
  <tr>
    <td width="130">&nbsp;</td>
    <td colspan="2" height="21" width="300">' . $dataPayment['customer'] .'</td>
  </tr>';
                        
                       
                           
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>'
                                    . '<td colspan="2" height="20"  width="460" ><font size="9">'. $dataPayment['terbilang']. '</font></td>'
                                    . '</tr>';
                        
                        
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>'
                                    . '<td colspan="2" height="25" width="460">'. $dataPayment['note']. '</td>'
                                   . '</tr>';
                        




                        // $html .='<tr>
    // <td width="40">&nbsp;</td>
    // <td width="360">&nbsp;</td>
        // <td height="10">&nbsp;&nbsp;'.$dataPayment['date'] . '</td>
  // </tr>';
                        
  $html .=' <tr>
    <td width="50">&nbsp;</td>
    <td width="380" height="40" style="font-size:13px; font-weight:bold"><br><br>' . $dataPayment['amount'] . '</td>
        <td>&nbsp;&nbsp;'.$dataPayment['date'] . '</td>
  </tr>';
  
    $html .=' <tr>
    <td width="60">&nbsp;</td>
    <td width="330" height="75" style="font-size: small;"></td>
        <!--<td>'.ucwords(strtoupper($dataPayment['user'])).'</td>-->
  </tr>';
           
  
                 
  
   //kwitansi ke3
  $html .='
  <tr>
    <td>&nbsp;</td>
    <td colspan="2" height="93">&nbsp;</td>
  </tr>   
  <tr>
    <td width="130">&nbsp;</td>
    <td colspan="2" height="17" width="300">' . $dataPayment['customer'] .'</td>
  </tr>';
                        
                       
                           
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>'
                                    . '<td colspan="2" height="20"  width="460" ><font size="9">'. $dataPayment['terbilang']. '</font></td>'
                                    . '</tr>';
                        
                        
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>'
                                    . '<td colspan="2" height="25" width="460">'. $dataPayment['note']. '</td>'
                                   . '</tr>';
                        




                        $html .='<tr>
    <td width="40">&nbsp;</td>
    <td width="360">&nbsp;</td>
        <td height="15">&nbsp;&nbsp;'.$dataPayment['date']. '</td>
  </tr>';
                        
  $html .=' <tr>
    <td width="50">&nbsp;</td>
    <td width="380" height="40" style="font-size:13px; font-weight:bold"><br>' . $dataPayment['amount'] . '</td>
        <td>&nbsp;</td>
  </tr>';
  
   $html .=' <tr>
    <td width="60">&nbsp;</td>
    <td width="330"  style="font-size: small;"></td>
        <!--<td>'.ucwords(strtoupper($dataPayment['user'])).'</td>-->
  </tr>';

 

$html .='</table>';

  

                    
                        $pdf->writeHTML($html, true, false, true, false, '');
                    }
                }
            }
        }


        $pdf->Output($filePath, 'F');
    }
   
     
}

?>
