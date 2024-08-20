<?php

/**
 * Description of Default
 *
 * @author TOMMY-MIS
 */
require_once dirname(__DIR__) . '../../../library/tcpdf/tcpdf.php';

class Erems_Models_Komisi_Printtemplate_Default {

    public function run(Erems_Box_Models_App_Session $ses, $dataKomisis, $sortKomisiIds) {

        $fileName = 'komisi_' . $ses->getProject()->getId() . '_' . $ses->getPt()->getId() . '_' . $ses->getUser()->getId() . '.pdf';
        $filePath = APPLICATION_PATH . '/../public/app/erems/uploads/pdf/komisi/' . $fileName;
        if (file_exists($filePath)) {
            unlink($filePath);
        }

        $this->fileName = $fileName;



        $pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);



        $pdf->SetAuthor('MIS');
        $pdf->SetTitle('Permintaan Komisi');
        $pdf->SetAutoPageBreak(true, 0);
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);

        $paymentIdsAr = explode("~", $sortKomisiIds);

/// sort hasil print

        $heightAwal = 50;


        foreach ($paymentIdsAr as $komId) {
            if (intval($komId) > 0) {
                foreach ($dataKomisis as $dataKomisi) {
                    if ($dataKomisi["id"] == $komId) {
                        $pdf->AddPage();

                        $html = file_get_contents(APPLICATION_PATH . '/../public/app/erems/uploads/html/komisi/default.html', true);
                  
                       

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

}
