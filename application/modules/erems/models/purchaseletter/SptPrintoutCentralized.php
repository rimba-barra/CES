<?php

/**
 * Description of SptPrintoutCentralized
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Purchaseletter_SptPrintoutCentralized {

    public function process($session, Erems_Box_Projectptconfig_Genco $genco, Erems_Box_Library_MyWordParser $wordParser, $paramsTemplate, $fileSrc, $data) {


        // addon 20190114
        // SPT NEW CONCEPT
        // split template berdasarkan pricetype dan product category
        if ($genco->isPurchasePrintoutCentralized()) {


            // replace prefix ".kpr"
            if (strpos($fileSrc, '.kpr') !== false) {
                $fileSrc = str_replace(".kpr", "", $fileSrc);
            }



            $generalDao = new Erems_Models_Master_GeneralDao();

            $globalParams = $generalDao->getGlobalParameterFilter($session->getProject()->getId(), $session->getPt()->getId(), "PURCHASELETTER_TPL_PRINT_");
            $globalParams = $globalParams[0];
            $globalParams = $this->processDbParams($globalParams);

            //  var_dump($globalParams);
            // var_dump($fileSrc);
            $prefixAsuransi = "-ASURANSI-";
            $useAsuransi = FALSE;
            $asuransiTextPos = strpos($fileSrc, $prefixAsuransi);

            if ($asuransiTextPos !== FALSE) {
                $useAsuransi = TRUE;
                $fileSrc = str_replace($prefixAsuransi, "", $fileSrc);
                $globalParams["WITH_ASURANSI"] = "TRUE";
            }




            $pInclude = $this->getTextConfig($data["pricetype_pricetype"], $data["productcategory_productcategory"], $data);


            $paramPrefix = "";
            if ($data["pricetype_pricetype"] == "KPR") {
                $paramPrefix = $data["productcategory_productcategory"] == "BANGUNAN" ? "KPR_BGN" : "KPR_KAV";
            } else {
                $paramPrefix = $data["productcategory_productcategory"] == "BANGUNAN" ? "INH_CASH_BGN" : "INH_CASH_KAV";
            }



            $pAlpha = array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n");

            //   $pUse = $pInclude["PASAL2"];
            // $p2Use = $pInclude["PASAL3"];
            //  $p3Use = $pInclude["PASALX"];
            //    $p4Use = $pInclude["PINDAHKAVLING"];




            if (key_exists("PASAL2", $pInclude)) {
                $dataAddData = $this->addData("pcount", "ptext", $wordParser, $pInclude["PASAL2"], $pAlpha, $data, $globalParams);
                $data = $dataAddData["data"];
            }

            if (key_exists("PASAL3", $pInclude)) {

                $dataAddDataB = $this->addData("pcountb", "ptextb", $wordParser, $pInclude["PASAL3"], $pAlpha, $data, $globalParams);
                $data = $dataAddDataB["data"];
            }



            // pasal x
            if (key_exists("PASALX", $pInclude)) {
                foreach ($pInclude["PASALX"] as $row) {
                    $splitText = $this->splitOptionText($row);

                    if ($globalParams["PURCHASELETTER_TPL_PRINT_" . $paramPrefix . "_BATAL"] == $splitText["PARAM_VAL"]) {

                        // ganti persen dengan nilai parameter global
                        if (strpos($splitText["TEXT"], "[PERSEN_ANGKA]") !== FALSE) {
                            $splitText["TEXT"] = str_replace("[PERSEN_ANGKA]", $globalParams["PURCHASELETTER_TPL_PRINT_" . $paramPrefix . "_BATAL_PERSENTASE"], $splitText["TEXT"]);
                        }
                        if (strpos($splitText["TEXT"], "[PERSEN_TERBILANG]") !== FALSE) {
                            $tempTerbilang = Erems_Box_Library_Terbilang::terbilang($globalParams["PURCHASELETTER_TPL_PRINT_" . $paramPrefix . "_BATAL_PERSENTASE"], 3);
                            $splitText["TEXT"] = str_replace("[PERSEN_TERBILANG]", str_replace("Rupiah", "", $tempTerbilang), $splitText["TEXT"]);
                        }

                        $data["parac"] = $splitText["TEXT"];
                    }
                }
            }


            //pasal pindah kavling
            if (key_exists("PINDAHKAVLING", $pInclude)) {
                foreach ($pInclude["PINDAHKAVLING"] as $row) {

                    $splitText = $this->splitOptionText($row);

                    if ($globalParams["PURCHASELETTER_TPL_PRINT_" . $paramPrefix . "_PINDAHBLOK"] == $splitText["PARAM_VAL"]) {
                        $data["parad"] = $splitText["TEXT"];
                    }
                }
            }




            /*

              $pAlpha = array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n");

              $pUse = $pInclude["INHOUSE_CASH"];
              $p2Use = $pInclude["INHOUSE_CASH_PASAL_3"];
              $p3Use = $pInclude["INHOUSE_CASH_PASAL_X"];
              $p4Use = $pInclude["INHOUSE_CASH_PINDAHKAVLING"];




              $dataAddData = $this->addData("pcount", "ptext", $wordParser, $pUse, $pAlpha, $data, $globalParams);
              $data = $dataAddData["data"];

              $dataAddDataB = $this->addData("pcountb", "ptextb", $wordParser, $p2Use, $pAlpha, $data, $globalParams);
              $data = $dataAddDataB["data"];

              // pasal x
              foreach ($p3Use as $row) {
              $splitText = $this->splitOptionText($row);
              if ($globalParams["PURCHASELETTER_TPL_PRINT_INH_CASH_BGN_PASALX_BATAL"] == $splitText["PARAM_VAL"]) {

              // ganti persen dengan nilai parameter global
              if (strpos($splitText["TEXT"], "[PERSEN_ANGKA]") !== FALSE) {
              $splitText["TEXT"] = str_replace("[PERSEN_ANGKA]", $globalParams["PURCHASELETTER_TPL_PRINT_INH_CASH_BGN_PASALX_PERSENTASE"], $splitText["TEXT"]);
              }
              if (strpos($splitText["TEXT"], "[PERSEN_TERBILANG]") !== FALSE) {
              $tempTerbilang = Erems_Box_Library_Terbilang::terbilang($globalParams["PURCHASELETTER_TPL_PRINT_INH_CASH_BGN_PASALX_PERSENTASE"], 3);
              $splitText["TEXT"] = str_replace("[PERSEN_TERBILANG]", str_replace("Rupiah", "", $tempTerbilang), $splitText["TEXT"]);
              }

              $data["parac"] = $splitText["TEXT"];
              }
              }

              //pasal pindah kavling
              foreach ($p4Use as $row) {

              $splitText = $this->splitOptionText($row);

              if ($globalParams["PURCHASELETTER_TPL_PRINT_INH_CASH_BGN_PASALXIV_PINDAHBLOK"] == $splitText["PARAM_VAL"]) {
              $data["parad"] = $splitText["TEXT"];
              }
              }

             */




            $spcData = $paramsTemplate["data"];
            //$spcFile = $paramsTemplate["file"];



            if ($spcData["pricetype_pricetype"] == "KPR") {
                $fileSrc = str_replace("INHOUSE_CASH", "KPR", $fileSrc);
                $fileSrc = $this->changeFileNameByProductCategory($spcData, $fileSrc);
            } else {
                $fileSrc = $this->changeFileNameByProductCategory($spcData, $fileSrc);
            }
        }

        //END SPT NEW CONCEPT
        //  var_dump($fileSrc);

        return array(
            "fileSrc" => $fileSrc,
            "data" => $data
        );
    }

    private function changeFileNameByProductCategory($data, $fileName) {
        if ($data["productcategory_productcategory"] == "KAVLING") {
            return str_replace("BANGUNAN", "KAVLING", $fileName);
        }

        return $fileName;
    }

    private function addData($kolomTextA, $kolomTextB, Erems_Box_Library_MyWordParser $wordParser, $ketentuanList, $hurufList, $data, $globalParams) {

        $count = 0;

        for ($i = 0; $i < count($ketentuanList); $i++) {

            //
            $optionTextExist = FALSE;
            $splitText = NULL;
            $optionText = "";
            if (strpos($ketentuanList[$i], '##') !== false) {
                // 
                // $optionText = $pUse[$i];

                $optionTextExist = TRUE;

                //  var_dump($optionText);
                $splitText = $this->splitOptionText($ketentuanList[$i]);


                /// sync global param dan option text
                foreach ($globalParams as $k => $v) {



                    if ($k == $splitText["PARAM_NAME"] && $v == $splitText["PARAM_VAL"]) {

                        $optionText = $splitText["TEXT"];
                    }
                }
            }

            if ($optionTextExist && strlen($optionText) > 0) {
                $data[$kolomTextA . '' . ($count + 1)] = $hurufList[$count] . ".";
                $data[$kolomTextB . '' . ($count + 1)] = $optionText;

                $count++;
            }

            if (!$optionTextExist) {
                $data[$kolomTextA . '' . ($count + 1)] = $hurufList[$count] . ".";
                $data[$kolomTextB . '' . ($count + 1)] = $ketentuanList[$i];

                $count++;
            }
        }

        $wordParser->addLoopingField(array($kolomTextA, $kolomTextB), $count);

        return array(
            "data" => $data
        );
    }

    private function splitOptionText($text) {
        $openChar = "[[";
        $closeChar = "]]";
        $posA = strpos($text, $openChar);
        $posB = strpos($text, $closeChar);

        $paramsText = substr($text, $posA + 2, $posB - 2);
        $params = explode("##", $paramsText);




        return array(
            "PARAM_NAME" => $params[0],
            "PARAM_VAL" => $params[1],
            "TEXT" => substr($text, strlen($paramsText) + 4, strlen($text))
        );
    }

    private function getTextConfig($priceType, $productCategory, $par=NULL) {

        $tcInhouseCashBgn = array(
            "PASAL2" => array(
                "Ijin mendirikan bangunan (IMB);",
                "Jaringan Air Bersih;",
                "Jaringan Listrik ".$par["unit_electricity"]." Watt;",
                "Pajak Pertambahan Nilai (PPN);",
                "[[PURCHASELETTER_TPL_PRINT_INH_CASH_BGN_PASAL2##OPTION 1]]Bea Perolehan Hak Atas Tanah dan Bangunan (BPHTB), Biaya Akta Jual Beli (AJB) di hadapan Pejabat Pembuat Akta Tanah (PPAT), Biaya Balik Nama (BBN) sertifikat hak atas tanah ke atas nama PIHAK KEDUA;",
                "[[WITH_ASURANSI##TRUE]]Biaya premi asuransi jiwa dari PT Asuransi Ciputra Indonesia (CiputraLife)"
            ),
            "PASAL3" => array(
                "Pajak Pertambahan Nilai Barang Mewah (PPNBM);",
                "Biaya Administrasi (apabila ada);",
                "Biaya Iuran Pemeliharaan Lingkungan (IPL) dan Biaya Utilitas;",
                "Semua Bea/Pajak, Biaya, Retribusi, Pungutan lainnya berdasarkan keputusan atau peraturan pemerintah yang berlaku.",
                "[[PURCHASELETTER_TPL_PRINT_INH_CASH_BGN_PASAL3##OPTION 2]]Bea Perolehan Hak Atas Tanah dan Bangunan (BPHTB), Biaya Akta Jual Beli (AJB) di hadapan Pejabat Pembuat Akta Tanah (PPAT), Biaya Balik Nama (BBN) sertifikat hak atas tanah ke atas nama PIHAK KEDUA;",
                //"Semua Bea/Pajak, Biaya, Retribusi, Pungutan lainnya berdasarkan keputusan atau peraturan pemerintah yang berlaku.",
                "[[WITH_ASURANSI##FALSE]]Biaya premi asuransi jiwa dari PT Asuransi Ciputra Indonesia (CiputraLife)"
            ),
            "PASALX" => array(
                "[[PURCHASELETTER_TPL_PRINT_INH_CASH_BGN_BATAL##OPTION 1]]Selain yang telah diatur dalam butir V di atas, apabila pemesan lalai dalam hal kurang atau terlambat melakukan suatu pembayaran yang berlangsung hingga 3 (tiga) bulan berturut-turut terhitung sejak tanggal permulaan kelalaian terjadi, maka ".$par["pt_name"]." dapat membatalkan Surat Pemesanan ini sesuai butir XIII di bawah dan uang yang sudah dibayarkan oleh pemesan kepada ".$par["pt_name"]." akan dikembalikan dengan syarat pemesan mengembalikan kepada ".$par["pt_name"]." Asli Surat Pemesanan ini dan seluruh Asli kwitansi pembayaran terkait. Seluruh pengembalian tersebut adalah tanpa bunga apapun juga, setelah dipotong biaya administrasi pembatalan sebesar [PERSEN_ANGKA]% ([PERSEN_TERBILANG] persen) dari jumlah seluruh uang yang telah dibayar oleh pemesan kepada ".$par["pt_name"].", berikut PPN, PPh dan Tanda Jadi tidak dapat ditarik kembali dari  ".$par["pt_name"].".",
                "[[PURCHASELETTER_TPL_PRINT_INH_CASH_BGN_BATAL##OPTION 2]]Selain yang telah diatur dalam butir V di atas, apabila pemesan lalai dalam hal kurang atau terlambat melakukan suatu pembayaran yang berlangsung hingga 3 (tiga) bulan berturut-turut terhitung sejak tanggal permulaan kelalaian terjadi, maka ".$par["pt_name"]."dapat membatalkan Surat Pemesanan ini sesuai butir XIV di bawah, maka seluruh pembayaran yang telah dilakukan pemesan [tidak dapat dituntut kembali atau ditarik dari ".$par["pt_name"]."."
            ),
            "PINDAHKAVLING" => array(
                "[[PURCHASELETTER_TPL_PRINT_INH_CASH_BGN_PINDAHBLOK##OPTION 1]]0.5% (nol koma lima) persen dari harga jual sebelum PPN berdasarkan Surat Pemesanan ini",
                "[[PURCHASELETTER_TPL_PRINT_INH_CASH_BGN_PINDAHBLOK##OPTION 2]]Rp. 1.000.000.- (satu juta rupiah)."
            ),
        );

        $tcInhouseCashKav = array(
            "PASAL2" => array("Jaringan Air Bersih;",
                "Jaringan Listrik ".$par["unit_electricity"]." Watt;",
                "Pajak Pertambahan Nilai (PPN);",
                "[[PURCHASELETTER_TPL_PRINT_INH_CASH_KAV_PASAL2##OPTION 1]]Bea Perolehan Hak Atas Tanah dan Bangunan (BPHTB), Biaya Akta Jual Beli (AJB) di hadapan Pejabat Pembuat Akta Tanah (PPAT), Biaya Balik Nama (BBN) sertifikat hak atas tanah ke atas nama PIHAK KEDUA;",
                "[[WITH_ASURANSI##TRUE]]Biaya premi asuransi jiwa dari PT Asuransi Ciputra Indonesia (CiputraLife)"
            ),
            "PASAL3" => array(
                "Ijin mendirikan bangunan (IMB);",
                "Biaya Akta Jual Beli (AJB) di hadapan Pejabat Pembuat Akta Tanah (PPAT);",
                "Biaya Iuran Pemeliharaan Lingkungan (IPL) dan Biaya Utilitas;",
                "Biaya penyambungan listrik dan air bersih",
                "Pajak Pertambahan Nilai Membangun Sendiri (sesuai ketentuan pemerintah)",
                "[[PURCHASELETTER_TPL_PRINT_INH_CASH_KAV_PASAL3##OPTION 2]]Biaya Pemecahan sertikat hak atas tanah",
                "Bea Perolehan Hak Atas Tanah dan Bangunan (BPHTB), ",
                "Biaya Akta Jual Beli (AJB) di hadapan Pejabat Pembuat Akta Tanah (PPAT),",
                "Biaya Balik Nama (BBN) sertifikat hak atas tanah ke atas nama PIHAK KEDUA",
                "Semua Bea/Pajak, Biaya, Retribusi, Pungutan lainnya berdasarkan keputusan atau peraturan pemerintah yang berlaku.",
                "Biaya Administrasi (apabila ada);",
                "[[WITH_ASURANSI##FALSE]]Biaya premi asuransi jiwa dari PT Asuransi Ciputra Indonesia (CiputraLife)"
            ),
            "PASALX" => array(
                "[[PURCHASELETTER_TPL_PRINT_INH_CASH_KAV_BATAL##OPTION 1]]Selain yang telah diatur dalam butir V di atas, apabila pemesan lalai dalam hal kurang atau terlambat melakukan suatu pembayaran yang berlangsung hingga 3 (tiga) bulan berturut-turut terhitung sejak tanggal permulaan kelalaian terjadi, maka ".$par["pt_name"]." dapat membatalkan Surat Pemesanan ini sesuai butir XIII di bawah dan uang yang sudah dibayarkan oleh pemesan kepada ".$par["pt_name"]." akan dikembalikan dengan syarat pemesan mengembalikan kepada ".$par["pt_name"]." Asli Surat Pemesanan ini dan seluruh Asli kwitansi pembayaran terkait. Seluruh pengembalian tersebut adalah tanpa bunga apapun juga, setelah dipotong biaya administrasi pembatalan sebesar [PERSEN_ANGKA]% ([PERSEN_TERBILANG] persen) dari jumlah seluruh uang yang telah dibayar oleh pemesan kepada ".$par["pt_name"].", berikut PPN, PPh dan Tanda Jadi tidak dapat ditarik kembali dari  ".$par["pt_name"].".",
                "[[PURCHASELETTER_TPL_PRINT_INH_CASH_KAV_BATAL##OPTION 2]]Selain yang telah diatur dalam butir V di atas, apabila pemesan lalai dalam hal kurang atau terlambat melakukan suatu pembayaran yang berlangsung hingga 3 (tiga) bulan berturut-turut terhitung sejak tanggal permulaan kelalaian terjadi, maka ".$par["pt_name"]."dapat membatalkan Surat Pemesanan ini sesuai butir XIV di bawah, maka seluruh pembayaran yang telah dilakukan pemesan [tidak dapat dituntut kembali atau ditarik dari ".$par["pt_name"].""
            ),
            "PINDAHKAVLING" => array(
                "[[PURCHASELETTER_TPL_PRINT_INH_CASH_KAV_PINDAHBLOK##OPTION 1]]0.5% (nol koma lima) persen dari harga jual sebelum PPN berdasarkan Surat Pemesanan ini",
                "[[PURCHASELETTER_TPL_PRINT_INH_CASH_KAV_PINDAHBLOK##OPTION 2]]Rp. 1.000.000.- (satu juta rupiah)."
            )
        );


        $tcKprBgn = array(
            "PASAL2" => array(
                "Ijin Mendirikan Bangunan (IMB);",
                "Jaringan Air Bersih;",
                "Jaringan Listrik ".$par["unit_electricity"]." Watt;  ",
                "Pajak Pertambahan Nilai (PPN);",
                "Bea Perolehan Hak Atas Tanah dan Bangunan (BPHTB), Biaya Akta Jual Beli (AJB) di hadapan Pejabat Pembuat Akta Tanah (PPAT), Biaya Balik Nama (BBN) sertifikat hak atas tanah ke atas nama pemesan;",
                "[[UM>=12]]Biaya premi asuransi jiwa untuk proteksi pembayaran Uang Muka dari PT Asuransi Ciputra Indonesia (CiputraLife)",
            ),
            "PASAL3" => array(
                "Pajak Pertambahan Nilai Barang Mewah (PPNBM);",
                "Biaya Administrasi (apabila ada);",
                "Biaya Iuran Pemeliharaan Lingkungan (IPL) dan Biaya Utilitas;",
                "Semua Bea/Pajak, Biaya, Retribusi, Pungutan lainnya berdasarkan keputusan atau peraturan pemerintah yang berlaku.",
                "Biaya premi dan asuransi jiwa berjangka menurun PT Asuransi Ciputra Indonesia (Ciputra Life) dengan manfaar pertanggungan senilai fasilitas KPR dari Bank."
            ),
            "PASALX" => array(
                "[[PURCHASELETTER_TPL_PRINT_KPR_BGN_BATAL##OPTION 1]]Selain yang telah diatur dalam butir V di atas, apabila pemesan lalai dalam hal kurang atau terlambat melakukan suatu pembayaran yang berlangsung hingga 3 (tiga) bulan berturut-turut terhitung sejak tanggal permulaan kelalaian terjadi, maka ".$par["pt_name"]." dapat membatalkan Surat Pemesanan ini sesuai butir XIII di bawah dan uang yang sudah dibayarkan oleh pemesan kepada ".$par["pt_name"]." akan dikembalikan dengan syarat pemesan mengembalikan kepada ".$par["pt_name"]." Asli Surat Pemesanan ini dan seluruh Asli kwitansi pembayaran terkait. Seluruh pengembalian tersebut adalah tanpa bunga apapun juga, setelah dipotong biaya administrasi pembatalan sebesar [PERSEN_ANGKA]% ([PERSEN_TERBILANG] persen) dari jumlah seluruh uang yang telah dibayar oleh pemesan kepada ".$par["pt_name"].", berikut PPN, PPh dan Tanda Jadi tidak dapat ditarik kembali dari  ".$par["pt_name"].".",
                "[[PURCHASELETTER_TPL_PRINT_KPR_BGN_BATAL##OPTION 2]]Selain yang telah diatur dalam butir V di atas, apabila pemesan lalai dalam hal kurang atau terlambat melakukan suatu pembayaran yang berlangsung hingga 3 (tiga) bulan berturut-turut terhitung sejak tanggal permulaan kelalaian terjadi, maka ".$par["pt_name"]."dapat membatalkan Surat Pemesanan ini sesuai butir XIV di bawah, maka seluruh pembayaran yang telah dilakukan pemesan [tidak dapat dituntut kembali atau ditarik dari ".$par["pt_name"]."]"
            ),
            "PINDAHKAVLING" => array(
                "[[PURCHASELETTER_TPL_PRINT_KPR_BGN_PINDAHBLOK##OPTION 1]]0.5% (nol koma lima) persen dari harga jual sebelum PPN berdasarkan Surat Pemesanan ini",
                "[[PURCHASELETTER_TPL_PRINT_KPR_BGN_PINDAHBLOK##OPTION 2]]Rp. 1.000.000.- (satu juta rupiah)."
            )
        );

        $tcKprKav = array(
            "PASAL2" => array(
                "Jaringan Air Bersih;",
                "Jaringan Listrik ".$par["unit_electricity"]." Watt;",
                "Pajak Pertambahan Nilai (PPN);",
                "[[PURCHASELETTER_TPL_PRINT_KPT_KAV_PASAL2##OPTION 1]]Bea Perolehan Hak Atas Tanah dan Bangunan (BPHTB), Biaya Akta Jual Beli (AJB) di hadapan Pejabat Pembuat Akta Tanah (PPAT), Biaya Balik Nama (BBN) sertifikat hak atas tanah ke atas nama PIHAK KEDUA;",
                "[[UM>=12]]Biaya premi asuransi jiwa untuk proteksi pembayaran Uang Muka dari PT Asuransi Ciputra Indonesia (CiputraLife)"
            ),
            "PASAL3" => array(
                "Ijin mendirikan bangunan (IMB)",
                "Biaya Akta Jual Beli (AJB) di hadapan Pejabat Pembuat Akta Tanah (PPAT);",
                "Biaya Iuran Pemeliharaan Lingkungan (IPL) dan Biaya Utilitas;",
                "Biaya penyambungan listrik dan air bersih",
                "Pajak Pertambahan Nilai Membangun Sendiri (sesuai ketentuan pemerintah)",
                "[[PURCHASELETTER_TPL_PRINT_KPT_KAV_PASAL3##OPTION 1]]Biaya Pemecahan sertikat hak atas tanah",
                "Bea Perolehan Hak Atas Tanah dan Bangunan (BPHTB), ",
                "Biaya Akta Jual Beli (AJB) di hadapan Pejabat Pembuat Akta Tanah (PPAT), ",
                "Biaya Balik Nama (BBN) sertifikat hak atas tanah ke atas nama PIHAK KEDUA ",
                "Semua Bea/Pajak, Biaya, Retribusi, Pungutan lainnya berdasarkan keputusan atau peraturan pemerintah yang berlaku.",
                "Biaya Administrasi (apabila ada);",
                "Biaya premi asuransi jiwa berjangka menurun dari PT Asuransi Ciputra Indonesia (CiputraLife) dengan manfaat pertanggungan senilai fasilitas KPR dari Bank."
            ),
            "PASALX" => array(
                "[[PURCHASELETTER_TPL_PRINT_KPT_KAV_BATAL##OPTION 1]]Selain yang telah diatur dalam butir V di atas, apabila pemesan lalai dalam hal kurang atau terlambat melakukan suatu pembayaran yang berlangsung hingga 3 (tiga) bulan berturut-turut terhitung sejak tanggal permulaan kelalaian terjadi, maka ".$par["pt_name"]." dapat membatalkan Surat Pemesanan ini sesuai butir XIII di bawah dan uang yang sudah dibayarkan oleh pemesan kepada ".$par["pt_name"]." akan dikembalikan dengan syarat pemesan mengembalikan kepada ".$par["pt_name"]." Asli Surat Pemesanan ini dan seluruh Asli kwitansi pembayaran terkait. Seluruh pengembalian tersebut adalah tanpa bunga apapun juga, setelah dipotong biaya administrasi pembatalan sebesar [PERSEN_ANGKA]% ([PERSEN_TERBILANG] persen) dari jumlah seluruh uang yang telah dibayar oleh pemesan kepada ".$par["pt_name"].", berikut PPN, PPh dan Tanda Jadi tidak dapat ditarik kembali dari  ".$par["pt_name"].".",
                "[[PURCHASELETTER_TPL_PRINT_KPT_KAV_BATAL##OPTION 2]]Selain yang telah diatur dalam butir V di atas, apabila pemesan lalai dalam hal kurang atau terlambat melakukan suatu pembayaran yang berlangsung hingga 3 (tiga) bulan berturut-turut terhitung sejak tanggal permulaan kelalaian terjadi, maka ".$par["pt_name"]."dapat membatalkan Surat Pemesanan ini sesuai butir XIV di bawah, maka seluruh pembayaran yang telah dilakukan pemesan [tidak dapat dituntut kembali atau ditarik dari ".$par["pt_name"]."]"
            ),
            "PINDAHKAVLING" => array(
                "[[PURCHASELETTER_TPL_PRINT_KPT_KAV_PINDAHBLOK##OPTION 1]]0.5% (nol koma lima) persen dari harga jual sebelum PPN berdasarkan Surat Pemesanan ini",
                "[[PURCHASELETTER_TPL_PRINT_KPT_KAV_PINDAHBLOK##OPTION 2]]Rp. 1.000.000.- (satu juta rupiah)."
            )
        );

        if ($priceType == "CASH" || $priceType == "INHOUSE") {
            if ($productCategory == "BANGUNAN") {
                return $tcInhouseCashBgn;
            } else {
                return $tcInhouseCashKav;
            }
        } else {
            if ($productCategory == "BANGUNAN") {
                return $tcKprBgn;
            } else {
                return $tcKprKav;
            }
        }
    }

    private function processDbParams($dbParams) {
        $params = array(
            "WITH_ASURANSI" => "FALSE",
            "PURCHASELETTER_TPL_PRINT_INH_CASH_BGN_PASAL2" => NULL,
            "PURCHASELETTER_TPL_PRINT_INH_CASH_BGN_PASAL3" => NULL,
            "PURCHASELETTER_TPL_PRINT_INH_CASH_BGN_BATAL" => NULL,
            "PURCHASELETTER_TPL_PRINT_INH_CASH_BGN_BATAL_PERSENTASE" => NULL,
            "PURCHASELETTER_TPL_PRINT_INH_CASH_BGN_PINDAHBLOK" => NULL,
            "PURCHASELETTER_TPL_PRINT_INH_CASH_KAV_PASAL2" => NULL,
            "PURCHASELETTER_TPL_PRINT_INH_CASH_KAV_PASAL3" => NULL,
            "PURCHASELETTER_TPL_PRINT_INH_CASH_KAV_BATAL" => NULL,
            "PURCHASELETTER_TPL_PRINT_INH_CASH_KAV_BATAL_PERSENTASE" => NULL,
            "PURCHASELETTER_TPL_PRINT_INH_CASH_KAV_PINDAHBLOK" => NULL,
            "PURCHASELETTER_TPL_PRINT_KPR_BGN_BATAL" => NULL,
            "PURCHASELETTER_TPL_PRINT_KPR_BGN_BATAL_PERSENTASE" => NULL,
            "PURCHASELETTER_TPL_PRINT_KPR_BGN_PINDAHBLOK" => NULL,
            "PURCHASELETTER_TPL_PRINT_KPT_KAV_PASAL2" => NULL,
            "PURCHASELETTER_TPL_PRINT_KPT_KAV_PASAL3" => NULL,
            "PURCHASELETTER_TPL_PRINT_KPT_KAV_BATAL" => NULL,
            "PURCHASELETTER_TPL_PRINT_KPT_KAV_BATAL_PERSENTASE" => NULL,
            "PURCHASELETTER_TPL_PRINT_KPT_KAV_PINDAHBLOK" => NULL
        );

        foreach ($dbParams as $row) {
            //  var_dump($row);
            foreach ($params as $k => $v) {
                if ($row["parametername"] == $k) {
                    $params[$k] = $row["value"];
                }
            }
        }

        return $params;
    }

    public static function getTemplate() {
        return array(
            array("value" => "all\PurchaseLetter-Revisi.INHOUSE_CASH.BANGUNAN-ASURANSI-.docx", "text" => "SPT dengan Asuransi"),
            array("value" => "all\PurchaseLetter-Revisi.INHOUSE_CASH.BANGUNAN.docx", "text" => "SPT")
        );
    }

}
