<?php

/**
 * Description of Fpdf
 *
 * @author MIS
 */

require_once dirname(__DIR__) . '../../library/fpdf/PdfHtml.php';

class Erems_Models_Library_Fpdf {
    private $url;
    public function run(Erems_Box_Models_App_Session $ses){
        $fileName = 'payment_'.$ses->getProject()->getId().'_'.$ses->getPt()->getId().'.pdf';
        $html = "<p>Hello Apa kabar</p>
                <p>Total Payment </p>
                <p style='text-align:right;'>19-20-2015</p>
                <p style='text-align:left;'>19-20-2015</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>Hello</p>";
        $pdf = new PdfHtml();
        $pdf->AddPage();
        $pdf->SetFont('Arial', '', 14);
        $pdf->WriteHTML($html);
        $pdf->Output(APPLICATION_PATH . '/../public/app/erems/uploads/pdf/kwitansipayment/'.$fileName);
        
        $this->url = 'app/erems/uploads/pdf/kwitansipayment/' . $fileName;
    }
    
    public function getUrl() {
        return $this->url;
    }


}

?>
