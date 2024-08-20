<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of HtmlToPdf
 *
 * @author MIS
 */

require_once dirname(__DIR__) . '../../library/html2pdf/html2pdf.class.php';

class Erems_Models_Library_HtmlToPdf {
    
    private $url;
    public function run(Erems_Box_Models_App_Session $ses){
        $fileName = 'payment_'.$ses->getProject()->getId().'_'.$ses->getPt()->getId().'.pdf';
        
        $content = "
<page>
    <h1>Exemple d'utilisation</h1>
    <br>
    Ceci est un <b>exemple d'utilisation</b>
    de <a href='http://html2pdf.fr/'>HTML2PDF</a>.<br>
</page>";
        
        $html2pdf = new HTML2PDF('P', 'A4', 'fr');
        
 
        $html2pdf->setDefaultFont('Arial');
        $html2pdf->writeHTML($content);
        $hasil = $html2pdf->Output($fileName,APPLICATION_PATH . '/../public/app/erems/uploads/pdf/kwitansipayment/'.$fileName);
        
      
      
        
        $this->url = 'app/erems/uploads/pdf/kwitansipayment/' . $fileName;
    }
    
    public function getUrl() {
        return $this->url;
    }
    
    
}

?>
