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

class Erems_Models_Library_TcpdfPalu {

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

    public function run(Erems_Box_Models_App_Session $ses, $dataPayments, $sortPaymentIds) {

        $fileName = 'payment_' . $ses->getProject()->getId() . '_' . $ses->getPt()->getId() . '.pdf';
        $filePath = APPLICATION_PATH . '/../public/app/erems/uploads/pdf/kwitansipayment/' . $fileName;
        if (file_exists($filePath)) {
            unlink($filePath);
        }

        $this->fileName = $fileName;




        $pdf = new TCPDF('P', 'mm', 'A42', true, 'UTF-8', false);
        
        $fontname = TCPDF_FONTS::addTTFfont(APPLICATION_PATH . '/../public/app/erems/fonts/tahoma.ttf', 'TrueTypeUnicode', '', 96);
        $pdf->SetFont($fontname, '', 14, '', false);



        $pdf->SetAuthor('MIS');
        $pdf->SetTitle('Payment');
        $pdf->SetAutoPageBreak(true, 0);
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);

        $paymentIdsAr = explode("~", $sortPaymentIds);


/// sort hasil print

        $heightAwal = 50;


        foreach ($paymentIdsAr as $payId) {
            if (intval($payId) > 0) {
                foreach ($dataPayments as $dataPayment) {
                    if ($dataPayment["id"] == $payId) {
                        $pdf->AddPage();

                        $noteAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['note']);
                        $terbilangAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['terbilang']);

                        $html = '<table>
  <tr>
    <td>&nbsp;</td>
    <td colspan="2" height="90">&nbsp;</td>
  </tr>   
  <tr>
    <td width="120">&nbsp;</td>
    <td colspan="2" height="50">' . $dataPayment['customer'] . '</td>
  </tr>';

                        for ($i = 0; $i < count($terbilangAr); $i++) {
                            $height = "";
                            if ($i == count($terbilangAr) - 1) {
                                $height = $i == 0 ? $heightAwal : $heightAwal - (10 * $i);
                                $height = 'height="' . $height . '"';
                            }
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>'
                                    . '<td colspan="2" ' . $height . '>' . $terbilangAr[$i] . '</td>'
                                    . '</tr>';
                        }
                        for ($i = 0; $i < count($noteAr); $i++) {
                            $height = "";
                            if ($i == count($noteAr) - 1) {
                                $height = $i == 0 ? $heightAwal : $heightAwal - (10 * $i);
                                $height = 'height="' . $height . '"';
                            }
                            $html .='<tr>'
                                    . '<td width="120">&nbsp;</td>'
                                    . '<td colspan="2" ' . $height . '>' . $noteAr[$i] . '</td>'
                                    . '</tr>';
                        }

                        $html .='<tr>
    <td width="70">&nbsp;</td>
    <td width="300">&nbsp;</td>
        <td height="10">&nbsp;</td>
  </tr>';


                        $html .='<tr>
    <td width="70">&nbsp;</td>
    <td width="330">' . $dataPayment['amount'] . '</td>
        <td height="20">' . date("d-m-Y") . '</td>
  </tr>';
                        /*
                          $html .=' <tr>
                          <td width="50">&nbsp;</td>
                          <td width="390">' . $dataPayment['amount'] . '</td>
                          <td>&nbsp;</td>
                          </tr>';

                         */
                        $html .='<tr><td width="70">&nbsp;</td><td width="330">&nbsp;</td><td height="20">&nbsp;</td></tr>';
                        $html .='<tr><td width="70">&nbsp;</td><td width="330">&nbsp;</td><td height="20">&nbsp;</td></tr>';
                        $html .='<tr><td width="70">&nbsp;</td><td width="330">'.$dataPayment['paymentmethod'].'</td><td height="20">&nbsp;</td></tr>';
                        $html .='<tr><td width="70">&nbsp;</td><td width="330">Payment Date: '.$dataPayment['date'].'</td><td height="20">&nbsp;</td></tr>';
                        $html .='<tr><td width="70">&nbsp;</td><td width="330">&nbsp;</td><td height="20">&nbsp;</td></tr>';
                        $html .='<tr><td width="70">&nbsp;</td><td width="330">&nbsp;</td><td height="20">Erlyn Trivita Rizky</td></tr>';
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
