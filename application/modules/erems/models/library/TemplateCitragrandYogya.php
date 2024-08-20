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

class Erems_Models_Library_TemplateCitragrandYogya{

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


        $custom_layout = array(450, 210);


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
                        
						$dataPayment['date'] = date('d-m-Y'); //diganti tgl cetak
                        
                        $pdf->AddPage();
						
		        $pdf->SetFontSize(11.5);

                     //   $noteAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['note']);
                       //  $terbilangAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['terbilang']);

                        
                        $html = '<table style="font-weight: bold">
  <tr>
    <td>&nbsp;</td>
    <td colspan="2" height="90">&nbsp;</td>
  </tr>   
  <tr>
    <td width="115">&nbsp;</td>
    <td colspan="2" height="25" width="300">' . $dataPayment['customer'] .'</td>
  </tr>';
                        
                       
                           
                            $html .='<tr>'
                                    . '<td width="115">&nbsp;</td>'
                                    . '<td colspan="2" height="25"  width="450" style="font-size: 10px">'. $dataPayment['terbilang']. '</td>'
                                    . '</tr>';
                        
                        
                            $html .='<tr>'
                                    . '<td width="115">&nbsp;</td>'
                                    . '<td colspan="2" height="45" width="450" style="line-height:1.5; font-size: 10px">'. $dataPayment['note']. '</td>'
                                   . '</tr>';
                        




                        $html .='<tr>
    <td width="60">&nbsp;</td>
    <td width="360">&nbsp;</td>
        <td height="20">'.$dataPayment['date'] . '</td>
  </tr>';
                        
  $html .=' <tr>
    <td width="35">&nbsp;</td>
    <td width="330" height="10"><p style="line-height:1px">&nbsp;</p>' . $dataPayment['amount'] . '</td>
        <td>&nbsp;</td>
  </tr>';
  
                       
  $html .=' <tr>
    <td width="60">&nbsp;</td>
    <td width="330" height="100" style="font-size: small;"></td>
        <td>&nbsp;</td>
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
    <td colspan="2" height="160">&nbsp;</td>
  </tr>   
  <tr>
    <td width="115">&nbsp;</td>
    <td colspan="2" height="20" width="300">' . $dataPayment['customer'] .'</td>
  </tr>';
                        
                       
                           
                            $html .='<tr>'
                                    . '<td width="115">&nbsp;</td>'
                                    . '<td colspan="2" height="25"  width="450" style="font-size: 10px">'. $dataPayment['terbilang']. '</td>'
                                    . '</tr>';
                        
                        
                            $html .='<tr>'
                                    . '<td width="115">&nbsp;</td>'
                                    . '<td colspan="2" height="45" width="450"  style="line-height:1.5; font-size: 10px">'. $dataPayment['note']. '</td>'
                                   . '</tr>';
                        




                        $html .='<tr>
    <td width="60">&nbsp;</td>
    <td width="360">&nbsp;</td>
        <td height="15">'.$dataPayment['date'] . '</td>
  </tr>';
                        
  $html .=' <tr>
    <td width="30">&nbsp;</td>
    <td width="330" height="50"><p style="line-height:10px">&nbsp;</p>' . $dataPayment['amount'] . '</td>
        <td>&nbsp;</td>
  </tr>';
  
    $html .=' <tr>
    <td width="60">&nbsp;</td>
    <td width="330" height="75" style="font-size: small;"></td>
        <td></td>
  </tr>';
           
  
                 
  
   //kwitansi ke3 //85
  $html .='
  <tr>
    <td>&nbsp;</td> 
    <td colspan="2" height="170">&nbsp;</td>
  </tr>   
  <tr>
    <td width="115">&nbsp;</td>
    <td colspan="2" height="20" width="300">' . $dataPayment['customer'] .'</td>
  </tr>';
                        
                       
                           
                            $html .='<tr>'
                                    . '<td width="115">&nbsp;</td>'
                                    . '<td colspan="2" height="25"  width="450" style="font-size: 10px">'. $dataPayment['terbilang']. '</td>'
                                    . '</tr>';
                        
                        
                            $html .='<tr>'
                                    . '<td width="115">&nbsp;</td>'
                                    . '<td colspan="2" height="45" width="450" style="line-height:1.5; font-size: 10px">'. $dataPayment['note']. '</td>'
                                   . '</tr>';
                        




                        $html .='<tr>
    <td width="80">&nbsp;</td>
    <td width="360">&nbsp;</td>
        <td height="10">'.$dataPayment['date'] . '</td>
  </tr>';
                        
  $html .=' <tr>
    <td width="30">&nbsp;</td>
    <td width="330" height="30"><p style="line-height:10px">&nbsp;</p>' . $dataPayment['amount'] . '</td>
        <td>&nbsp;</td>
  </tr>';
  
   $html .=' <tr>
    <td width="30">&nbsp;</td>
    <td width="330"  style="font-size: small;"></td>
        <td><p>&nbsp;</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; FRANSISCA FERNANDA</td>
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

   
   
     
}

?>
