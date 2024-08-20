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

class Erems_Models_Library_TcpdfVoucherCitralandBagyaMedan {
    
    //100 :12 . 6/12 * 100
    
    //erems perfomance management
    //implementasi erems
    //explore framework
    //mt erems web app

    private $fileName;
    private $params = array(
        "top_rowcount" => 2, // jumlah baris yang di tambahkan paling atas
        "customer_newline" => 3, // jumlah baris yang di tambahkan setelah customer
        "ln_note" => 2, // ln_note_add + (ln_terbilang * ln_lineheight) -- new line setelah note
        "tab" => "                           ", // jumlah spasi,
        "tab_tanggal" => "                                                                                                                  ", // spasi tanggal
        "tab_total" => "         ", // spasi total pembayaran in angka

        "ln_lineheight" => 4,
        "ln_terbilang_add" => 2,
        "ln_terbilang" => 5, // ln_terbilang_add + (ln_terbilang * ln_lineheight) -- new line setelah terbilang
        "ln_note_add" => 12,
        "ln_note" => 2, // ln_note_add + (ln_terbilang * ln_lineheight) -- new line setelah note
        "date_newline" => 1,
        "note_newline" => 3
    );


    public function run(Erems_Box_Models_App_Session $ses, $dataPayments, $sortPaymentIds) {

        $fileName = 'payment_' . $ses->getProject()->getId() . '_' . $ses->getPt()->getId() . '.pdf';

        $this->fileName = $fileName;
        $pdf = new TCPDF('P', 'mm', 'A42', true, 'UTF-8', false);

        $pdf->SetAuthor('MIS');
        $pdf->SetTitle('Payment');
        $pdf->SetAutoPageBreak(true, 0);
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);
        $paymentIdsAr = explode("~", $sortPaymentIds);
      
     //   var_dump($dataPayments);
/// sort hasil print
        foreach ($paymentIdsAr as $payId) {
            if (intval($payId) > 0) {
                foreach ($dataPayments as $dataPayment) {
                    if ($dataPayment["id"] == $payId) {


                        $pdf->AddPage();
                        $html = '<table width="620">
  <tr>
    <td width="65"></td>
    <td height="72" width="324"></td>
    <td width="46"></td> 
    <td width="216"></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.$dataPayment["customer"].'</td>
    <td width="46"></td> 
    <td >-</td>
  </tr>
  <tr >
    <td></td>
    <td height="50">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
    <td>&nbsp;</td> 
    <td>'.$dataPayment["cair_date"].'</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td height="100">'.$dataPayment["note"].'</td>
    <td align="right">Rp</td> 
    <td align="left">'.$dataPayment["payment"].'</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>Tgl SPT '.$dataPayment["purchaseletter_date"].'</td>
    <td>&nbsp;</td> 
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td></td>
    <td height="65">'.$dataPayment["pricetype"].'</td>
    <td></td> 
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td height="35">'.$dataPayment["terbilang"].'</td>
    <td align="right">Rp</td> 
    <td align="left">'.$dataPayment["amount"].'</td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td> 
    <td align="left">'.$dataPayment["paymentmethod"].'</td>
  </tr>
</table>
';
                        $pdf->writeHTML($html, true, false, true, false, '');
                    }
                }
            }
        }


        $pdf->Output(APPLICATION_PATH . '/../public/app/erems/uploads/pdf/voucherpayment/' . $fileName, 'F');
    }

    public function getFileName() {
        return $this->fileName;
    }

    private function getSpasi() {
        return "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }

}

?>
