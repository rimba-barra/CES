<?php

class Erems_KartupiutangController extends Erems_Models_App_Controller {
    
    

    function readAction() {
        
        $ses = Zend_Controller_Action_HelperBroker::getStaticHelper('session');
         $ses->report_path = APPLICATION_PATH.'/../public/app/erems/report/';
       

        $kartuPiutang = new Erems_Models_App_DataListCreator('','purchaseletter',
                array('cluster','block','unit','type','productcategory','customer','payment'),
                array('readONlysss','hello','hssss'));
       
        $listPayment = new Erems_Models_App_DataListCreator('','payment',
                array('paymentmethod'));
       
      
        $listSchedule = new Erems_Models_App_DataListCreator('','schedule',
                array('scheduletype','sourcemoney')
                );
        
        
        $singleKartuPiutang = new Erems_Models_App_DataListCreator('','purchaselettertransaction',
                array('cluster','block','unitsize','type','customerprofile','price','pricetype','foo'),
                array('total_payment'));
        
        
        $dao = new Erems_Models_Purchaseletter_PurchaseLetterDao();
        
        $app = new Erems_Models_App_Models_Read($this); 
       // $app = new Erems_Models_App_Models_Read($this,'read_all'); 
        $app->registerDataList('list_kartupiutang',$kartuPiutang);
        $app->registerDataList('list_payment', $listPayment);
        $app->registerDataList('list_schedule', $listSchedule);
        $app->registerDataList('single_kartupiutang', $singleKartuPiutang);
        $mr = $app->getModeRead();
        $r = $app->getRequest();
       
        switch ($mr){
            case 'all':
                 $hasil = $dao->getListKartuPiutang($r);
                 $app->prosesDao('list_kartupiutang', $hasil);
                break;
            case 'detail':
                
                /* $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
                 $pl->setId(4);  
                
                
                
                $hasil = $dao->getTotalPayment($pl);
                
                var_dump($hasil);
                
                die();
                
                */
                
                
                $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
                $pl->setArrayTable($r->getOthers());
                
                
                
                $hasil = $dao->getKartuPiutang($pl);
              
                $total = $dao->getTotalPayment($pl);
                $app->prosesDao('single_kartupiutang', $hasil);
                $app->setAksesorisValue("total_payment",$total);
                
                
                break;
            case 'schedule':
                $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
                $pl->setArrayTable($r->getOthers());
                $hasil = $dao->getScheduleById($pl);
                
                $app->prosesDao('list_schedule',$hasil);
               
                break;
            case 'payment':
                $pl = new Erems_Models_Purchaseletter_PurchaseLetter();
                $pl->setArrayTable($r->getOthers());
                $hasil = $dao->getPaymentsById($pl);
          
                $app->prosesDao('list_payment',$hasil);
           
                break;
        }
       
        $app->run();
       
        
    }

    function createAction() {
       
    }

    function updateAction() {
        
    }
    
    function printAction(){
        
    }

    function deleteAction() {
        
    }

    protected function selectedRequestor(Erems_Kouti_Requestor $requestor) {
        return $requestor->purchaseLetter();
    }

}

?>