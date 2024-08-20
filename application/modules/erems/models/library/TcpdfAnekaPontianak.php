<?php

/**
 * Description of Erems_Models_Library_TcpdfAnekaPontianak
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../../library/tcpdf/tcpdf.php';

class Erems_Models_Library_TcpdfAnekaPontianak implements Erems_Models_Payment_PrintBisaMulti{

    private $fileName;

    public function run(Erems_Box_Models_App_Session $ses, $dataPayments, $sortPaymentIds) {

        
    }

    public function getFileName() {
        return $this->fileName;
    }

    public function getOptions() {
        return array(
            array("value"=>1,"text"=>"Template 1","selected"=>false),
            array("value"=>2,"text"=>"Template 2","selected"=>true),
            array("value"=>3,"text"=>"Template 3","selected"=>false)
        );
    }

    public function runMulti(\Erems_Box_Models_App_Session $ses, $dataPayments, $sortPaymentIds, $option) {
        if($option==1){
            $this->runTemplateSatu($ses, $dataPayments, $sortPaymentIds);
        }else if($option==2){
            $this->runTemplateDua($ses, $dataPayments, $sortPaymentIds);
        }else if($option==3){
            $this->runTemplateTiga($ses, $dataPayments, $sortPaymentIds);
        }
        
    }
    
    private function runTemplateSatu(\Erems_Box_Models_App_Session $ses, $dataPayments, $sortPaymentIds){
        $fileName = 'payment_' . $ses->getProject()->getId() . '_' . $ses->getPt()->getId() . '.pdf';
        $filePath = APPLICATION_PATH . '/../public/app/erems/uploads/pdf/kwitansipayment/' . $fileName;
        if (file_exists($filePath)) {
            unlink($filePath);
        }

        $this->fileName = $fileName;



        $pdf = new TCPDF('P', 'mm', 'A42', true, 'UTF-8', false);


	//	$fontname = TCPDF_FONTS::addTTFfont(APPLICATION_PATH . '/../public/app/erems/fonts/tahoma.ttf', 'TrueTypeUnicode', '', 96);
       // $fontname = TCPDF_FONTS::addTTFfont(APPLICATION_PATH . '/../public/app/erems/fonts/cour.ttf', 'TrueTypeUnicode', '', 96);
	   // $fontname = TCPDF_FONTS::addTTFfont(APPLICATION_PATH . '/../public/app/erems/fonts/verdana.ttf', 'TrueTypeUnicode', '', 96);
        
      //  $pdf->SetFont($fontname, '', 14, '', false);
	  
	  $fontname = TCPDF_FONTS::addTTFfont(APPLICATION_PATH . '/../public/app/erems/fonts/times.ttf', 'TrueTypeUnicode', '', 96);
        $pdf->SetFont($fontname, 'B', 14, '', false);

        $pdf->SetAuthor('MIS');
        $pdf->SetTitle('Payment');
        $pdf->SetAutoPageBreak(true, 0);
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);

        $paymentIdsAr = explode("~", $sortPaymentIds);
     

        
        foreach ($paymentIdsAr as $payId) {
            if (intval($payId) > 0) {
                foreach ($dataPayments as $dataPayment) {
                    if ($dataPayment["id"] == $payId) {
                        
                        
                        $pdf->AddPage();
						
		        $pdf->SetFontSize(10);


                        $html = '<table>
  <tr>
    <td>&nbsp;</td>
    <td colspan="2" height="80">&nbsp;</td>
  </tr>   
  <tr>
    <td width="140">&nbsp;</td>
    <td colspan="2" height="55" width="300">' . $dataPayment['customer'] . '</td>
  </tr>';
                        
                       
                           
                            $html .='<tr>'
                                    . '<td width="140">&nbsp;</td>'
                                    . '<td colspan="2" height="50"  width="330" style="font-size: small;">'. $dataPayment['terbilang']. '</td>'
                                    . '</tr>';
                        
                        
                            $html .='<tr>'
                                    . '<td width="140">&nbsp;</td>'
                                    . '<td colspan="2" height="78" width="330">'. $dataPayment['note']. '</td>'
                                   . '</tr>';
                        




                        $html .='<tr>
    <td width="30">&nbsp;</td>
    <td width="400">&nbsp;</td>
        <td height="0">'.$dataPayment['date'] . '</td>
  </tr>';
                        
  $html .=' <tr>
    <td width="80">&nbsp;</td>
    <td width="390" height="83">' . $dataPayment['amount'] . '</td>
        <td>&nbsp;</td>
  </tr>';
  
  $html .='<tr>
    <td width="30">&nbsp;</td>
    <td width="380">&nbsp;</td>
        <td height="10">'.$dataPayment['user'] . '</td>
  </tr>';
  
  
  
$html .='</table>';
                        
                        $pdf->writeHTML($html, true, false, true, false, '');
                    }
                }
            }
        }


        $pdf->Output($filePath, 'F');
    }
    
    private function runTemplateDua(\Erems_Box_Models_App_Session $ses, $dataPayments, $sortPaymentIds){
       $fileName = 'payment_' . $ses->getProject()->getId() . '_' . $ses->getPt()->getId() . '.pdf';
        $filePath = APPLICATION_PATH . '/../public/app/erems/uploads/pdf/kwitansipayment/' . $fileName;
        if (file_exists($filePath)) {
            unlink($filePath);
        }

        $this->fileName = $fileName;



        $pdf = new TCPDF('P', 'mm', 'A42', true, 'UTF-8', false);


	//	$fontname = TCPDF_FONTS::addTTFfont(APPLICATION_PATH . '/../public/app/erems/fonts/tahoma.ttf', 'TrueTypeUnicode', '', 96);
     //   $fontname = TCPDF_FONTS::addTTFfont(APPLICATION_PATH . '/../public/app/erems/fonts/cour.ttf', 'TrueTypeUnicode', '', 96);
		$fontname = TCPDF_FONTS::addTTFfont(APPLICATION_PATH . '/../public/app/erems/fonts/verdana.ttf', 'TrueTypeUnicode', '', 96);
        
        $pdf->SetFont($fontname, '', 14, '', false);

        $pdf->SetAuthor('MIS');
        $pdf->SetTitle('Payment');
        $pdf->SetAutoPageBreak(true, 0);
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);

        $paymentIdsAr = explode("~", $sortPaymentIds);
     

        
        foreach ($paymentIdsAr as $payId) {
            if (intval($payId) > 0) {
                foreach ($dataPayments as $dataPayment) {
                    if ($dataPayment["id"] == $payId) {
                        
                        
                        $pdf->AddPage();
						
		        $pdf->SetFontSize(10);


                        $html = '<table>
  <tr>
    <td>&nbsp;</td>
    <td colspan="2" height="80">&nbsp;</td>
  </tr>   
  <tr>
    <td width="140">&nbsp;</td>
    <td colspan="2" height="55" width="300">' . $dataPayment['customer'] . '</td>
  </tr>';
                        
                       
                           
                            $html .='<tr>'
                                    . '<td width="140">&nbsp;</td>'
                                    . '<td colspan="2" height="50"  width="330" style="font-size: small;">'. $dataPayment['terbilang']. '</td>'
                                    . '</tr>';
                        
                        
                            $html .='<tr>'
                                    . '<td width="140">&nbsp;</td>'
                                    . '<td colspan="2" height="78" width="330">'. $dataPayment['note']. '</td>'
                                   . '</tr>';
                        




                        $html .='<tr>
    <td width="30">&nbsp;</td>
    <td width="400">&nbsp;</td>
        <td height="0">'.$dataPayment['date'] . '</td>
  </tr>';
                        
  $html .=' <tr>
    <td width="80">&nbsp;</td>
    <td width="390" height="83">' . $dataPayment['amount'] . '</td>
        <td>&nbsp;</td>
  </tr>';
  
  $html .='<tr>
    <td width="30">&nbsp;</td>
    <td width="380">&nbsp;</td>
        <td height="10">'.$dataPayment['user'] . '</td>
  </tr>';
  
  
  
$html .='</table>';
                        
                        $pdf->writeHTML($html, true, false, true, false, '');
                    }
                }
            }
        }


        $pdf->Output($filePath, 'F');
    }
    
    private function runTemplateTiga(\Erems_Box_Models_App_Session $ses, $dataPayments, $sortPaymentIds){
       $fileName = 'payment_' . $ses->getProject()->getId() . '_' . $ses->getPt()->getId() . '.pdf';
        $filePath = APPLICATION_PATH . '/../public/app/erems/uploads/pdf/kwitansipayment/' . $fileName;
        if (file_exists($filePath)) {
            unlink($filePath);
        }

        $this->fileName = $fileName;



        $pdf = new TCPDF('P', 'mm', 'A42', true, 'UTF-8', false);


	//	$fontname = TCPDF_FONTS::addTTFfont(APPLICATION_PATH . '/../public/app/erems/fonts/tahoma.ttf', 'TrueTypeUnicode', '', 96);
      //  $fontname = TCPDF_FONTS::addTTFfont(APPLICATION_PATH . '/../public/app/erems/fonts/cour.ttf', 'TrueTypeUnicode', '', 96);
	  
	  $fontname = TCPDF_FONTS::addTTFfont(APPLICATION_PATH . '/../public/app/erems/fonts/verdana.ttf', 'TrueTypeUnicode', '', 96);
        
        $pdf->SetFont($fontname, '', 14, '', false);

        $pdf->SetAuthor('MIS');
        $pdf->SetTitle('Payment');
        $pdf->SetAutoPageBreak(true, 0);
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);

        $paymentIdsAr = explode("~", $sortPaymentIds);
     

        
        foreach ($paymentIdsAr as $payId) {
            if (intval($payId) > 0) {
                foreach ($dataPayments as $dataPayment) {
                    if ($dataPayment["id"] == $payId) {
                        
                        
                        $pdf->AddPage();
						
		        $pdf->SetFontSize(10);


                        $html = '<table>
  <tr>
    <td>&nbsp;</td>
    <td colspan="2" height="80">&nbsp;</td>
  </tr>   
  <tr>
    <td width="140">&nbsp;</td>
    <td colspan="2" height="55" width="300">' . $dataPayment['customer'] . '</td>
  </tr>';
                        
                       
                           
                            $html .='<tr>'
                                    . '<td width="140">&nbsp;</td>'
                                    . '<td colspan="2" height="50"  width="330" style="font-size: small;">'. $dataPayment['terbilang']. '</td>'
                                    . '</tr>';
                        
                        
                            $html .='<tr>'
                                    . '<td width="140">&nbsp;</td>'
                                    . '<td colspan="2" height="78" width="330">'. $dataPayment['note']. '</td>'
                                   . '</tr>';
                        




                        $html .='<tr>
    <td width="30">&nbsp;</td>
    <td width="400">&nbsp;</td>
        <td height="0">'.$dataPayment['date'] . '</td>
  </tr>';
                        
  $html .=' <tr>
    <td width="80">&nbsp;</td>
    <td width="390" height="83">' . $dataPayment['amount'] . '</td>
        <td>&nbsp;</td>
  </tr>';
  
  $html .='<tr>
    <td width="30">&nbsp;</td>
    <td width="380">&nbsp;</td>
        <td height="10">'.$dataPayment['user'] . '</td>
  </tr>';
  
  
  
$html .='</table>';
                        
                        $pdf->writeHTML($html, true, false, true, false, '');
                    }
                }
            }
        }


        $pdf->Output($filePath, 'F');
    }

}

?>
