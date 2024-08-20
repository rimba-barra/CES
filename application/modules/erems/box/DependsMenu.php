<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of DependsMenu
 *
 * @author HADI-MIS
 */
class Erems_Box_DependsMenu {
    public static function getDependsMenu($apps_module){
    	$return = '';
    	if($apps_module === 'erems'){
	    	$return = 
			    'switch(name) {
		    		case "PurchaseletterNew":
		    			depends = ["Mastercluster","Masterpencairankomisi","Masterpenerimakomisi"];
		    			break;
		    		case "Masterbankkpr":
		    			depends = ["Pwawancarareport"];
		    			break;
		    		case "Clusterfacilities":
		    			depends = ["Sppjb"];
		    			break;
		    		case "Ajbbphtb":
		    			depends = ["Mastercluster","Masternotaris"];
		    			break;
		    		case "Hgbsplit":
		    			depends = ["Masterblock","Mastercluster","Sspssb"];
		    			break;
		    		case "Sspssb":
		    			depends = ["Mastercluster","Cancelreport","Pengalihanhak"];
		    			break;
		    		case "Bagihasilproses":
		    		case "Bagihasilpilihdata":
		    			depends = ["Mastercluster","Masterblock"];
		    			break;
		    		case "Complaint":
		    		case "Pengalihanhak":
		    		case "Aktappjb":
		    		case "Bagihasilproses":
		    		case "Bagihasilpilihdata":
		    		case "Recommendedtocancel":
		    		case "Writeoffdenda":
		    		case "Warningjatuhtempo":
		    		case "Batallunas":
		    		case "Pelunasan":
		    		case "Paymentreturn":
		    		case "Admincollectioncashier":
		    		case "Admincollection":
		    		case "Expenserequest":
		    		case "Purchaseletterrevision":
		    		case "Marketingstock":
		    		case "Constconstallreport":
		    		case "Legalakadsudahajbreport":
		    		case "Legalstatusakadreport":
		    		case "Legalppjbajbreport":
		    		case "Legalkonfirmasiakadreport":
		    		case "Legalbelumhgbpecahanreport":
		    		case "Legalimbreport":
		    		case "Legalsudahajbbelumstreport":
		    		case "Legalsudahaktappjbreport":
		    		case "Legalbelumaktappjbreport":
		    		case "Legalbelumsppjbreport":
		    		case "Legalmonitorsppjbreport":
		    		case "Legalbelumajbreport":
		    		case "Legalpecahsudahhgbajbreport":
		    		case "Detailterminreport":
		    		case "Stpembayaranreport":
		    		case "Tjjtreport":
		    		case "Cancelreport":
		    		case "Masterdownline":
		    		case "Masterformula":
		    		case "Collagingreport":
		    		case "Klaimkomisinew":
		    		case "Schedulemonitor":
		    		case "Biayalegalitas":
		    			depends = ["Mastercluster"];
		    			break;
		    		case "Skl":
		    			depends = ["Paymentreturn"];
		    			break;
		    		case "Discountcollection":
		    			depends = ["Fakturpajak","Masterkoefisien"];
		    			break;
		    		case "Cancellation":
		    			depends = ["Pengalihanhak","Buktipemilik"];
		    			break;
		    		case "Aftersalespengawasreport":
		    		case "Aftersalesperbaikanreport":
		    			depends = ["Complaint"];
		    			break;
		    		case "Legalsudahsppjbreport":
		    			depends = ["Fakturpajak","Mastercluster"];
		    			break;
		    		case "Pakreditreport":
		    			depends = ["Masteruploadlivestock"];
		    			break;
		    		case "Collagingescrowreport":
		    		case "Collagingescrowdatereport":
		    			depends = ["Fakturpajak"];
		    			break;
		    		case "Masterpencairankomisi":
		    			depends = ["Masterdistchannel"];
		    			break;
		    		case "Permintaankomisi":
		    			depends = ["Admincollection","Utility","Kartupiutang"];
		    			break;
		    		case "Changeprice":
		    		case "Pindahkavling":
		    			depends = ["Purchaseletter"];
		    			break;
		    		case "Expenserequestview":
		    			depends = ["Cashierreport"];
		    			break;
		    		default:
			    		depends = [];
		    			break;
		    	}';
    	}
    	return json_encode($return);
    	// for load all controller
		// depends = ["Keuanganmodelb","Keuanganmodelareport","Bagihasilproses","Bagihasilpilihdata","Popupbelumst","Popupbelumimb","Popupbelumhgbcustomer","Popupbelumhgbpt","Popupbelumajblist","Popupbelumsppjb","Popuppembatalan","Popupsudahakadkredit","Popupbelumakadkredit","Popupsudahprogressbelumcair","RekapstockReport","TownPlanningReport","Sempatmonitoring","Popupkavlingsiapst","Popupbangunansiapst","Popupbelumajb","Popupnamasementara","Popupgeneralinformation","Popupunitspk","Popupjatuhtempo","Popupholdbook","Popupcairksng","Popupbayarpersenharilalu","Stockblmsiapjual","Popupsiapkomisi","Promosdhbyr","Popupbayarpersenblmst","Popupchgkavlingsatubulan","Popupjatuhtempofilter","Popupdenda","Popupchgnamesatubulan","Popupchgpricesatubulan","Popupchangecancelrev","Popuppurchasesatubulan","Prosessms","Cashierreport","Generalumlunasblmsp3kreport","Generalkprsudahakadblmcairreport","Generalakadvspencairankprreport","Generalumvskpraccbelumakadreport","Generalsudahsp3kbelumakadreport","Generalbelumstreport","Generalsudahsp3kreport","Generalkelengkapanberkasreport","Generalkprbelumberkasreport","Aftersalespdamkwhreport","Aftersalesbelumstreport","Aftersalespengawasreport","Aftersalesperbaikanreport","Aftersalesstatushunianreport","Aftersalesstrumahreport","Constconstallreport","Constprogressconstreport","Constorderpembangunanreport","Constrencanastreport","Legalsudahaktappjbreport","Legalbelumaktappjbreport","Legalsudahsppjbreport","Legalbelumsppjbreport","Legalmonitorsppjbreport","Legalsudahajbreport","Legalpecahsudahhgbajbreport","Legalbelumajbreport","Legalakadsudahajbreport","Legalstatusakadreport","Legalppjbajbreport","Legalkonfirmasiakadreport","Legalbelumhgbpecahanreport","Legalimbreport","Legalsudahajbbelumstreport","Detailterminreport","Cashinpaymentreport","Cashinreport","Fakturtagihanreport","Pwawancarareport","Pakreditreport","Stpembayaranreport","Pembayaranbcreport","Collkprbelumaccreport","Collkprperbankreport","Piutangjtreport","Collbelumberkasreport","Collgirojatuhtemporeport","Collagingdatereport","Collagingescrowdatereport","Collagingescrowreport","Monitoringdendareport","Collagingreport","Opportunitycustomerreport","Daftarpembelireport","Salesdireksireport","Generalsalesreport","Salesperubahanreport","Salesmediapromosireport","Cancelreport","Lastpricereport","Qsreport","Stockmepurnajualreport","Stockmereport","Tjjtreport","Spkclose","Spkcancel","Spk","Progressnonunit","Progressunit","Recommendedtocancel","Writeoffdenda","Skl","Followup","Warningjatuhtempo","Discountcollection","Batallunas","Pelunasan","Cancellation","Paymentreturn","Admincollectioncashier","Admincollection","Pemutihan","Backlog","Complaint","Utility","Pphpayment","Expenserequestview","Expenserequest","Kartupiutang","Nonlinkpayment","Otherspayment","Installmentpayment","Schedulemonitor","Ktpiutangfin","Hpptanah","Sppjbsby","Purchaseletterpbb","Formorderijb","Formorderajb","Hgbsplit","Ajbbphtb","Sspssb","Pengalihanhak","Buktipemilik","Aktappjb","Sppjb","Townplanninglegal","PurchaseletterNew","PurchaseletterSH2","Prosescac","Purchaseletterrevision","Pindahkavling","Changeprice","Gantinama","Purchaseletter","Marketingstock","Klaimkomisi","Komisitran","Reservation","Masterfakturpajakcounter","Masterparameterglobal","Utilitytypeb","Mastergaransi","Mastercomplainttype","Mastergirik","Masterpbbinduk","Masternotaris","Masterparametersppjb","Masterhgbinduk","Batasplafon","Plafon","Mastercontractor","Masterlrpsharingparameter","Masterlandrepayment","Paymenttype","Sourcemoney","Scheduletype","Paymentmethod","Mastertargetsales","Masterdownline","Masterupline","Masterdiscountmarketing","Masterpekerjaankonsumen","Masteralasangantinama","Masteralasanbatal","Mastersimulasikpr","Masteruangmasuk","Masterpromotionmedia","Mastermovereason","Mastercac","Masterlokasipenjualan","Masterbankkpr","Mastercitraclub","Masterformula","Opportunitycustomer","Mastercustomer","Masterreward","Masterkomisi","Masterbank","Verification","Fakturpajak","Townplanning","Masteruploadlivestock","Masterproductcategory","Mastertype","Masterattribute","Masterblock","Masterposisi","Masterpurpose","Mastercluster","Masterside","Clusterfacilities","Projectfacilities","Facilitiestype","Masterpencairankomisi","Masterkaryawan","Masterdistchannel","Masterpenerimakomisi","Masterpricelist","Masterkoefisien"];
	}
}