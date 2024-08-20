<?php

/**
 * Description of Tcpdf
 *
 * @author MIS
 */
require_once dirname(__DIR__) . '../../library/tcpdf/tcpdf.php';

class Erems_Models_Library_HtmlCitralandGamaCityMedan {

    private $fileName;

    public function run(Erems_Box_Models_App_Session $ses, $dataPayments, $sortPaymentIds) {

        $fileName = 'payment_' . $ses->getProject()->getId() . '_' . $ses->getPt()->getId() . '.html';
        //   $filePath = APPLICATION_PATH . '/../public/app/erems/uploads/html/hasil_generate/' . $fileName;
        $filePath = APPLICATION_PATH . '/../public/app/erems/uploads/pdf/kwitansipayment/' . $fileName;
        if (file_exists($filePath)) {
            unlink($filePath);
        }


        $this->fileName = $fileName;




        $paymentIdsAr = explode("~", $sortPaymentIds);
        
        $publicPath = Zend_Controller_Front::getInstance()->getBaseUrl();
         $logoPath = $publicPath . '/app/erems/uploads/img/logo_clgc.jpg';


/// sort hasil print

        $templateFile = APPLICATION_PATH . '/../public/app/erems/uploads/html/citralandgamacitymedan/kwitansi_template.html';


        foreach ($paymentIdsAr as $payId) {
            if (intval($payId) > 0) {
                foreach ($dataPayments as $dataPayment) {
                    if ($dataPayment["id"] == $payId) {

                        ///// START HERE
                        $konten = file_get_contents($templateFile);

                      

                       $search = array("{{logo}}","{{customer}}","{{terbilang}}","{{note}}","{{date}}","{{amount}}","{{print_no}}");
                        $replace = array($logoPath,$dataPayment['customer'],$dataPayment['terbilang'],$dataPayment['note'],$dataPayment['date'],$dataPayment['amount'],$dataPayment['print_no']);
                        
                   //    var_dump($konten);

                        $konten = str_replace($search, $replace, $konten);

                        $myfile = fopen($filePath, "w") or die("Unable to open file!");

                        fwrite($myfile, $konten);
                        fclose($myfile);


                        ////// END HERE
                    }
                }
            }
        }
    }

    public function getFileName() {
        return $this->fileName;
    }

}

?>
