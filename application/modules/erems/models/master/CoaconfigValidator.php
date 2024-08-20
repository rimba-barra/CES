<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CACValidator
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Master_CoaconfigValidator extends Erems_Box_Models_App_Validator {
    
   public $dataValidator;
   
   public function run(Erems_Models_Master_CoaConfig $pl){
        $msg = "";
        
        $dao = new Erems_Models_Master_CoaConfigDao();
        $name = $dao->codeExist($pl);
        
        $idExist = 0;
        if($name){
            if(count($name[0]) > 0){
               
                $idExist = $name[0][0]['coa_config_id'];
            }
        }
       
        
        $data = array();
        $data = $this->dataValidator;
        
        
        if(array_key_exists('detail',$data)) {
            if(isset($data['detail'])) {
            $persen = array();   
            $detail = $data['detail'];    
            $sumO = array();
            $sumI = array();
            $totalO = 0;
            $totalI = 0;
            
            
            if(in_array('O', array_column($detail, 'type'))) { // search value in the array
              $filter = array("O");
              $newArrayO = array_filter($detail, function($e) use ($filter){
                      return in_array($e['type'], $filter);
              });  
            }
            
            if(in_array('I', array_column($detail, 'type'))) { // search value in the array
              $filter = array("I");
              $newArrayI = array_filter($detail, function($e) use ($filter){
                      return in_array($e['type'], $filter);
              });  
            }
            
            if(isset($newArrayO)) {
                $sumO = array();
                    foreach($newArrayO as $dataO) {
                        $sumO[] = $dataO["persen"];
                    }     
            }
            if(isset($newArrayI)) {
                $sumI = array();
                    foreach($newArrayI as $dataI) {
                        $sumI[] = $dataI["persen"];
                    }     
            }
            
            $totalO = round(array_sum($sumO),2);
            $totalI = round(array_sum($sumI),2);
                
            
            
            foreach($detail as $rows) {
               $persen[] = $rows['persen'];
            }
            //array_sum($persen);
           
            $total_persen = array_sum($persen);
            }
        }
        else {
        $persen = array();
        $total_persen = array();  
        }
        
        
//         if(isset($data['detail'])) {
//            $detail = $data['detail'];
//            if($total_persen < 100) {
//                $msg = "Total persen kurang dari 100%, total saat ini : ".$total_persen."%";
//            }
//            if($total_persen > 100) {
//                $msg = "Total persen lebih dari 100%, total saat ini : ".$total_persen."%";
//            }
//            if(!$total_persen) {
//                $msg = "Total persen masih kosong";
//            }
//        
//         } else {
             $cek = $totalO - $totalI;
             
            
             if($idExist && ($pl->getId() != $idExist)){
             $msg = "Name already taken";
             }
//             elseif($totalO != $totalI ) {
//             $msg = "Total persen Dataflow O : ".$totalO." tidak sama dengan Dataflow I : ".$totalI."%";    
//             }
             elseif($cek != 100 ) {
             $msg = "Total persen Dataflow O : ".$totalO." % tidak sama dengan Dataflow I : ".$totalI."%";    
             }
//             elseif($total_persen && ($total_persen > 100) ) {
//             $msg = "Total persen lebih dari 100%, total saat ini : ".$total_persen."%";
//             }
             else {
             $this->setStatus(TRUE);
             }
            
       
         
        
         
        $this->setMsg($msg);
    }
}
