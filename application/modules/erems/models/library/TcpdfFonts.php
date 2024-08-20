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

class Erems_Models_Library_TcpdfFonts {

    private $fileName;

    public function run(Erems_Box_Models_App_Session $ses) {

        $fileName = 'font_' . $ses->getProject()->getId() . '_' . $ses->getPt()->getId() . '.pdf';

        $this->fileName = $fileName;
        $pdf = new TCPDF('P', 'mm', 'A42', true, 'UTF-8', false);

        $pdf->SetAuthor('MIS');
        $pdf->SetTitle('Select Font');
        $pdf->SetAutoPageBreak(true, 0);
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);




        $pdf->AddPage();
        $html = 'FONT LIST';
        
        $pdf->writeHTML($html, true, false, true, false, '');
        
        // default
         
        $html ='<p>[1] ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 <br/> abcdefghijklmnopgqrstuvwxyz <br/> ( SAMPLE TEXT RP. 1.000.000.000 ) <br/></p>';
         
        $pdf->writeHTML($html, true, false, true, false, '');
        
        // font 2
        
        $fontname = TCPDF_FONTS::addTTFfont(APPLICATION_PATH . '/../public/app/erems/fonts/tahoma.ttf', 'TrueTypeUnicode', '', 96);
        $pdf->SetFont($fontname, '', 14, '', false);
         
        $html ='<p>[2] ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 <br/> abcdefghijklmnopgqrstuvwxyz <br/> ( SAMPLE TEXT RP. 1.000.000.000 ) <br/></p>';
         
        $pdf->writeHTML($html, true, false, true, false, '');
        
        // font 3
        
        $fontname = TCPDF_FONTS::addTTFfont(APPLICATION_PATH . '/../public/app/erems/fonts/cour.ttf', 'TrueTypeUnicode', '', 96);
        $pdf->SetFont($fontname, '', 14, '', false);
         
        $html ='<p>[3] ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 <br/> abcdefghijklmnopgqrstuvwxyz <br/> ( SAMPLE TEXT RP. 1.000.000.000 ) <br/></p>';
         
        $pdf->writeHTML($html, true, false, true, false, '');
        
        // font 4
        
        $fontname = TCPDF_FONTS::addTTFfont(APPLICATION_PATH . '/../public/app/erems/fonts/courbd.ttf', 'TrueTypeUnicode', '', 96);
        $pdf->SetFont($fontname, '', 14, '', false);
         
        $html ='<p>[4] ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 <br/> abcdefghijklmnopgqrstuvwxyz <br/> ( SAMPLE TEXT RP. 1.000.000.000 ) <br/></p>';
         
        $pdf->writeHTML($html, true, false, true, false, '');
        
        // font 5
        
        $fontname = TCPDF_FONTS::addTTFfont(APPLICATION_PATH . '/../public/app/erems/fonts/verdana.ttf', 'TrueTypeUnicode', '', 96);
        $pdf->SetFont($fontname, '', 14, '', false);
         
        $html ='<p>[5] ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 <br/> abcdefghijklmnopgqrstuvwxyz <br/> ( SAMPLE TEXT RP. 1.000.000.000 ) <br/></p>';
         
        $pdf->writeHTML($html, true, false, true, false, '');
        
        // font 6
        
        $fontname = TCPDF_FONTS::addTTFfont(APPLICATION_PATH . '/../public/app/erems/fonts/times.ttf', 'TrueTypeUnicode', '', 96);
        $pdf->SetFont($fontname, '', 14, '', false);
         
        $html ='<p>[6] ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 <br/> abcdefghijklmnopgqrstuvwxyz <br/> ( SAMPLE TEXT RP. 1.000.000.000 ) <br/></p>';
         
        $pdf->writeHTML($html, true, false, true, false, '');
         
   
         
        $html = '...';
         
       $pdf->writeHTML($html, true, false, true, false, '');



        $pdf->Output(APPLICATION_PATH . '/../public/app/erems/uploads/pdf/font/' . $fileName, 'F');
    }

    public function getFileName() {
        return $this->fileName;
    }

    private function getSpasi() {
        return "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }

}

?>
