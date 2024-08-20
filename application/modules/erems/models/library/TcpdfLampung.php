<?php

/**
 * Description of TcpdfLampung
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../../library/tcpdf/tcpdf.php';

class Erems_Models_Library_TcpdfLampung implements Erems_Models_Payment_PrintBisaMulti{
	

    private $fileName;

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
      
        
        
        foreach ($paymentIdsAr as $payId) {
            if (intval($payId) > 0) {
                foreach ($dataPayments as $dataPayment) {
                    if ($dataPayment["id"] == $payId) {
                        
                        
                        $pdf->AddPage();
						
		        $pdf->SetFontSize(10);

                     //   $noteAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['note']);
                       //  $terbilangAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['terbilang']);

                        $html = '<table>
  <tr>
    <td>&nbsp;</td>
    <td colspan="2" height="115">&nbsp;</td>
  </tr>   
  <tr>
    <td width="150">&nbsp;</td>
    <td colspan="2" height="55" width="300">' . $dataPayment['customer'] . '</td>
  </tr>';
                        
                       
                           
                            $html .='<tr>'
                                    . '<td width="150">&nbsp;</td>'
                                    . '<td colspan="2" height="50"  width="300">'. $dataPayment['terbilang']. '</td>'
                                    . '</tr>';
                        
                        
                            $html .='<tr>'
                                    . '<td width="150">&nbsp;</td>'
                                    . '<td colspan="2" height="80" width="300">'. $dataPayment['note']. '</td>'
                                   . '</tr>';
                        

                        
  $html .=' <tr>
    <td width="70">&nbsp;</td>
    <td width="330" height="43">' . $dataPayment['amount'] . '</td>
        <td>'.$dataPayment['date'] . '</td>
  </tr>';
  
  
  
 
  
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

    public function getOptions() {
        return array(
            array("value"=>1,"text"=>"Template 1 ( Agnes ) ","selected"=>true),
            array("value"=>2,"text"=>"Template 2 ( Erik )","selected"=>false)
        );
    }

    public function runMulti(\Erems_Box_Models_App_Session $ses, $dataPayments, $sortPaymentIds, $option) {
        if($option==1){
            $this->runTemplateSatu($ses, $dataPayments, $sortPaymentIds);
        }else if($option==2){
            $this->runTemplateDua($ses, $dataPayments, $sortPaymentIds);
        }
    }
    
    
    public function runTemplateSatu(Erems_Box_Models_App_Session $ses, $dataPayments, $sortPaymentIds) {

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
      
        
        
        foreach ($paymentIdsAr as $payId) {
            if (intval($payId) > 0) {
                foreach ($dataPayments as $dataPayment) {
                    if ($dataPayment["id"] == $payId) {
                        
                        
                        $pdf->AddPage();
						
		        $pdf->SetFontSize(10);

                     //   $noteAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['note']);
                       //  $terbilangAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['terbilang']);

                        $html = '<table>
  <tr>
    <td>&nbsp;</td>
    <td colspan="2" height="65">&nbsp;</td>
  </tr>   
  <tr>
    <td width="150">&nbsp;</td>
    <td colspan="2" height="75" width="300">' . $dataPayment['customer'] . '</td>
  </tr>';
                        
                       
                           
                            $html .='<tr>'
                                    . '<td width="150">&nbsp;</td>'
                                    . '<td colspan="2" height="80"  width="300">'. $dataPayment['terbilang']. '</td>'
                                    . '</tr>';
                        
                        
                            $html .='<tr>'
                                    . '<td width="150">&nbsp;</td>'
                                    . '<td colspan="2" height="100" width="300">'. $dataPayment['note']. '</td>'
                                   . '</tr>';
                        

                        
  $html .=' <tr>
    <td width="70">&nbsp;</td>
    <td width="380" height="20">&nbsp;</td>
        <td>'.$dataPayment['date'] . '</td>
  </tr>';
  
  $html .=' <tr>
    <td width="70">&nbsp;</td>
    <td width="380" height="43">' . $dataPayment['amount'] . '</td>
        <td>&nbsp;</td>
  </tr>';
  
  
  
 
  
$html .='</table>';
                        
                        $pdf->writeHTML($html, true, false, true, false, '');
                    }
                }
            }
        }


        $pdf->Output($filePath, 'F');
    }
    
    public function runTemplateDua(Erems_Box_Models_App_Session $ses, $dataPayments, $sortPaymentIds) {

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
      
        
        
        foreach ($paymentIdsAr as $payId) {
            if (intval($payId) > 0) {
                foreach ($dataPayments as $dataPayment) {
                    if ($dataPayment["id"] == $payId) {
                        
                        
                        $pdf->AddPage();
						
		        $pdf->SetFontSize(10);

                     //   $noteAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['note']);
                       //  $terbilangAr = Erems_Box_Tools::potongKalimat(150, $dataPayment['terbilang']);

                        $html = '<table>
  <tr>
    <td>&nbsp;</td>
    <td colspan="2" height="115">&nbsp;</td>
  </tr>   
  <tr>
    <td width="150">&nbsp;</td>
    <td colspan="2" height="55" width="300">' . $dataPayment['customer'] . '</td>
  </tr>';
                        
                       
                           
                            $html .='<tr>'
                                    . '<td width="150">&nbsp;</td>'
                                    . '<td colspan="2" height="50"  width="300">'. $dataPayment['terbilang']. '</td>'
                                    . '</tr>';
                        
                        
                            $html .='<tr>'
                                    . '<td width="150">&nbsp;</td>'
                                    . '<td colspan="2" height="80" width="300">'. $dataPayment['note']. '</td>'
                                   . '</tr>';
                        

                        
  $html .=' <tr>
    <td width="70">&nbsp;</td>
    <td width="330" height="43">' . $dataPayment['amount'] . '</td>
        <td>'.$dataPayment['date'] . '</td>
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
