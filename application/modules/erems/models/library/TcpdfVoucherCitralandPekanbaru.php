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

class Erems_Models_Library_TcpdfVoucherCitralandPekanbaru {
    
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
        $pdf->SetFontSize(10);
        $paymentIdsAr = explode("~", $sortPaymentIds);
      
     //   var_dump($dataPayments);
/// sort hasil print
        foreach ($paymentIdsAr as $payId) {
            if (intval($payId) > 0) {
                foreach ($dataPayments as $dataPayment) {
                    if ($dataPayment["id"] == $payId) {


                        $pdf->AddPage();
                        $html = '<table>
<tbody>
<tr>
<td width="10">&nbsp;</td>
<td width="93" height="42">&nbsp;</td>
<td width="321" height="42">&nbsp;</td>
<td width="18">&nbsp;</td>
<td width="298">&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
<td colspan="2">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;'.$dataPayment["pt_name"].'</td>
<td width="18">&nbsp;</td>
<td>&nbsp; &nbsp;-</td>
</tr>
<tr>
<td>&nbsp;</td>
<td height="40" colspan="2">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;'.$dataPayment["customer"].'</td>
<td>&nbsp;</td>
<td>&nbsp; &nbsp;'.$dataPayment["cair_date"].'</td>
</tr>
<tr>
  <td>&nbsp;</td>
  <td height="10">&nbsp;</td>
  <td height="10">&nbsp;</td>
  <td align="right">&nbsp;</td>
  <td align="right">&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
<td height="10">&nbsp;</td>
<td height="10">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
</tr>
<tr>
<td>&nbsp;&nbsp;</td>
<td height="100">&nbsp;</td>
<td height="100">'.$dataPayment["note"].'</td>
<td align="right">Rp</td>
<td align=""> '.$dataPayment["payment"].'</td>
</tr>
<tr>
<td>&nbsp;</td>
<td height="10">&nbsp;</td>
<td height="10">&nbsp;</td>
<td align="right">&nbsp;</td>
<td align="right">&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>Tgl SPT '.$dataPayment["purchaseletter_date"].'</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
<td height="40">&nbsp;</td>
<td height="40">'.$dataPayment["pricetype"].'</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
<td height="40">&nbsp;</td>
<td height="40">'.$dataPayment["terbilang"].'</td>
<td align="right">Rp</td>
<td> '.$dataPayment["amount"].'</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td > '.$dataPayment["paymentmethod"].'</td>
</tr>
</tbody>
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
