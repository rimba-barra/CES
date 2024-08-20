<?php

require_once dirname(__DIR__) . '../../library/tcpdf/tcpdf.php';

class Cashier_Models_Library_TemplatepaymentPdf {

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

    public function run($ses, $dataPayments,$sortkasbank_id,$formatAr) {

        $template = $formatAr[0];
        $bank = $formatAr[1];
        $model_template = $formatAr[2];
        $fileName = $template.'_'.$bank.'_'.$model_template.'_'.$ses['project_id'] . '_' . $ses['pt_id'] . '.pdf';
        $filePath = APPLICATION_PATH . '/../public/app/cashier/uploads/pdf/cekgiro/' . $fileName;
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
        $pdf->SetTitle('GIRODBS');
        $pdf->SetAutoPageBreak(true, 0);
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);
        $currentStartLine = 0; // tidak dipakai
        $topRowCount = $this->params["top_rowcount"];
        $currentPage = 0;
        $textTab = $this->params["tab"];
        $tanggalTab = $this->params["tab_tanggal"];
        $jumlahTab = $this->params["tab_total"];
        $cnline = $this->params["customer_newline"];
        $dateLine = $this->params["date_newline"];
        $noteLine = $this->params["note_newline"];
        $heightAwal = 50;
        
        $paymentIdsAr = explode("~", $sortkasbank_id);
        
        
         foreach ($paymentIdsAr as $payId) {
            if (intval($payId) > 0) {
                foreach ($dataPayments as $index => $dataPayment) {
                    $dataPayment->$index = new stdClass;
                    if ($dataPayment->kasbank_id == $payId) {
                        $pdf->AddPage();
                        $pdf->SetFontSize(10);
                        $noteAr = Cashier_Box_Tools::potongKalimat(150, $dataPayment->description);
                        $terbilangAr = Cashier_Box_Tools::potongKalimat(150, $dataPayment->terbilang);
                        
                        $html='<table width="520"> <tr> <td>&nbsp;</td><td colspan="2" height="85">&nbsp;</td></tr><tr> <td width="140">&nbsp;</td><td height="20" colspan="2" valign="bottom">' . $dataPayment->made_by . '</td></tr>'; for ($i=0; $i < count($terbilangAr); $i++){$height=""; if($i==count($terbilangAr)-1){$height=$i==0?$heightAwal:$heightAwal-(10*$i); $height='height="'.($height-30).'"';}$html .='<tr>' . '<td width="140">&nbsp;</td>' . '<td colspan="2" '.$height.'>'. $terbilangAr[$i]. '</td>' . '</tr>';}for ($i=0; $i < count($noteAr); $i++){$height=""; if($i==count($noteAr)-1){$height=$i==0?$heightAwal:$heightAwal-(10*$i); $height='height="'.($height-15).'"';}$html .='<tr>' . '<td width="140">&nbsp;</td>' . '<td colspan="2" '.$height.'>'. $noteAr[$i]. '</td>' . '</tr>';}$html .=' <tr> <td width="350">&nbsp;</td><td >'.$dataPayment->kasbank_date . '</td><td>&nbsp;</td></tr>'; $html .=' <tr> <td width="70">&nbsp;</td><td width="300">' . $dataPayment->amount . '</td><td></td></tr>'; $html .='</table>';
                       
                        
                        

        $pdf->writeHTML($html, true, false, true, false, '');
        
                     }
                }
            }
        }
        
   

        // force print dialog
        $js = 'print(true);';

        // set javascript
        $pdf->IncludeJS($js);
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
