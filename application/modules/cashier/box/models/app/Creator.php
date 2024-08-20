<?php

/**
 * Description of Creator
 *
 * @author MIS
 */
class Cashier_Box_Models_App_Creator {

    public function create($className = "", $params = "") {
        switch ($className) {
            case 'approverreleaser':
                return new Cashier_Models_Master_ApproverReleaser();
                break;
            case 'bank':
                return new Cashier_Models_Master_Bank();
                break;
            case 'budgetcoa':
                return new Cashier_Models_Master_BudgetCoa();
                break;
            case 'budgetcf':
                return new Cashier_Models_Master_BudgetCF();
                break;
            case 'block':
                return new Cashier_Models_Master_Block();
                break;
            case 'blockb':
                return new Cashier_Models_Master_BlockB($params);
                break;
            case 'blocktran':
                return new Cashier_Models_Master_BlockTran($params);
                break;
            case 'cashflow':
                return new Cashier_Models_Master_Cashflow();
                break;
            case 'cashflowtype':
                return new Cashier_Models_Master_Cashflowtype();
                break;
            case 'cheque':
                return new Cashier_Models_Master_Cheque();
                break;
            case 'chequedetail':
                return new Cashier_Models_Transaction_ChequeDetail();
                break;
            case 'chequehistory':
                return new Cashier_Models_Master_ChequeHistory();
                break;
            case 'cetakslip':
                return new Cashier_Models_Master_Cetakslip();
                break;
            case 'closing':
                return new Cashier_Models_Master_Closing();
                break;
            case 'cluster':
                return new Cashier_Models_Master_Cluster();
                break;
            case 'clusterb':
                return new Cashier_Models_Master_ClusterB($params);
                break;
            case 'coa':
                return new Cashier_Models_Master_Coa();
                break;
            case 'coaconfig':
                return new Cashier_Models_Master_CoaConfig();
                break;
            case 'coaconfigdetail':
                return new Cashier_Models_Master_CoaConfigDetail();
                break;
            case 'corporatepay':
                return new Cashier_Models_Master_Corporatepay();
                break;
            case 'corporatepaydetail':
                return new Cashier_Models_Master_Corporatepaydetail();
                break;
            case 'currency':
                return new Cashier_Models_Master_Currency();
                break;
            case 'customer':
                return new Cashier_Models_Master_Customer($params);
                break;
            case 'debitsource':
                return new Cashier_Models_Master_Debitsource();
                break;
            case 'komisiklaim':
                return new Cashier_Models_Master_Komisiklaim($params);
                break;
            case 'kasbonklaim':
                return new Cashier_Models_Master_Kasbonklaim($params);
                break;
            case 'department':
                return new Cashier_Models_Master_Department();
                break;
            case 'documentnumber':
                return new Cashier_Models_Master_Documentnumber();
                break;
            case 'grouptype':
                return new Cashier_Models_Master_Grouptype();
                break;
            case 'journal':
                return new Cashier_Models_Master_Journal();
                break;
            case 'kasbank':
                return new Cashier_Models_Master_Kasbank();
                break;
            case 'kasbon':
                return new Cashier_Models_Master_Kasbon();
                break;
            case 'kasbondept':
                return new Cashier_Models_Master_Kasbondept();
                break;
            case 'kelsub':
                return new Cashier_Models_Master_Kelsub();
                break;
            case 'log':
                return new Cashier_Models_Master_Log();
                break;
            case 'multiproject':
                return new Cashier_Models_Master_MultiProject();
                break;
            case 'masterreceipt':
                return new Cashier_Models_Master_Receipt();
                break;
            case 'consolidation':
                return new Cashier_Models_Master_Consolidation();
                break;
            case 'multiprojectdetail':
                return new Cashier_Models_Master_ConsolidationDetail();
                break;
            case 'consolidationdetail':
                return new Cashier_Models_Master_MultiProjectDetail();
                break;
            case 'payment':
                return new Cashier_Models_Payment_Payment();
                break;
            case 'paymenttype':
                return new Cashier_Models_Master_PaymentType();
                break;
            case 'pemutihan':
                return new Cashier_Models_Master_Pemutihan();
                break;
            case 'plafon':
                return new Cashier_Models_Master_Plafon();
                break;
            case 'paymentmethod':
                return new Cashier_Models_Master_PaymentMethod();
                break;
            case 'ppn':
                return new Cashier_Models_Master_Ppn($params);
                break;
            case 'pph':
                return new Cashier_Models_Master_Pph($params);
                break;
            case 'prefix':
                return new Cashier_Models_Master_Prefix();
                break;
            case 'project':
                return new Cashier_Box_Models_Master_Project();
                break;
            case 'projectpt':
                return new Cashier_Box_Models_Master_Projectpt();
                break;
            case 'productcategory':
                return new Cashier_Models_Master_ProductCategory($params);
                break;
            case 'pt':
                return new Cashier_Box_Models_Master_Pt();
                break;
            case 'ptforcashbon':
                return new Cashier_Models_Master_Ptforcashbon();
                break;
            case 'purchaselettertransaction':
                return new Cashier_Models_Purchaseletter_PurchaseLetterTransaction($params);
                break;
            //Rizal 9 Mei 2019
            case 'rangeapprovecreator':
                return new Cashier_Models_Rangeapprovecreator();
                break;
            //
            case 'role':
                return new Cashier_Models_Master_Role();
                break;
            case 'schedule':
                return new Cashier_Models_Purchaseletter_Schedule();
                break;
            case 'scheduleescrow':
                return new Cashier_Models_Purchaseletter_ScheduleEscrow();
                break;
            case 'scheduletype':
                return new Cashier_Models_Master_ScheduleType();
                break;
            case 'subgl':
                return new Cashier_Models_Master_SubLedger();
                break;
            case 'template':
                return new Cashier_Models_Master_Template();
                break;
            case 'type':
                return new Cashier_Models_Master_Type($params);
                break;
            case 'undangancpms':
                return new Cashier_Models_Master_Undangancpms($params);
                break;
            case 'unit':
                return new Cashier_Models_Master_Unit($params);
                break;
            case 'unitb':
                return new Cashier_Models_Unit_Unit($params);
                break;
            case 'unitstatus':
                return new Cashier_Models_Unit_Status();
                break;
            case 'user':
                return new Cashier_Models_Master_User($params);
                break;
            case 'vendor':
                return new Cashier_Models_Master_Vendor();
                break;
            case 'vendorbank':
                return new Cashier_Models_Master_Vendorbank();
                break;
            case 'voucher':
                return new Cashier_Models_Transaction_Voucher();
                break;
            case 'voucherdetail': //ini sebenernya kasbankdetail. cuma terlanjut salah nama CMIIW xD
                return new Cashier_Models_Transaction_Voucherdetail();
                break;
            case 'journaldetail':
                return new Cashier_Models_Transaction_Journaldetail();
                break;
            case 'voucherattachment': //kasbank th_cashbon_payment
                return new Cashier_Models_Transaction_Voucherattachment();
                break;
            case 'voucherapprovaldetail': 
                return new Cashier_Models_Transaction_Voucherapprovaldetail();
                break;
            case 'vouchercashbondetail': //kasbank th_cashbon_payment
                return new Cashier_Models_Transaction_Vouchercashbondetail();
                break;
            case 'voucherescrowdetail':
                return new Cashier_Models_Transaction_Voucherescrowdetail();
                break;
            case 'voucherardetail':
                return new Cashier_Models_Transaction_Voucherardetail();
                break;
            case 'vouchernonlink':
                return new Cashier_Models_Transaction_Vouchernonlink();
                break;
            case 'voucherotherpaymentdetail':
                return new Cashier_Models_Transaction_Voucherotherpaymentdetail();
                break;
            case 'vouchersubdetail':
                return new Cashier_Models_Transaction_Vouchersubdetail();
                break;
            case 'journalsubdetail':
                return new Cashier_Models_Transaction_Journalsubdetail();
                break;
            case 'voucherprefix':
                return new Cashier_Models_Master_Voucherprefix();
                break;
            case 'reportbankpaymentvoucher':
                return new Cashier_Models_Master_Reportbankpaymentvoucher();
                break;
            case 'writeoff':
                return new Cashier_Models_Master_Writeoff();
                break;
            case 'writeoffdetail':
                return new Cashier_Models_Master_Writeoffdetail();
                break;
            case 'writeofflimit':
                return new Cashier_Models_Master_Writeofflimit();
                break;
            case 'writeoff_limit_type':
                return new Cashier_Models_Master_Writeofflimittype();
                break;
            case 'writeoffuserrole':
                return new Cashier_Models_Master_Writeoffuserrole();
                break;
            case 'pemutihandenda':
                return new Cashier_Models_Master_Pemutihandenda();
                break;
            default:
                return NULL;
                break;
        }
    }

}

?>
