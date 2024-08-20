<?php

/**
 * Description of Creator
 *
 * @author MIS
 */
class Erems_Box_Models_App_Creator {
    public function create($className="",$params=""){
        switch($className){   
            case 'aftersales':
                return new Erems_Models_Aftersales_AfterSales();
                break;
            case 'appjb':
                return new Erems_Models_Legal_AktaPPJB();
                break;
            case 'attribute':
                return new Erems_Models_Attribute_Attribute();
                break;
            case 'attributetype':
                return new Erems_Models_Attribute_Type();
                break;
            case 'attributevalue':
                return new Erems_Models_Attribute_Value();
                break;
            case 'backlog':
                return new Erems_Models_Backlog();
                break;
            case 'bank':
                return new Erems_Models_Master_Bank();
                break;
            case 'bankkpr':
                return new Erems_Models_Master_BankKPR();
                break;
            case 'batasplafon':
                return new Erems_Models_Construction_BatasPlafon();
                break;
			/*start added by ahmad riadi */	
		    case 'bentukusaha':
                return new Erems_Models_Master_Bentukusaha();
                break;	
		   /*end added by ahmad riadi */		
            case 'billingrules':
                return new Erems_Models_Sales_BillingRules();
                break;
            case 'billingrulesballoon':
                return new Erems_Models_Sales_BillingRulesBalloon();
                break;
            case 'billingrulestran':
                return new Erems_Models_Sales_BillingRulesTran();
                break;
            case 'block':
                return new Erems_Models_Master_Block();
                break;
            case 'blockb':
                return new Erems_Models_Master_BlockB($params);
                break;
            case 'blocktran':
                return new Erems_Models_Master_BlockTran($params);
                break;
            case 'buktipemilik':
                return new Erems_Models_Legal_BuktiPemilik();
                break;
            case 'cac':
                return new Erems_Models_Master_CAC();
                break;
            case 'cancelreason':
                return new Erems_Models_Sales_Reason_CancelReason();
                break;
            case 'changekavling':
                return new Erems_Models_Sales_Change_ChangeKavling();
                break;
            case 'changekavlingreason':
                return new Erems_Models_Sales_Reason_MoveReason();
                break;
            case 'changename':
                return new Erems_Models_Sales_Change_ChangeName();
                break;
            case 'changenamereason':
                return new Erems_Models_Sales_Reason_GantiNama();
                break;
            case 'changeprice':
                return new Erems_Models_Sales_Change_ChangePrice();
                break;
            case 'cashiercash':
                return new Erems_Models_Payment_PaymentCashier();
                break;
            case 'city':
                return new Erems_Models_Master_City($params);
                break;
            case 'citraclub':
                return new Erems_Models_Master_CitraClub();
                break;
            case 'cluster':
                return new Erems_Models_Master_Cluster();
                break;
            case 'clusterb':
                return new Erems_Models_Master_ClusterB($params);
                break;
            case 'clusterfacilities':
                return new Erems_Models_Master_ClusterFacilities();
                break;
            case 'clusterfacilitiesimage':
                return new Erems_Models_Master_ClusterFacilitiesImage();
                break;
            case 'clustertran':
                return new Erems_Models_Master_ClusterTran();
                break;
            case 'clusterimage':
                return new Erems_Models_Master_ClusterImage($params);
                break;
            case 'coaconfig':
                return new Erems_Models_Master_CoaConfig();
                break;
            case 'coaconfigdetail':
                return new Erems_Models_Master_CoaConfigDetail();
                break;
            case 'collector':
                return new Erems_Models_Sales_Collector();
                break;
            case 'conscair':
                return new Erems_Models_Construction_Pencairan();
                break;
            case 'constarget':
                return new Erems_Models_Construction_Target();
                break;
            case 'construction':
                return new Erems_Models_Construction_Construction();
                break;
            case 'constructionb':
                return new Erems_Models_Construction_Constructionb();
                break;
            case 'constructionpicture':
                return new Erems_Models_Construction_Picture();
                break;
            case 'contractor':
                return new Erems_Models_Master_Contractor();
                break;
            case 'contractorprofile':
                return new Erems_Models_Master_ContractorProfile();
                break;
            case 'country':
                return new Erems_Models_Master_Country();
                break;
            case 'customer':
                return new Erems_Models_Master_Customer($params);
                break;
            case 'customeraddress':
                return new Erems_Models_Customer_CustomerAddress();
                break;
            case 'customerdocument':
                return new Erems_Models_Customer_CustomerDocument();
                break;
            case 'customerdocumenthistory':
                return new Erems_Models_Customer_CustomerDocumentHistory();
                break;
            case 'customerdocumentphone':
                return new Erems_Models_Customer_CustomerDocumentPhone();
                break;
            case 'customerdocumentkomunikasi':
                return new Erems_Models_Customer_CustomerDocumentKomunikasi();
                break;
            case 'customerprofile':
                return new Erems_Models_Master_CustomerProfile($params);
                break;
            case 'customerrevision':
                return new Erems_Models_Customerrevision_Customerrevision();
                break;
            case 'department':
                return new Erems_Models_Master_Department();
                break;
            case 'documenttype':
                return new Erems_Models_Master_DocumentType();
                break;
            case 'downline':
                return new Erems_Models_Master_Downline();
                break;
            case 'education':
                return new Erems_Models_Master_Education();
                break;
            case 'employee':
                return new Erems_Models_Hrd_Employee($params);
                break;
            case 'expense':
                return new Erems_Models_Expenserequest_Expense();
                break;
            case 'expensedetail':
                return new Erems_Models_Expenserequest_ExpenseDetail();
                break;
            case 'expensetype':
                return new Erems_Models_Master_ExpenseType();
                break;
            case 'extensionobject':
                return new Erems_Box_Models_App_ExtensionObject($params);
                break;
            case 'facilitiestype':
                return new Erems_Models_Master_FacilitiesType($params);
                break;
            case 'foo':
                return new Erems_Models_Foo_Foo();
                break;
            case 'formorderajb':
                return new Erems_Models_Formorderajb_FormOrderAJB();
                break;
			/*start added by ahmad riadi */		
            case 'instrumentpembayaran':
                return new Erems_Models_Master_Instrumentpembayaran();
            break;	
			/*end added by ahmad riadi */	
            //edited by Rizal 14032019
            case 'formorderijb':
                return new Erems_Models_Formorderijb_FormOrderIJB();
                break;
            //endedited
            case 'jabatan':
                return new Erems_Models_Hrd_Jabatan();
                break;
            case 'gljurnal':
                return new Erems_Models_Ktpiutangfin_Jurnal();
                break;
            case 'klaimkomisi':
                return new Erems_Models_Komisi_Klaim_Klaim();
                break;
            case 'klaimkomisidetail':
                return new Erems_Models_Komisi_Klaim_Detail();
                break;
            case 'ktpiutangfin':
                return new Erems_Models_Ktpiutangfin_Ktpiutangfin();
                break;
            case 'komisi':
                return new Erems_Models_Komisi_Master_MasterKomisi();
                break;
            case 'komisihitung':
                return new Erems_Models_Komisi_Master_KomisiHitung();
                break;
            case 'komisitran':
                return new Erems_Models_Komisi_KomisiTran();
                break;
            case 'marketingstock':
                return new Erems_Models_Marketingstock_MarketingStock($params);
                break;
            case 'mediapromotion':
                return new Erems_Models_Master_MediaPromotion();
                break;
            case 'opportunitycustomer':
                return new Erems_Models_Master_OpportunityCustomer();
                break;
            case 'parameter':
                return new Erems_Models_Master_Parameter();
                break;
            case 'parametersppjb':
                return new Erems_Models_Legal_ParameterSPPJB();
                break;
            case 'payment':
                return new Erems_Models_Payment_Payment();
                break;
            case 'paymentdetail':
                return new Erems_Models_Payment_Detail();
                break;
            case 'paymentmethod':
                return new Erems_Models_Master_PaymentMethod();
                break;
            case 'paymenttype':
                return new Erems_Models_Master_PaymentType();
                break;
            case 'pencairankpr':
                return new Erems_Models_Admincollection_PencairanKPR();
                break;
            case 'pengalihanhak':
                return new Erems_Models_Legal_PengalihanHak();
                break;
            case 'plafon':
                return new Erems_Models_Construction_Plafon();
                break;
            case 'plbankkpr':
                return new Erems_Models_Purchaseletter_BankKPR();
                break;
            case 'position':
                return new Erems_Models_Master_Position();
                break;
            case 'price':
                return new Erems_Models_Sales_Price($params);
                break;
            case 'priceadmin':
                return new Erems_Models_Sales_PriceAdminCaller($params);
                break;
            case 'pricealt':
                return new Erems_Models_Sales_PriceAlt($params);
                break;
            case 'pricetype':
                return new Erems_Models_Sales_PriceType($params);
                break;
            case 'productcategory':
                return new Erems_Models_Master_ProductCategory($params);
                break;
            case 'project':
                return new Erems_Box_Models_Master_Project();
                break;
            case 'projectfacilities':
                return new Erems_Models_Master_ProjectFacilities($params);
                break;
            case 'projectfacilitiesimage':
                return new Erems_Models_Master_ProjectFacilitiesImage($params);
                break;
            case 'prosescac':
                return new Erems_Models_Cac_Proses();
                break;
            case 'prosescacdetail':
                return new Erems_Models_Cac_Detail();
                break;
            case 'prosescacnomor':
                return new Erems_Models_Cac_Nomor();
                break;
			/*start added by ahmad riadi */	
			case 'provinsi':
                return new Erems_Models_Master_Provinsi();
                break;
			/*end added by ahmad riadi */			
            case 'pt':
                return new Erems_Box_Models_Master_Pt();
                break;
            
            case 'purchasecounter':
                return new Erems_Models_Purchaseletter_Counter();
                break;
            case 'purchaseletter':
                return new Erems_Models_Purchaseletter_PurchaseLetter($params);
                break;
            case 'purchaseletterrevision':
                return new Erems_Models_Sales_Revision($params);
                break;
            case 'purchaselettertransaction':
                return new Erems_Models_Purchaseletter_PurchaseLetterTransaction($params);
                break;
            case 'purpose':
                return new Erems_Models_Master_Purpose();
                break;
            case 'purposebuy':
                return new Erems_Models_Master_PurposeBuy();
                break;
            case 'religion':
                return new Erems_Models_Master_Religion();
                break;
			
			case 'reservation':
                return new Erems_Models_Reservation_Reservation();
                break;
				
            case 'reschedule':
                return new Erems_Models_Purchaseletter_Reschedule();
                break;
            case 'reward':
                return new Erems_Models_Reward_Reward();
                break;
            case 'rewardsales':
                return new Erems_Models_Reward_Reward("rewardsales_");
                break;
            case 'rewardtambahan':
                return new Erems_Models_Reward_Reward("rewardtambahan_");
                break;
            case 'rewardcustomer':
                return new Erems_Models_Reward_Reward("rewardcustomer_");
                break;
            case 'saleslocation':
                return new Erems_Models_Master_SalesLocation();
                break;
            case 'salesman':
                return new Erems_Models_Sales_Salesman();
                break;
            case 'schedule':
                return new Erems_Models_Purchaseletter_Schedule();
                break;
            case 'scheduletype':
                return new Erems_Models_Master_ScheduleType();
                break;
            case 'serahterima':
                return new Erems_Models_Serahterima_Serahterima();
                break;
            case 'side':
                return new Erems_Models_Master_Side();
                break;
            case 'sms':
                return new Erems_Models_Sms_SMS();
                break;
            case 'smscategory':
                return new Erems_Models_Sms_SMSCategory();
                break;
            case 'sourcemoney':
                return new Erems_Models_Master_SourceMoney();
                break;
            case 'spk':
                return new Erems_Models_Spk_Spk();
                break;
            case 'spkdetail':
                return new Erems_Models_Spk_SpkDetail();
                break;
            case 'spktransaction':
                return new Erems_Models_Spk_SpkTransaction();
                break;
            case 'spktype':
                return new Erems_Models_Master_SpkType();
                break;
            case 'sppjb':
                return new Erems_Models_Legal_SPPJB();
                break;
            case 'sppjbsby':
                return new Erems_Models_Legal_SPPJBSby();
                break;
            case 'tanahcode':
                return new Erems_Box_Models_Master_Tanahcode();
                break;
            case 'type':
                return new Erems_Models_Master_Type($params);
                break;
            case 'typeattribute':
                return new Erems_Models_Type_Attribute();
                break;
            case 'typetran':
                return new Erems_Models_Master_TypeTran();
                break;
            case 'unit':
                return new Erems_Models_Master_Unit($params);
                break;
            case 'unitb':
                return new Erems_Models_Unit_Unit($params);
                break;
            case 'unithistory':
                return new Erems_Models_Unit_UnitHistory();
                break;
            case 'unitsize':
                return new Erems_Models_Master_UnitSize();
                break;
            case 'unitspk':
                return new Erems_Models_Unit_UnitSpk($params);
                break;
            case 'unitstatus':
                return new Erems_Models_Unit_Status();
                break;
            case 'unittran':
                return new Erems_Models_Unit_UnitTran($params);
                break;
            case 'utility':
                return new Erems_Models_Utility_Utility();
                break;
            case 'utilitytype':
                return new Erems_Models_Aftersales_Utilitytype_UtilityType();
                break;
            case 'utilitystatus':
                return new Erems_Models_Utility_Status();
                break;
            case 'utilitytype':
                return new Erems_Models_Utility_Type();
                break;
            
            case 'user':
                return new Erems_Models_Master_User($params);
                break;
            case 'verification':
                return new Erems_Models_Verification_Verification($params);
                break;
            case 'aplimodel_schedule':
                return new Erems_Models_Aplimodel_Schedule();
                break;
            case 'koefisien':
                return new Erems_Models_Master_Koefisien();
                break;
            case 'komisi_distributionchannel':
                return new Erems_Models_Komisi_Distributionchannel();
                break;
            case 'komisi_pencairan':
                return new Erems_Models_Komisi_Pencairan();
                break;
            case 'masterpanduan':
                return new Erems_Models_Masterpanduan();
                break;

                //added by anas
            case 'unitdocument':
                return new Erems_Models_Unit_UnitDocument();
                break;

                //added by rico 27102021
            case 'unitdocumenthistory':
                return new Erems_Models_Unit_UnitDocumentHistory();
                break;

                //added by rico 20122021
            case 'templatechecklistmodel':
                return new Erems_Models_TemplatechecklistModel();
                break;

                //added by rico 25082022
            case 'topupwhatsapp':
                return new Erems_Models_Topupwhatsapp();
                break;

                //added by rico 25082022
            case 'proseswhatsapp':
                return new Erems_Models_Whatsapp_Proseswhatsapp();
                break;

                //added by rico 25082022
            case 'whatsappcategory':
                return new Erems_Models_Whatsapp_WhatsappCategory();
                break;

            case 'salesgroup':
                return new Erems_Models_Master_Salesgroup();
                break;
            case 'tanahcode2':
                return new Erems_Box_Models_Master_Tanahcode2();
                break;

            default:
                return NULL;
               break;
        }
    }
}

?>
