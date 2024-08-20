<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of DocNumberGenerator
 *
 * @author MIS
 */
class Erems_Box_Models_App_DocPrefixGenerator {
    public static function get($name='DOC'){
        $text = "";
        $name = strlen($name)==0?"DOC":$name;
        $date = date("Y/m/d");
        $text = strtoupper($name)."/".$date;
        return $text;
        
    }
    
    /* cedar doc number */
    public static function getCedarDoc(Erems_Box_Models_App_Session $ses){
        $text = "";
        $name = self::getPrefixDoc($ses);
        $name = strlen($name)==0?"DOC":$name;
        $date = date("Y/m/d");
        $text = strtoupper($name)."/".Erems_Box_Config::PREFIXPLNUMBER."/".date("m")."/".date("Y");
        return $text;
        
    }
    
    
    public static function getPrefixDoc(Erems_Box_Models_App_Session $ses){
        $text = 'DOC';
        $key = $ses->getProject()->getId().'_'.$ses->getPt()->getId();
      
      //  if(key_exists($key,  Erems_Box_FileManager::$docNumber)){
           // $text = Erems_Box_FileManager::$docNumber[$key];
       // }
        $text = Erems_Box_Projectptconfig_ProjectPtConfigSelector::getGeneralConfig($ses->getProject()->getId(),$ses->getPt()->getId())->getPrefixDocNumber();
        
        return $text;
    }
    
    
}

?>
