<?php

/**
 * Description of Erems_Models_Komisi_Klaimprint_Default
 *
 * @author TOMMY-MIS
 */
require_once dirname(__DIR__) . '../../../library/tcpdf/tcpdf.php';

class Erems_Models_Komisi_Klaimprint_Default {

    private $fileName;
    private $folderHasilPrint;
    private $hasil;

    public function run(Erems_Box_Models_App_Session $ses, $dataKlaim, $detail) {
        $this->folderHasilPrint = "app/erems/uploads/pdf/klaimkomisi/";
        $fileName = 'klaimprint_' . $ses->getProject()->getId() . '_' . $ses->getPt()->getId() . '.pdf';
        $filePath = APPLICATION_PATH . '/../public/' . $this->folderHasilPrint . '' . $fileName;


        $hasil = FALSE;

        try {

            if (file_exists($filePath)) {
                unlink($filePath);
            }

            $this->fileName = $fileName;

            $pdf = new TCPDF('P', 'mm', 'A42', true, 'UTF-8', false);
            

            $pdf->AddPage();



            $pdf->SetAuthor('MIS');
            $pdf->SetTitle('Print Klaim');
            $pdf->SetAutoPageBreak(true, 0);
            $pdf->setPrintHeader(false);
            $pdf->setPrintFooter(false);


            $fontname = TCPDF_FONTS::addTTFfont(APPLICATION_PATH . '/../public/app/erems/fonts/tahoma.ttf', 'TrueTypeUnicode', '', 96);
            $pdf->SetFont($fontname, '', 10, '', false);

            $html = '<table>';
            $html .= '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
            $html .= '<tr><td width="30" colspan="2">&nbsp;</td><td colspan="3">PT CITRA PRADIPTA KSO</td><td>&nbsp;</td></tr>';
            $html .= '<tr><td width="30" colspan="2">&nbsp;</td><td colspan="3">' . $dataKlaim["citraclub_clubname"] . '</td><td>&nbsp;</td></tr>';

            $html .= '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
            $html .= '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
            $html .= '<tr><td width="30">&nbsp;</td><td colspan="2">Komisi Pembelian </td><td colspan="3">Blok :' . $detail["unit_unit_number"] . '</td><td>&nbsp;</td></tr>';
            $html .= '<tr><td width="30">&nbsp;</td><td colspan="2">Type :' . $detail["type_name"] . '</td><td>Harga Netto</td><td colspan="2">' . Erems_Box_Tools::toCurrency($detail['price_harga_neto']) . ' x 3%</td><td>' . Erems_Box_Tools::toCurrency($dataKlaim['nilai_komisi']) . '</td></tr>';
            $html .= '<tr><td width="30">&nbsp;</td><td colspan="2">&nbsp;</td><td>&nbsp;</td><td>PPN 10%</td><td>&nbsp;</td><td>' . Erems_Box_Tools::toCurrency($dataKlaim['ppn']) . '</td></tr>';
            $html .= '<tr><td width="30">&nbsp;</td><td colspan="3">' . $dataKlaim['nomor_pengajuan'] . '</td><td>PPh 2%</td><td>&nbsp;</td><td>(' . Erems_Box_Tools::toCurrency($dataKlaim['pph']) . ')</td></tr>';
            $html .= '<tr><td width="30">&nbsp;</td><td colspan="3">NPWP :' . $dataKlaim['npwp'] . '</td><td>' . date('M-Y', strtotime($dataKlaim['tgl_pengajuan'])) . '</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
            $html .= '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
            $html .= '<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
            $html .= '<tr><td width="30">&nbsp;</td><td colspan="2">&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>' . Erems_Box_Tools::toCurrency($dataKlaim['total_bayar']) . '</td></tr>';
            $html .= '<tr><td width="30">&nbsp;</td><td colspan="4">' . Erems_Box_Library_Terbilang::terbilang($dataKlaim['total_bayar'], 3) . '</td><td>&nbsp;</td><td>&nbsp;</td></tr>';

            $html .= '</table>';





            $pdf->writeHTML($html, true, false, true, false, '');




            $pdf->Output($filePath, 'F');

            $hasil = TRUE;
        } catch (Exception $ex) {
            
        }

        $this->hasil = $hasil;
    }

    public function getFileName() {
        return $this->fileName;
    }

    public function getHasil() {
        return $this->hasil;
    }

    public function getUrl() {
        return $this->folderHasilPrint . '' . $this->fileName;
    }

    public function getFolderPath() {
        return $this->folderHasilPrint;
    }

    private function getSpasi() {
        return "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }

}
