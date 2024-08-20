<?php

/**
 * Description of AbDao
 *
 * @author MIS
 */
abstract class Cashier_Box_Models_App_AbDaoCashier {
     protected $dbTable;
     
     private $hasil;
     private $model;
     
     function getHasil() {
         return $this->hasil;
     }

     function setHasil($hasil = NULL) {
         $this->hasil = $hasil;
     }

     function getModel() {
         return $this->model;
     }

     function setModel($model= NULL) {
         $this->model = $model;
     }

     public function getHasilModel() {
         $hasil = $this->hasil;
         $model = $this->model;
         
     
     }
     
     public function __construct() {
        $this->dbTable = new Cashier_Box_Models_Dbtable_DbCashier();
     
    }
    
    protected final function toDateTime($date){
        $date = (string)$date;
        $x = '';
        if(strlen($date)>0){
            $x = date('Y-m-d h:m:s', strtotime($date));
        }
        return $x;
    }
    
    public function getCustomRead($modeReads ,Cashier_Box_Models_App_HasilRequestRead $request, $ses ){
        $hasil = 0;
        $modeRead = ($modeReads)?$modeReads:$request->getModeRead();
        
        $userlog = Cashier_Box_GlobalParams::$userlog;
        $project = 0;
        if( in_array( $ses->getUser()->getId(),$userlog ) )
        {
             $project = 0;
        }
        else {
             $project = $ses->getProject()->getId();
        }

        switch($request->getModule()) {
            case 'voucher':

                $requestparam = $request->getOthers();
                $splitted_paramname = array(
                    'detailpt',
                    'detaildept',
                    'detaildeptbypt',
                    'paymentmethodreal',
                    'vendorbank',
                    'getprojectfilterbypt',
                    'autoduedate',
                    'usemasterreceipt',
                    'getanotherdenda',
                    'voucherattachment',
                    'kasbank',
                    'bankapprovalreleaser',
                    'bankapprovalapprover',
                    'getcashflow',
                    'getcashflowbycoa',
                    'pph',
                    'ppn',
                    'coa'
                );

                $splitted_moderead = array(
                    'customrequest',
                    'detaildeptdirect',
                    'detailpt',
                    'paymentmethod',
                    'detailbank',
                    'detailprefix',
                    'detailproject',
                    'checkclosing',
                    'detailptforcashbon',
                    'clusterpt',
                    'getsubglv2',
                    'usemasterreceipt',
                    'getvcrprefixcash'  
                );

                if (($modeRead != "customrequest" && in_array($modeRead, $splitted_moderead)) || ($modeRead == "customrequest" && in_array($requestparam['paramname'], $splitted_paramname))) {
                    $hasil = $this->getCustomReadVoucher($modeReads, $request, $ses);
                } else {
                    $hasil = $this->dbTable->SPExecute('sp_all_read',
                        $modeRead,
                        $request->getModule(),
                        $project,
                        $ses->getPt()->getId(),
                        1, //getpage
                        25, //getlimit
                        $request->getXmlValue(),
                        $ses->getProject()->getId(),
                        $ses->getUser()->getId()
                    );
                }
                
                break;
            default:
                $hasil = $this->dbTable->SPExecute('sp_all_read',
                    $modeRead,
                    $request->getModule(),
                    $project,
                    $ses->getPt()->getId(),
                    1, //getpage
                    25, //getlimit
                    $request->getXmlValue(),
                    $ses->getProject()->getId(),
                    $ses->getUser()->getId()
                );
        }      
     
        return $hasil;
    }

    public function getCustomReadVoucher($modeReads ,Cashier_Box_Models_App_HasilRequestRead $request, $ses )
    {
        $requestparam = $request->getOthers();
        $hasil = 0;
        $modeRead = ($modeReads)?$modeReads:$request->getModeRead();
        
        $userlog = Cashier_Box_GlobalParams::$userlog;
        $project = 0;
        if( in_array( $ses->getUser()->getId(),$userlog ) )
        {
             $project = 0;
        }
        else {
             $project = $ses->getProject()->getId();
        }

        $paramname = "";
        if (isset($requestparam['paramname'])) {
            $paramname = "_".$requestparam['paramname'];
        }

        $sp_name = "sp_all_read_voucher_".$modeRead.$paramname;
        $hasil = $this->dbTable->SPExecute($sp_name,
                    $modeRead,
                    $request->getModule(),
                    $project,
                    $ses->getPt()->getId(),
                    1, //getpage
                    25, //getlimit
                    $request->getXmlValue(),
                    $ses->getProject()->getId(),
                    $ses->getUser()->getId()
                );

        return $hasil;
    }
    
//     public function getCustomRead($modeReads ,Cashier_Box_Models_App_HasilRequestRead $request, $ses ){
//         $hasil = 0;
//         $modeRead = ($modeReads)?$modeReads:$request->getModeRead();
        
//         $userlog = Cashier_Box_GlobalParams::$userlog;
//         $project = 0;
//         if( in_array( $ses->getUser()->getId(),$userlog ) )
//         {
//              $project = 0;
//         }
//         else {
//              $project = $ses->getProject()->getId();
//         }

//         $hasil = $this->dbTable->SPExecute('sp_all_read',
//                 $modeRead,
//                 $request->getModule(),
//                 $project,
//                 $ses->getPt()->getId(),
//                 1, //getpage
//                 25, //getlimit
//                 $request->getXmlValue(),
//                 $ses->getProject()->getId(),
//                 $ses->getUser()->getId()
//                );
     
// //        var_dump($this->dbTable);
//         return $hasil;
//     }
    public function getCustomReadDirectModule($module,$modeReads ,Cashier_Box_Models_App_HasilRequestRead $request, $ses ){
        $hasil = 0;
        $modeRead = ($modeReads)?$modeReads:$request->getModeRead();
        $moduleRead = ($module)?$module:$request->getModule();
        
        $userlog = Cashier_Box_GlobalParams::$userlog;
        $project = 0;
        if( in_array( $ses->getUser()->getId(),$userlog ) )
        {
             $project = 0;
        }
        else {
             $project = $ses->getProject()->getId();
        }

        $hasil = $this->dbTable->SPExecute('sp_all_read',
                $modeRead,
                $moduleRead,
                $project,
                $ses->getPt()->getId(),
                1, //getpage
                25, //getlimit
                $request->getXmlValue(),
                $ses->getProject()->getId(),
                $ses->getUser()->getId()
               );
     
        return $hasil;
    }
    
    public function getCustomUpdate($sp,$modeReads ,Cashier_Box_Models_App_HasilRequestRead $request, $ses ) {
        $hasil = 0;
        $modeRead = ($modeReads)?$modeReads:$request->getModeRead();
        $hasil = $this->dbTable->SPExecute($sp,
                $modeRead,
                $request->getModule(),
                $ses->getProject()->getId(),
                $ses->getPt()->getId(),
                $ses->getUser()->getId(),
                $request->getXmlValue()
                );
            
        return $hasil;
    }
    
    public function getCustomPagingRead($modeReads ,Cashier_Box_Models_App_HasilRequestRead $request, $ses ){
        $hasil = 0;
        $modeRead = ($modeReads)?$modeReads:$request->getModeRead();
        
        $userlog = Cashier_Box_GlobalParams::$userlog;
        $project = 0;
        if( in_array( $ses->getUser()->getId(),$userlog ) )
        {
             $project = 0;
        }
        else {
             $project = $ses->getProject()->getId();
        }

        switch($request->getModule()) {
            case 'voucher':

                $splitted_moderead = array(
                    'nonlink',
                    'reffvcr',
                    'receiptidvcr',
                    'slipsetoran',
                    'voucherattachment',
                    'voucherapprovaldetail'  
                );

                if (in_array($modeRead, $splitted_moderead)) {
                    $hasil = $this->getCustomReadVoucher2($modeReads, $request, $ses);
                } else {
                    $hasil = $this->dbTable->SPExecute('sp_all_read',
                        $modeRead,
                        $request->getModule(),
                        $project,
                        $ses->getPt()->getId(),
                        $request->getPage(), $request->getLimit(), //getlimit
                        $request->getXmlValue(),
                        $ses->getProject()->getId(),
                        $ses->getUser()->getId()
                    );
                }
                
                break;
            default:
                $hasil = $this->dbTable->SPExecute('sp_all_read',
                    $modeRead,
                    $request->getModule(),
                    $project,
                    $ses->getPt()->getId(),
                    $request->getPage(), $request->getLimit(), //getlimit
                    $request->getXmlValue(),
                    $ses->getProject()->getId(),
                    $ses->getUser()->getId()
                );
        }     
     
        return $hasil;
    }

    public function getCustomReadVoucher2($modeReads ,Cashier_Box_Models_App_HasilRequestRead $request, $ses )
    {
        $requestparam = $request->getOthers();
        $hasil = 0;
        $modeRead = ($modeReads)?$modeReads:$request->getModeRead();
        
        $userlog = Cashier_Box_GlobalParams::$userlog;
        $project = 0;
        if( in_array( $ses->getUser()->getId(),$userlog ) )
        {
             $project = 0;
        }
        else {
             $project = $ses->getProject()->getId();
        }

        $paramname = "";
        if (isset($requestparam['paramname'])) {
            $paramname = "_".$requestparam['paramname'];
        }

        $sp_name = "sp_all_read_voucher_".$modeRead.$paramname;

        // echo json_encode($requestparam);die;

        if($modeRead == 'reffvcr'){

            $hasil = $this->dbTable->SPExecute(
                $sp_name,
                $modeRead,
                $request->getModule(),
                $project,
                $ses->getPt()->getId(),
                $request->getPage(),
                $request->getLimit(),
                isset($requestparam['project_id']) ? $requestparam['project_id'] : '',
                isset($requestparam['pt_id']) ? $requestparam['pt_id'] : '',
                isset($requestparam['value']) ? $requestparam['value'] : '',
                isset($requestparam['value2']) ? $requestparam['value2'] : '',
                isset($requestparam['value3']) ? $requestparam['value3'] : '',
                isset($requestparam['value4']) ? $requestparam['value4'] : '',
                isset($requestparam['value5']) ? $requestparam['value5'] : '',
                isset($requestparam['value6']) ? $requestparam['value6'] : '',
                isset($requestparam['value7']) ? $requestparam['value7'] : '',
                isset($requestparam['value8']) ? $requestparam['value8'] : '',
                isset($requestparam['value9']) ? $requestparam['value9'] : '',
                $ses->getUser()->getId()
            );

        }else if($modeRead == 'receiptidvcr'){

            $hasil = $this->dbTable->SPExecute(
                $sp_name,
                $modeRead,
                $request->getModule(),
                $project,
                $ses->getPt()->getId(),
                $request->getPage(),
                $request->getLimit(),
                isset($requestparam['project_id']) ? $requestparam['project_id'] : '',
                isset($requestparam['pt_id']) ? $requestparam['pt_id'] : '',
                isset($requestparam['receipt_no']) ? $requestparam['receipt_no'] : '',
                isset($requestparam['status']) ? $requestparam['status'] : '',
                isset($requestparam['receipt_type']) ? $requestparam['receipt_type'] : '',
                $ses->getUser()->getId()
            );

        }else{

            $hasil = $this->dbTable->SPExecute($sp_name,
                $modeRead,
                $request->getModule(),
                $project,
                $ses->getPt()->getId(),
                $request->getPage(), //getpage
                $request->getLimit(), //getlimit
                $request->getXmlValue(),
                $ses->getProject()->getId(),
                $ses->getUser()->getId()
            );
        }


        return $hasil;
    }

    public function checkbudgetcf($params)
    {
        $hasil = $this->dbTable->SPExecute('sp_cekbudgetcf', $params['project_id'], $params['pt_id'], $params['amount'], $params['setupcashflow_id'], 0, $params['kasbank_date']);
        return $hasil;
    }
    
}

?>
