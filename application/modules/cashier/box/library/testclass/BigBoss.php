<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of BigBoss
 *
 * @author MIS
 */
class Erems_TestClass_BigBoss {
    public function groupingData(Erems_TestClass_GroupingModel $groupingModel){
        $dataArray = $groupingModel->getArrayData();
        $groupedClass = array();
        $registedPrefix = $groupingModel->getRegistedPrefix();
        
        foreach($dataArray as $k=>$v){
            foreach($registedPrefix as $row){
                if(strstr($k,$row)){
                    $key = substr($k,strlen($row),strlen($k));
                    if(!key_exists($row,$groupedClass)){
                        $groupedClass[$row] = array();
                    }
                    $groupedClass[$row][$key] = $v;
                   // $groupingModel->createObject();
                }
            }
            
        }
        $groupingModel->createObject($groupedClass);
    }
}

?>
