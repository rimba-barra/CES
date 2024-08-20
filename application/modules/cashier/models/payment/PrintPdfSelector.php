<?php

class Cashier_Models_Payment_PrintPdfSelector {

    public static function getLib($projectId, $ptId) {
        if ($projectId == 108 && $ptId == 2090) { // BWM Cilegon
        //if ($projectId == 2020 && $ptId == 1089) { // BWM Cilegon
            $pdf = new Cashier_Models_Library_TcpdfBmwCilegon();
		}else if ($projectId == 5 && $ptId == 38) { // Citra Indah
            $pdf = new Cashier_Models_Library_TcpdfCitraIndah();
		}else if ($projectId == 2019 && $ptId == 2096) { // Bizpark 3 Bekasi
            $pdf = new Cashier_Models_Library_TcpdfBizpark3Bekasi();
		}else if ($projectId == 35) { // Bizpark Bandung
            $pdf = new Cashier_Models_Library_TemplatepaymentPdf();
		}else if ($projectId == 2069) { // Citraland Lampung 
            $pdf = new Cashier_Models_Library_TcpdfCitralandLampung();
		}else if ($projectId == 2076) { // Citraland Mekarsari 
            $pdf = new Cashier_Models_Library_TcpdfCitralandCibubur();
		}else if ($projectId == 3028) { 
            $pdf = new Cashier_Models_Library_TcpdfLosariMakassar();
		}else if ($projectId == 3031) { 
            $pdf = new Cashier_Models_Library_TcpdfTallasaMakassar();
		}else if ($projectId == 3032) { 
            $pdf = new Cashier_Models_Library_TcpdfMakassar();
		}else if ($projectId == 9) { // Citragran Cibubur
            $pdf = new Cashier_Models_Library_TcpdfCitraGranCibubur();
		}else if ($projectId == 48) { // Citraland Palu
            $pdf = new Cashier_Models_Library_TcpdfPalu();
		}else if ($projectId == 31) { // Citraland Pekanbaru
            $pdf = new Cashier_Models_Library_TemplatePekanBaru();
		}else if ($projectId == 30) { // Citraland Bagya medan
            $pdf = new Cashier_Models_Library_TemplateCitralandBagyaMedan();
		}else if ($projectId == 105) { // Citraland greenlake surabaya
            $pdf = new Cashier_Models_Library_TcpdfCitralandGreenlakeSurabaya();
		}else if ($projectId == 36) { // Citrasungarden Semarang
            $pdf = new Cashier_Models_Library_TcpdfCitraSunSemarang();
        }else if ($projectId == 38) { // Citragran Semarang
            $pdf = new Cashier_Models_Library_TcpdfCitragranSemarang();
        }else if ($projectId == 42) { 
            $pdf = new Cashier_Models_Library_TemplateCitragardenSidoarjo();	
		}else if ($projectId == 44) { // The Taman Dayu Pandaaan
            $pdf = new Cashier_Models_Library_TcpdfTamanDayu();	
		}else if ($projectId == 61) { // CITRAGRAND YOGYA
            $pdf = new Cashier_Models_Library_TemplateCitragrandYogya();	
		}else if ($projectId == 37) { // CITRASUN YOGYA
            $pdf = new Cashier_Models_Library_TemplateCitrasunYogya();	
		}else if ($projectId == 47) { // CITRALAND KENDARI
            $pdf = new Cashier_Models_Library_TemplateCitralandKendari();	
		}else if ($projectId == 2075) { // CITRAGRAN CIBUBUR UTARA
            $pdf = new Cashier_Models_Library_TemplateCitragranCibuburUtara();	
		}else if ($ptId == 12) {  // ALL CWJ 2
            $pdf = new Cashier_Models_Library_Tcpdf();
        } else {
          //  $pdf = new Cashier_Models_Library_Tcpdf();
		   $pdf = new Cashier_Models_Library_TemplatepaymentPdf();
        }
		//
        
        return $pdf;
    }

}
