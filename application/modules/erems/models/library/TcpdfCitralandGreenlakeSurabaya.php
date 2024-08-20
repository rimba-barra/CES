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

class Erems_Models_Library_TcpdfCitralandGreenlakeSurabaya{

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


        $custom_layout = array(280, 140);


        $pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);



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
						
		        $pdf->SetFontSize(8.5);

                     //   $noteAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['note']);
                       //  $terbilangAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['terbilang']);

                        
                        $html = '<table>
  <tr>
    <td>&nbsp;</td>
    <td colspan="2" height="70">&nbsp;</td>
  </tr>   
  <tr>
    <td width="150">&nbsp;</td>
    <td colspan="2" height="15" width="300">' . $dataPayment['customer'] .'</td>
  </tr>';
                        
                       
                           
                            $html .='<tr>'
                                    . '<td width="150">&nbsp;</td>'
                                    . '<td colspan="2" height="15"  width="420">'. $dataPayment['terbilang']. '</td>'
                                    . '</tr>';
                        
                        
                            $html .='<tr>'
                                    . '<td width="150">&nbsp;</td>'
                                    . '<td colspan="2" height="45" width="380">'. $dataPayment['note']. '</td>'
                                   . '</tr>';
                        




                        $html .='<tr>
    <td width="40">&nbsp;</td>
    <td width="360">&nbsp;</td>
        <td height="9">'.$dataPayment['date'] . '</td>
  </tr>';
                        
  $html .=' <tr>
    <td width="70">&nbsp;</td>
    <td width="380" height="30">' . $dataPayment['amount'] . '</td>
        <td>&nbsp;</td>
  </tr>';
  
                       
  $html .=' <tr>
    <td width="60">&nbsp;</td>
    <td width="330" height="100" style="font-size: small;"></td>
        <td>GILANG RINALDY</td>
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
    <td colspan="2" height="100">&nbsp;</td>
  </tr>   
  <tr>
    <td width="150">&nbsp;</td>
    <td colspan="2" height="15" width="300">' . $dataPayment['customer'] .'</td>
  </tr>';
                        
                       
                           
                            $html .='<tr>'
                                    . '<td width="150">&nbsp;</td>'
                                    . '<td colspan="2" height="15"  width="420">'. $dataPayment['terbilang']. '</td>'
                                    . '</tr>';
                        
                        
                            $html .='<tr>'
                                    . '<td width="150">&nbsp;</td>'
                                    . '<td colspan="2" height="43" width="380">'. $dataPayment['note']. '</td>'
                                   . '</tr>';
                        




                        $html .='<tr>
    <td width="40">&nbsp;</td>
    <td width="360">&nbsp;</td>
        <td height="5">'.$dataPayment['date'] . '</td>
  </tr>';
                        
  $html .=' <tr>
    <td width="70">&nbsp;</td>
    <td width="380" height="40">' . $dataPayment['amount'] . '</td>
        <td>&nbsp;</td>
  </tr>';
  
    $html .=' <tr>
    <td width="60">&nbsp;</td>
    <td width="330" height="75" style="font-size: small;"></td>
        <td>GILANG RINALDY</td>
  </tr>';
           
  
                 
  
   //kwitansi ke3
  $html .='
  <tr>
    <td>&nbsp;</td>
    <td colspan="2" height="105">&nbsp;</td>
  </tr>   
  <tr>
    <td width="150">&nbsp;</td>
    <td colspan="2" height="15" width="300">' . $dataPayment['customer'] .'</td>
  </tr>';
                        
                       
                           
                            $html .='<tr>'
                                    . '<td width="150">&nbsp;</td>'
                                    . '<td colspan="2" height="15"  width="420">'. $dataPayment['terbilang']. '</td>'
                                    . '</tr>';
                        
                        
                            $html .='<tr>'
                                    . '<td width="150">&nbsp;</td>'
                                    . '<td colspan="2" height="45" width="380">'. $dataPayment['note']. '</td>'
                                   . '</tr>';
                        




                        $html .='<tr>
    <td width="40">&nbsp;</td>
    <td width="360">&nbsp;</td>
        <td height="15">'.$dataPayment['date'] . '</td>
  </tr>';
                        
  $html .=' <tr>
    <td width="70">&nbsp;</td>
    <td width="380" height="10">' . $dataPayment['amount'] . '</td>
        <td>&nbsp;</td>
  </tr>';
  
   $html .=' <tr>
    <td width="60">&nbsp;</td>
    <td width="330"  style="font-size: small;"></td>
        <td>GILANG RINALDY</td>
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
