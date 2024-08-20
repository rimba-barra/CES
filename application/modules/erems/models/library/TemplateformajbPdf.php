<?php

/**
 * Description of Erems_Models_Library_TemplateformajbPdf
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../../library/tcpdf/tcpdf.php';

class Erems_Models_Library_TemplateformajbPdf {

    private $fileName;
    public $folder;

    public function run(Erems_Box_Models_App_Session $ses,$data,$dataForm,$dataFormReplace,$baseUrl) {

        $fileName = 'formajb_' . $ses->getProject()->getId() . '_' . $ses->getPt()->getId() . '.pdf';
        $this->folder = "app/erems/uploads/pdf/formajb/";

        $filePath = APPLICATION_PATH . '/../public/' . $this->folder . "" . $fileName;
        $templateHtml = APPLICATION_PATH . '/../public/app/erems/uploads/html/formorderajb/formajb.html';
        if (file_exists($filePath)) {
            unlink($filePath);
        }

        $this->fileName = $fileName;



        //  $pdf = new TCPDF('P', 'mm', 'A42', true, 'UTF-8', false);
        $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
        $pdf->SetFont ('helvetica', '', 10 , '', 'default', true );

// set default monospaced font
        $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
        $pdf->SetMargins(5, 5, 5);
        $pdf->SetHeaderMargin(0);
        $pdf->SetFooterMargin(0);
       

// set auto page breaks
      //  $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set image scale factor
        $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
        $pdf->SetAuthor('MIS');
        $pdf->SetTitle('Form Order AJB');
        $pdf->SetAutoPageBreak(true, 0);
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);


        $pdf->AddPage();

        $html = file_get_contents($templateHtml);

        $regexp = '/\<input type\=\"checkbox\" name\=\"(.*?)\" \/\>/';
        
        preg_match_all($regexp, $html,$checkboxs);
        
         $img = '<img src="'.$baseUrl.'/app/erems/uploads/html/formorderajb/square.png" alt="image" width="20" height="20" />';
         $imgCheck = '<img src="'.$baseUrl.'/app/erems/uploads/html/formorderajb/check-mark.png" alt="image" width="20" height="20"/>';
         foreach($checkboxs[1] as $k=>$v){
            // if($v=="is_lunas"){
             if(intval($data[$v])==0){
                  $checkboxs[1][$k] = $img;
             }else{
                  $checkboxs[1][$k] = $imgCheck;
             }
            
         }
         
        
         $dataForm[] = "{{logo}}";
         $dataFormReplace[] = '<img src="'.$baseUrl.'/app/erems/uploads/html/formorderajb/logo.png" alt="image"/>';



        $html = str_replace($checkboxs[0],$checkboxs[1],$html);
        
        $html = str_replace($dataForm,$dataFormReplace,$html);
        


       



        $pdf->writeHTML($html, true, false, true, false, '');
        $pdf->Output($filePath, 'I');
    }

    public function getFileName() {
        return $this->folder . "" . $this->fileName;
    }

}

?>
