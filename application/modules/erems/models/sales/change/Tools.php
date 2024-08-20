<?php

/**
 * Description of Tools
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Sales_Change_Tools {

    // addon 20180710
    public static function getSuffixPurchaseNumber($purchaseletterId, $nomorPl, Erems_Models_Sales_Change_Dao $dao) {
        $ebt = new Erems_Box_Tools();
        $sess = $ebt->getAppSessions();

        // SH1 Feature, penambahan suffix P00N di nomor purchaseletter
        $newNomorPl = "";

        if (strlen($nomorPl) > 5) { // jika ada nomor purchaseletter
            // $changePriceInfo = $dao->getOneCN($object);
            //$changePrice = Erems_Box_Tools::toObjectRow($changePriceInfo, new Erems_Models_Sales_Change_ChangeName(), array(new Erems_Models_Purchaseletter_PurchaseLetter()));
            //  $nomorPl = $changePrice->getPurchaseletter()->getNomor();
            $pos = strrpos($nomorPl, "-P0");


            if ($pos === false) { // note: three equal signs
                // not found...
                $newNomorPl = $nomorPl;
            } else {
                // $newNomorPl = substr($nomorPl, 0, $pos);
                if ($pos){
                    if($pos == 4){
                        $newNomorPl = substr($nomorPl, 0, $pos).substr($nomorPl, strpos($nomorPl, "/"), (strlen($nomorPl)-strpos($nomorPl, "/")));
                    }
                    else{
                        $newNomorPl = substr($nomorPl, 0, $pos);    
                    }
                }
            }

            $totalRevisiInfo = $dao->getTotalRevisi($purchaseletterId);
            $totalRevisiInfo = $totalRevisiInfo[1][0]["total_revisi"];
            $totalRevisiInfo = intval($totalRevisiInfo) + 1;
            $totalRevisiInfo = str_pad($totalRevisiInfo, 3, "0", STR_PAD_LEFT);
            $no_revisi = "P" . $totalRevisiInfo;

            if(isset($sess['subholding_id']) && $sess['subholding_id'] == 2){
                $newNomorPl = substr($newNomorPl, 0, strpos($newNomorPl, "/")) . '-' . $no_revisi . substr($newNomorPl, strpos($newNomorPl, "/"), strlen($newNomorPl));

            }
            else{
                $newNomorPl = $newNomorPl . "-" . $no_revisi;
            }
        }

        return $newNomorPl;
        //end SH1 Feature, penambahan suffix P00N di nomor purchaseletter
    }

    //addon 20181113
    public static function emailGMFinanceApproved($penerima = array(),$namaModul="Rubah Nama",$dataTransaksi=array()) {


       
        /* format
        $dataTransaksi = array(
            "nomor_persetujuan" => "0000",
            "nomor_unit" => "2233",
            "nama_customer" => "2233",
            "nama_customer_baru" => "2233",
            "nama_pemohon" => "2233",
            "nama_salesman" => "2233",
            "nama_pemohon" => "Joko"
        );
         
         */

        $messageHead = '<html><body><p>Dear All</p>';


        // $message = '<html><body>';
        //$message .= '<p>Dear ' . $cnEmail[0][0]["user_fullname"] . '</p>';
        $message = '<p> <br/>';
        $message .= '</p>';
        $message .= '<p>Berikut transaksi pada CES (Ciputra Enterprise System) yang telah diapprove, <br/>';

        $message .= '</p>';
        $message .= '<p>';
        $message .= '<table>';
        $message .= '<tr><td>Persetujuan        </td><td>: ' . $namaModul . ' </td></tr>';
        $message .= '<tr><td>Persetujuan No     </td><td>: ' . $dataTransaksi["nomor_persetujuan"] . '</td></tr>';
        $message .= '<tr><td>Nomor Unit       </td><td>: ' . $dataTransaksi["nomor_unit"] . '</td></tr>';
        $message .= '<tr><td>Nama Customer       </td><td>: ' . $dataTransaksi["nama_customer"] . '</td></tr>';
        $message .= '<tr><td>Nama Customer Baru       </td><td>: ' . $dataTransaksi["nama_customer_baru"] . '</td></tr>';
        $message .= '<tr><td>Nama Pemohon       </td><td>: ' . $dataTransaksi["nama_pemohon"] . '</td></tr>';
        $message .= '<tr><td>Nama Sales         </td><td>: ' . $dataTransaksi["nama_salesman"] . '</td></tr>';
        $message .= '<tr><td>Tanggal permohonan </td><td>: ' . date("d-m-Y H:i:s") . '</td></tr>';
        $message .= '</table>';
        $message .= '</p>';
        $message .= '<p>Deskripsi			:</p>';
        $message .= '<p> <br/>';
        $message .= '<br/>';
        $message .= '<br/>';
        $message .= 'Terima Kasih,	</p>';
        $message .= '<p> &nbsp; </p>';
        $message .= '<p>' . $dataTransaksi["nama_pemohon"] . ' </p>';
        $message .= "</body></html>";


        $finalMessage = $messageHead . "" . $message;

        try {



            $mail = new Erems_Box_Library_Email();
            $mail->getMail()->setFrom('ces@ciputra.co.id', "CES System");
            $mail->getMail()->setBodyHtml(nl2br($finalMessage));

            foreach ($penerima as $row) {
                $mail->getMail()->addTo($row, $row);
            }


            $mail->getMail()->setSubject('Approved Change Name of Purchaseletter');
            $mail->getMail()->send();

            $statusSentMail = TRUE;
        } catch (Zend_Mail_Exception $e) {
            $statusSentMail = FALSE;
            //   $this->logError($message, $e->getMessage());
            /// log error
            $file = 'erems_perubahan_log.txt';
            $file = APPLICATION_PATH . '/../public/app/erems/log/' . $file;
            $current = file_get_contents($file);
            $current .= "[" . date("d-m-Y H:i:s") . "][MSG] Email gagal terkirim \r\n";
            $current .= "[" . date("d-m-Y H:i:s") . "][HTML] " . $finalMessage . "\r\n";
            $current .= "[" . date("d-m-Y H:i:s") . "][MAIL] " . $e->getMessage() . "\r\n";
            file_put_contents($file, $current);
            // log error
        }
    }

}
