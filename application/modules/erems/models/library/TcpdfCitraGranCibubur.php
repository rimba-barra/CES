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

class Erems_Models_Library_TcpdfCitraGranCibubur {

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
						
		        $pdf->SetFontSize(10.5);

                     //   $noteAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['note']);
                       //  $terbilangAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['terbilang']);
//82  height
                        $html = '<table>
  <tr>
    <td>&nbsp;</td>
    <td colspan="2" height="92">&nbsp;</td>
  </tr>   
  <tr>
    <td width="150">&nbsp;</td>
    <td colspan="2" height="60" width="300">' . $dataPayment['customer'] . '<br/>'.$dataPayment['customer_address'].'</td>
  </tr>';
                        
                       
                           
                            $html .='<tr>'
                                    . '<td width="150">&nbsp;</td>'
                                    . '<td colspan="2" height="50"  width="400">'. $dataPayment['terbilang']. '</td>'
                                    . '</tr>';
                        
                        
                            $html .='<tr>'
                                    . '<td width="150">&nbsp;</td>'
                                    . '<td colspan="2" height="58" width="400">'. $dataPayment['note']. '</td>'
                                   . '</tr>';
                        




                        $html .='<tr>
    <td width="30">&nbsp;</td>
    <td width="430">&nbsp;</td>
        <td height="12">'.$dataPayment['date'] . '</td>
  </tr>';
                        
  $html .=' <tr>
    <td width="80">&nbsp;</td>
    <td width="390" height="43">' . $dataPayment['amount'] . '</td>
        <td>&nbsp;</td>
  </tr>';
  
                        if ($this->tipe == 1) {
  $html .=' <tr>
    <td width="80">&nbsp;</td>
    <td width="390" height="30" style="font-size: small;"><br/><br/>Catatan : Uang Tanda Jadi / Uang yang sudah dibayarkan tidak dapat<br/> 				
                  dikembalian/hangus oleh sebab apapun juga kecuali penolakan KPR<br/> 				
                  (pot. by adm Rp.10,000,000.)</td>
        <td><br/><br/><br/><br/>'.$dataPayment['user'].'</td>
  </tr>';
                        }

  /*
  $html .=' <tr>
    <td width="80">&nbsp;</td>
    <td width="390">&nbsp;<br/>	</td>
        <td>'.$dataPayment['user'].'</td>
  </tr>';
 */
  
 
  
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
